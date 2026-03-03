# 🗄️ Database Setup Guide - Neon

## Quick Start

### 1. Update `.env` File

Create or update your `.env` file in the project root:

```env
DATABASE_URL="postgresql://neondb_owner:npg_I1PRwfzQUvN4@ep-dry-king-aiqupucl-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="dr-kumar-foundation-secret-key-change-in-production-2024"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Install & Setup

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push schema to Neon database
npx prisma db push

# Seed database with initial data
npm run db:seed
```

### 3. Login Credentials

After seeding, use these credentials to login:

**Admin Email:** `admin@drkumarfoundation.org`  
**Password:** `admin123`

> ⚠️ **Change the password immediately after first login!**

---

## What Gets Created

### Database Tables (11 total)

1. **users** - Admin dashboard authentication
2. **members** - Published Circle members
3. **registrations** - Pending Circle registrations
4. **regions** - Countries by continent (48 entries)
5. **gatherings** - Historical gatherings
6. **foundation_governance** - Board/leadership
7. **principle_pages** - Core Principles content
8. **foundation_sections** - Foundation page sections
9. **audit_logs** - Activity tracking
10. **member_versions** - Member change history
11. **engagement_requests** - Program form submissions

### Seed Data

- ✅ 48 countries across all continents
- ✅ 1 Super Admin account
- ✅ Core Principles (7 principles)
- ✅ Foundation sections (3 sections)
- ✅ Sample governance members

---

## Create Additional Admin Users

### Method 1: Via Admin Dashboard (Recommended)

1. Login as admin
2. Go to `/admin/users`
3. Click "Add User"
4. Fill in details and save

### Method 2: Via API

```bash
curl -X POST http://localhost:3000/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "email": "newadmin@example.com",
    "password": "secure-password",
    "full_name": "Admin Name",
    "role": "editor",
    "is_active": true
  }'
```

### Method 3: Direct Database (Advanced)

Use Prisma Studio:
```bash
npx prisma studio
```
Then manually add user in the `users` table (password must be bcrypt hashed).

---

## Verify Setup

### Check Database Connection

```bash
npx prisma db pull
```

### View Data in Prisma Studio

```bash
npx prisma studio
```
Opens at: http://localhost:5555

### Test Admin Login

1. Go to http://localhost:3000/admin/login
2. Login with admin credentials
3. Check dashboard loads correctly

---

## Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Railway, etc.):

```env
DATABASE_URL="postgresql://neondb_owner:npg_I1PRwfzQUvN4@ep-dry-king-aiqupucl-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="<generate-new-secret>"
NEXTAUTH_URL="https://your-domain.com"
```

### Generate Secure Secret

```bash
# Linux/Mac
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Deploy Steps

1. Push schema to production:
   ```bash
   npx prisma db push
   ```

2. Seed production database:
   ```bash
   npm run db:seed
   ```

3. Change default admin password immediately

4. Test all admin functions

---

## Troubleshooting

### Connection Error: "SSL required"

✅ Already fixed - DATABASE_URL includes `?sslmode=require`

### Connection Error: "IP not allowed"

1. Go to [Neon Dashboard](https://console.neon.tech)
2. Select your project
3. Go to "Settings" → "IP Allow"
4. Add your IP or set to `0.0.0.0/0` (allow all)

### Prisma Client Errors

```bash
npx prisma generate --force
```

### Reset Database (Development Only)

```bash
npx prisma migrate reset
```

### Check Migration Status

```bash
npx prisma migrate status
```

---

## Database Schema Reference

### User Roles

- **super_admin** - Full access to everything
- **editor** - Content and member management
- **moderator** - Registration review only
- **contributor** - Limited content editing

### Member Visibility Status

- **draft** - Not visible publicly (default for new members)
- **published** - Visible on public directory
- **archived** - Hidden but retained in database

### Registration Review Status

- **pending** - Awaiting admin review
- **approved** - Converted to member
- **rejected** - Not accepted

---

## Support & Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **Neon Docs:** https://neon.tech/docs
- **Next.js Docs:** https://nextjs.org/docs

For issues:
1. Check `.env` configuration
2. Verify database connection in Neon dashboard
3. Run `npx prisma validate` to check schema
4. Review console logs for errors
