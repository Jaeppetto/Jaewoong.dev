'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
import type { Editor as TiptapEditor } from '@tiptap/react'
import type { JSONContent } from '@tiptap/core'

// --- Tiptap Core Extensions ---
import { StarterKit } from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Highlight } from '@tiptap/extension-highlight'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { Selection } from '@tiptap/extensions'

// --- UI Primitives ---
import { Button } from '@/shared/tiptap/ui-primitive/button'
import { Spacer } from '@/shared/tiptap/ui-primitive/spacer'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator
} from '@/shared/tiptap/ui-primitive/toolbar'

// --- Tiptap Node ---
import { ImageUploadNode } from '@/shared/tiptap/node/image-upload-node/image-upload-node-extension'
import { HorizontalRule } from '@/shared/tiptap/node/horizontal-rule-node/horizontal-rule-node-extension'
import '@/shared/tiptap/node/blockquote-node/blockquote-node.scss'
import '@/shared/tiptap/node/code-block-node/code-block-node.scss'
import '@/shared/tiptap/node/horizontal-rule-node/horizontal-rule-node.scss'
import '@/shared/tiptap/node/list-node/list-node.scss'
import '@/shared/tiptap/node/image-node/image-node.scss'
import '@/shared/tiptap/node/heading-node/heading-node.scss'
import '@/shared/tiptap/node/paragraph-node/paragraph-node.scss'

// --- Tiptap UI ---
import { HeadingDropdownMenu } from '@/shared/tiptap/ui/heading-dropdown-menu'
import { ImageUploadButton } from '@/shared/tiptap/ui/image-upload-button'
import { ListDropdownMenu } from '@/shared/tiptap/ui/list-dropdown-menu'
import { BlockquoteButton } from '@/shared/tiptap/ui/blockquote-button'
import { CodeBlockButton } from '@/shared/tiptap/ui/code-block-button'
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton
} from '@/shared/tiptap/ui/color-highlight-popover'
import {
  LinkPopover,
  LinkContent,
  LinkButton
} from '@/shared/tiptap/ui/link-popover'
import { MarkButton } from '@/shared/tiptap/ui/mark-button'
import { TextAlignButton } from '@/shared/tiptap/ui/text-align-button'
import { UndoRedoButton } from '@/shared/tiptap/ui/undo-redo-button'

// --- Icons ---
import { ArrowLeftIcon } from '@/shared/tiptap/icons/arrow-left-icon'
import { HighlighterIcon } from '@/shared/tiptap/icons/highlighter-icon'
import { LinkIcon } from '@/shared/tiptap/icons/link-icon'

// --- Hooks ---
import { useIsBreakpoint } from '@/shared/tiptap/hooks/use-is-breakpoint'
import { useWindowSize } from '@/shared/tiptap/hooks/use-window-size'
import { useCursorVisibility } from '@/shared/tiptap/hooks/use-cursor-visibility'

// --- Components ---
import { ThemeToggle } from '@/shared/tiptap/templates/simple/theme-toggle'

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from '@/shared/tiptap/lib/tiptap-utils'
import {
  MarkdownParser,
  MarkdownSerializer,
  defaultMarkdownParser,
  defaultMarkdownSerializer
} from 'prosemirror-markdown'
import type { ParseSpec } from 'prosemirror-markdown'
import type { Schema } from '@tiptap/pm/model'
import { cn } from '@/shared/shadcn-ui/util'

// --- Styles ---
import '@/shared/tiptap/templates/simple/simple-editor.scss'

interface SimpleEditorProps {
  value: string
  onChange: (nextValue: string) => void
  className?: string
}

const EMPTY_DOC: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'paragraph'
    }
  ]
}

const buildFallbackDoc = (markdown: string): JSONContent =>
  markdown
    ? {
        type: 'doc',
        content: markdown.split('\n').map(line => ({
          type: 'paragraph',
          content: line
            ? [
                {
                  type: 'text',
                  text: line
                }
              ]
            : []
        }))
      }
    : EMPTY_DOC

