import type { ReactNode } from 'react'

import Link from 'next/link'

import ActionButton from 'components/atoms/ActionButton/ActionButton.atom'

import { faFaceFrown } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container } from '@mantine/core'

import styles from './styles.module.scss'

type IssueProps = { children: ReactNode; message?: never } | { message: string; children?: never }

const Issue = ({ children, message }: IssueProps) => {
  return (
    <Container className={styles.issueWrapper}>
      <FontAwesomeIcon icon={faFaceFrown} />
      <div>
        {children}
        {message && <h1>{message}</h1>}
      </div>
      <Link href="/">
        <ActionButton label="Go Back" />
      </Link>
    </Container>
  )
}

export default Issue
