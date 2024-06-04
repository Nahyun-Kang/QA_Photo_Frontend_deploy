import { ReactNode } from 'react'

import ModalPortal from '@/app/modalPortal'
import ModalBackground from './ModalBackground'

interface ModalMainProps {
  children: ReactNode
  isOpen?: boolean
}

export default function ModalMain({ children, isOpen }: ModalMainProps) {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  return (
    <ModalPortal>
      <ModalBackground>{children}</ModalBackground>
    </ModalPortal>
  )
}
