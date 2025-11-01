/**
 * MongoDB Database Configuration
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    let mongoURI = ''; // Declare outside try block for error handling
    
    try {
        // Skip connection if MongoDB URI not provided
        if (!process.env.MONGO_CONNECTION_STRING && !process.env.MONGO_HOST) {
            console.log('⚠️ MongoDB connection string not found. Skipping database connection.');
            console.log('💡 Set MONGO_CONNECTION_STRING in your .env file');
            return;
        }

        // Get connection string from environment variables
        
        if (process.env.MONGO_CONNECTION_STRING) {
            mongoURI = process.env.MONGO_CONNECTION_STRING.trim();
            
            // Replace password placeholder if exists
            if (mongoURI.includes('<db_password>')) {
                if (!process.env.MONGO_PASSWORD) {
                    console.error('❌ MONGO_PASSWORD is required when using <db_password> placeholder');
                    console.error('💡 Add MONGO_PASSWORD=your_password to your .env file');
                    return;
                }
                const password = process.env.MONGO_PASSWORD.trim();
                // URL encode password to handle special characters
                const encodedPassword = encodeURIComponent(password);
                mongoURI = mongoURI.replace('<db_password>', encodedPassword);
                console.log('🔐 Password placeholder replaced');
            }
            
            // Add database name if not present in connection string
            const dbName = process.env.MONGO_DB || 'voter_db';
            // Check if database name already exists (between / and ?)
            const dbNamePattern = /@[^/]+\/([^/?]+)/;
            const existingDb = mongoURI.match(dbNamePattern);
            
            if (!existingDb || existingDb[1].trim() === '') {
                // No database name or empty, add it
                // Common pattern: mongodb+srv://user:pass@host/?options -> mongodb+srv://user:pass@host/dbname?options
                if (mongoURI.includes('/?')) {
                    // Replace /? with /dbname?
                    mongoURI = mongoURI.replace('/?', `/${dbName}?`);
                } else if (mongoURI.match(/@[^/]+\?/)) {
                    // @host?pattern -> @host/dbname?pattern
                    mongoURI = mongoURI.replace(/(@[^/]+)\?/, `$1/${dbName}?`);
                } else if (!mongoURI.includes('@') || !mongoURI.match(/@[^/]+\//)) {
                    // No / after host, append /dbname
                    const qIndex = mongoURI.indexOf('?');
                    if (qIndex !== -1) {
                        mongoURI = mongoURI.substring(0, qIndex) + `/${dbName}` + mongoURI.substring(qIndex);
                    } else {
                        mongoURI = mongoURI + `/${dbName}`;
                    }
                }
                console.log(`📂 Database name added: ${dbName}`);
            } else {
                console.log(`ℹ️  Database name already in connection string: ${existingDb[1]}`);
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
        const uriParts = safeURI.split('@');
        if (uriParts.length > 1) {
            console.log(`📍 Host: ${uriParts[1]}`);
        } else {
            console.log(`📍 URI: ${safeURI}`);
        }
        
        // Debug: Check if password was replaced (only in development)
        if (mongoURI.includes('<db_password>')) {
            console.error('❌ ERROR: Password placeholder <db_password> not replaced!');
            console.error('💡 Make sure MONGO_PASSWORD is set in .env file');
            console.error('💡 Run: node test-mongo-connection.js to verify configuration');
            throw new Error('MONGO_PASSWORD not set in .env file');
        }

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
        
        // Extract username for display (if mongoURI is available)
        let username = 'unknown';
        if (mongoURI) {
            const userMatch = mongoURI.match(/mongodb\+srv:\/\/([^:]+):/);
            if (userMatch) {
                username = userMatch[1];
            } else {
                // Try mongodb:// format
                const userMatch2 = mongoURI.match(/mongodb:\/\/([^:]+):/);
                if (userMatch2) {
                    username = userMatch2[1];
                }
            }
        } else {
            // Fallback: try to get username from env
            const connectionString = process.env.MONGO_CONNECTION_STRING || '';
            const userMatch = connectionString.match(/mongodb\+srv:\/\/([^:]+):/);
            if (userMatch) {
                username = userMatch[1];
            }
        }
        
        if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
            console.error('🔴 AUTHENTICATION FAILED');
            console.error('───────────────────────');
            console.error('This usually means:');
            console.error('  • Username or password is incorrect');
            console.error('  • User does not exist in MongoDB Atlas');
            console.error('  • Password was changed but .env not updated');
            console.error('');
            console.error('💡 Quick Fix:');
            console.error('  1. MongoDB Atlas Dashboard → Database Access');
            console.error('  2. Find user:', username);
            console.error('  3. Edit → Reset Password → Copy new password');
            console.error('  4. Update .env: MONGO_PASSWORD=new_password');
            console.error('  5. Run: node debug-mongo-auth.js to test');
            console.error('');
        } else if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
            console.error('🔴 NETWORK/TIMEOUT ERROR');
            console.error('──────────────────────');
            console.error('Check:');
            console.error('  1. IP whitelist in MongoDB Atlas (Network Access)');
            console.error('  2. Add 0.0.0.0/0 to allow all IPs');
            console.error('  3. Internet connection');
            console.error('');
        }
        
        console.error('🔧 Run diagnostic: node debug-mongo-auth.js');
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
