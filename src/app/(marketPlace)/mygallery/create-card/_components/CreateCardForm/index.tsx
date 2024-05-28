'use client'
import { useState } from 'react'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import Input from '@/app/_components/Input/InputComponents'
import SelectComponent from '@/app/_components/Select/Select'
import {
  PLACEHOLDER,
  ERROR_MESSAGE,
  CARDNAME_RULES,
  GENRE,
  GRADE,
} from '@/app/(marketPlace)/mygallery/create-card/_constants/createCardConstants'
import CommonButton from '@/app/_components/Button'

import styles from './cardform.module.scss'

export default function CreateCardForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      price: 0,
      totalQuantity: 0,
      file: '',
      genre: '',
      grade: '',
      description: '',
    },
    mode: 'onTouched',
  })

  const genre = useWatch({
    control,
    name: 'genre',
  })

  const grade = useWatch({
    control,
    name: 'grade',
  })

  const handleClickGenreOption = (item: string) => {
    setValue('genre', item)
  }

  const handleClickGradeOption = (item: string) => {
    setValue('grade', item)
  }

  const onSubmit = async (data: FieldValues) => {
    console.log(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input.field>
        <Input.label htmlFor="name">포토카드 이름</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="name"
              rules={CARDNAME_RULES}
              render={({ field: { onChange, onBlur } }) => (
                <Input
                  placeholder={PLACEHOLDER.name}
                  type="text"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Input.wrapper>
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <Input.errorMessage>{message}</Input.errorMessage>
            )}
          />
        </Input.containerWithMessage>
      </Input.field>
      <Input.field>
        <Input.label htmlFor="grade">등급</Input.label>
        <SelectComponent
          placeholder={PLACEHOLDER.grade}
          list={GRADE}
          value={grade}
          defaultValue={getValues('genre')}
          onClick={handleClickGradeOption}
        />
      </Input.field>
      <Input.field>
        <Input.label htmlFor="genre">장르</Input.label>
        <SelectComponent
          placeholder={PLACEHOLDER.grade}
          list={GENRE}
          value={genre}
          defaultValue={getValues('genre')}
          onClick={handleClickGenreOption}
        />
      </Input.field>
      <Input.field>
        <Input.label htmlFor="price">가격</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={PLACEHOLDER.price}
                  type="number"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Input.wrapper>
        </Input.containerWithMessage>
      </Input.field>
      <Input.field>
        <Input.label htmlFor="totalQuantity">총 발행량</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="totalQuantity"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={PLACEHOLDER.totalQuantity}
                  type="number"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Input.wrapper>
        </Input.containerWithMessage>
      </Input.field>
      <Input.field>
        <Input.label htmlFor="file">사진 업로드</Input.label>
        <Input.containerWithMessage>
          <Input.wrapper>
            <Controller
              control={control}
              name="file"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={PLACEHOLDER.file}
                  type="file"
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </Input.wrapper>
        </Input.containerWithMessage>
      </Input.field>
      <Input.field>
        <Input.label htmlFor="file">포토카드 설명</Input.label>
        <Input.containerWithMessage>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.textarea
                placeholder={PLACEHOLDER.description}
                onChange={onChange}
                onBlur={onBlur}
                type="text"
              />
            )}
          />
        </Input.containerWithMessage>
      </Input.field>
      <div className={styles.buttonContainer}>
        <CommonButton thickness="thin" type="submit">
          {'생성하기'}
        </CommonButton>
      </div>
    </form>
  )
}
