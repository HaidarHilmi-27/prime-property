import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'

import { authService } from '../../services/auth-service'

export default function AuthPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  const [errorMessage, setErrorMessage] =
    useState('')

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)
    setErrorMessage('')

    try {
      await authService.login(
        email,
        password
      )

      navigate('/dashboard')
    } catch (error: any) {
      setErrorMessage(
        error?.message ||
          'Login gagal'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#1A1A1A]">

      {/* LEFT SIDE */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-black to-[#111111]" />

        {/* Decorative Glow */}
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#C9A961]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#C9A961]/5 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-14">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A961] text-xl font-bold text-black">
              P
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                Prime
                <span className="text-[#C9A961]">
                  Property
                </span>
              </h1>

              <p className="text-sm text-neutral-400">
                Luxury Property Management
              </p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="max-w-lg">
            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-6 text-5xl font-bold leading-tight text-white"
            >
              Dashboard Internal
              <span className="block text-[#C9A961]">
                Prime Property
              </span>
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
              className="text-lg leading-relaxed text-neutral-400"
            >
              Platform manajemen properti
              modern untuk admin dan
              superadmin Prime Property.
            </motion.p>
          </div>

          {/* Bottom */}
          <div className="text-sm text-neutral-500">
            © 2026 Prime Property
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex w-full items-center justify-center px-6 py-10 lg:w-1/2">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="w-full max-w-md"
        >

          {/* Mobile Logo */}
          <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A961] text-lg font-bold text-black">
              P
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Prime
                <span className="text-[#C9A961]">
                  Property
                </span>
              </h1>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-3xl border border-white/5 bg-[#202020] p-8 shadow-2xl shadow-black/30">

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white">
                Login Agent
              </h2>

              <p className="mt-2 text-sm text-neutral-400">
                Masuk menggunakan akun
                admin atau superadmin.
              </p>
            </div>

            {/* Error */}
            {errorMessage && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />

                  <input
                    type="email"
                    placeholder="admin@primeproperty.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#2A2A2A] pl-12 pr-4 text-white outline-none transition-all placeholder:text-neutral-500 focus:border-[#C9A961] focus:ring-2 focus:ring-[#C9A961]/20"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="••••••••"
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#2A2A2A] pl-12 pr-12 text-white outline-none transition-all placeholder:text-neutral-500 focus:border-[#C9A961] focus:ring-2 focus:ring-[#C9A961]/20"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Security Notice */}
              <div className="rounded-xl border border-[#C9A961]/10 bg-[#C9A961]/5 p-4">
                <p className="text-xs leading-relaxed text-neutral-400">
                  Sistem keamanan aktif:
                  lockout otomatis setelah
                  5x gagal login selama
                  15 menit.
                </p>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#C9A961] font-semibold text-black transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? 'Loading...'
                  : 'Masuk Dashboard'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}