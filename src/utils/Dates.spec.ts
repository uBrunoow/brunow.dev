import { formatDate, formatHour } from './Dates'
import '@testing-library/jest-dom'

describe('formatDate', () => {
  it('formats date string to normal date format', () => {
    expect(formatDate('2023-04-01', { isNormalDate: true })).toBe('01/04/2023')
  })

  it('formats date object to date with time format', () => {
    expect(
      formatDate(new Date('2023-04-01T15:00:00Z'), { isDateWithTime: true })
    ).toBe('01/04/2023 12:00') // COM -3 HORAS POR CONTA DO GTM-0
  })

  it('returns undefined for invalid date', () => {
    expect(formatDate('invalid-date', { isNormalDate: true })).toBeUndefined()
  })

  it('formats date string to database date format', () => {
    expect(formatDate('2023-04-01', { isDatabseDate: true })).toBe(
      '2023-04-01 00:00:00'
    )
  })
})

describe('formatHour', () => {
  it('formats date string to hour format', () => {
    expect(formatHour('2023-04-01T15:00:00Z')).toBe('12:00')
  })

  it('returns undefined for invalid date', () => {
    expect(formatHour('invalid-date')).toBeUndefined()
  })
})
