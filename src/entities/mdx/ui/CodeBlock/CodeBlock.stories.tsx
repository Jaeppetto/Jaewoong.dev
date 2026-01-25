import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock } from './CodeBlock'

const meta: Meta<typeof CodeBlock> = {
  title: 'entities/mdx/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    language: {
      control: 'select',
      options: [
        'javascript',
        'typescript',
        'jsx',
        'tsx',
        'css',
        'html',
        'json',
        'bash',
        'text'
      ]
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const JavaScript: Story = {
  args: {
    language: 'javascript',
    children: `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

greet('World');`
  }
}

export const TypeScript: Story = {
  args: {
    language: 'typescript',
    children: `interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com',
  };
}`
  }
}

export const React: Story = {
  args: {
    language: 'tsx',
    children: `import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button = ({ label, onClick }: ButtonProps) => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => {
      setCount(count + 1);
      onClick();
    }}>
      {label} ({count})
    </button>
  );
};`
  }
}

export const CSS: Story = {
  args: {
    language: 'css',
    children: `.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.container:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}`
  }
}

export const JSON: Story = {
  args: {
    language: 'json',
    children: `{
  "name": "my-project",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0",
    "typescript": "^5.0.0"
  }
}`
  }
}

export const Bash: Story = {
  args: {
    language: 'bash',
    children: `# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build`
  }
}

export const ShortCode: Story = {
  args: {
    language: 'javascript',
    children: `const sum = (a, b) => a + b;`
  }
}

export const LongCode: Story = {
  args: {
    language: 'typescript',
    children: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/shared/api/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export function usePostsQuery() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPost: Omit<Post, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('posts')
        .insert(newPost)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}`
  }
}
