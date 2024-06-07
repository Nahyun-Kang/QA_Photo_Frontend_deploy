'use client'

import ProposeFailComponent from './ProposeFailComponent'

import dynamic from 'next/dynamic'
const ProposeFail = dynamic(() => import('./ProposeFailComponent'), {
  ssr: false,
})

export default function ProposeFailPage() {
  return (
    <>
      <ProposeFailComponent />
    </>
  )
}
