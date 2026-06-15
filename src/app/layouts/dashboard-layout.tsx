import { Outlet, Link, useLocation } from 'react-router-dom'
import { Building2, History, Shield } from 'lucide-react'
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

  const filteredNav = navItems.filter(
    (item) => hasPermission(role, item.permission)
  )

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 z-30 h-screen w-[260px] border-r border-white/5 bg-[#1A1A1A]">
        <div className="flex h-20 items-center border-b border-white/5 px-6">
          <Link to="/dashboard/properties" className="flex items-center">
            <img
              src="/logo.jpg"
              alt="PRIME PROPERTY"
              className="h-10 w-auto"
            />
          </Link>
        </div>

        <nav className="space-y-1 p-4">
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
      <main className="ml-[260px] min-h-screen">
        {/* TOPBAR */}
        <header className="flex h-20 items-center justify-end border-b border-white/5 bg-[#1A1A1A]/80 px-8 backdrop-blur-xl">
          <ProfileDropdown />
        </header>

        {/* PAGE CONTENT */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
