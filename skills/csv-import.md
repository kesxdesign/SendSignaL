# SendSignal – CSV Import System Skill (csv-import.md)

---

## 1. Overview

This document defines the **CSV import system skill** for SendSignal.

Purpose:

- Standardize CSV import workflows
- Ensure consistent user guidance and validation
- Provide clear visual, interaction, and backend rules
- Enable AI agents to handle CSV imports deterministically
- Improve data quality and error recovery

---

## 2. CSV Import Principles

- ONLY accept **comma-delimited, UTF-8 encoded CSV files**
- Maximum file size: defined by system constraint (`var(--csv-max-size)`)
- Provide clear **accepted/rejected file messaging**
- Display guidance on required file structure and headers
- NEVER proceed with import without validation and mapping
- ALWAYS enforce **data type, duplicate, and missing value rules**
- Provide **progress feedback** during large file imports

---

## 3. UI & Interaction Guidelines

- File upload interface MUST:
  - Use existing form components
  - Support drag-and-drop AND file selector
  - Show file name, size, and type upon selection
  - Include a **preview table** of first N rows
- Mapping interface MUST:
  - Allow user to map CSV columns to system fields
  - Show suggested default mapping based on header match
  - Highlight unmapped or invalid columns
- Use **loading states** during file parsing and processing
- Show **notifications** for success, partial import, or failure
- Follow all **design tokens**:
  - Color: `--color-primary`, `--color-error`, `--color-success`
  - Typography: `--text-body-md`, `--text-label-sm`
  - Spacing: `--spacing-sm`, `--spacing-md`

---

## 4. File Requirements & Validation Rules

| Rule | Description | Enforcement |
|------|------------|------------|
| Required headers | All mandatory fields MUST be present | Validate on file load, reject missing headers |
| Supported fields | Only system-recognized columns accepted | Highlight unsupported columns in preview |
| Data type checks | Strings, numbers, dates, boolean | Inline validation in preview, errors flagged |
| Duplicates | Detect duplicate rows or identifiers | Prompt user to remove or merge |
| Missing values | Flag required fields with missing data | Prevent import until corrected |
| Character limits | Enforce max length per field | Truncate or reject exceeding values |
| Sanitization | Strip invalid characters (e.g., control chars) | Clean data before storage |

- ALL error messages MUST be **clear, specific, and actionable**
- Provide **helper text** inline for guidance

---

## 5. Mapping & Preview Rules

- Mapping interface MUST:
  - Display CSV headers alongside system fields
  - Allow drag-and-drop or dropdown selection
  - Highlight unmapped columns with `--color-warning`
- Default mapping rules:
  - Header matches system field → auto-map
  - Case-insensitive and trim whitespace
- Preview table:
  - Display first 5–10 rows
  - Show errors or warnings inline
  - Use **token-based table styling**
- NEVER allow import without resolved mapping

---

## 6. Error Handling & Feedback

- Inline validation messages for:
  - Missing headers
  - Invalid data types
  - Duplicate rows
  - Character limit violations
- Notifications:
  - Success → `--color-success`
  - Partial import → `--color-warning`
  - Failure → `--color-error`
- Rollback rules:
  - Partial imports must NOT corrupt existing data
  - Provide **undo or retry actions**
- Edge case handling:
  - Empty file → reject with guidance
  - Unsupported format → reject with specific error
  - Large dataset → show progress and skeleton preview
- Log all errors for **analytics and debugging**

---

## 7. Google Material Design Alignment

- Form components, tables, and notifications MUST follow Material Design guidelines
- Visual hierarchy:
  - Primary action (Import) prominent
  - Secondary actions (Cancel, Reset) secondary
- Proper spacing and padding per design tokens
- Elevation and overlays applied consistently
- Motion and transitions:
  - Loading, validation, and notifications animate per system motion tokens
- Responsive behavior for different viewport sizes

---

## 8. Accessibility Rules

- File upload:
  - Accessible via keyboard and screen readers
  - Focus indicators for drag-and-drop and file selector
- Inline errors and helper text:
  - ARIA live regions for dynamic validation
- Preview tables:
  - Proper semantic headers and scope attributes
- Notifications and error messages:
  - High contrast using design tokens
  - Avoid conveying meaning through color alone

---

## 9. Technical & Backend Handling Rules

- Parsing rules:
  - UTF-8 CSV only, handle BOM
  - Detect line breaks (`\n`, `\r\n`)
  - Trim whitespace from headers and values
- Validation and transformation:
  - Convert types according to system schema
  - Apply sanitization rules before storage
- Mapping logic:
  - Map CSV column → system field deterministically
  - Fallback: require manual mapping for unmatched columns
- Performance:
  - Support large CSVs via streaming or chunked processing
  - Loading skeletons for UI preview
- Fallback behavior:
  - Import fails → rollback partial inserts
  - Retry and logging mechanisms

---

## 10. AI-Agent Enforcement Rules

- ALWAYS validate CSV format before parsing
- ALWAYS enforce mapping rules before proceeding with import
- ALWAYS apply data type, duplicate, and missing value checks
- NEVER allow import without confirmed mapping
- AI agents MUST:
  - Generate validation messages deterministically
  - Trigger appropriate UI states (loading, success, error)
  - Queue notifications per result
  - Update preview tables with live validation

---

## 11. Do / Don’t Guidelines

### DO
- Use system form components for upload
- Provide clear preview of CSV data
- Highlight errors inline and in notifications
- Follow design tokens strictly
- Support large files with progressive loading
- Provide undo/rollback for partial imports

### DON’T
- Do NOT allow arbitrary file formats
- Do NOT hardcode styling, spacing, or typography
- Do NOT skip mapping or validation steps
- Do NOT block UI unnecessarily during import
- Do NOT ignore accessibility requirements

---

## 12. Edge Cases & Exceptions

- Multiple files uploaded simultaneously → reject, allow one at a time
- File partially corrupt → parse valid rows, highlight invalid rows
- Very large file exceeding system limit → reject with clear guidance
- Missing optional columns → proceed but warn user
- Network failure during import → rollback changes, show retry option
- BOM and unusual character encoding → detect, warn, and normalize