import { cn } from '@/shared/shadcn-ui/util'
import { ScrollArea } from '@/shared/shadcn-ui/ui/scroll-area'
import { scrollIntoViewWithOffset } from '@/shared/util'
import {
  useArticleHeadings,
  ArticleHeading
} from '../../model/use-article-headings'

interface FloatingIndexProps {
  className?: string
}

const FloatingIndex = ({ className }: FloatingIndexProps) => {
  const { headings, activeId } = useArticleHeadings()

  if (headings.length === 0) {
    return null
  }

  const handleHeadingClick = (headingId: string) => {
    const element = document.getElementById(headingId)
    if (!element) return

    scrollIntoViewWithOffset(element)

    const encodedHash = `#${encodeURIComponent(headingId)}`
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}${encodedHash}`
    )

    if ('focus' in element && typeof element.focus === 'function') {
      element.focus({ preventScroll: true })
    }
  }

  const getLevelClassName = (level: number) => {
    switch (level) {
      case 1:
        return 'pl-2'
      case 2:
        return 'pl-4'
      case 3:
        return 'pl-8'
      default:
        return 'pl-0'
    }
  }

  return (
    <aside
      className={cn(
        'sticky top-[6.2rem] hidden h-fit max-h-[calc(100vh-8rem)] p-[2rem] pr-0 pt-[1.4rem] xl:block',
        className
      )}>
      <nav className="h-full w-[18rem]">
        <h2 className="!text-body2 font-semibold text-slate-900 dark:text-slate-100">
          목차
        </h2>
        <ScrollArea className="h-[calc(100vh-40vh)] min-h-60">
          <ul className="space-y-2 pr-6">
            {headings.map((heading: ArticleHeading) => (
              <li
                key={heading.id}
                className={cn(
                  getLevelClassName(heading.level),
                  'rounded-[0.8rem] bg-white hover:bg-slate-50'
                )}>
                <button
                  onClick={() => handleHeadingClick(heading.id)}
                  className={cn(
                    'w-full truncate bg-transparent text-left !text-body3 transition-colors',
                    activeId === heading.id
                      ? 'font-semibold text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400'
                  )}>
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </nav>
    </aside>
  )
}

export default FloatingIndex
