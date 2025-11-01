# 🗳️ Voter API - Node.js/Express Backend

Modern REST API for voter data management built with Node.js, Express, and MongoDB.

## 🚀 Features

- **RESTful API** - Clean, organized endpoints
- **MongoDB Integration** - Robust database operations
- **Excel/CSV Upload** - Bulk voter data import
- **CRUD Operations** - Complete voter management
- **Environment Config** - Secure configuration
- **Render Deployment** - One-click deployment ready

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## 🔧 Installation

```bash
# Clone repository
git clone <your-repo-url>
cd voter_api_project

# Install dependencies
npm install

# Create .env file
cp env.example .env

# Edit .env with your MongoDB credentials
nano .env

# Start server
npm start
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_CONNECTION_STRING=mongodb+srv://username:<db_password>@cluster.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_password
MONGO_DB=voter_db
```

## 📝 API Endpoints

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Get All Voters
```http
GET /api/voters
GET /api/voters?page=1&limit=100
```

#### Get Voter by ID
```http
GET /api/voters/:id
```

#### Create Voter
```http
POST /api/voters
Content-Type: application/json

{
  "epicNumber": "EPIC123",
  "name": "John Doe",
  "age": 25,
  "gender": "Male",
  "address": "123 Main St",
  "state": "Maharashtra",
  "district": "Mumbai"
}
```

#### Update Voter
```http
PUT /api/voters/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "age": 26
}
```

#### Delete Voter
```http
DELETE /api/voters/:id
```

#### Upload Excel/CSV
```http
POST /api/voters/upload
Content-Type: multipart/form-data

file: <excel_or_csv_file>
```

#### Bulk Upload
```http
POST /api/voters/bulk
Content-Type: application/json

{
  "voters": [
    { "epicNumber": "EPIC123", "name": "John Doe", ... },
    { "epicNumber": "EPIC124", "name": "Jane Doe", ... }
  ]
}
```

## 🗃️ Database Schema

### Voter Model

```javascript
{
  epicNumber: String (required, unique, indexed),
  name: String (required),
  age: Number,
  gender: String (enum: Male, Female, Other),
  address: String,
  state: String,
  district: String,
  constituency: String,
  assemblyConstituency: String,
  boothNumber: String,
  partNumber: String,
  serialNumber: String,
  fatherHusbandName: String,
  houseNumber: String,
  additionalData: Mixed,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment on Render

### Quick Deploy

1. Push code to GitHub
2. Go to [Render Dashboard](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your repository
5. Render will auto-detect `render.yaml`
6. Add environment variables:
   - `MONGO_CONNECTION_STRING`
   - `MONGO_PASSWORD`
   - `MONGO_DB`
7. Deploy! 🎉

### Environment Variables on Render

```
MONGO_CONNECTION_STRING=mongodb+srv://username:<db_password>@cluster.mongodb.net/?appName=Cluster0
MONGO_PASSWORD=your_password
MONGO_DB=voter_db
NODE_ENV=production
```

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test API status
curl http://localhost:3000/

# Test getting voters
curl http://localhost:3000/api/voters

# Test getting specific voter
curl http://localhost:3000/api/voters/EPIC123
```

## 📦 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

## 🏗️ Project Structure

```
voter_api_project/
├── server.js              # Main entry point
├── package.json           # Dependencies
├── .env                   # Environment variables
├── render.yaml            # Render deployment config
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   └── Voter.js           # Voter mongoose model
├── controllers/
│   ├── voterController.js # Voter business logic
│   └── uploadController.js# File upload logic
├── routes/
│   └── voters.js          # Voter API routes
└── uploads/               # Uploaded files storage
```

## 🔒 Security Notes

- Environment variables are never committed to git
- MongoDB credentials stored securely
- File uploads validated and sanitized
- CORS enabled for cross-origin requests

## 📄 License

ISC

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📞 Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ using Node.js and Express**

