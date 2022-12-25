import { useRouter } from 'next/router'

import Issue from 'components/templates/Issue/Issue.template'

import { Center } from '@mantine/core'

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <Center>
      <Issue>
        <h1>
          Oops! Nothing was found under <b>{router.pathname}</b> :(
        </h1>
      </Issue>
    </Center>
  )
}

export default NotFoundPage
