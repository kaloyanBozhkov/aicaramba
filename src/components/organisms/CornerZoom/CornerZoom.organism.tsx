import { useMemo } from 'react'

import Image from 'next/image'

import useDesktopCheck from 'hooks/styles/useDesktopCheck'
import useModal from 'hooks/useModal'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import ImageMagnifier from 'components/molecules/ImageMagnifier/ImageMagnifier'

import { Group } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const CornerZoom = ({
  src,
  className,
  zoomTitle,
  isAbsolute = false,
}: {
  src: string
  className?: string
  zoomTitle: string
  isAbsolute?: boolean
}) => {
  const isDesktop = useDesktopCheck(),
    modal = useMemo(
      () => (
        <div className={styles.zoomInContainer}>
          <ImageMagnifier src={src} width={1000} height={1000} zoomLevel={2} />
          <p className={styles.hint}>Hint: Interact with the image to inspet details..</p>
        </div>
      ),
      [src]
    ),
    { openModal } = useModal({
      title: zoomTitle,
      className: styles.modal,
      children: modal,
    })

  return (
    <div className={styles.buttonWrapper} data-desktop={isDesktop} data-is-absolute={isAbsolute}>
      {isDesktop ? (
        <button className={extendClassNameProp(styles.cornerZoom, className)} onClick={openModal}>
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
          onClick={openModal}
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
