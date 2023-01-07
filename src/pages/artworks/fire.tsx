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

export default function FireArtworks({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const p = useSetupProducts(products)

  return (
    <>
      <Head>
        <title>AI Caramba | Fire Artworks</title>
        <meta
          name="description"
          content="AI Generated T-Shirts, grab them while they are still here!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack>
        <PageHeader
          title={
            <Group style={{ marginBottom: '1rem' }} noWrap align="center">
              <MainIcons icon="FIRE" style={{ width: '6rem', height: '5rem' }} />
              <FancyTitle title="FIRE" subtitle="Fire Artworks!" />
            </Group>
          }
          background="FIRE"
        />
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}
        >
          <ProductCollection
            title="Fire Artworks"
            subtitle="AAH!! Time is running out! 🔥"
            products={p as Product[]}
          />
        </CappedContainerTemplate>
      </PageStack>
      <ProductAddDrawer />
    </>
  )
}

type FireProps = {
  products: IProductProps[]
}

export const getServerSideProps: GetServerSideProps<FireProps> = async () => {
  const caller = await trcpCaller(),
    fireDeals = await caller.catalog.fireArtworks()

  return {
    props: {
      products: fireDeals,
    },
  }
}
