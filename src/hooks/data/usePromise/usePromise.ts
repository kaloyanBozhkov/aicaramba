import { useCallback, useEffect, useState } from 'react'

type ReturnObj<D, E> = {
  response: D | undefined
  error: E | undefined
  loading: boolean
  onReset: () => void
  onRefetch: () => void
  onRunPromise?: (props?: Record<string, string>) => void
}
/*
 * Provided promise is ran & when it settles its resolution or rejection values are memoized & returned
 */
const usePromise = <D, E>(
  promiseFnCreator: (props?: Record<string, string>) => Promise<D>,
  // are we fetching on command (true) or on mount (false)?
  lazy = false
): ReturnObj<D, E> => {
  const [response, setResonse] = useState<D | undefined>(),
    [error, setError] = useState<E | undefined>(),
    [loading, setLoading] = useState<boolean>(!lazy),
    [fetched, setFetched] = useState(false),
    /* eslint-disable react-hooks/exhaustive-deps */
    onPromiseCreator = useCallback(promiseFnCreator, []),
    onReset = useCallback(() => {
      setResonse(undefined)
      setError(undefined)
    }, []),
    onRefetch = useCallback(() => {
      setFetched((prev) => !prev)
      onReset()
      setLoading(true)
    }, []),
    onRunPromise = (props?: Record<string, string>) => {
      if (lazy) {
        if (fetched) onRefetch()
        else setLoading(true)
      }

      onPromiseCreator(props)
        .then(setResonse)
        .catch(setError)
        .finally(() => {
          setLoading(false)
          setFetched(true)
        })
    }

  useEffect(() => {
    if (!lazy && !fetched) onRunPromise()
  }, [onPromiseCreator, fetched])

  return {
    response,
    error,
    loading,
    onReset,
    onRefetch,
    ...(lazy
      ? {
          onRunPromise,
        }
      : {}),
  }
}

export default usePromise
