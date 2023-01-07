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

export default function SoldArtworks({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const p = useSetupProducts(products)

  return (
    <>
      <Head>
        <title>AI Caramba | Gone Artworks</title>
        <meta
          name="description"
          content="Gone AI Generated T-Shirts, these have dissappeared into the void!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack>
        <PageHeader
          title={
            <Group style={{ marginBottom: '1rem' }} noWrap align="center">
              <MainIcons icon="GONE" style={{ width: '6rem', height: '5rem' }} />
              <FancyTitle title="GONE" subtitle="GONE Artworks!" />
            </Group>
          }
          background="GONE"
        />
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}
        >
          <ProductCollection
            title="Missed Artworks"
            subtitle="Ai Caramba! These are forever gone 💀"
            products={p as Product[]}
          />
        </CappedContainerTemplate>
      </PageStack>
      <ProductAddDrawer />
    </>
  )
}

type GoneProps = {
  products: IProductProps[]
}

export const getServerSideProps: GetServerSideProps<GoneProps> = async () => {
  const caller = await trcpCaller(),
    goneDelas = await caller.catalog.goneArtworks()

  return {
    props: {
      products: goneDelas,
    },
  }
}
