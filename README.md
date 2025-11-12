A production-ready authentication and authorization backend built using Node.js, Express, and MongoDB, featuring JWT-based access control, password hashing, and role-based permissions.

🚀 Features

✅ User Authentication

Register new users (username, email, password, role)

Login with JWT token generation

Logout functionality

Secure password hashing using bcrypt

✅ Authorization

Role-based access control (Admin/User)

Protected routes using JWT middleware

✅ Security

Passwords hashed using bcrypt before saving

JWT access tokens stored securely

Environment variables managed via dotenv

✅ API Endpoints

POST /api/auth/register → Register new user

POST /api/auth/login → Login user

GET /api/user → Get user data (Protected)

POST /api/auth/logout → Logout user

✅ Bonus Features

Token verification middleware

MongoDB connection handling

Clean project structure with modular code

Ready for Google OAuth, Refresh Tokens, and Email Verification integration
