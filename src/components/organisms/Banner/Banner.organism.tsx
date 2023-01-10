import { useEffect, useState } from 'react'

import Image from 'next/image'
import NavLink from 'next/link'

import useMobileCheck from 'hooks/styles/useMobileCheck'
import useTabletCheck from 'hooks/styles/useTabletCheck'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import RichText from 'components/molecules/RichText/RichText.molecule'

import { Center, Grid, Overlay } from '@mantine/core'

import styles from './styles.module.scss'

const Banner = () => {
  const [count, setCount] = useState(0),
    isMobile = useMobileCheck({ onlyPortrait: true }),
    isSmallTablet = useTabletCheck({ tabletSizeTarget: 'small' })

  // handle slide changes for mobile
  useEffect(() => {
    if (!isMobile && !isSmallTablet) return

    const intervalId = setInterval(() => {
      setCount((prev) => (prev + 1 === imgSrc.length ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(intervalId)
  }, [isMobile, isSmallTablet])

  return (
    <Center
      className={styles.banner}
      data-is-device={(isMobile && 'mobile') || (isSmallTablet && 'tablet')}
    >
      <Center className={styles.content}>
        <RichText
          variation="white"
          alignment="center"
          justify="middle"
          title={
            <>
              Truly unique <b>AI</b> powered <span style={{ whiteSpace: 'nowrap' }}>T-Shirts</span>.
            </>
          }
        />
        <Grid columns={2} gutter="md" gutterSm="xl" className={styles.actions}>
          <Grid.Col xs={2} sm={1}>
            <NavLink href="/catalog" data-naked="true">
              <ActionButton withShadow label="Explore now" modifier="primary" />
            </NavLink>
          </Grid.Col>
          <Grid.Col xs={2} sm={1}>
            <NavLink href="/faq" data-naked="true">
              <ActionButton withShadow label="Learn more" modifier="secondary" />
            </NavLink>
          </Grid.Col>
        </Grid>
      </Center>
      <Overlay className={styles.overlay} color="#000" zIndex={5} />
      {isMobile && (
        <Image
          priority
          src={imgSrc[count]}
          width={1000}
          height={1000}
          alt="robots working on shirts"
        />
      )}
      {isSmallTablet && (
        <Image
          priority
          src="/assets/images/half-cover.png"
          data-full-cover="false"
          alt="AI shirts factory"
          width={2040}
          height={1019}
          quality={75}
        />
      )}
      {!isMobile && !isSmallTablet && (
        <Image
          priority
          src="/assets/images/full-cover.png"
          data-full-cover="true"
          alt="AI shirts factory"
          width={3067}
          height={1019}
        />
      )}
    </Center>
  )
}
export default Banner

const imgSrc = ['/assets/images/img1.png', '/assets/images/img2.png', '/assets/images/img3.png']
