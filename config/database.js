/**
 * MongoDB Database Configuration
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Get connection string from environment variables
        let mongoURI;
        
        if (process.env.MONGO_CONNECTION_STRING) {
            // Replace password placeholder if exists
            mongoURI = process.env.MONGO_CONNECTION_STRING.replace(
                '<db_password>',
                process.env.MONGO_PASSWORD || ''
            );
        } else {
            // Fallback: construct connection string
            const host = process.env.MONGO_HOST || 'localhost';
            const port = process.env.MONGO_PORT || '27017';
            const db = process.env.MONGO_DB || 'voter_db';
            const user = process.env.MONGO_USER || '';
            const password = process.env.MONGO_PASSWORD || '';
            
            if (user && password) {
                mongoURI = `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
            } else {
                mongoURI = `mongodb://${host}:${port}/${db}`;
            }
        }

        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(mongoURI, options);

        console.log('✅ MongoDB connected successfully');
        console.log(`📍 Database: ${process.env.MONGO_DB || 'voter_db'}`);

    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        // Don't exit process, let the app continue
        // process.exit(1);
    }
};

// Handle disconnection
mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err);
});

module.exports = connectDB;

