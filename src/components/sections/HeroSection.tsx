import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Building2 } from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import heroImage from '@/assets/hero.png'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-900" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A961' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4 pb-20 pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-500/10 px-4 py-1.5">
              <Building2 className="h-3.5 w-3.5 text-gold-500" />
              <span className="text-xs font-medium tracking-wider text-gold-500 uppercase">
                Properti Premium Mewah
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Temukan{' '}
              <span className="text-gold-500">Properti Impian</span>{' '}
              Anda bersama Prime
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-400">
              Rasakan kemewahan dan kecanggihan yang tak tertandingi di setiap
              properti yang kami tawarkan. Rumah impian Anda menanti bersama Prime Property.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={ROUTES.PROPERTIES}
                className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-gold-400 hover:shadow-lg hover:shadow-gold-500/25"
              >
                <Search className="h-4 w-4" />
                Jelajahi Properti
              </Link>
              <Link
                to={ROUTES.ABOUT}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition-all hover:border-gold-500/50 hover:text-white"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-neutral-800 pt-8">
              {[
                { value: '500+', label: 'Properti' },
                { value: '98%', label: 'Kepuasan' },
                { value: '50+', label: 'Penghargaan' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gold-500">{stat.value}</p>
                  <p className="text-xs text-neutral-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:block"
          >
            <div className="relative group">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gold-500/20 to-neutral-800 p-1">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <img
                    src={heroImage}
                    alt="Properti Premium"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-lg border border-neutral-800 bg-neutral-900/90 p-4 backdrop-blur-sm shadow-xl shadow-black/20">
                <p className="text-xs text-neutral-500">Mulai dari</p>
                <p className="text-lg font-bold text-gold-500">Rp 500 Juta</p>
              </div>
              <div className="absolute -right-4 -top-4 rounded-lg border border-neutral-800 bg-neutral-900/90 p-4 backdrop-blur-sm shadow-xl shadow-black/20">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
                  <p className="text-xs font-medium text-white">Tersedia Sekarang</p>
                </div>
                <p className="mt-1 text-xs text-neutral-500">Lokasi Premium</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
