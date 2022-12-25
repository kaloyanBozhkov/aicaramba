import { useEffect } from 'react'

import { useRouter } from 'next/router'

const useOnLocationChange = ({
  onChange,
  withShallowRouting = false,
}: {
  onChange: (url?: string) => void
  withShallowRouting?: boolean
}) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      if (!withShallowRouting && shallow) return
      onChange(url)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events, onChange, withShallowRouting])
}

export default useOnLocationChange
