import ReminderCard from '../../components/ReminderCard/ReminderCard'
import ReminderForm from '../../components/ReminderForm/ReminderForm'
import { useAppData } from '../../hooks/useAppData'

function Reminders() {
  const { reminders, addReminder, toggleReminder, deleteReminder, searchQuery } = useAppData()
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleReminders = normalizedQuery
    ? reminders.filter((reminder) =>
        [reminder.title, reminder.date, reminder.time, reminder.repeat]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(normalizedQuery)),
      )
    : reminders
  const pendingReminders = reminders.filter((reminder) => !reminder.completed)

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Reminders</p>
          <h1>Never miss the small stuff.</h1>
        </div>
      </div>

      <section className="panel">
        <div className="section-heading">
          <h2>Add Reminder</h2>
          <span>{pendingReminders.length} pending</span>
        </div>
        <ReminderForm onAddReminder={addReminder} />
      </section>

      <section className="panel">
        <div className="section-heading">
          <h2>Reminder List</h2>
          <span>{visibleReminders.length} shown</span>
        </div>
        <div className="stack">
          {visibleReminders.length ? (
            visibleReminders.map((reminder) => (
              <ReminderCard
                reminder={reminder}
                onToggle={toggleReminder}
                onDelete={deleteReminder}
                key={reminder.id}
              />
            ))
          ) : (
            <p className="empty-state">
              {normalizedQuery
                ? 'No reminders match your search.'
                : 'No reminders yet. Add your first reminder above.'}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Reminders
