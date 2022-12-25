import { useMemo, useRef, useState } from 'react'

import { useReactiveVar } from '@apollo/client'

import { trcpCaller } from 'server/routers/_app'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'

import { cartVar } from 'reactives/Cart.reactive'

import { IProductProps } from 'classes/Product'
import Product from 'classes/Product'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'
import MessageContent from 'components/atoms/MessageContent/MessageContent.atom'
import TextWritten from 'components/atoms/TextWritten/TextWritten.atom'

import ProductColorSelector from 'components/molecules/ProductColorSelector/ProductColorSelector.molecule'
import ProductInfo from 'components/molecules/ProductInfo/ProductInfo.molecule'
import ProductPreview from 'components/molecules/ProductPreview/ProductPreview.molecule'
import ProductSize from 'components/molecules/ProductSize/ProductSize.molecule'
import Share from 'components/molecules/Share/Share.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import PageStack from 'components/templates/PageStack/PageStack.template'
import ProductTemplate from 'components/templates/Product/Product.template'

import { faCircleXmark, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {
  faBagShopping,
  faFeatherPointed,
  faPaintBrush,
  faQrcode,
  faShirt,
  faTruck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Accordion, Divider, Group, Space, Stack } from '@mantine/core'
import { Color, Currency, ProductStatus, Size } from '@prisma/client'

const compareConfig = (o: Record<string, string>, o2: Record<string, string>) => {
  const changed = Object.keys(o).filter((key) => o[key] !== o2[key])
  return !!changed.length
}

export default function Artwork({
  product: p,
  isAvailable,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const product = new Product(p),
    cart = useReactiveVar(cartVar),
    isPending = cart.pending.includes(product.id),
    inCart = cart.products[product.id],
    [color, setColor] = useState<Color>(Color.BLACK),
    [size, setSize] = useState<Size>(Size.L),
    changedConfig = useMemo(() => {
      if (!inCart) return false
      return compareConfig({ size: inCart.size, color: inCart.color }, { size, color })
    }, [inCart, size, color]),
    canRemove = inCart && !changedConfig,
    action = useRef(''),
    parentSettingsRef = useRef(null),
    childSettingsRef = useRef(null)

  // @TODO add removing or updating text if needed
  if (isPending) action.current = 'ADDING TO BAG'
  else if (inCart && changedConfig) action.current = 'UPDATE DETAILS'
  else if (inCart) action.current = 'REMOVE FROM BAG'
  else action.current = 'ADD TO BAG'

  const subToUpdatesBtn = (
    <ActionButton
      withShadow
      label="SUBSCRIBE TO UPDATES"
      modifier="secondary"
      leftIcon={faEnvelope}
      onClick={console.warn}
    />
  )

  return (
    <>
      <Head>
        <title>AI Caramba | #{p.id}</title>
        <meta name="description" content={`AI Generated T-Shirt ${p.id}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageStack>
        <CappedContainerTemplate withWrapper>
          <ProductTemplate
            leftSide={<ProductPreview imgSrc={product.imgSrc} zoomTitle={product.name} />}
            rightSide={
              <>
                <ProductInfo
                  uppercase
                  layoutVariant="primary"
                  textVariant="primary"
                  style={product.style}
                  colorScheme={product.colorScheme}
                  status={product.status}
                  name={product.name}
                  price={product.price}
                  currency={product.currency}
                />
                {isAvailable ? (
                  <>
                    <ProductColorSelector
                      onColorSelected={setColor}
                      activeColor={inCart?.color || color}
                    />
                    <ProductSize
                      pending={isPending}
                      variant="row"
                      selected={inCart?.size || size}
                      onSizeSelected={(s) => {
                        if (s === size) return
                        setSize(s)
                      }}
                    />
                    <Stack
                      style={{
                        gap: '2rem',
                        marginTop: '1.6rem',
                        marginBottom: '1.6rem',
                      }}
                    >
                      <ActionButton
                        withShadow
                        label={action.current}
                        modifier={canRemove ? 'secondary' : 'primary'}
                        leftIcon={canRemove ? faCircleXmark : isPending ? undefined : faBagShopping}
                        onClick={() => {
                          if (canRemove) {
                            cart.remove(product.id)
                            return
                          }

                          if (inCart) {
                            cart.update(product.id, { size, color })
                            return
                          }

                          cart.add(product.id, size, color)
                        }}
                        data-fixed-mobile="bottom"
                        data-fixed-tabletsmall="bottom"
                      />
                      <Space h="lg" />
                      {subToUpdatesBtn}
                    </Stack>
                  </>
                ) : (
                  subToUpdatesBtn
                )}
                {isAvailable ? (
                  <MessageContent>
                    <Group>
                      <FontAwesomeIcon icon={faTruck} /> <p>Free Standard delivery over €80</p>
                    </Group>
                  </MessageContent>
                ) : (
                  <p>
                    Click to show what happened with produt (who bought it or if it wa sdeleted)
                  </p>
                )}
                <Divider my="sm" />
                <Accordion multiple defaultValue={['FEATURES']}>
                  <Accordion.Item value="FEATURES">
                    <Accordion.Control>
                      <b>FEATURES</b>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <ul data-svg="true">
                        <li>
                          <FontAwesomeIcon icon={faShirt} />
                          One of a kind, only one will ever exist
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faPaintBrush} /> Extremely high quality & durable
                          print of the unique artwork
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faQrcode} />
                          Label with <b>QR Code</b> on the inner left side of the shirt. When
                          scanned it will unlock the digital version of the purchased image and
                          ownership will be under your account, alongside additional features
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faFeatherPointed} /> Soft and lightweight
                        </li>
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                  <Accordion.Item value="DESCRIPTION">
                    <Accordion.Control>
                      <b>DESCRIPTION</b>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <h3>
                        Truly Unique
                        <TextWritten
                          label="AI Caramba"
                          fontWeight="bold"
                          fontSize="2.5rem"
                          marginLeft="1rem"
                          marginRight="1rem"
                        />
                        T-Shirt
                      </h3>
                      <p>
                        One of a kind shirt, of super high quality and with an extremely memorable
                        and unique print.
                        <br /> <br />
                        Soft, comfortable, durable and extremely cool, this T-Shirt will likely be
                        drawing great attention for a long period of time.
                        <br /> <br />
                      </p>
                      <ul>
                        <li>Item Desc 1</li>
                        <li>Item Desc 2: e.g. Round neckline with elastic detailing</li>
                        <li>AI-Caramba logo at the bottom left side </li>
                        <li>100% Cotton</li>
                        <li>Model is 185cm and wears size L</li>
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                  {isAvailable && (
                    <Accordion.Item value="DELIVERYANDRETURNS">
                      <Accordion.Control>
                        <b>DELIVERY & RETURNS</b>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <ul>
                          <li>Delivery info1</li>
                          <li>Link to list of delivery countries</li>
                        </ul>
                      </Accordion.Panel>
                    </Accordion.Item>
                  )}
                </Accordion>
                <Share />
              </>
            }
          />
        </CappedContainerTemplate>
      </PageStack>
    </>
  )
}

type ArtworkProps = {
  product: IProductProps
  isAvailable: boolean
}

type ArtworkParsedUrlQuery = {
  id: string
}

export const getServerSideProps: GetServerSideProps<ArtworkProps, ArtworkParsedUrlQuery> = async (
  context
) => {
  const notFound = {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  }

  if (!context.params || !context.params.id) return notFound

  const { id } = context.params,
    caller = await trcpCaller(),
    product = await caller.artwork.find({ id })

  // check if product exists
  if (!product) return notFound

  return {
    props: {
      product,
      isAvailable: ['NEW', 'FIRE'].includes(product.status),
    },
  }
}
