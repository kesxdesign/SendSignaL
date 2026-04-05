const fs = require('fs');
const path = require('path');

function sanitizeName(name) {
    if (typeof name !== 'string') name = String(name);
    // Convert to lowercase and replace non-alphanumeric with hyphen
    let s = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    // Remove double hyphens
    return s.replace(/-+/g, '-');
}

function getVariableName(pathArray, isSystem = false) {
    // join sanitized components
    let parts = pathArray.map(sanitizeName).filter(p => p !== '');
    let name = parts.join('-');
    if (isSystem) {
        // User requested -sys in the naming for system tokens.
        return `--sys-${name}`;
    } else {
        return `--${name}`;
    }
}

function resolveAlias(value) {
    /**
     * Converts {collection .path.to.token} to var(--variable-name)
     */
    const match = value.match(/\{(.*?)\}/);
    if (!match) return value;
    
    let aliasContent = match[1].trim();
    let collectionName = "";
    let pathParts = [];
    
    // Format: CollectionName .path.to.token
    if (aliasContent.includes('.')) {
        let dotIndex = aliasContent.indexOf('.');
        collectionName = aliasContent.substring(0, dotIndex).trim();
        let pathStr = aliasContent.substring(dotIndex + 1).trim();
        pathParts = pathStr.split('.').map(p => p.trim()).filter(p => p !== '');
    } else {
        pathParts = aliasContent.split('.').map(p => p.trim()).filter(p => p !== '');
    }

    const isSystem = ["color roles", "typography", "font"].includes(collectionName.toLowerCase());
    const varName = getVariableName(pathParts, isSystem);
    return `var(${varName})`;
}

function processTokens(data) {
    let cssVars = [];
    
    function walk(node, pathArray, isSystem) {
        if (typeof node === 'object' && node !== null) {
            // Check if it's a token (has type and value)
            if (node.hasOwnProperty('value') && node.hasOwnProperty('type')) {
                let tokenType = node.type;
                let value = node.value;
                
                if (tokenType === 'custom-fontStyle' && typeof value === 'object') {
                    // Expand font style properties
                    for (let prop in value) {
                        let varPath = [...pathArray, prop];
                        let varName = getVariableName(varPath, isSystem);
                        let val = value[prop];
                        let processedVal = String(val);
                        
                        if (typeof val === 'string' && val.startsWith('{')) {
                            processedVal = resolveAlias(val);
                        } else if (['fontSize', 'lineHeight', 'letterSpacing', 'paragraphSpacing', 'paragraphIndent'].includes(prop)) {
                            if (typeof val === 'number') {
                                processedVal = `${val}px`;
                            }
                        }
                        cssVars.push(`  ${varName}: ${processedVal};`);
                    }
                } else {
                    let varName = getVariableName(pathArray, isSystem);
                    let processedVal = String(value);
                    
                    if (typeof value === 'string' && value.startsWith('{')) {
                        processedVal = resolveAlias(value);
                    } else if (['dimension', 'fontSize', 'lineHeight', 'letterSpacing'].includes(tokenType)) {
                        if (typeof value === 'number') {
                            processedVal = `${value}px`;
                        }
                    }
                    cssVars.push(`  ${varName}: ${processedVal};`);
                }
            } else {
                // Recurse
                for (let key in node) {
                    if (key === 'extensions') continue;
                    walk(node[key], [...pathArray, key], isSystem);
                }
            }
        }
    }

    for (let topKey in data) {
        let isSystem = ["color roles", "typography", "font"].includes(topKey.toLowerCase());
        walk(data[topKey], [], isSystem);
    }
    
    return cssVars;
}

function main() {
    const inputFile = 'design-tokens.tokens.json';
    const outputFile = 'variables.css';
    
    if (!fs.existsSync(inputFile)) {
        console.error(`Error: ${inputFile} not found`);
        return;
    }

    try {
        const rawData = fs.readFileSync(inputFile, 'utf8');
        const data = JSON.parse(rawData);
        const cssVars = processTokens(data);
        
        let output = ":root {\n" + cssVars.join('\n') + "\n}\n";
        fs.writeFileSync(outputFile, output);
        
        console.log(`Successfully converted tokens to ${outputFile}`);
    } catch (err) {
        console.error(`Error processing tokens: ${err.message}`);
    }
}

main();
