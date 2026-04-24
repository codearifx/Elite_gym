# Elite Strength - Premium Fitness SaaS Platform (Frontend)

## 🏋️‍♂️ Project Overview
Elite Strength is a modern, premium fitness web application built with React and Vite. It serves as a comprehensive platform for gym members, offering features like class booking, membership management, AI chatbot assistance, fitness calculators, and an exclusive "Elite Squad" community section. 

The application focuses on a high-end UI/UX, utilizing Tailwind CSS for styling and Framer Motion for smooth, dynamic animations.

## ✨ Key Features
- **Modern UI/UX**: Dark mode aesthetic with premium red/black gradients, glassmorphism effects, and smooth animations.
- **User Authentication**: Secure login and registration flows with protected routes.
- **Member Dashboard**: Personalized dashboard for users to track activities and manage their membership.
- **Admin Dashboard**: Specialized route for gym administrators to manage platform data.
- **Elite Squad**: An exclusive membership tier section with mock member verification and pricing details.
- **Fitness Tools**: Built-in fitness calculator for BMI/BMR and macro tracking.
- **AI Chatbot**: Global chatbot integrated for instant user assistance and FAQs.

## 🛠️ Technology Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS + Autoprefixer + PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios

## 📂 Project Structure
```text
src/
├── assets/         # Static assets like images and icons
├── components/     # Reusable UI components (Navbar, Footer, Chatbot, etc.)
├── context/        # React Context providers (AuthContext)
├── pages/          # Individual page components (Home, Dashboard, Login, etc.)
├── App.jsx         # Main application routing and structure
├── index.css       # Global styles and Tailwind directives
└── main.jsx        # Application entry point
```

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
To start the application locally:
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or another port provided by Vite).

### Building for Production
To create an optimized production build:
```bash
npm run build
```

## 📜 Available Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Runs ESLint to find and fix code quality issues.
- `npm run preview`: Previews the production build locally.

---
*Built with passion for the Elite Strength community.*
