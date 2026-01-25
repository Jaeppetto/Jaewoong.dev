import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from './accordion'

const meta = {
  title: 'shared/shadcn-ui/Accordion',
  component: Accordion,
  tags: ['autodocs']
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    type: 'single',
    collapsible: true,
    className: 'w-full max-w-md'
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>React란 무엇인가요?</AccordionTrigger>
        <AccordionContent>
          React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.
          컴포넌트 기반 아키텍처를 사용하여 재사용 가능한 UI를 만들 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>TypeScript의 장점은?</AccordionTrigger>
        <AccordionContent>
          TypeScript는 정적 타입 검사를 제공하여 런타임 에러를 줄이고, IDE의
          자동완성 기능을 향상시키며, 코드의 가독성과 유지보수성을 높입니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Storybook을 사용하는 이유는?</AccordionTrigger>
        <AccordionContent>
          Storybook은 컴포넌트를 독립적으로 개발하고 문서화할 수 있게 해주며, UI
          테스트와 디자인 시스템 구축에 유용합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
    className: 'w-full max-w-md'
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Frontend</AccordionTrigger>
        <AccordionContent>
          React, Vue, Angular, Svelte 등의 프레임워크를 사용하여 사용자
          인터페이스를 구축합니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Backend</AccordionTrigger>
        <AccordionContent>
          Node.js, Python, Java, Go 등을 사용하여 서버 로직과 API를 개발합니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>DevOps</AccordionTrigger>
        <AccordionContent>
          Docker, Kubernetes, CI/CD 파이프라인을 통해 애플리케이션을 배포하고
          관리합니다.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const DefaultOpen: Story = {
  args: {
    type: 'single',
    defaultValue: 'item-1',
    className: 'w-full max-w-md'
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>기본으로 열린 항목</AccordionTrigger>
        <AccordionContent>
          이 항목은 기본적으로 열려있습니다. defaultValue prop을 사용하여 초기에
          열릴 항목을 지정할 수 있습니다.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>닫힌 항목</AccordionTrigger>
        <AccordionContent>이 항목은 기본적으로 닫혀있습니다.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export const FAQ: Story = {
  args: {
    type: 'single',
    collapsible: true
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <h2 className="mb-4 text-h3 font-bold">자주 묻는 질문</h2>
      <Accordion {...args}>
        <AccordionItem value="q1">
          <AccordionTrigger>배송은 얼마나 걸리나요?</AccordionTrigger>
          <AccordionContent>
            일반 배송은 2-3일, 빠른 배송은 1일 이내에 도착합니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>환불 정책은 어떻게 되나요?</AccordionTrigger>
          <AccordionContent>
            상품 수령 후 7일 이내에 환불 요청이 가능합니다. 단, 상품이 훼손되지
            않은 경우에 한합니다.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>회원 등급은 어떻게 올릴 수 있나요?</AccordionTrigger>
          <AccordionContent>
            월별 구매 금액에 따라 자동으로 등급이 조정됩니다. VIP 등급은 월
            50만원 이상 구매 시 적용됩니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
