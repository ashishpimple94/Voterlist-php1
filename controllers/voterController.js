/**
 * Voter Controller
 * Handles business logic for voter operations
 */

const Voter = require('../models/Voter');

// Get all voters
exports.getAllVoters = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;

        const voters = await Voter.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Voter.countDocuments();

        res.json({
            status: 'success',
            data: voters,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching voters:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch voters',
            error: error.message
        });
    }
};

// Get voter by ID
exports.getVoterById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const voter = await Voter.findOne({ epicNumber: id });
        
        if (!voter) {
            return res.status(404).json({
                status: 'error',
                message: 'Voter not found'
            });
        }

        res.json({
            status: 'success',
            data: voter
        });
    } catch (error) {
        console.error('Error fetching voter:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch voter',
            error: error.message
        });
    }
};

// Create voter
exports.createVoter = async (req, res) => {
    try {
        const voter = new Voter(req.body);
        await voter.save();

        res.status(201).json({
            status: 'success',
            data: voter
        });
    } catch (error) {
        console.error('Error creating voter:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create voter',
            error: error.message
        });
    }
};

// Update voter
exports.updateVoter = async (req, res) => {
    try {
        const { id } = req.params;
        
        const voter = await Voter.findOneAndUpdate(
            { epicNumber: id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!voter) {
            return res.status(404).json({
                status: 'error',
                message: 'Voter not found'
            });
        }

        res.json({
            status: 'success',
            data: voter
        });
    } catch (error) {
        console.error('Error updating voter:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to update voter',
            error: error.message
        });
    }
};

// Delete voter
exports.deleteVoter = async (req, res) => {
    try {
        const { id } = req.params;
        
        const voter = await Voter.findOneAndDelete({ epicNumber: id });

        if (!voter) {
            return res.status(404).json({
                status: 'error',
                message: 'Voter not found'
            });
        }

        res.json({
            status: 'success',
            message: 'Voter deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting voter:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete voter',
            error: error.message
        });
    }
};

// Bulk upload
exports.bulkUpload = async (req, res) => {
    try {
        const { voters } = req.body;

        if (!voters || !Array.isArray(voters)) {
            return res.status(400).json({
                status: 'error',
                message: 'Voters array is required'
            });
        }

        const results = await Promise.allSettled(
            voters.map(voterData => {
                const voter = new Voter(voterData);
                return voter.save();
            })
        );

        const successful = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        res.json({
            status: 'success',
            message: 'Bulk upload completed',
            summary: {
                total: voters.length,
                successful,
                failed
            }
        });
    } catch (error) {
        console.error('Error in bulk upload:', error);
        res.status(500).json({
            status: 'error',
            message: 'Bulk upload failed',
            error: error.message
        });
    }
};

