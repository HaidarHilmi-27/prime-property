import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary-600">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-neutral-900">
                <path d="M12 2L2 9v11h8v-8h4v8h8V9L12 2z" />
              </svg>
            </div>
            PRIME<span className="text-gold-500">PROPERTY</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Outlet />
      </main>
    </div>
  )
}
