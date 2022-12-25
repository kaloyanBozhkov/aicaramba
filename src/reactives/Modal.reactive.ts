import { ReactElement } from 'react'

import { makeVar } from '@apollo/client'

type ModalProps = {
  title?: string
  children?: ReactElement
  onClose: () => void
  opened: boolean
  className?: string
}

export const modalVar = makeVar<ModalProps>({
  opened: false,
  onClose: () => undefined,
})
