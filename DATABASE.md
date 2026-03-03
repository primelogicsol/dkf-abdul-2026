# Database Architecture Documentation

## Overview

Complete database architecture for the Dr. Kumar Foundation website, including:
- Public-facing content management
- Member directory (The Circle)
- Governance structure
- Admin dashboard with role-based access
- Moderation workflow
- Audit logging

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Database | PostgreSQL |
| ORM | Prisma |
| Runtime | Node.js / Next.js 16 |
| Auth | JWT + bcrypt |

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Update `DATABASE_URL`:
```
DATABASE_URL="postgresql://username:password@localhost:5432/dr_kumar_db?schema=public"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Create Initial Super Admin

```bash
curl -X POST http://localhost:3000/api/admin/auth/setup
```

Default credentials:
- Email: `admin@drkumarfoundation.org`
- Password: `admin123`

**Change immediately after first login!**

### 6. Start Development

```bash
npm run dev
```

Access admin at: `http://localhost:3000/admin`

---

## Database Schema

### Entity Relationship Overview

```
┌─────────────────────┐
│      users          │ (Admin dashboard users)
└─────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────┐
│   audit_logs        │ (Change tracking)
└─────────────────────┘

┌─────────────────────┐
│      regions        │ (Geographic data)
└─────────────────────┘
         │
         │ 1:N              ┌─────────────────────┐
         ├─────────────────▶│    registrations    │ (Pending submissions)
         │                  └─────────────────────┘
         │                          │
         │                          │ approve
         │                          ▼
         │                  ┌─────────────────────┐
         │                  │      members        │ (Published directory)
         │                  └─────────────────────┘
         │                          │
         │                          │ 1:N
         │                          ▼
         │                  ┌─────────────────────┐
         │                  │  member_versions    │ (History)
         │                  └─────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────┐
│    gatherings       │ (Documented events)
└─────────────────────┘

┌─────────────────────┐
│ foundation_governance│ (Board members)
└─────────────────────┘

┌─────────────────────┐
│   principle_pages   │ (Core Principles content)
└─────────────────────┘

┌─────────────────────┐
│ foundation_sections │ (Foundation page content)
└─────────────────────┘
```

---

## Tables

### 1. `users`
Admin dashboard authentication.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| email | String | Unique email |
| password_hash | String | Bcrypt hashed password |
| full_name | String | Display name |
| role | Enum | super_admin / editor / moderator |
| is_active | Boolean | Account status |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update |

---

### 2. `members`
The Circle directory.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| full_name | String | Member name |
| country | String | FK to regions.country |
| city | String? | Optional city |
| profession | String | Profession |
| year_connected | Int | Year of connection |
| first_encounter | String | First encounter story |
| resonated_quality | Enum | Quality that resonated |
| life_changes | String | Life changes description |
| continuing_engagement | String | Ongoing participation |
| photo_url | String? | Profile photo |
| media_url | String? | Media links |
| approved | Boolean | Moderation status |
| visibility_status | Enum | draft / published / archived |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update |

---

### 3. `registrations`
Pending submissions awaiting review.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| full_name | String | Applicant name |
| country | String | FK to regions.country |
| profession | String | Profession |
| year_connected | Int | Year of connection |
| first_encounter | String | First encounter story |
| resonated_quality | Enum | Quality that resonated |
| life_changes | String | Life changes |
| continuing_engagement | String | Ongoing participation |
| consent_accepted | Boolean | GDPR consent |
| review_status | Enum | pending / approved / rejected |
| reviewed_by | String? | Admin user ID |
| reviewed_at | DateTime? | Review timestamp |
| created_at | DateTime | Submission timestamp |

---

### 4. `regions`
Geographic reference data.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| continent | String | Continent name |
| country | String | Country name (unique) |
| created_at | DateTime | Creation timestamp |

---

### 5. `gatherings`
Documented meetings and events.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| year | Int | Event year |
| location_city | String | City |
| location_country | String | Country |
| description | String? | Event description |
| related_region | String? | FK to regions.country |
| created_at | DateTime | Creation timestamp |

