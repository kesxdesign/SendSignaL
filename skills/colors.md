# SendSignal – Color System Skill (colour.md)

---

## 1. Overview

This document defines the **color system skill** for SendSignal.

Purpose:
- Standardize all color usage across UI
- Enforce strict reliance on CSS variables
- Ensure accessibility and consistency
- Enable deterministic UI generation by AI agents

---

## 2. Color System Principles

All implementations MUST follow:

- Semantic color usage (NOT visual guessing)
- Consistent role-based mapping
- No hardcoded values
- Accessibility-first design
- Predictable state transitions

Rules:

- ALWAYS use semantic roles (primary, surface, error, etc.)
- NEVER use raw color values (hex, rgb, hsl)
- NEVER invent new color variables
- ALWAYS match UI intent to correct role

---

## 3. Source of Truth (CSS Variables)

All colors MUST come from predefined CSS variables.

### Rule Set

- Use syntax:
  - `var(--color-*)`
- Variables are defined globally in the design system
- Skills MUST NOT redefine or override variables

### Naming Convention

- `--color-primary`
- `--color-on-primary`
- `--color-secondary`
- `--color-surface`
- `--color-background`
- `--color-error`
- `--color-on-error`
- `--color-outline`
- `--color-muted`

### Enforcement

- If a variable is missing → FAIL rendering
- No fallback to raw values allowed

---

## 4. Color Roles & Usage Mapping

### Role → UI Mapping Table

| Role | Usage |
|------|------|
| Primary | Primary buttons, key CTAs |
| On Primary | Text/icons on primary |
| Secondary | Secondary actions |
| Surface | Cards, modals, containers |
| Background | Page background |
| Error | Errors, destructive actions |
| On Error | Text/icons on error |
| Outline | Borders, dividers |
| Muted | Disabled, inactive elements |

---

## 5. UI Application Rules

### Buttons

- Primary Button:
  - Background: `var(--color-primary)`
  - Text: `var(--color-on-primary)`

- Secondary Button:
  - Background: transparent
  - Border: `var(--color-outline)`
  - Text: `var(--color-primary)`

- Destructive Button:
  - Background: `var(--color-error)`
  - Text: `var(--color-on-error)`

---

### Inputs

- Background: `var(--color-surface)`
- Border: `var(--color-outline)`
- Text: `var(--color-on-surface)`

Error State:
- Border: `var(--color-error)`
- Text: `var(--color-error)`

---

### Cards / Containers

- Background: `var(--color-surface)`
- Border: `var(--color-outline)`

---

### Text

- Primary text: `var(--color-on-surface)`
- Secondary text: `var(--color-muted)`
- Error text: `var(--color-error)`

---

### Backgrounds

- App background: `var(--color-background)`
- Elevated surfaces: `var(--color-surface)`

---

## 6. State Variations

Each interactive element MUST support states:

### States

- Default
- Hover
- Active (Pressed)
- Focus
- Disabled

### Rules

- Hover:
  - Slight variation of base role (handled via CSS system)
- Active:
  - Stronger emphasis of role
- Focus:
  - Outline using `var(--color-primary)`
- Disabled:
  - Use `var(--color-muted)`
  - Reduce opacity (controlled globally)

---

## 7. Accessibility & Contrast Rules

### Minimum Contrast Ratios (WCAG)

- Normal text:
  - ≥ 4.5:1
- Large text:
  - ≥ 3:1
- UI components:
  - ≥ 3:1

---

### Rules

- ALWAYS pair:
  - `--color-primary` with `--color-on-primary`
  - `--color-error` with `--color-on-error`
- NEVER place text directly on background without `on-*` pairing
- Disabled elements must remain readable

---

## 8. Theming (Light/Dark Mode)

### Rules

- CSS variables MUST support theme switching
- Skills MUST NOT hardcode theme behavior

### Behavior

- Same variable names
- Different values per theme

Example:

- `--color-background` adapts per theme
- `--color-on-surface` ensures contrast

---

## 9. Do / Don’t Guidelines

### DO

- Use semantic roles only
- Use `var(--color-*)` for ALL colors
- Follow role-to-component mapping
- Ensure accessibility compliance

---

### DON’T

- Do NOT use hex, rgb, hsl
- Do NOT invent new color variables
- Do NOT override system variables locally
- Do NOT mix multiple roles arbitrarily
- Do NOT bypass accessibility rules

---

## 10. Edge Cases & Exceptions

### Missing Variables

- FAIL rendering
- Do NOT fallback to hardcoded values

---

### Third-Party Components

- Wrap and override styles using system variables
- Do NOT allow raw colors

---

### Dynamic Content

- Map dynamic states to predefined roles only
- Example:
  - success → use secondary or defined success role (if exists)

---

### Unsupported States

- Default to:
  - `var(--color-surface)` + `var(--color-on-surface)`

---

### Final Enforcement Rule

- ANY UI using colors outside this system is INVALID
- ALL agents MUST strictly comply
- Violations must result in rejection or correction

---