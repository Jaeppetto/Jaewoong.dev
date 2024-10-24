import { createFileRoute } from '@tanstack/react-router'

const Project = () => {
  const projectTitle = Route.useParams().projectTitle
  return <div>Hello /archive_/$projectTitle! {projectTitle}</div>
}

export const Route = createFileRoute('/archive_/$projectTitle')({
  component: Project
})
