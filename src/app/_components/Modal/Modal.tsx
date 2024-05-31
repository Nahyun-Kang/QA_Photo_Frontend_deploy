import { ReactNode } from 'react'

import ModalPortal from '@/app/modalPortal'
import ModalBackground from './ModalBackground'

interface ModalMainProps {
  children: ReactNode
}

export default function ModalMain({ children }: ModalMainProps) {
  return (
    <ModalPortal>
      <ModalBackground>{children}</ModalBackground>
    </ModalPortal>
  )
}
