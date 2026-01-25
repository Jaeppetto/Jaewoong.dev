import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'shared/shadcn-ui/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text'
    },
    disabled: {
      control: 'boolean'
    },
    rows: {
      control: 'number'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요...'
  }
}

export const WithValue: Story = {
  args: {
    defaultValue:
      '이것은 미리 입력된 텍스트입니다.\n여러 줄의 내용을 입력할 수 있습니다.'
  }
}

export const CustomRows: Story = {
  args: {
    placeholder: '6줄 높이의 텍스트 영역',
    rows: 6
  }
}

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 텍스트 영역',
    disabled: true
  }
}

export const WithMaxLength: Story = {
  args: {
    placeholder: '최대 100자까지 입력 가능',
    maxLength: 100
  }
}

export const AllStates: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <Textarea placeholder="기본 상태" />
      <Textarea defaultValue="내용이 입력된 상태" />
      <Textarea
        placeholder="비활성화 상태"
        disabled
      />
    </div>
  )
}
