## Task Manager MERN Application
A simple task management application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to perform basic CRUD (Create, Read, Update, Delete) operations on tasks.

### Features
Create a Task: Add a new task with a title and description.
View Tasks: View a list of all tasks.
Update a Task: Modify the title or description of an existing task.
Delete a Task: Remove a task from the list.
Task Completion: (Optional) Mark a task as completed (can be added as a bonus feature).

### Technologies Used
Frontend: React, React Router, Axios
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Others: Concurrently (for running frontend and backend together), Dotenv

# Project Structure
task-manager-mern/
├── backend/                 # Backend code
│   ├── models/              # MongoDB schemas
│   ├── routes/              # Express routes
│   ├── controllers/         # Route controllers
│   ├── index.js             # Entry point for backend server
│   └── .env                 # Environment variables
├── frontend/                # Frontend code
│   ├── src/                 # React components and logic
│   ├── public/              # Public assets
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend-specific instructions
├── package.json             # Root dependencies for concurrently
├── README.md                # Project documentation
└── .gitignore               # Files to ignore in Git

### Prerequisites
Before running the application, ensure you have the following installed on your system:
- Node.js (v14 or later) - Download Node.js
- MongoDB (local or cloud) - Download MongoDB
- Git - Download Git

### Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/task-manager-mern.git
cd task-manager-mern
2. Install Dependencies
Install dependencies for the root project (to run concurrently):
npm install

Install dependencies for the backend:
cd backend
npm install

Install dependencies for the frontend:
cd ../frontend
npm install

3. Configure Environment Variables
In the backend/ directory, create a .env file and add the following environment variables:
  MONGODB_URI=mongodb://localhost:27017/taskmanagerdb
  PORT=5000
-- Replace MONGODB_URI with your MongoDB connection string if you're using a cloud database (e.g., MongoDB Atlas).

4. Run the Application
Start both the backend and frontend together (from the root directory):
npm start
This will:
- Start the backend server at http://localhost:5000
- Start the React frontend at http://localhost:3000

Alternatively, start each service individually:
- Start the backend:
  cd backend
  npm run dev
- Start the frontend:
  cd frontend
  npm start

### Troubleshooting (Common Issues)
Port Conflict: If ports 3000 (frontend) or 5000 (backend) are already in use, update the configuration:
  For the backend, change the PORT in the .env file.
  For the frontend, update the proxy setting in frontend/package.json.
MongoDB Connection Issues: Ensure that MongoDB is running locally or that your connection string in .env is correct.
Node.js Version: Ensure you're using Node.js version 14.x, 16.x, or 18.x. Versions 17+ may require the --openssl-legacy-provider flag.
