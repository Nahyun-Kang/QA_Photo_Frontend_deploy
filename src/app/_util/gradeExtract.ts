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
