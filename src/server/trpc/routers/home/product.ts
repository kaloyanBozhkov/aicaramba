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
  products: publicProcedure.query(({ ctx: { prisma } }) => {
    return {
      freshDeals: prisma.product.findMany({
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
      fireDeals: prisma.product.findMany({
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
      soldDeals: prisma.product.findMany({
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
      goneDeals: prisma.product.findMany({
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
