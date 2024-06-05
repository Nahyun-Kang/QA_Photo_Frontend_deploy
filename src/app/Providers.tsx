'use client'
import { ReactNode } from 'react'
import { Provider } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactHookFormProvider from '@/app/_components/Input/ReactHookFormProvider'
import { CookiesProvider } from 'react-cookie'

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <ReactHookFormProvider>
          <Provider>{children}</Provider>
        </ReactHookFormProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </CookiesProvider>
    </QueryClientProvider>
  )
}
