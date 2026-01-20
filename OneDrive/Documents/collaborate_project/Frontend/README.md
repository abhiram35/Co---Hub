# Student Collaboration Platform

A cross-domain student project collaboration platform where students from tech and non-tech domains can post ideas and join projects.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000/`

## 📁 Project Structure

```
src/
├─ components/
│  ├─ Navbar.jsx        # Navigation bar with links
│  └─ IdeaCard.jsx      # Reusable idea card component
│
├─ pages/
│  ├─ Dashboard.jsx     # Home page with project ideas
│  ├─ PostIdea.jsx      # Form to post new ideas
│  ├─ Project.jsx       # Detailed project view
│  ├─ Profile.jsx       # User profile with joined projects
│  ├─ Login.jsx         # Login page (mock)
│  └─ Register.jsx      # Registration page (mock)
│
├─ routes/
│  └─ AppRoutes.jsx     # Route configuration
│
├─ data/
│  └─ mockData.js       # Mock data for development
│
├─ App.jsx              # Main app component
├─ main.jsx             # Entry point
└─ index.css            # Tailwind imports
```

## 🎨 Tech Stack

- **React** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

## 📖 Features

1. **Dashboard** - Browse and filter project ideas by domain
2. **Post Idea** - Create new project ideas with domains and required roles
3. **Project Details** - View full project information
4. **User Profile** - See your joined projects and domain
5. **Authentication Pages** - Login and registration screens (no logic)

## 🔍 Available Routes

- `/` - Dashboard (home)
- `/post-idea` - Post a new idea
- `/project/:id` - View project details
- `/profile` - User profile
- `/login` - Login page
- `/register` - Registration page

## 📝 Domains

- Tech
- Design
- Content
- Business

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## ⚠️ Important Notes

- **No Backend**: This is a frontend-only application using mock data
- **No Authentication**: Login/Register pages are UI only
- **No State Management**: Using React hooks for component state
- **Beginner-Friendly**: Clean, readable code with comments

## 🎯 Future Enhancements

- Backend API integration
- Real authentication
- User profiles with images
- Project filtering and search
- Notifications system
- Chat between team members
- Project recommendations

## 📄 License

MIT

---

**Happy Collaborating! 🚀**
