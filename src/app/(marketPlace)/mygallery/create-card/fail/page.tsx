'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FailCreateCardComponent = dynamic(
  () => import('./FailCreateCardComponent'),
  {
    ssr: false,
  },
)

export default function FailCreateCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailCreateCardComponent />
    </Suspense>
  )
}
