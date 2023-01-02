import { publicProcedure, router } from '../../trpc'

const select = {
  currency: true,
  style: true,
  colorScheme: true,
  price: true,
  id: true,
  status: true,
  name: true,
}

export const homeRouter = router({
  products: publicProcedure.query(async ({ ctx: { prisma } }) => {
    return {
      newDeals: await prisma.product.findMany({
        where: {
          status: 'NEW',
        },
        select: {
          ...select,
        },
        take: 4,
        orderBy: {
          createdAt: 'asc',
        },
      }),
      fireDeals: await prisma.product.findMany({
        where: {
          status: 'FIRE',
        },
        select: {
          ...select,
        },
        take: 4,
        orderBy: {
          updatedAt: 'asc',
        },
      }),
      soldDeals: await prisma.product.findMany({
        where: {
          status: 'SOLD',
        },
        select: {
          ...select,
        },
        take: 4,
        orderBy: {
          updatedAt: 'asc',
        },
      }),
      goneDeals: await prisma.product.findMany({
        where: {
          status: 'GONE',
        },
        select: {
          ...select,
        },
        take: 4,
        orderBy: {
          updatedAt: 'asc',
        },
      }),
    }
  }),
})
