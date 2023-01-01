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

export const artworkRouter = router({
  find: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input: { id } }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id,
        },
        select,
      })
    }),
})
