import type { Meta, StoryObj, Decorator } from '@storybook/react-vite'
import { useState } from 'react'
import TagItem from './TagItem'
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
  Outlet
} from '@tanstack/react-router'

const RouterDecorator: Decorator = (Story) => {
  const rootRoute = createRootRoute({
    component: () => (
      <>
        <Story />
        <Outlet />
      </>
    )
  })

  const router = createRouter({
    routeTree: rootRoute,
    history: createMemoryHistory({ initialEntries: ['/'] })
  })

  return <RouterProvider router={router} />
}

const mockTag = {
  id: '1',
  name: 'React',
  slug: 'react',
  created_at: '2024-01-01T00:00:00Z'
}

const meta: Meta<typeof TagItem> = {
  title: 'entities/tag/TagItem',
  component: TagItem,
  tags: ['autodocs'],
  decorators: [RouterDecorator],
  argTypes: {
    mode: {
      control: 'select',
      options: ['link', 'button']
    },
    isSelected: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const LinkMode: Story = {
  args: {
    tag: mockTag,
    mode: 'link'
  }
}

export const ButtonMode: Story = {
  args: {
    tag: mockTag,
    mode: 'button',
    isSelected: false
  }
}

export const ButtonModeSelected: Story = {
  args: {
    tag: mockTag,
    mode: 'button',
    isSelected: true
  }
}

export const InteractiveButton: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])

    const tags = [
      { id: '1', name: 'React', slug: 'react', created_at: null },
      { id: '2', name: 'TypeScript', slug: 'typescript', created_at: null },
      { id: '3', name: 'Next.js', slug: 'nextjs', created_at: null },
      { id: '4', name: 'Vite', slug: 'vite', created_at: null }
    ]

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <TagItem
            key={tag.id}
            tag={tag}
            mode="button"
            isSelected={selected.includes(tag.id)}
            onSelect={id => setSelected([...selected, id])}
            onDeselect={id => setSelected(selected.filter(s => s !== id))}
          />
        ))}
      </div>
    )
  }
}

export const TagList: Story = {
  render: () => {
    const tags = [
      { id: '1', name: 'React', slug: 'react', created_at: null },
      { id: '2', name: 'TypeScript', slug: 'typescript', created_at: null },
      { id: '3', name: 'TailwindCSS', slug: 'tailwindcss', created_at: null },
      { id: '4', name: 'Storybook', slug: 'storybook', created_at: null }
    ]

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <TagItem
            key={tag.id}
            tag={tag}
            mode="link"
          />
        ))}
      </div>
    )
  }
}
