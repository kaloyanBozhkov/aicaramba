import create from 'zustand'

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
  'text-primary': '#121212',
  red: '#ef476f',
}

export const SIZES = {
  'max-window-width': '1200px',
  'header-desktop-h': '95px',
  'header-mobile-h': '64px',
}

const defaultTheme = {
  ...COLORS,
  ...SIZES,
}

type theme = typeof defaultTheme

interface IStylesStore {
  theme: theme
  updateThemeVar: (k: keyof theme, v: theme[keyof theme]) => void
  reset: () => void
}

export const useStyles = create<IStylesStore>((set) => ({
  theme: defaultTheme,
  updateThemeVar: (k, v) => {
    return set((s) => ({
      theme: {
        ...s.theme,
        [k]: v,
      },
    }))
  },
  reset: () => set(() => ({ theme: defaultTheme })),
}))
