const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Get employer dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id });
    const totalJobs = jobs.length;
    const totalApplications = jobs.reduce((sum, job) => sum + job.applicants.length, 0);
    const featuredJobs = jobs.filter(job => job.featured).length;

    res.json({
      totalJobs,
      totalApplications,
      featuredJobs,
      recentJobs: jobs.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get employer jobs
router.get('/jobs', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
