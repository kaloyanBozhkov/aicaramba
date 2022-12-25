import { makeVar } from '@apollo/client'

// default styles
const COLORS = {
    'primary-front': '#05e6c4',
    'primary-back': '#FFFFFF',
    'primary-border': '#ECECEC',
    'primary-active-link': '#F6F6F6',
    'secondary-front': '#f8f9fa',
    'secondary-back': '#e7e7e7',
    'tertiary-front': '#fffcf9',
    'tertiary-back': '#4b4b4b',
    'text-primary': 'rgb(18,18,18)',
    red: '#ef476f',
  },
  COLORS_MODIFIED = {}

export const SIZES = {
  'max-window-width': '1200px',
  'header-desktop-h': '95px',
  'header-mobile-h': '64px',
}

export const themeVar = makeVar<typeof COLORS & typeof COLORS_MODIFIED>({
  ...COLORS,
  ...COLORS_MODIFIED,
  ...SIZES,
})

export const setTheme = (
  newColors: Record<keyof typeof COLORS & keyof typeof COLORS_MODIFIED, string>
) =>
  themeVar({
    ...COLORS,
    ...COLORS_MODIFIED,
    ...newColors,
  })
