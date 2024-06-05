'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, Controller, FieldValues } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import {
  EMAIL_RULES,
  LOGIN_PASSWORD_RULES,
  ERROR_MESSAGE,
} from '@/app/(auth)/_constants/authConstants'
import Input from '@/app/_components/Input/InputComponents'
import { PLACEHOLDER } from '@/app/(auth)/_constants/authConstants'
import CommonButton from '@/app/_components/Button'
import login from '@/app/_api/auth/login'
import { setCookie } from '@/app/_util/cookie'

import styles from './loginForm.module.scss'

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  })

  const handleEyeClick = () => {
    setIsVisible((state) => !state)
  }

  const onSubmit = async (data: FieldValues) => {
    const res = await login({ email: data.email, password: data.password })
    if (res) {
      const { accessToken, refreshToken } = res.data
      setCookie('accessToken', accessToken, 'access')
      setCookie('refreshToken', refreshToken, 'refresh')
      router.push('/')
    } else {
      setError('email', { message: ERROR_MESSAGE.emailCheck })
      setError('password', { message: ERROR_MESSAGE.passwordCheck })
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <Input.field>
        <Input.label htmlFor="email">이메일</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="email"
              rules={EMAIL_RULES}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={PLACEHOLDER.email}
                  type="email"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Input.wrapper>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <Input.errorMessage>{message}</Input.errorMessage>
            )}
          />
        </Input.containerWithMessage>
      </Input.field>
      <Input.field>
        <Input.label htmlFor="password">비밀번호</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="password"
              rules={LOGIN_PASSWORD_RULES}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="비밀번호를 입력해주세요"
                  type={isVisible ? 'text' : 'password'}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Input.eye onClick={handleEyeClick} isVisible={isVisible} />
          </Input.wrapper>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <Input.errorMessage>{message}</Input.errorMessage>
            )}
          />
        </Input.containerWithMessage>
      </Input.field>
      <div className={styles.buttonContainer}>
        <CommonButton thickness="thin" type="submit">
          {'로그인'}
        </CommonButton>
      </div>
    </form>
  )
}
