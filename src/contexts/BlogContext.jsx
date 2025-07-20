import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const BlogContext = createContext({})

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    // Demo posts for development
    {
      id: 1,
      title: 'Welcome to ZMime CMS',
      slug: 'welcome-to-zmime-cms',
      content: '# Welcome to ZMime\n\nThis is your first blog post! ZMime is a powerful, open-source blogging CMS that makes it easy to create beautiful blogs.\n\n## Features\n\n- Easy to use admin dashboard\n- Markdown support\n- SEO optimized\n- Mobile responsive\n- And much more!',
      excerpt: 'Welcome to ZMime CMS - a powerful, open-source blogging platform that makes creating beautiful blogs effortless.',
      status: 'published',
      featured: true,
      author: 'Admin',
      created_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
      likes: 12,
      views: 156
    },
    {
      id: 2,
      title: 'Getting Started with Your Blog',
      slug: 'getting-started-with-your-blog',
      content: '# Getting Started\n\nNow that you have ZMime set up, here are some tips to get you started:\n\n## Create Your First Post\n\n1. Go to the admin dashboard\n2. Click on "New Post"\n3. Write your content\n4. Publish when ready\n\n## Customize Your Blog\n\nYou can customize your blog appearance, settings, and more from the admin panel.',
      excerpt: 'Learn how to create your first post and customize your ZMime blog to match your style.',
      status: 'published',
      featured: false,
      author: 'Admin',
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      published_at: new Date(Date.now() - 86400000).toISOString(),
      likes: 8,
      views: 89
    }
  ])
  const [pages, setPages] = useState([])
  const [settings, setSettings] = useState(() => {
    // Get settings from localStorage if available
    const storedTitle = localStorage.getItem('zmime_blog_title')
    const storedDescription = localStorage.getItem('zmime_blog_description')
    
    return {
      title: storedTitle || 'My Blog',
      description: storedDescription || 'A beautiful blog powered by ZMime',
      logo: '',
      theme: 'default'
    }
  })
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('demo') || supabaseKey.includes('demo')) {
      // Use demo data if Supabase is not configured
      console.log('Using demo data - Supabase not configured')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      // Keep demo data on error
    } finally {
      setLoading(false)
    }
  }

  const createPost = async (postData) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
      
      if (error) throw error
      setPosts(prev => [data[0], ...prev])
      return { data: data[0], error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const updatePost = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
      
      if (error) throw error
      setPosts(prev => prev.map(post => 
        post.id === id ? { ...post, ...updates } : post
      ))
      return { data: data[0], error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const deletePost = async (id) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setPosts(prev => prev.filter(post => post.id !== id))
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    posts,
    pages,
    settings,
    loading,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    setSettings
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}