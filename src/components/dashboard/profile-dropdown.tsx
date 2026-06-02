import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Shield, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/auth-store'
import { authService } from '@/services/auth-service'

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { user, logout: clearStore } = useAuthStore()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    setOpen(false)
    try {
      await authService.logout()
    } catch {
      // proceed even if supabase logout errors
    }
    clearStore()
    navigate('/agent/login', { replace: true })
  }

  if (!user) return null

  const isSuperAdmin = user.role === 'superadmin'
  const initial = user.email?.[0]?.toUpperCase() || 'A'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-3 rounded-xl px-3 py-2 transition-all',
          open ? 'bg-white/5' : 'hover:bg-white/5'
        )}
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-white leading-tight truncate max-w-[140px]">
            {user.email}
          </p>
          <p className="text-xs text-neutral-500 capitalize leading-tight mt-0.5">
            {isSuperAdmin ? 'Super Admin' : 'Admin'}
          </p>
        </div>
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full font-bold text-sm shrink-0',
            isSuperAdmin ? 'bg-[#C9A961] text-black' : 'bg-neutral-700 text-white'
          )}
        >
          {initial}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C1C]/95 backdrop-blur-2xl shadow-2xl shadow-black/40"
          >
            <div className="px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-full font-bold text-base shrink-0',
                    isSuperAdmin ? 'bg-[#C9A961] text-black' : 'bg-neutral-700 text-white'
                  )}
                >
                  {initial}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.email}</p>
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold mt-1',
                      isSuperAdmin
                        ? 'bg-[#C9A961]/10 text-[#C9A961]'
                        : 'bg-neutral-600/20 text-neutral-300'
                    )}
                  >
                    {isSuperAdmin ? (
                      <ShieldCheck className="h-3 w-3" />
                    ) : (
                      <Shield className="h-3 w-3" />
                    )}
                    {isSuperAdmin ? 'Super Admin' : 'Admin'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-1.5">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition-all hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
