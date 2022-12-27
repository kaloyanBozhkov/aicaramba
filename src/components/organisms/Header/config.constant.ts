import { SIZES } from 'stores/Styles.store'

const { 'header-desktop-h': hdh, 'header-mobile-h': hmh } = SIZES

export const headerScrollDir = {
  current: 'base',
  'header-desktop-h': parseFloat(hdh.replace('px', '')),
  'header-mobile-h': parseFloat(hmh.replace('px', '')),
}
