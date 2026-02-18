import { useState, useEffect } from 'react'
import { candidateService, applicationService } from '../services/api'
import './Dashboard.css'

function CandidateDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboard()
    fetchApplications()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await candidateService.getDashboard()
      setDashboard(response.data)
    } catch (err) {
      setError('Failed to load dashboard')
      console.error(err)
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await applicationService.getMyApplications()
      setApplications(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load applications')
      setLoading(false)
      console.error(err)
    }
  }

  if (loading) return <main className="container"><p>Loading dashboard...</p></main>

  return (
    <main className="container dashboard-page">
      <h1>Candidate Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {dashboard && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{dashboard.totalApplications}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>{dashboard.statuses.shortlisted}</h3>
            <p>Shortlisted</p>
          </div>
          <div className="stat-card">
            <h3>{dashboard.statuses.accepted}</h3>
            <p>Accepted</p>
          </div>
          <div className="stat-card">
            <h3>{dashboard.statuses.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>
      )}

      <h2>Your Applications</h2>
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet. <a href="/jobs">Browse jobs</a></p>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app._id} className="application-item card">
              <div>
                <h3>{app.job?.title}</h3>
                <p className="company">{app.job?.company}</p>
                <p className="location">📍 {app.job?.location}</p>
                <div className="application-meta">
                  <span className={`status status-${app.status}`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                  <span className="date">Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

export default CandidateDashboard
