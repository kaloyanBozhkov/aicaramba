import { useMemo } from 'react'

// import { Helmet } from 'react-helmet'
import { useStyles } from 'stores/Styles.store'

// Gets the theme vars and appends them to the document head so all scss modules have access to the css vars
export const GlobalStyles = () => {
  const theme = useStyles((state) => state.theme),
    rootVars = useMemo(
      () =>
        Object.keys(theme).reduce(
          (acc, key) => `${acc}\n--${key}: ${theme[key as keyof typeof theme]};`,
          ''
        ),
      [theme]
    )

  return <style>{`:root {${rootVars}\n}`}</style>
}
