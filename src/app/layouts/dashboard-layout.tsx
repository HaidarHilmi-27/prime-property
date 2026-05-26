import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-[260px] border-r border-white/5 bg-[#1A1A1A]">
        <div className="flex h-20 items-center border-b border-white/5 px-6">
          <h1 className="text-xl font-bold">
            Prime
            <span className="text-[#C9A961]">
              Property
            </span>
          </h1>
        </div>

        <nav className="space-y-2 p-4">
          <button className="w-full rounded-xl bg-[#C9A961]/10 px-4 py-3 text-left text-[#C9A961]">
            Dashboard
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-[260px] min-h-screen">

        {/* TOPBAR */}
        <header className="flex h-20 items-center justify-between border-b border-white/5 bg-[#1A1A1A]/80 px-8 backdrop-blur-xl">
          <div>
            <h2 className="text-lg font-semibold">
              Property Management
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">
                Super Admin
              </p>

              <p className="text-xs text-neutral-500">
                admin@primeproperty.com
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C9A961] font-bold text-black">
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8">
          <Outlet />
        </div>

      </main>
    </div>
  )
}