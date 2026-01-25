import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from './sonner'
import { toast } from 'sonner'
import Button from './button'

const meta = {
  title: 'shared/shadcn-ui/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div>
        <Story />
        <Toaster />
      </div>
    )
  ]
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('기본 토스트 메시지입니다.')}>
      토스트 표시
    </Button>
  )
}

export const Success: Story = {
  render: () => (
    <Button
      onClick={() => toast.success('성공적으로 저장되었습니다.')}
      variant="secondary">
      성공 토스트
    </Button>
  )
}

export const Error: Story = {
  render: () => (
    <Button
      onClick={() => toast.error('오류가 발생했습니다.')}
      variant="destructive">
      에러 토스트
    </Button>
  )
}

export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('알림', {
          description: '새로운 메시지가 도착했습니다.'
        })
      }
      variant="outline">
      설명 포함 토스트
    </Button>
  )
}

export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('파일이 삭제되었습니다.', {
          action: {
            label: '되돌리기',
            onClick: () => toast.success('되돌리기 완료')
          }
        })
      }
      variant="outline">
      액션 버튼 토스트
    </Button>
  )
}

export const PromiseToast: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = new Promise<void>(resolve => setTimeout(resolve, 2000))
        toast.promise(promise, {
          loading: '저장 중...',
          success: '저장 완료!',
          error: '저장 실패'
        })
      }}
      variant="outline">
      Promise 토스트
    </Button>
  )
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast('기본 메시지')}>기본</Button>
      <Button
        onClick={() => toast.success('성공!')}
        variant="secondary">
        성공
      </Button>
      <Button
        onClick={() => toast.error('에러!')}
        variant="destructive">
        에러
      </Button>
      <Button
        onClick={() => toast.warning('경고!')}
        variant="outline">
        경고
      </Button>
      <Button
        onClick={() => toast.info('정보')}
        variant="ghost">
        정보
      </Button>
    </div>
  )
}
