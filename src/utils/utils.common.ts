import type { ResponseError } from 'types/common.types'

export const isValidEmail = (email: string): boolean => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * Run a promise crator fn multiple times until either all attempts to resolve the created promise fail or one succeeds. Also runs callbacks accordingly if provided.
 * @param runPromise Promise creator -> catch/on error should return { error: stirng | boolean }
 * @param onFail callback fn
 * @param onSuccess callback fn
 * @param depth n. of retries, default 5
 */
export const retryPromise = <T extends ResponseError | void>(
  runPromise: () => Promise<T>,
  onFail?: () => void,
  onSuccess?: (resp: T) => void,
  depth = 5
) => {
  let countAttempts = 0

  const retry = () => {
    // no more attempts left - run potential onFail logic
    if (countAttempts === depth) return onFail?.()

    setTimeout(() => {
      runPromise().then((resp) => {
        if (resp?.error) return retry()

        onSuccess?.(resp)
      })

      countAttempts++
    }, countAttempts && 2 ** countAttempts * 100)
  }

  // first run is not a real retry
  retry()
}

export const extendClassNameProp = (className1: string, className2?: string) =>
  className2 ? [className1, className2].join(' ').trim() : className1

export const getBaseUrl = () => {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}
