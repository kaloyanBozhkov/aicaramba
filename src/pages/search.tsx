import React, { useState } from 'react'

import { trpcReact } from 'server/trpc/utils/trcpReact'

import Head from 'next/head'
import { useRouter } from 'next/router'

import Loading from 'components/molecules/Loading/Loading.molecule'
import SearchBar from 'components/molecules/SearchBar/SearchBar.molecule'

import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'
import ProductCollection from 'components/organisms/ProductCollection/ProductCollection.organism'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

import { Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'

export default function Search() {
  const router = useRouter(),
    [search, setSearch] = useState(''),
    [debounced] = useDebouncedValue(search, 300),
    { data, error, isLoading } = trpcReact.search.products.useQuery({
      contains: debounced || null,
    }),
    { freshDeals, soldDeals, goneDeals, fireDeals } = data ?? {},
    noMatches =
      !data ||
      (!freshDeals && !fireDeals && !soldDeals && !goneDeals) ||
      error ||
      !search ||
      isLoading ||
      search !== debounced

  let content = <Text align="center">You have not searched for anything yet.</Text>

  if (isLoading || search !== debounced) {
    content = <Loading message="Searching.." modifier="main" />
  } else if (error) {
    content = (
      <Text align="center">Oops, there seems to have been an issue with your search 😢</Text>
    )
  } else if (search && (!data || (!freshDeals && !fireDeals && !soldDeals && !goneDeals))) {
    content = <Text align="center">Seems like nothing was found for your search 😥</Text>
  } else if (search && data && (freshDeals || fireDeals || soldDeals || goneDeals)) {
    content = (
      <>
        {!!freshDeals?.length && (
          <ProductCollection
            title="Fresh Artworks"
            subtitle="Fresh out of the AI factory 🎉"
            goTo="/artworks/new"
            products={freshDeals}
          />
        )}
        {!!fireDeals?.length && (
          <ProductCollection
            title="Fire Artworks"
            subtitle="AAH!! Time is running out! 🔥"
            goTo="/artworks/going"
            products={fireDeals}
          />
        )}
        {!!soldDeals?.length && (
          <ProductCollection
            title="Missed Artworks"
            subtitle="Someone already claimed these 😎"
            goTo="/artworks/sold"
            products={soldDeals}
          />
        )}
        {!!goneDeals?.length && (
          <ProductCollection
            title="Missed Artworks"
            subtitle="Ai Caramba! These are forever gone 💀"
            goTo="/artworks/missed"
            products={goneDeals}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>AI Caramba | Search</title>
        <meta name="description" content="Search our AI Generated T-Shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack style={noMatches ? { paddingBottom: '5rem' } : undefined}>
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}
        >
          <h2>Search Engine</h2>
          <p>The AI Caramba factory is at your fingertips!</p>
          <SearchBar onSearch={setSearch} onClear={() => router.back()} />
        </CappedContainerTemplate>
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}
        >
          {content}
        </CappedContainerTemplate>
      </PageStack>
      <ProductAddDrawer />
    </>
  )
}
