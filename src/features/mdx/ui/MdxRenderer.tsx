import { useState, useEffect } from 'react'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import remarkGfm from 'remark-gfm'
import type { ComponentPropsWithoutRef } from 'react'
import { MDXComponents } from 'mdx/types'

interface MdxRendererProps {
  content: string
}

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type StrongProps = ComponentPropsWithoutRef<'strong'>
type EmphasisProps = ComponentPropsWithoutRef<'em'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type ListProps = ComponentPropsWithoutRef<'ul' | 'ol'>
type ListItemProps = ComponentPropsWithoutRef<'li'>

export const MdxRenderer = ({ content }: MdxRendererProps) => {
  const [Content, setContent] = useState<React.ComponentType | null>(null)

  const components: MDXComponents = {
    h1: (props: HeadingProps) => (
      <h1
        className="my-4 text-2xl font-bold text-[#23f323]"
        {...props}
      />
    ),
    h2: (props: HeadingProps) => (
      <h2
        className="my-3 text-xl font-semibold"
        {...props}
      />
    ),
    p: (props: ParagraphProps) => (
      <p
        className="my-2"
        {...props}
      />
    ),
    strong: (props: StrongProps) => (
      <strong
        className="font-bold"
        {...props}
      />
    ),
    em: (props: EmphasisProps) => (
      <em
        className="italic"
        {...props}
      />
    ),
    blockquote: (props: BlockquoteProps) => (
      <blockquote
        className="my-4 border-l-4 border-gray-200 pl-4 italic"
        {...props}
      />
    ),
    ul: (props: ListProps) => (
      <ul
        className="my-4 list-inside list-disc"
        {...props}
      />
    ),
    ol: (props: ListProps) => (
      <ol
        className="my-4 list-inside list-decimal"
        {...props}
      />
    ),
    li: (props: ListItemProps) => (
      <li
        className="my-1"
        {...props}
      />
    ),
    inlineCode: (props: ComponentPropsWithoutRef<'code'>) => (
      <code
        className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm"
        {...props}
      />
    )
  }

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { default: MDXContent } = await evaluate(content, {
          ...runtime,
          remarkPlugins: [remarkGfm]
        })

        setContent(() => MDXContent)
      } catch (error) {
        console.error(error)
        setContent(() => () => <div>콘텐츠 렌더링 중 오류가 발생했습니다.</div>)
      }
    }

    loadContent()
  }, [content])

  if (!Content) {
    return <div>로딩 중...</div>
  }

  return (
    <MDXProvider components={components}>
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <Content />
      </div>
    </MDXProvider>
  )
}
