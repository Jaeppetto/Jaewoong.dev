import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { useState } from 'react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'shared/shadcn-ui/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const Checked: Story = {
  args: {
    checked: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true
  }
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="cursor-pointer text-body3">
        이용약관에 동의합니다
      </label>
    </div>
  )
}

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center">
        <Checkbox
          id="interactive"
          checked={checked}
          onCheckedChange={value => setChecked(value === true)}
        />
        <label
          htmlFor="interactive"
          className="cursor-pointer text-body3">
          {checked ? '선택됨' : '선택 안됨'}
        </label>
      </div>
    )
  }
}

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])

    const toggleItem = (id: string) => {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      )
    }

    const items = [
      { id: '1', label: 'React' },
      { id: '2', label: 'Vue' },
      { id: '3', label: 'Angular' },
      { id: '4', label: 'Svelte' }
    ]

    return (
      <div className="flex flex-col gap-3">
        <p className="text-body3 text-slate-600">
          선택된 항목: {selected.length}개
        </p>
        {items.map(item => (
          <div
            key={item.id}
            className="flex items-center">
            <Checkbox
              id={item.id}
              checked={selected.includes(item.id)}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <label
              htmlFor={item.id}
              className="cursor-pointer text-body3">
              {item.label}
            </label>
          </div>
        ))}
      </div>
    )
  }
}

// Interaction Test Examples
export const ToggleInteraction: Story = {
  render: () => (
    <div className="flex items-center">
      <Checkbox id="toggle-test" aria-label="토글 테스트" />
      <label
        htmlFor="toggle-test"
        className="cursor-pointer text-body3">
        클릭하여 토글
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 체크박스 찾기
    const checkbox = canvas.getByRole('checkbox', { name: /토글 테스트/i })
    await expect(checkbox).toBeInTheDocument()

    // 초기 상태 확인 (체크 안 됨)
    await expect(checkbox).not.toBeChecked()

    // 체크박스 클릭 (체크)
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()

    // 다시 클릭 (체크 해제)
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  }
}

export const LabelClickInteraction: Story = {
  render: () => (
    <div className="flex items-center">
      <Checkbox id="label-click-test" />
      <label
        htmlFor="label-click-test"
        className="cursor-pointer text-body3">
        라벨 클릭 테스트
      </label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 라벨 찾기
    const label = canvas.getByText('라벨 클릭 테스트')
    const checkbox = canvas.getByRole('checkbox')

    // 초기 상태 확인
    await expect(checkbox).not.toBeChecked()

    // 라벨 클릭으로 체크박스 토글
    await userEvent.click(label)
    await expect(checkbox).toBeChecked()

    // 라벨 다시 클릭으로 체크 해제
    await userEvent.click(label)
    await expect(checkbox).not.toBeChecked()
  }
}
