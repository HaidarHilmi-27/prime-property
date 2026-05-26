import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './query-provider'
import { Toaster } from 'sonner'
import type { ReactNode } from 'react'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <QueryProvider>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </QueryProvider>
    </BrowserRouter>
  )
}
