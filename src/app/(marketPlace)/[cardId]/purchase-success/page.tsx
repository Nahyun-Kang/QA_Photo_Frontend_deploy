'use client'

import PurchaseSuccessComponent from './PurchaseSuccessComponent'

import dynamic from 'next/dynamic'
const PurchaseSuccess = dynamic(() => import('./PurchaseSuccessComponent'), {
  ssr: false,
})

export default function PurchaseSuccessPage() {
  return (
    <>
      <PurchaseSuccessComponent />
    </>
  )
}
