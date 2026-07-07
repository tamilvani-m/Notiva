import CalendarPreview from '../../components/Calendar/Calendar'
import DashboardCards from '../../components/DashboardCards/DashboardCards'
import ReminderCard from '../../components/ReminderCard/ReminderCard'
import TaskCard from '../../components/TaskCard/TaskCard'
import VoiceInput from '../../components/VoiceInput/VoiceInput'
import { useAppData } from '../../hooks/useAppData'
import { isToday } from '../../utils/date'

function Dashboard() {
  const { tasks, notes, reminders: savedReminders, toggleTask } = useAppData()
  const todaysTasks = tasks.filter((task) => isToday(task.dueDate)).slice(0, 4)
  const completedTasks = tasks.filter((task) => task.completed)
  const pendingTasks = tasks.filter((task) => !task.completed)
  const completionRate = tasks.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0
  const upcomingReminders = savedReminders.filter((reminder) => !reminder.completed).slice(0, 4)

  return (
    <div className="page-content">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Build a calmer, smarter day.</h1>
          <p>
            Track tasks, reminders, notes, and productivity from one clean workspace.
          </p>
        </div>
        <VoiceInput />
      </section>

      <DashboardCards tasks={tasks} notes={notes} reminders={savedReminders} />

      <div className="content-grid">
        <section className="panel">
          <div className="section-heading">
            <h2>Today's Tasks</h2>
            <button type="button">View all</button>
          </div>
          <div className="stack">
            {todaysTasks.length ? (
              todaysTasks.map((task) => <TaskCard task={task} onToggle={toggleTask} key={task.id} />)
            ) : (
              <p className="empty-state">No tasks due today. Add one from the Tasks page.</p>
            )}
          </div>
        </section>

        <section className="panel">
          <div className="section-heading">
            <h2>Upcoming Reminders</h2>
          </div>
          <div className="stack">
            {upcomingReminders.length ? (
              upcomingReminders.map((reminder) => <ReminderCard reminder={reminder} key={reminder.id} />)
            ) : (
              <p className="empty-state">No reminders scheduled. Add one from the Reminders page.</p>
            )}
          </div>
        </section>

        <section className="panel productivity-panel">
          <div className="section-heading">
            <h2>Productivity Summary</h2>
            <span>Weekly</span>
          </div>
          <div className="progress-row">
            <span>Completion</span>
            <strong>{completionRate}%</strong>
          </div>
          <div className="progress-track">
            <span style={{ width: `${completionRate}%` }} />
          </div>
          <p>
            {completedTasks.length} completed, {pendingTasks.length} pending,{' '}
            {completedTasks.length ? '1 day streak active.' : 'start your streak today.'}
          </p>
        </section>

        <CalendarPreview />
      </div>
    </div>
  )
}

export default Dashboard
