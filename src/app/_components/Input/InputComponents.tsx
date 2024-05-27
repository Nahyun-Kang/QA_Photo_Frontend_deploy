'use client'
import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

import styles from './InputComponents.module.scss'
import Invisible from '/public/icons/invisible.svg'
import Visible from '/public/icons/visible.svg'

interface IInputField {
  children: ReactNode
}

function InputField({ children }: IInputField) {
  return <div className={styles.inputContainer}>{children}</div>
}

interface ILable {
  children: ReactNode
  htmlFor: string
}

function Label({ children, htmlFor }: ILable) {
  return (
    <label htmlFor={htmlFor} className={styles.label}>
      {children}
    </label>
  )
}

export function InputContainerWithErrorMessage({
  children,
}: {
  children: ReactNode
}) {
  return <div className={styles.containerWithErrorMessage}>{children}</div>
}

export function InputContainerWithButton({
  children,
}: {
  children: ReactNode
}) {
  return <div className={styles.containerWithButton}>{children}</div>
}

interface IInputWrapper {
  hasError?: boolean
  children: ReactNode
}

export function InputWrapper({ hasError, children }: IInputWrapper) {
  return (
    <div className={`${styles.inputWrapper} ${hasError && styles.error}`}>
      {children}
    </div>
  )
}

interface IInput {
  // value: string
  placeholder?: string
  hasError?: boolean
  type?: string
  field?: FieldValues
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
}

function InputComponent({
  placeholder,
  hasError,
  type,
  onChange,
  onBlur,
}: IInput) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${hasError && styles.error}`}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

interface IErrorText {
  children: ReactNode
}

function ErrorText({ children }: IErrorText) {
  return <p className={styles.errorText}>{children}</p>
}

interface IButton {
  children: ReactNode
}

function FileSelectButton({ children }: IButton) {
  return <button>{children}</button>
}

interface ITextArea {
  placeholder: string
}

function TextArea({ placeholder }: ITextArea) {
  return (
    <>
      <textarea placeholder={placeholder} className={styles.textarea} />
    </>
  )
}

function Eye({
  isVisible,
  onClick,
}: {
  isVisible: boolean
  onClick: () => void
}) {
  return (
    <button className={styles.eyeButton} type="button" onClick={onClick}>
      {isVisible ? <Visible /> : <Invisible />}
    </button>
  )
}

const Input = Object.assign(InputComponent, {
  field: InputField,
  label: Label,
  containerWithMessage: InputContainerWithErrorMessage,
  containerWithButton: InputContainerWithButton,
  wrapper: InputWrapper,
  errorMessage: ErrorText,
  button: FileSelectButton,
  textarea: TextArea,
  eye: Eye,
})

export default Input
