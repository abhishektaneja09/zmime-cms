// Netlify Function to handle Supabase OAuth callback
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { code } = JSON.parse(event.body)
    
    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Authorization code is required' })
      }
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://supabase.com/api/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.VITE_SUPABASE_OAUTH_CLIENT_ID,
        client_secret: process.env.VITE_SUPABASE_OAUTH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.URL}/setup`
      })
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Failed to exchange code')
    }

    // Get user info and organizations
    const userResponse = await fetch('https://api.supabase.com/v1/profile', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    const userData = await userResponse.json()

    // Get user's organizations
    const orgsResponse = await fetch('https://api.supabase.com/v1/organizations', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    const orgsData = await orgsResponse.json()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        access_token: tokenData.access_token,
        user: userData,
        organizations: orgsData,
        connected: true,
        email: userData.email
      })
    }

  } catch (error) {
    console.error('Supabase OAuth error:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    }
  }
}