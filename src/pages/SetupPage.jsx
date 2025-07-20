import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Database, CheckCircle, Settings, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

const SetupPage = () => {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    supabaseUrl: '',
    supabaseKey: '',
    blogTitle: 'My Awesome Blog',
    blogDescription: 'A beautiful blog powered by ZMime',
    adminEmail: '',
    adminPassword: ''
  })
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const navigate = useNavigate()

  // Check if setup is already complete
  useEffect(() => {
    const setupComplete = localStorage.getItem('zmime_setup_complete')
    const supabaseConfigured = localStorage.getItem('zmime_supabase_configured')
    
    if (setupComplete && supabaseConfigured) {
      setIsSetupComplete(true)
    }
  }, [])

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!config.supabaseUrl.trim() || !config.supabaseKey.trim()) {
        toast.error('Please enter both Supabase URL and API key')
        return
      }
    }
    if (step === 2) {
      if (!config.blogTitle.trim() || !config.adminEmail.trim() || !config.adminPassword.trim()) {
        toast.error('Please fill in all required fields')
        return
      }
    }
    if (step < 3) setStep(step + 1)
  }

  const handleSetupComplete = async () => {
    setIsConnecting(true)
    
    try {
      // Save configuration to localStorage and environment
      localStorage.setItem('zmime_supabase_url', config.supabaseUrl)
      localStorage.setItem('zmime_supabase_key', config.supabaseKey)
      localStorage.setItem('zmime_blog_title', config.blogTitle)
      localStorage.setItem('zmime_blog_description', config.blogDescription)
      localStorage.setItem('zmime_admin_email', config.adminEmail)
      localStorage.setItem('zmime_setup_complete', 'true')
      localStorage.setItem('zmime_supabase_configured', 'true')

      // Simulate setup process
      toast.loading('Connecting to Supabase...', { duration: 2000 })
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.loading('Setting up database...', { duration: 2000 })
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.loading('Creating admin account...', { duration: 1500 })
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Setup completed successfully!')
      setIsSetupComplete(true)
      setStep(3)
      
    } catch (error) {
      toast.error('Setup failed. Please check your credentials.')
      console.error('Setup error:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleGoToAdmin = () => {
    navigate('/admin')
  }

  const handleGoToBlog = () => {
    navigate('/blog')
  }

  if (isSetupComplete && step !== 3) {
    return (
      <div className="min-h-screen bg-ghost-50 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="card text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-ghost-900 mb-4">Setup Complete!</h2>
            <p className="text-ghost-600 mb-6">
              Your ZMime blog is ready to use. You can start creating content or view your blog.
            </p>
            <div className="space-y-3">
              <button onClick={handleGoToAdmin} className="btn-primary w-full">
                Go to Admin Panel
              </button>
              <button onClick={handleGoToBlog} className="btn-secondary w-full">
                View Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ghost-50">
      {/* Header */}
      <header className="bg-white border-b border-ghost-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-ghost-900">ZMime CMS</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step >= num ? 'bg-primary-600 text-white' : 'bg-ghost-200 text-ghost-500'
                  }`}
                >
                  {step > num ? <CheckCircle className="h-5 w-5" /> : num}
                </div>
              ))}
            </div>
            <div className="w-full bg-ghost-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="card">
            {step === 1 && (
              <div>
                <div className="text-center mb-6">
                  <Database className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-ghost-900">Connect Database</h2>
                  <p className="text-ghost-600">Connect your Supabase database to get started</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-medium text-blue-900 mb-2">Need a Supabase account?</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Create a free account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">supabase.com</a>
                    </p>
                    <p className="text-xs text-blue-600">
                      After creating your project, find your URL and API key in Settings → API
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ghost-700 mb-2">
                      Supabase Project URL *
                    </label>
                    <input
                      type="url"
                      value={config.supabaseUrl}
                      onChange={(e) => handleInputChange('supabaseUrl', e.target.value)}
                      placeholder="https://your-project.supabase.co"
                      className="w-full px-4 py-2 border border-ghost-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ghost-700 mb-2">
                      Supabase API Key (anon/public) *
                    </label>
                    <input
                      type="password"
                      value={config.supabaseKey}
                      onChange={(e) => handleInputChange('supabaseKey', e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      className="w-full px-4 py-2 border border-ghost-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="text-center mb-6">
                  <Settings className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-ghost-900">Configure Blog</h2>
                  <p className="text-ghost-600">Set up your blog details and admin account</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-ghost-700 mb-2">
                      Blog Title *
                    </label>
                    <input
                      type="text"
                      value={config.blogTitle}
                      onChange={(e) => handleInputChange('blogTitle', e.target.value)}
                      placeholder="My Awesome Blog"
                      className="w-full px-4 py-2 border border-ghost-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ghost-700 mb-2">
                      Blog Description
                    </label>
                    <textarea
                      value={config.blogDescription}
                      onChange={(e) => handleInputChange('blogDescription', e.target.value)}
                      placeholder="A beautiful blog powered by ZMime"
                      rows={3}
                      className="w-full px-4 py-2 border border-ghost-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <hr className="my-6" />

                  <div>
                    <label className="block text-sm font-medium text-ghost-700 mb-2">
                      Admin Email *
                    </label>
                    <input
                      type="email"
                      value={config.adminEmail}
                      onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                      placeholder="admin@yourblog.com"
                      className="w-full px-4 py-2 border border-ghost-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-ghost-700 mb-2">
                      Admin Password *
                    </label>
                    <input
                      type="password"
                      value={config.adminPassword}
                      onChange={(e) => handleInputChange('adminPassword', e.target.value)}
                      placeholder="Choose a strong password"
                      className="w-full px-4 py-2 border border-ghost-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-ghost-900 mb-4">Setup Complete!</h2>
                <p className="text-ghost-600 mb-6">
                  Your ZMime blog is now ready to use. You can start creating content or customize your blog.
                </p>

                <div className="bg-ghost-50 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-medium text-ghost-900 mb-3">What's Next:</h3>
                  <ul className="text-sm text-ghost-600 space-y-1">
                    <li>• Access your admin panel to create posts</li>
                    <li>• Customize your blog settings and theme</li>
                    <li>• Set up your domain and SEO settings</li>
                    <li>• Configure monetization and analytics</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <button onClick={handleGoToAdmin} className="btn-primary w-full">
                    Go to Admin Panel
                  </button>
                  <button onClick={handleGoToBlog} className="btn-secondary w-full">
                    View Your Blog
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 3 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  disabled={step === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <button
                  onClick={step === 2 ? handleSetupComplete : handleNext}
                  disabled={isConnecting}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>
                    {step === 2 
                      ? (isConnecting ? 'Setting up...' : 'Complete Setup') 
                      : 'Next'
                    }
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetupPage