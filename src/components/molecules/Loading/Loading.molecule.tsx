import { Center, Loader } from '@mantine/core'

import styles from './styles.module.scss'

export type LoadingProps = {
  message?: string
  modifier?: 'main' | 'generic'
  position?: 'center' | 'start' | 'end'
}

const Loading = ({
  message = 'Loading..',
  modifier = 'generic',
  position = 'center',
}: LoadingProps) => (
  <Center className={styles.loading} data-modifier={modifier} data-position={position}>
    <Loader className={styles.spinner} />
    {message && <p>{message}</p>}
  </Center>
)

export default Loading
