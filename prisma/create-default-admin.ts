import 'dotenv/config';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@drkumarfoundation.org' },
    });

    if (existingAdmin) {
      console.log('✅ Default admin already exists');
      console.log('Email: admin@drkumarfoundation.org');
      console.log('Password: admin123');
      return;
    }

    // Create default admin
    const passwordHash = await bcrypt.hash('admin123', 12);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@drkumarfoundation.org',
        password_hash: passwordHash,
        full_name: 'Site Administrator',
        role: 'super_admin',
        is_active: true,
        approval_status: 'approved',
      },
    });

    console.log('✅ Default admin created successfully!');
    console.log('');
    console.log('📧 Email: admin@drkumarfoundation.org');
    console.log('🔑 Password: admin123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change this password immediately after first login!');
    console.log('');
    console.log('Login at: http://localhost:3000/admin/login');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createDefaultAdmin();
