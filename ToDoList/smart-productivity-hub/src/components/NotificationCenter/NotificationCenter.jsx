import { useEffect, useRef } from 'react'
import { useAppData } from '../../hooks/useAppData'
import { getDateTimeValue } from '../../utils/date'

function NotificationCenter() {
  const { tasks, reminders, settings } = useAppData()
  const notifiedIdsRef = useRef(new Set())

  useEffect(() => {
    if (!settings.notificationsEnabled || !('Notification' in window)) return
    if (Notification.permission !== 'granted') return

    const checkDueItems = () => {
      const now = Date.now()
      const leadTimeMs = Number(settings.notificationLeadTime || 0) * 60 * 1000
      const alertWindowMs = 30 * 1000

      const dueTasks = tasks
        .filter((task) => !task.completed)
        .map((task) => ({
          id: `task-${task.id}`,
          title: task.title,
          body: task.category ? `Task due: ${task.category}` : 'Task due now',
          dueAt: getDateTimeValue(task.dueDate, task.dueTime),
        }))

      const dueReminders = reminders
        .filter((reminder) => !reminder.completed)
        .map((reminder) => ({
          id: `reminder-${reminder.id}`,
          title: reminder.title,
          body: 'Reminder due now',
          dueAt: getDateTimeValue(reminder.date, reminder.time),
        }))

      ;[...dueTasks, ...dueReminders].forEach((item) => {
        if (!item.dueAt || notifiedIdsRef.current.has(item.id)) return

        const notifyAt = item.dueAt.getTime() - leadTimeMs
        const isDue = now >= notifyAt && now <= notifyAt + alertWindowMs

        if (!isDue) return

        new Notification(item.title, { body: item.body })
        notifiedIdsRef.current.add(item.id)
      })
    }

    checkDueItems()
    const intervalId = window.setInterval(checkDueItems, 10000)

    return () => window.clearInterval(intervalId)
  }, [reminders, settings.notificationLeadTime, settings.notificationsEnabled, tasks])

  return null
}

export default NotificationCenter