---

### 6. `foundation_governance`
Board and leadership.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| full_name | String | Member name |
| role_title | String | Position title |
| bio_summary | String? | Biography |
| term_start | DateTime? | Term start |
| term_end | DateTime? | Term end |
| display_order | Int | Sort order |
| is_active | Boolean | Active status |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update |

---

### 7. `principle_pages`
Core Principles content.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| title | String | Principle title (unique) |
| definition | String | Main definition |
| context | String? | Additional context |
| practical_implication | String? | Practical application |
| selected_words | String? | Quote/phrase |
| display_order | Int | Sort order |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update |

---

### 8. `foundation_sections`
Foundation page sections.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| section_name | String | Section name (unique) |
| content | String | Section content |
| display_order | Int | Sort order |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update |

---

### 9. `audit_logs`
Change tracking for compliance.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| action | String | CREATE / UPDATE / DELETE / APPROVE / REJECT |
| entity_type | String | Entity type (Member, Registration, etc.) |
| entity_id | String | Entity ID |
| user_id | String | FK to users.id |
| changes | String? | JSON diff of changes |
| created_at | DateTime | Timestamp |

---

### 10. `member_versions`
Version history for member profiles.

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| member_id | String | FK to members.id |
| ... | ... | Snapshot of member fields |
| version_number | Int | Version number |
| created_at | DateTime | Version timestamp |
| created_by | String | Editor ID |

---

## Enums

### ResonatedQuality
```
Stillness
Clarity
Discipline
Accountability
Compassion
Presence
Ethical_Firmness
Self_Awareness
Inner_Discipline
Reflective_Silence
Ethical_Conduct
Shared_Responsibility
```

### VisibilityStatus
```
draft
published
archived
```

### ReviewStatus
```
pending
approved
rejected
```

### UserRole
```
super_admin  - Full access
editor       - Content and member management
moderator    - Registration review only
```

---

## Admin Dashboard

### Access
- URL: `/admin`
- Login: `/admin/login`

### Modules

| Module | Path | Description |
|--------|------|-------------|
| Dashboard | `/admin` | Overview and statistics |
| Registrations | `/admin/registrations` | Review submissions |
| Members | `/admin/members` | Manage directory |
| Governance | `/admin/governance` | Board management |
| Gatherings | `/admin/gatherings` | Event documentation |
| Regions | `/admin/regions` | Geographic data |
| Core Principles | `/admin/content/principles` | Edit principles |
| Foundation Content | `/admin/content/foundation` | Edit page content |
| System Settings | `/admin/settings` | User management |

### Role Permissions

| Action | super_admin | editor | moderator |
|--------|-------------|--------|-----------|
| View Dashboard | ✓ | ✓ | ✓ |
| Review Registrations | ✓ | ✓ | ✓ |
| Manage Members | ✓ | ✓ | ✗ |
| Edit Governance | ✓ | ✓ | ✗ |
| Edit Content | ✓ | ✓ | ✗ |
| Manage Users | ✓ | ✗ | ✗ |
| System Settings | ✓ | ✗ | ✗ |

---

## Moderation Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    REGISTRATION FLOW                        │
└─────────────────────────────────────────────────────────────┘

1. User submits form at /the-circle/registration
   ↓
2. Entry created in `registrations` table
   - review_status: pending
   - No public visibility
   ↓
3. Admin receives notification (email TBD)
   ↓
4. Admin reviews at /admin/registrations
   - Can view full submission
   - Can edit for tone/accuracy
   ↓
5. Admin decision:
   ├─ Approve → Entry copied to `members` table
   │            - visibility_status: published
   │            - Appears in public directory
   │
   └─ Reject → review_status: rejected
               - Remains in registrations
               - Not visible publicly
```

**No auto-publishing.** All submissions require manual review.

---

## API Endpoints

### Public APIs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/members` | No | Get published members |
| GET | `/api/members/[id]` | No | Get single member |
| POST | `/api/registrations` | No | Submit registration |
| GET | `/api/gatherings` | No | Get gatherings |
| GET | `/api/regions` | No | Get regions |
| GET | `/api/governance` | No | Get governance |
| GET | `/api/principles` | No | Get principles |
| GET | `/api/foundation` | No | Get foundation sections |

