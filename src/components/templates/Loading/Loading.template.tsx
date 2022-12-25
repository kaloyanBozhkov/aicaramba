import Loading from 'components/molecules/Loading/Loading.molecule'

import { Container } from '@mantine/core'

import styles from './styles.module.scss'

const LoadingTemplate = ({ message }: { message?: string }) => (
  <Container className={styles.loadingWrapper}>
    <Loading modifier="generic" message={message} />
  </Container>
)

export default LoadingTemplate
