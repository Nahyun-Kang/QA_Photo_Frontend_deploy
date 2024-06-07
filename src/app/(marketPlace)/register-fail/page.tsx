'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RegisterFailComponent = dynamic(() => import('./RegisterFailComponent'), {
  ssr: false,
})

export default function RegisterFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterFailComponent />
    </Suspense>
  )
}
