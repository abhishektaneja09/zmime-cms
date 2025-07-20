// Netlify Function to handle Netlify OAuth callback
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
    const tokenResponse = await fetch('https://api.netlify.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.VITE_NETLIFY_OAUTH_CLIENT_ID,
        client_secret: process.env.VITE_NETLIFY_OAUTH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.URL}/setup`
      })
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error_description || 'Failed to exchange code')
    }

    // Get user info
    const userResponse = await fetch('https://api.netlify.com/api/v1/user', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    const userData = await userResponse.json()

    // Get user's sites
    const sitesResponse = await fetch('https://api.netlify.com/api/v1/sites', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    })

    const sitesData = await sitesResponse.json()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        access_token: tokenData.access_token,
        user: userData,
        sites: sitesData,
        connected: true,
        email: userData.email
      })
    }

  } catch (error) {
    console.error('Netlify OAuth error:', error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    }
  }
}