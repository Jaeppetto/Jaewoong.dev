import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ScrollArea, ScrollBar, Header } from '@/shared'

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollArea className="flex h-[100dvh] w-full flex-1 justify-center bg-slate-50">
        <Header />
        <main className="mt-[7.6rem] flex h-[calc(100dvh-7.6rem)] w-full flex-1 justify-center">
          <Outlet />
        </main>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <TanStackRouterDevtools />
    </>
  )
})
