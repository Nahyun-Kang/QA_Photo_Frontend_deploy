'use client'
import Link from 'next/link'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import ReactHookFormProvider from '../_components/Input/ReactHookFormProvider'
import { DIRECT_LINK } from './_constants/authConstants'

import styles from './auth.module.scss'
import Logo from '/public/images/photo_logo.svg'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <ReactHookFormProvider>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <Link href={'/'}>
            <Logo className={styles.logo} />
          </Link>
          <div className={styles.form}>{children}</div>
          <div className={styles.pathContainer}>
            <p className={styles.message}>{DIRECT_LINK[pathname].message}</p>
            <Link href={`${DIRECT_LINK[pathname].path}`}>
              <span className={styles.link}>{DIRECT_LINK[pathname].link}</span>
            </Link>
          </div>
        </div>
      </section>
    </ReactHookFormProvider>
  )
}
