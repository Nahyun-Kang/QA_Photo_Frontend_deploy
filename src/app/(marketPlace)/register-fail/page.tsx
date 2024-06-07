'use client'

import RegisterFailPComponent from './RegisterFailComponent'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RegisterFail = dynamic(() => import('./RegisterFailComponent'), {
  ssr: false,
})

export default function RegisterFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterFailPComponent />
    </Suspense>
  )
}
