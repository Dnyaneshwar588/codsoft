const express = require('express');
const User = require('../models/User');
const Application = require('../models/Application');
const auth = require('../middleware/auth');

const router = express.Router();

// Get candidate profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update candidate profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, bio, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, bio, avatar },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get candidate dashboard
router.get('/dashboard', auth, async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user.id });
    const totalApplications = applications.length;
    const appliedJobs = await Application.find({ candidate: req.user.id }).populate('job');
    const statuses = {
      applied: applications.filter(app => app.status === 'applied').length,
      reviewed: applications.filter(app => app.status === 'reviewed').length,
      shortlisted: applications.filter(app => app.status === 'shortlisted').length,
      rejected: applications.filter(app => app.status === 'rejected').length,
      accepted: applications.filter(app => app.status === 'accepted').length,
    };

    res.json({
      totalApplications,
      appliedJobs: appliedJobs.slice(0, 5),
      statuses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
