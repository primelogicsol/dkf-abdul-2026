-- CreateEnum
CREATE TYPE "ResonatedQuality" AS ENUM ('Stillness', 'Clarity', 'Discipline', 'Accountability', 'Compassion', 'Presence', 'Ethical_Firmness', 'Self_Awareness', 'Inner_Discipline', 'Reflective_Silence', 'Ethical_Conduct', 'Shared_Responsibility');

-- CreateEnum
CREATE TYPE "VisibilityStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('super_admin', 'editor', 'moderator');

-- CreateTable
CREATE TABLE "FoundationGovernance" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role_title" TEXT NOT NULL,
    "bio_summary" TEXT,
    "term_start" TIMESTAMP(3),
    "term_end" TIMESTAMP(3),
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoundationGovernance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "profession" TEXT NOT NULL,
    "year_connected" INTEGER NOT NULL,
    "first_encounter" TEXT NOT NULL,
    "resonated_quality" "ResonatedQuality" NOT NULL,
    "life_changes" TEXT NOT NULL,
    "continuing_engagement" TEXT NOT NULL,
    "photo_url" TEXT,
    "media_url" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "visibility_status" "VisibilityStatus" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "year_connected" INTEGER NOT NULL,
    "first_encounter" TEXT NOT NULL,
    "resonated_quality" "ResonatedQuality" NOT NULL,
    "life_changes" TEXT NOT NULL,
    "continuing_engagement" TEXT NOT NULL,
    "consent_accepted" BOOLEAN NOT NULL DEFAULT false,
    "review_status" "ReviewStatus" NOT NULL DEFAULT 'pending',
    "reviewed_by" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gathering" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "location_city" TEXT NOT NULL,
    "location_country" TEXT NOT NULL,
    "description" TEXT,
    "related_region" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gathering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrinciplePage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "context" TEXT,
    "practical_implication" TEXT,
    "selected_words" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrinciplePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoundationSection" (
    "id" TEXT NOT NULL,
    "section_name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoundationSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'moderator',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "changes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberVersion" (
    "id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "profession" TEXT NOT NULL,
    "year_connected" INTEGER NOT NULL,
    "first_encounter" TEXT NOT NULL,
    "resonated_quality" "ResonatedQuality" NOT NULL,
    "life_changes" TEXT NOT NULL,
    "continuing_engagement" TEXT NOT NULL,
    "photo_url" TEXT,
    "media_url" TEXT,
    "version_number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "MemberVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EngagementRequest" (
    "id" TEXT NOT NULL,
    "program_type" TEXT NOT NULL,
    "form_type" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_at" TIMESTAMP(3),
    "reviewed_by" TEXT,

    CONSTRAINT "EngagementRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FoundationGovernance_is_active_idx" ON "FoundationGovernance"("is_active");

-- CreateIndex
CREATE INDEX "FoundationGovernance_display_order_idx" ON "FoundationGovernance"("display_order");

-- CreateIndex
CREATE INDEX "Member_approved_idx" ON "Member"("approved");

-- CreateIndex
CREATE INDEX "Member_visibility_status_idx" ON "Member"("visibility_status");

-- CreateIndex
CREATE INDEX "Member_country_idx" ON "Member"("country");

-- CreateIndex
CREATE INDEX "Member_year_connected_idx" ON "Member"("year_connected");

-- CreateIndex
CREATE INDEX "Registration_review_status_idx" ON "Registration"("review_status");

-- CreateIndex
CREATE INDEX "Registration_created_at_idx" ON "Registration"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "Region_country_key" ON "Region"("country");

-- CreateIndex
CREATE INDEX "Region_continent_idx" ON "Region"("continent");

-- CreateIndex
CREATE INDEX "Region_country_idx" ON "Region"("country");

-- CreateIndex
CREATE INDEX "Gathering_year_idx" ON "Gathering"("year");

-- CreateIndex
CREATE INDEX "Gathering_related_region_idx" ON "Gathering"("related_region");

-- CreateIndex
CREATE UNIQUE INDEX "PrinciplePage_title_key" ON "PrinciplePage"("title");

-- CreateIndex
CREATE INDEX "PrinciplePage_display_order_idx" ON "PrinciplePage"("display_order");

-- CreateIndex
CREATE UNIQUE INDEX "FoundationSection_section_name_key" ON "FoundationSection"("section_name");

-- CreateIndex
CREATE INDEX "FoundationSection_display_order_idx" ON "FoundationSection"("display_order");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "AuditLog_entity_type_idx" ON "AuditLog"("entity_type");

-- CreateIndex
CREATE INDEX "AuditLog_entity_id_idx" ON "AuditLog"("entity_id");

-- CreateIndex
CREATE INDEX "AuditLog_user_id_idx" ON "AuditLog"("user_id");

-- CreateIndex
CREATE INDEX "AuditLog_created_at_idx" ON "AuditLog"("created_at");

-- CreateIndex
CREATE INDEX "MemberVersion_member_id_idx" ON "MemberVersion"("member_id");

-- CreateIndex
CREATE INDEX "MemberVersion_version_number_idx" ON "MemberVersion"("version_number");

-- CreateIndex
CREATE INDEX "EngagementRequest_program_type_idx" ON "EngagementRequest"("program_type");

-- CreateIndex
CREATE INDEX "EngagementRequest_form_type_idx" ON "EngagementRequest"("form_type");

-- CreateIndex
CREATE INDEX "EngagementRequest_status_idx" ON "EngagementRequest"("status");

-- CreateIndex
CREATE INDEX "EngagementRequest_created_at_idx" ON "EngagementRequest"("created_at");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_country_fkey" FOREIGN KEY ("country") REFERENCES "Region"("country") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_country_fkey" FOREIGN KEY ("country") REFERENCES "Region"("country") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gathering" ADD CONSTRAINT "Gathering_related_region_fkey" FOREIGN KEY ("related_region") REFERENCES "Region"("country") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
