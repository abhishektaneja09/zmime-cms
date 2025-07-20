import { createClient } from '@supabase/supabase-js'

// Get Supabase configuration from localStorage or environment variables
const getSupabaseConfig = () => {
  // First try localStorage (user setup)
  const storedUrl = localStorage.getItem('zmime_supabase_url')
  const storedKey = localStorage.getItem('zmime_supabase_key')
  
  if (storedUrl && storedKey) {
    return { url: storedUrl, key: storedKey }
  }
  
  // Fallback to environment variables
  return {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'
  }
}

const { url: supabaseUrl, key: supabaseAnonKey } = getSupabaseConfig()

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

// Function to reinitialize Supabase with new credentials
export const reinitializeSupabase = (newUrl, newKey) => {
  return createClient(newUrl, newKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  })
}