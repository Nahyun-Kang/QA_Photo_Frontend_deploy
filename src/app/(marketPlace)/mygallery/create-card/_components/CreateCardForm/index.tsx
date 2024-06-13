'use client'
import { useRouter } from 'next/navigation'
import { useForm, Controller, FieldValues, useWatch } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { ChangeEvent } from 'react'

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
import createCard from '@/app/_api/card/createCard'
import { gradeToType } from '@/app/_util/gradeExtract'

import styles from './cardform.module.scss'
import { GenreType, GradeType } from '@/app/_lib/types/cardType'

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
      image: '',
      genre: '',
      grade: '',
      description: '',
    },
    mode: 'onTouched',
  })
  const router = useRouter()

  const getKeyByValue = (obj: any, value: any) => {
    return Object.keys(obj).find((key) => obj[key] === value)
  }

  const encodeFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const genre = useWatch({
    control,
    name: 'genre',
  })

  const grade = useWatch({
    control,
    name: 'grade',
  })

  const image = useWatch({
    control,
    name: 'image',
  })

  const handleClickGenreOption = (item: string) => {
    setValue('genre', item)
  }

  const handleClickGradeOption = (item: string) => {
    setValue('grade', item)
  }

  const onSubmit = async (data: FieldValues) => {
    const res = await createCard({
      image: data.image,
      name: data.name,
      price: data.price,
      grade: gradeToType(data.grade) as GradeType,
      genre: getKeyByValue(GENRE, data.genre) as GenreType,
      description: data.description,
      totalQuantity: data.totalQuantity,
    })
    if (res !== null) {
      console.log(res)
      router.push('/mygallery')
    }
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
          placeholder={PLACEHOLDER.genre}
          list={Object.values(GENRE)}
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
        <Input.label>사진 업로드</Input.label>
        <Input.containerWithButton>
          <Controller
            control={control}
            name="image"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.fileInput
                placeholder={PLACEHOLDER.file}
                onChange={(e) => {
                  if (e.target && e.target.files && e.target.files[0]) {
                    onChange(e.target.files[0])
                  }
                }}
                onBlur={onBlur}
                // value={image}
              >
                파일 선택
              </Input.fileInput>
            )}
          />
        </Input.containerWithButton>
      </Input.field>
      <Input.field>
        <Input.label htmlFor="description">포토카드 설명</Input.label>
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
                value={value}
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
