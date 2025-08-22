import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // ⬅️ import par défaut (ESM)

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@votreentreprise.fr";
  const adminPass = "Admin123!";

  const passwordHash = await bcrypt.hash(adminPass, 10); // ⬅️ bcrypt.hash

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, role: "ADMIN" },
  });

  const e1 = await prisma.employee.create({
    data: {
      firstName: "Aïcha",
      lastName: "Diallo",
      phone: "0600000000",
      address: "Lyon",
      status: "ACTIF",
    },
  });

  await prisma.timesheet.create({
    data: {
      employeeId: e1.id,
      declaredStart: new Date(Date.now() - 1000 * 60 * 60 * 10),
      declaredEnd: new Date(Date.now() - 1000 * 60 * 60 * 2),
      declaredBreakMins: 30,
      status: "EN_ATTENTE",
    },
  });

  console.log("Seed done:", adminEmail, adminPass);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
