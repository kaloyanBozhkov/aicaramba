import { type ReactElement, useMemo } from 'react'

import Image from 'next/image'
import { useModal } from 'stores/Modal.store'

import useDesktopCheck from 'hooks/styles/useDesktopCheck'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import Magnifier from 'components/molecules/Magnifier/Magnifier'

import { Group } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const CornerZoom = ({
  className,
  zoomTitle,
  isAbsolute = false,
  children,
}: {
  className?: string
  zoomTitle: string
  isAbsolute?: boolean
  children: ReactElement
}) => {
  const isDesktop = useDesktopCheck(),
    modal = useMemo(
      () => (
        <div className={styles.zoomInContainer}>
          <Magnifier zoomLevel={2}>{children}</Magnifier>
          <p className={styles.hint}>Hint: Interact with the image to inspet details..</p>
        </div>
      ),
      [children]
    ),
    openModal = useModal(({ controls: { openModal } }) => openModal)

  return (
    <div className={styles.buttonWrapper} data-desktop={isDesktop} data-is-absolute={isAbsolute}>
      {isDesktop ? (
        <button
          className={extendClassNameProp(styles.cornerZoom, className)}
          onClick={() =>
            openModal({
              title: zoomTitle,
              className: styles.modal,
              children: modal,
            })
          }
        >
          <Group spacing="xs">
            <Image
              src="/assets/icons/zoom-in.svg"
              height={20}
              width={20}
              alt="magnifying glass icon"
            />
            Zoom
          </Group>
        </button>
      ) : (
        <ActionButton
          onClick={() =>
            openModal({
              title: zoomTitle,
              className: styles.modal,
              children: modal,
            })
          }
          modifier="circularIconBtn"
          label={
            <Image
              src="/assets/icons/zoom-in.svg"
              height={20}
              width={20}
              alt="magnifying glass icon"
            />
          }
        />
      )}
    </div>
  )
}

export default CornerZoom
