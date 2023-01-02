import { z } from 'zod'

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

export const searchRouter = router({
  products: publicProcedure
    .input(
      z.object({
        contains: z.string().nullable(),
      })
    )
    .query(async ({ ctx: { prisma }, input: { contains } }) => {
      if (!contains) return []

      const newDeals = await prisma.product.findMany({
          where: {
            status: 'NEW',
            name: {
              contains,
            },
          },
          select: {
            ...select,
          },
          take: 4,
          orderBy: {
            createdAt: 'asc',
          },
        }),
        fireDeals = await prisma.product.findMany({
          where: {
            status: 'FIRE',
            name: {
              contains,
            },
          },
          select: {
            ...select,
          },
          take: 4,
          orderBy: {
            updatedAt: 'asc',
          },
        }),
        soldDeals = await prisma.product.findMany({
          where: {
            status: 'SOLD',
            name: {
              contains,
            },
          },
          select: {
            ...select,
          },
          take: 4,
          orderBy: {
            updatedAt: 'asc',
          },
        }),
        goneDeals = await prisma.product.findMany({
          where: {
            status: 'GONE',
            name: {
              contains,
            },
          },
          select: {
            ...select,
          },
          take: 4,
          orderBy: {
            updatedAt: 'asc',
          },
        })

      return [...soldDeals, ...newDeals, ...goneDeals, ...fireDeals]
    }),
})
