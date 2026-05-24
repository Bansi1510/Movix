import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Bansi.,&1510", 10);

  await prisma.admin.upsert({
    where: { email: "bansi@gmail.com" },
    update: {},
    create: {
      email: "bansi@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("Default admin seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });