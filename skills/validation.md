# SendSignal – Validation System Skill (validation.md)

---

## 1. Overview

This document defines the **validation system skill** for SendSignal.

Purpose:

- Standardize input and form validation across all modules
- Ensure immediate, actionable, and accessible feedback
- Integrate with existing design system components (forms, inputs, notifications, loading states)
- Provide deterministic rules for AI agents and developers
- Prevent invalid data submission and ensure error recovery

---

## 2. Validation Principles

- Validation MUST be **explicit, immediate, and contextual**
- Prevent form submission with invalid data
- Provide **clear guidance for correction**
- Consistency across all input types and forms is mandatory
- Always follow **design token-based styling** for error, warning, and success feedback
- NEVER rely solely on color to indicate validation states
- Ensure **predictable behavior** for both client-side and server-side validation

---

## 3. Validation Types

| Type | Purpose | When to Use | UI Requirements |
|------|---------|------------|----------------|
| Required Fields | Ensure mandatory data is provided | Always for critical fields | Inline indicator, helper text, error color |
| Format/Pattern Validation | Verify syntax (email, phone, URL) | On input change and blur | Inline message, icon indicator |
| Range / Numeric Validation | Enforce min/max values | Numeric inputs, quantity, dates | Inline feedback, tooltip guidance |
| Cross-field Validation | Ensure interdependent fields match (e.g., password confirmation) | On submit or blur | Highlight both fields, show message |
| Custom Business Rules | Apply product-specific constraints | As defined by backend rules | Inline or form-level messages |
| Server-side Validation | Validate against backend (uniqueness, external rules) | On submit or asynchronous triggers | Inline message, loading state indicator |

---

## 4. Error Messaging Rules

- MUST be **clear, actionable, and concise**
- Inline errors should appear **directly below the field**
- Global error banners may summarize **form-wide issues**
- Avoid technical jargon
- Provide **user guidance** (e.g., “Use a valid email address”)
- Include success and warning messaging where applicable
- Message styling MUST use **design tokens**:
  - Error: `--color-error`
  - Success: `--color-success`
  - Warning: `--color-warning`
- NEVER hardcode messages; always support dynamic context

---

## 5. Field & Form Validation Rules

- Inline validation triggers:
  - On **field blur**
  - On **input change** (optional for real-time validation)
- Form-level validation triggers:
  - On **submit**
  - After server-side checks
- Highlight invalid fields using:
  - Border or underline color: `--color-error`
  - Status icon: warning/error glyph
- Provide **helper text** for guidance
- Maintain **consistent rules across similar input types**:
  - Text → max length, required
  - Numeric → min/max, required
  - Email → pattern validation
  - Password → min length, strength validation
- NEVER allow form submission if any field fails validation

---

## 6. Inline & Global Feedback Guidelines

- Inline messages:
  - Positioned directly beneath the field
  - Visually distinct using design tokens
  - Optional icon indicating error/warning/success
- Global messages:
  - Banner at form top for multiple errors
  - Summarize key issues
  - Allow user to dismiss or focus on first error
- Motion:
  - Use subtle fade-in/out for error states
  - Avoid excessive animation that distracts
- Maintain **alignment and spacing** per design tokens

---

## 7. Google Material Design Alignment

- Follow **Material Design form validation patterns**
- Maintain:
  - Clear hierarchy between label, input, helper text
  - Proper spacing and padding
  - Consistent typography: `--text-label-sm`, `--text-body-md`
- Error/warning/success color usage:
  - Error: `--color-error`
  - Warning: `--color-warning`
  - Success: `--color-success`
- Use standard **icons** for validation feedback
- Motion and transitions per design tokens

---

## 8. Accessibility Rules

- Validation MUST be **screen reader accessible**
  - Inline messages: `aria-describedby` linked to field
  - Global messages: ARIA live region
- Sufficient contrast for all states
- Do NOT rely solely on color
- Keyboard navigation must expose error messages
- Ensure icons have descriptive text or ARIA labels
- Maintain focus management on error state (optional: focus first invalid field)

---

## 9. Technical & Backend Handling Rules

- Client-side validation:
  - Enforce required fields, format, range, cross-field rules
  - Optional real-time validation for user convenience
- Server-side validation:
  - Required for uniqueness, business logic, security constraints
  - Returns structured error messages
- Execution order:
  1. Field-level synchronous validation
  2. Cross-field synchronous validation
  3. Server-side asynchronous validation
- Async validation handling:
  - Show loading indicators
  - Block submission until resolved
- Fallback:
  - Log validation failures for analytics and debugging
  - Provide retry mechanism for async validation failures

---

## 10. AI-Agent Enforcement Rules

- ALWAYS validate required fields before submission
- ALWAYS enforce pattern, range, and cross-field rules
- NEVER allow submission if any validation fails
- AI agents MUST:
  - Generate inline or global messages dynamically
  - Apply correct design token styling
  - Trigger loading states for asynchronous checks
  - Focus user on first invalid input when multiple errors exist
- Rules MUST be deterministic and repeatable

---

## 11. Do / Don’t Guidelines

### DO
- Use system form components
- Provide immediate, contextual feedback
- Use design tokens for colors, typography, spacing
- Highlight errors with icons and messages
- Maintain consistent rules across input types
- Support async validation with loading states

### DON’T
- Do NOT rely solely on color to indicate errors
- Do NOT allow invalid submissions
- Do NOT use vague messages
- Do NOT mix inline and global feedback inconsistently
- Do NOT block UI unnecessarily

---

## 12. Edge Cases & Exceptions

- Optional fields → allow empty but validate if input present
- Multiple errors on single field → show most critical first
- Delayed server response → display loading indicator, prevent duplicate submissions
- Conflicting cross-field rules → highlight all relevant fields
- External API validation failures → show retry and descriptive guidance
- Dynamic form fields → apply validation rules dynamically upon creation