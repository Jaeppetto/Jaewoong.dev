import { cn } from '@/shared/shadcn-ui/util'

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-[1.2rem] bg-slate-50', className)}
      {...props}
    />
  )
}

export { Skeleton }
