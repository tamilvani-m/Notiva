const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const dates = Array.from({ length: 35 }, (_, index) => index + 1)

function CalendarPreview() {
  return (
    <section className="calendar-widget" aria-label="Calendar preview">
      <div className="section-heading">
        <h2>Calendar Preview</h2>
        <span>July 2026</span>
      </div>
      <div className="calendar-grid compact">
        {days.map((day) => (
          <span className="weekday" key={day}>
            {day}
          </span>
        ))}
        {dates.map((date) => (
          <button className={date === 6 ? 'today' : ''} type="button" key={date}>
            {date}
          </button>
        ))}
      </div>
    </section>
  )
}

export default CalendarPreview
