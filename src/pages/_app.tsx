import { useState } from 'react'

import { trpcReact } from 'server/trpc/utils/trcpReact'
import { trpcNext } from 'server/trpc/utils/trpcNext'

import type { AppProps } from 'next/app'
import { GlobalStyles } from 'scss/variables'

import { useCart } from 'stores/Cart.store'
import { useModal } from 'stores/Modal.store'

import useMobileCheck from 'hooks/styles/useMobileCheck'
import useTabletCheck from 'hooks/styles/useTabletCheck'

import Announcement from 'components/organisms/Announcement/Announcement.organism'
import Cart from 'components/organisms/Cart/Cart.organism'
import Footer from 'components/organisms/Footer/Footer.organism'
import HeaderMobile from 'components/organisms/Header/Header.mobile.organism'
import Header from 'components/organisms/Header/Header.organism'
import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'

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
    modalProps = useModal((store) => store.modalProps),
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
              modal={<Modal {...modalProps} lockScroll />}
              banner={<Announcement />}
              footer={<Footer />}
              cart={<Cart />}
            >
              <Component {...pageProps} />
            </MainTemplate>
          </QueryClientProvider>
        </trpcReact.Provider>
      </ErrorBoundary>
    </MantineProvider>
  )
}

// interface IAppProps {
//   isDesktop: boolean
// }

// export const getServerSideProps: GetServerSideProps<IAppProps> = async ({ req }) => {
//   const userAgent = req.headers['user-agent'],
//     isDesktop = !!userAgent && !isMobile(userAgent)

//   return {
//     props: {
//       isDesktop,
//     },
//   }
// }

export default trpcNext.withTRPC(App)
