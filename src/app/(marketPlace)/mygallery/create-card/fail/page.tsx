'use client'

import FailCreateCardComponent from './FailCreateCardComponent'
import dynamic from 'next/dynamic'
const FailCreateCard = dynamic(() => import('./FailCreateCardComponent'), {
  ssr: false,
})

export default function FailCreateCardPage() {
  return (
    <>
      <FailCreateCardComponent />
    </>
  )
}
