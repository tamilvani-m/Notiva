import NoteCard from '../../components/NoteCard/NoteCard'
import NoteForm from '../../components/NoteForm/NoteForm'
import { useAppData } from '../../hooks/useAppData'

function Notes() {
  const { notes, addNote, deleteNote, searchQuery } = useAppData()
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleNotes = normalizedQuery
    ? notes.filter((note) =>
        [note.title, note.category, note.preview]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(normalizedQuery)),
      )
    : notes

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Notes</p>
          <h1>Capture ideas fast.</h1>
        </div>
      </div>

      <section className="panel">
        <div className="section-heading">
          <h2>New Note</h2>
          <span>{notes.length} saved</span>
        </div>
        <NoteForm onAddNote={addNote} />
      </section>

      <section className="notes-grid">
        {visibleNotes.length ? (
          visibleNotes.map((note) => <NoteCard note={note} onDelete={deleteNote} key={note.id} />)
        ) : (
          <p className="empty-state">
            {normalizedQuery ? 'No notes match your search.' : 'No notes yet. Create your first note above.'}
          </p>
        )}
      </section>
    </div>
  )
}

export default Notes
