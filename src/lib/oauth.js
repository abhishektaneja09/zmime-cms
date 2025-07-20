// OAuth integration utilities for Supabase and Netlify

// Supabase OAuth Configuration
const SUPABASE_OAUTH_CONFIG = {
  clientId: import.meta.env.VITE_SUPABASE_OAUTH_CLIENT_ID || 'demo-client-id',
  redirectUri: `${window.location.origin}/setup`,
  scope: 'read:projects write:projects',
  responseType: 'code'
}

// Netlify OAuth Configuration  
const NETLIFY_OAUTH_CONFIG = {
  clientId: import.meta.env.VITE_NETLIFY_OAUTH_CLIENT_ID || 'demo-client-id',
  redirectUri: `${window.location.origin}/setup`,
  scope: 'read write',
  responseType: 'code'
}

/**
 * Initiate Supabase OAuth flow
 */
export const initiateSupabaseOAuth = () => {
  const params = new URLSearchParams({
    client_id: SUPABASE_OAUTH_CONFIG.clientId,
    redirect_uri: SUPABASE_OAUTH_CONFIG.redirectUri,
    response_type: SUPABASE_OAUTH_CONFIG.responseType,
    scope: SUPABASE_OAUTH_CONFIG.scope,
    state: 'supabase'
  })

  // In production, this would be the actual Supabase OAuth URL
  const authUrl = `https://supabase.com/dashboard/oauth/authorize?${params.toString()}`
  
  // For demo purposes, we'll simulate the OAuth flow
  if (import.meta.env.DEV) {
    // Simulate OAuth redirect in development
    setTimeout(() => {
      window.location.href = '/setup?connected=supabase'
    }, 1500)
  } else {
    window.location.href = authUrl
  }
}

/**
 * Initiate Netlify OAuth flow
 */
export const initiateNetlifyOAuth = () => {
  const params = new URLSearchParams({
    client_id: NETLIFY_OAUTH_CONFIG.clientId,
    redirect_uri: NETLIFY_OAUTH_CONFIG.redirectUri,
    response_type: NETLIFY_OAUTH_CONFIG.responseType,
    state: 'netlify'
  })

  // In production, this would be the actual Netlify OAuth URL
  const authUrl = `https://app.netlify.com/authorize?${params.toString()}`
  
  // For demo purposes, we'll simulate the OAuth flow
  if (import.meta.env.DEV) {
    // Simulate OAuth redirect in development
    setTimeout(() => {
      window.location.href = '/setup?connected=netlify'
    }, 1500)
  } else {
    window.location.href = authUrl
  }
}

/**
 * Exchange OAuth code for access token (Supabase)
 */
export const exchangeSupabaseCode = async (code) => {
  try {
    const response = await fetch('https://supabase.com/api/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: SUPABASE_OAUTH_CONFIG.clientId,
        client_secret: import.meta.env.VITE_SUPABASE_OAUTH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: SUPABASE_OAUTH_CONFIG.redirectUri
      })
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error exchanging Supabase code:', error)
    throw error
  }
}

/**
 * Exchange OAuth code for access token (Netlify)
 */
export const exchangeNetlifyCode = async (code) => {
  try {
    const response = await fetch('https://api.netlify.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: NETLIFY_OAUTH_CONFIG.clientId,
        client_secret: import.meta.env.VITE_NETLIFY_OAUTH_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: NETLIFY_OAUTH_CONFIG.redirectUri
      })
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error exchanging Netlify code:', error)
    throw error
  }
}

/**
 * Create a new Supabase project
 */
export const createSupabaseProject = async (accessToken, projectConfig) => {
  try {
    const response = await fetch('https://api.supabase.com/v1/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: projectConfig.name,
        organization_id: projectConfig.organizationId,
        plan: 'free',
        region: 'us-east-1',
        db_pass: generateSecurePassword()
      })
    })

    const project = await response.json()
    
    // Wait for project to be ready
    await waitForProjectReady(project.id, accessToken)
    
    // Set up database schema
    await setupDatabaseSchema(project, accessToken)
    
    return project
  } catch (error) {
    console.error('Error creating Supabase project:', error)
    throw error
  }
}

/**
 * Deploy site to Netlify
 */
export const deployToNetlify = async (accessToken, siteConfig, supabaseProject) => {
  try {
    // Create site
    const siteResponse = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: siteConfig.siteName,
        custom_domain: siteConfig.customDomain || null
      })
    })

    const site = await siteResponse.json()

    // Deploy from GitHub template
    const deployResponse = await fetch(`https://api.netlify.com/api/v1/sites/${site.id}/deploys`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {}, // This would contain the built files
        functions: {},
        branch: 'main',
        framework: 'vite'
      })
    })

    const deploy = await deployResponse.json()

    // Set environment variables
    await setNetlifyEnvironmentVariables(site.id, accessToken, {
      VITE_SUPABASE_URL: supabaseProject.url,
      VITE_SUPABASE_ANON_KEY: supabaseProject.anon_key,
      VITE_BLOG_TITLE: siteConfig.blogTitle,
      VITE_BLOG_DESCRIPTION: siteConfig.blogDescription
    })

    return { site, deploy }
  } catch (error) {
    console.error('Error deploying to Netlify:', error)
    throw error
  }
}

/**
 * Set environment variables in Netlify
 */
const setNetlifyEnvironmentVariables = async (siteId, accessToken, envVars) => {
  try {
    const response = await fetch(`https://api.netlify.com/api/v1/accounts/[account_slug]/env`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        Object.entries(envVars).map(([key, value]) => ({
          key,
          values: [{ value, context: 'all' }]
        }))
      )
    })

    return await response.json()
  } catch (error) {
    console.error('Error setting environment variables:', error)
    throw error
  }
}

/**
 * Wait for Supabase project to be ready
 */
const waitForProjectReady = async (projectId, accessToken, maxAttempts = 30) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`https://api.supabase.com/v1/projects/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      
      const project = await response.json()
      
      if (project.status === 'ACTIVE_HEALTHY') {
        return project
      }
      
      // Wait 10 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 10000))
    } catch (error) {
      console.error('Error checking project status:', error)
    }
  }
  
  throw new Error('Project setup timeout')
}

/**
 * Set up database schema in Supabase project
 */
const setupDatabaseSchema = async (project, accessToken) => {
  try {
    // Read the database schema file
    const schemaResponse = await fetch('/database-schema.sql')
    const schema = await schemaResponse.text()
    
    // Execute schema via Supabase API
    const response = await fetch(`https://api.supabase.com/v1/projects/${project.id}/database/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: schema
      })
    })

    return await response.json()
  } catch (error) {
    console.error('Error setting up database schema:', error)
    throw error
  }
}

/**
 * Generate a secure password for database
 */
const generateSecurePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}