# SendSignal – Notification System Skill (notification.md)

---

## 1. Overview

This document defines the **notification system skill** for SendSignal.

Purpose:

- Standardize notification patterns across the platform
- Provide clear and contextual feedback to users
- Ensure consistent visual, motion, and interaction behavior
- Enable AI agents to generate notifications deterministically

---

## 2. Notification Principles

- ALWAYS provide timely, relevant feedback
- NEVER block critical user actions unnecessarily
- Notifications MUST be contextual, concise, and actionable
- Use design tokens for all styling: color, typography, spacing, motion
- Support multiple notification types and statuses for clarity
- Ensure responsiveness and accessibility at all times

---

## 3. Types of Notifications

| Type | Purpose | When to Use | Expected User Perception | Required UI Elements |
|------|--------|-------------|------------------------|-------------------|
| Toast / Snackbar | Brief, transient messages | Minor updates, confirmations | Quick acknowledgment, non-intrusive | Message text, optional icon, optional dismiss action |
| Inline / Banner Alert | Persistent contextual feedback | Validation, warnings, important info | Noticeable but non-modal | Message text, optional icon, optional action button |
| Modal Notification | Urgent or blocking feedback | Critical errors, approvals, confirmations | Immediate attention required | Message text, icon, primary and secondary actions |
| System Notification | Platform-wide updates | Notifications independent of user context | Passive awareness | Message text, optional icon, optional action |
| Contextual Notification | Component or feature-specific | Action feedback within context | Direct relevance to user action | Message text, optional icon, optional action button |
| Status Variations | Error, Success, Warning, Info | All above notification types | Convey specific meaning via color and icon | Status-specific color token, optional icon |

---

## 4. Structure & Layout Rules

- Each notification MUST include:
  - **Message text** – clear, concise, outcome-oriented
  - **Optional icon** – status or context indicator
  - **Optional actions** – dismiss, undo, view
- Layout:
  - Placement MUST follow context (top/bottom of viewport or inline)
  - Spacing MUST reference design tokens (`--spacing-sm`, `--spacing-md`)
  - Typography MUST use predefined roles (`var(--text-body-md)`, `var(--text-label-sm)`)
- NEVER hardcode padding, margins, or font sizes
- Maintain consistent hierarchy across notifications

---

## 5. Visual & Motion Guidelines

- Animations MUST be subtle, smooth, and consistent
- Use design tokens for colors:
  - Error → `--color-error`
  - Success → `--color-success`
  - Warning → `--color-warning`
  - Info → `--color-info`
- Entrance/exit transitions:
  - Duration: 200–300ms
  - Easing: standard ease-in-out
- Avoid motion that distracts or confuses
- Icons MUST be status-representative and token-compliant
- NEVER mix colors, typography, or motion outside design tokens

---

## 6. Interaction & Behavior Rules

- Dismissal:
  - Toast/snackbar: auto-dismiss unless user action required
  - Banner/inline: optional manual dismissal
  - Modal: MUST be manually acknowledged or actioned
- Action buttons:
  - MUST trigger defined callbacks
  - Maintain consistent spacing and hierarchy
- Queueing:
  - Multiple notifications must stack without overlap
  - NEW notifications do not remove active ones unless priority rules apply
- State transitions:
  - Pending → success/error → auto-dismiss or user action
- NEVER allow notifications to block unrelated UI unnecessarily

---

## 7. Timing & Duration Rules

- Toast/snackbar durations:
  - Short: 2s–3s
  - Medium: 3s–5s
  - Long: 5s–8s
- Auto-dismiss rules:
  - Only for non-critical notifications
- Persistent notifications:
  - Require explicit user dismissal
- Minimum visible time for actionable notifications: 3s
- Queue delays:
  - NEW notifications wait for visible notification to complete unless priority overrides
- NEVER allow indefinite display without user control for critical messages

---

## 8. Google Material Design Alignment

- Follow Material Design snackbar, toast, banner, and modal conventions
- Visual hierarchy:
  - Primary actions prominent
  - Secondary actions subtle
- Status color roles used consistently
- Motion and entrance/exit transitions per Material guidance
- Responsive:
  - Top/bottom placement adjusts to viewport
  - Inline notifications adapt to container width
- Maintain consistent padding, elevation, and spacing

---

## 9. Accessibility Rules

- Notifications MUST be perceivable for screen readers:
  - Role: `status` or `alert`
  - Aria-live for dynamic content
- Maintain sufficient color contrast (tokens)
- Provide descriptive text for icons
- Ensure keyboard navigation:
  - Dismiss buttons accessible via Tab/Enter
- NEVER convey meaning via color alone
- All interactive elements MUST have accessible labels

---

## 10. Technical & State Handling Rules

- Component structure MUST be modular and reusable
- State logic:
  - Trigger → show notification type → handle duration → dismiss/resolve
- Priority rules:
  - Critical errors override passive notifications
  - Queue non-critical notifications in FIFO order
- Fallback behavior:
  - If component fails to render, log error, use default notification fallback
- NEVER bypass design token usage or prescribed state flows

---

## 11. AI-Agent Enforcement Rules

- ALWAYS detect context and select appropriate notification type
- ALWAYS apply visual, motion, and timing rules per design tokens
- ALWAYS manage queues and state transitions deterministically
- NEVER mix notification types or bypass interaction rules
- AI must generate notifications that:
  - Match typography, spacing, and color tokens
  - Include required optional actions when applicable
  - Align with user action context

---

## 12. Do / Don’t Guidelines

### DO
- Use design tokens for all styling
- Provide immediate feedback relevant to user action
- Maintain consistent placement and motion
- Ensure notifications are accessible and perceivable
- Queue multiple notifications logically

### DON’T
- Do NOT block critical UI unnecessarily
- Do NOT hardcode colors, sizes, or motion
- Do NOT rely on color alone to convey status
- Do NOT allow notifications to overlap or obscure primary content
- Do NOT ignore duration and dismissal rules

---

## 13. Edge Cases & Exceptions

- Multiple simultaneous critical notifications:
  - Stack with priority order, highlight most urgent
- Slow network actions:
  - Ensure notifications reflect pending, success, or failure states
- Missing design tokens:
  - Fail rendering, NEVER fallback to hardcoded styles
- Modal notifications triggered by background processes:
  - Only display if user context is relevant and urgent
- Persistent notifications in limited viewport:
  - Adjust width and placement according to container constraints