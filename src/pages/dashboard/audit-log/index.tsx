import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, History } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/use-role'
import { auditService, type AuditLog } from '@/services/audit-service'
import dayjs from 'dayjs'

const actionBadge: Record<string, string> = {
  create: 'bg-emerald-500/10 text-emerald-400',
  update: 'bg-blue-500/10 text-blue-400',
  delete: 'bg-red-500/10 text-red-400',
  login: 'bg-purple-500/10 text-purple-400',
  logout: 'bg-neutral-500/10 text-neutral-400',
}

export default function AuditLogPage() {
  const { isSuperAdmin } = useRole()
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const result = await auditService.getAll(page, 25)
      setLogs(result.data)
      setTotalCount(result.count)
      setTotalPages(result.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  if (!isSuperAdmin) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <History className="mx-auto h-12 w-12 text-neutral-600" />
          <p className="mt-4 text-neutral-400">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Audit Log</h1>
        <p className="mt-1 text-sm text-neutral-400">Riwayat aktivitas sistem</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1F1F1F] shadow-2xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-white/5 bg-[#232323]">
              <tr>
                {['Aksi', 'Entitas', 'ID', 'Diubah Oleh', 'Detail', 'Waktu'].map((h) => (
                  <th key={h} className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-sm text-neutral-500">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C9A961] border-t-transparent" />
                      Memuat...
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-sm text-neutral-500">
                    Belum ada audit log.
                  </td>
                </tr>
              ) : (
                logs.map((log, i) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-white/5 transition-all hover:bg-white/[0.02]"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={cn(
                        'inline-block rounded-full px-3 py-1 text-xs font-semibold capitalize',
                        actionBadge[log.action] || 'bg-neutral-500/10 text-neutral-400'
                      )}>
                        {log.action}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4 text-sm text-neutral-300">{log.entity_type}</td>
                    <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4 text-xs text-neutral-500">{log.entity_id.slice(0, 12)}...</td>
                    <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4 text-sm text-neutral-300">{log.changed_by}</td>
                    <td className="max-w-xs truncate px-3 sm:px-6 py-3 sm:py-4 text-xs text-neutral-500">
                      {JSON.stringify(log.details)}
                    </td>
                    <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4 text-sm text-neutral-400">
                      {dayjs(log.created_at).format('DD/MM/YY HH:mm')}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 px-4 sm:px-6 py-4 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-neutral-400">
            Menampilkan <span className="text-white">{logs.length}</span> dari{' '}
            <span className="text-white">{totalCount}</span> catatan
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-white transition-all disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="rounded-xl border border-white/10 bg-[#252525] px-4 py-2 text-sm text-white">
              {page} / {totalPages || 1}
            </div>
            <button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
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
