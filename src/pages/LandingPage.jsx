import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, Globe, Shield, Rocket } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-ghost-900">ZMime</span>
          </div>
          <div className="space-x-4">
            <Link to="/setup" className="btn-secondary">
              Get Started
            </Link>
            <Link to="/admin" className="btn-primary">
              Admin Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-ghost-900 mb-6">
            The Open Source Blogging CMS
            <span className="text-primary-600"> You've Been Waiting For</span>
          </h1>
          <p className="text-xl text-ghost-600 mb-8 leading-relaxed">
            Create beautiful blogs with modern technology and powerful features. 
            Deploy in minutes, customize everything, and scale without limits.
          </p>
          <div className="space-x-4">
            <Link to="/setup" className="btn-primary text-lg px-8 py-3">
              Start Your Blog
            </Link>
            <a 
              href="https://github.com/zmime/zmime-cms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-3"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="card text-center">
            <Rocket className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Deploy in Minutes</h3>
            <p className="text-ghost-600">Connect Supabase & Netlify, deploy instantly with zero configuration.</p>
          </div>
          
          <div className="card text-center">
            <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Custom Domains</h3>
            <p className="text-ghost-600">Use your own domain with SSL certificates automatically configured.</p>
          </div>
          
          <div className="card text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure by Default</h3>
            <p className="text-ghost-600">Row-level security, authentication, and data protection built-in.</p>
          </div>
          
          <div className="card text-center">
            <Zap className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-ghost-600">Static generation with global CDN delivery for maximum performance.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 p-12 bg-white rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-ghost-900 mb-4">
            Ready to Start Your Blog?
          </h2>
          <p className="text-ghost-600 mb-8 text-lg">
            Join thousands of creators who chose ZMime for their blogging needs.
          </p>
          <Link to="/setup" className="btn-primary text-lg px-8 py-3">
            Get Started Now - It's Free
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20 border-t border-ghost-200">
        <div className="text-center text-ghost-500">
          <p>&copy; 2025 ZMime. Open source and free forever.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage