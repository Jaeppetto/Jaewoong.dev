import { createLazyFileRoute } from '@tanstack/react-router'

const Archive = () => {
  return <div>Hello /archive!</div>
}

export const Route = createLazyFileRoute('/archive')({
  component: Archive
})
