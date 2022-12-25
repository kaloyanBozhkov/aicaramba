import mainNav from 'routing/navLinks/mainNav'
import offNav from 'routing/navLinks/offNav'

import PaymentCard from 'components/atoms/PaymentCards/PaymentCards.atom'
import CreatorSignature from 'components/atoms/Signature/CreatorSignature.atom'
import TextWritten from 'components/atoms/TextWritten/TextWritten.atom'

import SocialFollowing from 'components/molecules/SocialFollowing/SocialFollowing.molecule'

import CappedContainerTemplate from 'components/templates/CappedContainer/CappedContainer.template'
import FluidContainer from 'components/templates/FluidContainer/FluidContainer.template'

import { Group, Stack } from '@mantine/core'

import renderNavlinks from 'utils/renderers/navLinks'

import styles from './styles.module.scss'

const Footer = () => (
  <div className={styles.footerFixed}>
    <div className={styles.spacing}></div>
    <div className={styles.footerWrapper}>
      <FluidContainer className={styles.footer}>
        <CappedContainerTemplate className={styles.content}>
          <Group className={styles.groupLinks}>
            <Stack>
              <h3>Quick links</h3>
              {renderNavlinks(mainNav)}
            </Stack>
            <Stack>
              <h3>Info</h3>
              {renderNavlinks(offNav)}
            </Stack>
            <Stack>
              <h3>Our mission</h3>
              <p>
                <TextWritten label="AI Caramba" fontSize="2rem" /> is all about uniqueness, truly
                <br />
                one-of-a-kind IRL &quot;NFTs&quot; in the form of <br /> extremely high quality
                clothing.. <br />
                the future is <i>amazing</i> !
              </p>
            </Stack>
          </Group>
          <Group className={styles.socialLinks}>
            <SocialFollowing />
          </Group>
        </CappedContainerTemplate>
      </FluidContainer>
      <Group className={styles.cards}>
        <PaymentCard card="visa" />
        <PaymentCard card="mastercard" />
        <PaymentCard card="paypal" />
        <PaymentCard card="discover" />
        <PaymentCard card="amex" />
        <PaymentCard card="diners" />
      </Group>
      <CreatorSignature style={{ marginBottom: '16px', textAlign: 'center' }} />
    </div>
  </div>
)

export default Footer
