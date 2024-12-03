import { cn } from '@/shared/shadcn-ui/util'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Link, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/shared/auth/hooks/useAuth'
import { useGoogleAuth } from '@/shared/auth/hooks/useGoogleAuth'
import {} from '@/shared/shadcn-ui/ui/dropdown-menu'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared/shadcn-ui/ui'

/**
 * TODO: /article 페이지에서 스크롤 시 게시글 제목으로 전환 애니메이션
 */
const Header = () => {
  const { user, isAuthenticated, signOut } = useAuth()
  const { signInWithGoogle } = useGoogleAuth()
  const router = useRouter()

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
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Jaeppetto"
            target="_blank">
            <GitHubLogoIcon
              width={30}
              height={30}
              className="text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900"
            />
          </a>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.user_metadata.avatar_url}
                      alt={user?.email}
                    />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <span className="text-sm text-muted-foreground">
                    {user?.email}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.navigate({ to: '/article/writing' })}>
                  Write
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
