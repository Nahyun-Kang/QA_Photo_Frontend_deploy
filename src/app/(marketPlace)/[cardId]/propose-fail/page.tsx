'use client'

import ProposeFailComponent from './ProposeFailComponent'
import { Suspense } from 'react'

import dynamic from 'next/dynamic'
const ProposeFail = dynamic(() => import('./ProposeFailComponent'), {
  ssr: false,
})

export default function ProposeFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProposeFailComponent />
    </Suspense>
  )
}
