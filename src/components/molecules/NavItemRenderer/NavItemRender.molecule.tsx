import { FC, Fragment, ReactNode } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import type { NavItem } from 'routing/navLinks/mainNav'

import Status from 'components/atoms/Status/Status.atom'

// Helps render Navigations from routing/navLinks
export const NavItems = ({
  nav,
  SubtitleComponent = Fragment,
  ItemComponent = Fragment,
  GroupComponent = Fragment,
  subItemDataAttr,
}: {
  nav: NavItem | NavItem[]
  SubtitleComponent?: FC<{ children: ReactNode }>
  ItemComponent?: FC<{ children: ReactNode }>
  subItemDataAttr?: string
  GroupComponent?: FC<{ children: ReactNode }>
}) => {
  const navItems = Array.isArray(nav) ? nav : [nav],
    router = useRouter()

  return (
    <>
      {navItems.map((nav: NavItem) => {
        const { to, label, icon, subNav } = nav,
          subNavComponent = subNav ? (
            <SubNavItems
              subNav={subNav}
              SubtitleComponent={SubtitleComponent}
              ItemComponent={ItemComponent}
              subItemDataAttr={subItemDataAttr}
              GroupComponent={GroupComponent}
            />
          ) : null

        return (
          <Fragment key={to}>
            <Link
              href={to}
              data-sub-item-attr={subItemDataAttr}
              className={router.pathname === to ? 'active' : undefined}
            >
              <ItemComponent>
                <Status icon={icon} variant="no-text-format" label={label} />
              </ItemComponent>
            </Link>
            {subNavComponent}
          </Fragment>
        )
      })}
    </>
  )
}

export const SubNavItems = ({
  subNav,
  SubtitleComponent = Fragment,
  ItemComponent = Fragment,
  GroupComponent = Fragment,
  subItemDataAttr,
}: {
  subNav: NonNullable<NavItem['subNav']>
  SubtitleComponent?: FC<{ children: ReactNode }>
  ItemComponent?: FC<{ children: ReactNode }>
  GroupComponent?: FC<{ children: ReactNode }>
  subItemDataAttr?: string
}) => {
  const router = useRouter()
  return (
    <>
      {subNav.map((subNavItem, idx) => {
        // is a subNav with optional subtitle and content
        if ('content' in subNavItem) {
          const { subtitle, content } = subNavItem,
            formatted: ReactNode[] = content.reduce(
              (acc, { to, label, icon, subNav }) => [
                ...acc,
                <Fragment key={to}>
                  <Link
                    href={to}
                    data-sub-item-attr={subItemDataAttr}
                    className={router.pathname === to ? 'active' : undefined}
                  >
                    <ItemComponent>
                      <Status icon={icon} variant="no-text-format" label={label} />
                    </ItemComponent>
                  </Link>
                  {subNav && (
                    <SubNavItems
                      subNav={subNav}
                      ItemComponent={ItemComponent}
                      SubtitleComponent={SubtitleComponent}
                    />
                  )}
                </Fragment>,
              ],
              [] as ReactNode[]
            )

          return (
            <GroupComponent key={idx}>
              {subtitle && <SubtitleComponent>{subtitle}</SubtitleComponent>}
              {formatted}
            </GroupComponent>
          )
        }

        // is normal navItem
        return (
          <NavItems
            key={idx}
            nav={subNavItem}
            SubtitleComponent={SubtitleComponent}
            ItemComponent={ItemComponent}
          />
        )
      })}
    </>
  )
}
