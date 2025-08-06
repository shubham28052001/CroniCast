# 🎨 Cronicast Frontend

A modern, responsive React frontend for the Cronicast blogging platform. Built with Vite, React, and Tailwind CSS, this frontend provides a seamless user experience for creating, reading, and managing blog posts.

## ✨ Features

- **Modern React Architecture**
  - Built with React 18 and Vite for fast development
  - Functional components with hooks
  - Context API for state management
  - React Router for navigation

- **Responsive Design**
  - Mobile-first responsive design
  - Tailwind CSS for styling
  - Smooth animations and transitions
  - Dark mode support ready

- **User Features**
  - User registration and login
  - Profile management
  - Create, edit, and delete blogs
  - Like and comment on blogs
  - Personal blog dashboard
  - Contact form

- **Blog Features**
  - Rich text editor for blog creation
  - Image upload with preview
  - Blog listing with pagination
  - Blog detail pages
  - Search and filter functionality
  - Responsive blog cards

- **Security**
  - Protected routes
  - JWT token management
  - Form validation
  - Error handling

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: React Icons
- **Development**: ESLint + Prettier

## 📁 Project Structure

```
Frontend/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── Components/
│   │   ├── Blogcard.jsx
│   │   ├── BlogDetail.jsx
│   │   ├── Edit.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── MyBlogCard.jsx
│   ├── NAvbar.jsx
│   ├── ResetPassword.jsx
│   ├── SmoothScroll.jsx
│   ├── StartNav.jsx
│   ├── Contexts/
│   │   ├── RedirectIfAuth.jsx
│   │   ├── UserContext.jsx
│   ├── UserProtected.jsx
│   ├── Pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── CreateBlog.jsx
│   │   ├── Front.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyBlogs.jsx
│   │   ├── Services.jsx
│   │   ├── Signup.jsx
│   ├── utils/
│   │   └── axios.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional: Add other environment-specific variables
VITE_APP_NAME=Cronicast
VITE_APP_VERSION=1.0.0
```

## 📱 Pages Overview

### Public Pages
- **Home** (`/`) - Landing page with blog listings
- **About** (`/about`) - About the platform
- **Services** (`/services`) - Platform features
- **Contact** (`/contact`) - Contact form

### Authentication Pages
- **Login** (`/login`) - User login
- **Signup** (`/signup`) - User registration
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password/:token`) - Password reset form

### Protected Pages
- **Dashboard** (`/home`) - User dashboard
- **Create Blog** (`/create-blog`) - New blog creation
- **My Blogs** (`/my-blogs`) - User's blog management
- **Edit Blog** (`/edit/:id`) - Blog editing

## 🔧 Component Structure

### Layout Components
- **Navbar** - Main navigation component
- **StartNav** - Landing page navigation
- **SmoothScroll** - Smooth scrolling utility

### Blog Components
- **BlogCard** - Individual blog preview card
- **BlogDetail** - Full blog view component
- **MyBlogCard** - User's blog management card
- **Edit** - Blog editing component

### Authentication Components
- **Login** - Login form
- **Signup** - Registration form
- **ForgotPassword** - Password reset request
- **ResetPassword** - Password reset form

### Context Providers
- **UserContext** - Global user state management
- **RedirectIfAuth** - Redirect authenticated users
- **UserProtected** - Route protection component

## 🎨 Styling

The project uses Tailwind CSS for styling with a custom configuration. Key features:

- **Responsive Design**: Mobile-first approach
- **Utility Classes**: Consistent styling with Tailwind
- **Custom Components**: Reusable styled components
- **Dark Mode Ready**: Easy to implement dark mode

## 🔒 Authentication Flow

1. **Registration**: Users register with username, email, and password
2. **Login**: Users authenticate with email and password
3. **Token Storage**: JWT tokens are stored in httpOnly cookies
4. **Protected Routes**: Certain routes require authentication
5. **Token Refresh**: Automatic token management

## 📊 State Management

The application uses React Context API for state management:

- **UserContext**: Manages user authentication state
- **Local State**: Component-level state with useState
- **Form State**: Form handling with useState and useEffect

## 🌐 API Integration

### Axios Configuration
Located in `src/utils/axios.js`:
- Base URL configuration
- Request/response interceptors
- Error handling
- Token management

### API Endpoints Used
- **Authentication**: `/users/*`
- **Blogs**: `/blogs/*`
- **Profile**: `/users/profile`

## 🧪 Testing

While there's no formal test suite, you can test the application by:

1. **Manual Testing**
   - Navigate through all pages
   - Test form submissions
   - Verify responsive design
   - Check error handling

2. **Browser DevTools**
   - Network tab for API calls
   - Console for errors
   - Application tab for cookies

3. **Lighthouse Audit**
   - Performance
   - Accessibility
   - SEO
   - Best practices

## 🚀 Deployment

### Build Commands
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment Options
- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop or Git integration
- **AWS S3 + CloudFront**: Static site hosting
- **Firebase Hosting**: Google's hosting solution

### Environment Variables for Production
Update the `.env` file with production values:
```env
VITE_API_URL=https://your-backend-api.com
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Issues**
   - Ensure backend CORS is configured correctly
   - Check environment variables

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check for missing dependencies

3. **API Connection Issues**
   - Verify backend is running
   - Check network connectivity
   - Validate environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support:
- Create an issue in the repository
- Check existing issues for solutions
- Contact the development team

---

**Happy coding!** 🚀✨
