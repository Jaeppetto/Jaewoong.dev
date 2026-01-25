import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator
} from './select'

const meta: Meta<typeof Select> = {
  title: 'shared/shadcn-ui/Select',
  component: Select,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="옵션을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="카테고리 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>프론트엔드</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>백엔드</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="react">
      <SelectTrigger className="w-[200px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="angular">Angular</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="비활성화됨" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="플랜 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">무료</SelectItem>
        <SelectItem value="pro">프로</SelectItem>
        <SelectItem
          value="enterprise"
          disabled>
          엔터프라이즈 (준비중)
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="국가 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="kr">대한민국</SelectItem>
        <SelectItem value="us">미국</SelectItem>
        <SelectItem value="jp">일본</SelectItem>
        <SelectItem value="cn">중국</SelectItem>
        <SelectItem value="uk">영국</SelectItem>
        <SelectItem value="de">독일</SelectItem>
        <SelectItem value="fr">프랑스</SelectItem>
        <SelectItem value="ca">캐나다</SelectItem>
        <SelectItem value="au">호주</SelectItem>
        <SelectItem value="br">브라질</SelectItem>
      </SelectContent>
    </Select>
  )
}
