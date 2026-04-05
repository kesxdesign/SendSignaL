# SendSignal – System Architecture (architecture.md)


---

## 1. Overview

SendSignal is a web-based platform designed to automate personalized WhatsApp engagement for leads captured from social platforms. The system integrates AI agents for workflow automation, provides real-time notifications, and scales for thousands of concurrent users. The architecture follows strict SaaS, security, and production-ready principles.

Key Principles:

- Strict modularity via `/skills` system
- AI agents are deterministic and schema-bound
- End-to-end observability and logging
- Consistent API contracts
- Scalable, maintainable, and resilient design

---

## 2. System Goals & Requirements

- Real-time AI-assisted engagement for leads
- Scalable to tens of thousands of concurrent users
- Deterministic and secure AI agent execution
- Full integration with WhatsApp Business API
- Maintainability via modular skill definitions
- Observability, logging, and monitoring at all layers

---

## 3. Component Diagram / Description

| Component | Purpose | Inputs | Outputs | Notes / AI Role |
|-----------|---------|--------|---------|----------------|
| Frontend SPA | User interface, skill rendering | User actions, API data | User events, API requests | Integrates `/skills` for deterministic UI |
| Backend API Layer | REST/GraphQL endpoints | API requests | JSON responses, status codes | Validates requests, enforces business logic |
| Database / Prisma ORM | Data persistence | Queries from backend | Records, transactions | Strict schema adherence, AI agents query deterministically |
| Task Queues / Workers | Background processing | Jobs from backend | Processed results, notifications | Handles AI tasks, CSV imports, bulk operations |
| AI Agent Orchestrator | AI task execution | Skills, triggers, lead data | Decisions, actions, notifications | Deterministic skill-based execution |
| Notification System | Real-time alerts | Events from backend or AI | Toasts, banners, emails | Follows Material Design & `/skills/notification.md` rules |
| CSV Import & Validation | Bulk lead ingestion | CSV files | Validated leads, errors | Follows `/skills/csv-import.md` rules |
| Authentication & RBAC | Access control | Credentials, tokens | Session / token validation | OAuth2/JWT based |
| Logging & Monitoring | Observability | Events, errors | Dashboards, alerts | Structured logging, integrates with AI agent activity |
| Integration Layer | WhatsApp & social APIs | External leads, messages | API responses | Rate-limiting, retry, validation applied |

---

## 4. Frontend Architecture

- SPA framework: React / Next.js
- Component hierarchy:
  - Root layout → Feature pages → Skill-rendered components
- State management:
  - Deterministic store (Redux / Zustand)
  - AI agent state synchronized with backend via WebSocket
- Real-time updates:
  - WebSockets for lead status, notifications, AI agent results
- Error handling:
  - Inline validation per `/skills/validation.md`
  - Global error banners per `/skills/notification.md`
- Accessibility:
  - Follows Material Design standards
  - Screen reader support and keyboard navigation

---

## 5. Backend Architecture

- API layer: RESTful + GraphQL endpoints
- Controllers:
  - Handle input validation
  - Trigger AI agents
  - Enqueue background tasks
- Services:
  - Business logic encapsulation
  - Database abstraction via Prisma ORM
- Workers:
  - Async processing (bulk CSV import, lead enrichment, AI execution)
  - Retry and backoff logic
- Integration endpoints:
  - WhatsApp Business API
  - Social platforms (Twitter, TikTok)

---

## 6. Database & Data Flow

- Database: PostgreSQL / MySQL (schema via Prisma)
- Data flow:
  - Frontend → Backend API → Prisma ORM → Database
  - Background workers read/write via Prisma
  - AI agents query via backend only; no direct DB access
- State management:
  - Optimistic updates in frontend
  - Backend canonical state authoritative
- Transactions:
  - Multi-step operations use Prisma `$transaction`
  - Rollback on failure
- Indexing:
  - Indexed fields for lead lookup and AI query optimization
- Backup / replication:
  - Periodic backups
  - Read replicas for scaling reads

---

## 7. AI Agents Architecture

