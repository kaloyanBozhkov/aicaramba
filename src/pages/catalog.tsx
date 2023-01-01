import React, { useEffect } from 'react'

import { trcpCaller } from 'server/trpc/routers/_app'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import { useProducts } from 'stores/Products.store'

import { IProductProps } from 'classes/Product'

import CatalogBanner from 'components/organisms/CatalogBanner/CatalogBanner.organism'
import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'
import ProductCollection from 'components/organisms/ProductCollection/ProductCollection.organism'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

export default function Catalogue({
  freshDeals,
  goneDeals,
  fireDeals,
  soldDeals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const addP = useProducts((s) => s.addP)

  useEffect(
    () => addP([...freshDeals, ...fireDeals, ...soldDeals, ...goneDeals]),
    [addP, soldDeals, freshDeals, fireDeals, goneDeals]
  )

  return (
    <>
      <Head>
        <title>AI Caramba | Catalog</title>
        <meta name="description" content="Catalog of AI Generated T-Shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack>
        <CatalogBanner />
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}
        >
          <ProductCollection
            title="Fresh Artworks"
            subtitle="Fresh out of the AI factory 🎉"
            goTo="/artworks/new"
            products={freshDeals}
          />
          <ProductCollection
            title="Fire Artworks"
            subtitle="AAH!! Time is running out! 🔥"
            goTo="/artworks/going"
            products={fireDeals}
          />
          <ProductCollection
            title="Missed Artworks"
            subtitle="Someone already claimed these 😎"
            goTo="/artworks/sold"
            products={soldDeals}
          />
          <ProductCollection
            title="Missed Artworks"
            subtitle="Ai Caramba! These are forever gone 💀"
            goTo="/artworks/missed"
            products={goneDeals}
          />
        </CappedContainerTemplate>
      </PageStack>
      <ProductAddDrawer />
    </>
  )
}

type CatalogProps = {
  fireDeals: IProductProps[]
  freshDeals: IProductProps[]
  goneDeals: IProductProps[]
  soldDeals: IProductProps[]
}

export const getServerSideProps: GetServerSideProps<CatalogProps> = async () => {
  const caller = await trcpCaller(),
    { soldDeals, freshDeals, goneDeals, fireDeals } = await caller.home.products()

  return {
    props: {
      soldDeals: await soldDeals,
      freshDeals: await freshDeals,
      goneDeals: await goneDeals,
      fireDeals: await fireDeals,
    },
  }
}
