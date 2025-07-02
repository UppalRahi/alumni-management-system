// Database utility functions

// Database setup helper (for debugging)
async function checkDatabaseSetup() {
    console.log('Checking database setup...');
    
    try {
        // Test if profiles table exists and is accessible
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .limit(1);
        
        if (error) {
            console.error('Profiles table error:', error);
            if (error.code === 'PGRST116') {
                alert('❌ The profiles table does not exist. Please create it in your Supabase dashboard.');
                return false;
            }
            if (error.code === '42501') {
                alert('❌ Permission denied to profiles table. Please check your Row Level Security (RLS) policies.');
                return false;
            }
            alert('❌ Database error: ' + error.message);
            return false;
        }
        
        console.log('✅ Database setup OK');
        return true;
    } catch (err) {
        console.error('Database setup check failed:', err);
        alert('❌ Database connection failed: ' + err.message);
        return false;
    }
}

// Test function to create the tables
async function createTablesIfNeeded() {
    console.log('Creating tables if needed...');
    
    // This will help us understand what's missing
    const testQueries = [
        { name: 'profiles', query: () => supabase.from('profiles').select('count', { count: 'exact', head: true }) },
        { name: 'events', query: () => supabase.from('events').select('count', { count: 'exact', head: true }) }
    ];
    
    for (const test of testQueries) {
        try {
            const { data, error } = await test.query();
            if (error) {
                console.error(`❌ Table '${test.name}' error:`, error);
                alert(`❌ Table '${test.name}' has issues: ${error.message}`);
            } else {
                console.log(`✅ Table '${test.name}' is accessible`);
            }
        } catch (err) {
            console.error(`❌ Failed to test table '${test.name}':`, err);
        }
    }
}

// Manual database connection test
async function testDatabaseConnection() {
    console.log('🧪 Manual database test started...');
    
    if (typeof showErrorMessage === 'function') {
        showErrorMessage('Testing database connection... Check the console for details.', 'info');
    } else {
        alert('🧪 Testing database connection... Check the console for details.');
    }
    
    try {
        // Test basic Supabase connection
        if (!isSupabaseConnected()) {
            throw new Error('Supabase is not properly connected');
        }
        
        // Test authentication system
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
            console.warn('⚠️ Auth session check warning:', sessionError);
        } else {
            console.log('✅ Auth system accessible');
        }
        
        // First check if tables exist
        await createTablesIfNeeded();
        
        // Then check setup
        const dbOK = await checkDatabaseSetup();
        
        if (!dbOK) {
            // Show setup instructions
            if (typeof showErrorMessage === 'function') {
                showErrorMessage('Database tables need to be created. Check console for setup instructions.', 'warning');
            }
            
            // Show detailed setup instructions in console
            console.log(`
DATABASE SETUP REQUIRED

Please run these SQL commands in your Supabase SQL Editor:

1. CREATE PROFILES TABLE:
CREATE TABLE IF NOT EXISTS profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name text,
    email text,
    graduation_year integer,
    department text,
    current_company text,
    current_position text,
    location text,
    linkedin_url text,
    bio text,
    skills text,
    is_mentor boolean DEFAULT false,
    mentor_experience integer,
    mentor_expertise text,
    mentor_bio text,
    mentor_availability text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

2. SET UP ROW LEVEL SECURITY:
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

3. CREATE POLICIES:
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

Go to: https://supabase.com/dashboard/project/yrmvtofxeeqcuxihgdgv/sql
            `);
        } else {
            console.log('✅ Database test completed successfully!');
            if (typeof showErrorMessage === 'function') {
                showErrorMessage('Database connection test successful!', 'success');
            } else {
                alert('✅ Database connection test successful!');
            }
        }
        
    } catch (error) {
        console.error('❌ Database test failed:', error);
        if (typeof showErrorMessage === 'function') {
            showErrorMessage('Database test failed: ' + error.message, 'error');
        } else {
            alert('❌ Database test failed: ' + error.message);
        }
    }

2️⃣ ENABLE ROW LEVEL SECURITY:
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

3️⃣ CREATE RLS POLICIES:
-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

-- Allow users to view all profiles (for network feature)
CREATE POLICY "Users can view all profiles" ON profiles
FOR SELECT USING (true);

4️⃣ CREATE EVENTS TABLE:
CREATE TABLE IF NOT EXISTS events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    event_date timestamp with time zone,
    location text,
    created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    attendee_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

5️⃣ ENABLE RLS FOR EVENTS:
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow all users to view events
CREATE POLICY "Users can view events" ON events
FOR SELECT USING (true);

-- Allow authenticated users to create events
CREATE POLICY "Users can create events" ON events
FOR INSERT WITH CHECK (auth.uid() = created_by);

After running these commands, try signing up again!
        `;
        
        console.log(setupInstructions);
        alert(setupInstructions);
        return;
    }
    
    // Test auth signup without profile creation
    try {
        console.log('🧪 Testing auth signup...');
        const testEmail = `test_${Date.now()}@example.com`;
        
        const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: 'testpassword123',
            options: {
                data: { full_name: 'Test User' }
            }
        });
        
        console.log('🧪 Auth signup test result:', { data, error });
        
        if (error) {
            alert('❌ Auth signup failed: ' + error.message);
        } else {
            alert('✅ Database and Auth are working correctly!');
        }
    } catch (err) {
        console.error('🧪 Auth test failed:', err);
        alert('❌ Auth test failed: ' + err.message);
    }
}
