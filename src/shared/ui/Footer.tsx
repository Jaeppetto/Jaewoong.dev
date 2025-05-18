import { GitHubLogoIcon } from '@radix-ui/react-icons'

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

import { useAuth } from '@/shared/auth/hooks/useAuth'
import { useGoogleAuth } from '@/shared/auth/hooks/useGoogleAuth'
import { useRouter } from '@tanstack/react-router'
import { Mailbox } from 'lucide-react'

const Footer = () => {
  const { user, isAuthenticated, signOut } = useAuth()
  const { signInWithGoogle } = useGoogleAuth()
  const router = useRouter()

  return (
    <div className="flex h-[7.4rem] w-[100dvw] items-center justify-center bg-slate-100">
      <div className="flex h-full max-w-[108rem] flex-1 items-center justify-between gap-4 px-10 sm:px-0">
        <div className="flex gap-8">
          <a
            href="https://github.com/Jaeppetto"
            target="_blank"
            className="flex items-center gap-2">
            <GitHubLogoIcon
              width={24}
              height={24}
              className="text-slate-400 transition-colors duration-300 ease-in-out"
            />
            <span className="text-lg text-slate-400">깃허브</span>
          </a>
          <a
            href="mailto:noa9925@gmail.com"
            target="_blank"
            className="flex items-center gap-2">
            <Mailbox
              width={24}
              height={24}
              className="text-slate-400"
            />
            <span className="text-lg text-slate-400">메일</span>
          </a>
        </div>
        <span className="text-lg text-slate-400">
          copyright ©2025 All rights reserved by Jaeppetto(황재웅)
        </span>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 min-w-0 rounded-full p-2">
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
          <Button
            className="min-h-0 border-none bg-transparent p-0 text-slate-400 shadow-none hover:bg-transparent"
            onClick={signInWithGoogle}>
            <span className="text-lg">로그인</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Footer
