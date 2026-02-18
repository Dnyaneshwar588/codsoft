import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jobService } from '../services/api'
import './JobListingsPage.css'

function JobListingsPage() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    jobType: '',
  })

  useEffect(() => {
    fetchJobs()
  }, [filters, search])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await jobService.getJobs({
        search,
        ...filters,
      })
      setJobs(response.data)
    } catch (err) {
      setError('Failed to load jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Search is already triggered on state change via useEffect
  }

  const handleClearFilters = () => {
    setSearch('')
    setFilters({
      category: '',
      location: '',
      jobType: '',
    })
  }

  return (
    <main className="container job-listings-page">
      <h1>Job Listings</h1>

      <div className="filters-section">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by job title, company, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="btn btn-primary search-btn">
              🔍 Search
            </button>
          </div>
        </form>

        <div className="filters">
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>

          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Chennai">Chennai</option>
            <option value="Gurgaon">Gurgaon</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Remote">Remote</option>
          </select>

          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
          </select>

          {(search || filters.category || filters.location || filters.jobType) && (
            <button onClick={handleClearFilters} className="btn btn-secondary clear-filters">
              ✕ Clear Filters
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <p className="loading-text">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="no-results">No jobs found. Try adjusting your search or filters.</p>
      ) : (
        <>
          <div className="results-info">
            <p>Found <strong>{jobs.length}</strong> job{jobs.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job._id} className="job-item">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p className="company">{job.company}</p>
                  <p className="location">📍 {job.location}</p>
                  <div className="job-details">
                    <span className="job-type">{job.jobType}</span>
                    {job.salary?.min && (
                      <span className="salary">
                        ₹{(job.salary.min / 100000).toFixed(1)}L - ₹{(job.salary.max / 100000).toFixed(1)}L
                      </span>
                    )}
                  </div>
                </div>
                <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  )
}

export default JobListingsPage
