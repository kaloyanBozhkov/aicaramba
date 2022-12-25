import { ReactNode, useEffect, useRef } from 'react'

import Image from 'next/image'

import mainNav from 'routing/navLinks/mainNav'

import useTimedCallback from 'hooks/useTimedCallback'

import { SubNavItems } from 'components/molecules/NavItemRenderer/NavItemRender.molecule'

import FluidContainer from 'components/templates/FluidContainer/FluidContainer.template'

import { Group, Menu, Stack } from '@mantine/core'
import { useToggle } from '@mantine/hooks'

// import shirtSrc from 'common/assets/images/shirt.png'
import styles from './styles.module.scss'

let mouseLeaveTimeout: ReturnType<typeof setTimeout> | undefined

const CatalogBanner = () => {
  const [shirtAnimToggled, toggleShirtAnim] = useToggle([false, true]),
    { toggleTimedCallback } = useTimedCallback({
      timeoutMS: 4000,
      onStartWait: toggleShirtAnim,
      callback: toggleShirtAnim,
      gate: shirtAnimToggled,
    }),
    mouseMoveRef = useRef({ ...defaultMouseMoveRef })

  // cleanup in case of unmoutn after mouse leave shirt
  useEffect(() => () => mouseLeaveTimeout && clearTimeout(mouseLeaveTimeout), [])

  return (
    <FluidContainer className={styles.catalogBanner}>
      <Group className={styles.contentWrapper}>
        <Menu opened>
          <Menu.Dropdown className={styles.navigation}>
            <SubNavItems
              subNav={mainNav[1].subNav!}
              ItemComponent={Menu.Item}
              SubtitleComponent={Menu.Label}
              GroupComponent={GroupComponentRendered}
            />
          </Menu.Dropdown>
        </Menu>
        <Stack className={styles.content}>
          <h1>Random Deals</h1>
          {Array(6)
            .fill('AI')
            .map((t, i) => (
              <p key={i}>{t}</p>
            ))}
        </Stack>
      </Group>
      <div
        className={styles.shirtClickRotator}
        data-toggled={shirtAnimToggled}
        onClick={() => toggleTimedCallback()}
        onTouchMove={(e) => {
          if (mouseLeaveTimeout) clearTimeout(mouseLeaveTimeout)

          if (e.currentTarget.getAttribute('data-toggled') === 'true') return

          if (e.touches[0].pageX < mouseMoveRef.current.oldX)
            mouseMoveRef.current.direction = 'left'
          else if (e.touches[0].pageX > mouseMoveRef.current.oldX)
            mouseMoveRef.current.direction = 'right'

          mouseMoveRef.current.oldX = e.touches[0].pageX

          mouseMoveRef.current.rotateBy =
            mouseMoveRef.current.direction === 'left'
              ? mouseMoveRef.current.rotateBy + mouseMoveRef.current.oldX
              : mouseMoveRef.current.rotateBy - mouseMoveRef.current.oldX

          e.currentTarget.setAttribute(
            'style',
            `transform: rotate(${Math.round(mouseMoveRef.current.rotateBy / 360)}deg);`
          )
        }}
        onTouchEnd={(e) => {
          const elem = e.currentTarget
          let dir = mouseMoveRef.current.direction

          const moveByHalf = () => {
            mouseLeaveTimeout = setTimeout(() => {
              const rotateBy = mouseMoveRef.current.rotateBy / 360

              if (Math.abs(rotateBy) <= 2) {
                elem.removeAttribute('style')
                mouseMoveRef.current = { ...defaultMouseMoveRef }
                return
              }

              mouseMoveRef.current.rotateBy /= 2

              const rounded = Math.round(rotateBy)

              elem.setAttribute(
                'style',
                `transform: rotate(${dir === 'left' ? '-' : ''}${Math.abs(rounded)}deg);`
              )

              dir = dir === 'left' ? 'right' : 'left'

              moveByHalf()
            }, 300)
          }

          moveByHalf()
        }}
        onMouseMove={(e) => {
          if (mouseLeaveTimeout) clearTimeout(mouseLeaveTimeout)

          if (e.currentTarget.getAttribute('data-toggled') === 'true') return

          if (e.pageX < mouseMoveRef.current.oldX) mouseMoveRef.current.direction = 'left'
          else if (e.pageX > mouseMoveRef.current.oldX) mouseMoveRef.current.direction = 'right'

          mouseMoveRef.current.oldX = e.pageX

          mouseMoveRef.current.rotateBy =
            mouseMoveRef.current.direction === 'left'
              ? mouseMoveRef.current.rotateBy + mouseMoveRef.current.oldX
              : mouseMoveRef.current.rotateBy - mouseMoveRef.current.oldX

          e.currentTarget.setAttribute(
            'style',
            `transform: rotate(${Math.round(mouseMoveRef.current.rotateBy / 360 / 5)}deg);`
          )
        }}
        onMouseLeave={(e) => {
          const elem = e.currentTarget
          let dir = mouseMoveRef.current.direction

          const moveByHalf = () => {
            mouseLeaveTimeout = setTimeout(() => {
              const rotateBy = mouseMoveRef.current.rotateBy / 360 / 5

              if (Math.abs(rotateBy) <= 2) {
                elem.removeAttribute('style')
                mouseMoveRef.current = { ...defaultMouseMoveRef }
                return
              }

              mouseMoveRef.current.rotateBy /= 2

              const rounded = Math.round(rotateBy)

              elem.setAttribute(
                'style',
                `transform: rotate(${dir === 'left' ? '-' : ''}${Math.abs(rounded)}deg);`
              )

              dir = dir === 'left' ? 'right' : 'left'

              moveByHalf()
            }, 300)
          }

          moveByHalf()
        }}
      >
        <div className={styles.shirtRotator}>
          <Image
            src="/assets/images/shirt.png"
            alt="shirt"
            className={styles.shirt}
            draggable="false"
            width={606}
            height={1178}
          />
        </div>
      </div>
    </FluidContainer>
  )
}

export default CatalogBanner

const defaultMouseMoveRef = { oldX: 0, direction: '', rotateBy: 0 },
  GroupComponentRendered = ({ children }: { children: ReactNode }) => (
    <div className={styles.groupOfNavItems}>{children}</div>
  )
