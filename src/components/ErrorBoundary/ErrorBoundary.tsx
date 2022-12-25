import { Component, ErrorInfo, ReactNode } from 'react'

import Issue from 'components/templates/Issue/Issue.template'

import { Center } from '@mantine/core'

type Props = {
  children: ReactNode
}

type State = {
  errorMsg: null | string
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    errorMsg: null,
  }

  // Update state so fallback UI will render
  public static getDerivedStateFromError = (error: Error): State => ({ errorMsg: error.message })

  // DOM has finished rendering fallback UI, report error info
  public static componentDidCatch = (error: Error, errorInfo: ErrorInfo): void =>
    console.error('Error Boundry caught:', error, errorInfo)

  public render(): ReactNode {
    const {
      state: { errorMsg },
      props: { children },
    } = this

    // Render either fallback UI for error or children if no errorMsg
    return errorMsg ? (
      <Center>
        <Issue
          message={
            process.env.NODE_ENV === 'development' ? errorMsg : 'Oops! Something went wrong :('
          }
        />
      </Center>
    ) : (
      children
    )
  }
}

export default ErrorBoundary
