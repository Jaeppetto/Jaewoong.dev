import type { Meta, StoryObj } from '@storybook/react-vite'
import FoldableCard from './FoldableCard'

const meta: Meta<typeof FoldableCard> = {
  title: 'entities/mdx/FoldableCard',
  component: FoldableCard,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['yellow', 'navy', 'blue', 'red']
    },
    isFoldable: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    title: {
      control: 'text'
    },
    content: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Yellow: Story = {
  args: {
    color: 'yellow',
    isFoldable: true,
    label: 'TIP',
    title: '유용한 팁입니다',
    content: '이것은 접을 수 있는 카드의 내용입니다. 클릭하면 열리고 닫힙니다.'
  }
}

export const Navy: Story = {
  args: {
    color: 'navy',
    isFoldable: true,
    label: 'NOTE',
    title: '참고 사항',
    content: '이 내용은 중요한 참고 사항입니다. 꼭 확인해주세요.'
  }
}

export const Blue: Story = {
  args: {
    color: 'blue',
    isFoldable: true,
    label: 'INFO',
    title: '추가 정보',
    content: '더 자세한 내용을 알고 싶다면 공식 문서를 참고하세요.'
  }
}

export const Red: Story = {
  args: {
    color: 'red',
    isFoldable: true,
    label: 'WARNING',
    title: '주의사항',
    content: '이 작업은 되돌릴 수 없습니다. 신중하게 진행해주세요.'
  }
}

export const NotFoldable: Story = {
  args: {
    color: 'yellow',
    isFoldable: false,
    label: 'NOTICE',
    title: '이 카드는 접을 수 없습니다'
  }
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <FoldableCard
        color="yellow"
        isFoldable={true}
        label="TIP"
        title="Yellow 카드"
        content="노란색 카드입니다."
      />
      <FoldableCard
        color="navy"
        isFoldable={true}
        label="NOTE"
        title="Navy 카드"
        content="네이비색 카드입니다."
      />
      <FoldableCard
        color="blue"
        isFoldable={true}
        label="INFO"
        title="Blue 카드"
        content="파란색 카드입니다."
      />
      <FoldableCard
        color="red"
        isFoldable={true}
        label="WARNING"
        title="Red 카드"
        content="빨간색 카드입니다."
      />
    </div>
  )
}
