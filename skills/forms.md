# SendSignal – Forms System Skill (forms.md)

---

## 1. Overview

This document defines the **forms system skill** for SendSignal.

Purpose:
- Standardize all form structures and behaviors
- Ensure consistent input handling and validation
- Enforce strict design system usage
- Enable deterministic form generation by AI agents

---

## 2. Form Design Principles

All forms MUST follow:

- Clarity over complexity
- Consistent structure across all forms
- Minimal cognitive load
- Immediate and clear feedback
- Accessibility-first design

Rules:

- ALWAYS use structured form patterns
- NEVER create custom or inconsistent layouts
- NEVER rely on placeholders as labels
- ALWAYS align with design tokens (color, typography, spacing)

---

## 3. Form Structure & Layout Rules

### Standard Field Structure (MANDATORY)

Each field MUST follow this order:

1. Label  
2. Input Field  
3. Helper Text (optional)  
4. Validation/Error Message (if applicable)

---

### Layout Rules

- Fields MUST be vertically stacked
- Labels MUST be positioned above inputs
- Consistent spacing MUST be applied via spacing tokens
- Group related fields logically

---

### Grouping

- Use sections for long forms
- Each section MUST have a clear title
- Avoid more than one column unless necessary

---

## 4. Input Components Definition

### Component → Usage Table

| Component | Purpose | Use When | Do NOT Use When |
|----------|--------|----------|-----------------|
| Text Input | Single-line input | Names, emails, short text | Long text required |
| Textarea | Multi-line input | Messages, descriptions | Short input |
| Select / Dropdown | Predefined options | Limited choices | Fewer than 3 options |
| Radio Buttons | Single selection | Visible options ≤ 5 | Many options |
| Checkboxes | Multiple selections | Multi-choice input | Single selection |
| Toggle / Switch | Binary state | On/Off settings | Complex decisions |
| File Upload | File input | Upload required | Text-only data |

---

### Behavior Rules

- ALWAYS match component to input type
- NEVER misuse components for convenience
- ALWAYS ensure clarity of selection/input

---

## 5. Input States & Interaction Rules

### States

All inputs MUST support:

- Default
- Hover
- Focus
- Active
- Disabled
- Error
- Success (optional)

---

### State Rules

- Default:
  - Neutral appearance using tokens

- Hover:
  - Subtle visual feedback

- Focus:
  - MUST be clearly visible
  - MUST use focus indicators via tokens

- Active:
  - Reflect interaction state

- Disabled:
  - Use muted tokens
  - MUST remain readable

- Error:
  - Use error color role
  - MUST display message

- Success:
  - Optional confirmation state

---

### Interaction Rules

- Focus MUST move sequentially
- Inputs MUST respond instantly to user interaction
- State transitions MUST be consistent

---

## 6. Validation & Error Handling

### Validation Timing

- Inline validation:
  - During input (where appropriate)

- Submission validation:
  - On form submit

---

### Rules

- ALWAYS validate required fields
- ALWAYS show validation feedback near the input
- NEVER delay critical error feedback

---

### Error Message Rules

- MUST be:
  - Specific
  - Clear
  - Actionable

- MUST appear:
  - Below the input field

---

### Examples

- GOOD:
  - "Email must be a valid address"
- BAD:
  - "Invalid input"

---

### Fallback Behavior

- Prevent submission on critical errors
- Highlight all invalid fields
- Focus first invalid field automatically

---

## 7. Accessibility Rules

### Mandatory Requirements

- ALL inputs MUST have associated labels
- Labels MUST be programmatically linked

---

### Keyboard Navigation

- MUST support:
  - Tab navigation
  - Enter/Submit actions
  - Arrow navigation (for radios/selects)

---

### Focus Management

- Visible focus indicators REQUIRED
- Logical tab order MUST be maintained

---

### Error Accessibility

- Errors MUST be readable by screen readers
- MUST NOT rely on color alone

---

### Contrast

- MUST comply with color system contrast rules

---

## 8. UX Writing for Forms

### Labels

- MUST be:
  - Clear
  - Concise
  - Descriptive

---

### Placeholders

- OPTIONAL
- MUST NOT replace labels
- SHOULD provide examples only

---

### Helper Text

- MUST guide user input
- MUST NOT repeat label content

---

### Error Messages

- MUST explain:
  - What went wrong
  - How to fix it

---

## 9. Technical & Interaction Rules

### Component Structure Pattern

Each field MUST follow:

- Container
  - Label
  - Input
  - Helper/Error Text

---

### State Logic Flow

User → Input → Validation → Feedback → Correction → Submission

---

### Conditional Fields

- MUST appear only when triggered
- MUST maintain layout consistency
- MUST be validated when visible

---

### Dependencies

- Fields dependent on others MUST:
  - Be disabled until conditions are met
  - Update dynamically

---

### Submission Behavior

- On Submit:
  - Validate all fields
  - Show loading state
  - Prevent duplicate submissions

---

### Success State

- Show confirmation message
- Optionally reset form

---

### Failure State

- Show clear error feedback
- Preserve user input

---

## 10. Do / Don’t Guidelines

### DO

- Use consistent field structure
- Use design tokens for ALL styling
- Provide clear validation feedback
- Maintain accessibility compliance

---

### DON’T

- Do NOT use placeholders as labels
- Do NOT hide validation errors
- Do NOT create inconsistent layouts
- Do NOT block user understanding with disabled states
- Do NOT use vague error messages

---

## 11. Edge Cases & Exceptions

### Missing Design Tokens

- FAIL rendering
- Do NOT fallback to hardcoded styles

---

### Third-Party Components

- MUST be wrapped and styled using system tokens
- MUST follow all form rules

---

### Dynamic Content

- MUST map to predefined components
- MUST follow validation rules

---

### Unknown Input Type

- Default to:
  - Text Input

---

### Final Enforcement Rule

- ANY form not following this system is INVALID
- ALL agents MUST strictly comply
- Violations MUST result in rejection or correction

---