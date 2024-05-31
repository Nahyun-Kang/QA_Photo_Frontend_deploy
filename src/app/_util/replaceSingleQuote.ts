export default function replaceSingleQuotes(str?: string | null) {
  if (str === undefined || str === null) {
    return null
  }
  return str.replace(/'/g, ' ')
}
