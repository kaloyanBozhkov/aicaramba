import { ReactNode, useMemo } from 'react'

import { useReactiveVar } from '@apollo/client'

import NavLink from 'next/link'

import { cartVar } from 'reactives/Cart.reactive'

import Product, { IProductProps } from 'classes/Product'

import ProductCard from 'components/organisms/ProductCard/ProductCard.organism'

import FluidContainer from 'components/templates/FluidContainer/FluidContainer.template'

import { Grid, Group } from '@mantine/core'

import styles from './styles.module.scss'

const ProductCollection = ({
  products,
  title,
  subtitle,
  goTo,
}: {
  products: IProductProps[]
  title: string
  subtitle?: string | ReactNode
  goTo?: string
}) => {
  const p = useMemo(() => products.map((p) => new Product(p)), [products]),
    cart = useReactiveVar(cartVar)

  return (
    <FluidContainer className={styles.productCollection}>
      <Group className={styles.heading}>
        <div>
          {typeof subtitle === 'string' && <h2>{subtitle}</h2>}
          <h1>{title}</h1>
          {subtitle && typeof subtitle !== 'string' && subtitle}
        </div>
        {goTo && (
          <NavLink href={goTo}>
            <p className={styles.viewAll}>View all</p>
          </NavLink>
        )}
      </Group>
      <Grid columns={12} gutter="md">
        {p.map((product, idx) => (
          <Grid.Col key={product.id + idx} xs={6} sm={6} md={4} lg={3} xl={3}>
            <ProductCard
              {...product}
              isPending={cart.pending.includes(product.id)}
              selectedSize={cart.products[product.id]?.size}
              onAddToCart={cart.add}
              onRemoveFromCart={cart.remove}
            />
          </Grid.Col>
        ))}
      </Grid>
    </FluidContainer>
  )
}

export default ProductCollection
