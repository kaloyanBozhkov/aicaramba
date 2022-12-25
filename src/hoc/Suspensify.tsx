import { ReactElement, Suspense } from 'react'

import Loading, { LoadingProps } from 'components/molecules/Loading/Loading.molecule'

interface SuspensifyProps extends LoadingProps {
  children: ReactElement
}

const Suspensify = ({ children, ...loadingProps }: SuspensifyProps) => (
  <Suspense fallback={<Loading {...loadingProps} />}>{children}</Suspense>
)

export default Suspensify
