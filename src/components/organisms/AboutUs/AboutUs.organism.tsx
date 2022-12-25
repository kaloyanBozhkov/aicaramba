import TextWritten from 'components/atoms/TextWritten/TextWritten.atom'

import RichText from 'components/molecules/RichText/RichText.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'

import { Stack } from '@mantine/core'

import styles from './styles.module.scss'

const AboutUs = () => (
  <CappedContainerTemplate className={styles.aboutUs}>
    <RichText
      topComponent={
        <Stack className={styles.stack}>
          <TextWritten label="AI Caramba" fontSize="4rem" lineHeight="4rem" />
          <h2>what we do..</h2>
        </Stack>
      }
      variation="black"
      alignment="left"
      style={{ maxWidth: '80rem' }}
    >
      AI Caramba aims to provide <b>truly unique T-Shirts of the highest quality</b> to AI
      enthusiasts, captivating art lovers, collectionists or just high quality clothing fans.
      <br />
      <br />
      We guarantee that <b>there will always exist only one T-Shirt for any given artwork</b>, and
      it could be yours!
      <br />
      <br />
      We also plan on donating 1/10 of our profits into planting trees to reduce Humanity&apos;s
      carbon footprint.
    </RichText>
  </CappedContainerTemplate>
)

export default AboutUs
