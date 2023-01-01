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
  'primary-background': 'linear-gradient(0deg, rgb(214 127 175) 0%, rgb(152 112 212) 100%)',
  'primary-background-active': 'linear-gradient(0deg, rgb(183 105 148) 0%, rgb(141 100 202) 100%)',
  'primary-background-color': 'rgb(214 127 175)',
  red: '#ef476f',
}

export const SIZES = {
  'max-window-width': '1200px',
}

const defaultTheme = {
  ...COLORS,
  ...SIZES,
}

type theme = typeof defaultTheme

interface IStylesStore {
  theme: theme
  // used to show/hide header from elsewhere if more screen space is needed
  headerHidden: boolean
  updateThemeVar: (k: keyof theme, v: theme[keyof theme]) => void
  reset: () => void
  toggleHeader: (open: boolean) => void
}

export const useStyles = create<IStylesStore>((set) => ({
  theme: defaultTheme,
  headerHidden: false,
  updateThemeVar: (k, v) => {
    return set((s) => ({
      theme: {
        ...s.theme,
        [k]: v,
      },
    }))
  },
  reset: () => set(() => ({ theme: defaultTheme })),
  toggleHeader: (open) => set({ headerHidden: open }),
}))
