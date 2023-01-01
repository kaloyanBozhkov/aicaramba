import { ReactNode, useEffect, useState } from 'react'

import useClientVariable from 'hooks/client/useClientVariable'

import MainIcons from 'components/atoms/MainIcons/MainIcons.atom'
import Wave from 'components/atoms/Wave/Wave.atom'

import CanvasImageDisplay from 'components/molecules/CanvasImageDisplay/CanvasImageDisplay.molecule'
import RichText from 'components/molecules/RichText/RichText.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'

import { Container, Group } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { ProductStatus } from '@prisma/client'

import styles from './styles.module.scss'

const InfoSectionWithCanvas = ({
  imgSrc,
  title,
  text,
  status,
  zoomTitle,
}: {
  imgSrc: string
  title: string
  text: string | ReactNode
  status: ProductStatus
  zoomTitle: string
}) => {
  const [expanded, setExpanded] = useState(false),
    doc = useClientVariable(() => document),
    { ref, entry } = useIntersection({
      root: doc,
      threshold: 1,
    })

  useEffect(() => {
    if (entry?.isIntersecting && !expanded) setExpanded(true)
  }, [entry?.isIntersecting, expanded])

  return (
    <Container
      fluid
      ref={ref}
      className={styles.infoSectionWithCanvas}
      data-expanded={expanded}
      data-variant={status ? status.toLowerCase() : undefined}
    >
      <Wave position="top" />
      <CappedContainerTemplate withWrapper className={styles.content}>
        <Group className={styles.groupedContent}>
          <RichText
            alignment="left"
            title={title}
            topComponent={status && <MainIcons icon={status} />}
            className={styles.richText}
          >
            {text}
          </RichText>
          <div className={styles.canvasAnimate}>
            {/* <div className={styles.canvasPositioner}>
                            <div className={styles.canvasWrapper}>
                                <CanvasScene imgSrc={imgSrc} title={zoomTitle} />
                            </div>
                        </div> */}
            <CanvasImageDisplay imgSrc={imgSrc} zoomTitle={zoomTitle} status={status} />
          </div>
        </Group>
      </CappedContainerTemplate>
      <Wave position="bottom" />
    </Container>
  )
}
export default InfoSectionWithCanvas
