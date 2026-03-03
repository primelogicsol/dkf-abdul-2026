# ✅ Deployment Checklist - Dr. Kumar Foundation

## Database Setup - COMPLETED ✅

### Neon Database Configuration
- ✅ Database URL configured in `.env`
- ✅ SSL mode enabled (`sslmode=require`)
- ✅ Prisma schema pushed to database
- ✅ Database seeded with initial data

### Created Resources
- ✅ 48 regions (countries by continent)
- ✅ 1 Super Admin account
- ✅ Core Principles content structure
- ✅ Foundation sections structure

---

## Login Credentials

### Default Admin Account
```
Email:    admin@drkumarfoundation.org
Password: admin123
```

> ⚠️ **SECURITY WARNING:** Change this password immediately after first login!

---

## Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npx prisma generate

# 3. Sync database schema
npx prisma db push

# 4. Seed database
npm run db:seed

# 5. Create admin (if needed)
node --import tsx prisma/create-default-admin.ts

# 6. Start development server
npm run dev
```

---

## Access Points

### Public Site
- Homepage: http://localhost:3000
- Members Directory: http://localhost:3000/the-circle/members-directory
- Circle Registration: http://localhost:3000/the-circle/registration
- Engagement Forms: http://localhost:3000/engage/[program]/[formType]

### Admin Dashboard
- Login: http://localhost:3000/admin/login
- Dashboard: http://localhost:3000/admin
- Registrations: http://localhost:3000/admin/registrations
- Members: http://localhost:3000/admin/members
- Engagement: http://localhost:3000/admin/engagement

### Database Management
- Prisma Studio: `npx prisma studio` (http://localhost:5555)

---

## Database Structure

### Tables Created (11)

1. **users** - Admin authentication
2. **members** - Published Circle members
3. **registrations** - Pending registrations
4. **regions** - Geographic data (48 countries)
5. **gatherings** - Historical events
6. **foundation_governance** - Board members
7. **principle_pages** - Core Principles
8. **foundation_sections** - Foundation content
9. **audit_logs** - Activity tracking
10. **member_versions** - Version history
11. **engagement_requests** - Form submissions

---

## Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Railway, etc.):

```env
# Database
DATABASE_URL="postgresql://neondb_owner:npg_I1PRwfzQUvN4@ep-dry-king-aiqupucl-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"

# Authentication (GENERATE NEW SECRET FOR PRODUCTION)
NEXTAUTH_SECRET="<run: openssl rand -base64 32>"
NEXTAUTH_URL="https://your-domain.com"

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Generate Production Secret

```bash
openssl rand -base64 32
```

### Deployment Steps

1. **Push schema to production:**
   ```bash
   npx prisma db push
   ```

2. **Seed production database:**
   ```bash
   npm run db:seed
   ```

3. **Create admin user:**
   ```bash
   node --import tsx prisma/create-default-admin.ts
   ```

4. **Update admin password** via dashboard immediately

5. **Test all critical flows:**
   - Admin login
   - Circle registration
   - Engagement form submission
   - Admin approval workflow
   - Members directory

---

## Security Checklist

- [ ] Change default admin password
- [ ] Generate new NEXTAUTH_SECRET
- [ ] Set production NEXTAUTH_URL
- [ ] Enable HTTPS on production domain
- [ ] Restrict database IP access in Neon dashboard
- [ ] Set up regular database backups
- [ ] Review and update CORS settings if needed
- [ ] Enable rate limiting on API endpoints
- [ ] Set up monitoring and alerting

---

## Testing Workflow

### 1. User Registration Flow
- [ ] Visit `/the-circle/registration`
- [ ] Fill and submit form
- [ ] Verify submission received

### 2. Admin Review Flow
- [ ] Login to `/admin/login`
- [ ] Go to `/admin/registrations`
- [ ] Approve registration
- [ ] Verify member created with "Draft" status

### 3. Member Management Flow
- [ ] Go to `/admin/members`
- [ ] Change status to "Published"
- [ ] Verify member appears in directory

### 4. Public Directory Flow
- [ ] Visit `/the-circle/members-directory`
- [ ] Verify published member visible
- [ ] Click member card
- [ ] Verify profile displays correctly

### 5. Engagement Form Flow
- [ ] Visit any engagement form
- [ ] Submit form
- [ ] Check `/admin/engagement` for submission
- [ ] Approve/reject submission

---

## Troubleshooting

### Database Connection Issues

**Error:** "SSL required"
- ✅ Already configured in DATABASE_URL

**Error:** "IP not allowed"
- Go to [Neon Dashboard](https://console.neon.tech)
- Settings → IP Allow → Add your IP

**Error:** "Table doesn't exist"
```bash
npx prisma db push
```

### Admin Login Issues

**Can't login:**
```bash
# Recreate admin
node --import tsx prisma/create-default-admin.ts
```

**Password reset:**
Update directly in database via Prisma Studio:
```bash
npx prisma studio
```

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## Support Resources

- **Prisma Docs:** https://www.prisma.io/docs
- **Neon Docs:** https://neon.tech/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Project Docs:** See README.md, DATABASE.md

---

## Next Steps

1. ✅ Database is ready
2. ✅ Admin account created
3. 📝 **Change admin password**
4. 🎨 Customize content via admin dashboard
5. 🚀 Deploy to production hosting
6. 📊 Set up analytics
7. 🔔 Configure email notifications (optional)

---

**Database setup completed successfully! 🎉**

You can now start developing or deploy to production.
