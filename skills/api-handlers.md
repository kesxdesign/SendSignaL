# SendSignal – API Handler System Skill (api-handlers.md)

---

## 1. Overview

This document defines the **API handler system skill** for SendSignal.

Purpose:

- Standardize API request and response handling
- Ensure consistent validation, error handling, and security
- Enable deterministic behavior for AI agents and frontend systems
- Support scalable and reliable backend architecture

---

## 2. API Handler Principles

- ALWAYS maintain consistency across all endpoints
- ALWAYS separate concerns:
  - Controller → Request/Response handling
  - Service → Business logic
  - Handler → Orchestration layer
- ALWAYS use deterministic request and response formats
- SUPPORT asynchronous processing where required
- NEVER expose sensitive data in responses
- ALL endpoints MUST be idempotent where applicable

---

## 3. Request & Response Rules

### 3.1 Standard Request Structure

- Headers:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- Query Parameters:
  - Pagination: `page`, `limit`
  - Filtering: key-value pairs
  - Sorting: `sort_by`, `order`
- Body Payload:
  - MUST be JSON
  - MUST follow defined schema
  - MUST pass validation before processing

---

### 3.2 Standard Response Structure

```json
{
  "success": true,
  "data": {},
  "error": null,
  "meta": {
    "timestamp": "",
    "request_id": "",
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0
    }
  }
}
```

Rules:

- ALWAYS return `success` boolean
- ALWAYS include `meta`
- NEVER mix success and error states
- `data` MUST be null on failure
- `error` MUST be null on success

---

### 3.3 Pagination, Filtering, Sorting

- Pagination:
  - Default: `page=1`, `limit=10`
  - Max limit enforced by system constraint
- Filtering:
  - MUST validate allowed fields
- Sorting:
  - Allowed fields MUST be predefined
- NEVER allow arbitrary query execution

---

## 4. Authentication & Authorization

- Authentication:
  - MUST use JWT or OAuth tokens
  - Token MUST be included in every protected request
- Authorization:
  - Role-based access control (RBAC)
  - Validate permissions before executing logic
- Token Rules:
  - Expiry enforced
  - Refresh token supported
- Security:
  - Log unauthorized access attempts
  - NEVER expose authentication details in response

---

## 5. Error Handling & Retry Rules

### 5.1 Error Categories

| Type | Description |
|------|------------|
| Client Error | Invalid request, validation failure |
| Server Error | Internal system failure |
| Validation Error | Schema or field issues |
| Network Error | Timeout or connectivity issues |

---

### 5.2 Standard Error Structure

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  },
  "meta": {
    "timestamp": "",
    "request_id": ""
  }
}
```

---

### 5.3 Retry Rules

- Retry ONLY for transient failures:
  - Network timeouts
  - Temporary server errors
- Retry Strategy:
  - Exponential backoff
  - Max retry attempts defined by system
- NEVER retry validation or authorization errors

---

## 6. Rate Limiting & Throttling

- Enforce per-user and per-endpoint limits
- Example:
  - 100 requests per minute per user
- Burst handling:
  - Queue or reject excess requests
- Standard rate-limit response:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests"
  }
}
```

- Log all throttling events

---

## 7. Logging & Monitoring

- Log Levels:
  - INFO → normal operations
  - WARN → recoverable issues
  - ERROR → failures
- Logging MUST be structured (JSON format)
- Include:
  - request_id
  - user_id (if available)
  - endpoint
  - timestamp
- Sensitive Data:
  - MUST be masked or excluded
- Integrate with monitoring tools for alerting

---

## 8. Edge Cases & Exceptions

- Malformed request:
  - Reject with validation error
- Missing parameters:
  - Return required field errors
- Partial success:
  - Return structured response with status details
- Network failure:
  - Timeout and retry logic
- Concurrent conflicts:
  - Use locking or versioning

---

## 9. Accessibility & Frontend Integration Guidelines

- Responses MUST be AI-agent friendly:
  - Predictable structure
  - Explicit fields
- Include all required data for UI rendering
- Support:
  - Loading states during async calls
  - Notifications for success/failure
- NEVER return ambiguous or incomplete data

---

## 10. Technical Rigor

### 10.1 Endpoint Definition Example

| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/leads | GET | Fetch leads |
| /api/leads | POST | Create lead |

---

### 10.2 Example Request

```json
{
  "name": "John Doe",
  "phone": "+1234567890"
}
```

---

### 10.3 Example Success Response

```json
{
  "success": true,
  "data": {
    "id": "lead_123",
    "name": "John Doe"
  }
}
```

---

### 10.4 Performance Rules

- Use pagination for large datasets
- Use async processing for heavy operations
- Maintain low latency responses (<300ms target for standard requests)

---

### 10.5 Security Rules

- ALWAYS sanitize input
- NEVER trust client data
- Enforce authorization checks
- Prevent injection attacks
- Enforce HTTPS for all requests

---

## 11. AI-Agent Enforcement Rules

- ALWAYS construct requests using defined schema
- ALWAYS validate responses before processing
- NEVER proceed on error responses
- ALWAYS apply retry logic for transient errors
- ALWAYS trigger:
  - Loading state during request
  - Notification on response
- MUST handle pagination and filtering deterministically

---

## 12. Do / Don’t Guidelines

### DO
- Use consistent request/response formats
- Enforce validation before processing
- Log all critical events
- Apply rate limiting and security rules
- Support retries for transient failures

### DON’T
- Do NOT expose sensitive data
- Do NOT allow inconsistent response structures
- Do NOT skip validation
- Do NOT retry invalid requests
- Do NOT bypass authentication or authorization