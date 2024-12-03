import { cn } from '@/shared/util'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import dayjs from 'dayjs'
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
    from: Date
    to: Date
  }
  themeColor?: string
  className?: string
}

const StackBadge = ({ stack }: { stack: string }) => {
  return (
    <div className="flex select-none items-center justify-center rounded-[0.6rem] bg-slate-100 px-[0.6rem] py-[0.2rem] text-[1.4rem] leading-[2rem]">
      {stack}
    </div>
  )
}

const ProjectCard = ({
  title,
  description,
  // logoImage,
  // bgImage,
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
        'ease-[cubic-bezier(0.34,1.56,0.64,1)] flex h-[22rem] w-[36.4rem] cursor-pointer flex-col items-start justify-between rounded-[1.2rem] border border-slate-200 bg-white p-[1.2rem] shadow-default transition-all duration-500 hover:scale-[1.03]',
        className
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      <div className="flex flex-wrap gap-[0.8rem]">
        {stacks?.map(stack => <StackBadge stack={stack} />)}
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <div className="mb-[0.5rem] flex items-center gap-[0.6rem]">
          {links?.github && (
            <a onClick={() => window.open(links?.github, '_blank')}>
              <GitHubLogoIcon className="h-[1.6rem] w-[1.6rem] cursor-pointer text-slate-300 transition-colors hover:text-slate-900" />
            </a>
          )}
          {links?.website && (
            <a onClick={() => window.open(links?.website, '_blank')}>
              <EarthIcon className="h-[1.6rem] w-[1.6rem] cursor-pointer text-slate-300 transition-colors hover:text-slate-900" />
            </a>
          )}
          {links?.video && (
            <a onClick={() => window.open(links?.video, '_blank')}>
              <VideoIcon className="h-[1.6rem] w-[1.6rem] cursor-pointer text-slate-300 transition-colors hover:text-slate-900" />
            </a>
          )}
          {links?.blog && (
            <a onClick={() => window.open(links?.blog, '_blank')}>
              <PencilLineIcon className="h-[1.6rem] w-[1.6rem] cursor-pointer text-slate-300 transition-colors hover:text-slate-900" />
            </a>
          )}
        </div>
        <div>
          <h3 className="relative mb-[0.5rem] inline-block text-[2rem] font-bold leading-[2rem] text-slate-900">
            <span className="relative z-10">{title}</span>
            <div
              className={cn(
                'absolute -left-[0.25rem] -right-[0.25rem] top-[0.6rem] h-[1.8rem] origin-left -rotate-1 scale-x-0 bg-yellow-200/40 transition-transform duration-300 ease-in-out',
                isHover && 'scale-x-100'
              )}
              style={{ backgroundColor: themeColor, opacity: 0.75 }}
            />
          </h3>
        </div>

        <p className="text-[1.4rem] font-normal leading-[2rem]">
          {description}
        </p>
        <div className="flex items-center gap-[0.4rem] text-[1.4rem] leading-[2rem]">
          <CalendarDays
            size={16}
            className="text-[1.2rem] font-normal leading-[1.6rem] text-slate-500"
          />
          <span className="text-slate-500">
            {dayjs(date?.from).format('YYYY.MM.DD')} ~{' '}
            {dayjs(date?.to).format('YYYY.MM.DD')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
