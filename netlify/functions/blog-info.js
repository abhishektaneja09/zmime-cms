// API endpoint for ZMime blog information and announcements
exports.handler = async (event, context) => {
    // Allow CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
    }

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        }
    }

    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        }
    }

    try {
        // Sample blog information data
        // In production, this would come from a database or CMS
        const blogInfo = {
            announcements: [
                {
                    id: 1,
                    title: "🎉 New Minimalist Theme Available",
                    content: "We've just released a beautiful new minimalist theme perfect for writers and content creators. Clean typography, distraction-free reading experience, and mobile-optimized design.",
                    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
                    link: "https://zmime.com/themes/minimalist",
                    created_at: "2025-01-15T10:00:00Z",
                    type: "feature"
                },
                {
                    id: 2,
                    title: "📱 Mobile App Coming Soon",
                    content: "Manage your ZMime blog on the go! Our mobile app is in beta testing. Sign up to be notified when it's available.",
                    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
                    link: "https://zmime.com/mobile-beta",
                    created_at: "2025-01-12T14:30:00Z",
                    type: "announcement"
                },
                {
                    id: 3,
                    title: "💰 Monetization Features Enhanced",
                    content: "New Stripe integration improvements, better subscription management, and advanced analytics for paid content creators.",
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
                    link: "https://zmime.com/features/monetization",
                    created_at: "2025-01-10T09:15:00Z",
                    type: "update"
                }
            ],
            version: "1.2.0",
            latest_version: {
                version: "1.2.0",
                release_date: "2025-01-15",
                changelog_url: "https://github.com/zmime/zmime-cms/releases/tag/v1.2.0",
                breaking_changes: false,
                auto_update_available: true
            },
            updates: [
                {
                    version: "1.2.0",
                    features: [
                        "New minimalist theme",
                        "Enhanced mobile responsiveness",
                        "Improved SEO optimization",
                        "Better comment moderation tools"
                    ],
                    bug_fixes: [
                        "Fixed image upload issues",
                        "Resolved authentication edge cases",
                        "Improved performance on large blogs"
                    ],
                    date: "2025-01-15",
                    type: "minor"
                },
                {
                    version: "1.1.5",
                    features: [
                        "Dark mode support",
                        "Advanced analytics dashboard",
                        "Email newsletter improvements"
                    ],
                    bug_fixes: [
                        "Fixed deployment issues",
                        "Resolved Stripe webhook handling"
                    ],
                    date: "2025-01-08",
                    type: "patch"
                },
                {
                    version: "1.1.0",
                    features: [
                        "Multi-language support",
                        "Advanced SEO tools",
                        "Custom domain SSL automation",
                        "Enhanced media library"
                    ],
                    bug_fixes: [
                        "Performance optimizations",
                        "Security improvements"
                    ],
                    date: "2025-01-01",
                    type: "minor"
                }
            ],
            community: {
                discord_url: "https://discord.gg/zmime",
                github_url: "https://github.com/zmime/zmime-cms",
                documentation_url: "https://docs.zmime.com",
                support_email: "support@zmime.com"
            },
            stats: {
                total_blogs: 15420,
                active_users: 8930,
                posts_published: 125000,
                countries: 89
            },
            featured_blogs: [
                {
                    title: "Tech Insights Daily",
                    url: "https://techinsights.blog",
                    description: "Latest technology trends and insights",
                    screenshot: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
                },
                {
                    title: "Creative Writing Hub",
                    url: "https://creativewriting.space",
                    description: "Stories, poems, and writing tips",
                    screenshot: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop"
                },
                {
                    title: "Food & Travel Adventures",
                    url: "https://foodtravel.blog",
                    description: "Culinary journeys around the world",
                    screenshot: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
                }
            ],
            tips: [
                {
                    title: "Optimize Your Blog for SEO",
                    content: "Use descriptive titles, meta descriptions, and proper heading structure to improve your search rankings.",
                    category: "seo"
                },
                {
                    title: "Engage Your Audience",
                    content: "Respond to comments promptly and create content that encourages discussion and sharing.",
                    category: "engagement"
                },
                {
                    title: "Consistent Publishing Schedule",
                    content: "Regular posting keeps your audience engaged and helps with SEO. Use the scheduling feature to maintain consistency.",
                    category: "content"
                }
            ]
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(blogInfo)
        }

    } catch (error) {
        console.error('Blog info API error:', error)

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        }
    }
}