import { useMemo, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Eye,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type PropertyStatus =
  | 'In Stock'
  | 'Sold Out'

type ReadyStatus =
  | 'Siap Huni'
  | 'Siap Kosong'

interface Property {
  id: number
  nama: string
  group: string
  ukuran: string
  hadap: string
  tipe: string
  tingkat: number
  harga: number
  carport: boolean
  status: PropertyStatus
  siap: ReadyStatus
  kawasan: string
  createdAt: string
}

const dummyProperties: Property[] = [
  {
    id: 1,
    nama: 'Emerald Residence',
    group: 'A1',
    ukuran: '8 x 15',
    hadap: 'Utara',
    tipe: 'Premium',
    tingkat: 2,
    harga: 1350000000,
    carport: true,
    status: 'In Stock',
    siap: 'Siap Huni',
    kawasan: 'Jakarta Selatan',
    createdAt: '2026-01-01',
  },
  {
    id: 2,
    nama: 'Golden Valley',
    group: 'B2',
    ukuran: '7 x 12',
    hadap: 'Barat',
    tipe: 'Standard',
    tingkat: 1,
    harga: 980000000,
    carport: false,
    status: 'Sold Out',
    siap: 'Siap Kosong',
    kawasan: 'BSD City',
    createdAt: '2026-01-02',
  },
]

const pageSizes = [25, 50, 100]

export default function PropertyTable() {
  const [search, setSearch] =
    useState('')

  const [pageSize, setPageSize] =
    useState(50)

  const [page, setPage] =
    useState(1)

  const [sortBy, setSortBy] =
    useState<
      | 'nama'
      | 'harga'
      | 'createdAt'
      | 'status'
    >('nama')

  const [sortOrder, setSortOrder] =
    useState<'asc' | 'desc'>('asc')

  const filteredData = useMemo(() => {
    const filtered =
      dummyProperties.filter((item) =>
        item.nama
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )

    filtered.sort((a, b) => {
      let valueA: any =
        a[sortBy]
      let valueB: any =
        b[sortBy]

      if (
        typeof valueA === 'string'
      ) {
        valueA =
          valueA.toLowerCase()
        valueB =
          valueB.toLowerCase()
      }

      if (valueA < valueB)
        return sortOrder === 'asc'
          ? -1
          : 1

      if (valueA > valueB)
        return sortOrder === 'asc'
          ? 1
          : -1

      return 0
    })

    return filtered
  }, [
    search,
    sortBy,
    sortOrder,
  ])

  const totalPages = Math.ceil(
    filteredData.length / pageSize
  )

  const paginatedData =
    filteredData.slice(
      (page - 1) * pageSize,
      page * pageSize
    )

  function formatCurrency(
    value: number
  ) {
    return new Intl.NumberFormat(
      'id-ID',
      {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }
    ).format(value)
  }

  function handleSort(
    key:
      | 'nama'
      | 'harga'
      | 'createdAt'
      | 'status'
  ) {
    if (sortBy === key) {
      setSortOrder((prev) =>
        prev === 'asc'
          ? 'desc'
          : 'asc'
      )
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Property Listing
          </h1>

          <p className="mt-1 text-sm text-neutral-400">
            Daftar semua properti
            Prime Property
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col gap-3 sm:flex-row">

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

            <input
              type="text"
              placeholder="Cari property..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="h-11 w-full rounded-xl border border-white/10 bg-[#202020] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-neutral-500 focus:border-[#C9A961] sm:w-[260px]"
            />
          </div>

          {/* FILTER */}
          <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#202020] px-4 text-sm font-medium text-white transition-all hover:border-[#C9A961]/30">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1F1F1F] shadow-2xl shadow-black/20">

        {/* TABLE TOP */}
        <div className="flex flex-col gap-4 border-b border-white/5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

          {/* SORT */}
          <div className="flex flex-wrap gap-2">

            {[
              {
                label: 'Nama',
                value: 'nama',
              },
              {
                label: 'Harga',
                value: 'harga',
              },
              {
                label: 'Tanggal',
                value: 'createdAt',
              },
              {
                label: 'Status',
                value: 'status',
              },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() =>
                  handleSort(
                    item.value as any
                  )
                }
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

          {/* PAGE SIZE */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-400">
              Rows:
            </span>

            <select
              value={pageSize}
              onChange={(e) =>
                setPageSize(
                  Number(
                    e.target.value
                  )
                )
              }
              className="h-10 rounded-xl border border-white/10 bg-[#252525] px-3 text-sm text-white outline-none"
            >
              {pageSizes.map((size) => (
                <option
                  key={size}
                  value={size}
                >
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b border-white/5 bg-[#232323]">
              <tr>

                {[
                  'Nama',
                  'Group',
                  'Lebar × Panjang',
                  'Hadap',
                  'Tipe',
                  'Tingkat',
                  'Harga',
                  'Carport',
                  'Status',
                  'Siap',
                  'Kawasan',
                  'Action',
                ].map((header) => (
                  <th
                    key={header}
                    className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>

              {paginatedData.map(
                (property, index) => (
                  <motion.tr
                    key={property.id}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.03,
                    }}
                    className="cursor-pointer border-b border-white/5 transition-all hover:bg-white/[0.03]"
                  >

                    <td className="whitespace-nowrap px-6 py-5">
                      <div>
                        <p className="font-medium text-white">
                          {
                            property.nama
                          }
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          ID #
                          {property.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-neutral-300">
                      {property.group}
                    </td>

                    <td className="px-6 py-5 text-sm text-neutral-300">
                      {
                        property.ukuran
                      }
                    </td>

                    <td className="px-6 py-5 text-sm text-neutral-300">
                      {property.hadap}
                    </td>

                    <td className="px-6 py-5 text-sm text-neutral-300">
                      {property.tipe}
                    </td>

                    <td className="px-6 py-5 text-sm text-neutral-300">
                      {
                        property.tingkat
                      }
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm font-medium text-white">
                      {formatCurrency(
                        property.harga
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-semibold',
                          property.carport
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-red-500/10 text-red-400'
                        )}
                      >
                        {property.carport
                          ? 'Yes'
                          : 'No'}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-semibold',
                          property.status ===
                            'In Stock' &&
                            'bg-emerald-500/10 text-emerald-400',

                          property.status ===
                            'Sold Out' &&
                            'bg-[#B33A3A]/10 text-[#B33A3A]'
                        )}
                      >
                        {
                          property.status
                        }
                      </span>
                    </td>

                    {/* READY */}
                    <td className="px-6 py-5">
                      <span
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-semibold',
                          property.siap ===
                            'Siap Huni' &&
                            'bg-[#C9A961]/10 text-[#C9A961]',

                          property.siap ===
                            'Siap Kosong' &&
                            'bg-purple-500/10 text-purple-300'
                        )}
                      >
                        {property.siap}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-5 text-sm text-neutral-300">
                      {
                        property.kawasan
                      }
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-5">
                      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-neutral-300 transition-all hover:border-[#C9A961]/30 hover:text-[#C9A961]">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>

                  </motion.tr>
                )
              )}

            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-4 border-t border-white/5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

          <p className="text-sm text-neutral-400">
            Showing{' '}
            <span className="text-white">
              {
                paginatedData.length
              }
            </span>{' '}
            of{' '}
            <span className="text-white">
              {
                filteredData.length
              }
            </span>{' '}
            properties
          </p>

          {/* PAGINATION */}
          <div className="flex items-center gap-2">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((prev) =>
                  Math.max(
                    prev - 1,
                    1
                  )
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-white transition-all disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="rounded-xl border border-white/10 bg-[#252525] px-4 py-2 text-sm text-white">
              {page} / {totalPages}
            </div>

            <button
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-white transition-all disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}