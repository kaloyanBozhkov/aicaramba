import { createTRPCReact } from '@trpc/react-query'

import type { AppRouter } from '../routers/_app'

export const trpcReact = createTRPCReact<AppRouter>()
