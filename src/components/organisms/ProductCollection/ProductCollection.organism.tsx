import { ReactNode, useMemo } from 'react'

import NavLink from 'next/link'

import { useCart } from 'stores/Cart.store'

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
    { add, remove } = useCart((cart) => cart.controls),
    cartPending = useCart((cart) => cart.pending),
    cartProducts = useCart((cart) => cart.products)

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
        {p.map((product, idx) => {
          const { imgSrc, name, id, url, price, currency, colorScheme, style, status } = product
          return (
            <Grid.Col key={product.id + idx} xs={6} sm={6} md={4} lg={3} xl={3}>
              <ProductCard
                price={price}
                colorScheme={colorScheme}
                style={style}
                currency={currency}
                status={status}
                name={name}
                imgSrc={imgSrc}
                url={url}
                id={id}
                isPending={cartPending.includes(product.id)}
                selectedSize={cartProducts[product.id]?.size}
                onAddToCart={add}
                onRemoveFromCart={remove}
              />
            </Grid.Col>
          )
        })}
      </Grid>
    </FluidContainer>
  )
}

export default ProductCollection
