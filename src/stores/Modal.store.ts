import { ReactElement } from 'react'

import create from 'zustand'

interface IModalComponentProps {
  title?: string
  children?: ReactElement
  className?: string
}

interface IModalStore {
  modalProps: {
    title?: string
    children?: ReactElement
    opened: boolean
    className?: string
    onClose: () => void
  }
  // modal controls for handling modal
  controls: {
    closeModal: (onClose?: () => void) => void
    openModal: (props: IModalComponentProps, onOpen?: () => void) => void
    toggleModal: (props: IModalComponentProps, onClose?: () => void, onOpen?: () => void) => void
  }
}

export const useModal = create<IModalStore>((set) => ({
  modalProps: {
    opened: false,
    // mandatory onClose for mantine Modal
    onClose: () =>
      set((prev) => ({
        modalProps: {
          ...prev.modalProps,
          opened: false,
        },
      })),
  },
  controls: {
    closeModal: (onClose) => {
      set((prev) => ({
        modalProps: {
          ...prev.modalProps,
          opened: false,
        },
      }))

      onClose?.()
    },
    openModal: (props, onOpen) => {
      set((prev) => ({
        modalProps: {
          ...prev.modalProps,
          ...props,
          opened: true,
        },
      }))

      onOpen?.()
    },
    toggleModal: (props, onClose, onOpen) =>
      set((prev) => {
        const opened = !prev.modalProps.opened
        if (opened) onOpen?.()
        else onClose?.()

        return {
          modalProps: {
            ...prev.modalProps,
            ...props,
            opened,
          },
        }
      }),
  },
}))
