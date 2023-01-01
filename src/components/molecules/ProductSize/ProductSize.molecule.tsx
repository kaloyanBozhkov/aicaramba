import { useEffect, useMemo } from 'react'

import Image from 'next/image'

import { useModal } from 'stores/Modal.store'

import Chips from 'components/molecules/Chips/Chips.molecule'

import SizeGuide from 'components/organisms/SizeGuide/SizeGuide.organism'

import { Group, Loader, Stack } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { Size } from '@prisma/client'

import styles from './styles.module.scss'

export const sizes = Object.values(Size)

const ProductSize = ({
  selected,
  onSizeSelected,
  onAddAnimationEnded,
  pending,
  variant,
}: {
  selected?: Size
  pending: boolean
  onSizeSelected: (size: Size) => void
  onAddAnimationEnded?: () => void
  variant: 'row' | 'column'
}) => {
  const sizeGuide = useMemo(() => <SizeGuide />, []),
    openModal = useModal(({ controls: { openModal } }) => openModal),
    [justAdded, setJustAdded] = useToggle()

  // handle UI "Added" showing briefly
  useEffect(() => {
    let timeoutId: undefined | ReturnType<typeof setTimeout>

    if (selected && !pending && justAdded) {
      timeoutId = setTimeout(() => {
        setJustAdded(false)
        onAddAnimationEnded?.()
      }, 1000)
    }

    return () => timeoutId && clearTimeout(timeoutId)
  }, [selected, pending, setJustAdded, onAddAnimationEnded, justAdded])

  return (
    <Stack className={styles.productSize}>
      <Group noWrap align="flex-start" className={styles.heading}>
        <h2>SELECT SIZE</h2>
        <button
          onClick={() =>
            openModal({
              title: 'Size Guide',
              children: sizeGuide,
            })
          }
        >
          Size Guide
        </button>
      </Group>
      {variant === 'row' && (
        <Chips<Size>
          rounded={false}
          variant="fill"
          pending={pending}
          selected={selected}
          items={sizes}
          className={styles.sizes}
          onSelected={onSizeSelected}
        />
      )}
      {variant === 'column' && (
        <Stack className={styles.sizesC}>
          {sizes.map((size) => {
            const isSelected = selected === size,
              selectedIsPending = isSelected && pending

            return (
              <button
                disabled={(!isSelected && (pending || justAdded)) || undefined}
                key={size}
                onClick={() => {
                  if (pending) return
                  onSizeSelected(size)
                  setJustAdded(true)
                }}
                data-focused={
                  selectedIsPending || (isSelected && justAdded && !pending) || undefined
                }
              >
                <Group className={styles.size} position="apart">
                  <label>{size}</label>
                  <Group spacing="xs">
                    {isSelected && justAdded && !pending ? (
                      <p>Added</p>
                    ) : (
                      <>
                        <p>{selectedIsPending ? 'Adding' : 'Add to bag'}</p>
                        {selectedIsPending ? (
                          <Loader className={styles.svg} />
                        ) : (
                          <Image
                            src="/assets/icons/plus-circle.svg"
                            alt="add to bag icon"
                            width={16}
                            height={16}
                            className={styles.svg}
                          />
                        )}
                      </>
                    )}
                  </Group>
                </Group>
              </button>
            )
          })}
        </Stack>
      )}
    </Stack>
  )
}
export default ProductSize
