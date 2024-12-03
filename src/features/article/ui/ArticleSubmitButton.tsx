import Button from '@/shared/ui/button'

interface ArticleSubmitButtonProps {
  onClick: () => void
}

const ArticleSubmitButton = ({ onClick }: ArticleSubmitButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-[10rem] self-end rounded-[2rem]">
      탈고
    </Button>
  )
}

export default ArticleSubmitButton
