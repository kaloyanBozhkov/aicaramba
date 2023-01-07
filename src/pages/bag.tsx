import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useCart } from 'stores/Cart.store'

import useCartProducts from 'hooks/data/selectors/useCartProducts'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'
import FancyTitle from 'components/atoms/FancyTitle/FancyTitle.atom'
import Price from 'components/atoms/Price/Price.atom'
import ShippingCost from 'components/atoms/ShippingCost/ShippingCost.atom'

import CartProductActions from 'components/molecules/CartProductActions/CartProductActions.molecule'
import CartTotal from 'components/molecules/CartTotal/CartTotal.molecule'
import PageHeader from 'components/molecules/PageHeader/PageHeader.molecule'
import ProductSummaryCard from 'components/molecules/ProductSummaryCard/ProductSummaryCard.molecule'
import Table from 'components/molecules/Table/Table.molecule'

import SuggestProducts from 'components/organisms/SuggestProducts/SuggestProducts'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Box, Container, Group, MediaQuery, Space, Stack, Text } from '@mantine/core'

export default function Bag() {
  const cartProducts = useCartProducts(),
    cartControls = useCart((cart) => cart.controls)

  let content = (
    <Container style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '2.4rem' }}>
        Come back here once you have added items to your bag.
      </p>
      <Link href="/catalog">
        <ActionButton withShadow label="CONTNINUE BROWSING" modifier="primary" />
      </Link>
    </Container>
  )

  if (cartProducts.length > 0) {
    const bottomContnet = (
      <>
        <ShippingCost />
        <Link href="/catalog" data-naked="true" data-full-width="true">
          <ActionButton withShadow label="CONTNINUE BROWSING" modifier="secondary" />
        </Link>
        <ActionButton withShadow label="CHECKOUT" modifier="primary" />
      </>
    )

    content = (
      <>
        <Table
          header={['ARTWORK', 'ORDER', 'SUBTOTAL']}
          tableProps={{ verticalSpacing: 'xl' }}
          mobileFlowWrap
        >
          {cartProducts.map(({ product: p, config }) => (
            <tr key={p.id}>
              <td data-title="ARTWORK">
                <Box style={{ whiteSpace: 'break-spaces' }}>
                  <ProductSummaryCard
                    withoutPrice
                    style={p.style}
                    colorScheme={p.colorScheme}
                    name={p.name}
                    price={p.price}
                    currency={p.currency}
                    status={p.status}
                    to={p.url}
                    imgSrc={p.imgSrc}
                  />
                </Box>
              </td>
              <td data-title="ORDER" style={{ flex: '1' }}>
                <CartProductActions
                  size={config.size}
                  color={config.color}
                  price={p.price}
                  currency={p.currency}
                />
              </td>
              <td data-title="SUBTOTAL" style={{ margin: 'auto' }}>
                <Stack justify="space-between" align="flex-start">
                  <Price price={p.price} currency={p.currency} />
                  <ActionButton
                    label="Remove"
                    rightFontAwesomeIcon={faClose}
                    modifier="subtle"
                    onClick={() => cartControls.remove(p.id)}
                    style={{ width: 'fit-content' }}
                  />
                </Stack>
              </td>
            </tr>
          ))}
        </Table>
        <CartTotal
          modifier="bigger"
          totalPrice={cartProducts.reduce((acc, { product: p }) => acc + p.price, 0)}
          currency={cartProducts[0].product.currency}
        />
        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Stack style={{ alignSelf: 'stretch', marginTop: '1.8rem' }} spacing="xl">
            {bottomContnet}
          </Stack>
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          <Stack
            style={{
              marginTop: '1.8rem',
              width: '45rem',
              alignSelf: 'flex-end',
            }}
            spacing="xl"
          >
            {bottomContnet}
          </Stack>
        </MediaQuery>
        <Space h="xl" mt={24} />
        <SuggestProducts
          quantity={4}
          getColumns={(n) => {
            if (n === 4) return 12
            if (n === 3) return 8
            if (n === 2) return 6
            if (n === 1) return 4
            return 12
          }}
        />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>AI Caramba | Your Bag</title>
        <meta name="description" content="Your shopping bag for AI Caramba artworks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack spacing={0}>
        <PageHeader
          title={
            <Group style={{ marginBottom: '1rem' }} spacing="xs" noWrap align="center">
              <Image
                src="/assets/icons/shopping-basket.svg"
                alt="shopping-basket icon"
                width={50}
                height={50}
                style={{
                  opacity: '0.8',
                  filter: 'invert(1)',
                }}
              />
              <FancyTitle
                title="YOUR BAG"
                subtitle={
                  cartProducts.length
                    ? `There ${cartProducts.length > 1 ? 'are' : 'is'}  ${
                        cartProducts.length
                      } article${cartProducts.length > 1 ? 's' : ''} currently in your bag`
                    : 'Curently empty'
                }
              />
            </Group>
          }
          background="SOLD"
        />

        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}
        >
          {content}
        </CappedContainerTemplate>
      </PageStack>
    </>
  )
}
