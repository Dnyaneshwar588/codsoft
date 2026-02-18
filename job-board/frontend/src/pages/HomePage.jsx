import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jobService } from '../services/api'
import './HomePage.css'

function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFeaturedJobs()
  }, [])

  const fetchFeaturedJobs = async () => {
    try {
      setLoading(true)
      const response = await jobService.getFeaturedJobs()
      setFeaturedJobs(response.data)
    } catch (err) {
      setError('Failed to load featured jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container home-page">
      <section className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Discover thousands of job opportunities with all the information you need</p>
        <Link to="/jobs" className="btn btn-primary">
          Browse All Jobs
        </Link>
      </section>

      <section className="featured-jobs">
        <h2>Featured Opportunities</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {loading ? (
          <p>Loading featured jobs...</p>
        ) : (
          <div className="grid">
            {featuredJobs.map((job) => (
              <div key={job._id} className="card job-card">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">📍 {job.location}</p>
                <p className="salary">
                  ₹{(job.salary?.min / 100000).toFixed(1)}L - ₹{(job.salary?.max / 100000).toFixed(1)}L
                </p>
                <p className="job-type">{job.jobType}</p>
                <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="features">
        <h2>Why Choose JobBoard?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Easy to Use</h3>
            <p>Simple and intuitive interface for finding jobs</p>
          </div>
          <div className="feature">
            <h3>Quick Apply</h3>
            <p>Apply to multiple jobs with just a few clicks</p>
          </div>
          <div className="feature">
            <h3>Notifications</h3>
            <p>Get alerts for new job opportunities</p>
          </div>
          <div className="feature">
            <h3>Secure</h3>
            <p>Your data is protected with advanced security</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
