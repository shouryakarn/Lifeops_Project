# LifeOps

LifeOps is a full-stack web application designed to help users manage their habits, tasks, goals, and expenses in one central dashboard. 

## Tech Stack
- **Frontend**: React.js, React Router, Chart.js, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT) for authentication

## Project Structure
- `/backend`: Node.js/Express REST API.
- `/lifeops-frontend`: React frontend application.

## Prerequisites
- Node.js (v18 or higher)
- MongoDB account (for MongoDB Atlas) or local MongoDB instance

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd lifeops
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```
Install dependencies:
```bash
npm install
```
Set up your environment variables:
- Copy `.env.example` to `.env`
- Provide your MongoDB connection string (`MONGO_URI`) and a secret key for JWT (`JWT_SECRET`).

Start the backend server:
```bash
npm run dev
```
The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd lifeops-frontend
```
Install dependencies:
```bash
npm install
```
Start the React development server:
```bash
npm start
```
The frontend application will run on `http://localhost:3000`.

## Features
- **User Authentication**: Secure sign-up and login using JWT.
- **Habit Tracking**: Monitor daily habits.
- **Task Management**: Organize to-dos.
- **Goal Setting**: Set and track long-term goals.
- **Expense Tracking**: Keep a log of your expenses.
