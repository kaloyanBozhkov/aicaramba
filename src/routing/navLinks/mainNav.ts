import { ProductStatus } from '@prisma/client'

type Path = string

export type NavItem = {
  to: Path
  label: string
  icon?: ProductStatus
  subNav?: (
    | {
        subtitle?: string
        content: NavItem[]
      }
    | NavItem
  )[]
}

const mainNav: NavItem[] = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/catalog',
    label: 'Catalog',
    subNav: [
      {
        subtitle: 'Available Deals',
        content: [
          {
            to: '/products/fresh',
            label: 'Fresh Artworks',
            icon: ProductStatus.NEW,
          },
          {
            to: '/products/fire',
            label: 'Fire Artworks',
            icon: ProductStatus.FIRE,
          },
        ],
      },
      {
        subtitle: 'Missed Deals',
        content: [
          {
            to: '/products/sold',
            label: 'Sold Artworks',
            icon: ProductStatus.SOLD,
          },
          {
            to: '/products/missed',
            label: 'Gone Artworks',
            icon: ProductStatus.GONE,
          },
        ],
      },
    ],
  },
  {
    to: '/faq',
    label: 'FAQ',
  },
  {
    to: '/contact',
    label: 'Contact',
  },
]

export default mainNav
