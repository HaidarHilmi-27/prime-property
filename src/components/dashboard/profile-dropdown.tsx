import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogOut, Shield, ShieldCheck, User } from 'lucide-react'
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
    // Clear all auth-related storage
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.includes('supabase') || key.startsWith('sb-'))) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
    sessionStorage.clear()
    navigate('/', { replace: true })
  }

  if (!user) return null

  const isSuperAdmin = user.role === 'superadmin'
  const initial = user.email?.[0]?.toUpperCase() || 'A'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-3 rounded-xl px-3 py-2 transition-all cursor-pointer',
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
        <ChevronDown
          className={cn(
            'h-4 w-4 text-neutral-400 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[240px] origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C1C]/95 backdrop-blur-2xl shadow-2xl shadow-black/40"
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

            <div className="p-1.5 space-y-0.5">
              <button
                onClick={() => { setOpen(false); navigate('/dashboard/properties') }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-neutral-300 transition-all hover:bg-white/5 hover:text-white"
              >
                <User className="h-4 w-4" />
                Profil
              </button>
              <hr className="border-white/5" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition-all hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
