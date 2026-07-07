import { isToday } from '../../utils/date'

function DashboardCards({ tasks, notes = [] }) {
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)
  const tasksToday = tasks.filter((task) => isToday(task.dueDate))

  const cards = [
    { label: 'Tasks Today', value: tasksToday.length, tone: 'blue' },
    { label: 'Completed Tasks', value: completedTasks.length, tone: 'green' },
    { label: 'Pending Tasks', value: pendingTasks.length, tone: 'amber' },
    { label: 'Notes', value: notes.length, tone: 'pink' },
    { label: 'Productivity Streak', value: completedTasks.length ? '1 day' : '0 days', tone: 'violet' },
  ]

  return (
    <section className="dashboard-grid" aria-label="Dashboard summary">
      {cards.map((card) => (
        <article className={`metric-card ${card.tone}`} key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  )
}

export default DashboardCards
