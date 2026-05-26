import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  isScrolled: boolean

  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setIsScrolled: (scrolled: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  isScrolled: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setIsScrolled: (scrolled) => set({ isScrolled: scrolled }),
}))
