'use client'

import RegisterSuccessComponent from './RegisterSuccessComponent'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RegisterSuccess = dynamic(() => import('./RegisterSuccessComponent'), {
  ssr: false,
})

export default function RegisterSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterSuccessComponent />
    </Suspense>
  )
}
