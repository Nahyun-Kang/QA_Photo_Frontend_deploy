'use client'

import ProposeSuccessComponent from './ProposeSuccessComponent'
import { Suspense } from 'react'

import dynamic from 'next/dynamic'
const ProposeSuccess = dynamic(() => import('./ProposeSuccessComponent'), {
  ssr: false,
})

export default function ProposeSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposeSuccessComponent />
    </Suspense>
  )
}
