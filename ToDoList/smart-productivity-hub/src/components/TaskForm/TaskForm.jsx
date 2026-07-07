import { Plus } from 'lucide-react'
import { useState } from 'react'
import { getTodayInputValue } from '../../utils/date'

const initialForm = {
  title: '',
  priority: 'Medium',
  category: 'General',
  dueDate: getTodayInputValue(),
  dueTime: '',
  color: '#2563eb',
}

function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(initialForm)

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim()) return

    onAddTask(form)
    setForm(initialForm)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="form-field wide">
        <span>Task title</span>
        <input
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Add assignment, review UI, call teammate..."
        />
      </label>

      <label className="form-field">
        <span>Priority</span>
        <select value={form.priority} onChange={(event) => updateField('priority', event.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </label>

      <label className="form-field">
        <span>Category</span>
        <input value={form.category} onChange={(event) => updateField('category', event.target.value)} />
      </label>

      <label className="form-field">
        <span>Due date</span>
        <input
          type="date"
          value={form.dueDate}
          onChange={(event) => updateField('dueDate', event.target.value)}
        />
      </label>

      <label className="form-field">
        <span>Due time</span>
        <input
          type="time"
          value={form.dueTime}
          onChange={(event) => updateField('dueTime', event.target.value)}
        />
      </label>

      <label className="form-field color-field">
        <span>Label</span>
        <input
          type="color"
          value={form.color}
          onChange={(event) => updateField('color', event.target.value)}
        />
      </label>

      <button type="submit" className="primary-action">
        <Plus size={18} />
        <span>Add Task</span>
      </button>
    </form>
  )
}

export default TaskForm
