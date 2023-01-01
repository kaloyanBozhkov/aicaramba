import { createContext } from 'server/trpc/context'
import { appRouter } from 'server/trpc/routers/_app'

import { createNextApiHandler } from '@trpc/server/adapters/next'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
})
