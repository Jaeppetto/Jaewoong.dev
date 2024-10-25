import { cn } from '@/lib/utils'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Link } from '@tanstack/react-router'

/**
 * TODO: /article 페이지에서 스크롤 시 게시글 제목으로 전환 애니메이션
 */
const Header = () => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[7.6rem] border-none bg-white/70 backdrop-blur-sm w-[100dvw] flex items-center justify-center transition-shadow duration-300 border-b'
      )}>
      <div className="flex items-center justify-between h-full w-full max-w-[108rem] px-10">
        <div className="flex items-center gap-[3.2rem]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hidden p-0 transition-transform duration-300 ease-in-out bg-transparent sm:block hover:scale-105">
            <img
              src="/signature.png"
              alt="signature"
              width={120}
              height={100}
              className="rotate-[20deg] translate-y-[0.4rem] select-none"
            />
          </button>
          <div className="flex w-[20rem] justify-between flex-shrink-0">
            <Link
              to="/about"
              className="[&.active]:font-extrabold text-[1.8rem] leading-[2.1rem] font-normal text-slate-300 [&.active]:text-slate-900 hover:text-slate-900 transition-colors duration-300 ease-in-out">
              About
            </Link>
            <Link
              to="/article"
              className="[&.active]:font-extrabold text-[1.8rem] leading-[2.1rem] font-normal text-slate-300 [&.active]:text-slate-900 hover:text-slate-900 transition-colors duration-300 ease-in-out">
              Article
            </Link>
            <Link
              to="/archive"
              className="[&.active]:font-extrabold text-[1.8rem] leading-[2.1rem] font-normal text-slate-300 [&.active]:text-slate-900 hover:text-slate-900 transition-colors duration-300 ease-in-out">
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
              className="transition-colors duration-300 ease-in-out hover:text-slate-900 text-slate-300"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
