import React, { useEffect, useMemo, useState } from 'react'

import { trpcReact } from 'server/trpc/utils/trcpReact'

import Head from 'next/head'
import { useRouter } from 'next/router'

import Product from 'classes/Product'

import { groupProductsByStatus } from 'hooks/data/selectors/useCatalogProducts'
import useSetupProducts from 'hooks/data/useSetupProducts'

import FancyTitle from 'components/atoms/FancyTitle/FancyTitle.atom'

import Loading from 'components/molecules/Loading/Loading.molecule'
import PageHeader from 'components/molecules/PageHeader/PageHeader.molecule'
import SearchBar from 'components/molecules/SearchBar/SearchBar.molecule'

import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'
import ProductCollection from 'components/organisms/ProductCollection/ProductCollection.organism'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

import { Group, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'

export default function Search() {
  const router = useRouter(),
    [search, setSearch] = useState(''),
    [debounced] = useDebouncedValue(search, 300),
    { data, error, isLoading, refetch } = trpcReact.search.products.useQuery(
      {
        contains: debounced,
      },
      // do not fetch on mount, when nothing is searched yet
      { enabled: false }
    ),
    // used only on current page
    products = useMemo(() => {
      if (!data) return []
      return data.map((p) => new Product(p))
    }, [data])

  // add any searched products into store state & overwrite existing ones with latest data
  useSetupProducts(data)

  // filter products by status
  const { fire, sold, gone, new: fresh } = groupProductsByStatus(products),
    noMatches = !data?.length || error || !search || isLoading || search !== debounced

  // on search let's fetch our data
  useEffect(() => {
    if (debounced) refetch()
  }, [debounced, refetch])

  let content = <Text align="center">You have not searched for anything yet.</Text>

  if ((search && isLoading) || search !== debounced) {
    content = <Loading message="Searching.." modifier="main" />
  } else if (error) {
    content = (
      <Text align="center">Oops, there seems to have been an issue with your search 😢</Text>
    )
  } else if (search && !data?.length) {
    content = <Text align="center">Seems like nothing was found for your search 😥</Text>
  } else if (search && data && (fresh.length || fire.length || sold.length || gone.length)) {
    content = (
      <>
        {!!fresh.length && (
          <ProductCollection
            title="Fresh Artworks"
            subtitle="Fresh out of the AI factory 🎉"
            goTo="/artworks/new"
            products={fresh}
          />
        )}
        {!!fire.length && (
          <ProductCollection
            title="Fire Artworks"
            subtitle="AAH!! Time is running out! 🔥"
            goTo="/artworks/going"
            products={fire}
          />
        )}
        {!!sold.length && (
          <ProductCollection
            title="Missed Artworks"
            subtitle="Someone already claimed these 😎"
            goTo="/artworks/sold"
            products={sold}
          />
        )}
        {!!gone.length && (
          <ProductCollection
            title="Missed Artworks"
            subtitle="Ai Caramba! These are forever gone 💀"
            goTo="/artworks/missed"
            products={gone}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Head>
        <title>AI Caramba | Search</title>
        <meta name="description" content="Search AI generated Artworks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack style={noMatches ? { paddingBottom: '5rem' } : undefined}>
        <PageHeader
          title={
            <Group style={{ marginBottom: '1rem' }} noWrap align="center">
              <FancyTitle
                title="Search Engine"
                subtitle="The AI Caramba factory at your fingertips!"
              />
            </Group>
          }
          background="search"
        />
        <CappedContainerTemplate
          withWrapper
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}
        >
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
