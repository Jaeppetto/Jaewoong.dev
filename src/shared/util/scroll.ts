const DEFAULT_SCROLL_OFFSET = 60

type ScrollIntoViewOptions = {
  offset?: number
  behavior?: ScrollBehavior
}

const SCROLL_REGEX = /(auto|scroll)/i

const getScrollContainer = (
  element: HTMLElement
): HTMLElement | Window | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const viewportParent = element.closest<HTMLElement>(
    '[data-radix-scroll-area-viewport]'
  )

  if (viewportParent) {
    return viewportParent
  }

  let current: HTMLElement | null = element.parentElement

  while (current) {
    const { overflowY, overflow } = window.getComputedStyle(current)

    if (
      (SCROLL_REGEX.test(overflowY) || SCROLL_REGEX.test(overflow)) &&
      current.scrollHeight > current.clientHeight
    ) {
      return current
    }

    current = current.parentElement
  }

  return window
}

export const scrollIntoViewWithOffset = (
  element: HTMLElement,
  {
    offset = DEFAULT_SCROLL_OFFSET,
    behavior = 'smooth'
  }: ScrollIntoViewOptions = {}
) => {
  if (typeof window === 'undefined' || !element) {
    return
  }

  const container = getScrollContainer(element) ?? window

  if (container instanceof Window) {
    const rect = element.getBoundingClientRect()
    const targetTop = rect.top + window.scrollY - offset

    window.scrollTo({
      top: targetTop < 0 ? 0 : targetTop,
      behavior
    })

    return
  }

  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()
  const targetTop =
    elementRect.top - containerRect.top + container.scrollTop - offset

  container.scrollTo({
    top: targetTop < 0 ? 0 : targetTop,
    behavior
  })
}

export { DEFAULT_SCROLL_OFFSET }
