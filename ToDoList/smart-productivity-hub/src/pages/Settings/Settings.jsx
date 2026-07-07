import { Download, Trash2, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle'
import { useAppData } from '../../hooks/useAppData'

const settings = [
  'Notification preferences',
  'Export data',
  'Import data',
  'Delete all data',
  'Change app theme',
]

function Settings() {
  const { tasks, notes, reminders, settings: appSettings, updateSettings, replaceData, resetData } = useAppData()
  const [activeSetting, setActiveSetting] = useState('Notification preferences')
  const [message, setMessage] = useState('')
  const fileInputRef = useRef(null)

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      setMessage('Browser notifications are not supported here.')
      return
    }

    const permission = await Notification.requestPermission()
    const enabled = permission === 'granted'

    updateSettings({ notificationsEnabled: enabled })
    setMessage(enabled ? 'Notifications enabled.' : 'Notification permission was not granted.')

    if (enabled) {
      new Notification('Smart Hub notifications enabled', {
        body: 'You will be able to receive reminder alerts from this app.',
      })
    }
  }

  const changeNotificationPreference = (enabled) => {
    if (!enabled) {
      updateSettings({ notificationsEnabled: false })
      setMessage('Notifications disabled in app settings.')
      return
    }

    requestNotificationPermission()
  }

  const exportData = () => {
    const fileData = JSON.stringify({ tasks, notes, reminders, settings: appSettings }, null, 2)
    const blob = new Blob([fileData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'smart-productivity-hub-data.json'
    link.click()
    URL.revokeObjectURL(url)
    setMessage('Data export downloaded.')
  }

  const importData = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        replaceData(JSON.parse(reader.result))
        setMessage('Data imported successfully.')
      } catch {
        setMessage('Could not import that file. Please choose a valid JSON export.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const deleteAllData = () => {
    const confirmed = window.confirm('Delete all tasks, notes, reminders, and settings?')

    if (!confirmed) return

    resetData()
    setMessage('All local app data was deleted.')
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Control your workspace.</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="settings-layout">
        <section className="panel settings-list">
          {settings.map((setting) => (
            <button
              type="button"
              className={`settings-row ${activeSetting === setting ? 'active' : ''}`}
              onClick={() => setActiveSetting(setting)}
              key={setting}
            >
              <span>{setting}</span>
              <strong>{activeSetting === setting ? 'Open' : 'Configure'}</strong>
            </button>
          ))}
        </section>

        <section className="panel settings-detail">
          <div className="section-heading">
            <h2>{activeSetting}</h2>
            {message && <span>{message}</span>}
          </div>

          {activeSetting === 'Notification preferences' && (
            <div className="settings-panel-grid">
              <label className="toggle-row">
                <span>
                  <strong>Browser notifications</strong>
                  <small>Ask permission and save your notification preference.</small>
                </span>
                <input
                  type="checkbox"
                  checked={appSettings.notificationsEnabled}
                  onChange={(event) => changeNotificationPreference(event.target.checked)}
                />
              </label>

              <label className="form-field">
                <span>Reminder alert lead time</span>
                <select
                  value={appSettings.notificationLeadTime}
                  onChange={(event) => updateSettings({ notificationLeadTime: event.target.value })}
                >
                  <option value="0">At due time</option>
                  <option value="5">5 minutes before</option>
                  <option value="10">10 minutes before</option>
                  <option value="30">30 minutes before</option>
                </select>
              </label>

              <label className="toggle-row">
                <span>
                  <strong>Sound</strong>
                  <small>Keep this ready for reminder alerts.</small>
                </span>
                <input
                  type="checkbox"
                  checked={appSettings.soundEnabled}
                  onChange={(event) => updateSettings({ soundEnabled: event.target.checked })}
                />
              </label>
            </div>
          )}

          {activeSetting === 'Export data' && (
            <button type="button" className="secondary-action" onClick={exportData}>
              <Download size={18} />
              <span>Download JSON Backup</span>
            </button>
          )}

          {activeSetting === 'Import data' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                className="visually-hidden"
                onChange={importData}
              />
              <button type="button" className="secondary-action" onClick={() => fileInputRef.current?.click()}>
                <Upload size={18} />
                <span>Choose Backup File</span>
              </button>
            </>
          )}

          {activeSetting === 'Delete all data' && (
            <button type="button" className="danger-action" onClick={deleteAllData}>
              <Trash2 size={18} />
              <span>Delete Everything</span>
            </button>
          )}

          {activeSetting === 'Change app theme' && (
            <div className="theme-config">
              <span>Use the theme button to switch between dark and light mode.</span>
              <ThemeToggle />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Settings
