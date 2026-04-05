# Send Signal – Agents.md

---

## 1. Overview

Send Signal is a SaaS platform that automates personalized WhatsApp messaging for leads captured from social platforms.

This document defines:
- System agents
- Responsibilities
- Data flows
- Execution rules

All agents MUST operate deterministically based on defined inputs and outputs.

---

## 2. System Architecture

### 2.1 High-Level Components

- Frontend (React SPA)
- Backend API (Node.js / Express)
- Messaging Queue (Redis / RabbitMQ)
- Database (PostgreSQL)
- WhatsApp Provider API (Meta Cloud API or BSP)
- Worker Services (Async Processing)

### 2.2 Architecture Pattern

- Event-driven
- Queue-based async processing
- Stateless API layer
- Stateful persistence in DB

---

## 3. Core Domain Entities

- User
- Workspace
- Lead
- Campaign
- Template
- Message
- OptOut
- Integration

---

## 4. Agent Definitions

Each agent is a modular execution unit with clearly defined inputs, outputs, and side effects.

### 4.1 Lead Ingestion Agent

**Purpose**
- Import and normalize leads

**Inputs**
- CSV file OR manual input

**Outputs**
- Validated Lead records

**Responsibilities**
- Parse CSV
- Validate phone numbers (E.164 format)
- Deduplicate leads
- Assign source tags

---

### 4.2 Template Processing Agent

**Purpose**
- Resolve placeholders in message templates

**Inputs**
- Template string
- Lead object

**Outputs**
- Final rendered message

**Logic**
- Replace tokens:
  - `{FirstName}`
  - `{LastName}`
  - `{Source}`

**Failure Cases**
- Missing field → fallback to empty string
- Invalid token → ignore

---

### 4.3 Campaign Orchestrator Agent

**Purpose**
- Manage campaign lifecycle

**Inputs**
- Campaign config
- Lead segment

**Outputs**
- Message jobs pushed to queue

**Responsibilities**
- Validate campaign readiness
- Expand leads into message jobs
- Trigger async processing

---

### 4.4 Messaging Dispatch Agent

**Purpose**
- Send messages via WhatsApp API

**Inputs**
- Message job

**Outputs**
- Delivery status

**Responsibilities**
- Rate limiting (e.g. 20 msg/sec)
- Retry logic
- API communication

---

### 4.5 Delivery Tracking Agent

**Purpose**
- Track message lifecycle

**Inputs**
- Webhooks from WhatsApp API

**Outputs**
- Updated message status

**States**
- SENT
- DELIVERED
- READ
- FAILED

---

### 4.6 Opt-Out Compliance Agent

**Purpose**
- Enforce compliance rules

**Inputs**
- Incoming messages
- Opt-out keywords

**Outputs**
- Updated OptOut list

**Rules**
- Detect keywords:
  - STOP
  - UNSUBSCRIBE
- Block future sends

---

### 4.7 Analytics Aggregation Agent

**Purpose**
- Compute metrics

**Inputs**
- Message logs

**Outputs**
- Aggregated metrics

---

## 5. Agent Responsibilities & Boundaries

| Agent | Allowed Actions | Forbidden Actions |
|------|----------------|------------------|
| Lead Ingestion | Create leads | Send messages |
| Template Agent | Render content | Persist data |
| Campaign Agent | Create jobs | Call WhatsApp API |
| Messaging Agent | Send messages | Modify leads |
| Tracking Agent | Update status | Trigger campaigns |

---

## 6. Data Models

### 6.1 Lead

- id (UUID)
- first_name (string)
- last_name (string)
- phone_number (string)
- source (string)
- status (enum: NEW, CONTACTED, REPLIED, OPTED_OUT)
- created_at

---

### 6.2 Template

- id
- name
- content (string)
- approved (boolean)

---

### 6.3 Campaign

- id
- name
- template_id
- status (DRAFT, SCHEDULED, RUNNING, COMPLETED)
- scheduled_at
- created_by

---

### 6.4 Message

- id
- campaign_id
- lead_id
- content
- status
- error_code
- sent_at

---

### 6.5 OptOut

- phone_number
- timestamp

---

## 7. API Contracts

### 7.1 Create Campaign

POST /campaigns

Request:
- name
- template_id
- segment_filters

Response:
- campaign_id

---

### 7.2 Send Campaign

POST /campaigns/{id}/send

Response:
- status: QUEUED

---

### 7.3 Upload Leads

POST /leads/upload

Input:
- CSV file

Response:
- count_imported
- count_failed

---

### 7.4 Webhook (WhatsApp)

POST /webhooks/whatsapp

Payload:
- message_id
- status

---

## 8. State & Workflow Logic

### 8.1 Campaign Lifecycle

DRAFT → SCHEDULED → RUNNING → COMPLETED

---

### 8.2 Message Lifecycle

QUEUED → SENT → DELIVERED → READ

Failure:
- FAILED (retry up to N times)

---

### 8.3 Lead Lifecycle

NEW → CONTACTED → REPLIED → CONVERTED

OR

NEW → CONTACTED → OPTED_OUT

---

## 9. Messaging & Queue System

### 9.1 Queue Design

- Queue name: `message_dispatch_queue`
- Worker concurrency: configurable

### 9.2 Job Payload

- message_id
- phone_number
- content

---

### 9.3 Retry Strategy

- Max retries: 3
- Backoff: exponential

---

## 10. Permissions & Roles

### Roles

#### Admin
- Full access

#### User
- Manage campaigns
- Upload leads

---

### Restrictions

- Only Admin can manage integrations
- Users cannot access other workspace data

---

## 11. Error Handling Strategy

### Categories

- Validation Errors
- External API Errors
- System Failures

---

### Handling Rules

- Log all errors
- Retry transient errors
- Mark permanent failures

---

### Example

- Invalid phone → mark FAILED
- API timeout → retry

---

## 12. Edge Cases & Constraints

- Duplicate leads → skip or merge
- Invalid numbers → reject
- Template not approved → block send
- Rate limit exceeded → queue delay
- Opted-out users → never send

---

## 13. Security & Compliance

- HTTPS enforced
- JWT authentication
- Data encryption at rest
- Role-based access control

---

### WhatsApp Compliance

- Only approved templates
- Must have user opt-in
- Must support opt-out

---

## 14. Observability & Metrics

### Metrics

- Messages sent
- Delivery rate
- Read rate
- Reply rate

---

### Logging

- Structured logs (JSON)
- Correlation IDs

---

### Monitoring

- Queue lag
- API latency
- Error rates

---

## 15. Assumptions

- Users have valid WhatsApp Business API access
- Leads are legally obtained with consent
- WhatsApp API is available and stable
- System scales horizontally

---