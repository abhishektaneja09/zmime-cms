// Version management for ZMime CMS
export const CURRENT_VERSION = '1.0.0'

// Check for updates from GitHub releases
export const checkForUpdates = async () => {
  try {
    const response = await fetch('https://api.github.com/repos/YOUR_USERNAME/zmime-cms/releases/latest')
    const data = await response.json()
    
    const latestVersion = data.tag_name.replace('v', '')
    const hasUpdate = isNewerVersion(latestVersion, CURRENT_VERSION)
    
    return {
      hasUpdate,
      latestVersion,
      currentVersion: CURRENT_VERSION,
      releaseNotes: data.body,
      downloadUrl: data.html_url,
      publishedAt: data.published_at
    }
  } catch (error) {
    console.error('Failed to check for updates:', error)
    return {
      hasUpdate: false,
      currentVersion: CURRENT_VERSION,
      error: error.message
    }
  }
}

// Compare version numbers
const isNewerVersion = (latest, current) => {
  const latestParts = latest.split('.').map(Number)
  const currentParts = current.split('.').map(Number)
  
  for (let i = 0; i < Math.max(latestParts.length, currentParts.length); i++) {
    const latestPart = latestParts[i] || 0
    const currentPart = currentParts[i] || 0
    
    if (latestPart > currentPart) return true
    if (latestPart < currentPart) return false
  }
  
  return false
}

// Get update instructions
export const getUpdateInstructions = () => {
  return {
    steps: [
      'Backup your current blog data (posts, settings, media)',
      'Download the latest version from GitHub',
      'Replace all files EXCEPT:',
      '  - Your .env file (contains your credentials)',
      '  - Any custom themes you\'ve created',
      '  - Your media uploads folder',
      'Run npm install to update dependencies',
      'Your data will be preserved automatically'
    ],
    safeFiles: [
      '.env',
      '.env.local',
      'public/uploads/*',
      'src/themes/custom/*',
      'netlify.toml'
    ],
    backupRecommendation: 'Always backup your Supabase database before updating'
  }
}

// Check if user data exists
export const hasUserData = () => {
  const hasSupabaseConfig = localStorage.getItem('zmime_supabase_configured')
  const hasSetup = localStorage.getItem('zmime_setup_complete')
  
  return hasSupabaseConfig && hasSetup
}

// Preserve user data during updates
export const preserveUserData = () => {
  const userData = {
    supabaseUrl: localStorage.getItem('zmime_supabase_url'),
    supabaseKey: localStorage.getItem('zmime_supabase_key'),
    blogTitle: localStorage.getItem('zmime_blog_title'),
    blogDescription: localStorage.getItem('zmime_blog_description'),
    adminEmail: localStorage.getItem('zmime_admin_email'),
    setupComplete: localStorage.getItem('zmime_setup_complete'),
    supabaseConfigured: localStorage.getItem('zmime_supabase_configured'),
    customSettings: localStorage.getItem('zmime_custom_settings')
  }
  
  // Store in a backup key
  localStorage.setItem('zmime_user_data_backup', JSON.stringify(userData))
  
  return userData
}

// Restore user data after updates
export const restoreUserData = () => {
  try {
    const backup = localStorage.getItem('zmime_user_data_backup')
    if (!backup) return false
    
    const userData = JSON.parse(backup)
    
    // Restore all user data
    Object.entries(userData).forEach(([key, value]) => {
      if (value) {
        const storageKey = key === 'customSettings' ? 'zmime_custom_settings' : `zmime_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}`
        localStorage.setItem(storageKey, value)
      }
    })
    
    return true
  } catch (error) {
    console.error('Failed to restore user data:', error)
    return false
  }
}