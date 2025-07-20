import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'
import BlogView from './pages/BlogView'
import PostView from './pages/PostView'
import SetupPage from './pages/SetupPage'
import { AuthProvider } from './contexts/AuthContext'
import { BlogProvider } from './contexts/BlogContext'

function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<SetupPage />} />
              <Route path="/setup" element={<SetupPage />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/blog" element={<BlogView />} />
              <Route path="/blog/:slug" element={<PostView />} />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  )
}

export default App