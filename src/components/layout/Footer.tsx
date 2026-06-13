import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react'

const quickLinks = [
  { label: 'Beranda', to: '/' },
  { label: 'Properti', to: '/properties' },
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Kontak', to: '/contact' },
]

const services = [
  { label: 'Beli Properti', to: '/properties' },
  { label: 'Jual Properti', to: '/properties' },
  { label: 'Sewa Properti', to: '/properties' },
  { label: 'Penilaian Properti', to: '/about' },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-gold-500">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-neutral-900">
                  <path d="M12 2L2 9v11h8v-8h4v8h8V9L12 2z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-wide text-white">
                PRIME<span className="text-gold-500">PROPERTY</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              Mitra tepercaya Anda dalam properti premium. Kami membantu Anda menemukan properti sempurna yang sesuai dengan gaya hidup dan tujuan investasi Anda.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">
               Tautan Cepat
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-gold-500"
                  >
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">
              Layanan
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.to}
                    className="group flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-gold-500"
                  >
                    <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-500">
              Kontak
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-neutral-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>Jl. Sudirman No. 123, Jakarta Pusat</span>
              </li>
              <li>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-gold-500"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                  <span>+62 812-3456-7890</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@primeproperty.com"
                  className="flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-gold-500"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                  <span>info@primeproperty.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-neutral-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Prime Property. Hak cipta dilindungi.</p>
          <div className="flex gap-6">
            <Link to="/about" className="transition-colors hover:text-gold-500">
              Kebijakan Privasi
            </Link>
            <Link to="/about" className="transition-colors hover:text-gold-500">
              Syarat &amp; Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
