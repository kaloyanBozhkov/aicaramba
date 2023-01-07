import { PrismaClient } from '@prisma/client'

import { productsSeed } from './products'

const prisma = new PrismaClient(),
  main = async () => [productsSeed].forEach(async (s) => s(prisma))

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
