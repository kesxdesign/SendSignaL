# SendSignal – Empty State System Skill (empty-state.md)
---

## 1. Overview

This document defines the **empty state system skill** for SendSignal.

Purpose:

- Standardize empty state design across the product
- Guide users when no data is present
- Provide consistent messaging, layout, and interaction
- Ensure AI agents can generate and enforce empty states deterministically

---

## 2. Empty State Principles

- ALWAYS communicate why the state is empty
- ALWAYS guide users toward a next action
- NEVER leave empty space without explanation or guidance
- Focus on clarity, usability, and context
- Maintain consistent spacing, typography, and alignment using design tokens
- Support multiple empty state types for different scenarios

---

## 3. Types of Empty States

| Type | Purpose | When to Use | Required UI Elements |
|------|--------|-------------|-------------------|
| No Data | First-time use | User has not generated or added content | Visual, Title, Supporting text, Primary action |
| No Results | After search/filter | Query returned no results | Visual (optional), Title, Supporting text, Secondary action (optional) |
| Error State | Failure to load data | Network or server error occurred | Visual, Title, Supporting text, Primary action (retry) |
| Permission / Access | User lacks permissions | Restricted feature or page | Visual, Title, Supporting text, Primary action (request access) |
| Success but No Content | No actionable items yet | Edge cases where content is temporarily unavailable | Visual (optional), Title, Supporting text, Secondary action (optional) |

---

## 4. Structure & Layout Rules

- Layout MUST be centered or contextually aligned
- Spacing MUST use design tokens for margin and padding
- Typography MUST use predefined typography roles
- Components in order:

  1. Visual (icon or illustration, optional but recommended)
  2. Title (clear and concise)
  3. Supporting text (explanation or guidance)
  4. Primary action (if applicable)
  5. Secondary action (optional)

- ALWAYS maintain visual hierarchy
- NEVER use hardcoded spacing, colors, or fonts

---

## 5. Content & Messaging Rules

- Titles MUST be concise, descriptive, and outcome-oriented
- Supporting text MUST explain:
  - Why the state is empty
  - What the user can do next
- Action labels MUST be:
  - Specific
  - Actionable
  - Context-aware
- Tone:
  - Helpful
  - Neutral
  - Non-blaming
- NEVER use vague messaging like "No items found" without guidance
- ALWAYS align messaging with product context and user intent

---

## 6. Visual & Interaction Guidelines

- Visuals MUST support meaning without distracting
- Use color roles from design tokens
- Actions MUST:
  - Follow button hierarchy (primary / secondary)
  - Be visually prominent if critical
- Avoid more than 2 actionable elements per empty state
- Interactions:
  - Primary action triggers the most likely next step
  - Secondary action (if present) provides alternative or supplemental options

---

## 7. Google Material Design Alignment

- Follow Material Design guidance for empty states:
  - Clear hierarchy of content
  - Proper spacing and alignment
  - Minimal, focused layouts
  - Emphasis on primary actions
- Visuals and icons MUST have semantic meaning
- Typography hierarchy MUST be consistent and readable
- Actions MUST follow Material Design button specifications

---

## 8. Accessibility Rules

- Text MUST maintain contrast according to WCAG standards (via color tokens)
- Visuals MUST NOT convey meaning alone
- All actions MUST be keyboard accessible
- Screen readers MUST have descriptive text for:
  - Title
  - Supporting content
  - Actions
- NEVER rely solely on color or visuals for communication

---

## 9. Technical & State Handling Rules

- Component structure MUST be modular and reusable
- Empty state type MUST be determined by:
  - Data availability
  - User action context
  - Permissions and feature access
- Conditional rendering rules:
  - IF no data → render No Data state
  - IF search yields nothing → render No Results state
  - IF error → render Error state
  - IF restricted access → render Permission state
  - IF temporary success but no content → render Success but No Content
- Fallback behavior:
  - MUST render default No Data state if detection fails
- NEVER leave undefined empty states

---

## 10. AI-Agent Enforcement Rules

- ALWAYS detect empty state type based on conditions
- ALWAYS generate correct layout and messaging
- ALWAYS map visuals, typography, and actions to design tokens
- NEVER use hardcoded styles
- ALWAYS enforce primary and secondary action rules
- Actions MUST follow system interaction flows
- Messaging MUST comply with tone and clarity rules

---

## 11. Do / Don’t Guidelines

### DO

- Use predefined design tokens for all styling
- Provide clear guidance to the user
- Maintain hierarchy and spacing
- Include primary action for recovery or next step
- Align empty state messaging with user intent

### DON’T

- Do NOT leave empty spaces unexplained
- Do NOT overload with multiple unrelated actions
- Do NOT hardcode colors, typography, or spacing
- Do NOT use generic or vague messages
- Do NOT rely solely on visuals for user guidance

---

## 12. Edge Cases & Exceptions

- Missing design tokens:
  - FAIL rendering
  - Do not fallback to hardcoded values

- Dynamic content updates:
  - Empty states MUST update in real-time when data changes
  - MUST transition smoothly between states

- Unknown user context:
  - Default to No Data state
  - Provide guidance to generate content or perform initial action

- Multi-step actions:
  - Empty state MUST not break step flows
  - Provide actionable guidance per step

- Third-party embedded components:
  - MUST comply with all empty state rules
  - MUST maintain spacing, alignment, and accessibility