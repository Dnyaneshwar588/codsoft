const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply for a job
router.post('/', auth, async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Check if already applied
    const existing = await Application.findOne({ job: jobId, candidate: req.user.id });
    if (existing) {
      return res.status(400).json({ error: 'Already applied for this job' });
    }

    const application = new Application({
      job: jobId,
      candidate: req.user.id,
      coverLetter,
      resume: { url: resumeUrl },
    });

    await application.save();
    job.applicants.push(application._id);
    await job.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get candidate applications
router.get('/candidate/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user.id })
      .populate('job')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get employer applications for jobs
router.get('/employer/applications', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).select('_id');
    const jobIds = jobs.map(job => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate('job')
      .populate('candidate', 'name email phone')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update application status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
