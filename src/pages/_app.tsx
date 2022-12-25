import { useState } from 'react'

import { useReactiveVar } from '@apollo/client'

import { trpcReact } from 'server/utils/trcpReact'
import { trpcNext } from 'server/utils/trpcNext'

import type { AppProps } from 'next/app'
import { GlobalStyles } from 'scss/variables'

import { modalVar } from 'reactives/Modal.reactive'

import useMobileCheck from 'hooks/styles/useMobileCheck'
import useTabletCheck from 'hooks/styles/useTabletCheck'

import Announcement from 'components/organisms/Announcement/Announcement.organism'
import Footer from 'components/organisms/Footer/Footer.organism'
import HeaderMobile from 'components/organisms/Header/Header.mobile.organism'
import Header from 'components/organisms/Header/Header.organism'

import MainTemplate from 'components/templates/Main/Main.template'

import { MantineProvider, Modal } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'

import { getBaseUrl } from 'utils/utils.common'

import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

import 'scss/general.scss'

const App = ({ Component, pageProps }: AppProps) => {
  const isMobile = useMobileCheck(),
    isSmallTablet = useTabletCheck(),
    modal = useReactiveVar(modalVar),
    [queryClient] = useState(() => new QueryClient()),
    [trpcClient] = useState(() =>
      trpcReact.createClient({
        links: [
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            // // optional
            // headers() {
            //   return {
            //     authorization: getAuthCookie(),
            //   }
            // },
          }),
        ],
      })
    )

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ErrorBoundary>
        <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <GlobalStyles />
            <MainTemplate
              header={isMobile || isSmallTablet ? <HeaderMobile /> : <Header />}
              modal={<Modal {...modal} />}
              banner={<Announcement />}
              footer={<Footer />}
            >
              <Component {...pageProps} />
            </MainTemplate>
          </QueryClientProvider>
        </trpcReact.Provider>
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default trpcNext.withTRPC(App)
