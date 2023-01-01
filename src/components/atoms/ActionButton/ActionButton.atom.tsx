import { ReactNode } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

type ActionButtonProps = {
  label?: string | ReactNode
  className?: string
  modifier?: string | 'naked' | 'primary' | 'secondary' | 'circularIconBtn' | 'subtle'
  onClick?: () => void
  rightIcon?: IconProp
  leftIcon?: IconProp
  withShadow?: boolean
}

const ActionButton = ({
  label,
  onClick,
  className,
  modifier,
  rightIcon,
  leftIcon,
  withShadow,
  ...props
}: ActionButtonProps) => (
  <Button
    variant="filled"
    color="primary"
    className={extendClassNameProp(styles.actionButton, className)}
    onClick={onClick}
    data-modifier={modifier}
    data-shadow={withShadow}
    rightIcon={rightIcon && <FontAwesomeIcon icon={rightIcon} />}
    leftIcon={leftIcon && <FontAwesomeIcon icon={leftIcon} />}
    {...props}
  >
    {typeof label === 'string' && <p>{label}</p>}
    {typeof label !== 'string' && label}
  </Button>
)

export default ActionButton
