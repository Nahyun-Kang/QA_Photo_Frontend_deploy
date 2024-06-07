'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PurchaseSuccessComponent = dynamic(
  () => import('./PurchaseSuccessComponent'),
  {
    ssr: false,
  },
)

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseSuccessComponent />
    </Suspense>
  )
}
