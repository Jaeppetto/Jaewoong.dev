import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  memo
} from 'react'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import remarkGfm from 'remark-gfm'
import type { ComponentPropsWithoutRef } from 'react'
import { MDXComponents } from 'mdx/types'
import {
  Highlight,
  HighlightProps
} from '../../../../entities/mdx/ui/Highlight/Highlight'
import FoldableCard, {
  FoldableCardProps
} from '../../../../entities/mdx/ui/FoldableCard/FoldableCard'
import { OptimizedImage } from '../../../../entities/mdx/ui/OptimizedImage'
import { InlineCode } from '../../../../entities/mdx/ui/InlineCode/InlineCode'
import { CodeBlock } from '../../../../entities/mdx/ui/CodeBlock/CodeBlock'
import { Checkbox } from '@/shared/shadcn-ui/ui/checkbox'
import { cn } from '@/shared/shadcn-ui/util'
import { scrollIntoViewWithOffset } from '@/shared/util'

interface MdxRendererProps {
  content: string
  debounceMs?: number
}

const mdxCache = new Map<string, React.ComponentType>()
const MAX_CACHE_SIZE = 50

const slugifyHeadingText = (value: string) => {
  const sanitized = value
    .trim()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

  return sanitized || 'heading'
}

const extractTextFromChildren = (children: React.ReactNode): string => {
  if (children === null || children === undefined) {
    return ''
  }

  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }

  if (React.isValidElement(children)) {
    return extractTextFromChildren(
      (children.props as { children: React.ReactNode }).children
    )
  }

  return ''
}

type MdastNode = {
  type?: string
  children?: MdastNode[]
  value?: string
  data?: {
    hProperties?: Record<string, unknown>
  }
}

const remarkHeadingIds = () => {
  return (tree: MdastNode) => {
    const slugCounts = new Map<string, number>()

    const getText = (node?: MdastNode): string => {
      if (!node) {
        return ''
      }

      if (typeof node.value === 'string') {
        return node.value
      }

      if (Array.isArray(node.children)) {
        return node.children.map(getText).join('')
      }

      return ''
    }

    const visitNode = (node?: MdastNode) => {
      if (!node) {
        return
      }

      if (node.type === 'heading') {
        const headingText = getText(node)
        const baseSlug = slugifyHeadingText(headingText || 'heading')
        const count = slugCounts.get(baseSlug) ?? 0
        slugCounts.set(baseSlug, count + 1)
        const slug = count === 0 ? baseSlug : `${baseSlug}-${count}`

        node.data = {
          ...(node.data || {}),
          hProperties: {
            ...(node.data?.hProperties || {}),
            id: node.data?.hProperties?.id ?? slug
          }
        }
      }

      node.children?.forEach(visitNode)
    }

    visitNode(tree)
  }
}

const cleanupCache = () => {
  if (mdxCache.size > MAX_CACHE_SIZE) {
    const entriesToDelete = mdxCache.size - MAX_CACHE_SIZE
    const keys = Array.from(mdxCache.keys())

    for (let i = 0; i < entriesToDelete; i++) {
      mdxCache.delete(keys[i])
    }
  }
}

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type StrongProps = ComponentPropsWithoutRef<'strong'>
type EmphasisProps = ComponentPropsWithoutRef<'em'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type ListProps = ComponentPropsWithoutRef<'ul' | 'ol'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type ImageProps = ComponentPropsWithoutRef<'img'>

