import { useRef } from 'react'

import { Chip, ChipGroupProps, LoadingOverlay } from '@mantine/core'

import { extendClassNameProp } from 'utils/utils.common'

import styles from './styles.module.scss'

const Chips = <T,>({
  items,
  selected,
  onSelected,
  onUnselected,
  pending,
  className,
  rounded = true,
  variant,
  ...props
}: {
  items: ReadonlyArray<T>
  selected?: T
  onSelected: (val: T) => void
  onUnselected?: () => void
  pending: boolean
  rounded?: boolean
  variant?: 'fill'
  className?: string
} & Partial<ChipGroupProps>) => {
  const lastClicked = useRef<T | null>(null)

  return (
    <Chip.Group
      className={extendClassNameProp(styles.chips, className)}
      position="center"
      {...props}
    >
      {items.map((val, idx) => {
        const isChecked = val === selected
        return (
          <Chip
            key={idx}
            className={styles.chip}
            variant="filled"
            color="dark"
            type="radio"
            checked={isChecked}
            data-rounded={rounded}
            data-variant={variant}
            onClick={() => {
              if (isChecked) {
                onUnselected?.()
                lastClicked.current = null
              } else {
                onSelected(val)
                lastClicked.current = val
              }
            }}
          >
            <>
              {pending && lastClicked.current === val && (
                <LoadingOverlay
                  style={rounded ? { borderRadius: '32px' } : {}}
                  visible={pending}
                  loaderProps={{ size: 'xs', variant: 'oval' }}
                  overlayOpacity={1}
                  overlayColor="#f1f3f5"
                />
              )}
              {val}
            </>
          </Chip>
        )
      })}
    </Chip.Group>
  )
}

export default Chips
