import React from 'react'

import { trcpCaller } from 'server/trpc/routers/_app'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import { type IProductProps } from 'classes/Product'
import type Product from 'classes/Product'

import useSetupProducts from 'hooks/data/useSetupProducts'

import FancyTitle from 'components/atoms/FancyTitle/FancyTitle.atom'
import MainIcons from 'components/atoms/MainIcons/MainIcons.atom'

import PageHeader from 'components/molecules/PageHeader/PageHeader.molecule'

import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'
import ProductCollection from 'components/organisms/ProductCollection/ProductCollection.organism'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

import { Group } from '@mantine/core'

export default function FreshArtworks({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const p = useSetupProducts(products)

  return (
    <>
      <Head>
        <title>AI Caramba | Fresh Artworks</title>
        <meta name="description" content="Freshy created AI Generated T-Shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack>
        <PageHeader
          title={
            <Group style={{ marginBottom: '1rem' }} noWrap align="center">
              <MainIcons icon="NEW" style={{ width: '6rem', height: '5rem' }} />
              <FancyTitle title="NEW" subtitle="Fresh Artworks!" />
            </Group>
          }
          background="NEW"
        />
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}
        >
          <ProductCollection
            title="Fresh Artworks"
            subtitle="Fresh out of the AI factory 🎉"
            products={p as Product[]}
          />
        </CappedContainerTemplate>
      </PageStack>
      <ProductAddDrawer />
    </>
  )
}

type FreshProps = {
  products: IProductProps[]
}

export const getServerSideProps: GetServerSideProps<FreshProps> = async () => {
  const caller = await trcpCaller(),
    newDeals = await caller.catalog.freshArtworks()

  return {
    props: {
      products: newDeals,
    },
  }
}
