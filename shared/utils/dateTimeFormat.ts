interface IDateTimeFormat {
  date: string
  timezone: string
}

function dateTimeFormat({ date: inputDate, timezone = 'Asia/Jakarta' }: IDateTimeFormat) {
  const date = new Date(inputDate)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  const formattedDate = date.toLocaleString(navigator?.language ?? 'id-ID', options)
  return formattedDate
}

export default dateTimeFormat
