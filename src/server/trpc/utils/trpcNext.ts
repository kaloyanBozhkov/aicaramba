import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

import { getBaseUrl } from 'utils/utils.common'

import type { AppRouter } from '../routers/_app'

export const trpcNext = createTRPCNext<AppRouter>({
  config(/* { ctx } */) {
    return {
      links: [
        httpBatchLink({
          // If you want to use SSR, you need to use the server's full URL @link https://trpc.io/docs/ssr
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      // @link https://tanstack.com/query/v4/docs/reference/QueryClient
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  // @link https://trpc.io/docs/ssr
  ssr: false,
})
