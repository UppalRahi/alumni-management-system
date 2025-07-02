// TROUBLESHOOTING GUIDE FOR ALUMNI NETWORK PLATFORM

## Current Issues Observed:

1. **Dummy data insertion failing** - Batch requests causing errors
2. **Network/filter loading issues** - Elements not found errors
3. **Bad request errors** - Possible Supabase connection issues

## Quick Fixes:

### 1. SIMPLE DUMMY DATA (Copy this into browser console):

```javascript
// STEP 1: First check if everything is working
console.log('Checking system status...');
console.log('Supabase available:', typeof supabase !== 'undefined');
console.log('Current user:', currentUser ? 'Authenticated' : 'Not authenticated');

// STEP 2: Add ONE test profile first
async function addOneTestProfile() {
    try {
        const testProfile = {
            full_name: "Test User " + Date.now(),
            email: "test" + Date.now() + "@alumni.edu",
            graduation_year: 2020,
            department: "Computer Science",
            current_company: "Google",
            current_position: "Software Engineer",
            location: "CA, USA",
            bio: "Test profile for debugging",
            skills: "JavaScript, Python",
            linkedin_url: "https://linkedin.com/in/test-user",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        console.log('Inserting test profile:', testProfile.full_name);
        
        const { data, error } = await supabase
            .from('profiles')
            .insert([testProfile])
            .select();
        
        if (error) {
            console.error('❌ Test profile failed:', error);
            return false;
        } else {
            console.log('✅ Test profile successful:', data);
            return true;
        }
    } catch (err) {
        console.error('❌ Test profile exception:', err);
        return false;
    }
}

// STEP 3: Run the test
addOneTestProfile().then(success => {
    if (success) {
        console.log('🎉 Database is working! You can now add more profiles.');
    } else {
        console.log('❌ Database issues detected. Check your Supabase configuration.');
    }
});
```

### 2. NETWORK SECTION FIX:

The network section might be failing because filter elements aren't loaded yet. Try this:

```javascript
// Force reload network section
showSection('network');
setTimeout(() => {
    loadAlumniNetwork();
}, 1000);
```

### 3. PROFILE UPDATE FIX:

If profile updates aren't working, try this debug:

```javascript
// Debug profile update
debugProfileState();
```

## Common Solutions:

### A. Supabase RLS (Row Level Security) Issues:
If you get permission errors, you might need to adjust your RLS policies in Supabase dashboard:

```sql
-- Allow authenticated users to read all profiles
CREATE POLICY "Allow authenticated users to read profiles" ON profiles
FOR SELECT TO authenticated USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Allow users to insert own profile" ON profiles
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Allow users to update own profile" ON profiles
FOR UPDATE TO authenticated USING (auth.uid() = id);
```

### B. Network Connection Issues:
- Check if you're on the correct URL: `http://localhost:8000/index-modular.html`
- Ensure your development server is running
- Try refreshing the page completely (Ctrl+F5)

### C. Component Loading Issues:
If sections aren't loading properly:

```javascript
// Force reload all components
initializeComponents().then(() => {
    console.log('✅ Components reloaded');
    showSection('dashboard');
});
```

## Step-by-Step Recovery:

1. **Refresh the page completely** (Ctrl+F5)
2. **Sign in again**
3. **Test with ONE profile first** (use code above)
4. **Check the Network section** manually
5. **Try updating your own profile**
6. **Only then add multiple dummy profiles**

## Manual Dummy Data (if automated fails):

You can manually create profiles in Supabase dashboard:
1. Go to your Supabase project → Table Editor → profiles
2. Click "Insert" → "Insert row"
3. Fill in the fields manually
4. Repeat for a few test profiles

This will help identify if the issue is with the insertion script or the database setup itself.
