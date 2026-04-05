# SendSignal – Global Skills Rulebook (skills.md)

---

## 1. Overview

This document defines the **global rules and standards** for all skill modules in SendSignal.  
It establishes consistent behavior, execution, and composition rules for AI agents interacting with `/skills` modules.  

All skills MUST adhere to these rules to ensure:

- Predictable execution
- Deterministic output
- Safe composition
- Scalable, maintainable architecture

---

## 2. Skill Definition

A **skill** is a modular, autonomous capability that performs a specific function within SendSignal.  

Characteristics:

- Encapsulated logic
- Defined inputs and outputs
- Deterministic behavior
- Stateless or stateful with explicit state rules
- Observable and auditable

Skills cannot:

- Perform side effects outside allowed system boundaries without passing through enforcement layers
- Directly modify other skill modules
- Bypass global rate limits or compliance rules

---

## 3. Skill Lifecycle

1. **Creation**
   - Skill is instantiated in the `/skills` folder
   - Must conform to global schema
   - Must declare all inputs, outputs, dependencies, and state requirements

2. **Initialization**
   - Skill prepares internal resources
   - Validates environment and dependencies

3. **Execution**
   - AI agent calls skill with structured inputs
   - Skill produces deterministic outputs
   - Skill observes rate limits and compliance rules

4. **Termination**
   - Skill releases resources
   - State (if any) is persisted or reset according to schema
   - Execution logs are emitted

---

## 4. Skill Schema & Template

Every skill module MUST include a structured schema:

- `name`: unique skill identifier
- `description`: concise functional description
- `inputs`: JSON schema defining all required inputs
- `outputs`: JSON schema defining all produced outputs
- `dependencies`: list of other skills required
- `stateful`: boolean
- `execution_priority`: numeric value for scheduling
- `timeout_ms`: max allowed execution time
- `retry_policy`: max attempts, backoff strategy
- `compliance_flags`: required checks (e.g., opt-in verification)

---

## 5. Input / Output Contracts

- **Inputs**
  - Explicit, typed, and validated
  - Missing required fields → reject execution
  - Extra fields → ignored

- **Outputs**
  - Deterministic
  - Must conform to declared output schema
  - Must include `status` field: SUCCESS / FAILED / SKIPPED
  - Error metadata included if FAILED

---

## 6. Execution Rules

- Skills run **server-side only**
- All external side-effects must pass through enforcement agents
- Inputs are validated before execution
- Outputs are immutable after skill completion
- Skills must be **idempotent** unless explicitly documented as non-idempotent
- Skills must respect **workspace/tenant isolation**
- Execution can be **synchronous** or **queued async** per skill definition

---

## 7. Skill Composition Rules

- Skills may **depend on other skills**
- Dependencies are explicitly declared in the `dependencies` array
- Execution order determined by:
  1. Declared dependencies
  2. `execution_priority`
- Skill composition must:
  - Avoid circular dependencies
  - Validate all outputs before passing to dependent skills
  - Respect global enforcement layer for side-effects

---

## 8. State Handling

- Skills may optionally maintain state
- State storage:
  - Explicitly declared
  - Persisted in global state store
- State transitions MUST follow a deterministic flow
- Skills must handle **state recovery** after failures

---

## 9. Error Handling & Fallbacks

- **Validation Errors**
  - Missing/invalid inputs → immediate FAILURE
- **Execution Errors**
  - Retry according to `retry_policy`
  - Persistent failures → mark FAILED with error metadata
- **Fallbacks**
  - Optional `fallback_skill` can be invoked
  - Fallbacks must not violate enforcement rules
- All errors are logged in structured format

---

## 10. Priority & Conflict Resolution

- Skills have `execution_priority` integer
  - Lower numbers → higher priority
- Conflicts between skills:
  - Check for overlapping side-effects
  - Higher priority skill executes first
  - Lower priority skill may SKIP or execute with modified inputs
- Circular conflicts → reject execution at composition time

---

## 11. Constraints & Boundaries

- Skills cannot bypass:
  - Rate limits
  - Compliance checks (opt-in, opt-out)
  - Multi-tenant isolation
- Side-effects restricted to allowed channels (e.g., WhatsApp API)
- No direct DB mutations outside allowed interfaces

---

## 12. Edge Cases & Assumptions

- Input fields missing → skill rejects execution
- Duplicate skill execution → idempotent behavior enforced
- Dependent skill failure → upstream skill may SKIP or trigger fallback
- Network or API errors → handled via retry_policy
- Tenant boundaries assumed enforced globally

---

## 13. Observability & Logging

- Every skill execution emits structured logs:
  - `skill_name`
  - `workspace_id`
  - `input_hash`
  - `output_status`
  - `execution_duration_ms`
  - `error_metadata` (if any)
- Logs are immutable and auditable
- Metrics are aggregated for:
  - Execution success/failure
  - Latency
  - Retry counts

---