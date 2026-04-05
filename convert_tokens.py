import json
import re
import os

def sanitize_name(name):
    # Convert to lowercase and replace non-alphanumeric with hyphen
    s = re.sub(r'[^a-zA-Z0-9]+', '-', name.lower()).strip('-')
    # Remove double hyphens
    return re.sub(r'-+', '-', s)

def get_variable_name(path, is_system=False):
    # join sanitized components
    parts = [sanitize_name(p) for p in path]
    # Filter out empty parts
    parts = [p for p in parts if p]
    
    name = '-'.join(parts)
    if is_system:
        # User requested -sys in the naming for system tokens.
        # We'll use --sys- prefix.
        return f"--sys-{name}"
    else:
        return f"--{name}"

def resolve_alias(value, all_tokens):
    """
    Converts {collection .path.to.token} to var(--variable-name)
    """
    match = re.search(r'\{(.*?)\}', value)
    if not match:
        return value
    
    alias_content = match.group(1).strip()
    # Aliases in this file seem to have the format: CollectionName .path.to.token
    # Example: {primitive color collecton .color pallete.secondary.secondary 80}
    
    # Split by the first dot
    if '.' in alias_content:
        collection_name, path_str = alias_content.split('.', 1)
        collection_name = collection_name.strip()
        path = [p.strip() for p in path_str.split('.') if p.strip()]
    else:
        # Fallback if no dot
        collection_name = ""
        path = [p.strip() for p in alias_content.split('.') if p.strip()]

    is_system = collection_name.lower() in ["color roles", "typography", "font"]
    
    # Construct the variable name for the alias
    # We need to decide if the collection_name is part of the variable name
    # Looking at my naming strategy: 
    # System tokens under Color Roles, typography, and font get sys- prefix.
    # We should probably strip the top-level collection names from the path used for the variable name
    # but the path already doesn't include the collection name in path_str.
    
    # Wait, if the alias is {primitive color collecton .color pallete.secondary.secondary 80}
    # path is ['color pallete', 'secondary', 'secondary 80']
    # If the primitive variable name is --color-pallete-secondary-secondary-80
    # then get_variable_name(path, is_system=False) will give that.
    
    var_name = get_variable_name(path, is_system)
    return f"var({var_name})"

def process_tokens(data):
    css_vars = []
    
    def walk(node, path, is_system):
        if isinstance(node, dict):
            # Check if it's a token (has type and value)
            if 'value' in node and 'type' in node:
                token_type = node['type']
                value = node['value']
                
                if token_type == 'custom-fontStyle':
                    # Expand font style properties
                    for prop, val in value.items():
                        var_path = path + [prop]
                        var_name = get_variable_name(var_path, is_system)
                        # Font style values are usually primitives, but might be aliases
                        processed_val = str(val)
                        if isinstance(val, str) and val.startswith('{'):
                            processed_val = resolve_alias(val, data)
                        elif token_type in ['dimension', 'number'] or prop in ['fontSize', 'lineHeight', 'letterSpacing']:
                            # Handle units
                            if isinstance(val, (int, float)):
                                processed_val = f"{val}px"
                        css_vars.append(f"  {var_name}: {processed_val};")
                else:
                    var_name = get_variable_name(path, is_system)
                    processed_val = str(value)
                    if isinstance(value, str) and value.startswith('{'):
                        processed_val = resolve_alias(value, data)
                    
                    # Add px for dimensions if not already present and it's a number
                    if token_type in ['dimension', 'fontSize', 'lineHeight', 'letterSpacing'] and isinstance(value, (int, float)):
                         processed_val = f"{value}px"
                    
                    css_vars.append(f"  {var_name}: {processed_val};")
            else:
                # Recurse
                for key, val in node.items():
                    # Skip extensions
                    if key == 'extensions': continue
                    walk(val, path + [key], is_system)

    for top_key, content in data.items():
        is_system = top_key.lower() in ["color roles", "typography", "font"]
        # We start the path *after* the top-level key to keep names concise?
        # Or keep it? User said "Use -sys for the system", which implies 
        # the distinction is at the top level.
        # If I include "Color Roles" in the path, it becomes --sys-color-roles-...
        # If I strip it, it's just --sys-... which is cleaner.
        # Let's strip the top level mapping names.
        walk(content, [], is_system)
    
    return css_vars

def main():
    input_file = "design-tokens.tokens.json"
    output_file = "variables.css"
    
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    css_vars = process_tokens(data)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(":root {\n")
        f.write("\n".join(css_vars))
        f.write("\n}\n")
    
    print(f"Successfully converted tokens to {output_file}")

if __name__ == "__main__":
    main()
