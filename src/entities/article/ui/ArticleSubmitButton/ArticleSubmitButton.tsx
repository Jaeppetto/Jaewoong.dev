import Button, { ButtonProps } from '@/shared/shadcn-ui/ui/button'

interface ArticleSubmitButtonProps extends ButtonProps {
  onClick: () => void
}

const ArticleSubmitButton = ({
  onClick,
  ...props
}: ArticleSubmitButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-[10rem] self-end rounded-[2rem]"
      {...props}>
      탈고
    </Button>
  )
}

export default ArticleSubmitButton
