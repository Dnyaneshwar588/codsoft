const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  resume: {
    url: String,
    filename: String,
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ['applied', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
    default: 'applied',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  notes: String,
});

module.exports = mongoose.model('Application', applicationSchema);
