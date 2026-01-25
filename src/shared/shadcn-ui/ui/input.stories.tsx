import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'shared/shadcn-ui/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url']
    },
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요'
  }
}

export const WithValue: Story = {
  args: {
    defaultValue: '입력된 텍스트'
  }
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호를 입력하세요'
  }
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'email@example.com'
  }
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '숫자를 입력하세요'
  }
}

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 입력',
    disabled: true
  }
}

export const WithFile: Story = {
  args: {
    type: 'file'
  }
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4">
      <Input
        type="text"
        placeholder="Text"
      />
      <Input
        type="email"
        placeholder="Email"
      />
      <Input
        type="password"
        placeholder="Password"
      />
      <Input
        type="number"
        placeholder="Number"
      />
      <Input
        type="search"
        placeholder="Search"
      />
      <Input type="file" />
      <Input
        placeholder="Disabled"
        disabled
      />
    </div>
  )
}
