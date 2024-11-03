import { cn } from '@/shared/util'
import { useRouter } from '@tanstack/react-router'

interface CategoryButtonProps {
  category: string
  className?: string
}

const CategoryButton = ({ category, className }: CategoryButtonProps) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.navigate({ to: `/archive/${category}` })}
      className={cn(
        'ease-[cubic-bezier(0.34,1.56,0.64,1)] flex cursor-pointer items-center justify-center rounded-[10rem] border border-slate-200 bg-white p-[2.4rem] px-[4.2rem] py-[2rem] shadow-default transition-all duration-500 hover:scale-[1.03]',
        className
      )}>
      <p className="text-[2.4rem] font-extrabold leading-[2.9rem] text-slate-900">
        {category}
      </p>
    </button>
  )
}

export default CategoryButton
