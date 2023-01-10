import { trcpCaller } from 'server/trpc/routers/_app'

import { GetServerSideProps } from 'next'
import Head from 'next/head'
import type Stripe from 'stripe'

import { type IProductProps } from 'classes/Product'

import FancyTitle from 'components/atoms/FancyTitle/FancyTitle.atom'

import PageHeader from 'components/molecules/PageHeader/PageHeader.molecule'

import PageStack from 'components/templates/PageStack/PageStack.template'

import { faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'
import { type Currency } from '@prisma/client'

import { formatAmountFromStripe } from 'utils/stripe/stripeHelpers'
import { fetchGetJSON, getBaseUrl } from 'utils/utils.common'

export default function Result({
  products,
  address,
  customer,
  total,
  subtotal,
  shipping,
  currency,
}: OrderProps) {
  return (
    <>
      <Head>
        <title>AI Caramba</title>
        <meta name="description" content="Unique AI Generated T-Shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack>
        <PageHeader
          title={
            <Group style={{ marginBottom: '1rem' }} noWrap align="center">
              <FontAwesomeIcon icon={faMoneyBillWaveAlt} fontSize={40} />
              <FancyTitle title="Order" subtitle="Status: Successful" />
            </Group>
          }
          background="order"
        />
        <p>
          Suntotal {subtotal} {currency}
        </p>
        <p>
          Shipping ({shipping.displayName}) {shipping.total} {currency}
          {JSON.stringify(shipping.deliveryEstimates)}
        </p>
        <p>
          Total {total} {currency}
        </p>
        <p>Products</p>
        <ul>
          {products.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
        <p>Shopping address {JSON.stringify(address)}</p> <p>customer {customer.name}</p>
        <p>email {customer.email}</p>
      </PageStack>
    </>
  )
}

type OrderProps = {
  products: IProductProps[]
  total: number
  subtotal: number
  currency: Currency
  shipping: {
    total: number
    displayName: string
    deliveryEstimates: {
      min: number
      max: number
      unit: string
    } | null
  }
  address: Stripe.Customer['address']
  customer: {
    name: Stripe.Customer['name']
    email: Stripe.Customer['email']
  }
}

type OrderParsedUrlQuery = {
  sessionId: string
}

export const getServerSideProps: GetServerSideProps<OrderProps, OrderParsedUrlQuery> = async (
  context
) => {
  const caller = await trcpCaller(),
    sessionId = context.query.session_id,
    notFound = {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  if (!sessionId) return notFound

  try {
    const data = await fetchGetJSON(`${getBaseUrl()}/api/checkout_sessions/${sessionId}`),
      stripeProducts: { id: string; desc: string; img: string }[] = data.line_items.data.map(
        (l: Stripe.LineItem) => {
          const p = l.price?.product as Stripe.Product
          return p.metadata
        }
      ),
      pIds = stripeProducts.map((p) => p.id),
      products = await caller.search.getArtworks({ pIds }),
      deliveryEstimate = data.shipping_cost.shipping_rate
        .delivery_estimate as Stripe.ShippingRate['delivery_estimate']

    return {
      props: {
        products,
        address: data.customer_details.address as Stripe.Customer['address'],
        customer: {
          name: data.customer_details.name,
          email: data.customer_details.email,
        },
        total: formatAmountFromStripe(data.amount_total, data.currency),
        subtotal: formatAmountFromStripe(data.amount_subtotal, data.currency),
        shipping: {
          total: data.shipping_cost.amount_total,
          displayName: data.shipping_cost.shipping_rate.display_name,
          deliveryEstimates:
            deliveryEstimate && deliveryEstimate.maximum && deliveryEstimate.minimum
              ? {
                  min: deliveryEstimate.minimum.value,
                  max: deliveryEstimate.maximum.value,
                  unit: deliveryEstimate.minimum.unit,
                }
              : null,
        },
        currency: data.currency.toUpperCase(),
      },
    }
  } catch (err) {
    console.error(err)
    return notFound
  }
}
