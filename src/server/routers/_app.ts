import { createContext } from 'server/context'
import { router } from 'server/trpc'

import { artworkRouter } from './artwork/artwork'
import { homeRouter } from './home/product'
import { searchRouter } from './search/product'

export const appRouter = router({
  home: homeRouter,
  artwork: artworkRouter,
  search: searchRouter,
})

export const trcpCaller = async () => appRouter.createCaller(await createContext())

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter
