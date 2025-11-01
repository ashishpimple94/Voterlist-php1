/**
 * MongoDB Connection Test Script
 * Run: node test-mongo-connection.js
 */

require('dotenv').config();

console.log('🔍 Checking MongoDB Configuration...\n');

// Check environment variables
console.log('📋 Environment Variables:');
console.log('─────────────────────────');

const checks = {
    'MONGO_CONNECTION_STRING': process.env.MONGO_CONNECTION_STRING,
    'MONGO_PASSWORD': process.env.MONGO_PASSWORD ? '***SET***' : '❌ NOT SET',
    'MONGO_DB': process.env.MONGO_DB || 'voter_db (default)'
};

for (const [key, value] of Object.entries(checks)) {
    if (key === 'MONGO_CONNECTION_STRING' && value) {
        const safeValue = value.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
        console.log(`${key}: ${safeValue}`);
    } else {
        console.log(`${key}: ${value}`);
    }
}

console.log('\n🔍 Validation Checks:');
console.log('─────────────────');

// Validation
let hasErrors = false;

if (!process.env.MONGO_CONNECTION_STRING) {
    console.log('❌ MONGO_CONNECTION_STRING is missing!');
    hasErrors = true;
} else {
    console.log('✅ MONGO_CONNECTION_STRING is set');
    
    if (process.env.MONGO_CONNECTION_STRING.includes('<db_password>')) {
        if (!process.env.MONGO_PASSWORD) {
            console.log('❌ MONGO_PASSWORD is required when using <db_password> placeholder');
            hasErrors = true;
        } else {
            console.log('✅ MONGO_PASSWORD is set');
        }
    } else {
        console.log('ℹ️  Connection string appears to have password already embedded');
    }
}

if (!process.env.MONGO_DB) {
    console.log('⚠️  MONGO_DB not set, will use default: voter_db');
} else {
    console.log(`✅ MONGO_DB: ${process.env.MONGO_DB}`);
}

console.log('\n🔧 Connection String Processing:');
console.log('───────────────────────────────');

if (process.env.MONGO_CONNECTION_STRING) {
    let mongoURI = process.env.MONGO_CONNECTION_STRING.trim();
    
    // Check for password placeholder
    if (mongoURI.includes('<db_password>')) {
        if (process.env.MONGO_PASSWORD) {
            const encodedPassword = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
            mongoURI = mongoURI.replace('<db_password>', encodedPassword);
            console.log('✅ Password placeholder replaced');
        } else {
            console.log('❌ Password placeholder found but MONGO_PASSWORD not set!');
            hasErrors = true;
        }
    } else {
        console.log('ℹ️  No password placeholder found');
    }
    
    // Check database name (same logic as config/database.js)
    const dbName = process.env.MONGO_DB || 'voter_db';
    const dbNamePattern = /@[^/]+\/([^/?]+)/;
    const existingDb = mongoURI.match(dbNamePattern);
    
    if (!existingDb || existingDb[1].trim() === '') {
        if (mongoURI.includes('/?')) {
            mongoURI = mongoURI.replace('/?', `/${dbName}?`);
        } else if (mongoURI.match(/@[^/]+\?/)) {
            mongoURI = mongoURI.replace(/(@[^/]+)\?/, `$1/${dbName}?`);
        } else if (!mongoURI.includes('@') || !mongoURI.match(/@[^/]+\//)) {
            const qIndex = mongoURI.indexOf('?');
            if (qIndex !== -1) {
                mongoURI = mongoURI.substring(0, qIndex) + `/${dbName}` + mongoURI.substring(qIndex);
            } else {
                mongoURI = mongoURI + `/${dbName}`;
            }
        }
        console.log(`✅ Database name added: ${dbName}`);
    } else {
        console.log(`ℹ️  Database name already in connection string: ${existingDb[1]}`);
    }
    
    // Show safe URI
    const safeURI = mongoURI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@');
    console.log(`\n📌 Final Connection String (hidden credentials):`);
    console.log(`   ${safeURI}`);
    
    if (mongoURI.includes('<db_password>')) {
        console.log('\n❌ ERROR: Password placeholder still in connection string!');
        console.log('💡 Make sure MONGO_PASSWORD is set correctly in .env file');
        hasErrors = true;
    }
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
    console.log('\n❌ Configuration has errors. Please fix them above.');
    console.log('\n💡 Quick Fix Guide:');
    console.log('   1. Create/Edit .env file in project root');
    console.log('   2. Add: MONGO_CONNECTION_STRING=mongodb+srv://hosteluser:<db_password>@cluster0.ezzkjmw.mongodb.net/?appName=Cluster0');
    console.log('   3. Add: MONGO_PASSWORD=your_actual_password');
    console.log('   4. Add: MONGO_DB=voter_db');
    process.exit(1);
} else {
    console.log('\n✅ Configuration looks good!');
    console.log('\n🚀 Try running: npm start');
    console.log('   If connection fails, check:');
    console.log('   - MongoDB Atlas IP whitelist (should include 0.0.0.0/0)');
    console.log('   - Username and password are correct');
    console.log('   - Database user has proper permissions');
}

