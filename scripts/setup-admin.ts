// scripts/setup-admin.ts
// Run with: npx ts-node scripts/setup-admin.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@biolabdata.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created/updated:');
  console.log(`   Email: ${email}`);
  console.log(`   Password: ${password}`);
  console.log('\n⚠️  IMPORTANT: Change the password after first login!');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
