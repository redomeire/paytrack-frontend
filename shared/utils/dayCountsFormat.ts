function dayCountsFormat(date: string | null | undefined) {
  if (date === null || date === undefined) return '-'
  const today = new Date()
  const dueDate = new Date(date || '')

  const timeDifference = Math.abs(today.getTime() - dueDate.getTime())
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))

  const year = Math.floor(dayDifference / 365)
  const month = Math.floor((dayDifference % 365) / 30)
  const remainingDays = dayDifference % 30

  const yearDisplay = year > 0 ? `${year} yr${year > 1 ? 's' : ''}` : ''
  const monthDisplay = month > 0 ? `${month} mo${month > 1 ? 's' : ''}` : ''
  const dayDisplay = remainingDays > 0 ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''

  return [yearDisplay, monthDisplay, dayDisplay].filter(Boolean).join(' ')
}

export default dayCountsFormat
