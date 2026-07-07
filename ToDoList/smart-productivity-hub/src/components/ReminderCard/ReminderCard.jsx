import { Check, Trash2 } from 'lucide-react'
import { formatDateTime } from '../../utils/date'

function ReminderCard({ reminder, onToggle, onDelete }) {
  return (
    <article className={`list-card reminder-card ${reminder.completed ? 'completed' : ''}`}>
      {onToggle && (
        <button
          type="button"
          className="check-button"
          onClick={() => onToggle(reminder.id)}
          aria-label={reminder.completed ? 'Mark reminder pending' : 'Mark reminder completed'}
          title={reminder.completed ? 'Mark pending' : 'Complete reminder'}
        >
          {reminder.completed && <Check size={16} />}
        </button>
      )}
      <div>
        <strong>{reminder.title}</strong>
        <span>{reminder.date ? formatDateTime(reminder.date, reminder.time) : reminder.time}</span>
      </div>
      <div className="task-actions">
        <span className="pill blue">{reminder.repeat || 'Reminder'}</span>
        {onDelete && (
          <button
            type="button"
            className="icon-button danger-button"
            onClick={() => onDelete(reminder.id)}
            aria-label={`Delete ${reminder.title}`}
            title="Delete reminder"
          >
            <Trash2 size={17} />
          </button>
        )}
      </div>
    </article>
  )
}

export default ReminderCard
