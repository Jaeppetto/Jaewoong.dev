import {
  ComponentPropsWithoutRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneLight,
  oneDark
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/shared/shadcn-ui/util'
import { useTheme } from 'next-themes'
import { format } from 'prettier'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Skeleton } from '@/shared/shadcn-ui/ui/skeleton'

const prettierPluginCache = new Map()
const formattedCodeCache = new Map()

export interface CodeBlockProps extends ComponentPropsWithoutRef<'pre'> {
  children?: React.ReactNode
  language?: string
}

const getCachedPlugins = async (language: string) => {
  const cacheKey =
    language === 'typescript' || language === 'ts' ? 'typescript' : 'babel'

  if (prettierPluginCache.has(cacheKey)) {
    return prettierPluginCache.get(cacheKey)
  }

  try {
    const [prettierPluginTypeScript, prettierPluginEstree] = await Promise.all([
      import('prettier/plugins/typescript'),
      import('prettier/plugins/estree')
    ])

    const plugins = {
      typescript: [
        prettierPluginTypeScript.default,
        prettierPluginEstree.default
      ],
      babel: [prettierPluginEstree.default]
    }

    prettierPluginCache.set('typescript', plugins.typescript)
    prettierPluginCache.set('babel', plugins.babel)

    return plugins[cacheKey]
  } catch (error) {
    console.error('Failed to load prettier plugins:', error)
    return []
  }
}

export const CodeBlock = ({
  children,
  language = 'text',
  className
}: CodeBlockProps) => {
  const { theme } = useTheme()
  const [displayCode, setDisplayCode] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)
  const [isFormatted, setIsFormatted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const codeContent = useMemo(() => {
    let content = ''
    if (typeof children === 'string') {
      content = children
    } else if (
      children &&
      typeof children === 'object' &&
      children !== null &&
      'props' in children
    ) {
      const codeElement = children as { props?: { children?: string } }
      content = codeElement.props?.children || ''
    }
    return content.trim()
  }, [children])

  const formatCode = useCallback(async (code: string, lang: string) => {
    const cacheKey = `${code}-${lang}`

    if (formattedCodeCache.has(cacheKey)) {
      return formattedCodeCache.get(cacheKey)
    }

    const supportedLanguages = [
      'javascript',
      'js',
      'typescript',
      'ts',
      'json',
      'css',
      'html'
    ]

    if (!supportedLanguages.includes(lang)) {
      formattedCodeCache.set(cacheKey, code)
      return code
    }

    try {
      let parser = 'babel'

      if (lang === 'typescript' || lang === 'ts') {
        parser = 'typescript'
      } else if (lang === 'javascript' || lang === 'js') {
        parser = 'babel'
      } else if (lang === 'json') {
        parser = 'json'
      } else if (lang === 'css') {
        parser = 'css'
      } else if (lang === 'html') {
        parser = 'html'
      }

      const plugins = await getCachedPlugins(lang)

      const formatted = await format(code, {
        parser,
        plugins,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5'
      })

      const result = formatted.trim()
      formattedCodeCache.set(cacheKey, result)
      return result
    } catch (error) {
      console.error('Code formatting failed:', error)
      formattedCodeCache.set(cacheKey, code)
      return code
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '50px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || isFormatted) return

    let isCancelled = false

    const autoFormatCode = async () => {
      setDisplayCode(codeContent)

      const result = await formatCode(codeContent, language)
      if (!isCancelled) {
        setDisplayCode(result)
        setIsFormatted(true)
      }
    }

    autoFormatCode()

    return () => {
      isCancelled = true
    }
  }, [isVisible, codeContent, language, formatCode, isFormatted])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(displayCode)
      toast.success('코드가 복사되었습니다.')
    } catch (error) {
      console.error('Copy failed:', error)
      toast.error('코드 복사에 실패했습니다.')
    }
  }

  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        className={cn(
          'flex overflow-hidden justify-center items-center my-4 rounded-lg border border-gray-200 min-h-[100px] dark:border-gray-700',
          className
        )}>
        <Skeleton className="w-full h-full" />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'overflow-hidden my-4 rounded-lg border border-gray-200 dark:border-gray-700',
        className
      )}>
      {language && language !== 'text' && (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-gray-800">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {language}
            {!isFormatted && (
              <span className="ml-2 text-xs opacity-60">(formatting...)</span>
            )}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex gap-1 items-center px-2 py-1 text-xs text-gray-600 rounded hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
            title="Copy code">
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderRadius:
            language && language !== 'text' ? '0 0 0.5rem 0.5rem' : '0.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.5'
        }}
        showLineNumbers={displayCode.split('\n').length > 5}
        wrapLines={true}>
        {displayCode}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
