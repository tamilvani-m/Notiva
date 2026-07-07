import { Trash2 } from 'lucide-react'

function NoteCard({ note, onDelete }) {
  return (
    <article className="note-card">
      <span>{note.category}</span>
      <strong>{note.title}</strong>
      <p>{note.preview}</p>
      {onDelete && (
        <button
          type="button"
          className="icon-button danger-button"
          onClick={() => onDelete(note.id)}
          aria-label={`Delete ${note.title}`}
          title="Delete note"
        >
          <Trash2 size={17} />
        </button>
      )}
    </article>
  )
}

export default NoteCard
