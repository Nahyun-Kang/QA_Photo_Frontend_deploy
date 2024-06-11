import { GradeType } from '../_lib/types/cardType'

const gradeExtract = (type: string): string => {
  let grade: string

  switch (type) {
    case 'COMMON':
      grade = 'COMMON'
      break
    case 'RARE':
      grade = 'RARE'
      break
    case 'SUPER_RARE':
      grade = 'SUPER RARE'
      break
    case 'LEGENDARY':
      grade = 'LEGENDARY'
      break
    default:
      grade = 'COMMON'
  }

  return grade
}

export default gradeExtract

export const gradeToType = (grade: string): string => {
  let type: GradeType

  switch (grade) {
    case 'COMMON':
      grade = 'COMMON'
      break
    case 'RARE':
      grade = 'RARE'
      break
    case 'SUPER RARE':
      grade = 'SUPER_RARE'
      break
    case 'LEGENDARY':
      grade = 'LEGENDARY'
      break
    default:
      grade = 'COMMON'
  }

  return grade
}
