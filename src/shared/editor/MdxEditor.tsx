import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  CodeToggle,
  linkPlugin,
  linkDialogPlugin,
  MDXEditorProps
} from '@mdxeditor/editor'

// TODO: 태그별 마크다운 변환
// TODO: 툴바 고도화
// TODO: 미리보기

const MdxEditor = ({ ...props }: MDXEditorProps) => {
  return (
    <MDXEditor
      {...props}
      className="prose prose-slate lg:prose-lg [&_.mdxeditor-root-contenteditable]:h-[40rem] [&_.mdxeditor-root-contenteditable]:overflow-y-auto [&_.mdxeditor-root-contenteditable]:rounded-[1.2rem] [&_.mdxeditor-root-contenteditable]:border [&_.mdxeditor-root-contenteditable]:border-slate-200 [&_.mdxeditor-root-contenteditable]:bg-white [&_.mdxeditor-root-contenteditable]:p-4 [&_.mdxeditor-root-contenteditable]:shadow-default [&_.mdxeditor-toolbar]:mb-[1.2rem] [&_.mdxeditor-toolbar]:rounded-[1.2rem] [&_.mdxeditor-toolbar]:border [&_.mdxeditor-toolbar]:border-slate-200 [&_.mdxeditor-toolbar]:bg-white [&_.mdxeditor-toolbar]:py-2 [&_.mdxeditor-toolbar]:shadow-default"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        linkPlugin(),
        linkDialogPlugin(),

        toolbarPlugin({
          toolbarClassName: 'flex items-center gap-2',
          toolbarContents: () => (
            <>
              <div className="flex gap-4">
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <CreateLink />
                <InsertImage />
                <CodeToggle />
              </div>
              <div className="flex">
                <UndoRedo />
              </div>
            </>
          )
        })
      ]}
    />
  )
}

export default MdxEditor
