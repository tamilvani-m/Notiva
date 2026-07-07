export function getTodayInputValue() {
  return toInputDate(new Date())
}

export function isToday(dateValue) {
  if (!dateValue) return false
  return dateValue === getTodayInputValue()
}

export function toInputDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function addDays(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toInputDate(date)
}

export function formatTaskMeta(task) {
  const parts = []

  if (task.dueDate) {
    parts.push(isToday(task.dueDate) ? 'Today' : task.dueDate)
  }

  if (task.dueTime) {
    parts.push(task.dueTime)
  }

  if (task.category) {
    parts.push(task.category)
  }

  return parts.join(' - ') || 'No date set'
}

export function getDateTimeValue(dateValue, timeValue) {
  if (!dateValue || !timeValue) return null

  const date = new Date(`${dateValue}T${timeValue}`)

  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDateTime(dateValue, timeValue) {
  const date = getDateTimeValue(dateValue, timeValue)

  if (!date) return 'No time set'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}
