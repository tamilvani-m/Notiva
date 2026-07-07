import { Plus } from 'lucide-react'
import { useState } from 'react'
import { getTodayInputValue } from '../../utils/date'

const initialForm = {
  title: '',
  date: getTodayInputValue(),
  time: '',
  repeat: 'Never',
}

function ReminderForm({ onAddReminder }) {
  const [form, setForm] = useState(initialForm)

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim() || !form.date || !form.time) return

    onAddReminder(form)
    setForm(initialForm)
  }

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <label className="form-field wide">
        <span>Reminder</span>
        <input
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Call John, submit assignment..."
        />
      </label>
      <label className="form-field">
        <span>Date</span>
        <input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
      </label>
      <label className="form-field">
        <span>Time</span>
        <input type="time" value={form.time} onChange={(event) => updateField('time', event.target.value)} />
      </label>
      <label className="form-field">
        <span>Repeat</span>
        <select value={form.repeat} onChange={(event) => updateField('repeat', event.target.value)}>
          <option>Never</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </label>
      <button type="submit" className="primary-action">
        <Plus size={18} />
        <span>Add Reminder</span>
      </button>
    </form>
  )
}

export default ReminderForm
