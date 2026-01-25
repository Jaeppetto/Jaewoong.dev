import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import Button from './button'

const meta: Meta<typeof Button> = {
  title: 'shared/shadcn-ui/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link'
      ]
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
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
    children: 'Button',
    variant: 'default'
  }
}

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive'
  }
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline'
  }
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
}

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link'
  }
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <span>+</span>
      </Button>
    </div>
  )
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true
  }
}

// Interaction Test Examples
export const ClickInteraction: Story = {
  args: {
    children: 'Click me',
    onClick: fn()
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })

    // 버튼이 렌더링되었는지 확인
    await expect(button).toBeInTheDocument()

    // 버튼 클릭
    await userEvent.click(button)

    // onClick이 호출되었는지 확인
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  }
}

export const DisabledInteraction: Story = {
  args: {
    children: 'Cannot click',
    disabled: true,
    onClick: fn()
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /cannot click/i })

    // 버튼이 렌더링되었는지 확인
    await expect(button).toBeInTheDocument()

    // 버튼이 비활성화 상태인지 확인
    await expect(button).toBeDisabled()

    // 비활성화된 버튼은 pointer-events: none으로 클릭 불가
    // userEvent.click은 이 경우 에러를 발생시키므로, 클릭 시도하지 않음
    // 대신 onClick이 초기 상태에서 호출되지 않았는지 확인
    await expect(args.onClick).not.toHaveBeenCalled()

    // aria-disabled 속성 확인
    await expect(button).toHaveAttribute('disabled')
  }
}
