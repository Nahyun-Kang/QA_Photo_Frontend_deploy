'use client'
import { Suspense } from 'react'

import dynamic from 'next/dynamic'
const SuccessCreateCardComponent = dynamic(
  () => import('./successCreateCardComponent'),
  {
    ssr: false,
  },
)

export default function SuccessCreateCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessCreateCardComponent />
    </Suspense>
  )
}
