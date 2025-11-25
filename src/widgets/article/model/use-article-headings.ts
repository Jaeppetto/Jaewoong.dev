import { useEffect, useState } from 'react'

export interface ArticleHeading {
  id: string
  text: string
  level: number
}

export const useArticleHeadings = (containerSelector: string = 'article') => {
  const [headings, setHeadings] = useState<ArticleHeading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const updateHeadings = () => {
      const container = document.querySelector(containerSelector)
      if (!container) return

      const headingElements = container.querySelectorAll('h1, h2, h3')
      const extractedHeadings: ArticleHeading[] = Array.from(
        headingElements
      ).map(heading => ({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      }))

      setHeadings(extractedHeadings)
    }

    updateHeadings()

    const observer = new MutationObserver(() => {
      updateHeadings()
    })

    const container = document.querySelector(containerSelector)
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
        characterData: true
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [containerSelector])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const intersectingEntries = entries.filter(entry => entry.isIntersecting)

        if (intersectingEntries.length === 0) return

        const topMostEntry = intersectingEntries.reduce((prev, current) => {
          return current.boundingClientRect.top < prev.boundingClientRect.top
            ? current
            : prev
        })

        if (topMostEntry && topMostEntry.target.id) {
          setActiveId(topMostEntry.target.id)
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: [0, 1]
      }
    )

    headings.forEach(heading => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  return { headings, activeId }
}
