'use client'
import { ReactNode } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

interface IFormProvider {
  children: ReactNode
}

export default function ReactHookFormProvider({ children }: IFormProvider) {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}
