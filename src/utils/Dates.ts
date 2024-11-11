import { format, isValid, parseISO } from 'date-fns'

export const formatDate = (
  dateStr: string | Date | null,
  formatType: {
    isNormalDate?: boolean
    isDateWithTime?: boolean
    isDatabseDate?: boolean
  }
) => {
  if (dateStr === null) return

  // Inicializa formattedDate com um valor padrão ou string vazia
  let formattedDate = ''

  // Converte dateStr para Date se for uma string válida
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr

  // Verifica se date é uma instância válida de Date
  if (!isValid(date)) return

  if (formatType.isNormalDate) formattedDate = format(date, 'dd/MM/yyyy')
  else if (formatType.isDateWithTime)
    formattedDate = format(date, 'dd/MM/yyyy HH:mm')
  else if (formatType.isDatabseDate)
    formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss')

  return formattedDate
}

export const formatHour = (dateStr: string | Date | null) => {
  if (dateStr === null) return
  let formattedHour = ''

  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr
  if (!isValid(date)) return

  formattedHour = format(date, 'HH:mm')

  return formattedHour
}
