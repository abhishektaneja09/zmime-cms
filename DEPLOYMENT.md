# ZMime CMS Deployment Guide

## Quick Start Deployment

### Prerequisites
- Supabase account
- Netlify account
- GitHub account (optional, for Git-based deployment)

### Step 1: One-Click Setup (Recommended)

1. Visit your ZMime setup page at `/setup`
2. Click "Connect with Supabase" - this will:
   - Redirect you to Supabase OAuth
   - Create a new project automatically
   - Set up all database tables
   - Configure authentication and security
3. Click "Connect with Netlify" - this will:
   - Redirect you to Netlify OAuth
   - Create a new site
   - Deploy your blog automatically
   - Configure SSL and CDN
4. Configure your blog details and deploy!

### Step 2: Manual Setup (Advanced Users)

If you prefer manual setup or need custom configuration:

#### Set up Supabase
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Go to SQL Editor and run the contents of `database-schema.sql`
4. Enable Row Level Security in Authentication > Settings
5. Configure email templates in Authentication > Templates

#### Configure Environment Variables
1. Copy `.env.example` to `.env`
2. Fill in your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_SUPABASE_OAUTH_CLIENT_ID=your-oauth-client-id
   VITE_NETLIFY_OAUTH_CLIENT_ID=your-netlify-client-id
   ```

#### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy to Netlify via drag-and-drop or Git connection
3. Configure environment variables in Netlify dashboard

### Step 4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned

### Step 5: Set up Firebase (for Push Notifications)

1. Create a Firebase project
2. Enable Cloud Messaging
3. Generate a web app configuration
4. Add Firebase config to your `.env` file
5. Generate VAPID keys for web push

### Step 6: Configure Stripe (for Payments)

1. Create a Stripe account
2. Get your publishable key from the dashboard
3. Add to `.env` file
4. Set up webhooks pointing to your Supabase Edge Functions

## Advanced Configuration

### Multiple Blogs Setup

To support multiple blogs for a single user:

1. Modify the database schema to include a `blogs` table
2. Add blog_id foreign keys to posts, pages, and settings tables
3. Update RLS policies to filter by blog ownership
4. Modify the admin dashboard to show blog selection

### Custom Themes

1. Create theme files in `src/themes/`
2. Add theme selection in settings
3. Use CSS variables for easy customization
4. Support for custom CSS injection

### SEO Optimization

1. Configure meta tags in each post/page
2. Generate sitemap.xml automatically
3. Add structured data (JSON-LD)
4. Optimize images with proper alt tags

### Performance Optimization

1. Enable Netlify's asset optimization
2. Configure caching headers
3. Use Supabase CDN for images
4. Implement lazy loading for images

## Troubleshooting

### Common Issues

1. **Build fails**: Check environment variables are set correctly
2. **Database connection fails**: Verify Supabase URL and key
3. **Authentication not working**: Check RLS policies are enabled
4. **Images not loading**: Verify Supabase storage bucket is public

### Support

- GitHub Issues: [github.com/zmime/zmime-cms/issues](https://github.com/zmime/zmime-cms/issues)
- Documentation: [docs.zmime.com](https://docs.zmime.com)
- Community Discord: [discord.gg/zmime](https://discord.gg/zmime)

## API Endpoints

### Blog Information API
```
GET /api/blog-info
```
Returns latest blog information and announcements from ZMime.

Response:
```json
{
  "announcements": [
    {
      "id": 1,
      "title": "New Theme Available",
      "content": "Check out our new minimalist theme...",
      "image": "https://example.com/banner.jpg",
      "link": "https://zmime.com/themes/minimalist",
      "created_at": "2025-01-15T10:00:00Z"
    }
  ],
  "version": "1.0.0",
  "updates": [
    {
      "version": "1.0.1",
      "features": ["Bug fixes", "Performance improvements"],
      "date": "2025-01-10"
    }
  ]
}
```

This API can be used to show sliding banners and updates in the admin dashboard.