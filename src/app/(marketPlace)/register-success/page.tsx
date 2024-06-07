'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RegisterSuccessComponent = dynamic(
  () => import('./RegisterSuccessComponent'),
  {
    ssr: false,
  },
)

export default function RegisterSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterSuccessComponent />
    </Suspense>
  )
}
