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

export const catalogRouter = router({
  products: publicProcedure.query(async ({ ctx: { prisma } }) => {
    return {
      newDeals: await prisma.product.findMany({
        where: {
          status: 'NEW',
        },
        select: {
          ...select,
        },
        take: 8,
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
        take: 8,
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
        take: 8,
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
        take: 8,
        orderBy: {
          updatedAt: 'asc',
        },
      }),
    }
  }),
  freshArtworks: publicProcedure.query(({ ctx: { prisma } }) => {
    return prisma.product.findMany({
      where: {
        status: 'NEW',
      },
      select: {
        ...select,
      },
      take: 20,
      orderBy: {
        createdAt: 'asc',
      },
    })
  }),
  fireArtworks: publicProcedure.query(({ ctx: { prisma } }) => {
    return prisma.product.findMany({
      where: {
        status: 'FIRE',
      },
      select: {
        ...select,
      },
      take: 20,
      orderBy: {
        createdAt: 'asc',
      },
    })
  }),
  soldArtworks: publicProcedure.query(({ ctx: { prisma } }) => {
    return prisma.product.findMany({
      where: {
        status: 'SOLD',
      },
      select: {
        ...select,
      },
      take: 20,
      orderBy: {
        createdAt: 'asc',
      },
    })
  }),
  goneArtworks: publicProcedure.query(({ ctx: { prisma } }) => {
    return prisma.product.findMany({
      where: {
        status: 'GONE',
      },
      select: {
        ...select,
      },
      take: 20,
      orderBy: {
        createdAt: 'asc',
      },
    })
  }),
})
