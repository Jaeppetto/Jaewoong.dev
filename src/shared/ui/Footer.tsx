import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

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
import { KeyRound, Mailbox } from 'lucide-react'

const Footer = () => {
  const { user, isAuthenticated, signOut } = useAuth()
  const { signInWithGoogle } = useGoogleAuth()
  const router = useRouter()

  return (
    <div className="flex h-[7.4rem] w-[100dvw] items-center justify-center bg-slate-100">
      <div className="flex h-full max-w-[108rem] flex-1 flex-col items-center justify-between gap-4 px-10 py-5 sm:flex-row sm:px-4">
        <div className="flex gap-8">
          <a
            href="https://github.com/Jaeppetto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2">
            <GitHubLogoIcon
              width={20}
              height={20}
              className="text-slate-400 transition-colors duration-300 ease-in-out hover:text-slate-500"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/jaeppetto/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2">
            <LinkedInLogoIcon
              width={20}
              height={20}
              className="text-slate-400 transition-colors duration-300 ease-in-out hover:text-slate-500"
            />
          </a>
          <a
            href="mailto:noa9925@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2">
            <Mailbox
              width={20}
              height={20}
              className="text-slate-400 transition-colors duration-300 ease-in-out hover:text-slate-500"
            />
          </a>
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
                  <span className="!text-body3 text-muted-foreground">
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
              className="flex min-h-0 items-center gap-2 border-none bg-transparent p-0 text-slate-400 shadow-none hover:bg-transparent"
              onClick={signInWithGoogle}>
              <KeyRound
                width={18}
                height={18}
                className="text-slate-400"
              />

              <span className="!text-body3 text-slate-400">로그인</span>
            </Button>
          )}
        </div>
        <span className="!text-body4 text-slate-400 sm:!text-body3">
          copyright ©2025-2026 All rights reserved by Jaeppetto(황재웅)
        </span>
      </div>
    </div>
  )
}

export default Footer
