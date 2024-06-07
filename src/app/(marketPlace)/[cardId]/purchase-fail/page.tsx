'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PurchaseFailComponent = dynamic(() => import('./PurchaseFailComponent'), {
  ssr: false,
})

export default function PurchaseFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseFailComponent />
    </Suspense>
  )
}
