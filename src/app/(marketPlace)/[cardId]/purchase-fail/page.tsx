'use client'

import PurchaseFailComponent from './PurchaseFailComponent'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PurchaseFail = dynamic(() => import('./PurchaseFailComponent'), {
  ssr: false,
})

export default function PurchaseFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseFailComponent />
    </Suspense>
  )
}
