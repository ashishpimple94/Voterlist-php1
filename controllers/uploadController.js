/**
 * Upload Controller
 * Handles file uploads (Excel/CSV)
 */

const XLSX = require('xlsx');
const Voter = require('../models/Voter');

// Upload and process Excel/CSV file
exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 'error',
                message: 'No file uploaded'
            });
        }

        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Process and validate data
        const voters = data.map(row => {
            return {
                epicNumber: row['EPIC Number'] || row['EPIC'] || row['epicNumber'],
                name: row['Name'] || row['name'] || row['Full Name'],
                age: parseInt(row['Age'] || row['age'] || 0),
                gender: row['Gender'] || row['gender'],
                address: row['Address'] || row['address'],
                state: row['State'] || row['state'],
                district: row['District'] || row['district'],
                constituency: row['Constituency'] || row['constituency'],
                assemblyConstituency: row['Assembly Constituency'] || row['Assembly'] || row['assembly'],
                boothNumber: row['Booth Number'] || row['Booth'] || row['booth'],
                partNumber: row['Part Number'] || row['Part'] || row['part'],
                serialNumber: row['Serial Number'] || row['Serial'] || row['serial'],
                fatherHusbandName: row['Father/Husband Name'] || row['Father Name'] || row['fatherName'],
                houseNumber: row['House Number'] || row['House'] || row['house'],
                additionalData: row
            };
        }).filter(voter => voter.epicNumber); // Filter out rows without EPIC number

        // Save to database
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
            message: 'File uploaded and processed',
            summary: {
                totalRows: data.length,
                validRows: voters.length,
                imported: successful,
                failed: failed
            },
            data: voters.slice(0, 10) // Return first 10 for preview
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to process file',
            error: error.message
        });
    }
};

