import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useBlog } from '../contexts/BlogContext'

const PostView = () => {
  const { slug } = useParams()
  const { posts, settings } = useBlog()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    const foundPost = posts.find(p => p.slug === slug)
    if (foundPost) {
      setPost(foundPost)
      setLikes(foundPost.likes || 0)
      // Load comments for this post
      loadComments(foundPost.id)
    }
  }, [slug, posts])

  const loadComments = async (postId) => {
    // This would fetch comments from Supabase
    // For now, using mock data
    setComments([
      {
        id: 1,
        author: 'John Doe',
        content: 'Great post! Really helpful insights.',
        created_at: new Date().toISOString(),
        avatar: null
      },
      {
        id: 2,
        author: 'Jane Smith',
        content: 'Thanks for sharing this. Looking forward to more content like this.',
        created_at: new Date().toISOString(),
        avatar: null
      }
    ])
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikes(prev => liked ? prev - 1 : prev + 1)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      author: 'Anonymous',
      content: newComment,
      created_at: new Date().toISOString(),
      avatar: null
    }

    setComments(prev => [...prev, comment])
    setNewComment('')
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ghost-900 mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary-600 hover:text-primary-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-ghost-200">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-ghost-600 hover:text-ghost-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-ghost-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-6 text-ghost-600 mb-8">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>{post.author || 'Admin'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              <span>•</span>
              <span>{post.read_time || '5'} min read</span>
            </div>

            {post.featured_image && (
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between py-8 border-y border-ghost-200 mb-12">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  liked 
                    ? 'bg-red-50 text-red-600' 
                    : 'bg-ghost-50 text-ghost-600 hover:bg-ghost-100'
                }`}
              >
                <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-ghost-50 text-ghost-600 rounded-lg hover:bg-ghost-100 transition-colors">
                <MessageCircle className="h-5 w-5" />
                <span>{comments.length}</span>
              </button>
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-ghost-50 text-ghost-600 rounded-lg hover:bg-ghost-100 transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>

          {/* Comments Section */}
          <section>
            <h2 className="text-2xl font-bold text-ghost-900 mb-8">
              Comments ({comments.length})
            </h2>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-12">
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  rows={4}
                  className="w-full px-4 py-3 border border-ghost-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-8">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-ghost-900">{comment.author}</span>
                      <span className="text-sm text-ghost-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-ghost-700">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
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

export default PostView