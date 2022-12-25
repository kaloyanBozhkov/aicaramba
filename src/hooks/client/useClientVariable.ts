import { useEffect, useState } from 'react'

/**
 *  used to get document within SSR component
 */
const useClientVariable = <T>(getVariable: () => T) => {
  const [cliVar, setCliVar] = useState<T>()

  useEffect(
    () => setCliVar(getVariable()),
    // eslint-disable-next-line
    []
  )

  return cliVar
}

export default useClientVariable
