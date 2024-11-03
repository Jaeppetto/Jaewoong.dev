import { Header } from '@/widgets/Header'
import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <div className="mt-[7.6rem] flex h-[2000rem] w-full flex-col">
        <div className="flex gap-2 p-2">
          <Link
            to="/about"
            className="[&.active]:font-bold">
            About
          </Link>
          <Link
            to="/article"
            className="[&.active]:font-bold">
            Article
          </Link>
          <Link
            to="/archive"
            className="[&.active]:font-bold">
            Archive
          </Link>
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  )
})