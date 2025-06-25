import { useEffect, useState } from 'react'

interface UseScrollPositionOptions {
  threshold?: number
}

export const useScrollPosition = (options: UseScrollPositionOptions = {}) => {
  const { threshold = 100 } = options
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      let currentScrollY = 0

      const scrollArea = document.querySelector(
        '[data-radix-scroll-area-viewport]'
      )
      if (scrollArea) {
        currentScrollY = scrollArea.scrollTop
      } else {
        currentScrollY = window.scrollY
      }

      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > threshold)
    }

    const scrollArea = document.querySelector(
      '[data-radix-scroll-area-viewport]'
    )
    if (scrollArea) {
      scrollArea.addEventListener('scroll', handleScroll, { passive: true })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return {
    scrollY,
    isScrolled
  }
}
