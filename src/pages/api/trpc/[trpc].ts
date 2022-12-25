import { createContext } from 'server/context'
import { appRouter } from 'server/routers/_app'

import { createNextApiHandler } from '@trpc/server/adapters/next'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
})
