'use client'

import RegisterFailPComponent from './RegisterFailComponent'
import dynamic from 'next/dynamic'
const RegisterFail = dynamic(() => import('./RegisterFailComponent'), {
  ssr: false,
})

export default function RegisterFailPage() {
  return (
    <>
      <RegisterFailPComponent />
    </>
  )
}
