import PropertyTable from '@/components/dashboard/property-table'

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Dasbor
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Kelola daftar properti dan pantau inventaris.
        </p>
      </div>

      {/* PROPERTY TABLE */}
      <PropertyTable />

    </div>
  )
}