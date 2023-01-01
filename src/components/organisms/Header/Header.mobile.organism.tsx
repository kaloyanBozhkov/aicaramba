import { ReactNode } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import mainNav from 'routing/navLinks/mainNav'

import { useStyles } from 'stores/Styles.store'

import useOnLocationChange from 'hooks/location/useOnLocationChange'
import useVerticalScrollDirection from 'hooks/styles/useVerticalScrollDirection'

import Logo from 'components/atoms/Logo/Logo.atom'
import CreatorSignature from 'components/atoms/Signature/CreatorSignature.atom'

import CartButton from 'components/molecules/CartButton/CartButton.molecule'
import { NavItems } from 'components/molecules/NavItemRenderer/NavItemRender.molecule'
import SocialFollowing from 'components/molecules/SocialFollowing/SocialFollowing.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'

import { Burger, Container, Drawer, Group, Stack } from '@mantine/core'
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

  console.log(headerHidden)

  useOnLocationChange({ onChange: () => toggleMenuOpened(false) })

  return (
    <div className={styles.headerMobileWrapper}>
      <Container fluid className={styles.headerMobile} data-scroll-dir={scrollDirOverwritten}>
        <CappedContainerTemplate withWrapper className={styles.wrapper}>
          <Container className={styles.even}>
            <Burger opened={menuShowing} onClick={() => toggleMenuOpened((o) => !o)} />
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
            <CartButton iconSize={iconSize} />
          </Group>
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
