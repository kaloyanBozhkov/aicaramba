import Image from 'next/image'
import Link from 'next/link'

import mainNav from 'routing/navLinks/mainNav'

import { useStyles } from 'stores/Styles.store'

import useVerticalScrollDirection from 'hooks/styles/useVerticalScrollDirection'

import Logo from 'components/atoms/Logo/Logo.atom'
import Status from 'components/atoms/Status/Status.atom'

import CartButton from 'components/molecules/CartButton/CartButton.molecule'
import { SubNavItems } from 'components/molecules/NavItemRenderer/NavItemRender.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import FluidContainer from 'components/templates/FluidContainer/FluidContainer.template'

import { Group, Menu, Space } from '@mantine/core'

import styles from './styles.module.scss'

const Header = () => {
  // limit to height of banner
  const scrollDir = useVerticalScrollDirection({
      endAt: announcementHeight,
      startAt: totalHeight,
    }),
    headerHidden = useStyles((s) => s.headerHidden),
    // other parts of app can hide the header
    scrollDirOverwritten = headerHidden ? 'hidden' : scrollDir

  return (
    <div className={styles.headerWrapper}>
      <FluidContainer className={styles.header} data-scroll-dir={scrollDirOverwritten}>
        <CappedContainerTemplate withoutPadding className={styles.wrapper}>
          <Link href="/" data-naked="true" as="/home">
            <Logo height="85%" />
          </Link>
          <Group>
            {mainNav.map(({ to, label, subNav, icon }) => {
              if (subNav) {
                return (
                  <Menu withArrow key={to} trigger="hover" openDelay={100} closeDelay={1000}>
                    <Menu.Target>
                      <Link href={to}>
                        <Status label={label} icon={icon} variant="no-text-format" />
                      </Link>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <SubNavItems
                        subNav={subNav}
                        ItemComponent={Menu.Item}
                        SubtitleComponent={Menu.Label}
                      />
                    </Menu.Dropdown>
                  </Menu>
                )
              }

              return (
                <Link key={to} href={to}>
                  {label}
                </Link>
              )
            })}
          </Group>
          <Space style={{ flex: '1' }} />
          <Group>
            {/* @TODO add search pop-up on click */}
            <Link data-naked="true" href="/search" className={styles.icon}>
              <Image
                src="/assets/icons/search.svg"
                alt="search icon"
                width={iconSize}
                height={iconSize}
              />
            </Link>
            <Link data-naked="true" href="/account" className={styles.icon}>
              <Image
                src="/assets/icons/user.svg"
                alt="user icon"
                width={iconSize}
                height={iconSize}
              />
            </Link>
            <CartButton iconSize={iconSize} />
          </Group>
        </CappedContainerTemplate>
      </FluidContainer>
    </div>
  )
}

export default Header

const announcementHeight = 35,
  headerHeight = 95,
  totalHeight = announcementHeight + headerHeight,
  iconSize = 20
