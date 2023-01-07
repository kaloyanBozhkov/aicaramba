import { ReactNode } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, ButtonProps } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

type ActionButtonProps = {
  label?: string | ReactNode
  className?: string
  modifier?: string | 'naked' | 'primary' | 'secondary' | 'circularIconBtn' | 'subtle'
  onClick?: () => void
  rightFontAwesomeIcon?: IconProp
  leftFontAwesomeIcon?: IconProp
  withShadow?: boolean
}

const ActionButton = ({
  label,
  onClick,
  className,
  modifier,
  rightFontAwesomeIcon,
  leftFontAwesomeIcon,
  withShadow,
  ...props
}: ActionButtonProps & Partial<ButtonProps>) => (
  <Button
    variant="filled"
    color="primary"
    className={extendClassNameProp(styles.actionButton, className)}
    onClick={onClick}
    data-modifier={modifier}
    data-shadow={withShadow}
    rightIcon={rightFontAwesomeIcon && <FontAwesomeIcon icon={rightFontAwesomeIcon} />}
    leftIcon={leftFontAwesomeIcon && <FontAwesomeIcon icon={leftFontAwesomeIcon} />}
    {...props}
  >
    {typeof label === 'string' && <p>{label}</p>}
    {typeof label !== 'string' && label}
  </Button>
)

export default ActionButton
