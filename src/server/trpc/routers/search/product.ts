import { findMostCommonString } from 'server/trpc/utils/common'

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
  suggestArtworks: publicProcedure
    .input(
      z.object({
        quantity: z.number(),
        searchContent: z.object({
          colorSchemes: z.array(z.string()),
          styles: z.array(z.string()),
          omitIds: z.array(z.string()),
        }),
      })
    )
    .query(
      async ({
        ctx,
        input: {
          quantity,
          searchContent: { colorSchemes, styles, omitIds },
        },
      }) => {
        const searchForColorScheme = findMostCommonString(colorSchemes),
          searchForStyle = findMostCommonString(styles),
          whereColorSchemeOrStyleMatch =
            searchForColorScheme && searchForStyle
              ? {
                  OR: [
                    {
                      colorScheme: {
                        contains: searchForColorScheme,
                      },
                    },
                    {
                      style: {
                        contains: searchForStyle,
                      },
                    },
                  ],
                }
              : false,
          found = await ctx.prisma.product.findMany({
            where: {
              ...whereColorSchemeOrStyleMatch,
              AND: {
                OR: [{ status: 'FIRE' }, { status: 'NEW' }],
                id: { notIn: omitIds },
              },
            },
            select,
            take: quantity,
            orderBy: {
              updatedAt: 'asc',
            },
          })

        if (found.length === quantity) return found

        // add random results if required matches are not enough
        const remaining = quantity - found.length,
          anotherOne = await ctx.prisma.product.findMany({
            where: {
              AND: {
                OR: [{ status: 'FIRE' }, { status: 'NEW' }],
                id: { notIn: [...omitIds, ...found.map(({ id }) => id)] },
              },
            },
            select,
            take: remaining,
            orderBy: {
              updatedAt: 'asc',
            },
          })

        return [...found, ...anotherOne]
      }
    ),
  getArtworks: publicProcedure
    .input(
      z.object({
        pIds: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input: { pIds } }) => {
      const products = await ctx.prisma.product.findMany({
        where: {
          id: { in: pIds },
        },
        select,
        orderBy: {
          updatedAt: 'asc',
        },
      })

      return products
    }),
})
