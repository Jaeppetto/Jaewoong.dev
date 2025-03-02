import { CardStackIcon } from 'node_modules/@radix-ui/react-icons/dist'
import {
  Code,
  Code2,
  EyeIcon,
  Highlighter,
  ImagePlusIcon,
  ImagesIcon
} from 'lucide-react'
import { FoldableCardSubPanel, HighlighterSubPanel } from '@/widgets'

interface EditPanelModel {
  icon: React.ReactNode
  tooltip: string
  onClick?: () => void
  subPanel?: React.ReactNode
  showDividerAfter?: boolean
}

export const EDIT_PANEL_MODEL: EditPanelModel[] = [
  {
    icon: (
      <ImagesIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    tooltip: '썸네일 설정',
    onClick: () => {},
    showDividerAfter: false
  },
  {
    icon: (
      <ImagePlusIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    tooltip: '이미지 추가',
    onClick: () => {},
    showDividerAfter: false
  },
  {
    icon: (
      <EyeIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    tooltip: 'MDX 미리보기',
    onClick: () => {},
    showDividerAfter: true
  },
  {
    icon: (
      <Highlighter
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    tooltip: '텍스트 하이라이트',
    subPanel: <HighlighterSubPanel onClick={() => {}} />,
    showDividerAfter: false
  },
  {
    icon: (
      <CardStackIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    tooltip: '폴더 카드',
    subPanel: <FoldableCardSubPanel onClick={() => {}} />,
    showDividerAfter: true
  },
  {
    icon: (
      <Code
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    tooltip: '인라인 코드',
    onClick: () => {},
    showDividerAfter: false
  },
  {
    icon: (
      <Code2
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    tooltip: '코드 블록',
    onClick: () => {},
    showDividerAfter: false
  }
]
