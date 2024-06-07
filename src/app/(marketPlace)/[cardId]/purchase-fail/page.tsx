'use client'

import PurchaseFailComponent from './PurchaseFailComponent'

import dynamic from 'next/dynamic'
const PurchaseFail = dynamic(() => import('./PurchaseFailComponent'), {
  ssr: false,
})

export default function PurchaseFailPage() {
  return (
    <>
      <PurchaseFailComponent />
    </>
  )
}
