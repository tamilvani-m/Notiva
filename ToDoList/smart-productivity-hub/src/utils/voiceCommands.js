import { addDays, getTodayInputValue } from './date'

function normalizeTime(hour, minute = '00', period = '') {
  let parsedHour = Number(hour)
  const parsedMinute = String(minute).padStart(2, '0')
  const normalizedPeriod = period.toLowerCase()

  if (normalizedPeriod === 'pm' && parsedHour < 12) {
    parsedHour += 12
  }

  if (normalizedPeriod === 'am' && parsedHour === 12) {
    parsedHour = 0
  }

  return `${String(parsedHour).padStart(2, '0')}:${parsedMinute}`
}

export function parseTaskCommand(command) {
  const originalCommand = command.trim()
  const lowerCommand = originalCommand.toLowerCase()
  let dueDate = ''
  let dueTime = ''
  let title = originalCommand

  if (/\btoday\b/.test(lowerCommand)) {
    dueDate = getTodayInputValue()
    title = title.replace(/\btoday\b/gi, '')
  }

  if (/\btomorrow\b/.test(lowerCommand)) {
    dueDate = addDays(1)
    title = title.replace(/\btomorrow\b/gi, '')
  }

  const timeMatch = title.match(/\b(?:at\s*)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i)

  if (timeMatch) {
    dueTime = normalizeTime(timeMatch[1], timeMatch[2], timeMatch[3])
    title = title.replace(timeMatch[0], '')
  }

  title = title
    .replace(/^(add|create|make)\s+(a\s+)?(task|todo)\s*/i, '')
    .replace(/^remind\s+me\s+to\s*/i, '')
    .replace(/^reminder\s+to\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()

  return {
    title: title || originalCommand,
    priority: lowerCommand.includes('urgent') || lowerCommand.includes('important') ? 'High' : 'Medium',
    category: lowerCommand.startsWith('remind') ? 'Reminder' : 'Voice',
    dueDate,
    dueTime,
    color: '#0f766e',
  }
}
