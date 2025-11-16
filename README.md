🔐 Production-Ready Authentication & Authorization Backend

Node.js + Express + MongoDB + JWT + RBAC + Nodemailer

A complete authentication and authorization backend built using Node.js, Express, and MongoDB, featuring JWT-based access control, role-based permissions, secure password hashing, and a full forgot/reset password workflow using email verification links.

🚀 Features
✅ User Authentication

Register new users (username, email, password, role)

Login with JWT access token

Logout functionality

Secure password hashing using bcrypt

✅ Authorization

Role-based access control (Admin/User)

Protected routes using JWT verification middleware

✅ Security

Passwords hashed before saving

JWT tokens securely signed & verified

Environment variables managed with dotenv

📨 Forgot & Reset Password (Newly Added)

Users can request a Password Reset Email

Email sent using Nodemailer + Gmail/SMTP

Contains a secure one-time token link

Token generated using crypto & stored temporarily in DB

User can set a new password via /reset-password API

Token auto-expires for security

📡 API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login & receive JWT
POST	/api/auth/logout	Logout user
👤 User Routes
Method	Endpoint	Description
GET	/api/user	Get user data (Protected)
🛠️ Password Reset (New)
Method	Endpoint	Description
POST	/api/auth/forgot-password	Sends password reset email
POST	/api/auth/reset-password/:token	Resets the password using secure token link
🎁 Bonus Features

Token verification middleware

MongoDB connection handling

Clean & modular project structure

Ready for:

Google OAuth

Refresh Tokens

Email Verification

Multi-factor Authentication
