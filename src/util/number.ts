export const abbreviateNumber = (num: number, decimals: number = 1) => {
  const numString = Math.abs(num).toFixed().toString()
  const numLength = numString.length

  let position
  let character = ''

  if (numLength < 4) {
    return numString
  } else if (numLength < 7) {
    position = -3
    character = 'K'
  } else if (numLength < 10) {
    position = -6
    character = 'M'
  } else if (numLength < 13) {
    position = -9
    character = 'B'
  } else if (numLength < 16) {
    position = -12
    character = 'T'
  } else {
    return 'Num too large'
  }

  if (decimals === 0) return numString.slice(0, position) + character
  else
    return (
      numString.slice(0, position) +
      '.' +
      numString.slice(position, position + decimals) +
      character
    )
}
