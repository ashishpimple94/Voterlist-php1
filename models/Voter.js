/**
 * Voter Model - MongoDB Schema
 */

const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    epicNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    address: {
        type: String
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    constituency: {
        type: String
    },
    assemblyConstituency: {
        type: String
    },
    boothNumber: {
        type: String
    },
    partNumber: {
        type: String
    },
    serialNumber: {
        type: String
    },
    fatherHusbandName: {
        type: String
    },
    houseNumber: {
        type: String
    },
    additionalData: {
        type: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true,
    collection: 'voters'
});

// Indexes (epicNumber index is already created by unique: true, so only add text search)
voterSchema.index({ name: 'text' });

module.exports = mongoose.model('Voter', voterSchema);

