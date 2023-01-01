import { initTRPC } from '@trpc/server'

import { Context } from './context'

// You can use any variable name you like.
// We use t to keep things simple.
export const {
  router,
  middleware,
  procedure: publicProcedure,
} = initTRPC.context<Context>().create()

// .use(isAuthed)
// https://trpc.io/docs/context
// const isAuthed = t.middleware(({ next, ctx }) => {
//   if (!ctx.session?.user?.email) {
//     throw new TRPCError({
//       code: 'UNAUTHORIZED',
//     });
//   }
//   return next({
//     ctx: {
//       // Infers the `session` as non-nullable
//       session: ctx.session,
//     },
//   });
// });
