import type { Meta, StoryObj } from '@storybook/react-vite'
import { Highlight } from './Highlight'

const meta: Meta<typeof Highlight> = {
  title: 'entities/mdx/Highlight',
  component: Highlight,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'code',
        'gray',
        'brown',
        'orange',
        'yellow',
        'green',
        'blue',
        'purple',
        'red'
      ]
    },
    children: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '기본 하이라이트',
    color: 'yellow'
  }
}

export const Code: Story = {
  args: {
    children: 'useState',
    color: 'code'
  }
}

export const Gray: Story = {
  args: {
    children: 'Gray 하이라이트',
    color: 'gray'
  }
}

export const Brown: Story = {
  args: {
    children: 'Brown 하이라이트',
    color: 'brown'
  }
}

export const Orange: Story = {
  args: {
    children: 'Orange 하이라이트',
    color: 'orange'
  }
}

export const Green: Story = {
  args: {
    children: 'Green 하이라이트',
    color: 'green'
  }
}

export const Blue: Story = {
  args: {
    children: 'Blue 하이라이트',
    color: 'blue'
  }
}

export const Purple: Story = {
  args: {
    children: 'Purple 하이라이트',
    color: 'purple'
  }
}

export const Red: Story = {
  args: {
    children: 'Red 하이라이트',
    color: 'red'
  }
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Highlight color="code">code</Highlight>
      <Highlight color="gray">gray</Highlight>
      <Highlight color="brown">brown</Highlight>
      <Highlight color="orange">orange</Highlight>
      <Highlight color="yellow">yellow</Highlight>
      <Highlight color="green">green</Highlight>
      <Highlight color="blue">blue</Highlight>
      <Highlight color="purple">purple</Highlight>
      <Highlight color="red">red</Highlight>
    </div>
  )
}

export const InText: Story = {
  render: () => (
    <p className="text-body2">
      React에서 <Highlight color="code">useState</Highlight> 훅을 사용하면
      컴포넌트의 <Highlight color="blue">상태</Highlight>를 관리할 수 있습니다.
      <Highlight color="red">주의</Highlight>: 상태 업데이트는 비동기로
      처리됩니다.
    </p>
  )
}
