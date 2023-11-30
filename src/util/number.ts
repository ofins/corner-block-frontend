export const abbreviateNumber = (num: number) => {
  const numString = Math.abs(num).toFixed().toString()
  const numLength = numString.length

  if (numLength < 4) return numString
  else if (numLength < 7) return numString.slice(0, -3) + '.' + numString.slice(-3, -2) + 'K'
  else if (numLength < 10) return numString.slice(0, -6) + 'M'
  else return numString.slice(0, -9) + 'B'
}
