import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Group } from '@mantine/core'

import styles from './styles.module.scss'

const SocialFollowing = () => {
  return (
    <Group className={styles.socialFollowing}>
      <a href="https://www.facebook.com/ai.powered.clothing" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faSquareFacebook} />
      </a>
    </Group>
  )
}

export default SocialFollowing
