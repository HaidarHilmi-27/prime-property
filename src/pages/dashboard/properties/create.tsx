import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save } from 'lucide-react'
import { useAuthStore } from '@/store/auth-store'
import { propertyService } from '@/services/property-service'
import { hasPermission } from '@/lib/permissions'

const propertySchema = z.object({
  nama_property: z.string().min(1, 'Nama properti wajib diisi'),
  group: z.string().min(1, 'Group wajib diisi'),
  lebar: z.coerce.number().positive('Lebar harus > 0'),
  panjang: z.coerce.number().positive('Panjang harus > 0'),
  hadap: z.string().min(1, 'Hadap wajib diisi'),
  tipe: z.enum(['Ruko', 'Villa']),
  tingkat: z.coerce.number().positive('Tingkat harus > 0'),
  price: z.coerce.number().positive('Harga harus > 0'),
  carport: z.boolean(),
  status: z.enum(['in stock', 'sold_out']),
  siap: z.enum(['siap_huni', 'siap_kosong', 'siap_huni_renovasi']),
  kawasan: z.string().min(1, 'Kawasan wajib diisi'),
  maps_link: z.string().optional(),
  unit: z.string().optional(),
})

type PropertyFormData = z.infer<typeof propertySchema>

export default function CreatePropertyPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      lebar: 0,
      panjang: 0,
      tingkat: 1,
      price: 0,
      carport: false,
      status: 'in stock',
      siap: 'siap_huni',
      tipe: 'Villa',
    },
  })

  const lebar = watch('lebar')
  const panjang = watch('panjang')
  const ukuran = lebar && panjang ? `${lebar} x ${panjang}` : '-'

  if (!user || !hasPermission(user.role, 'properties:create')) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-neutral-400">Anda tidak memiliki akses ke halaman ini.</p>
      </div>
    )
  }

  function parseCommaList(value: string): string[] {
    return value.split(',').map((s) => s.trim()).filter(Boolean)
  }

  async function onSubmit(data: PropertyFormData) {
    setSubmitting(true)
    setError('')
    try {
      await propertyService.create({
        nama_property: data.nama_property,
        group: data.group,
        lebar: data.lebar,
        panjang: data.panjang,
        hadap: parseCommaList(data.hadap),
        tipe: data.tipe,
        tingkat: data.tingkat,
        price: data.price,
        carport: data.carport,
        status: data.status,
        siap: data.siap,
        kawasan: parseCommaList(data.kawasan),
        maps_link: data.maps_link || null,
        unit: data.unit || null,
        created_by: user!.id,
      })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Gagal menyimpan properti')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-neutral-300 transition-all hover:border-[#C9A961]/30 hover:text-[#C9A961]"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Tambah Property</h1>
          <p className="mt-1 text-sm text-neutral-400">Buat listing properti baru</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-3xl border border-white/5 bg-[#1F1F1F] p-6 shadow-2xl shadow-black/20">
          <h2 className="mb-5 text-lg font-semibold text-white">Informasi Properti</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Nama Properti" error={errors.nama_property?.message}>
              <input {...register('nama_property')} placeholder="Nama properti" className="input-field" />
            </FormField>
            <FormField label="Group" error={errors.group?.message}>
              <input {...register('group')} placeholder="Contoh: A1" className="input-field" />
            </FormField>
            <FormField label="Lebar (m)" error={errors.lebar?.message}>
              <input type="number" step="any" {...register('lebar')} placeholder="8" className="input-field" />
            </FormField>
            <FormField label="Panjang (m)" error={errors.panjang?.message}>
              <input type="number" step="any" {...register('panjang')} placeholder="12" className="input-field" />
            </FormField>
            <FormField label="Ukuran">
              <input value={ukuran} disabled className="input-field opacity-60" />
            </FormField>
            <FormField label="Hadap (pisahkan dengan koma)" error={errors.hadap?.message}>
              <input {...register('hadap')} placeholder="Utara, Timur" className="input-field" />
            </FormField>
            <FormField label="Tipe" error={errors.tipe?.message}>
              <select {...register('tipe')} className="input-field">
                <option value="Villa">Villa</option>
                <option value="Ruko">Ruko</option>
              </select>
            </FormField>
            <FormField label="Tingkat" error={errors.tingkat?.message}>
              <input type="number" step="any" {...register('tingkat')} min={1} className="input-field" />
            </FormField>
            <FormField label="Harga (Rp)" error={errors.price?.message}>
              <input type="number" {...register('price')} placeholder="2500000000" className="input-field" />
            </FormField>
            <FormField label="Carport">
              <label className="flex items-center gap-3 h-11 px-4 rounded-xl border border-white/10 bg-[#2A2A2A] cursor-pointer">
                <input type="checkbox" {...register('carport')} className="h-5 w-5 accent-[#C9A961]" />
                <span className="text-sm text-neutral-300">Memiliki carport</span>
              </label>
            </FormField>
            <FormField label="Status" error={errors.status?.message}>
              <select {...register('status')} className="input-field">
                <option value="in stock">In Stock</option>
                <option value="sold_out">Sold Out</option>
              </select>
            </FormField>
            <FormField label="Siap" error={errors.siap?.message}>
              <select {...register('siap')} className="input-field">
                <option value="siap_huni">Siap Huni</option>
                <option value="siap_kosong">Siap Kosong</option>
                <option value="siap_huni_renovasi">Siap Huni Renovasi</option>
              </select>
            </FormField>
            <FormField label="Kawasan (pisahkan dengan koma)" error={errors.kawasan?.message}>
              <input {...register('kawasan')} placeholder="Krakatau, Pancing" className="input-field" />
            </FormField>
            <FormField label="Google Maps Link">
              <input {...register('maps_link')} placeholder="https://maps.google.com/?q=..." className="input-field" />
            </FormField>
            <FormField label="Unit">
              <input {...register('unit')} placeholder="Ready Siap huni" className="input-field" />
            </FormField>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-[#252525] px-6 text-sm font-medium text-white transition-all hover:border-white/20"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#C9A961] px-6 text-sm font-semibold text-black transition-all hover:brightness-110 disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {submitting ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </form>

      <style>{`
        .input-field {
          width: 100%;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: #2A2A2A;
          padding: 0 14px;
          font-size: 14px;
          color: #fff;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #C9A961;
          box-shadow: 0 0 0 2px rgba(201,169,97,0.15);
        }
        .input-field::placeholder {
          color: #666;
        }
        select.input-field {
          appearance: auto;
        }
        input[disabled].input-field {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-300">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
