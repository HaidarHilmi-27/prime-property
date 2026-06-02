import { useCallback, useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Eye,
  Pencil,
  Trash2,
  Search,
  Plus,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce'
import { useRole } from '@/hooks/use-role'
import { hasPermission } from '@/lib/permissions'
import { propertyService } from '@/services/property-service'
import type { Property, PropertyFilters } from '@/types'
import PropertyDetailDrawer from './property-detail-drawer'

const statusColors: Record<string, string> = {
  'in stock': 'bg-emerald-500/10 text-emerald-400',
  'sold_out': 'bg-[#B33A3A]/10 text-[#B33A3A]',
}

const siapColors: Record<string, string> = {
  'siap_huni': 'bg-[#C9A961]/10 text-[#C9A961]',
  'siap_kosong': 'bg-purple-500/10 text-purple-300',
  'siap_huni_renovasi': 'bg-blue-500/10 text-blue-400',
}

const pageSizes = [25, 50, 100]

export default function PropertyTable() {
  const navigate = useNavigate()
  const { role } = useRole()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)

  const [pageSize, setPageSize] = useState(25)
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState<'nama_property' | 'price' | 'created_at' | 'status'>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [statusFilter, setStatusFilter] = useState<string>('')

  const [properties, setProperties] = useState<Property[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const canCreate = hasPermission(role, 'properties:create')
  const canEdit = hasPermission(role, 'properties:edit')
  const canDelete = hasPermission(role, 'properties:delete')

  function formatUkuran(lebar: number, panjang: number) {
    return `${lebar} x ${panjang}`
  }

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    try {
      const filters: PropertyFilters = {
        page,
        limit: pageSize,
        sortBy,
        sortOrder,
      }
      if (debouncedSearch) filters.search = debouncedSearch
      if (statusFilter) filters.status = statusFilter as Property['status']

      const result = await propertyService.getAll(filters)
      setProperties(result.data)
      setTotalCount(result.count)
      setTotalPages(result.totalPages)
    } catch (err) {
      console.error('Failed to fetch properties:', err)
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, sortBy, sortOrder, debouncedSearch, statusFilter])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, pageSize])

  function handleSort(key: 'nama_property' | 'price' | 'created_at' | 'status') {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
  }

  function openDrawer(property: Property) {
    setSelectedProperty(property)
    setDrawerOpen(true)
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const sortButtons = [
    { label: 'Nama', value: 'nama_property' as const },
    { label: 'Harga', value: 'price' as const },
    { label: 'Tanggal', value: 'created_at' as const },
    { label: 'Status', value: 'status' as const },
  ]

  const siapLabels: Record<string, string> = {
    siap_huni: 'Siap Huni',
    siap_kosong: 'Siap Kosong',
    siap_huni_renovasi: 'Siap Huni Renovasi',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Property Listing</h1>
          <p className="mt-1 text-sm text-neutral-400">Daftar semua properti Prime Property</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {canCreate && (
            <button
              onClick={() => navigate('/dashboard/properties/add')}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#C9A961] px-5 text-sm font-semibold text-black transition-all hover:brightness-110"
            >
              <Plus className="h-4 w-4" />
              Tambah Property
            </button>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Cari property..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#202020] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-500 focus:border-[#C9A961] sm:w-[260px]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-xl border border-white/10 bg-[#202020] px-4 text-sm text-white outline-none transition-all focus:border-[#C9A961]"
          >
            <option value="">Semua Status</option>
            <option value="in stock">In Stock</option>
            <option value="sold_out">Sold Out</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1F1F1F] shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-4 border-b border-white/5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {sortButtons.map((item) => (
              <button
                key={item.value}
                onClick={() => handleSort(item.value)}
                className={cn(
                  'flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition-all',
                  sortBy === item.value
                    ? 'border-[#C9A961]/30 bg-[#C9A961]/10 text-[#C9A961]'
                    : 'border-white/10 bg-[#252525] text-neutral-300 hover:border-white/20'
                )}
              >
                {item.label}
                <ChevronsUpDown className="h-4 w-4" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-400">Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="h-10 rounded-xl border border-white/10 bg-[#252525] px-3 text-sm text-white outline-none"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-white/5 bg-[#232323]">
              <tr>
                {['Nama', 'Group', 'Ukuran', 'Hadap', 'Tipe', 'Tingkat', 'Harga', 'Carport', 'Status', 'Siap', 'Kawasan', 'Action'].map((header) => (
                  <th key={header} className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={12} className="px-6 py-20 text-center text-sm text-neutral-500">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C9A961] border-t-transparent" />
                      Memuat data...
                    </div>
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-6 py-20 text-center text-sm text-neutral-500">
                    Tidak ada properti ditemukan.
                  </td>
                </tr>
              ) : (
                properties.map((property, index) => (
                  <motion.tr
                    key={property.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="cursor-pointer border-b border-white/5 transition-all hover:bg-white/[0.03]"
                    onClick={() => openDrawer(property)}
                  >
                    <td className="whitespace-nowrap px-6 py-5">
                      <div>
                        <p className="font-medium text-white">{property.nama_property}</p>
                        <p className="mt-1 text-xs text-neutral-500">ID #{property.id.slice(0, 8)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-neutral-300">{property.group}</td>
                    <td className="px-6 py-5 text-sm text-neutral-300">{formatUkuran(property.lebar, property.panjang)}</td>
                    <td className="px-6 py-5 text-sm text-neutral-300">{property.hadap.join(', ')}</td>
                    <td className="px-6 py-5 text-sm text-neutral-300">{property.tipe}</td>
                    <td className="px-6 py-5 text-sm text-neutral-300">{property.tingkat}</td>
                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-white">
                      {formatCurrency(property.price)}
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        'rounded-full px-3 py-1 text-xs font-semibold',
                        property.carport
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-red-500/10 text-red-400'
                      )}>
                        {property.carport ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', statusColors[property.status])}>
                        {property.status === 'in stock' ? 'In Stock' : 'Sold Out'}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', siapColors[property.siap])}>
                        {siapLabels[property.siap] || property.siap}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-5 text-sm text-neutral-300">{property.kawasan.join(', ')}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => openDrawer(property)}
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-neutral-300 transition-all hover:border-[#C9A961]/30 hover:text-[#C9A961]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {canEdit && (
                          <button
                            onClick={() => navigate(`/dashboard/properties/${property.id}/edit`)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-neutral-300 transition-all hover:border-blue-500/30 hover:text-blue-400"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={async () => {
                              if (window.confirm('Hapus properti ini?')) {
                                try {
                                  await propertyService.softDelete(property.id)
                                  fetchProperties()
                                } catch (err) {
                                  console.error(err)
                                }
                              }
                            }}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-neutral-300 transition-all hover:border-red-500/30 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-neutral-400">
            Showing <span className="text-white">{properties.length}</span> of{' '}
            <span className="text-white">{totalCount}</span> properties
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-white transition-all disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="rounded-xl border border-white/10 bg-[#252525] px-4 py-2 text-sm text-white">
              {page} / {totalPages || 1}
            </div>

            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-white transition-all disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <PropertyDetailDrawer
        property={selectedProperty}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false)
          setSelectedProperty(null)
        }}
      />
    </div>
  )
}
