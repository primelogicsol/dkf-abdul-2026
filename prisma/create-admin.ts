import 'dotenv/config';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Creating initial Super Admin account...');

  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@drkumarfoundation.org' },
  });

  if (existingAdmin) {
    console.log('Super Admin account already exists. Skipping creation.');
    return;
  }

  // Hash password
  const passwordHash = await bcrypt.hash('FayazKhan$7766', 12);

  // Create Super Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admindkf@drkumarfoundation.org',
      password_hash: passwordHash,
      full_name: 'System Administrator',
      role: 'super_admin',
      is_active: true,
      assigned_programs: [],
    },
  });

  console.log('✓ Super Admin account created successfully!');
  console.log('  Email: admin@drkumarfoundation.org');
  console.log('  Password: admin123');
  console.log('');
  console.log('⚠️  Please change the password after first login!');
}

main()
  .catch((e) => {
    console.error('Error creating admin account:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
