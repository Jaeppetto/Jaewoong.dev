import { Header } from '@/widgets/Header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* <ScrollArea className="mt-[7.6rem] h-[calc(100dvh-7.6rem)] flex-1"> */}
      <ScrollArea className="h-[100dvh] flex-1">
        <Header />
        <main className="mt-[7.6rem] h-[calc(300dvh-7.6rem)] w-full flex-1 bg-slate-50">
          <Outlet />
        </main>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <TanStackRouterDevtools />
    </>
  )
})
