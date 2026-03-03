import 'dotenv/config';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function createTestUsers() {
  try {
    const users = [
      {
        email: 'user1@drkumarfoundation.org',
        password: 'user123',
        full_name: 'Test User One',
        role: 'program_director',
      },
      {
        email: 'user2@drkumarfoundation.org',
        password: 'user123',
        full_name: 'Test User Two',
        role: 'moderator',
      },
      {
        email: 'user3@drkumarfoundation.org',
        password: 'user123',
        full_name: 'Test User Three',
        role: 'program_director',
      },
    ];

    console.log('Creating test users...\n');

    for (const userData of users) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`⚠️  User ${userData.email} already exists`);
        continue;
      }

      // Hash password
      const passwordHash = await bcrypt.hash(userData.password, 12);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password_hash: passwordHash,
          full_name: userData.full_name,
          role: userData.role as any,
          is_active: true,
          approval_status: 'approved',
        },
      });

      console.log(`✅ Created: ${user.email} (${user.full_name}) - Role: ${user.role}`);
    }

    console.log('\n✅ Test users created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('─────────────────────────────────────────');
    console.log('Email:    user1@drkumarfoundation.org');
    console.log('Password: user123');
    console.log('─────────────────────────────────────────');
    console.log('Email:    user2@drkumarfoundation.org');
    console.log('Password: user123');
    console.log('─────────────────────────────────────────');
    console.log('Email:    user3@drkumarfoundation.org');
    console.log('Password: user123');
    console.log('─────────────────────────────────────────');
    console.log('\n⚠️  IMPORTANT: Change these passwords in production!');
    console.log('\nLogin at: http://localhost:3000/admin/login');
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();
