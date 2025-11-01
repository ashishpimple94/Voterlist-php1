/**
 * MongoDB Authentication Debug Script
 * Tests actual MongoDB connection with detailed error messages
 */

require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    console.log('🔍 Testing MongoDB Authentication...\n');
    
    // Check required variables
    if (!process.env.MONGO_CONNECTION_STRING) {
        console.error('❌ MONGO_CONNECTION_STRING not found in .env');
        process.exit(1);
    }
    
    if (!process.env.MONGO_PASSWORD) {
        console.error('❌ MONGO_PASSWORD not found in .env');
        process.exit(1);
    }
    
    // Build connection string
    let mongoURI = process.env.MONGO_CONNECTION_STRING.trim();
    
    if (mongoURI.includes('<db_password>')) {
        const password = process.env.MONGO_PASSWORD.trim();
        const encodedPassword = encodeURIComponent(password);
        mongoURI = mongoURI.replace('<db_password>', encodedPassword);
        console.log('✅ Password placeholder replaced');
    }
    
    // Add database name
    const dbName = process.env.MONGO_DB || 'voter_db';
    const dbNamePattern = /@[^/]+\/([^/?]+)/;
    const existingDb = mongoURI.match(dbNamePattern);
    
    if (!existingDb || existingDb[1].trim() === '') {
        if (mongoURI.includes('/?')) {
            mongoURI = mongoURI.replace('/?', `/${dbName}?`);
        } else if (mongoURI.match(/@[^/]+\?/)) {
            mongoURI = mongoURI.replace(/(@[^/]+)\?/, `$1/${dbName}?`);
        } else {
            const qIndex = mongoURI.indexOf('?');
            if (qIndex !== -1) {
                mongoURI = mongoURI.substring(0, qIndex) + `/${dbName}` + mongoURI.substring(qIndex);
            } else {
                mongoURI = mongoURI + `/${dbName}`;
            }
        }
    }
    
    // Extract username from connection string for display
    const userMatch = mongoURI.match(/mongodb\+srv:\/\/([^:]+):/);
    const username = userMatch ? userMatch[1] : 'unknown';
    
    console.log(`👤 Username: ${username}`);
    console.log(`📦 Database: ${dbName}`);
    console.log(`🔗 Connecting...\n`);
    
    try {
        const options = {
            maxPoolSize: 1,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };
        
        await mongoose.connect(mongoURI, options);
        
        console.log('✅ SUCCESS! MongoDB authentication successful!');
        console.log(`📍 Connected to database: ${mongoose.connection.db?.databaseName}`);
        
        // Test a simple operation
        await mongoose.connection.db.admin().ping();
        console.log('✅ Database ping successful!');
        
        await mongoose.disconnect();
        console.log('\n🎉 All tests passed! Your MongoDB credentials are correct.');
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ CONNECTION FAILED!\n');
        
        if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
            console.error('🔴 AUTHENTICATION ERROR');
            console.error('──────────────────────');
            console.error('Possible causes:');
            console.error('  1. ❌ Username is incorrect');
            console.error('  2. ❌ Password is incorrect');
            console.error('  3. ❌ User does not exist in MongoDB Atlas');
            console.error('  4. ❌ User exists but password was changed');
            console.error('\n💡 Solution Steps:');
            console.error('  Step 1: Go to MongoDB Atlas Dashboard');
            console.error('  Step 2: Click "Database Access" (left sidebar)');
            console.error('  Step 3: Find user:', username);
            console.error('  Step 4: Click "Edit" or verify password');
            console.error('  Step 5: If needed, click "Edit" → "Edit Password" → Reset password');
            console.error('  Step 6: Copy the NEW password');
            console.error('  Step 7: Update .env file: MONGO_PASSWORD=new_password');
            console.error('\n📋 Quick Check:');
            console.error('  - Username in Atlas should be:', username);
            console.error('  - Password in .env should match Atlas password');
            
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
            console.error('🔴 NETWORK ERROR');
            console.error('Cannot reach MongoDB Atlas servers');
            console.error('Check your internet connection');
            
        } else if (error.message.includes('timeout')) {
            console.error('🔴 TIMEOUT ERROR');
            console.error('MongoDB Atlas connection timed out');
            console.error('Possible causes:');
            console.error('  - IP address not whitelisted');
            console.error('  - Firewall blocking connection');
            console.error('\n💡 Solution:');
            console.error('  1. MongoDB Atlas → Network Access');
            console.error('  2. Click "Add IP Address"');
            console.error('  3. Select "Allow Access from Anywhere" (0.0.0.0/0)');
            console.error('  4. Click "Confirm"');
            
        } else {
            console.error('🔴 UNKNOWN ERROR');
            console.error('Error:', error.message);
            console.error('Code:', error.code || 'N/A');
        }
        
        console.error('\n📋 Current Configuration:');
        console.error('  Username:', username);
        console.error('  Database:', dbName);
        const safeURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
        console.error('  Connection:', safeURI);
        
        process.exit(1);
    }
}

testConnection();

