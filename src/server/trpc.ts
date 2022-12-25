import { initTRPC } from '@trpc/server'

import { Context } from './context'

// You can use any variable name you like.
// We use t to keep things simple.
const t = initTRPC.context<Context>().create()

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure //.use(isAuthed)
//https://trpc.io/docs/context
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
