const stats = [
  ['Completed today', '5'],
  ['Pending tasks', '3'],
  ['Weekly progress', '68%'],
  ['Monthly progress', '41%'],
  ['Total notes', '12'],
  ['Total reminders', '7'],
]

function Analytics() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h1>Measure your momentum.</h1>
        </div>
      </div>
      <section className="dashboard-grid">
        {stats.map(([label, value]) => (
          <article className="metric-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Analytics
