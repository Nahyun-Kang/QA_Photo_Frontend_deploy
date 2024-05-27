'use client'
import { useState } from 'react'
import {
  useForm,
  Controller,
  FieldValues,
  useFormContext,
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import {
  EMAIL_RULES,
  SIGNUP_PASSWORD_RULES,
  NICKNAME_RULES,
  ERROR_MESSAGE,
} from '@/app/(auth)/_constants/authConstants'
import Input from '@/app/_components/Input/InputComponents'
import { PLACEHOLDER } from '@/app/(auth)/_constants/authConstants'
import CommonButton from '@/app/_components/Button'

import styles from './SignupForm.module.scss'

export default function SignupForm() {
  const [isVisible, setIsVisible] = useState(false)

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
      password_check: '',
    },
    mode: 'onTouched',
  })

  const values = getValues()
  console.log(values)

  const handleEyeClick = () => {
    setIsVisible((state) => !state)
  }

  const onSubmit = (data: FieldValues) => {
    console.log(data)
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
        <Input.label htmlFor="nickname">닉네임</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="nickname"
              rules={NICKNAME_RULES}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={PLACEHOLDER.nickname}
                  type="nickname"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Input.wrapper>
          <ErrorMessage
            errors={errors}
            name="nickname"
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
              rules={SIGNUP_PASSWORD_RULES}
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
      <Input.field>
        <Input.label htmlFor="password_check">비밀번호 확인</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="password_check"
              rules={{
                required: ERROR_MESSAGE.confirmPasswordRequired,
                validate: {
                  isMatch: (value) => {
                    if (value !== watch('password'))
                      return ERROR_MESSAGE.confirmPasswordCheck
                    return true
                  },
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={PLACEHOLDER.password_check}
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
            name="password_check"
            render={({ message }) => (
              <Input.errorMessage>{message}</Input.errorMessage>
            )}
          />
        </Input.containerWithMessage>
      </Input.field>
      <div className={styles.buttonContainer}>
        <CommonButton thickness="thin" type="submit">
          {'가입하기'}
        </CommonButton>
      </div>
    </form>
  )
}
