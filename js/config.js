// Supabase Configuration
const SUPABASE_CONFIG = {
    url: 'https://yrmvtofxeeqcuxihgdgv.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlybXZ0b2Z4ZWVxY3V4aWhnZGd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MzQ0ODUsImV4cCI6MjA2NzAxMDQ4NX0.3QSQ8fbuehTPT9gZpOeT9MAmm9e58GkvlYkqOSzbO8k'
};

// Initialize Supabase client with comprehensive error handling
let supabase;
let isSupabaseReady = false;

try {
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase library not loaded');
        throw new Error('Supabase library not available');
    } else {
        supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        console.log('✅ Supabase client initialized successfully');
        
        // Test the connection
        supabase.auth.getSession().then(({ data, error }) => {
            if (error) {
                console.warn('⚠️ Supabase connection warning:', error.message);
            } else {
                console.log('✅ Supabase connection verified');
                isSupabaseReady = true;
            }
        }).catch(err => {
            console.error('❌ Supabase connection test failed:', err);
        });
    }
} catch (error) {
    console.error('❌ Error initializing Supabase:', error);
    
    // Create mock Supabase object to prevent errors
    supabase = {
        auth: {
            signInWithPassword: () => Promise.reject(new Error('Database connection unavailable')),
            signUp: () => Promise.reject(new Error('Database connection unavailable')),
            signOut: () => Promise.reject(new Error('Database connection unavailable')),
            getSession: () => Promise.resolve({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
        },
        from: () => ({
            select: () => Promise.reject(new Error('Database connection unavailable')),
            insert: () => Promise.reject(new Error('Database connection unavailable')),
            update: () => Promise.reject(new Error('Database connection unavailable')),
            delete: () => Promise.reject(new Error('Database connection unavailable'))
        })
    };
}

// Global state
let currentUser = null;
let currentUserProfile = null;

// Function to check if Supabase is ready
function isSupabaseConnected() {
    return isSupabaseReady && supabase && typeof supabase.auth !== 'undefined';
}

// Wrapper function for Supabase operations with error handling
async function withSupabaseErrorHandling(operation, errorMessage = 'Database operation failed') {
    if (!isSupabaseConnected()) {
        const error = new Error('Database connection is not available');
        console.error('❌', errorMessage + ':', error.message);
        if (typeof showErrorMessage === 'function') {
            showErrorMessage('Database connection unavailable. Please refresh the page.');
        }
        throw error;
    }
    
    try {
        const result = await operation();
        return result;
    } catch (error) {
        console.error('❌', errorMessage + ':', error.message);
        if (typeof showErrorMessage === 'function') {
            showErrorMessage(errorMessage + ': ' + error.message);
        }
        throw error;
    }
}
