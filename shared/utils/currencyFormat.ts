export function currencyFormat(amount: number, currency = 'IDR', locale = 'id-ID') {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol',
    currencySign: 'standard'
  })

  return formatter.format(amount)
}

export function currencyFormatOption(currency = 'IDR'): Intl.NumberFormatOptions & {
  language: string
} {
  const language = navigator?.language ?? 'id-ID'
  return {
    style: 'currency',
    currency,
    language,
    currencyDisplay: 'code',
    currencySign: 'standard'
  }
}
