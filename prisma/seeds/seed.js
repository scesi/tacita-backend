const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const active = await prisma.status.upsert({
    where: { name: 'Active' },
    create: { name: 'Active', color: '#00ff00' },
    update: { name: 'Active', color: '#00ff00' },
  });

  const inactive = await prisma.status.upsert({
    where: { name: 'Inactive' },
    create: { name: 'Inactive', color: '#ff0000' },
    update: { name: 'Inactive', color: '#ff0000' },
  });

  console.log({ active, inactive });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
