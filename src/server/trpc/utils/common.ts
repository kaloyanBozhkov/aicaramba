export function findMostCommonString(strings: string[]): string | null {
  if (strings.length === 0) return null

  const counts: Record<string, number> = {}

  strings.forEach((str) => {
    if (!Object.hasOwnProperty.call(counts, str)) counts[str] = 1
    else counts[str]++
  })

  let mostCommonString: keyof typeof counts | null = null,
    maxCount = 0

  Object.keys(counts).forEach((key) => {
    const val = counts[key]
    if (val > maxCount) {
      mostCommonString = key
      maxCount = val
    }
  })

  return mostCommonString
}
