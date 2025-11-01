/**
 * MongoDB Database Configuration
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Skip connection if MongoDB URI not provided
        if (!process.env.MONGO_CONNECTION_STRING && !process.env.MONGO_HOST) {
            console.log('⚠️ MongoDB connection string not found. Skipping database connection.');
            console.log('💡 Set MONGO_CONNECTION_STRING in your .env file');
            return;
        }

        // Get connection string from environment variables
        let mongoURI;
        
        if (process.env.MONGO_CONNECTION_STRING) {
            mongoURI = process.env.MONGO_CONNECTION_STRING.trim();
            
            // Replace password placeholder if exists
            if (mongoURI.includes('<db_password>')) {
                if (!process.env.MONGO_PASSWORD) {
                    console.error('❌ MONGO_PASSWORD is required when using <db_password> placeholder');
                    return;
                }
                mongoURI = mongoURI.replace('<db_password>', encodeURIComponent(process.env.MONGO_PASSWORD));
            }
            
            // Add database name if not present in connection string
            if (!mongoURI.includes('/voter_db') && !mongoURI.includes('/?') && process.env.MONGO_DB) {
                const dbName = process.env.MONGO_DB;
                // Replace ? with /dbname? if ? exists, else append /dbname
                if (mongoURI.includes('?')) {
                    mongoURI = mongoURI.replace('?', `/${dbName}?`);
                } else {
                    mongoURI = mongoURI.endsWith('/') ? `${mongoURI}${dbName}` : `${mongoURI}/${dbName}`;
                }
            }
        } else {
            // Fallback: construct connection string
            const host = process.env.MONGO_HOST || 'localhost';
            const port = process.env.MONGO_PORT || '27017';
            const db = process.env.MONGO_DB || 'voter_db';
            const user = process.env.MONGO_USER || '';
            const password = process.env.MONGO_PASSWORD || '';
            
            if (user && password) {
                const encodedUser = encodeURIComponent(user);
                const encodedPassword = encodeURIComponent(password);
                mongoURI = `mongodb://${encodedUser}:${encodedPassword}@${host}:${port}/${db}?authSource=admin`;
            } else {
                mongoURI = `mongodb://${host}:${port}/${db}`;
            }
        }

        // Log connection attempt (hide credentials)
        const safeURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
        console.log(`🔌 Connecting to MongoDB...`);
        console.log(`📍 URI: ${safeURI.split('@')[1] || safeURI}`);

        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(mongoURI, options);

        console.log('✅ MongoDB connected successfully');
        console.log(`📍 Database: ${mongoose.connection.db?.databaseName || process.env.MONGO_DB || 'voter_db'}`);

    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('');
        console.error('💡 Troubleshooting:');
        console.error('   1. Check MONGO_CONNECTION_STRING format is correct');
        console.error('   2. Verify MONGO_PASSWORD is correct (check for special characters)');
        console.error('   3. Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0 (or your IP)');
        console.error('   4. Verify username and database name are correct');
        console.error('');
        // Don't exit process, let the app continue without DB
    }
};

// Handle disconnection
mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message);
});

module.exports = connectDB;
