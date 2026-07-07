import {
  BarChart3,
  Bell,
  CalendarDays,
  CheckSquare,
  LayoutDashboard,
  NotebookTabs,
  Settings,
  Sparkles,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Tasks', path: '/tasks', icon: CheckSquare },
  { label: 'Notes', path: '/notes', icon: NotebookTabs },
  { label: 'Reminders', path: '/reminders', icon: Bell },
  { label: 'Calendar', path: '/calendar', icon: CalendarDays },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Settings', path: '/settings', icon: Settings },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/" aria-label="Smart Productivity Hub home">
        <span className="brand-mark">
          <Sparkles size={20} />
        </span>
        <span>
          <strong>Smart Hub</strong>
          <small>Productivity</small>
        </span>
      </NavLink>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}>
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
