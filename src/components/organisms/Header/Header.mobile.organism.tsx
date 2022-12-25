import { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import mainNav from 'routing/navLinks/mainNav'

import useOnLocationChange from 'hooks/location/useOnLocationChange'
import useVerticalScrollDirection from 'hooks/styles/useVerticalScrollDirection'

import Logo from 'components/atoms/Logo/Logo.atom'
import CreatorSignature from 'components/atoms/Signature/CreatorSignature.atom'

import { NavItems } from 'components/molecules/NavItemRenderer/NavItemRender.molecule'
import SocialFollowing from 'components/molecules/SocialFollowing/SocialFollowing.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'

import { Burger, Container, Drawer, Group, Space, Stack } from '@mantine/core'
import { useToggle } from '@mantine/hooks'

import styles from './styles.module.scss'

const HeaderMobile = () => {
  const [menuOpened, toggleMenuOpened] = useToggle([false, true]),
    // limit to height of banner
    scrollDir = useVerticalScrollDirection({
      endAt: announcementHeight,
      startAt: totalHeight,
    })

  useOnLocationChange({ onChange: () => toggleMenuOpened(false) })

  return (
    <>
      {scrollDir !== 'base' && !menuOpened && <Space style={{ height: headerHeight }} />}
      <Container
        fluid
        className={styles.headerMobile}
        data-scroll-dir={menuOpened ? 'up' : scrollDir}
      >
        <CappedContainerTemplate withWrapper className={styles.wrapper}>
          <Container className={styles.even}>
            <Burger opened={menuOpened} onClick={() => toggleMenuOpened((o) => !o)} />
          </Container>
          <Container className={styles.odd}>
            <Link href="/" data-naked="true">
              <Logo height="85%" />
            </Link>
          </Container>
          <Group className={styles.even}>
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
      </Container>
      <Drawer
        closeOnClickOutside
        closeOnEscape
        transitionDuration={400}
        withCloseButton={false}
        overlayOpacity={0.3}
        title="AI Caramba"
        padding="xl"
        size="xl"
        onClose={() => toggleMenuOpened(false)}
        data-scroll-dir={menuOpened ? 'up' : scrollDir}
        opened={menuOpened}
        className={styles.sideMenu}
      >
        <Stack className={styles.nav}>
          <NavItems
            nav={mainNav}
            subItemDataAttr="subitem"
            SubtitleComponent={labelRenderer}
            ItemComponent={itemRenderer}
          />
        </Stack>
        <Stack className={styles.footer}>
          <Link href="/access">
            {/* @TODO this based on logged in or not */}
            <Image
              src="/assets/icons/user.svg"
              alt="user icon"
              width={iconSize}
              height={iconSize}
              className={styles.icon}
            />
            <p>Log in</p>
          </Link>
          <SocialFollowing />
          <CreatorSignature variant="secondary" />
        </Stack>
      </Drawer>
    </>
  )
}

export default HeaderMobile

const announcementHeight = 35,
  headerHeight = 64,
  totalHeight = announcementHeight + headerHeight,
  labelRenderer = ({ children }: { children: ReactNode }) => (
    <div className={styles.subTitle}>{children}</div>
  ),
  itemRenderer = ({ children }: { children: ReactNode }) => (
    <div className={styles.subItem}>{children}</div>
  ),
  iconSize = 20
