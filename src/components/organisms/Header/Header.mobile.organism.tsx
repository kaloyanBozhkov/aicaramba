import { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import mainNav from 'routing/navLinks/mainNav'

import { useCart } from 'stores/Cart.store'
import { useStyles } from 'stores/Styles.store'

import useOnLocationChange from 'hooks/location/useOnLocationChange'
import useVerticalScrollDirection from 'hooks/styles/useVerticalScrollDirection'

import CounterIcon from 'components/atoms/CounterIcon/CounterIcon.atom'
import Logo from 'components/atoms/Logo/Logo.atom'
import CreatorSignature from 'components/atoms/Signature/CreatorSignature.atom'

import CartButton from 'components/molecules/CartButton/CartButton.molecule'
import { NavItems } from 'components/molecules/NavItemRenderer/NavItemRender.molecule'
import SocialFollowing from 'components/molecules/SocialFollowing/SocialFollowing.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'

import { Burger, Center, Container, Drawer, Group, Stack } from '@mantine/core'
import { useToggle } from '@mantine/hooks'

import styles from './styles.module.scss'

const HeaderMobile = () => {
  const [menuOpened, toggleMenuOpened] = useToggle([false, true]),
    [menuAnimationEnded, toggleMenuAnimationEnded] = useToggle([true, false]),
    // limit to height of banner
    scrollDir = useVerticalScrollDirection({
      endAt: announcementHeight,
      startAt: totalHeight,
    }),
    headerHidden = useStyles((s) => s.headerHidden),
    // other parts of app can hide the header
    scrollDirOverwritten = headerHidden ? 'hidden' : scrollDir,
    menuShowing = (menuOpened || !menuAnimationEnded) && !headerHidden

  useOnLocationChange({ onChange: () => toggleMenuOpened(false) })

  return (
    <div className={styles.headerMobileWrapper}>
      <Container fluid className={styles.headerMobile} data-scroll-dir={scrollDirOverwritten}>
        <CappedContainerTemplate withWrapper className={styles.wrapper} p={0} pos="relative">
          <Group align="start">
            <Burger opened={menuShowing} onClick={() => toggleMenuOpened((o) => !o)} />
            <Link data-naked="true" href="/search" className={styles.icon}>
              <Image
                src="/assets/icons/search.svg"
                alt="search icon"
                width={iconSize}
                height={iconSize}
              />
            </Link>
          </Group>
          <Center pos="absolute" style={{ left: 0, right: 0, margin: 'auto' }}>
            <Link href="/" data-naked="true" as="/home">
              <Logo height="85%" />
            </Link>
          </Center>
          <CartButton iconSize={iconSize} />
        </CappedContainerTemplate>
      </Container>
      <Drawer
        closeOnClickOutside
        closeOnEscape
        transitionDuration={300}
        withCloseButton={false}
        overlayOpacity={0.3}
        title="AI Caramba"
        padding="xl"
        size="xl"
        onTransitionEnd={() => toggleMenuAnimationEnded(!menuOpened)}
        onClose={() => toggleMenuOpened(false)}
        data-scroll-dir={scrollDirOverwritten}
        opened={menuOpened}
        className={styles.sideMenu}
        lockScroll
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
    </div>
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
