import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, Github, ExternalLink, Users, BarChart3, Shield, Palette, DollarSign, Edit } from 'lucide-react'

const DeploymentLanding = () => {
  const deployToNetlify = () => {
    const deployUrl = 'https://app.netlify.com/start/deploy?repository=https://github.com/abhishektaneja09/zmime-cms'
    window.open(deployUrl, '_blank')
  }

  const features = [
    {
      icon: Edit,
      title: 'Rich Editor',
      description: 'Powerful editor with Markdown support, media uploads, and real-time preview.'
    },
    {
      icon: Shield,
      title: 'Secure & Fast',
      description: 'Built-in security, SSL certificates, and global CDN for lightning-fast loading.'
    },
    {
      icon: Users,
      title: 'Member Management',
      description: 'Built-in user management, subscriptions, and monetization features.'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Built-in analytics dashboard to track your blog\'s performance and growth.'
    },
    {
      icon: Palette,
      title: 'Customizable',
      description: 'Multiple themes, custom CSS, and complete control over your blog\'s appearance.'
    },
    {
      icon: DollarSign,
      title: 'Monetization',
      description: 'Stripe integration, paid memberships, and multiple revenue streams built-in.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap className="w-10 h-10 text-primary-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ZMime CMS</h1>
                <p className="text-sm text-gray-500">Open Source Blogging Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/abhishektaneja09/zmime-cms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Deploy Your Blog in 60 Seconds</h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            ZMime CMS is a modern, powerful blogging platform. Deploy instantly to Netlify and start blogging with zero configuration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={deployToNetlify}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <Zap className="w-6 h-6" />
              <span>Deploy to Netlify</span>
            </button>
            <a 
              href="https://github.com/abhishektaneja09/zmime-cms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Blog</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional blogging platform with modern features, zero maintenance, and complete control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Deploy in 3 Simple Steps</h2>
            <p className="text-xl text-gray-600">Get your blog running in under a minute</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Click Deploy</h3>
              <p className="text-gray-600">Click the "Deploy to Netlify" button above to start the deployment process.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Accounts</h3>
              <p className="text-gray-600">Connect your GitHub and Netlify accounts. The deployment happens automatically.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Blogging</h3>
              <p className="text-gray-600">Complete the setup wizard and start creating amazing content immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Blog?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of creators who chose ZMime for their blogging needs.</p>
          <button 
            onClick={deployToNetlify}
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Deploy Now - It's Free
          </button>
        </div>
      </section>

      {/* Already Deployed Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Already deployed ZMime?</h3>
          <p className="text-gray-600 mb-6">Access your blog setup or admin panel</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/setup" className="btn-secondary">
              Setup Your Blog
            </Link>
            <Link to="/admin" className="btn-primary">
              Admin Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
                <span className="text-xl font-bold">ZMime</span>
              </div>
              <p className="text-gray-400">Modern open source blogging platform built for creators.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://github.com/abhishektaneja09/zmime-cms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://github.com/abhishektaneja09/zmime-cms/issues" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="https://github.com/abhishektaneja09/zmime-cms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ZMime CMS. Open source and free forever.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DeploymentLanding