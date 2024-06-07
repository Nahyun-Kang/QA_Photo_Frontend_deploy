'use client'

import { Suspense } from 'react'

import dynamic from 'next/dynamic'
const ProposeFailComponent = dynamic(() => import('./ProposeFailComponent'), {
  ssr: false,
})

export default function ProposeFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposeFailComponent />
    </Suspense>
  )
}
