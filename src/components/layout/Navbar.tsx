import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

const navLinks = [
  { to: ROUTES.HOME, label: 'Beranda' },
  { to: ROUTES.ABOUT, label: 'Tentang Kami' },
  { to: ROUTES.CONTACT, label: 'Kontak' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-white/5 bg-[#1A1A1A]/95 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-6">

        {/* LOGO */}
        <Link to={ROUTES.HOME} className="flex items-center gap-3">
          <img
            src="/logo.jpg"
            alt="PRIME PROPERTY"
            className="h-10 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-wide text-white">
              PRIME
              <span className="text-[#C9A961]">PROPERTY</span>
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-neutral-500 sm:block">
              Properti Premium Mewah
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.HOME}
              className={({ isActive }) =>
                cn(
                  'relative rounded-xl px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300',
                  isActive
                    ? 'text-[#C9A961]'
                    : 'text-neutral-300 hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <div className="relative">
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[#C9A961]"
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}

          {/* LOGIN BUTTON */}
          <Link
            to={ROUTES.LOGIN}
            className="ml-4 flex items-center gap-2 rounded-xl border border-[#C9A961] px-5 py-2 text-sm font-semibold text-[#C9A961] transition-all hover:bg-[#C9A961] hover:text-[#1A1A1A]"
          >
            <LogIn className="h-4 w-4" />
            Masuk Agent
          </Link>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-[#C9A961]/30 hover:bg-white/10 md:hidden"
          aria-label="Buka Menu"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="fixed right-0 top-0 z-50 flex h-screen w-[85%] max-w-sm flex-col border-l border-white/10 bg-[#1A1A1A] shadow-2xl md:hidden"
            >
              <div className="flex h-20 items-center justify-between border-b border-white/5 px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A961] font-bold text-black">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M12 2L2 9v11h8v-8h4v8h8V9L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      PRIME
                      <span className="text-[#C9A961]">PROPERTY</span>
                    </h2>
                    <p className="text-xs text-neutral-500">Properti Premium</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="rounded-lg p-2 text-white transition-colors hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === ROUTES.HOME}
                      onClick={() => setIsMobileOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center rounded-xl px-4 py-3 text-base font-medium transition-all duration-300',
                          isActive
                            ? 'bg-[#C9A961]/10 text-[#C9A961]'
                            : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.08 }}
                  className="mt-4"
                >
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#C9A961] px-5 py-3 text-base font-semibold text-[#C9A961] transition-all hover:bg-[#C9A961] hover:text-[#1A1A1A]"
                  >
                    <LogIn className="h-5 w-5" />
                    Masuk Agent
                  </Link>
                </motion.div>
              </nav>

              <div className="border-t border-white/5 px-6 py-5">
                <p className="text-xs text-neutral-500">&copy; 2026 Prime Property</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
