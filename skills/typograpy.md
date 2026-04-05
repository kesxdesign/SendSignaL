# SendSignal – Typography System Skill (typography.md)

---

## 1. Overview

This document defines the **typography system skill** for SendSignal.

Purpose:
- Standardize all typography usage
- Enforce strict CSS variable usage
- Maintain consistent hierarchy and readability
- Enable deterministic UI generation by AI agents

---

## 2. Typography System Principles

All implementations MUST follow:

- Role-based typography usage
- Consistent hierarchy across UI
- No hardcoded font values
- Readability-first design
- Clear visual distinction between text levels

Rules:

- ALWAYS use predefined typography roles
- NEVER use raw values (px, rem, font-weight, line-height)
- NEVER override typography variables locally
- NEVER mix multiple typography roles in one element

---

## 3. Source of Truth (CSS Variables)

All typography MUST come from predefined CSS variables.

### Rule Set

- Use syntax:
  - `var(--text-*)`
- Variables are globally defined in the design system
- Skills MUST NOT define or override values

### Naming Convention

- Display:
  - `--text-display-lg`
  - `--text-display-md`

- Headline:
  - `--text-headline-lg`
  - `--text-headline-md`

- Title:
  - `--text-title-lg`
  - `--text-title-md`

- Body:
  - `--text-body-lg`
  - `--text-body-md`
  - `--text-body-sm`

- Label:
  - `--text-label-lg`
  - `--text-label-md`
  - `--text-label-sm`

- Caption:
  - `--text-caption`

---

### Enforcement

- If a variable is missing → FAIL rendering
- No fallback to raw values allowed

---

## 4. Typography Roles & Usage Mapping

### Role → UI Mapping Table

| Role | Usage |
|------|------|
| Display | Hero sections, landing headers |
| Headline | Page titles, major sections |
| Title | Card titles, modal headers |
| Body | Paragraphs, descriptions |
| Label | Form labels, buttons, UI controls |
| Caption | Metadata, timestamps, helper text |

---

## 5. Text Hierarchy Rules

### Rules

- Each screen MUST follow a clear hierarchy:
  1. Display (optional)
  2. Headline
  3. Title
  4. Body
  5. Label / Caption

- NEVER skip hierarchy levels arbitrarily
- NEVER use Body text as a heading
- NEVER use Headline for small UI labels

---

### Spacing & Rhythm

- Line height and spacing are controlled by variables
- DO NOT manually adjust spacing

---

## 6. UI Application Rules

### Buttons

- Text:
  - `var(--text-label-md)`

---

### Inputs

- Label:
  - `var(--text-label-md)`
- Input text:
  - `var(--text-body-md)`
- Helper text:
  - `var(--text-caption)`

---

### Cards

- Title:
  - `var(--text-title-md)`
- Body:
  - `var(--text-body-md)`

---

### Modals

- Header:
  - `var(--text-title-lg)`
- Body:
  - `var(--text-body-md)`

---

### Navigation

- Menu items:
  - `var(--text-label-md)`
- Section headers:
  - `var(--text-title-md)`

---

### Tables

- Header:
  - `var(--text-label-md)`
- Cell content:
  - `var(--text-body-sm)`

---

## 7. State & Emphasis Rules

### Emphasis Levels

- Default → standard variable
- Medium / Bold → handled within variable definition

---

### States

- Disabled:
  - Use same typography role
  - Color handled via color system

- Focus / Active:
  - Typography does NOT change
  - Only color or outline changes

---

### Rules

- NEVER manually change font-weight
- NEVER manually change letter-spacing

---

## 8. Accessibility & Readability Rules

### Rules

- All text MUST be legible across devices
- Maintain sufficient contrast via color system
- Avoid overly small text for critical content

---

### Minimum Guidelines

- Body text MUST use:
  - `--text-body-sm` or larger
- Caption:
  - Only for secondary info
  - NEVER for primary content

---

### Long-Form Text

- Use:
  - `--text-body-lg` or `--text-body-md`
- Ensure comfortable line spacing (handled via variables)

---

## 9. Responsive Typography Rules

### Rules

- Typography MUST adapt via CSS variables
- DO NOT manually scale text per breakpoint
- Variables handle responsiveness internally

---

### Enforcement

- NEVER define media-query-based font overrides
- ALWAYS rely on system variables

---

## 10. Do / Don’t Guidelines

### DO

- Use semantic typography roles
- Use `var(--text-*)` for ALL text
- Maintain clear hierarchy
- Ensure readability

---

### DON’T

- Do NOT use px, rem, em values
- Do NOT override font-weight manually
- Do NOT mix roles inconsistently
- Do NOT use Caption for primary content
- Do NOT break hierarchy rules

---

## 11. Edge Cases & Exceptions

### Missing Variables

- FAIL rendering
- Do NOT fallback to raw values

---

### Third-Party Components

- Override typography using system variables
- Do NOT allow default fonts

---

### Dynamic Content

- Map to closest valid role
- Example:
  - Short label → Label
  - Long text → Body

---

### Unknown Context

- Default to:
  - `var(--text-body-md)`

---

### Final Enforcement Rule

- ANY typography outside this system is INVALID
- ALL agents MUST strictly comply
- Violations must result in rejection or correction

---