'use client'

import { Suspense } from 'react'

import dynamic from 'next/dynamic'
const ProposeSuccessComponent = dynamic(
  () => import('./ProposeSuccessComponent'),
  {
    ssr: false,
  },
)

export default function ProposeSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposeSuccessComponent />
    </Suspense>
  )
}
