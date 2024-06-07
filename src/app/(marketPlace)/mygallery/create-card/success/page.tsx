'use client'

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
    <>
      <SuccessCreateCardComponent />
    </>
  )
}
