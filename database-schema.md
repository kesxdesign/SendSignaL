# SendSignal – Database Schema (database-schema.md)

---

## 1. Overview

The SendSignal database is designed to support a scalable, relational, and deterministic SaaS platform integrating WhatsApp engagement with AI-driven workflows. The schema is strictly Prisma ORM compliant and serves as a single source of truth for developers and AI agents.

Goals:

- Maintain referential integrity and deterministic AI operations
- Support thousands of concurrent users, leads, and interactions
- Real-time updates and notifications
- Enforce constraints, validations, and indexing for performance
- Avoid hallucinations or assumptions in AI-driven operations

---

## 2. Database Principles

- Prisma ORM is the only allowed database access layer
- Normalize data while allowing denormalization for performance-critical paths
- Enforce primary keys, foreign keys, and unique constraints
- Use cascading rules explicitly for delete/update operations
- Maintain consistent timestamps (createdAt, updatedAt, deletedAt)
- AI agents must never access undefined fields or models
- Deterministic behavior in queries, updates, and transactions

---

## 3. Data Models / Tables

| Model | Purpose | Description |
|-------|---------|-------------|
| User | Represents platform users | Tracks authentication, roles, and preferences |
| Lead | Captured leads from social platforms | Stores lead details, source, status |
| Conversation | Tracks WhatsApp interactions | Maintains conversation state, linked to Lead |
| Message | Individual WhatsApp messages | Records message content, direction, timestamps |
| SkillExecution | Logs AI agent actions per skill | Tracks agent decisions, results, errors |
| CSVImport | Tracks bulk CSV lead uploads | Stores file metadata, status, and error logs |
| Notification | User notifications | Stores notification content, type, read status |
| Role | Defines user roles | Links users to permissions for RBAC |
| Permission | System permissions | Defines granular access rights |
| Integration | External service configurations | Stores WhatsApp API credentials, social platform tokens |

---

## 4. Fields & Data Types

### Example: User Model

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| id | String | @id @default(cuid()) | Unique identifier |
| email | String | @unique @required | User email |
| name | String | @required | Full name |
| passwordHash | String | @required | Hashed password |
| roleId | String | @required | Foreign key to Role |
| createdAt | DateTime | @default(now()) | Record creation timestamp |
| updatedAt | DateTime | @updatedAt | Last update timestamp |
| deletedAt | DateTime? | Nullable | Soft delete timestamp |

Other models follow the same explicit Prisma patterns, e.g., `Lead`, `Conversation`, `Message`, each with type-safe fields, constraints, and timestamps.

---

## 5. Relationships & Associations

- **User → Role**: Many-to-One  
  - `roleId` FK in User referencing Role
  - Cascade on delete restricted
- **Lead → User**: Many-to-One  
  - `ownerId` FK in Lead referencing User
  - Cascade on delete restricted
- **Conversation → Lead**: One-to-Many  
  - `leadId` FK in Conversation referencing Lead
  - Cascade delete to remove dependent conversations
- **Message → Conversation**: One-to-Many  
  - `conversationId` FK in Message
- **SkillExecution → Lead/Conversation**: Optional Many-to-One  
  - Tracks which lead/conversation an AI agent acted upon
- **CSVImport → User**: Many-to-One  
  - Tracks which user performed the import
- **Notification → User**: Many-to-One

Join tables used only where necessary for Many-to-Many relationships (e.g., Role ↔ Permission):

| Table | Fields | Description |
|-------|--------|-------------|
| RolePermission | roleId, permissionId | Links roles to permissions |

---

## 6. Indexing & Performance

- **Primary Indexes**: On `id` fields of all models
- **Foreign Key Indexes**: On all FK fields (e.g., `leadId`, `conversationId`)
- **Composite Indexes**:
  - `Conversation(leadId, createdAt)` for sorted queries
  - `Message(conversationId, createdAt)` for retrieval
- **Unique Indexes**:
  - `User.email`
  - `Integration(name, type)`
- **Performance Considerations**:
  - Use `select` or `include` to avoid over-fetching
  - Paginate large queries (`skip`/`take`)
  - Avoid N+1 queries by explicit Prisma relations

---

## 7. Constraints & Validations

- Required fields: `@required` in Prisma
- Optional fields: `?` for nullable types
- Unique constraints: `@unique` annotations
- Enum validations: Define `enum` for fields like `lead.status`, `message.type`
- Pattern validation (AI agent-generated content):
  - Email, phone number, URLs validated before database write
- AI agents must validate input strictly against schema before executing mutations

---

## 8. Transactions & Concurrency

- Multi-step operations wrapped in Prisma `$transaction`
- Atomicity:
  - All operations succeed OR rollback occurs
- Isolation:
  - Use database default isolation (typically Read Committed)
- Conflict Handling:
  - Use optimistic concurrency with `updatedAt` checks for critical updates
- Background workers:
  - Use transactions to ensure lead status and conversation updates remain consistent

---

## 9. Audit & History Tracking

- Fields for all models:
  - `createdAt`, `updatedAt`, `deletedAt`
- Soft delete preferred for recoverable data
- SkillExecution and CSVImport models track AI actions and bulk operations
- Historical tables can be implemented if long-term tracking required
- Logging:
  - All AI agent actions recorded
  - User actions stored with timestamp, model, and action type

---

## 10. AI-Agent Guidelines

- Operate strictly within schema-defined models
- NEVER guess undefined fields, models, or relationships
- Validate all input prior to mutation
- Log actions deterministically:
  - Skill executed
  - Target model and record
  - Outcome and timestamp
- Respect foreign key constraints and cascading rules
- Handle errors gracefully and propagate structured error objects

---

## 11. Edge Cases & Exceptions

- Missing required fields → reject with validation error
- Partial updates → allow only nullable or optional fields
- Invalid relationships → reject and log
- High-load scenarios → enforce limits, batch inserts, and indexing
- Schema evolution → migrations must preserve existing data integrity

---

## 12. Do / Don’t Guidelines

### DO
- Always use Prisma Client for all database operations
- Enforce foreign key and unique constraints
- Index frequently queried fields
- Use transactions for multi-step operations
- Track createdAt/updatedAt/deletedAt consistently
- Validate all AI agent inputs against schema
- Log all critical changes, especially AI agent actions

### DON’T
- Do NOT access undefined fields or models
- Do NOT bypass schema validations
- Do NOT perform unbounded queries or updates
- Do NOT ignore referential integrity
- Do NOT expose raw database errors to AI agents or clients
- Do NOT hardcode values that should be dynamic or schema-defined