### Admin APIs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/auth/login` | No | Admin login |
| GET | `/api/admin/auth/verify` | Yes | Verify token |
| POST | `/api/admin/auth/setup` | No | Create first admin |
| GET | `/api/admin/stats` | Yes | Dashboard stats |
| GET | `/api/admin/registrations` | Yes | Get registrations |
| POST | `/api/admin/registrations/[id]/approve` | Yes | Approve |
| POST | `/api/admin/registrations/[id]/reject` | Yes | Reject |
| PATCH | `/api/admin/registrations/[id]` | Yes | Update |
| DELETE | `/api/admin/registrations/[id]` | Yes | Delete |
| GET | `/api/admin/members` | Yes | Get members |
| POST | `/api/admin/members` | Yes | Create member |
| PATCH | `/api/admin/members/[id]` | Yes | Update member |
| POST | `/api/admin/members/[id]/archive` | Yes | Archive |
| POST | `/api/admin/members/[id]/publish` | Yes | Publish |
| DELETE | `/api/admin/members/[id]` | Yes | Delete |
| GET | `/api/admin/governance` | Yes | Get governance |
| POST | `/api/admin/governance` | Yes | Create |
| PATCH | `/api/admin/governance/[id]` | Yes | Update |
| DELETE | `/api/admin/governance/[id]` | Yes | Delete |
| GET | `/api/admin/gatherings` | Yes | Get gatherings |
| POST | `/api/admin/gatherings` | Yes | Create |
| PATCH | `/api/admin/gatherings/[id]` | Yes | Update |
| DELETE | `/api/admin/gatherings/[id]` | Yes | Delete |
| GET | `/api/admin/regions` | Yes | Get regions |
| POST | `/api/admin/regions` | Yes | Create |
| PATCH | `/api/admin/regions/[id]` | Yes | Update |
| DELETE | `/api/admin/regions/[id]` | Yes | Delete |
| GET | `/api/admin/content/principles` | Yes | Get principles |
| PATCH | `/api/admin/content/principles/[id]` | Yes | Update |
| GET | `/api/admin/content/foundation` | Yes | Get sections |
| PATCH | `/api/admin/content/foundation/[id]` | Yes | Update |
| GET | `/api/admin/settings/users` | Yes | Get users |
| POST | `/api/admin/settings/users` | Yes | Create user |
| PATCH | `/api/admin/settings/users/[id]` | Yes | Update user |

---

## Security

### Authentication
- JWT tokens with 8-hour expiry
- Bcrypt password hashing (12 rounds)
- Token stored in localStorage (production: use httpOnly cookies)

### Authorization
- Role-based access control (RBAC)
- Middleware validates tokens on all admin routes
- Permissions checked at API level

### Data Protection
- Consent tracking for GDPR compliance
- Audit logging for all changes
- No sensitive data in client-side storage

---

## Backup Strategy

### Recommended Schedule
| Type | Frequency | Retention |
|------|-----------|-----------|
| Full backup | Daily | 30 days |
| Transaction log | Hourly | 7 days |
| Off-site copy | Weekly | 90 days |

### Backup Commands
```bash
# Full database backup
pg_dump -U username dr_kumar_db > backup_$(date +%Y%m%d).sql

# Restore
psql -U username dr_kumar_db < backup_20250101.sql
```

---

## Troubleshooting

### Reset Database (Development)
```bash
npx prisma migrate reset
```

### View Database
```bash
npx prisma studio
```

### Regenerate Client
```bash
npx prisma generate
```

### Check Migration Status
```bash
npx prisma migrate status
```

### Validate Schema
```bash
npx prisma validate
```

---

## Support

For issues:
1. Check database connection in `.env`
2. Verify Prisma schema: `npx prisma validate`
3. Check migration status: `npx prisma migrate status`
4. Review audit logs for recent changes

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025 | Initial release |
