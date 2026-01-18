import {
  HeadContent,
  Link,
  Outlet,
  createRootRoute
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ScrollArea, ScrollBar, Header, Footer } from '@/shared'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { HeaderProvider } from '../providers/HeaderProvider'

export const Route = createRootRoute({
  component: () => (
    <HeaderProvider>
      <HeadContent />
      <ScrollArea className="flex h-[100dvh] w-full flex-1  justify-between bg-white">
        <Header />
        <main className="mt-[6.2rem] flex min-h-[calc(100dvh-13.6rem)] w-full flex-1 justify-center px-10">
          <Outlet />
        </main>
        <Footer />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      {process.env.NODE_ENV !== 'production' && <TanStackRouterDevtools />}
    </HeaderProvider>
  ),
  notFoundComponent: () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="mt-10 h-1/2 w-1/4">
        <DotLottieReact
          src="https://lottie.host/68997bab-3ae1-4e1d-9d72-961f658c369c/D7PXimJXvg.lottie"
          loop
          autoplay
        />
      </div>
      <span className="mt-10 !text-body2 font-bold">
        올바르지 않은 페이지 접근입니다.
      </span>
      <Link
        className="rounded-full bg-black px-5 py-2 text-white hover:bg-black/80 hover:text-white"
        to="/article"
        search={{ page: 1 }}>
        홈으로 돌아가기
      </Link>
    </div>
  )
})
