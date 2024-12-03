import { cn } from '@/shared/shadcn-ui/util'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Link } from '@tanstack/react-router'

/**
 * TODO: /article 페이지에서 스크롤 시 게시글 제목으로 전환 애니메이션
 */
const Header = () => {
  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-50 flex h-[7.6rem] w-[100dvw] items-center justify-center border-b border-none bg-white/70 backdrop-blur-sm transition-shadow duration-300'
      )}>
      <div className="flex h-full w-full max-w-[108rem] items-center justify-between px-10">
        <div className="flex items-center gap-[3.2rem]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden bg-transparent p-0 transition-transform duration-300 ease-in-out hover:scale-105 sm:block">
            <img
              src="/signature.png"
              alt="signature"
              width={120}
              height={100}
              className="translate-y-[0.4rem] rotate-[20deg] select-none"
            />
          </button>
          <div className="flex w-[20rem] flex-shrink-0 justify-between">
            <Link
              to="/about"
              className="text-[1.8rem] font-normal leading-[2.1rem] text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900 [&.active]:font-extrabold [&.active]:text-slate-900">
              About
            </Link>
            <Link
              to="/article"
              className="text-[1.8rem] font-normal leading-[2.1rem] text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900 [&.active]:font-extrabold [&.active]:text-slate-900">
              Article
            </Link>
            <Link
              to="/archive"
              className="text-[1.8rem] font-normal leading-[2.1rem] text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900 [&.active]:font-extrabold [&.active]:text-slate-900">
              Archive
            </Link>
          </div>
        </div>
        <div>
          <a
            href="https://github.com/Jaeppetto"
            target="_blank">
            <GitHubLogoIcon
              width={30}
              height={30}
              className="text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
