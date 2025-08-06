# 🚀 Cronicast Backend API

A robust Node.js backend API for the Cronicast blogging platform, built with Express.js and MongoDB. This API provides comprehensive user management and blog functionality with secure authentication, image uploads, and email services.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## ✨ Features

- **User Management**
  - User registration and login
  - JWT-based authentication
  - Profile management
  - Password reset via email
  - Contact form functionality

- **Blog Management**
  - Create, read, update, delete blogs
  - Image upload with Cloudinary
  - Like/unlike functionality
  - Comment system
  - Personal blog management

- **Security**
  - Password hashing with bcrypt
  - JWT token authentication
  - Input validation and sanitization
  - CORS protection
  - Cookie-based authentication

- **Additional Features**
  - Email notifications
  - Image optimization
  - Error handling
  - Pagination support

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer with Cloudinary
- **Email Service**: Nodemailer
- **Validation**: express-validator
- **Security**: bcrypt, helmet, cors
- **Environment**: dotenv

## 📁 Project Structure

```
Backend/
├── Config/
│   ├── Database.js          # MongoDB connection
│   ├── clodinary.js         # Cloudinary configuration
│   └── nodemailer.js        # Email configuration
├── Controllers/
│   ├── user.controllers.js  # User management logic
│   └── blog.controllers.js  # Blog management logic
├── Middlewares/
│   ├── auth.middlwares.js # JWT authentication
│   └── ClousinaryUploads.js # Image upload middleware
├── Models/
│   ├── user.model.js      # User schema
│   ├── blog.model.js      # Blog schema
│   └── blacklist.model.js # Token blacklist
├── Routes/
│   ├── user.routes.js     # User API routes
│   └── blog.routes.js     # Blog API routes
├── Services/
│   ├── user.services.js   # User business logic
│   └── blog.services.js   # Blog business logic
├── validations/
│   ├── user.validation.js # User input validation
│   └── blog.validation.js # Blog input validation
├── utils/
│   ├── hash.utils.js      # Password hashing utilities
│   ├── jwt.utils.js       # JWT utilities
│   └── resposnse.utils.js # Response formatting
├── app.js                 # Express app configuration
├── server.js              # Server entry point
├── seed.js                # Database seeding script
└── package.json           # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Email service credentials (for nodemailer)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the required variables (see [Environment Variables](#environment-variables)).

4. **Start MongoDB**
   - Local: Make sure MongoDB is running on your system
   - Cloud: Use MongoDB Atlas connection string

5. **Run the development server**
   ```bash
   # Start the server
   npm start

   # Or with nodemon for development
   nodemon server.js
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cronicast

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Frontend URL
CLIENT_URL=http://localhost:5173
```

## 📡 API Endpoints

### User Routes (`/users`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Login user |
| GET | `/profile` | Get user profile (protected) |
| GET | `/logout` | Logout user (protected) |
| POST | `/contact` | Submit contact form |
| POST | `/forgot-password` | Request password reset |
| POST | `/reset-password/:token` | Reset password |

### Blog Routes (`/blogs`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create a new blog (protected) |
| GET | `/getallblogs` | Get all blogs |
| GET | `/getmyblog/:id` | Get user's blogs (protected) |
| GET | `/getblog/:id` | Get single blog |
| PUT | `/update/:id` | Update blog (protected) |
| DELETE | `/delete/:id` | Delete blog (protected) |
| POST | `/like/:id` | Like/unlike blog (protected) |
| POST | `/comment/:id` | Add comment (protected) |
| DELETE | `/commentdelete/:blogId/:commentId` | Delete comment (protected) |

## 🔒 Authentication

The API uses JWT (JSON Web Token) based authentication. Include the JWT token in the Authorization header for protected routes:

```http
Authorization: Bearer <your-jwt-token>
```

Tokens are also stored in httpOnly cookies for web applications.

## 🗄 Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  avatar: String (Cloudinary URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  title: String (required),
  content: String (required),
  images: [String] (Cloudinary URLs),
  author: ObjectId (ref: User),
  likes: [ObjectId] (ref: User),
  comments: [{
    user: ObjectId (ref: User),
    comment: String,
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Example Usage

### Register a new user
```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Create a blog post
```bash
curl -X POST http://localhost:3000/blogs/create \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: multipart/form-data" \
  -F "title=My First Blog" \
  -F "content=This is the content of my blog..." \
  -F "images=@image1.jpg"
```

## 🚨 Error Handling

The API uses standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ]
}
```

## 🧪 Testing

While there's no formal test suite, you can test the API using:
- Postman collections
- Thunder Client (VS Code extension)
- cURL commands
- Frontend application

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@cronicast.com or create an issue in the repository.

---

**Happy coding!** 🎉
