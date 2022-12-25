import { Icon } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { ProductStatus } from '@prisma/client'

import { extendClassNameProp } from 'utils/utils.common'

import MainIcons from '../MainIcons/MainIcons.atom'

import styles from './styles.module.scss'

const Status = ({
  icon,
  label,
  variant = 'normal',
  className,
}: {
  icon?: Icon | ProductStatus
  label: string
  variant?: 'normal' | 'red' | 'no-text-format'
  className?: string
}) => {
  let iconComponent = null

  if (icon && typeof icon === 'string' && Object.values(ProductStatus).includes(icon))
    iconComponent = <MainIcons icon={icon} />

  if (icon && typeof icon !== 'string') iconComponent = <FontAwesomeIcon icon={icon} />

  return (
    <Group className={extendClassNameProp(styles.status, className)} data-variant={variant}>
      {iconComponent} <p>{label}</p>
    </Group>
  )
}

export default Status

export type StatusProps = Parameters<typeof Status>[0]

export const Statuses: Record<ProductStatus, StatusProps> = {
  [ProductStatus.SOLD]: {
    icon: ProductStatus.SOLD,
    label: 'Sold',
    variant: 'normal',
  },
  [ProductStatus.GONE]: {
    icon: ProductStatus.GONE,
    label: 'Dissappeared',
    variant: 'normal',
  },
  [ProductStatus.NEW]: {
    icon: ProductStatus.NEW,
    label: 'New',
    variant: 'normal',
  },
  [ProductStatus.FIRE]: {
    icon: ProductStatus.FIRE,
    label: 'Going Fast',
    variant: 'red',
  },
}
