const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashPassword = await hash("test1234$", Number(process.env.HASH_SALT));

  const userSeed = await prisma.user.create({
    data: {
      firstName: "Daniel",
      lastName: "Dimitrov",
      email: "ddimitrov1108@gmail.com",
      hashPassword,
    },
  });

  console.log("Root user created successfully.");
  console.log(userSeed);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
