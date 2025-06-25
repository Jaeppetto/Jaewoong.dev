import { cn } from '@/shared/shadcn-ui/util'
import { Link, useLocation, useRouter } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileSidebar } from '@/widgets/navigation'

/**
 * TODO: /article 페이지에서 스크롤 시 게시글 제목으로 전환 애니메이션
 */
const Header = () => {
  const router = useRouter()
  const { pathname } = useLocation()
  const [, subPath, category, postTitle] = pathname.split('/')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-50 flex h-[7.6rem] w-[100dvw] items-center justify-center border-b border-none bg-white/70 backdrop-blur-sm transition-shadow duration-300'
      )}>
      <div className="flex h-full w-full max-w-[108rem] items-center justify-between px-10">
        <div className="flex items-center gap-[3.2rem]">
          <button
            // onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onClick={() =>
              router.navigate({ to: '/article', search: { page: 1 } })
            }
            className="hidden p-0 bg-transparent transition-transform duration-300 ease-in-out hover:scale-105 sm:block">
            <img
              src="/signature.png"
              alt="signature"
              width={120}
              height={100}
              className="translate-y-[0.4rem] rotate-[20deg] select-none"
            />
          </button>
          <div className="flex w-[20rem] flex-shrink-0 select-none justify-between">
            {/* <Link
              to="/about"
              className={cn(
                'text-[1.8rem] font-normal leading-[2.1rem] text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900',
                subPath === 'about' && 'font-extrabold text-slate-900'
              )}>
              About
            </Link> */}
            <Link
              to="/article"
              search={{ page: 1 }}
              className={cn(
                'text-[1.8rem] font-normal leading-[2.1rem] text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900',
                subPath === 'article' && 'font-extrabold text-slate-900'
              )}>
              Article
            </Link>
            {/* <Link
              disabled
              to="/archive"
              className={cn(
                'text-[1.8rem] font-normal leading-[2.1rem] text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-300',
                subPath === 'archive' && 'font-extrabold text-slate-900'
              )}>
              Archive
            </Link> */}
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="block p-2 sm:hidden"
          aria-label="메뉴 열기">
          <Menu
            size={24}
            className="text-slate-700"
          />
        </button>
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentCategory={category || ''}
        currentPost={postTitle || ''}
      />
    </div>
  )
}

export default Header
