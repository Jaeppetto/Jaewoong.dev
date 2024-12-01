import { createFileRoute } from '@tanstack/react-router'

const PostEditor = () => {
  return <div>PostEditor</div>
}

export default PostEditor

export const Route = createFileRoute('/article_/$writing')({
  component: PostEditor
})
