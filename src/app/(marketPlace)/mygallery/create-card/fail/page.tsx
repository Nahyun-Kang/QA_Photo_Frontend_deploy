'use client'

import FailCreateCardComponent from './FailCreateCardComponent'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FailCreateCard = dynamic(() => import('./FailCreateCardComponent'), {
  ssr: false,
})

export default function FailCreateCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailCreateCardComponent />
    </Suspense>
  )
}
