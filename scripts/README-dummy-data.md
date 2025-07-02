# Dummy Data Generation Guide

## Method 1: Using the Script File

1. Load the app in your browser: `http://localhost:8000/index-modular.html`
2. Sign in to your account
3. Open browser developer tools (F12)
4. Go to the Console tab
5. Load the script by running:
   ```javascript
   fetch('/scripts/add-dummy-data.js').then(r => r.text()).then(eval);
   ```
6. Then run:
   ```javascript
   addDummyProfiles();
   ```

## Method 2: Direct Console Execution

Copy and paste this code directly into the browser console:

```javascript
async function quickAddDummyProfiles() {
    const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Jessica', 'Matthew', 'Ashley', 'James', 'Amanda', 'Robert', 'Jennifer', 'William', 'Lisa', 'Richard', 'Michelle', 'Thomas', 'Kimberly'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    const departments = ['Computer Science', 'Engineering', 'Business', 'Economics', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Psychology', 'Literature'];
    const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Tesla', 'Netflix', 'Uber', 'Airbnb', 'Spotify'];
    const positions = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer', 'Full Stack Developer', 'Marketing Manager', 'Business Analyst', 'Project Manager', 'Engineering Manager'];
    const locations = ['CA, USA', 'NY, USA', 'TX, USA', 'WA, USA', 'Karnataka, India', 'Maharashtra, India', 'Ontario, Canada', 'England, UK', 'Germany', 'Australia'];
    
    function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    
    const profiles = [];
    for (let i = 0; i < 100; i++) {
        const firstName = getRandom(firstNames);
        const lastName = getRandom(lastNames);
        profiles.push({
            id: `dummy-${i + 1}-${Date.now()}`,
            full_name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
            graduation_year: Math.floor(Math.random() * 15) + 2010,
            department: getRandom(departments),
            current_company: getRandom(companies),
            current_position: getRandom(positions),
            location: getRandom(locations),
            linkedin_url: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
            bio: "Passionate professional with experience in technology and innovation.",
            skills: "JavaScript, Python, Project Management",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });
    }
    
    let success = 0;
    for (let i = 0; i < profiles.length; i += 10) {
        const batch = profiles.slice(i, i + 10);
        try {
            const { error } = await supabase.from('profiles').insert(batch);
            if (!error) success += batch.length;
            await new Promise(r => setTimeout(r, 100));
        } catch (e) { console.error(e); }
    }
    
    console.log(`✅ Added ${success} dummy profiles!`);
    return success;
}

quickAddDummyProfiles();
```

## What the Script Does

- Generates 100 realistic dummy profiles with:
  - Diverse names (first + last combinations)
  - Realistic email addresses
  - Graduation years from 2010-2024
  - Various departments and majors
  - Current companies (major tech companies)
  - Job positions across different roles
  - Locations (US states, Indian states, other countries)
  - LinkedIn URLs
  - Professional bios
  - Skill sets relevant to each role

## After Running the Script

1. **Refresh Dashboard**: Go to the dashboard to see updated statistics
2. **Browse Network**: Check the network section to see all the new profiles
3. **Test Search**: Try searching for specific companies, skills, or locations
4. **Test Filters**: Use any filtering functionality to browse the data
5. **Check Charts**: Dashboard charts should now show more realistic data

## Troubleshooting

- **Supabase not defined**: Make sure you're running this on the app page where Supabase is loaded
- **Permission errors**: Ensure your RLS policies allow inserting profile data
- **Batch failures**: The script inserts in batches of 10 to avoid overwhelming the database
- **Duplicate emails**: Each dummy profile gets a unique email with a number suffix

## Cleanup (Optional)

To remove dummy data later, you can run:
```javascript
// Remove all dummy profiles (be careful!)
supabase.from('profiles').delete().like('id', 'dummy-%').then(r => console.log('Dummy data removed:', r));
```
