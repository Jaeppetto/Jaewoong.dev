import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ScrollArea, ScrollBar, Header, Footer, HeaderProvider } from '@/shared'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export const Route = createRootRoute({
  component: () => (
    <HeaderProvider>
      <ScrollArea className="flex h-[100dvh] w-full flex-1  justify-between bg-white">
        <Header />
        <main className="mt-[7.6rem] flex min-h-[calc(100dvh-15rem)] w-full flex-1 justify-center px-10">
          <Outlet />
        </main>
        <Footer />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <TanStackRouterDevtools />
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
      <span className="mt-10 text-2xl font-bold">
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
