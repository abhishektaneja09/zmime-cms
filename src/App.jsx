import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import DeploymentLanding from './pages/DeploymentLanding'
import AdminDashboard from './pages/AdminDashboard'
import BlogView from './pages/BlogView'
import PostView from './pages/PostView'
import SetupPage from './pages/SetupPage'
import { AuthProvider } from './contexts/AuthContext'
import { BlogProvider } from './contexts/BlogContext'

function App() {
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  useEffect(() => {
    // Check if setup is complete
    const setupComplete = localStorage.getItem('zmime_setup_complete')
    setIsSetupComplete(!!setupComplete)
  }, [])

  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Show deployment landing for new users, setup page for users who clicked setup */}
              <Route path="/" element={isSetupComplete ? <BlogView /> : <DeploymentLanding />} />
              <Route path="/deploy" element={<DeploymentLanding />} />
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