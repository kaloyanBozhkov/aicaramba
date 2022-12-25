import Image from 'next/image'
import Link from 'next/link'

import mainNav from 'routing/navLinks/mainNav'

import useVerticalScrollDirection from 'hooks/styles/useVerticalScrollDirection'

import Logo from 'components/atoms/Logo/Logo.atom'
import Status from 'components/atoms/Status/Status.atom'

import { SubNavItems } from 'components/molecules/NavItemRenderer/NavItemRender.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import FluidContainer from 'components/templates/FluidContainer/FluidContainer.template'

import { Group, Menu, Space } from '@mantine/core'

import { headerScrollDir } from './config.constant'

import styles from './styles.module.scss'

const Header = () => {
  // limit to height of banner
  const scrollDir = useVerticalScrollDirection({
    endAt: announcementHeight,
    startAt: totalHeight,
  })

  // when other parts of the system need this info
  headerScrollDir.current = scrollDir

  return (
    <>
      {scrollDir !== 'base' && <Space style={{ height: headerHeight }} />}
      <FluidContainer className={styles.header} data-scroll-dir={scrollDir}>
        <CappedContainerTemplate withoutPadding className={styles.wrapper}>
          <Link href="/" data-naked="true">
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
            <Link data-naked="true" href="/search">
              <Image
                src="/assets/icons/search.svg"
                alt="search icon"
                width={iconSize}
                height={iconSize}
                className={styles.icon}
              />
            </Link>
            <Link data-naked="true" href="/account">
              <Image
                src="/assets/icons/user.svg"
                alt="user icon"
                width={iconSize}
                height={iconSize}
                className={styles.icon}
              />
            </Link>
            {/* @TODO repalce with widget that pops open when cart item is added */}
            <Link data-naked="true" href="/cart">
              <Image
                src="/assets/icons/shopping-basket.svg"
                alt="shopping-basket icon"
                width={iconSize}
                height={iconSize}
                className={styles.icon}
              />
            </Link>
          </Group>
        </CappedContainerTemplate>
      </FluidContainer>
    </>
  )
}

export default Header

const announcementHeight = 35,
  headerHeight = 95,
  totalHeight = announcementHeight + headerHeight,
  iconSize = 20
