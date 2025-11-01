/**
 * Voter Routes
 * API endpoints for voter operations
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const voterController = require('../controllers/voterController');
const uploadController = require('../controllers/uploadController');

// Multer middleware for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Get all voters
router.get('/', voterController.getAllVoters);

// MongoDB-specific route
router.get('/mongo', voterController.getAllVoters);

// Get voter by ID
router.get('/:id', voterController.getVoterById);

// Create voter
router.post('/', voterController.createVoter);

// Update voter
router.put('/:id', voterController.updateVoter);

// Delete voter
router.delete('/:id', voterController.deleteVoter);

// Upload Excel/CSV file
router.post('/upload', upload.single('file'), uploadController.uploadFile);

// Bulk upload
router.post('/bulk', voterController.bulkUpload);

module.exports = router;

