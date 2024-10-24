import { cn } from '@/lib/utils'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import {
  CalendarDays,
  EarthIcon,
  PencilLineIcon,
  VideoIcon
} from 'lucide-react'
import { useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  logoImage?: string
  bgImage?: string
  stacks?: string[]
  links?: {
    github: string
    website: string
    blog: string
    video: string
  }
  date?: {
    from: string
    to: string
  }
  themeColor?: string
  className?: string
}

const StackBadge = ({ stack }: { stack: string }) => {
  return (
    <div className="bg-slate-100 rounded-[0.6rem] flex justify-center items-center text-[1.4rem] leading-[2rem] py-[0.2rem] px-[0.6rem] select-none">
      {stack}
    </div>
  )
}

const ProjectCard = ({
  title,
  description,
  logoImage,
  bgImage,
  stacks,
  date,
  links,
  themeColor,
  className
}: ProjectCardProps) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={cn(
        'w-[36.4rem] flex flex-col justify-between items-start h-[22rem] bg-white border border-slate-200 rounded-[1.2rem] shadow-default p-[1.2rem] cursor-pointer hover:scale-[1.03] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className="flex flex-wrap gap-[0.8rem]">
        {stacks?.map(stack => <StackBadge stack={stack} />)}
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <div className="flex items-center gap-[0.6rem] mb-[0.5rem]">
          {links?.github && (
            <a onClick={() => window.open(links?.github, '_blank')}>
              <GitHubLogoIcon className="transition-colors cursor-pointer text-slate-300 hover:text-slate-900 w-[1.6rem] h-[1.6rem]" />
            </a>
          )}
          {links?.website && (
            <a onClick={() => window.open(links?.website, '_blank')}>
              <EarthIcon className="transition-colors cursor-pointer text-slate-300 hover:text-slate-900 w-[1.6rem] h-[1.6rem]" />
            </a>
          )}
          {links?.video && (
            <a onClick={() => window.open(links?.video, '_blank')}>
              <VideoIcon className="transition-colors cursor-pointer text-slate-300 hover:text-slate-900 w-[1.6rem] h-[1.6rem]" />
            </a>
          )}
          {links?.blog && (
            <a onClick={() => window.open(links?.blog, '_blank')}>
              <PencilLineIcon className="transition-colors cursor-pointer text-slate-300 hover:text-slate-900 w-[1.6rem] h-[1.6rem]" />
            </a>
          )}
        </div>
        <div>
          <h3 className="relative inline-block mb-[0.5rem] text-[2rem] leading-[2rem] text-slate-900 font-bold">
            <span className="relative z-10">{title}</span>
            <div
              className={cn(
                'absolute top-[0.6rem] -left-[0.25rem] -right-[0.25rem] h-[1.8rem] bg-yellow-200/40 -rotate-1 scale-x-0 origin-left transition-transform duration-300 ease-in-out',
                isHover && 'scale-x-100'
              )}
              style={{ backgroundColor: themeColor, opacity: 0.75 }}
            />
          </h3>
        </div>

        <p className="text-[1.4rem] leading-[2rem] font-normal">
          {description}
        </p>
        <div className="text-[1.4rem] leading-[2rem] flex items-center gap-[0.4rem]">
          <CalendarDays
            size={16}
            className="text-slate-500 text-[1.2rem] leading-[1.6rem] font-normal"
          />
          <span className="text-slate-500">
            {date?.from} ~ {date?.to}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
