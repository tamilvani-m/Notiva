import { Bell, Menu, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="topbar">
      <button type="button" className="icon-button mobile-only" aria-label="Open menu" title="Menu">
        <Menu size={20} />
      </button>

      <SearchBar />

      <div className="topbar-actions">
        <button type="button" className="primary-action" onClick={() => navigate('/tasks')}>
          <Plus size={18} />
          <span>Quick Add</span>
        </button>
        <button type="button" className="icon-button" aria-label="Notifications" title="Notifications">
          <Bell size={19} />
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Navbar
