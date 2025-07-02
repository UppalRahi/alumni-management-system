// Supabase Configuration
const SUPABASE_CONFIG = {
    url: 'https://yrmvtofxeeqcuxihgdgv.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlybXZ0b2Z4ZWVxY3V4aWhnZGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzQ0ODUsImV4cCI6MjA2NzAxMDQ4NX0.3QSQ8fbuehTPT9gZpOeT9MAmm9e58GkvlYkqOSzbO8k'
};

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// Global state
let currentUser = null;
let currentUserProfile = null;
