import type { Meta, StoryObj } from '@storybook/react-vite'
import { InlineCode } from './InlineCode'

const meta: Meta<typeof InlineCode> = {
  title: 'entities/mdx/InlineCode',
  component: InlineCode,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'console.log()'
  }
}

export const Variable: Story = {
  args: {
    children: 'useState'
  }
}

export const Command: Story = {
  args: {
    children: 'pnpm install'
  }
}

export const FilePath: Story = {
  args: {
    children: 'src/components/Button.tsx'
  }
}

export const InText: Story = {
  render: () => (
    <p className="text-body2">
      터미널에서 <InlineCode>pnpm dev</InlineCode> 명령어를 실행하면 개발 서버가
      시작됩니다. 브라우저에서 <InlineCode>localhost:3000</InlineCode>
      으로 접속하세요.
    </p>
  )
}

export const MultipleInText: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-body2">
        React의 <InlineCode>useEffect</InlineCode> 훅은 컴포넌트가 렌더링될
        때마다 실행됩니다. 의존성 배열에 <InlineCode>[]</InlineCode>를 전달하면
        마운트 시에만 실행됩니다.
      </p>
      <p className="text-body2">
        <InlineCode>npm install react</InlineCode> 또는{' '}
        <InlineCode>yarn add react</InlineCode>로 설치할 수 있습니다.
      </p>
    </div>
  )
}

export const LongCode: Story = {
  args: {
    children: 'const handleSubmit = async (data: FormData) => { ... }'
  }
}
