import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/shared/shadcn-ui/util'

export interface InlineCodeProps extends ComponentPropsWithoutRef<'code'> {
  children?: React.ReactNode
}

export const InlineCode = ({
  children,
  className,
  ...props
}: InlineCodeProps) => {
  return (
    <code
      className={cn(
        'rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xl font-medium text-gray-900',
        'dark:bg-gray-800 dark:text-gray-100',
        'border border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}>
      {children}
    </code>
  )
}

export default InlineCode
