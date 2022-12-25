import { useCallback, useEffect } from 'react'

import { useToggle } from '@mantine/hooks'

const useTimedCallback = ({
  timeoutMS,
  callback,
  gate,
  onStartWait,
}: {
  timeoutMS: number
  callback: () => void
  gate: boolean
  onStartWait?: () => void
}) => {
  const [toggled, toggleTimedCallback] = useToggle([false, true]),
    fn = useCallback(() => {
      if (gate) return

      onStartWait?.()
      toggleTimedCallback()
    }, [onStartWait, toggleTimedCallback, gate])

  useEffect(() => {
    if (!gate) return

    const timeoutId = setTimeout(() => {
      callback()
    }, timeoutMS)

    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line
  }, [toggled, callback])

  return { toggleTimedCallback: fn }
}

export default useTimedCallback