const createParserTokens = (): Record<string, ParseSpec> => {
  const baseTokens = defaultMarkdownParser.tokens

  return {
    ...baseTokens,
    bullet_list: baseTokens.bullet_list
      ? { ...baseTokens.bullet_list, block: 'bulletList' }
      : baseTokens.bullet_list,
    ordered_list: baseTokens.ordered_list
      ? { ...baseTokens.ordered_list, block: 'orderedList' }
      : baseTokens.ordered_list,
    list_item: baseTokens.list_item
      ? { ...baseTokens.list_item, block: 'listItem' }
      : baseTokens.list_item,
    code_block: baseTokens.code_block
      ? { ...baseTokens.code_block, block: 'codeBlock' }
      : baseTokens.code_block,
    fence: baseTokens.fence
      ? { ...baseTokens.fence, block: 'codeBlock' }
      : baseTokens.fence,
    hr: baseTokens.hr
      ? { ...baseTokens.hr, node: 'horizontalRule' }
      : baseTokens.hr,
    hardbreak: baseTokens.hardbreak
      ? { ...baseTokens.hardbreak, node: 'hardBreak' }
      : baseTokens.hardbreak,
    em: baseTokens.em ? { ...baseTokens.em, mark: 'italic' } : baseTokens.em,
    strong: baseTokens.strong
      ? { ...baseTokens.strong, mark: 'bold' }
      : baseTokens.strong
  }
}

const createMarkdownParser = (schema: Schema) =>
  new MarkdownParser(
    schema,
    defaultMarkdownParser.tokenizer,
    createParserTokens()
  )

const createMarkdownSerializer = () =>
  new MarkdownSerializer(
    {
      ...defaultMarkdownSerializer.nodes,
      bulletList: defaultMarkdownSerializer.nodes.bullet_list,
      orderedList: defaultMarkdownSerializer.nodes.ordered_list,
      listItem: defaultMarkdownSerializer.nodes.list_item,
      codeBlock: defaultMarkdownSerializer.nodes.code_block,
      horizontalRule: defaultMarkdownSerializer.nodes.horizontal_rule,
      hardBreak: defaultMarkdownSerializer.nodes.hard_break
    },
    {
      ...defaultMarkdownSerializer.marks,
      italic: defaultMarkdownSerializer.marks.em,
      bold: defaultMarkdownSerializer.marks.strong
    },
    {
      hardBreakNodeName: 'hardBreak',
      strict: false
    }
  )

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu
          levels={[1, 2, 3, 4]}
          portal={isMobile}
        />
        <ListDropdownMenu
          types={['bulletList', 'orderedList']}
          portal={isMobile}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack
}: {
  type: 'highlighter' | 'link'
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button
        data-style="ghost"
        onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)

export const SimpleEditor = ({
  value,
  onChange,
  className
}: SimpleEditorProps) => {
  const isMobile = useIsBreakpoint()
  const { height } = useWindowSize()
  const [mobileView, setMobileView] = useState<'main' | 'highlighter' | 'link'>(
    'main'
  )
  const toolbarRef = useRef<HTMLDivElement>(null)
  const parserRef = useRef<MarkdownParser | null>(null)
  const serializerRef = useRef<MarkdownSerializer | null>(null)
  const lastSyncedMarkdown = useRef<string>(value ?? '')

  const setContentFromMarkdown = useCallback(
    (editorInstance: TiptapEditor, markdown: string, emitUpdate = false) => {
      if (!parserRef.current) return

      try {
        const doc = parserRef.current.parse(markdown || '')
        editorInstance.commands.setContent(doc.toJSON() as JSONContent, {
          emitUpdate
        })
      } catch (error) {
        console.error('Failed to parse markdown for editor:', error)

        editorInstance.commands.setContent(buildFallbackDoc(markdown), {
          emitUpdate
        })
      }

      lastSyncedMarkdown.current = markdown
    },
    []
  )

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.',
        class: 'simple-editor'
      }
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true
        }
      }),
      HorizontalRule,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: error => console.error('Upload failed:', error)
      })
    ],
    content: '',
    onCreate: ({ editor }) => {
      parserRef.current = createMarkdownParser(editor.schema)
      serializerRef.current = createMarkdownSerializer()
      setContentFromMarkdown(editor, value ?? '', false)
    },
    onUpdate: ({ editor }) => {
      if (!serializerRef.current) return
      const markdown = serializerRef.current.serialize(editor.state.doc)
      if (markdown === lastSyncedMarkdown.current) return
      lastSyncedMarkdown.current = markdown
      onChange(markdown)
    }
  })

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0
  })

  useEffect(() => {
    if (!editor || !parserRef.current) return
    if (value === lastSyncedMarkdown.current) return
    setContentFromMarkdown(editor, value ?? '', false)
  }, [editor, setContentFromMarkdown, value])

  useEffect(() => {
    if (!isMobile && mobileView !== 'main') {
      setMobileView('main')
    }
  }, [isMobile, mobileView])

  return (
    <div className={cn('simple-editor-wrapper', className)}>
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`
                }
              : {})
          }}>
          {mobileView === 'main' ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView('highlighter')}
              onLinkClick={() => setMobileView('link')}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
              onBack={() => setMobileView('main')}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  )
}
