import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Shield, ShieldCheck, UserPlus, KeyRound, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useRole } from '@/hooks/use-role'
import { useAuthStore } from '@/store/auth-store'
import { adminService } from '@/services/admin-service'
import { toast } from 'sonner'
import type { User } from '@/types'

export default function AdminsPage() {
  const { isSuperAdmin } = useRole()
  const { user: currentUser } = useAuthStore()
  const [admins, setAdmins] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const [showCreate, setShowCreate] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newRole, setNewRole] = useState<'admin' | 'superadmin'>('admin')
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')

  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchAdmins = useCallback(async () => {
    setLoading(true)
    try {
      const result = await adminService.getAll(page, 25)
      setAdmins(result.data)
      setTotalCount(result.count)
      setTotalPages(result.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchAdmins()
  }, [fetchAdmins])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreateLoading(true)
    setCreateError('')

    const email = newEmail.trim().toLowerCase()
    if (!email) {
      setCreateError('Email tidak boleh kosong')
      setCreateLoading(false)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCreateError('Format email tidak valid. Gunakan format: nama@domain.com')
      setCreateLoading(false)
      return
    }
    if (newPassword.length < 6) {
      setCreateError('Password minimal 6 karakter')
      setCreateLoading(false)
      return
    }

    try {
      await Promise.race([
        adminService.create(email, newPassword, newRole),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Waktu habis, coba lagi')), 15000)
        ),
      ])
      setShowCreate(false)
      setNewEmail('')
      setNewPassword('')
      setNewRole('admin')
      fetchAdmins()
    } catch (err: any) {
      setCreateError(err?.message || 'Gagal membuat admin')
    } finally {
      setCreateLoading(false)
    }
  }

  async function handleToggleActive(id: string, current: boolean) {
    try {
      await adminService.toggleActive(id, !current)
      fetchAdmins()
    } catch (err) {
      console.error(err)
    }
  }

  async function handleResetPassword(email: string) {
    try {
      await adminService.resetPassword(email)
      alert('Email reset password telah dikirim ke ' + email)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleteLoading(true)
    try {
      await adminService.delete(deleteTarget.id)
      toast.success('Admin berhasil dihapus')
      setDeleteTarget(null)
      fetchAdmins()
    } catch (err: any) {
      toast.error(err?.message || 'Gagal menghapus admin')
    } finally {
      setDeleteLoading(false)
    }
  }

  if (!isSuperAdmin) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-neutral-600" />
          <p className="mt-4 text-neutral-400">Anda tidak memiliki akses ke halaman ini.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Management</h1>
          <p className="mt-1 text-sm text-neutral-400">Kelola admin dan superadmin</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#C9A961] px-5 text-sm font-semibold text-black transition-all hover:brightness-110"
        >
          <UserPlus className="h-4 w-4" />
          Tambah Admin
        </button>
      </div>

      {showCreate && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/5 bg-[#1F1F1F] p-6 shadow-2xl shadow-black/20"
        >
          <h3 className="mb-4 text-lg font-semibold text-white">Buat Admin Baru</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-white/10 bg-[#2A2A2A] px-4 text-sm text-white outline-none focus:border-[#C9A961]"
                placeholder="admin@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-white/10 bg-[#2A2A2A] px-4 text-sm text-white outline-none focus:border-[#C9A961]"
                placeholder="Min 6 karakter"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as 'admin' | 'superadmin')}
                className="h-11 w-full rounded-xl border border-white/10 bg-[#2A2A2A] px-4 text-sm text-white outline-none focus:border-[#C9A961]"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={createLoading}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#C9A961] px-5 text-sm font-semibold text-black transition-all hover:brightness-110 disabled:opacity-60"
              >
                {createLoading ? '...' : 'Buat'}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-[#252525] px-4 text-sm text-white transition-all hover:border-white/20"
              >
                Batal
              </button>
            </div>
          </form>
          {createError && (
            <p className="mt-3 text-sm text-red-400">{createError}</p>
          )}
        </motion.div>
      )}

      <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1F1F1F] shadow-2xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b border-white/5 bg-[#232323]">
              <tr>
                {['Email', 'Role', 'Status', 'Bergabung', 'Aksi'].map((h) => (
                  <th key={h} className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-sm text-neutral-500">
                    <div className="flex items-center justify-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#C9A961] border-t-transparent" />
                      Memuat...
                    </div>
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-sm text-neutral-500">
                    Belum ada admin.
                  </td>
                </tr>
              ) : (
                admins.map((admin, i) => (
                  <motion.tr
                    key={admin.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-white/5 transition-all hover:bg-white/[0.02]"
                  >
                    <td className="whitespace-nowrap px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A961]/10 text-sm font-bold text-[#C9A961]">
                          {admin.email[0].toUpperCase()}
                        </div>
                        <span className="text-sm text-white">{admin.email}</span>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
                        admin.role === 'superadmin'
                          ? 'bg-[#C9A961]/10 text-[#C9A961]'
                          : 'bg-blue-500/10 text-blue-400'
                      )}>
                        {admin.role === 'superadmin' ? <ShieldCheck className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <span className={cn(
                        'inline-block rounded-full px-3 py-1 text-xs font-semibold',
                        admin.is_active
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-red-500/10 text-red-400'
                      )}>
                        {admin.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-400">
                      {new Date(admin.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleToggleActive(admin.id, admin.is_active)}
                          className={cn(
                            'flex h-9 items-center justify-center rounded-xl border px-3 text-xs font-medium transition-all',
                            admin.is_active
                              ? 'border-red-500/20 bg-red-500/10 text-red-400 hover:border-red-500/40'
                              : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/40'
                          )}
                        >
                          {admin.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        </button>
                        <button
                          onClick={() => handleResetPassword(admin.email)}
                          className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-[#252525] px-3 text-xs font-medium text-neutral-300 transition-all hover:border-[#C9A961]/30 hover:text-[#C9A961]"
                        >
                          <KeyRound className="h-3 w-3" />
                          Reset
                        </button>
                        <button
                          onClick={() => setDeleteTarget(admin)}
                          disabled={admin.id === currentUser?.id}
                          className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 px-3 text-xs font-medium text-red-400 transition-all hover:border-red-500/40 disabled:opacity-40"
                        >
                          <Trash2 className="h-3 w-3" />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/5 px-3 sm:px-6 py-3 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-neutral-400">
            Menampilkan <span className="text-white">{admins.length}</span> dari{' '}
            <span className="text-white">{totalCount}</span> admin
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

      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#1C1C1C] p-6 shadow-2xl shadow-black/40">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                    <Trash2 className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Hapus Admin</h3>
                    <p className="text-sm text-neutral-400">
                      Tindakan ini tidak dapat dibatalkan.
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-neutral-300">
                  Apakah Anda yakin ingin menghapus admin{' '}
                  <span className="font-medium text-white">{deleteTarget.email}</span>?
                </p>

                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-[#252525] px-5 text-sm font-medium text-white transition-all hover:border-white/20"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteLoading}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition-all hover:bg-red-600 disabled:opacity-60"
                  >
                    {deleteLoading ? '...' : 'Ya, Hapus'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
