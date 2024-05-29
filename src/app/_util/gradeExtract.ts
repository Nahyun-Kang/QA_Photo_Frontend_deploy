const gradeExtract = (type: string): string => {
  let grade: string

  switch (type) {
    case 'common':
      grade = 'COMMON'
      break
    case 'rare':
      grade = 'RARE'
      break
    case 'super_rare':
      grade = 'SUPER RARE'
      break
    case 'legendary':
      grade = 'LEGENDARY'
      break
    default:
      grade = 'COMMON'
  }

  return grade
}

export default gradeExtract
