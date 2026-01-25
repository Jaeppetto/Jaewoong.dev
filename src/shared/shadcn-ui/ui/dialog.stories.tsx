import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
} from './dialog'
import Button from './button'
import { Input } from './input'

const meta: Meta<typeof Dialog> = {
  title: 'shared/shadcn-ui/Dialog',
  component: Dialog,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>
            다이얼로그의 설명 텍스트입니다. 사용자에게 추가 정보를 제공합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-body3">다이얼로그 내용이 여기에 들어갑니다.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>프로필 수정</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>
            프로필 정보를 수정하세요. 완료되면 저장 버튼을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="name"
              className="text-right text-body3">
              이름
            </label>
            <Input
              id="name"
              defaultValue="홍길동"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="email"
              className="text-right text-body3">
              이메일
            </label>
            <Input
              id="email"
              type="email"
              defaultValue="hong@example.com"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">삭제</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button variant="destructive">삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Interaction Test Examples
export const OpenDialogInteraction: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>인터랙션 테스트</DialogTitle>
          <DialogDescription>
            이 다이얼로그는 Interaction Test로 자동으로 열립니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 트리거 버튼 찾기
    const triggerButton = canvas.getByRole('button', { name: /다이얼로그 열기/i })
    await expect(triggerButton).toBeInTheDocument()

    // 다이얼로그 열기
    await userEvent.click(triggerButton)

    // 다이얼로그가 열렸는지 확인 (body에서 검색)
    const dialog = await within(document.body).findByRole('dialog')
    await expect(dialog).toBeInTheDocument()

    // 다이얼로그 제목 확인
    const title = within(dialog).getByText('인터랙션 테스트')
    await expect(title).toBeInTheDocument()
  }
}

export const CloseDialogInteraction: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>닫기 테스트</DialogTitle>
          <DialogDescription>닫기 버튼을 클릭하면 다이얼로그가 닫힙니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 다이얼로그 열기
    const triggerButton = canvas.getByRole('button', { name: /열기/i })
    await userEvent.click(triggerButton)

    // 다이얼로그가 열렸는지 확인
    const dialog = await within(document.body).findByRole('dialog')
    await expect(dialog).toBeInTheDocument()

    // 다이얼로그 제목 확인
    const title = within(dialog).getByText('닫기 테스트')
    await expect(title).toBeInTheDocument()

    // 닫기 버튼 클릭
    const closeButton = within(dialog).getByRole('button', { name: /닫기/i })
    await userEvent.click(closeButton)

    // 다이얼로그가 닫혔는지 확인 (애니메이션 완료 대기)
    await waitFor(
      () => {
        expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
      },
      { timeout: 1000 }
    )
  }
}
