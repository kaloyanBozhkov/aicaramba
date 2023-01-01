import { useEffect } from 'react'

import { trcpCaller } from 'server/trpc/routers/_app'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import { useProducts } from 'stores/Products.store'

import { IProductProps } from 'classes/Product'

import AboutUs from 'components/organisms/AboutUs/AboutUs.organism'
import Banner from 'components/organisms/Banner/Banner.organism'
import InfoSectionWithCanvas from 'components/organisms/InfoSectionWithCanvas/InfoSectionWithCanvas.organism'
import ProductAddDrawer from 'components/organisms/ProductAddDrawer/ProductAddDrawer.organism'
import ProductCollection from 'components/organisms/ProductCollection/ProductCollection.organism'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'

import { ProductStatus } from '@prisma/client'

export default function Home({
  soldDeals,
  freshDeals,
  fireDeals,
  goneDeals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const addP = useProducts((s) => s.addP)

  useEffect(
    () => addP([...freshDeals, ...fireDeals, ...soldDeals, ...goneDeals]),
    [addP, soldDeals, freshDeals, fireDeals, goneDeals]
  )

  return (
    <>
      <Head>
        <title>AI Caramba</title>
        <meta name="description" content="Unique AI Generated T-Shirts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageStack>
        <Banner />
        <AboutUs />
        <InfoSectionWithCanvas
          imgSrc="/assets/images/artist-cat.png"
          zoomTitle="Robot cat proudly demonstrating its freshly finished painting, digital art"
          title="Fresh Artworks"
          status={ProductStatus.NEW}
          text={
            <>
              Our AI factory has <i>just</i> crafted these beauties. They will be around for 7 days
              before disappearing if unclaimed!
            </>
          }
        />
        <CappedContainerTemplate withWrapper>
          <ProductCollection
            title="Fresh Artworks"
            subtitle="Fresh out of the AI factory"
            goTo="/artworks/new"
            products={freshDeals}
          />
        </CappedContainerTemplate>
        <InfoSectionWithCanvas
          imgSrc="/assets/images/fire-cat.png"
          zoomTitle="a cat fighting a fierce bear in the middle of a forest on fire, cyberpunk digital art"
          title="Fire Artworks"
          status={ProductStatus.FIRE}
          text="Going fast! Either the price will have dropped so much that somebody calls
                dibs on them or they will dissappear forever if unclaimed :("
        />
        <CappedContainerTemplate withWrapper>
          <ProductCollection
            title="Fire Artworks"
            subtitle="AAH!! Time is running out!"
            goTo="/artworks/going"
            products={fireDeals}
          />
        </CappedContainerTemplate>
        <InfoSectionWithCanvas
          imgSrc="/assets/images/sold.png"
          zoomTitle="A unicorn driving a Lamborghini in outer space with the moon visible, digital art"
          title="Sold Artworks"
          status={ProductStatus.SOLD}
          text="These precious beauties have been claimed! The owner has an original and one
                of a kind high-quality T-Shirt with the artowrk print, as well as the rights
                to re-sell T-Shirts with prints of the image through our platform."
        />
        <CappedContainerTemplate withWrapper>
          <ProductCollection
            title="Sold Artworks"
            subtitle="These have been claimed by someone"
            goTo="/artworks/sold"
            products={soldDeals}
          />
        </CappedContainerTemplate>
        <InfoSectionWithCanvas
          imgSrc="/assets/images/missed-art.png"
          zoomTitle="A black hole sucking in a space nebula and a shirt, digital art"
          title="Missed Artworks"
          status={ProductStatus.GONE}
          text={
            <>
              These are gone forever. They disappeared because nobody claimed them in the 7 days
              that the artworks were available for. Not even the price drop made them worth calling
              dibs. Hopefully not many cool ones will be in here :(
            </>
          }
        />
        <CappedContainerTemplate withWrapper>
          <ProductCollection
            title="Missed Artworks"
            subtitle="Ai Caramba! These are forever gone :("
            goTo="/artworks/missed"
            products={goneDeals}
          />
        </CappedContainerTemplate>
      </PageStack>
      <ProductAddDrawer />
    </>
  )
}

type HomeProps = {
  fireDeals: IProductProps[]
  freshDeals: IProductProps[]
  goneDeals: IProductProps[]
  soldDeals: IProductProps[]
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
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
