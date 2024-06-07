'use client'
import { Suspense } from 'react'

import SuccessCreateCardComponent from './successCreateCardComponent'

import dynamic from 'next/dynamic'
const SuccessCreateCard = dynamic(
  () => import('./successCreateCardComponent'),
  {
    ssr: false,
  },
)

export default function SuccessCreateCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessCreateCardComponent />
    </Suspense>
  )
}
