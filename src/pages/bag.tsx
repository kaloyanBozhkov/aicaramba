import Head from 'next/head'

import { useCart } from 'stores/Cart.store'

import ProductSummaryCard from 'components/molecules/ProductSummaryCard/ProductSummaryCard.molecule'
import Table from 'components/molecules/Table/Table.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

export default function Bag() {
  const cartProducts = useCart((cart) => Object.values(cart.products))

  return (
    <>
      <Head>
        <title>AI Caramba | Your Bag</title>
        <meta name="description" content="Your AI Caramba shopping bag" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack>
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}
        >
          <h2 style={{ fontWeight: 600 }}>Shopping Bag</h2>

          {/* <Table header={['Artwork', 'Subtotal']}>
            {cartProducts.map((p) => (
              <tr key={p.id}>
                <td data-title="Artwork">
                  <ProductSummaryCard {...p} />
                </td>
              </tr>
            ))}
          </Table> */}
        </CappedContainerTemplate>
      </PageStack>
    </>
  )
}
