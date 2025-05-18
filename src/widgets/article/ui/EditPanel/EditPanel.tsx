import { EditPanelButton } from '@/entities'
import { Separator } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'

import React, { useCallback } from 'react'

import {
  EDIT_PANEL_MODEL,
  EditPanelButtonType,
  FoldableCardSubPanel,
  HighlighterSubPanel
} from '@/widgets'
import { ImageUploader, useEditorContext } from '@/features'

interface EditPanelProps {
  className?: string
}

export const EditPanel: React.FC<EditPanelProps> = ({ className = '' }) => {
  const { tempId, togglePreview, appendContent, updateMeta } =
    useEditorContext()

  const handlePanelButtonClick = useCallback(
    (type: string, value?: string) => {
      switch (type) {
        case EditPanelButtonType.HIGHLIGHTER:
          if (value) {
            appendContent(`
<Highlight color="${value}" children="텍스트 입력"/>
`)
          }
          break

        case EditPanelButtonType.FOLDABLE_CARD:
          if (value) {
            appendContent(`
<FoldableCard color="${value}" label="라벨" title="제목" content="내용" isFoldable/>`)
          }
          break

        case EditPanelButtonType.CODE_BLOCK:
        case EditPanelButtonType.INLINE_CODE:
          // TODO: 코드라인, 코드블럭 구현
          break

        case EditPanelButtonType.PREVIEW:
          togglePreview()
          break

        default:
          break
      }
    },
    [togglePreview, appendContent]
  )

  const handleThumbnailUpload = useCallback(
    (imageUrl: string) => {
      updateMeta('thumbnail', imageUrl)
    },
    [updateMeta]
  )

  const handleImageUpload = useCallback(
    (imageUrl: string) => {
      appendContent(`\n\n![image](${imageUrl})\n\n`)
    },
    [appendContent]
  )

  return (
    <div
      className={cn(
        'fixed left-10 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-default',
        className
      )}>
      {EDIT_PANEL_MODEL.map(item => {
        let clickHandler
        let subPanelContent

        switch (item.type) {
          case EditPanelButtonType.THUMBNAIL:
            clickHandler = () => {}
            subPanelContent = (
              <ImageUploader
                tempId={tempId}
                type="thumbnail"
                onUploadComplete={handleThumbnailUpload}
                onUploadError={error =>
                  console.error('썸네일 업로드 실패:', error)
                }
                className="w-full"
              />
            )
            break

          case EditPanelButtonType.IMAGE:
            clickHandler = () => {}
            subPanelContent = (
              <ImageUploader
                tempId={tempId}
                type="content"
                onUploadComplete={handleImageUpload}
                onUploadError={error =>
                  console.error('이미지 업로드 실패:', error)
                }
                className="w-full"
              />
            )
            break

          case EditPanelButtonType.HIGHLIGHTER:
            clickHandler = () => {}
            subPanelContent = (
              <HighlighterSubPanel
                onClick={color =>
                  handlePanelButtonClick(item.type, color as string)
                }
              />
            )
            break

          case EditPanelButtonType.FOLDABLE_CARD:
            clickHandler = () => {}
            subPanelContent = (
              <FoldableCardSubPanel
                onClick={color =>
                  handlePanelButtonClick(item.type, color as string)
                }
              />
            )
            break

          default:
            clickHandler = () => handlePanelButtonClick(item.type)
            break
        }

        return (
          <React.Fragment key={item.type}>
            <EditPanelButton
              icon={item.icon}
              onClick={clickHandler}
              subPanel={subPanelContent}
            />
            {item.showDividerAfter && <Separator orientation="horizontal" />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default EditPanel