const MdxRenderer = memo(({ content, debounceMs = 300 }: MdxRendererProps) => {
  const [Content, setContent] = useState<React.ComponentType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedContent, setDebouncedContent] = useState(content)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copyHeadingLink = useCallback(async (headingId: string) => {
    if (typeof window === 'undefined') {
      return
    }

    const { origin, pathname, search } = window.location
    const encodedHash = `#${encodeURIComponent(headingId)}`
    const url = `${origin}${pathname}${search}${encodedHash}`

    window.history.replaceState(null, '', `${pathname}${search}${encodedHash}`)

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url)
        return
      } catch (error) {
        console.error('Clipboard copy failed:', error)
      }
    }

    if (typeof document === 'undefined') {
      return
    }

    try {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    } catch (error) {
      console.error('Fallback copy failed:', error)
    }
  }, [])
  const createHeading = useCallback(
    (Tag: 'h1' | 'h2' | 'h3', baseClassName: string) => {
      const HeadingComponent = (props: HeadingProps) => {
        const { children, className, id, onClick, ...rest } = props
        const fallbackIdRef = useRef<string | undefined>(undefined)
        const headingElementRef = useRef<HTMLHeadingElement | null>(null)

        if (!fallbackIdRef.current) {
          const text = extractTextFromChildren(children)
          fallbackIdRef.current = text ? slugifyHeadingText(text) : undefined
        }

        const headingId = id || fallbackIdRef.current

        const handleClick = (event: React.MouseEvent<HTMLHeadingElement>) => {
          onClick?.(event)

          if (event.defaultPrevented || !headingId) {
            return
          }

          void copyHeadingLink(headingId)

          const target = headingElementRef.current

          if (target) {
            scrollIntoViewWithOffset(target)

            if ('focus' in target && typeof target.focus === 'function') {
              target.focus({ preventScroll: true })
            }
          }
        }

        return (
          <Tag
            {...rest}
            id={headingId}
            tabIndex={-1}
            title="헤더 링크 복사"
            ref={node => {
              headingElementRef.current = node
            }}
            className={cn(
              baseClassName,
              'cursor-pointer focus:outline-none',
              className
            )}
            onClick={handleClick}>
            {children}
          </Tag>
        )
      }

      HeadingComponent.displayName = `Heading${Tag.toUpperCase()}`

      return HeadingComponent
    },
    [copyHeadingLink]
  )

  const components = useMemo<MDXComponents>(
    () => ({
      h1: createHeading('h1', 'mt-16 mb-4 !text-h1 font-bold text-slate-900'),
      h2: createHeading('h2', 'mt-14 mb-3 !text-h2 font-semibold text-slate-900'),
      h3: createHeading('h3', 'mt-12 mb-2 !text-h3 font-semibold text-slate-900'),
      p: (props: ParagraphProps) => (
        <p
          className="my-8 !text-body2 text-slate-900"
          {...props}
        />
      ),
      a: (props: AnchorProps) => (
        <a
          className="!text-body2 font-bold text-slate-900 hover:text-slate-600 hover:underline"
          {...props}
        />
      ),
      strong: (props: StrongProps) => (
        <strong
          className="!text-body2 font-bold text-slate-900"
          {...props}
        />
      ),
      em: (props: EmphasisProps) => (
        <em
          className="!text-body2 italic text-slate-900"
          {...props}
        />
      ),
      blockquote: (props: BlockquoteProps) => (
        <blockquote
          className="border-l-4 border-slate-900 pl-4 !text-body2 font-bold italic text-slate-900"
          {...props}
        />
      ),
      ul: (props: ListProps) => (
        <ul
          className="my-2 list-inside list-disc !text-body2 text-slate-900"
          {...props}
        />
      ),
      ol: (props: ListProps) => (
        <ol
          className="my-2 list-inside list-decimal !text-body2 text-slate-900"
          {...props}
        />
      ),
      li: ({ className, ...rest }: ListItemProps) => {
        const hasCheckbox = className?.includes('task-list-item')

        return (
          <li
            className={cn(
              'my-2 !text-body2 text-slate-900',
              className,
              hasCheckbox && 'list-none'
            )}
            {...rest}
          />
        )
      },
      input: (props: ComponentPropsWithoutRef<'input'>) => {
        if (props.type === 'checkbox') {
          return (
            <Checkbox
              checked={props.checked}
              disabled={props.disabled}
              {...(props as ComponentPropsWithoutRef<'button'>)}
            />
          )
        }
        return <input {...props} />
      },
      code: (props: ComponentPropsWithoutRef<'code'>) => {
        const isInline = !props.className?.includes('language-')

        if (isInline) {
          return <InlineCode {...props} />
        }

        return <code {...props} />
      },
      pre: (props: ComponentPropsWithoutRef<'pre'>) => {
        const codeElement = props.children as {
          props?: { className?: string; children?: string }
        }
        const className = codeElement?.props?.className || ''
        const language = className.replace('language-', '') || 'text'

        return (
          <CodeBlock language={language}>
            {codeElement?.props?.children}
          </CodeBlock>
        )
      },
      img: (props: ImageProps) => {
        const { alt, ...restProps } = props

        return (
          <figure className="my-6">
            <OptimizedImage
              src={props.src || ''}
              alt={alt || ''}
              {...restProps}
            />
            {alt && (
              <figcaption className="mt-2 text-center !text-body3 text-slate-400">
                {alt}
              </figcaption>
            )}
          </figure>
        )
      },
      Highlight: (props: HighlightProps) => <Highlight {...props} />,
      FoldableCard: (props: FoldableCardProps) => <FoldableCard {...props} />,
      InlineCode: (props: ComponentPropsWithoutRef<'code'>) => (
        <InlineCode {...props} />
      ),
      CodeBlock: (props: { language?: string; children: React.ReactNode }) => (
        <CodeBlock {...props} />
      )
    }),
    [createHeading]
  )

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      setDebouncedContent(content)
    }, debounceMs)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [content, debounceMs])

  const compileMDX = useCallback(
    async (mdxContent: string) => {
      if (mdxCache.has(mdxContent)) {
        const cachedContent = mdxCache.get(mdxContent)!
        mdxCache.delete(mdxContent)
        mdxCache.set(mdxContent, cachedContent)
        return cachedContent
      }

      try {
        const { default: MDXContent } = await evaluate(mdxContent, {
          ...runtime,
          remarkPlugins: [remarkGfm, remarkHeadingIds],
          useMDXComponents: () => components
        })

        mdxCache.set(mdxContent, MDXContent)
        cleanupCache()
        return MDXContent
      } catch (error) {
        console.error('MDX compilation error:', error)
        const ErrorComponent = () => (
          <div>콘텐츠 렌더링 중 오류가 발생했습니다.</div>
        )
        mdxCache.set(mdxContent, ErrorComponent)
        cleanupCache()
        return ErrorComponent
      }
    },
    [components]
  )

  useEffect(() => {
    let isCancelled = false

    const loadContent = async () => {
      setIsLoading(true)

      try {
        const MDXContent = await compileMDX(debouncedContent)

        if (!isCancelled) {
          setContent(() => MDXContent)
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }

    loadContent()

    return () => {
      isCancelled = true
    }
  }, [debouncedContent, compileMDX])

  if (!Content) {
    return (
      <div className={cn('prose prose-slate dark:prose-invert', 'max-w-none')}>
        <div className="flex items-center justify-center py-8 text-gray-500">
          로딩 중...
        </div>
      </div>
    )
  }

  return (
    <MDXProvider components={components}>
      <div className={cn('prose prose-slate dark:prose-invert', 'max-w-none')}>
        {isLoading && (
          <div className="absolute right-2 top-2 rounded bg-white px-2 py-1 !text-body3 text-gray-500 shadow dark:bg-gray-800">
            업데이트 중...
          </div>
        )}
        <Content />
      </div>
    </MDXProvider>
  )
})

MdxRenderer.displayName = 'MdxRenderer'

export default MdxRenderer
