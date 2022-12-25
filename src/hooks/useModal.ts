import { ReactElement, useEffect } from 'react'

import { modalVar } from 'reactives/Modal.reactive'

import { useToggle } from '@mantine/hooks'

const useModal = ({
  title,
  onClose,
  className,
  children,
}: {
  title: string
  onClose?: () => void
  children: ReactElement
  className?: string
}) => {
  const [opened, toggleModal] = useToggle([false, true])

  useEffect(() => {
    if (!opened) {
      const modalProps = modalVar()

      if (!modalProps.opened) return

      modalVar({
        ...modalProps,
        opened: false,
      })

      return
    }

    modalVar({
      opened,
      title,
      children,
      className,
      onClose: () => {
        toggleModal(false)
        onClose?.()
      },
    })

    return () => {
      const modalProps = modalVar()
      modalVar({
        ...modalProps,
        opened: false,
      })
    }
  }, [opened, onClose, toggleModal, children, title, className])

  return { openModal: () => toggleModal(true), toggleModal }
}

export default useModal
