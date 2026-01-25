import type { Meta, StoryObj } from '@storybook/react-vite'
import OptimizedImage from './OptimizedImage'

const meta: Meta<typeof OptimizedImage> = {
  title: 'entities/mdx/OptimizedImage',
  component: OptimizedImage,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    src: {
      control: 'text'
    },
    alt: {
      control: 'text'
    },
    width: {
      control: 'number'
    },
    height: {
      control: 'number'
    },
    priority: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/800/400',
    alt: '샘플 이미지'
  }
}

export const WithDimensions: Story = {
  args: {
    src: 'https://picsum.photos/400/300',
    alt: '크기가 지정된 이미지',
    width: 400,
    height: 300
  }
}

export const Priority: Story = {
  args: {
    src: 'https://picsum.photos/600/400',
    alt: '우선 로드 이미지',
    priority: true
  }
}

export const Square: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: '정사각형 이미지',
    width: 300,
    height: 300
  }
}

export const Wide: Story = {
  args: {
    src: 'https://picsum.photos/1200/400',
    alt: '와이드 이미지'
  }
}

export const InvalidImage: Story = {
  args: {
    src: 'https://invalid-url.com/image.jpg',
    alt: '존재하지 않는 이미지'
  }
}

export const Gallery: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <OptimizedImage
        src="https://picsum.photos/400/300?random=1"
        alt="갤러리 이미지 1"
      />
      <OptimizedImage
        src="https://picsum.photos/400/300?random=2"
        alt="갤러리 이미지 2"
      />
      <OptimizedImage
        src="https://picsum.photos/400/300?random=3"
        alt="갤러리 이미지 3"
      />
      <OptimizedImage
        src="https://picsum.photos/400/300?random=4"
        alt="갤러리 이미지 4"
      />
    </div>
  )
}
