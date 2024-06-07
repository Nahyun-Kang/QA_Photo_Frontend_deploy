'use client'

import PurchaseSuccessComponent from './PurchaseSuccessComponent'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PurchaseSuccess = dynamic(() => import('./PurchaseSuccessComponent'), {
  ssr: false,
})

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseSuccessComponent />
    </Suspense>
  )
}
