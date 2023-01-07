import { type ReactNode, useMemo } from 'react'

import { trpcReact } from 'server/trpc/utils/trcpReact'

import type Product from 'classes/Product'

import useCartProducts from 'hooks/data/selectors/useCartProducts'
import useSetupProducts from 'hooks/data/useSetupProducts'

import Loading from 'components/molecules/Loading/Loading.molecule'

import { Center } from '@mantine/core'

import ProductCollection from '../ProductCollection/ProductCollection.organism'

import styles from './styles.module.scss'

const SuggestProducts = ({
  getColumns,
  isFixedPos,
  quantity = 2,
}: {
  getColumns: (n: number) => number
  isFixedPos?: boolean
  quantity?: number
}) => {
  const cartProducts = useCartProducts(),
    configs = useMemo(() => {
      const colorSchemes: string[] = [],
        styles: string[] = [],
        omitIds: string[] = []

      Object.values(cartProducts).forEach(({ product: { colorScheme, style, id } }) => {
        colorSchemes.push(colorScheme)
        styles.push(style)
        omitIds.push(id)
      })

      return {
        colorSchemes,
        styles,
        omitIds,
      }
    }, [cartProducts]),
    { data, error, isLoading } = trpcReact.search.suggestArtworks.useQuery({
      quantity,
      searchContent: configs,
    }),
    addedP = useSetupProducts(data) as Product[]

  let content: ReactNode

  if (isLoading) {
    content = <Loading />
  } else if (data) {
    content = addedP.length ? (
      <ProductCollection
        title={`You might also like${addedP.length > 1 ? ' these' : ''}..`}
        products={addedP}
        // show 2 items or 1 item based on returned data
        columns={getColumns(addedP.length)}
      />
    ) : null
  } else if (error) {
    content = 'oops..'
  }

  return addedP.length ? (
    <Center
      className={styles.suggestProducts}
      data-solo={addedP.length === 1 ? 'true' : undefined}
      data-fixed={isFixedPos}
    >
      {content}
    </Center>
  ) : null
}

export default SuggestProducts
