import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { employerService, jobService } from '../services/api'
import './Dashboard.css'

function EmployerDashboard() {
  const navigate = useNavigate()
  const [dashboard, setDashboard] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showPostForm, setShowPostForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    jobType: 'Full-time',
    salary: { min: 0, max: 0 },
    skills: [],
    requirements: [],
  })

  useEffect(() => {
    fetchDashboard()
    fetchJobs()
  }, [])

  const fetchDashboard = async () => {
    try {
      const response = await employerService.getDashboard()
      setDashboard(response.data)
    } catch (err) {
      setError('Failed to load dashboard')
      console.error(err)
    }
  }

  const fetchJobs = async () => {
    try {
      const response = await employerService.getJobs()
      setJobs(response.data)
      setLoading(false)
    } catch (err) {
      setError('Failed to load jobs')
      setLoading(false)
      console.error(err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePostJob = async (e) => {
    e.preventDefault()
    try {
      await jobService.createJob(formData)
      alert('Job posted successfully!')
      setShowPostForm(false)
      setFormData({
        title: '',
        company: '',
        description: '',
        location: '',
        jobType: 'Full-time',
        salary: { min: 0, max: 0 },
        skills: [],
        requirements: [],
      })
      fetchJobs()
    } catch (err) {
      alert('Failed to post job: ' + (err.response?.data?.error || err.message))
    }
  }

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await jobService.deleteJob(jobId)
        alert('Job deleted successfully!')
        fetchJobs()
      } catch (err) {
        alert('Failed to delete job: ' + (err.response?.data?.error || err.message))
      }
    }
  }

  if (loading) return <main className="container"><p>Loading dashboard...</p></main>

  return (
    <main className="container dashboard-page">
      <h1>Employer Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {dashboard && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{dashboard.totalJobs}</h3>
            <p>Active Jobs</p>
          </div>
          <div className="stat-card">
            <h3>{dashboard.totalApplications}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card">
            <h3>{dashboard.featuredJobs}</h3>
            <p>Featured Jobs</p>
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="btn btn-primary"
        >
          {showPostForm ? 'Cancel' : '+ Post a New Job'}
        </button>
      </div>

      {showPostForm && (
        <form onSubmit={handlePostJob} className="card post-job-form">
          <h2>Post a New Job</h2>

          <div className="form-group">
            <label htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Senior Software Engineer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              placeholder="Tech Company Inc"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="5"
              placeholder="Describe the job responsibilities and requirements..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="New York, NY"
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobType">Job Type</label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Temporary</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            Post Job
          </button>
        </form>
      )}

      <h2>Your Active Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet. <button onClick={() => setShowPostForm(true)} className="link-btn">Post your first job</button></p>
      ) : (
        <div className="jobs-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Applications</th>
                <th>Posted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.location}</td>
                  <td>{job.jobType}</td>
                  <td>{job.applicants?.length || 0}</td>
                  <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}

export default EmployerDashboard
