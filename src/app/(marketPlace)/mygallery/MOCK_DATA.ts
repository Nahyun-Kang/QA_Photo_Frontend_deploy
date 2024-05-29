interface Grade {
  grade: 'common' | 'rare' | 'super_rare' | 'legendary'
  count: number
}

export const MOCK_GRADELIST: Grade[] = [
  {
    grade: 'common',
    count: 4,
  },
  {
    grade: 'rare',
    count: 20,
  },
  {
    grade: 'super_rare',
    count: 4,
  },
  {
    grade: 'legendary',
    count: 5,
  },
]
