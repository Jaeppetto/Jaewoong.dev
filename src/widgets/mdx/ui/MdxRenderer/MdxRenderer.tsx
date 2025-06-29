import { useState, useEffect, useMemo, useCallback, useRef, memo } from 'react'
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

interface MdxRendererProps {
  content: string
  debounceMs?: number
}

const mdxCache = new Map<string, React.ComponentType>()
const MAX_CACHE_SIZE = 50

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
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const components = useMemo<MDXComponents>(
    () => ({
      h1: (props: HeadingProps) => (
        <h1
          className="my-4 text-5xl font-bold text-slate-900"
          {...props}
        />
      ),
      h2: (props: HeadingProps) => (
        <h2
          className="my-3 text-4xl font-semibold text-slate-900"
          {...props}
        />
      ),
      h3: (props: HeadingProps) => (
        <h3
          className="my-2 text-3xl font-semibold text-slate-900"
          {...props}
        />
      ),
      p: (props: ParagraphProps) => (
        <p
          className="my-3 text-2xl text-slate-900"
          {...props}
        />
      ),
      a: (props: AnchorProps) => (
        <a
          className="text-2xl font-bold text-slate-900 hover:text-slate-600 hover:underline"
          {...props}
        />
      ),
      strong: (props: StrongProps) => (
        <strong
          className="text-2xl font-bold text-slate-900"
          {...props}
        />
      ),
      em: (props: EmphasisProps) => (
        <em
          className="text-2xl italic text-slate-900"
          {...props}
        />
      ),
      blockquote: (props: BlockquoteProps) => (
        <blockquote
          className="pl-4 text-2xl italic font-bold border-l-4 border-slate-900 text-slate-900"
          {...props}
        />
      ),
      ul: (props: ListProps) => (
        <ul
          className="my-2 text-2xl list-disc list-inside text-slate-900"
          {...props}
        />
      ),
      ol: (props: ListProps) => (
        <ol
          className="my-2 text-2xl list-decimal list-inside text-slate-900"
          {...props}
        />
      ),
      li: (props: ListItemProps) => {
        const hasCheckbox = props.className?.includes('task-list-item')

        return (
          <li
            className={cn(
              "my-2 text-2xl text-slate-900",
              hasCheckbox && "list-none"
            )}
            {...props}
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
      img: (props: ImageProps) => (
        <OptimizedImage
          src={props.src || ''}
          alt={props.alt || ''}
          className="my-6"
          {...props}
        />
      ),
      Highlight: (props: HighlightProps) => <Highlight {...props} />,
      FoldableCard: (props: FoldableCardProps) => <FoldableCard {...props} />,
      InlineCode: (props: ComponentPropsWithoutRef<'code'>) => (
        <InlineCode {...props} />
      ),
      CodeBlock: (props: { language?: string; children: React.ReactNode }) => (
        <CodeBlock {...props} />
      )
    }),
    []
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
          remarkPlugins: [remarkGfm],
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
        <div className="flex justify-center items-center py-8 text-gray-500">
          로딩 중...
        </div>
      </div>
    )
  }

  return (
    <MDXProvider components={components}>
      <div className={cn('prose prose-slate dark:prose-invert', 'max-w-none')}>
        {isLoading && (
          <div className="absolute top-2 right-2 px-2 py-1 text-xs text-gray-500 bg-white rounded shadow dark:bg-gray-800">
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
