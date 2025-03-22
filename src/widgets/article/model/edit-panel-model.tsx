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

enum EditPanelButtonType {
  THUMBNAIL = 'thumbnail',
  IMAGE = 'image',
  HIGHLIGHTER = 'highlighter',
  FOLDABLE_CARD = 'foldable-card',
  INLINE_CODE = 'inline-code',
  CODE_BLOCK = 'code-block',
  PREVIEW = 'preview'
}

interface EditPanelItem {
  type: EditPanelButtonType
  icon: React.ReactNode
  subPanel?: React.ReactNode
  showDividerAfter?: boolean
}

export const EDIT_PANEL_MODEL: EditPanelItem[] = [
  {
    type: EditPanelButtonType.THUMBNAIL,
    icon: (
      <ImagesIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    showDividerAfter: false
  },
  {
    type: EditPanelButtonType.IMAGE,
    icon: (
      <ImagePlusIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    showDividerAfter: false
  },
  {
    type: EditPanelButtonType.HIGHLIGHTER,
    icon: (
      <Highlighter
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    subPanel: <HighlighterSubPanel onClick={() => {}} />,
    showDividerAfter: false
  },
  {
    type: EditPanelButtonType.FOLDABLE_CARD,
    icon: (
      <CardStackIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    subPanel: <FoldableCardSubPanel onClick={() => {}} />,
    showDividerAfter: true
  },
  {
    type: EditPanelButtonType.INLINE_CODE,
    icon: (
      <Code
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    showDividerAfter: false
  },
  {
    type: EditPanelButtonType.CODE_BLOCK,
    icon: (
      <Code2
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    showDividerAfter: true
  },
  {
    type: EditPanelButtonType.PREVIEW,
    icon: (
      <EyeIcon
        width={20}
        height={20}
        className="text-gray-500"
      />
    ),
    showDividerAfter: true
  }
]
