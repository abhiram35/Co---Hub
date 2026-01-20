# CO-Hub 🚀

A modern collaboration platform for sharing ideas and managing projects seamlessly.

## 📋 Overview

CO-Hub is a full-stack web application designed to facilitate team collaboration by allowing users to share innovative ideas and manage projects efficiently. Built with React, Node.js, and MongoDB, it provides a smooth user experience with robust backend support.

## ✨ Features

- **User Authentication** - Secure signup/login with email verification
- **Post Ideas** - Share and collaborate on creative ideas
- **Project Management** - Create, manage, and track projects
- **User Profiles** - Customize profiles and track contributions
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Updates** - Dynamic content updates without page reload

## 🏗️ Tech Stack

### Frontend
- **React** - UI library for building interactive interfaces
- **Vite** - Next-generation build tool for fast development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - Secure authentication

## 📂 Project Structure

```
co-hub/
├── Frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── routes/        # Route configuration
│   │   └── data/          # Mock data
│   ├── vite.config.js
│   └── package.json
├── Backend/
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── server.js
│   └── package.json
├── QUICK_START.md         # Quick setup guide
├── INTEGRATION_GUIDE.md   # Integration documentation
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhiram35/Co---Hub.git
   cd Co-Hub
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   # Configure your .env file with MongoDB URI and JWT secret
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📖 Documentation

- [Quick Start Guide](./QUICK_START.md) - Get up and running quickly
- [Integration Guide](./INTEGRATION_GUIDE.md) - API integration details
- [Auth Reference](./AUTH_QUICK_REFERENCE.md) - Authentication details
- [Auth Routing](./AUTH_ROUTING_GUIDE.md) - Authentication flow documentation

## 🔐 Authentication

CO-Hub uses JWT (JSON Web Tokens) for secure authentication. All API endpoints (except login/signup) require valid authentication tokens in the request header.

## 📝 Available Routes

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Password recovery

### Ideas
- `GET /ideas` - Get all ideas
- `POST /ideas` - Create new idea
- `GET /ideas/:id` - Get idea details
- `PUT /ideas/:id` - Update idea
- `DELETE /ideas/:id` - Delete idea

### Projects
- `GET /projects` - Get all projects
- `POST /projects` - Create new project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### User
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update profile

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Abhiram** - [GitHub](https://github.com/abhiram35)

## 💬 Support

Have questions or need help? Feel free to open an issue on GitHub or contact us at pabhiram356@gmail.com

## 🎯 Future Enhancements

- [ ] Real-time collaboration features
- [ ] Advanced search and filtering
- [ ] Social features (likes, comments, shares)
- [ ] Mobile app
- [ ] CI/CD integration
- [ ] Advanced analytics dashboard

---

⭐ If you find this project helpful, please consider giving it a star!
