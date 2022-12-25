import { useEffect, useState } from 'react'

const useMobileCheck = ({ onlyPortrait }: { onlyPortrait: boolean } = { onlyPortrait: false }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => {
      const isMobile =
        window.matchMedia('(max-width: 599px) and (orientation: portrait)').matches ||
        (!onlyPortrait &&
          window.matchMedia('(max-height: 599px) and (orientation: landscape)').matches)

      setIsMobile(isMobile)
    }

    // run initially on mount
    updateIsMobile()

    window.addEventListener('resize', updateIsMobile)

    return () => window.removeEventListener('resize', updateIsMobile)
  }, [onlyPortrait])

  return isMobile
}

export default useMobileCheck
