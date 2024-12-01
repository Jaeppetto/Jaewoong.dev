import {
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  ConditionalContents,
  MDXEditor,
  toolbarPlugin,
  InsertCodeBlock
} from '@mdxeditor/editor'
import { createFileRoute } from '@tanstack/react-router'

import '@mdxeditor/editor/style.css'

const PostEditor = () => {
  return (
    <MDXEditor
      className="w-full h-full"
      markdown="hello world"
      plugins={[
        codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
        codeMirrorPlugin({
          codeBlockLanguages: { js: 'JavaScript', css: 'CSS' }
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <ConditionalContents
              options={[
                {
                  when: editor => editor?.editorType === 'codeblock',
                  contents: () => <ChangeCodeMirrorLanguage />
                },
                {
                  fallback: () => (
                    <>
                      <InsertCodeBlock />
                    </>
                  )
                }
              ]}
            />
          )
        })
      ]}
    />
  )
}

export default PostEditor

export const Route = createFileRoute('/article/writing')({
  component: PostEditor
})

// TODO: 게시글 자동 임시저장 기능 (로컬스토리지 또는 DB)
