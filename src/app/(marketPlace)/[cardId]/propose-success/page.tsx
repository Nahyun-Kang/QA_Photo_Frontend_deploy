'use client'

import ProposeSuccessComponent from './ProposeSuccessComponent'

import dynamic from 'next/dynamic'
const ProposeSuccess = dynamic(() => import('./ProposeSuccessComponent'), {
  ssr: false,
})

export default function ProposeSuccessPage() {
  return (
    <>
      <ProposeSuccessComponent />
    </>
  )
}
