'use client'

import RegisterSuccessComponent from './RegisterSuccessComponent'
import dynamic from 'next/dynamic'
const RegisterSuccess = dynamic(() => import('./RegisterSuccessComponent'), {
  ssr: false,
})

export default function RegisterSuccessPage() {
  return (
    <div>
      <RegisterSuccessComponent />
    </div>
  )
}
