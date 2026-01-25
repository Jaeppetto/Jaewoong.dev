import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'shared/shadcn-ui/Avatar',
  component: Avatar,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="사용자 아바타"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage
        src=""
        alt="존재하지 않는 이미지"
      />
      <AvatarFallback>JW</AvatarFallback>
    </Avatar>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
      <Avatar className="h-20 w-20">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  )
}

export const FallbackColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-red-500 text-white">A</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-blue-500 text-white">B</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-green-500 text-white">C</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-purple-500 text-white">D</AvatarFallback>
      </Avatar>
    </div>
  )
}

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-3">
      <Avatar className="border-2 border-white">
        <AvatarImage src="https://i.pravatar.cc/150?img=1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarImage src="https://i.pravatar.cc/150?img=2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-white">
        <AvatarFallback className="bg-slate-200 text-slate-600">
          +5
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=4" />
          <AvatarFallback>온</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=5" />
          <AvatarFallback>자</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-yellow-500" />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/150?img=6" />
          <AvatarFallback>오</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-gray-400" />
      </div>
    </div>
  )
}
