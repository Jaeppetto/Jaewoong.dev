import { useState, useEffect, useMemo } from 'react'
import * as runtime from 'react/jsx-runtime'
import { evaluate } from '@mdx-js/mdx'
import { MDXProvider } from '@mdx-js/react'
import remarkGfm from 'remark-gfm'
import type { ComponentPropsWithoutRef } from 'react'
import { MDXComponents } from 'mdx/types'
import { Highlight, HighlightProps } from './Highlight'

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
type AnchorProps = ComponentPropsWithoutRef<'a'>

export const MdxRenderer = ({ content }: MdxRendererProps) => {
  const [Content, setContent] = useState<React.ComponentType | null>(null)

  const components = useMemo<MDXComponents>(
    () => ({
      h1: (props: HeadingProps) => (
        <h1
          className="my-4 text-3xl font-bold text-slate-900"
          {...props}
        />
      ),
      h2: (props: HeadingProps) => (
        <h2
          className="my-3 text-2xl font-semibold text-slate-900"
          {...props}
        />
      ),
      h3: (props: HeadingProps) => (
        <h3
          className="my-2 text-xl font-semibold text-slate-900"
          {...props}
        />
      ),
      p: (props: ParagraphProps) => (
        <p
          className="my-3 text-lg text-slate-900"
          {...props}
        />
      ),
      a: (props: AnchorProps) => (
        <a
          className="font-bold text-slate-900 hover:text-slate-600 hover:underline"
          {...props}
        />
      ),
      strong: (props: StrongProps) => (
        <strong
          className="font-bold text-slate-900"
          {...props}
        />
      ),
      em: (props: EmphasisProps) => (
        <em
          className="italic text-slate-900"
          {...props}
        />
      ),
      blockquote: (props: BlockquoteProps) => (
        <blockquote
          className="pl-4 italic font-bold border-l-4 border-slate-900 text-slate-900"
          {...props}
        />
      ),
      ul: (props: ListProps) => (
        <ul
          className="my-2 text-lg list-disc list-inside text-slate-900"
          {...props}
        />
      ),
      ol: (props: ListProps) => (
        <ol
          className="my-2 text-lg list-decimal list-inside text-slate-900"
          {...props}
        />
      ),
      li: (props: ListItemProps) => (
        <li
          className="my-2 text-lg text-slate-900"
          {...props}
        />
      ),
      code: (props: ComponentPropsWithoutRef<'code'>) => (
        <code
          className="rounded bg-slate-200 px-1 py-0.5 font-mono text-xl"
          {...props}
        />
      ),
      Highlight: (props: HighlightProps) => <Highlight {...props} />
    }),
    []
  )

  useEffect(() => {
    const loadContent = async () => {
      try {
        const { default: MDXContent } = await evaluate(content, {
          ...runtime,
          remarkPlugins: [remarkGfm],
          useMDXComponents: () => components
        })
        setContent(() => MDXContent)
      } catch (error) {
        console.error(error)
        setContent(() => () => <div>콘텐츠 렌더링 중 오류가 발생했습니다.</div>)
      }
    }
    loadContent()
  }, [components, content])

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
