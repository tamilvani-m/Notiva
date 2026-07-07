import { useEffect, useMemo, useState } from 'react'
import { getTodayInputValue } from '../utils/date'
import { AppDataContext } from './appData'

const storageKey = 'smart-hub-data'

const defaultSettings = {
  notificationsEnabled: false,
  notificationLeadTime: '10',
  soundEnabled: true,
}

const starterTasks = [
  {
    id: crypto.randomUUID(),
    title: 'Finish React layout',
    priority: 'High',
    category: 'Web Development',
    dueDate: getTodayInputValue(),
    dueTime: '19:00',
    completed: false,
    pinned: true,
    favorite: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Plan notes module',
    priority: 'Medium',
    category: 'Product',
    dueDate: getTodayInputValue(),
    dueTime: '20:30',
    completed: false,
    pinned: false,
    favorite: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: 'Review calendar UI',
    priority: 'Low',
    category: 'Design',
    dueDate: '',
    dueTime: '',
    completed: true,
    pinned: false,
    favorite: false,
    createdAt: new Date().toISOString(),
  },
]

function loadInitialData() {
  const savedData = localStorage.getItem(storageKey)

  if (!savedData) {
    return { tasks: starterTasks, notes: [], reminders: [], settings: defaultSettings }
  }

  try {
    const parsedData = JSON.parse(savedData)

    return {
      tasks: parsedData.tasks || starterTasks,
      notes: parsedData.notes || [],
      reminders: parsedData.reminders || [],
      settings: { ...defaultSettings, ...(parsedData.settings || {}) },
    }
  } catch {
    return { tasks: starterTasks, notes: [], reminders: [], settings: defaultSettings }
  }
}

export function AppDataProvider({ children }) {
  const [data, setData] = useState(loadInitialData)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data))
  }, [data])

  const addTask = (task) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: task.title.trim(),
      priority: task.priority,
      category: task.category.trim() || 'General',
      dueDate: task.dueDate,
      dueTime: task.dueTime,
      color: task.color,
      completed: false,
      pinned: false,
      favorite: false,
      subtasks: [],
      createdAt: new Date().toISOString(),
    }

    setData((currentData) => ({
      ...currentData,
      tasks: [newTask, ...currentData.tasks],
    }))
  }

  const toggleTask = (taskId) => {
    setData((currentData) => ({
      ...currentData,
      tasks: currentData.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    }))
  }

  const deleteTask = (taskId) => {
    setData((currentData) => ({
      ...currentData,
      tasks: currentData.tasks.filter((task) => task.id !== taskId),
    }))
  }

  const addNote = (note) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: note.title.trim(),
      category: note.category.trim() || 'General',
      preview: note.preview.trim(),
      pinned: false,
      favorite: false,
      createdAt: new Date().toISOString(),
    }

    setData((currentData) => ({
      ...currentData,
      notes: [newNote, ...currentData.notes],
    }))
  }

  const deleteNote = (noteId) => {
    setData((currentData) => ({
      ...currentData,
      notes: currentData.notes.filter((note) => note.id !== noteId),
    }))
  }

  const addReminder = (reminder) => {
    const newReminder = {
      id: crypto.randomUUID(),
      title: reminder.title.trim(),
      date: reminder.date,
      time: reminder.time,
      repeat: reminder.repeat,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setData((currentData) => ({
      ...currentData,
      reminders: [newReminder, ...currentData.reminders],
    }))
  }

  const toggleReminder = (reminderId) => {
    setData((currentData) => ({
      ...currentData,
      reminders: currentData.reminders.map((reminder) =>
        reminder.id === reminderId ? { ...reminder, completed: !reminder.completed } : reminder,
      ),
    }))
  }

  const deleteReminder = (reminderId) => {
    setData((currentData) => ({
      ...currentData,
      reminders: currentData.reminders.filter((reminder) => reminder.id !== reminderId),
    }))
  }

  const updateSettings = (settings) => {
    setData((currentData) => ({
      ...currentData,
      settings: {
        ...currentData.settings,
        ...settings,
      },
    }))
  }

  const replaceData = (nextData) => {
    setData({
      tasks: nextData.tasks || [],
      notes: nextData.notes || [],
      reminders: nextData.reminders || [],
      settings: { ...defaultSettings, ...(nextData.settings || {}) },
    })
  }

  const resetData = () => {
    setData({ tasks: [], notes: [], reminders: [], settings: defaultSettings })
    setSearchQuery('')
  }

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) return []

    return [
      ...data.tasks
        .filter((task) =>
          [task.title, task.priority, task.category, task.dueDate, task.dueTime]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(normalizedQuery)),
        )
        .map((task) => ({
          id: task.id,
          type: 'Task',
          title: task.title,
          description: task.category || 'General',
          path: '/tasks',
        })),
      ...data.notes
        .filter((note) =>
          [note.title, note.category, note.preview]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(normalizedQuery)),
        )
        .map((note) => ({
          id: note.id || note.title,
          type: 'Note',
          title: note.title,
          description: note.category || 'Note',
          path: '/notes',
        })),
      ...data.reminders
        .filter((reminder) =>
          [reminder.title, reminder.time]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(normalizedQuery)),
        )
        .map((reminder) => ({
          id: reminder.id || reminder.title,
          type: 'Reminder',
          title: reminder.title,
          description: reminder.time || 'Reminder',
          path: '/reminders',
        })),
    ]
  }, [data.notes, data.reminders, data.tasks, searchQuery])

  const value = useMemo(
    () => ({
      ...data,
      searchQuery,
      setSearchQuery,
      searchResults,
      addTask,
      toggleTask,
      deleteTask,
      addNote,
      deleteNote,
      addReminder,
      toggleReminder,
      deleteReminder,
      updateSettings,
      replaceData,
      resetData,
    }),
    [data, searchQuery, searchResults],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
