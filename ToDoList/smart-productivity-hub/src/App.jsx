import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import NotificationCenter from './components/NotificationCenter/NotificationCenter'
import Sidebar from './components/Sidebar/Sidebar'
import Analytics from './pages/Analytics/Analytics'
import Calendar from './pages/Calendar/Calendar'
import Dashboard from './pages/Dashboard/Dashboard'
import Notes from './pages/Notes/Notes'
import Reminders from './pages/Reminders/Reminders'
import Settings from './pages/Settings/Settings'
import Tasks from './pages/Tasks/Tasks'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <NotificationCenter />
      <Sidebar />
      <div className="workspace">
        <Navbar />
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