- Purpose:
  - Automate messaging workflows
  - Guide UI interactions
  - Validate data and skill execution
- Skill mapping:
  - Each AI agent references specific `/skills/*.md`
- Interaction:
  - Triggered via events, API requests, or cron schedules
  - Communicates results via backend API → notifications
- Execution constraints:
  - Strict schema adherence
  - No hallucination of data fields or actions
- Logging & monitoring:
  - AI agent decisions recorded with timestamp, skill, and outcome
  - Errors trigger alerts and retries

---

## 8. API & Integration Layer

- Internal API contracts:
  - Standard request/response structure
  - Status codes: 200, 201, 400, 401, 403, 404, 429, 500
- External integrations:
  - WhatsApp Business API: rate-limited, validated requests
  - Social platforms: lead ingestion endpoints
- Security:
  - OAuth2 or JWT for all API calls
  - Validation against schema
- Retry & error handling:
  - Exponential backoff for transient errors
  - Logging failed requests

---

## 9. Security & Authentication

- Authentication flow:
  - JWT or OAuth2
  - Access token expiry and refresh
- Role-based access control (RBAC)
- Sensitive data handling:
  - Encryption at rest and in transit (TLS, AES-256)
  - No plaintext storage of secrets or passwords
- AI agent restrictions:
  - Agents can only access schema-defined fields
  - Restricted API calls and database actions

---

## 10. Observability, Logging, and Monitoring

- Logging:
  - Structured JSON logs
  - Levels: INFO, WARN, ERROR
- Metrics:
  - API latency, worker queue length, AI agent execution time
- Dashboards:
  - Real-time monitoring for operations team
- Alerts:
  - Threshold-based for failures, high latency, AI errors
- Error propagation:
  - Deterministic reporting to frontend and backend

---

## 11. Error Handling & Resiliency

- Layered error handling:
  - Frontend: inline and global notifications
  - Backend: standardized error objects
  - Workers: retry with backoff
- Partial failures:
  - Transaction rollback in multi-step operations
  - Queue failed jobs for retry
- AI agent errors:
  - Logged and retried deterministically
  - Alerts triggered if persistent

---

## 12. Scalability & Performance Patterns

- Horizontal scaling:
  - Frontend via CDN and multiple SPA instances
  - Backend API nodes behind load balancer
  - Workers scaled per queue load
- Vertical scaling:
  - Database with replicas and partitioning
- Real-time event handling:
  - WebSockets / SSE with backpressure handling
- Caching:
  - In-memory cache (Redis) for frequently accessed data
- AI agent scaling:
  - Worker pool per agent type
  - Rate-limiting to prevent overload

---

## 13. Deployment & Infrastructure

- Environment separation:
  - dev, staging, production
- CI/CD:
  - Automated build, test, deploy
  - Schema migration enforcement
- Containerization:
  - Docker images for frontend, backend, workers
  - Kubernetes orchestration
- Secrets management:
  - Environment variables encrypted via Vault or AWS Secrets Manager
- Observability:
  - Centralized logging and monitoring

---

## 14. Do / Don’t Guidelines

### DO
- Enforce schema and skill-based rules
- Use AI agents deterministically
- Log all AI actions and system events
- Apply RBAC and encrypt sensitive data
- Apply transaction and retry rules for all multi-step operations
- Follow Material Design for frontend UI components
- Ensure structured error objects for frontend consumption

### DON’T
- Do NOT allow AI agents to access undefined fields
- Do NOT bypass validation or transactional constraints
- Do NOT expose raw database errors or secrets
- Do NOT hardcode credentials or API keys
- Do NOT perform unbounded queries or uncontrolled retries
- Do NOT ignore observability or monitoring for critical components

---

## 15. Edge Cases & Constraints

- Network partitions → fallback to queue-based processing
- Partial failure in multi-step operations → rollback
- Large CSV imports → chunked processing with progress tracking
- Concurrent updates → enforce database-level constraints
- API rate-limits → enforce throttling, queue overflow handling
- AI agent uncertainty → return structured error and log for review