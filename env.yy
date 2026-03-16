# PostgreSQL Database Configuration
POSTGRES_USER=dkf_user
POSTGRES_PASSWORD=dfk123987%pls
POSTGRES_DB=dfk_db

# Database URL for Prisma and Application
DATABASE_URL=postgresql://dkf_user:dfk123987%pls:localhost:5432/dfk_db?schema=public

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=4f9c2a7e6d1b8c5f3e9a2d7c6b1f8e4a9c3d6e7b2f1a8c5d

# # pgAdmin Configuration
# PGADMIN_EMAIL=admin@drkumarfoundation.org
# PGADMIN_PASSWORD=admin123
DOCKERHUB_USERNAME=abdulmananwighio
# # Cloudinary Configuration (Update with your actual credentials)
# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret
# CLOUDINARY_UPLOAD_FOLDER=dr-kumar-profiles

# # Resend Email Configuration (Update with your actual credentials)
# RESEND_API_KEY=your-resend-api-key
# EMAIL_FROM=Dr. Kumar Foundation <noreply@drkumarfoundation.org>

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=4f9c2a7e6d1b8c5f3e9a2d7c6b1f8e4a9c3d6e7b2f1a8c5d

# ─────────────────────────────────────────────────────────────────────────────
# Cloudinary Configuration
# ─────────────────────────────────────────────────────────────────────────────

CLOUDINARY_CLOUD_NAME="dypdtkbzc"
CLOUDINARY_API_KEY="532891418414274"
CLOUDINARY_API_SECRET="_tI0HsvFvOcm39dqwwyxs2tsg3Y"
CLOUDINARY_UPLOAD_FOLDER="dr-kumar-profiles"

# ─────────────────────────────────────────────────────────────────────────────
# Resend Email Configuration
# ─────────────────────────────────────────────────────────────────────────────

RESEND_API_KEY=re_erB6mRvH_3Q8T6DbGF3zVkKMH2rMSUSxs
EMAIL_FROM="Dr. Kumar Foundation <info@sufisciencecenter.info>"

# ─────────────────────────────────────────────────────────────────────────────
# pgAdmin Configuration (for Docker development)
# ─────────────────────────────────────────────────────────────────────────────

PGADMIN_EMAIL=admin@drkumarfoundation.org
PGADMIN_PASSWORD=DrKumar2024Admin


#psql -U postgres -d dr_kumar_foundation -f backup_data_only.sql
#Connection String: DATABASE_URL=postgresql://dkf_user:dkf123987%;@localhost:5432/dkf_db