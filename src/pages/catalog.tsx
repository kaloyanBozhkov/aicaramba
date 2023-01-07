import React from 'react'

import { trcpCaller } from 'server/trpc/routers/_app'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import { IProductProps } from 'classes/Product'

import useGroupProductsByStatus from 'hooks/data/selectors/useCatalogProducts'
import useSetupProducts from 'hooks/data/useSetupProducts'

import CatalogBanner from 'components/organisms/CatalogBanner/CatalogBanner.organism'
import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'
import ProductCollection from 'components/organisms/ProductCollection/ProductCollection.organism'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

export default function Catalogue({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const p = useSetupProducts(products),
    { fresh, sold, gone, fire } = useGroupProductsByStatus(p)

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
            products={fresh}
          />
          <ProductCollection
            title="Fire Artworks"
            subtitle="AAH!! Time is running out! 🔥"
            goTo="/artworks/fire"
            products={fire}
          />
          <ProductCollection
            title="Sold Artworks"
            subtitle="Someone already claimed these 😎"
            goTo="/artworks/sold"
            products={sold}
          />
          <ProductCollection
            title="Missed Artworks"
            subtitle="Ai Caramba! These are forever gone 💀"
            goTo="/artworks/gone"
            products={gone}
          />
        </CappedContainerTemplate>
      </PageStack>
      <ProductAddDrawer />
    </>
  )
}

type CatalogProps = {
  products: IProductProps[]
}

export const getServerSideProps: GetServerSideProps<CatalogProps> = async () => {
  const caller = await trcpCaller(),
    { soldDeals, newDeals, goneDeals, fireDeals } = await caller.catalog.products()

  return {
    props: {
      products: [...soldDeals, ...newDeals, ...goneDeals, ...fireDeals],
    },
  }
}
