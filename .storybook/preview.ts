import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/app/styles/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    a11y: {
      // 'todo' - show a11y violations in the test UI only (default)
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      // Note: 'error' 설정 시 색상 대비(color-contrast) 이슈로 다수 실패
      // 접근성 개선 후 'error'로 변경 권장
      test: 'todo',
    },
  },
  decorators: [
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
