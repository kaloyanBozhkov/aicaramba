import useClientVariable from 'hooks/client/useClientVariable'

import MessageContent from 'components/atoms/MessageContent/MessageContent.atom'

import { faFacebookF, faPinterestP, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faArrowUpFromBracket, faCheck, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Center, CopyButton, Group, Popover, Stack, UnstyledButton } from '@mantine/core'

import styles from './styles.module.scss'

const Share = () => {
  const w = useClientVariable(() => window),
    locHref = w?.location?.href ?? ''

  return (
    <Popover position="bottom" withArrow shadow="md">
      <Popover.Target>
        <UnstyledButton className={styles.shareBtn}>
          <Group>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <p>Share</p>
          </Group>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown className={styles.popover}>
        <MessageContent className={styles.wrapper}>
          <h3>SHARE VIA</h3>
          <Group>
            <CopyButton value={locHref} timeout={2000}>
              {({ copied, copy }) => (
                <Stack className={styles.bubble} onClick={copy}>
                  <Center className={styles.ball}>
                    {copied ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faLink} />
                    )}
                  </Center>
                  {copied ? <p>Copied</p> : <p>Copy</p>}
                </Stack>
              )}
            </CopyButton>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${locHref}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              data-naked="true"
            >
              <Stack className={styles.bubble}>
                <Center className={styles.ball}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </Center>
                {<p>Facebook</p>}
              </Stack>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${locHref}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              data-naked="true"
            >
              <Stack className={styles.bubble}>
                <Center className={styles.ball}>
                  <FontAwesomeIcon icon={faTwitter} />
                </Center>
                {<p>Twitter</p>}
              </Stack>
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${locHref}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Pinterest"
              data-naked="true"
            >
              <Stack className={styles.bubble}>
                <Center className={styles.ball}>
                  <FontAwesomeIcon icon={faPinterestP} />
                </Center>
                {<p>Pinterest</p>}
              </Stack>
            </a>
            <a
              href={`mailto:?body=${locHref}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Mail"
              data-naked="true"
            >
              <Stack className={styles.bubble}>
                <Center className={styles.ball}>
                  <FontAwesomeIcon icon={faEnvelope} />
                </Center>
                {<p>Mail</p>}
              </Stack>
            </a>
          </Group>
        </MessageContent>
      </Popover.Dropdown>
    </Popover>
  )
}

export default Share
