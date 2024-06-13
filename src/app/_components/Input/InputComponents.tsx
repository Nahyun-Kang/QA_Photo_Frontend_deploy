'use client'
import {
  ChangeEventHandler,
  FocusEventHandler,
  ReactNode,
  useRef,
  ChangeEvent,
} from 'react'
import { FieldValues } from 'react-hook-form'

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
  htmlFor?: string
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
  placeholder?: string
  hasError?: boolean
  type?: string
  field?: FieldValues
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  id?: string
}

function InputComponent({
  placeholder,
  hasError,
  type,
  onChange,
  onBlur,
  id,
}: IInput) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${hasError && styles.error}`}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
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
  htmlFor?: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur: FocusEventHandler<HTMLInputElement>
  // value: string
}

function FileInput({
  children,
  placeholder,
  onChange,
  onBlur,
  // value,
}: IButton) {
  const ref = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <div className={styles.fileInputWrapper}>
        {/* <span className={styles.title}>
          {value === null ? placeholder : value}
        </span> */}
        <input
          className={`${styles.input}`}
          id="file"
          type="file"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
      <label htmlFor="file">
        <button
          type="button"
          className={styles.fileSelectButton}
          onClick={() => {
            ref.current?.click()
          }}
        >
          {children}
        </button>
      </label>
    </>
  )
}

interface ITextArea {
  placeholder: string
  type: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  onBlur: FocusEventHandler<HTMLTextAreaElement>
  value: string
}

function TextArea({
  placeholder,
  type = 'text',
  onChange,
  onBlur,
  value,
}: ITextArea) {
  return (
    <>
      <textarea
        placeholder={placeholder}
        className={styles.textarea}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
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
  fileInput: FileInput,
  textarea: TextArea,
  eye: Eye,
})

export default Input
