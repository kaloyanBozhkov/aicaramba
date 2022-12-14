import type { ReactNode } from 'react'

import { Group, Stack } from '@mantine/core'

import styles from './styles.module.scss'

type IFancyTitle = {
  title: string
  subtitle: string
  titleIcon?: ReactNode
  iconOnRight?: boolean
  dimmer?: boolean
}

const FancyTitle = ({ title, subtitle, titleIcon, iconOnRight, dimmer }: IFancyTitle) => {
  const titleC = <h4>{title}</h4>

  return (
    <Stack
      className={styles.fancyTitle}
      justify="space-between"
      align="flex-start"
      spacing="xs"
      data-dimmer={dimmer || undefined}
    >
      {titleIcon ? (
        <Group
          spacing="xs"
          align="center"
          style={{ flexDirection: iconOnRight ? 'row-reverse' : 'row' }}
        >
          {titleIcon}
          {titleC}
        </Group>
      ) : (
        titleC
      )}
      <p>{subtitle}</p>
    </Stack>
  )
}

export default FancyTitle
