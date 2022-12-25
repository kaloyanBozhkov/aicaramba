import { useEffect, useState } from 'react'

type UseCountdownProps = {
  onReady: () => void
  gate: boolean
  from?: number
  till?: number
  timeoutMS?: number
}

const useCountdown = ({
  onReady,
  gate,
  from = 3,
  till = 0,
  timeoutMS = 1000,
}: UseCountdownProps) => {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (gate) {
      if (count > till) setTimeout(() => setCount((prev) => prev - 1), timeoutMS)

      if (count === till) onReady()
    }
  }, [count, gate, till, onReady, timeoutMS])

  return count
}

export default useCountdown
