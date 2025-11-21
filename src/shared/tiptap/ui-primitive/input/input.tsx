import { cn } from "@/shared/tiptap/lib/tiptap-utils"
import "@/shared/tiptap/ui-primitive/input/input.scss"

const Input = ({ className, type, ...props }: React.ComponentProps<"input">) => {
  return (
    <input type={type} className={cn("tiptap-input", className)} {...props} />
  )
}

const InputGroup = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("tiptap-input-group", className)} {...props}>
      {children}
    </div>
  )
}

export { Input, InputGroup }
