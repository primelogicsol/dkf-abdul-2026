-- ─────────────────────────────────────────────────────────────────────────────
-- Database Initialization Script for Dr. Kumar Foundation
-- This script runs automatically on first database startup
-- ─────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant permissions to the application user
-- (PostgreSQL user is created automatically by the postgres image)

-- Create schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS public;

-- Note: Prisma will create all tables and migrations automatically
-- This file is just for initial database setup

-- Log completion
DO $$
BEGIN
  RAISE NOTICE 'Database initialization completed successfully!';
  RAISE NOTICE 'Prisma migrations will be applied on first application start.';
END $$;
