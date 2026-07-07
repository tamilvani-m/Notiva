import { Check, Trash2 } from 'lucide-react'
import { formatTaskMeta } from '../../utils/date'

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <article className={`list-card task-card ${task.completed ? 'completed' : ''}`}>
      <button
        type="button"
        className="check-button"
        onClick={() => onToggle?.(task.id)}
        aria-label={task.completed ? 'Mark task as pending' : 'Mark task as complete'}
        title={task.completed ? 'Mark pending' : 'Complete'}
      >
        {task.completed && <Check size={16} />}
      </button>

      <span className="task-color" style={{ backgroundColor: task.color || '#2563eb' }} />

      <div className="task-main">
        <strong>{task.title}</strong>
        <span>{task.meta || formatTaskMeta(task)}</span>
      </div>

      <div className="task-actions">
        <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
        {onDelete && (
          <button
            type="button"
            className="icon-button danger-button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
          >
            <Trash2 size={17} />
          </button>
        )}
      </div>
    </article>
  )
}

export default TaskCard
