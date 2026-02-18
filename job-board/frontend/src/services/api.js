import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  register: (name, email, password, role) =>
    api.post('/auth/register', { name, email, password, role }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
}

export const jobService = {
  getJobs: (params) => api.get('/jobs', { params }),
  getFeaturedJobs: () => api.get('/jobs/featured'),
  getJobDetail: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
}

export const applicationService = {
  apply: (jobId, coverLetter, resumeUrl) =>
    api.post('/applications', { jobId, coverLetter, resumeUrl }),
  getMyApplications: () => api.get('/applications/candidate/my-applications'),
  getApplications: () => api.get('/applications/employer/applications'),
  updateApplicationStatus: (id, status) =>
    api.put(`/applications/${id}`, { status }),
}

export const employerService = {
  getDashboard: () => api.get('/employer/dashboard'),
  getJobs: () => api.get('/employer/jobs'),
}

export const candidateService = {
  getProfile: () => api.get('/candidate/profile'),
  updateProfile: (data) => api.put('/candidate/profile', data),
  getDashboard: () => api.get('/candidate/dashboard'),
}

export default api
