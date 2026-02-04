# 📇 Contact Dashboard

A high-performance, full-stack contact management application built with the **MERN** stack. This project features a responsive UI, secure JWT authentication, and full CRUD capabilities for personal contact organization.



---

## 🚀 Tech Stack

| Layer          | Technologies                                     |
| :------------- | :----------------------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS, Redux Toolkit, Axios |
| **Backend** | Node.js, Express.js                              |
| **Database** | MongoDB, Mongoose                                |
| **Auth** | JSON Web Tokens (JWT), Bcrypt.js                 |

---

## ✨ Features

* **Secure Auth:** User registration and login with password hashing and JWT.
* **CRUD Operations:** Create, Read, Update, and Delete contacts effortlessly.
* **Instant Search:** Real-time filtering by name, email, or phone number.
* **Responsive Design:** Optimized for mobile, tablet, and desktop using Tailwind CSS.
* **Persistent State:** Managed via Redux Toolkit for a seamless user experience.

---

## 📡 API Endpoints

The backend is structured with clean separation of concerns. All contact routes are protected by the `isUserAuthenticated` middleware to ensure data privacy.

### 🔐 User Routes (`/auth`)
| Method | Endpoint    | Function Logic                                           |
| :----- | :---------- | :------------------------------------------------------- |
| `POST` | `/register` | Validates input via `checkUser` and creates a new account. |
| `POST` | `/signin`   | Verifies credentials and issues a secure JWT access token. |

### 👥 Contact Routes (`/contacts`)
| Method   | Endpoint | Function Logic                                           |
| :------- | :------- | :------------------------------------------------------- |
| `GET`    | `/`      | Fetches all contact records belonging to the active user. |
| `POST`   | `/`      | Sanitizes request body and saves a new contact entry.    |
| `PUT`    | `/:id`   | Locates a specific contact by ID and applies updates.    |
| `DELETE` | `/:id`   | Removes a specific contact record from the user's list.  |

---

## 🛠️ Getting Started

### 1. Prerequisites
* Node.js (v18.0.0 or higher)
* MongoDB instance (Local or Atlas)
* NPM

### 2. Environment Setup

Create a `.env` file in your frontend (or client) directory:
```
# The base URL for your backend API
VITE_BASE_URL=http://localhost:8080/
VITE_API_TIMEOUT=3000
```
Create a `.env` file in the root of your `backend` directory:
```env
PORT=8080
MONGODB_URL=your_mongodb_connection_string
secret_key=your_super_secret_key
```

## Installation and running
```
# Install backend dependencies
cd backend
npm install
npm run dev

# Install frontend dependencies
cd ../frontend
npm install
npm run dev
```
## Project Structure

```
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── config/        # Axios and global configurations
│   │   ├── pages/         # Dashboard, Login, and Register views
│   │   ├── redux/         # State management (slices & store)
│   │   ├── routes/        # Frontend route definitions
│   │   ├── utils/         # Helpers and validation logic
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # React entry point
│   ├── .env               # Frontend environment variables
│   └── vite.config.js     # Vite configuration
├── server/                # Node + Express backend
│   ├── src/
│   │   ├── config/        # Database and server configurations
│   │   ├── controllers/   # Request handling logic
│   │   ├── models/        # Mongoose database schemas
│   │   ├── routes/        # API endpoint definitions
│   │   ├── services/      # Business logic layer
│   │   └── validators/    # Input validation middleware
│   ├── .env               # Backend environment variables
│   └── index.js           # Server entry point
└── README.md              # Project documentation
```

### Live site - [Contact Dashboard](https://contact-dashboard.onrender.com/dashboard)