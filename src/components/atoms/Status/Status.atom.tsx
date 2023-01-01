import { Icon } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { ProductStatus } from '@prisma/client'

import { extendClassNameProp } from 'utils/utils.common'

import MainIcons from '../MainIcons/MainIcons.atom'

import styles from './styles.module.scss'

type StatysProps = {
  className?: string
  icon?: Icon | ProductStatus
  label?: string
  variant?: 'normal' | 'red' | 'no-text-format'
  status?: ProductStatus
}

const Status = ({ className, icon, label, variant, status }: StatysProps) => {
  let iconComponent = null,
    l = label,
    v = variant

  if (status) {
    iconComponent = <MainIcons icon={status} />
    l = statuses[status].label
    v = statuses[status].variant
  } else if (icon && typeof icon !== 'string') iconComponent = <FontAwesomeIcon icon={icon} />
  else if (icon && statuses[icon]) iconComponent = <MainIcons icon={icon} />

  return (
    <Group className={extendClassNameProp(styles.status, className)} data-variant={v}>
      {iconComponent} {l && <p>{l}</p>}
    </Group>
  )
}

export default Status

export type StatusProps = Parameters<typeof Status>[0]

const statuses: Record<ProductStatus, StatusProps> = {
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
