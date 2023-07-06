import { PrismaClient } from "@prisma/client";
import fs, { promises } from "fs";
import Papa from "papaparse";

const prisma = new PrismaClient();

export async function createTransactions() {
  const portfolio = await prisma.portfolio.findFirstOrThrow({
    where: { id: "cljo52qkk0008lhtsm6cn6wse" }
  });
  const 
  await prisma.transaction.deleteMany({where: {stockAssetId: "cljo5jvwy000llhtsl1dks0qr"}});
  const transactions = await prisma.transaction.createMany({
    data: [
      {
      price: 28.5,
      units: 10,
      type: "long",
      stockAssetId: "cljo5jvwy000llhtsl1dks0qr",
      createdAt: "2023-06-26"
    },
    {
      price: 30, 
      units: 10, 
      type: "long", 
      stockAssetId: "cljo5jvwy000llhtsl1dks0qr",
      createdAt: "2023-06-27"
    },
    {
      price: 32,
      units: 5,
      type: "long",
      stockAssetId: "cljo5jvwy000llhtsl1dks0qr",
      createdAt: "2023-06-28"
    },
    {
      price: 30, 
      units: 10, 
      type: "long", 
      stockAssetId: "cljo5jvwy000llhtsl1dks0qr",
      createdAt: "2023-06-27"
    },
    {
      price: 30, 
      units: 10, 
      type: "long", 
      stockAssetId: "cljo5jvwy000llhtsl1dks0qr",
      createdAt: "2023-06-27"
    },
  ]
  })
}
async function createProfits() {
  await prisma.profit.deleteMany({where: {stockAssetId: "cljo5jvwy000llhtsl1dks0qr"}});
}
async function createLosses() {
  await prisma.loss.deleteMany({where: {stockAssetId: "cljo5jvwy000llhtsl1dks0qr"}});
}


async function main() {
  await createTransactions();
  await createProfits();
  await createLosses();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
