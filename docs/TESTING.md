# 테스트 가이드

이 프로젝트는 **Storybook 10 + Vitest** 통합을 사용하여 컴포넌트를 테스트합니다.

## 목차

- [개요](#개요)
- [테스트 종류](#테스트-종류)
- [테스트 작성 방법](#테스트-작성-방법)
- [테스트 실행 방법](#테스트-실행-방법)
- [테스트 유틸리티 레퍼런스](#테스트-유틸리티-레퍼런스)
- [실전 예제](#실전-예제)
- [A11y (접근성) 테스트](#a11y-접근성-테스트)
- [트러블슈팅](#트러블슈팅)

---

## 개요

스토리 파일(`.stories.tsx`)이 곧 테스트 파일입니다. 별도의 테스트 파일 없이 컴포넌트를 테스트할 수 있습니다.

### 기술 스택

| 도구 | 역할 |
|------|------|
| Vitest | 테스트 러너 |
| Playwright | 브라우저 환경 제공 |
| Storybook Test | 테스트 유틸리티 (expect, userEvent 등) |
| @storybook/addon-a11y | 접근성 자동 검사 |

### 설정 파일

```
├── vite.config.ts          # Vitest 프로젝트 설정
├── .storybook/
│   ├── main.ts             # Storybook 설정
│   ├── preview.ts          # 전역 데코레이터, A11y 설정
│   └── vitest.setup.ts     # Vitest 초기화
```

---

## 테스트 종류

### 1. 렌더링 테스트 (자동)

모든 스토리는 자동으로 렌더링 테스트가 됩니다. 컴포넌트가 에러 없이 렌더링되는지 확인합니다.

```tsx
// 이것만으로도 렌더링 테스트가 됨
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default'
  }
}
```

### 2. Interaction Test

`play` 함수를 사용하여 사용자 상호작용을 시뮬레이션하고 결과를 검증합니다.

```tsx
export const ClickTest: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalled()
  }
}
```

### 3. A11y 테스트 (자동)

`@storybook/addon-a11y`가 모든 스토리에 접근성 검사를 자동 실행합니다.

---

## 테스트 작성 방법

### 기본 구조

```tsx
// MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within, waitFor } from 'storybook/test'
import { MyComponent } from './MyComponent'

const meta: Meta<typeof MyComponent> = {
  title: 'path/to/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// 기본 스토리 (렌더링 테스트)
export const Default: Story = {
  args: { /* props */ }
}

// Interaction Test
export const WithInteraction: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    // 테스트 로직
  }
}
```

### play 함수 파라미터

```tsx
play: async ({
  args,           // 스토리에 전달된 args
  canvasElement,  // 스토리가 렌더링된 DOM 요소
  step,           // 테스트 단계 그룹화 (선택)
}) => {
  // 테스트 로직
}
```

### step으로 테스트 그룹화

```tsx
play: async ({ canvasElement, step }) => {
  const canvas = within(canvasElement)

  await step('폼 입력', async () => {
    await userEvent.type(canvas.getByLabelText('이름'), '홍길동')
    await userEvent.type(canvas.getByLabelText('이메일'), 'test@example.com')
  })

  await step('폼 제출', async () => {
    await userEvent.click(canvas.getByRole('button', { name: /제출/i }))
  })

  await step('결과 확인', async () => {
    await expect(canvas.getByText('성공')).toBeInTheDocument()
  })
}
```

---

## 테스트 실행 방법

### CLI 명령어

```bash
# 모든 스토리 테스트 실행
pnpm vitest --project=storybook --run

# Watch 모드 (파일 변경 시 자동 재실행)
pnpm vitest --project=storybook

# 특정 파일만 테스트
pnpm vitest --project=storybook --run button.stories

# 특정 테스트만 실행
pnpm vitest --project=storybook --run -t "Click Interaction"

# 상세 출력
pnpm vitest --project=storybook --run --reporter=verbose
```

### Storybook UI에서 테스트

```bash
pnpm storybook
```

1. http://localhost:6006 접속
2. 스토리 선택
3. 하단 **Interactions** 패널에서 play 함수 실행 과정 확인
4. **Accessibility** 패널에서 A11y 검사 결과 확인

---

## 테스트 유틸리티 레퍼런스

### Import

```tsx
import {
  expect,      // Jest 스타일 assertion
  fn,          // mock 함수 생성
  userEvent,   // 사용자 이벤트 시뮬레이션
  within,      // 특정 요소 내에서 쿼리
  waitFor,     // 비동기 대기
} from 'storybook/test'
```

### 요소 쿼리

#### Role 기반 (권장)

```tsx
const canvas = within(canvasElement)

canvas.getByRole('button', { name: /submit/i })
canvas.getByRole('textbox')
canvas.getByRole('checkbox')
canvas.getByRole('dialog')
canvas.getByRole('link', { name: /home/i })
canvas.getByRole('heading', { level: 1 })
```

#### 텍스트 기반

```tsx
canvas.getByText('Hello')
canvas.getByLabelText('Email')
canvas.getByPlaceholderText('Enter name')
canvas.getByAltText('Profile image')
canvas.getByTitle('Close')
```

#### 테스트 ID (최후 수단)

```tsx
canvas.getByTestId('my-element')
```

#### 쿼리 변형

| 메서드 | 없을 때 | 여러 개일 때 | 비동기 |
|--------|---------|--------------|--------|
| `getBy` | 에러 | 에러 | No |
| `queryBy` | null | 에러 | No |
| `findBy` | 에러 | 에러 | Yes |
| `getAllBy` | 에러 | 배열 | No |
| `queryAllBy` | [] | 배열 | No |
| `findAllBy` | 에러 | 배열 | Yes |

### Assertion

#### 존재 여부

```tsx
await expect(element).toBeInTheDocument()
await expect(element).not.toBeInTheDocument()
```

#### 상태

```tsx
await expect(button).toBeDisabled()
await expect(button).toBeEnabled()
await expect(checkbox).toBeChecked()
await expect(element).toBeVisible()
await expect(element).toHaveFocus()
```

#### 속성/값

```tsx
await expect(input).toHaveValue('hello')
await expect(element).toHaveAttribute('disabled')
await expect(element).toHaveAttribute('href', '/home')
await expect(element).toHaveClass('active')
await expect(element).toHaveStyle({ color: 'red' })
```

#### Mock 함수

```tsx
await expect(mockFn).toHaveBeenCalled()
await expect(mockFn).toHaveBeenCalledTimes(1)
await expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
await expect(mockFn).not.toHaveBeenCalled()
```

### 사용자 이벤트

#### 클릭

```tsx
await userEvent.click(button)
await userEvent.dblClick(element)
await userEvent.tripleClick(element)
```

#### 타이핑

```tsx
await userEvent.type(input, 'Hello World')
await userEvent.clear(input)
await userEvent.type(input, 'text{Enter}')  // 텍스트 입력 후 Enter
```

#### 키보드

```tsx
await userEvent.keyboard('{Enter}')
await userEvent.keyboard('{Escape}')
await userEvent.keyboard('{Tab}')
await userEvent.keyboard('{Backspace}')
await userEvent.keyboard('{ArrowDown}')
await userEvent.keyboard('[ControlLeft>]a')  // Ctrl+A
```

#### 마우스

```tsx
await userEvent.hover(element)
await userEvent.unhover(element)
```

#### 포커스

```tsx
await userEvent.tab()
await userEvent.tab({ shift: true })  // Shift+Tab
```

#### 선택

```tsx
// Select 요소
await userEvent.selectOptions(select, 'option-value')
await userEvent.selectOptions(select, ['option1', 'option2'])
```

### 비동기 대기

```tsx
// 조건이 충족될 때까지 대기
await waitFor(() => {
  expect(element).toBeInTheDocument()
})

// 타임아웃 지정
await waitFor(
  () => expect(element).toBeInTheDocument(),
  { timeout: 3000 }
)

// 비동기 요소 찾기
const dialog = await canvas.findByRole('dialog')
```

---

## 실전 예제

### 버튼 클릭 테스트

```tsx
export const ClickInteraction: Story = {
  args: {
    children: 'Click me',
    onClick: fn()
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })

    await expect(button).toBeInTheDocument()
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  }
}
```

### 다이얼로그 열기/닫기 테스트

```tsx
export const DialogInteraction: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>제목</DialogTitle>
        <DialogClose asChild>
          <Button>닫기</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // 다이얼로그 열기
    await userEvent.click(canvas.getByRole('button', { name: /열기/i }))

    // 다이얼로그 확인
    const dialog = await within(document.body).findByRole('dialog')
    await expect(dialog).toBeInTheDocument()

    // 닫기
    await userEvent.click(within(dialog).getByRole('button', { name: /닫기/i }))

    // 닫힘 확인
    await waitFor(() => {
      expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument()
    })
  }
}
```

### 체크박스 토글 테스트

```tsx
export const CheckboxInteraction: Story = {
  render: () => (
    <div className="flex items-center">
      <Checkbox id="test" aria-label="동의" />
      <label htmlFor="test">이용약관에 동의합니다</label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checkbox = canvas.getByRole('checkbox', { name: /동의/i })

    // 초기 상태
    await expect(checkbox).not.toBeChecked()

    // 체크
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()

    // 체크 해제
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  }
}
```

### 폼 제출 테스트

```tsx
export const FormSubmitInteraction: Story = {
  args: {
    onSubmit: fn()
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByLabelText('이름'), '홍길동')
    await userEvent.type(canvas.getByLabelText('이메일'), 'hong@example.com')

    await expect(canvas.getByLabelText('이름')).toHaveValue('홍길동')

    await userEvent.click(canvas.getByRole('button', { name: /제출/i }))

    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: '홍길동',
      email: 'hong@example.com'
    })
  }
}
```

---

## A11y (접근성) 테스트

### 설정

`.storybook/preview.ts`에서 A11y 테스트 레벨을 설정합니다:

```ts
parameters: {
  a11y: {
    test: 'todo',   // UI에 표시만 (기본값)
    // test: 'error', // 위반 시 테스트 실패
    // test: 'off',   // 검사 안 함
  },
}
```

### 특정 스토리에서 A11y 비활성화

```tsx
export const SkipA11y: Story = {
  parameters: {
    a11y: { test: 'off' }
  }
}
```

### 특정 규칙 비활성화

```tsx
export const DisableColorContrast: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false }
        ]
      }
    }
  }
}
```

### 현재 발견된 A11y 이슈

색상 대비 비율 미달 컴포넌트 (4.5:1 필요):

- Button (destructive variant)
- Highlight 컴포넌트 색상들
- FoldableCard 색상들
- Checkbox (label 없이 단독 사용 시)

---

## 트러블슈팅

### `pointer-events: none` 에러

비활성화된 요소는 `userEvent.click`이 작동하지 않습니다.

```tsx
// ❌ 에러 발생
await userEvent.click(disabledButton)

// ✅ 상태만 확인
await expect(button).toBeDisabled()
```

### 다이얼로그/포털 요소 찾기

포털로 렌더링되는 요소는 `document.body`에서 찾아야 합니다.

```tsx
// ❌ canvasElement에서 찾을 수 없음
const dialog = canvas.getByRole('dialog')

// ✅ document.body에서 찾기
const dialog = await within(document.body).findByRole('dialog')
```

### 비동기 요소 대기

애니메이션이 있는 요소는 `waitFor` 또는 `findBy`를 사용합니다.

```tsx
// ❌ 즉시 확인 시 실패할 수 있음
expect(element).toBeInTheDocument()

// ✅ 비동기 대기
await waitFor(() => expect(element).toBeInTheDocument())
// 또는
const element = await canvas.findByRole('dialog')
```

### Mock 함수 초기화

각 스토리는 독립적으로 실행되므로 mock 함수는 자동으로 초기화됩니다.

```tsx
// fn()은 각 스토리마다 새로 생성됨
args: {
  onClick: fn()
}
```

---

## 참고 자료

- [Storybook Testing Docs](https://storybook.js.org/docs/writing-tests)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Vitest Docs](https://vitest.dev/)
- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
