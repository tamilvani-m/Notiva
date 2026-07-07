import TaskCard from '../../components/TaskCard/TaskCard'
import TaskForm from '../../components/TaskForm/TaskForm'
import { useAppData } from '../../hooks/useAppData'

function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask, searchQuery } = useAppData()
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const visibleTasks = normalizedQuery
    ? tasks.filter((task) =>
        [task.title, task.priority, task.category, task.dueDate, task.dueTime]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(normalizedQuery)),
      )
    : tasks
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Task Manager</p>
          <h1>Tasks</h1>
        </div>
      </div>

      <section className="panel">
        <div className="section-heading">
          <h2>Add Task</h2>
          <span>{pendingTasks.length} pending</span>
        </div>
        <TaskForm onAddTask={addTask} />
      </section>

      <section className="panel">
        <div className="section-heading">
          <h2>Task List</h2>
          <span>
            {normalizedQuery ? `${visibleTasks.length} matching` : `${completedTasks.length} completed`}
          </span>
        </div>
        <div className="stack">
          {visibleTasks.length ? (
            visibleTasks.map((task) => (
              <TaskCard
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                key={task.id}
              />
            ))
          ) : (
            <p className="empty-state">
              {normalizedQuery ? 'No tasks match your search.' : 'No tasks yet. Add your first task above.'}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Tasks
