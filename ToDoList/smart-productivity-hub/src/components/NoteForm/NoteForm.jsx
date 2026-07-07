import { Plus } from 'lucide-react'
import { useState } from 'react'

const initialForm = {
  title: '',
  category: 'General',
  preview: '',
}

function NoteForm({ onAddNote }) {
  const [form, setForm] = useState(initialForm)

  const updateField = (field, value) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.title.trim()) return

    onAddNote(form)
    setForm(initialForm)
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Title</span>
        <input
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          placeholder="Project idea, meeting note..."
        />
      </label>
      <label className="form-field">
        <span>Category</span>
        <input value={form.category} onChange={(event) => updateField('category', event.target.value)} />
      </label>
      <label className="form-field wide">
        <span>Note</span>
        <textarea
          value={form.preview}
          onChange={(event) => updateField('preview', event.target.value)}
          placeholder="Write the important details..."
          rows={4}
        />
      </label>
      <button type="submit" className="primary-action">
        <Plus size={18} />
        <span>Save Note</span>
      </button>
    </form>
  )
}

export default NoteForm
