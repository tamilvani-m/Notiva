import CalendarPreview from '../../components/Calendar/Calendar'

function Calendar() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Calendar</p>
          <h1>Monthly planning view.</h1>
        </div>
      </div>
      <CalendarPreview />
    </div>
  )
}

export default Calendar
