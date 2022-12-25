import { RefObject, useEffect } from 'react'

import { headerScrollDir } from 'components/organisms/Header/config.constant'

import { useViewportSize } from '@mantine/hooks'

/**
 * @param  {ref} parentRef -> parent ref
 * @param  {ref} childRef -> child elem to translate Y based on scroll
 * @param  {number} margin -> any margin to add for when to stop scrollign the child in parent?
 */
const useTranslateDivWithScroll = ({
    parentRef,
    childRef,
    margin = 0,
    startTranslatingAt = 0,
    stopTranslatingAt = 0,
    stopAt = 575,
    withHeader = false,
  }: {
    parentRef: RefObject<HTMLElement>
    childRef: RefObject<HTMLElement>
    margin?: number
    startTranslatingAt?: number
    stopTranslatingAt?: number
    stopAt?: number
    withHeader?: boolean
  }) => {
    const { width: windowWidth } = useViewportSize()

    useEffect(() => {
      if (!childRef.current) return

      if (windowWidth > stopAt) {
        const handler = () =>
          handleScrollPosition(
            parentRef,
            childRef,
            margin,
            startTranslatingAt,
            stopTranslatingAt,
            withHeader
          )

        window.addEventListener('scroll', handler)
        window.addEventListener('load', handler)

        return () => {
          window.removeEventListener('scroll', handler)
          window.removeEventListener('load', handler)
        }
      }
      // eslint-disable-next-line no-param-reassign
      childRef.current.style.transform = ''
    }, [
      parentRef,
      childRef,
      margin,
      windowWidth,
      stopAt,
      startTranslatingAt,
      stopTranslatingAt,
      withHeader,
    ])
  },
  handleScrollPosition = (
    parentRef: RefObject<HTMLElement>,
    childRef: RefObject<HTMLElement>,
    margin: number,
    startTranslatingAt: number,
    stopTranslatingAt: number,
    withHeader: boolean
  ) => {
    if (!parentRef.current || !childRef.current) return

    const { top, bottom, height } = parentRef.current.getBoundingClientRect(),
      hasReachedBottom = +bottom - +childRef.current.offsetHeight < margin,
      newTop = hasReachedBottom
        ? +height - +childRef.current.offsetHeight - margin
        : top < 0
        ? Math.floor(Math.abs(top))
        : 0

    if (
      (!startTranslatingAt && !stopTranslatingAt) ||
      (startTranslatingAt && !stopTranslatingAt && window.scrollY > startTranslatingAt) ||
      (stopTranslatingAt && !startTranslatingAt && window.scrollY < stopTranslatingAt) ||
      (window.scrollY > startTranslatingAt && window.scrollY < stopTranslatingAt)
    ) {
      // eslint-disable-next-line no-param-reassign
      childRef.current.style.transform = `translateY(${
        newTop +
        (withHeader && headerScrollDir.current === 'up'
          ? headerScrollDir['header-desktop-h'] + 1
          : 0)
      }px)`
    }
  }

export default useTranslateDivWithScroll

/*
  // make sure to trigger the scroll event when the parent div size changes (becomes smaller for example), in order to update the child's position again!
  E.g. 
  useLayoutEffect(() => {
    window.scrollBy(0, 0)
  }, [destinations])
*/
