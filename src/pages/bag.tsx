import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useCart } from 'stores/Cart.store'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'
import FancyTitle from 'components/atoms/FancyTitle/FancyTitle.atom'

import PageHeader from 'components/molecules/PageHeader/PageHeader.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

import { Container, Group } from '@mantine/core'

export default function Bag() {
  const cartProducts = useCart((cart) => Object.values(cart.products))

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
    content = <p>ok</p>

    /* <Table header={['Artwork', 'Subtotal']}>
            {cartProducts.map((p) => (
              <tr key={p.id}>
                <td data-title="Artwork">
                  <ProductSummaryCard {...p} />
                </td>
              </tr>
            ))}
          </Table> */
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
                width={40}
                height={40}
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
