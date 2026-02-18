import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobService, applicationService } from '../services/api'
import './JobDetailPage.css'

function JobDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applying, setApplying] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    coverLetter: '',
    resumeUrl: '',
  })

  useEffect(() => {
    fetchJobDetail()
  }, [id])

  const fetchJobDetail = async () => {
    try {
      setLoading(true)
      const response = await jobService.getJobDetail(id)
      setJob(response.data)
    } catch (err) {
      setError('Failed to load job details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleApply = async (e) => {
    e.preventDefault()
    try {
      setApplying(true)
      await applicationService.apply(id, formData.coverLetter, formData.resumeUrl)
      alert('Application submitted successfully!')
      setShowForm(false)
      setFormData({ coverLetter: '', resumeUrl: '' })
    } catch (err) {
      alert('Failed to submit application: ' + (err.response?.data?.error || err.message))
    } finally {
      setApplying(false)
    }
  }

  if (loading) return <main className="container"><p>Loading job details...</p></main>
  if (error) return <main className="container"><div className="alert alert-error">{error}</div></main>
  if (!job) return <main className="container"><p>Job not found</p></main>

  return (
    <main className="container job-detail-page">
      <button onClick={() => navigate('/jobs')} className="btn btn-secondary">
        ← Back to Jobs
      </button>

      <div className="job-header">
        <div>
          <h1>{job.title}</h1>
          <p className="company">{job.company}</p>
          <p className="location">📍 {job.location}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary btn-large"
        >
          {showForm ? 'Cancel' : 'Apply Now'}
        </button>
      </div>

      <div className="job-body">
        <div className="job-main">
          <h2>About the Job</h2>
          <p>{job.description}</p>

          <h2>Requirements</h2>
          <ul>
            {job.requirements?.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>

          {job.skills && job.skills.length > 0 && (
            <>
              <h2>Required Skills</h2>
              <div className="skills-list">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="job-sidebar">
          {job.salary?.min && (
            <div className="info-box">
              <h3>Salary</h3>
              <p className="salary">
                ₹{(job.salary.min / 100000).toFixed(1)}L - ₹{(job.salary.max / 100000).toFixed(1)}L / year
              </p>
            </div>
          )}

          <div className="info-box">
            <h3>Job Type</h3>
            <p>{job.jobType}</p>
          </div>

          {job.category && (
            <div className="info-box">
              <h3>Category</h3>
              <p>{job.category}</p>
            </div>
          )}

          <div className="info-box">
            <h3>Posted by</h3>
            <p>{job.employer?.name}</p>
            {job.employer?.email && <p className="email">{job.employer.email}</p>}
          </div>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleApply} className="application-form card">
          <h2>Apply for this Job</h2>

          <div className="form-group">
            <label htmlFor="resumeUrl">Resume URL</label>
            <input
              type="text"
              id="resumeUrl"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/resume.pdf"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows="5"
              placeholder="Tell us why you're a great fit for this job..."
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={applying}>
            {applying ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </main>
  )
}

export default JobDetailPage
