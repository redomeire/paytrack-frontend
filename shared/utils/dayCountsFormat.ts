function dayCountsFormat(day: number | null | undefined) {
  if (day === null || day === undefined || day <= 0) return '-'

  const year = Math.floor(day / 365)
  const month = Math.floor((day % 365) / 30)
  const remainingDays = day % 30

  const yearDisplay = year > 0 ? `${year} yr${year > 1 ? 's' : ''}` : ''
  const monthDisplay = month > 0 ? `${month} mo${month > 1 ? 's' : ''}` : ''
  const dayDisplay = remainingDays > 0 ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''

  return [yearDisplay, monthDisplay, dayDisplay].filter(Boolean).join(' ')
}

export default dayCountsFormat
