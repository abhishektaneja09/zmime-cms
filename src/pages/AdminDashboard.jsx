import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  Eye,
  Zap,
  Download,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useBlog } from '../contexts/BlogContext'
import { checkForUpdates, CURRENT_VERSION } from '../lib/version'

const AdminDashboard = () => {
  const { user, signOut } = useAuth()
  const { posts, settings } = useBlog()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('dashboard')

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'posts', label: 'Posts', icon: FileText, path: '/admin/posts' },
    { id: 'pages', label: 'Pages', icon: FileText, path: '/admin/pages' },
    { id: 'members', label: 'Members', icon: Users, path: '/admin/members' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-ghost-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-ghost-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-ghost-200">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-ghost-900">ZMime</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/blog"
            target="_blank"
            className="flex items-center space-x-3 px-4 py-2 text-ghost-600 hover:text-ghost-900 hover:bg-ghost-50 rounded-lg transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            <span>View Site</span>
          </Link>
          
          <hr className="my-4 border-ghost-200" />
          
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-ghost-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ghost-900 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 w-full px-3 py-2 text-ghost-600 hover:text-ghost-900 hover:bg-ghost-50 rounded-lg transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/posts" element={<PostsManager />} />
          <Route path="/pages" element={<PagesManager />} />
          <Route path="/members" element={<MembersManager />} />
          <Route path="/settings" element={<SettingsManager />} />
        </Routes>
      </div>
    </div>
  )
}

// Dashboard Home Component
const DashboardHome = () => {
  const { posts } = useBlog()
  const [blogInfo, setBlogInfo] = useState(null)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [updateInfo, setUpdateInfo] = useState(null)
  const [showUpdateBanner, setShowUpdateBanner] = useState(false)
  
  const stats = {
    totalMembers: 1250,
    paidMembers: 89,
    freeMembers: 1161,
    totalPosts: posts.length
  }

  // Fetch blog information and check for updates
  useEffect(() => {
    const fetchBlogInfo = async () => {
      try {
        const response = await fetch('/.netlify/functions/blog-info')
        const data = await response.json()
        setBlogInfo(data)
      } catch (error) {
        console.error('Failed to fetch blog info:', error)
      }
    }
    
    const checkUpdates = async () => {
      try {
        const updateData = await checkForUpdates()
        setUpdateInfo(updateData)
        setShowUpdateBanner(updateData.hasUpdate)
      } catch (error) {
        console.error('Failed to check for updates:', error)
      }
    }
    
    fetchBlogInfo()
    checkUpdates()
  }, [])

  // Auto-rotate banners
  useEffect(() => {
    if (blogInfo?.announcements?.length > 1) {
      const interval = setInterval(() => {
        setCurrentBanner(prev => 
          prev === blogInfo.announcements.length - 1 ? 0 : prev + 1
        )
      }, 5000) // Change every 5 seconds
      
      return () => clearInterval(interval)
    }
  }, [blogInfo])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-ghost-900 mb-8">Dashboard</h1>
      
      {/* Update Available Banner */}
      {showUpdateBanner && updateInfo && (
        <div className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <AlertCircle className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">Update Available!</h3>
                <p className="text-sm opacity-90">
                  ZMime v{updateInfo.latestVersion} is now available (current: v{updateInfo.currentVersion})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowUpdateBanner(false)}
                className="text-white/70 hover:text-white text-sm"
              >
                Dismiss
              </button>
              <a
                href={updateInfo.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Update Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* ZMime Updates Banner */}
      {blogInfo?.announcements && blogInfo.announcements.length > 0 && (
        <div className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="relative h-32 flex items-center">
            {blogInfo.announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`absolute inset-0 flex items-center transition-transform duration-500 ease-in-out ${
                  index === currentBanner ? 'translate-x-0' : 
                  index < currentBanner ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <div className="flex items-center space-x-4 px-6 w-full">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{announcement.title}</h3>
                    <p className="text-sm opacity-90 line-clamp-2">{announcement.content}</p>
                  </div>
                  <a
                    href={announcement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Banner indicators */}
          {blogInfo.announcements.length > 1 && (
            <div className="absolute bottom-4 left-6 flex space-x-2">
              {blogInfo.announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentBanner ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-sm font-medium text-ghost-500 mb-2">Total Members</h3>
          <p className="text-3xl font-bold text-ghost-900">{stats.totalMembers.toLocaleString()}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-ghost-500 mb-2">Paid Members</h3>
          <p className="text-3xl font-bold text-primary-600">{stats.paidMembers}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-ghost-500 mb-2">Free Members</h3>
          <p className="text-3xl font-bold text-ghost-600">{stats.freeMembers.toLocaleString()}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-ghost-500 mb-2">Total Posts</h3>
          <p className="text-3xl font-bold text-ghost-900">{stats.totalPosts}</p>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-ghost-900">Recent Posts</h2>
          <Link to="/admin/posts" className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </div>
        
        <div className="space-y-4">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 bg-ghost-50 rounded-lg">
              <div>
                <h3 className="font-medium text-ghost-900">{post.title}</h3>
                <p className="text-sm text-ghost-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  post.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Posts Manager Component
const PostsManager = () => {
  const { posts } = useBlog()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ghost-900">Posts</h1>
        <button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </button>
      </div>

      <div className="card">
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 border border-ghost-200 rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-ghost-900">{post.title}</h3>
                <p className="text-sm text-ghost-500 mt-1">{post.excerpt}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-ghost-400">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  <span>{post.status}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-ghost-400 hover:text-ghost-600">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-ghost-400 hover:text-ghost-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-ghost-400 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Placeholder components for other routes
const PagesManager = () => <div className="p-8"><h1 className="text-3xl font-bold">Pages</h1></div>
const MembersManager = () => <div className="p-8"><h1 className="text-3xl font-bold">Members</h1></div>
const SettingsManager = () => <div className="p-8"><h1 className="text-3xl font-bold">Settings</h1></div>

export default AdminDashboard