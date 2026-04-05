# SendSignal – Loading State System Skill (loading-state.md)

---

## 1. Overview

This document defines the **loading state system skill** for SendSignal.

Purpose:

- Standardize loading state patterns across the platform
- Provide clear user feedback during data or UI load
- Improve perceived performance
- Enable AI agents to generate and enforce loading states consistently

---

## 2. Loading State Principles

- ALWAYS indicate that content or actions are loading
- NEVER leave users uncertain or without visual feedback
- Loading states MUST be contextual, minimal, and non-intrusive
- Motion MUST be subtle, smooth, and consistent
- All styling MUST reference design tokens (color, typography, spacing, motion)
- Support multiple loading state types for different UI contexts

---

## 3. Types of Loading States

| Type | Purpose | When to Use | User Perception | Required UI Elements |
|------|--------|-------------|----------------|-------------------|
| Spinner / Circular Progress | Indicate indeterminate loading | Small areas, actions with unknown duration | Immediate feedback, ongoing progress | Circular indicator, color role |
| Linear / Progress Bar | Indicate known progress | File uploads, multi-step processes | Sense of completion | Horizontal bar, primary color, progress percentage optional |
| Skeleton Screens | Placeholder for content | Lists, tables, cards, sections | Structure anticipation | Shaped placeholders, greyed color roles |
| Content Placeholder | Stand-in for content layout | Individual cards, tables, lists | Anticipation of final content | Empty containers, shadow or background color |
| Full-page Loading | Entire view loading | Initial page load, dashboard | Full attention, avoids interaction | Centered spinner, optional title, background surface |
| Section-level Loading | Partial UI loading | Components within a page | Contextual feedback without blocking full page | Skeletons or spinners confined to section |

---

## 4. Structure & Layout Rules

- ALWAYS align loading indicators with the content they replace
- Use spacing defined by design tokens (`--spacing-sm`, `--spacing-md`, etc.)
- Maintain minimal disruption to surrounding UI
- Skeletons MUST match dimensions and layout of actual content
- Indicators MUST be sized appropriately for their context:
  - Spinner: small (16–32px) for inline, medium (48px) for sections
  - Linear bar: full width of container, consistent height via token
- NEVER hardcode sizes or positions

---

## 5. Visual & Motion Guidelines

- Animations MUST be smooth, subtle, and repeatable
- Avoid flicker, abrupt jumps, or excessive motion
- Use color roles consistently:
  - Primary color for active indicators
  - Surface or secondary color for background placeholders
- Skeleton shapes MUST mirror final content
- Timing recommendations:
  - Spinner rotation: 1s per rotation
  - Linear bar animation: ease-in-out 300–500ms
- NEVER introduce arbitrary colors or motion speeds

---

## 6. Interaction Behavior Rules

- Loading state MUST appear immediately when triggered
- Transition out MUST be smooth when content is ready
- DO NOT block unrelated UI interactions unless critical
- Provide fallback UI or retry options for slow/failed loads
- AI-driven logic flows:
  - Detect trigger condition → show appropriate loading state → replace with content on completion
  - Maintain loading state until content fully renders

---

## 7. Google Material Design Alignment

- Use Material Design standard indicators:
  - Circular: `indeterminate` progress
  - Linear: `determinate` and `indeterminate` progress bars
- Skeletons MUST respect elevation, padding, and layout conventions
- Responsive behavior:
  - Full-page loading covers viewport, section-level adjusts to container
- Perceived performance:
  - Use placeholders to maintain structure and reduce layout shifts

---

## 8. Accessibility Rules

- Loading indicators MUST be perceivable for screen readers:
  - Spinner: `aria-busy="true"`, `role="status"`
  - Progress bar: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Avoid conveying state solely through color
- Maintain sufficient contrast for visual indicators
- Provide descriptive labels where appropriate
- NEVER hide loading states from assistive technologies

---

## 9. Technical & State Handling Rules

- Component structure MUST be modular and reusable
- Trigger conditions:
  - Spinner: short, indeterminate actions
  - Linear: actions with measurable progress
  - Skeleton: content-heavy components
  - Full-page: initial page load or large data load
- Fallback behavior:
  - If content fails to load → replace with error state component
- Transition logic:
  - Enter → active animation → exit → render content
- NEVER skip loading state for network-dependent content

---

## 10. AI-Agent Enforcement Rules

- ALWAYS detect context and select appropriate loading type
- ALWAYS apply motion and visual rules based on design tokens
- ALWAYS manage transitions deterministically
- NEVER apply hardcoded styles
- Skeletons MUST replicate final content layout exactly
- Progress bars MUST reflect accurate or estimated progress when possible

---

## 11. Do / Don’t Guidelines

### DO

- Use design tokens for all colors, spacing, typography, and motion
- Provide immediate feedback on user action
- Match skeletons to content structure
- Maintain smooth transitions and consistent animation
- Keep loading states contextual and minimal

### DON’T

- Do NOT block the entire UI unnecessarily
- Do NOT use arbitrary motion, colors, or sizes
- Do NOT leave users without feedback
- Do NOT mix loading types within the same context inconsistently
- Do NOT rely on visuals alone for feedback

---

## 12. Edge Cases & Exceptions

- Extremely slow network:
  - Maintain skeletons or spinners up to 10s
  - Provide retry option if timeout exceeded
- Partial content load:
  - Section-level loading should not disrupt loaded sections
- Dynamic content updates:
  - Loading states must update when new data triggers fetch
- Missing design tokens:
  - FAIL rendering
  - NEVER fallback to hardcoded values
- Embedded third-party content:
  - Loading states MUST comply with system rules and token usage