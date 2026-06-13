import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Home, Maximize2, Compass, Layers, Car, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Property } from '@/types'

interface Props {
  property: Property | null
  open: boolean
  onClose: () => void
}

const statusColors: Record<string, string> = {
  'in stock': 'bg-emerald-500/10 text-emerald-400',
  'sold_out': 'bg-[#B33A3A]/10 text-[#B33A3A]',
}

const siapColors: Record<string, string> = {
  'siap_huni': 'bg-[#C9A961]/10 text-[#C9A961]',
  'siap_kosong': 'bg-purple-500/10 text-purple-300',
  'siap_huni_renovasi': 'bg-blue-500/10 text-blue-400',
}

const siapLabels: Record<string, string> = {
  siap_huni: 'Siap Huni',
  siap_kosong: 'Siap Kosong',
  siap_huni_renovasi: 'Siap Huni Renovasi',
}

export default function PropertyDetailDrawer({ property, open, onClose }: Props) {
  if (!property) return null

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'medium',
    }).format(new Date(date))
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xl border-l border-white/5 bg-[#1A1A1A] shadow-2xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                <h2 className="text-lg font-semibold text-white">Detail Property</h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-neutral-400 transition-all hover:border-[#C9A961]/30 hover:text-[#C9A961]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{property.nama_property}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-neutral-400">
                      <MapPin className="h-4 w-4 text-[#C9A961]" />
                      {property.kawasan.join(', ')}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#202020] p-5">
                    <p className="text-3xl font-bold text-[#C9A961]">{formatCurrency(property.price)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <DetailCard icon={Maximize2} label="Ukuran" value={`${property.lebar} x ${property.panjang}`} />
                    <DetailCard icon={Compass} label="Hadap" value={property.hadap.join(', ')} />
                    <DetailCard icon={Layers} label="Tingkat" value={`${property.tingkat} Lantai`} />
                    <DetailCard icon={Home} label="Tipe" value={property.tipe} />
                    <DetailCard icon={Car} label="Carport" value={property.carport ? 'Ada' : 'Tidak Ada'} />
                    <DetailCard icon={Building2} label="Group" value={property.group} />
                  </div>

                  <div className="rounded-2xl bg-[#202020] p-5">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-400">Detail Lahan</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Lebar</span>
                        <span className="text-white">{property.lebar} m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Panjang</span>
                        <span className="text-white">{property.panjang} m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Total Luas</span>
                        <span className="font-medium text-[#C9A961]">{property.lebar} x {property.panjang}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', statusColors[property.status])}>
                      {property.status === 'in stock' ? 'Tersedia' : 'Terjual'}
                    </span>
                    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', siapColors[property.siap])}>
                      {siapLabels[property.siap] || property.siap}
                    </span>
                  </div>

                  {property.unit && (
                    <div className="rounded-2xl bg-[#202020] p-4 text-sm text-neutral-300">
                      {property.unit}
                    </div>
                  )}

                  {property.maps_link && (
                    <a
                      href={property.maps_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-2xl bg-[#202020] p-4 text-sm text-[#C9A961] transition-all hover:bg-[#C9A961]/10"
                    >
                      <MapPin className="h-4 w-4" />
                      Lihat di Google Maps
                    </a>
                  )}

                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Calendar className="h-3 w-3" />
                    Dibuat pada {formatDate(property.created_at)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function DetailCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#202020] p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#C9A961]" />
        <span className="text-xs text-neutral-400">{label}</span>
      </div>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  )
}
