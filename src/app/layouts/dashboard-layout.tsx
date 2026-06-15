import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Building2, History, Shield, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/use-role'
import { hasPermission } from '@/lib/permissions'
import ProfileDropdown from '@/components/dashboard/profile-dropdown'

const navItems = [
  { label: 'Properti', icon: Building2, path: '/dashboard/properties', permission: 'properties:view' as const },
  { label: 'Catatan Audit', icon: History, path: '/dashboard/audit-log', permission: 'audit:view' as const },
  { label: 'Admin', icon: Shield, path: '/dashboard/admins', permission: 'admin:manage' as const },
]

export function DashboardLayout() {
  const location = useLocation()
  const { role } = useRole()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredNav = navItems.filter(
    (item) => hasPermission(role, item.permission)
  )

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* BACKDROP OVERLAY - mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-[260px] border-r border-white/5 bg-[#1A1A1A] transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/5 px-6">
          <Link to="/dashboard/properties" className="flex items-center">
            <img
              src="/logo.jpg"
              alt="PRIME PROPERTY"
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-neutral-400 transition-all hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="space-y-1 overflow-y-auto p-4">
          {filteredNav.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname.startsWith(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-[#C9A961]/10 text-[#C9A961]'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-h-screen lg:ml-[260px]">
        {/* TOPBAR */}
        <header className="flex h-20 items-center justify-between gap-4 border-b border-white/5 bg-[#1A1A1A]/80 px-4 backdrop-blur-xl lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-white transition-all hover:bg-white/10 lg:hidden"
            aria-label="Buka Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1 lg:hidden" />
          <ProfileDropdown />
        </header>

        {/* PAGE CONTENT */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
