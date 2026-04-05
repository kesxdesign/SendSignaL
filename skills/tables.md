# SendSignal – Tables System Skill (tables.md)

---

## 1. Overview

This document defines the **tables system skill** for SendSignal.

Purpose:
- Standardize all table and data grid usage
- Ensure clarity and readability of structured data
- Enforce strict design system usage
- Enable deterministic table generation by AI agents

---

## 2. Table Design Principles

All tables MUST follow:

- Clarity over density
- Consistent structure across all tables
- Readability at all screen sizes
- Predictable interaction patterns
- Accessibility-first design

Rules:

- ALWAYS use structured table layouts
- NEVER create arbitrary grid systems
- NEVER hardcode styles (colors, spacing, typography)
- ALWAYS use design tokens (CSS variables)

---

## 3. Table Structure & Layout Rules

### Standard Table Structure (MANDATORY)

Each table MUST include:

1. Header Row  
2. Data Rows  
3. Optional Footer (pagination, summaries)

---

### Layout Rules

- Columns MUST align consistently across rows
- Use spacing tokens for padding and gaps
- Use color tokens for backgrounds and dividers
- Maintain consistent row height

---

### Table Container

- MUST use surface color role
- MUST support horizontal scrolling if overflow occurs
- MUST NOT break layout on smaller screens

---

## 4. Column & Row Definitions

### Column Types

| Type | Description |
|------|------------|
| Text | Names, labels, descriptions |
| Numeric | Counts, metrics, values |
| Status | Tags, states (e.g., active, pending) |
| Date/Time | Timestamps |
| Actions | Buttons, menus |
| Selection | Checkbox or radio |

---

### Alignment Rules

- Text → Left-aligned  
- Numeric → Right-aligned  
- Status → Center-aligned  
- Actions → Right or center-aligned  
- Selection → Left-aligned  

---

### Row Behavior

- Hover:
  - MUST highlight row using tokens

- Click:
  - MUST trigger row-level action if defined

- Selection:
  - MUST visually indicate selected state

---

### Truncation Rules

- Long text MUST truncate with ellipsis
- Full content MUST be accessible via tooltip or expansion
- Columns MUST NOT overflow container

---

## 5. Table Variants

### Variant → Usage Table

| Variant | Use Case |
|--------|----------|
| Standard Table | Default data display |
| Dense Table | High data density (advanced users only) |
| Expandable Rows | Additional hidden details |
| Selectable Table | Bulk actions required |
| Sortable Table | Data comparison |
| Paginated Table | Large datasets |

---

### Variant Rules

- ALWAYS choose simplest variant first
- NEVER combine too many variants unnecessarily
- Expandable rows MUST maintain hierarchy
- Dense tables MUST preserve readability

---

## 6. Interaction & Behavior Rules

### Sorting

- MUST support single-column sorting
- Multi-column sorting ONLY if necessary
- Sorting state MUST be visually indicated

---

### Filtering

- MUST be external or inline (defined per use case)
- Filters MUST update table immediately

---

### Pagination

- REQUIRED for large datasets
- MUST display:
  - Current page
  - Total items (if available)

---

### Row Selection

- Checkbox for multi-select
- Radio for single-select
- MUST support:
  - Select all (if applicable)
  - Clear selection

---

### Bulk Actions

- MUST appear when rows are selected
- MUST clearly indicate affected items

---

### Interaction Flow

User → Action (sort/filter/select) → Table updates → Visual feedback

---

## 7. Table States

### States

- Default
- Hover
- Selected
- Loading
- Empty
- Error

---

### State Rules

- Default:
  - Neutral appearance using tokens

- Hover:
  - Highlight row

- Selected:
  - Distinct visual state using tokens

- Loading:
  - Use skeleton loaders or spinners
  - MUST preserve table structure

- Empty:
  - Show message + optional action

- Error:
  - Show clear error message
  - Provide retry option

---

## 8. Accessibility Rules

### Structure

- MUST use semantic table elements:
  - `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`

---

### Headers

- MUST define column headers
- MUST include proper scope attributes

---

### Keyboard Navigation

- MUST support:
  - Tab navigation
  - Arrow navigation (if interactive)

---

### Screen Readers

- MUST provide meaningful labels
- MUST announce sorting and selection states

---

### Contrast

- MUST comply with color system rules
- MUST NOT rely on color alone for meaning

---

## 9. Technical & Data Handling Rules

### Component Structure Pattern

- Table Container
  - Header Row
  - Body Rows
  - Footer (optional)

---

### State Logic Flow

Data → Render Table → User Interaction → Update State → Re-render

---

### Large Datasets

- MUST use pagination OR virtualization
- MUST avoid rendering all rows at once

---

### Lazy Loading

- SHOULD load data incrementally
- MUST show loading indicators

---

### Missing Data

- Display:
  - Placeholder (e.g., “—”)
- MUST NOT break layout

---

### Performance

- Optimize rendering for large datasets
- Avoid unnecessary re-renders

---

## 10. Do / Don’t Guidelines

### DO

- Use consistent table structure
- Use design tokens for ALL styling
- Ensure readability and alignment
- Provide clear interaction feedback

---

### DON’T

- Do NOT hardcode styles
- Do NOT overload tables with too many features
- Do NOT allow text overflow
- Do NOT hide important data
- Do NOT break alignment rules

---

## 11. Edge Cases & Exceptions

### Missing Design Tokens

- FAIL rendering
- Do NOT fallback to hardcoded styles

---

### Third-Party Tables

- MUST be wrapped with system tokens
- MUST comply with all rules

---

### Dynamic Data

- MUST map to correct column types
- MUST handle truncation and formatting

---

### Unknown Data Type

- Default to:
  - Text column

---

### Final Enforcement Rule

- ANY table not following this system is INVALID
- ALL agents MUST strictly comply
- Violations MUST result in rejection or correction

---