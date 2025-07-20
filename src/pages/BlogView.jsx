import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { useBlog } from '../contexts/BlogContext'

const BlogView = () => {
  const { posts, settings, fetchPosts } = useBlog()

  useEffect(() => {
    fetchPosts()
  }, [])

  const featuredPost = posts.find(post => post.featured) || posts[0]
  const regularPosts = posts.filter(post => post.id !== featuredPost?.id)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-ghost-200">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-ghost-900 mb-2">
              {settings.title}
            </h1>
            <p className="text-ghost-600 text-lg">
              {settings.description}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white">
              <div className="p-12">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                    Featured
                  </span>
                  <h2 className="text-4xl font-bold mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-xl opacity-90 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-6 text-sm opacity-80 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author || 'Admin'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-ghost-50 transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        <section>
          <h2 className="text-2xl font-bold text-ghost-900 mb-8">Latest Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="group">
                <div className="bg-white rounded-lg border border-ghost-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featured_image && (
                    <div className="aspect-video bg-ghost-100">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-ghost-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-ghost-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-ghost-500">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{post.author || 'Admin'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-2 text-primary-600 font-medium mt-4 hover:text-primary-700 transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-ghost-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-ghost-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-ghost-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss a post. Get the latest insights delivered straight to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-ghost-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-ghost-200 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-ghost-500">
            <p>&copy; 2025 {settings.title}. Powered by ZMime.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default BlogView