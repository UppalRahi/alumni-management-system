// Simple and robust dummy data script
// Copy and paste this entire code into browser console

console.log('🚀 Starting simple dummy data insertion...');

async function addSimpleDummyData() {
    // Check if we're authenticated and supabase is available
    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase not available. Make sure you are on the app page.');
        return;
    }
    
    if (!currentUser) {
        console.error('❌ Please sign in first before adding dummy data.');
        return;
    }
    
    console.log('✅ User authenticated, proceeding with data insertion...');
    
    // Simple data arrays
    const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const lastNames = ['Anderson', 'Brown', 'Clark', 'Davis', 'Evans', 'Garcia', 'Harris', 'Jones', 'King', 'Lee'];
    const departments = ['Computer Science', 'Engineering', 'Business', 'Mathematics', 'Physics'];
    const companies = ['Google', 'Microsoft', 'Apple', 'Amazon', 'Meta'];
    const positions = ['Software Engineer', 'Product Manager', 'Data Scientist', 'Designer', 'Analyst'];
    const locations = ['CA, USA', 'NY, USA', 'TX, USA', 'Karnataka, India', 'England, UK'];
    
    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    
    let successCount = 0;
    let failureCount = 0;
    
    // Insert profiles one by one to avoid batch issues
    for (let i = 1; i <= 20; i++) { // Start with just 20 profiles
        const firstName = getRandom(firstNames);
        const lastName = getRandom(lastNames);
        
        const profile = {
            full_name: `${firstName} ${lastName} ${i}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${i}@alumni.edu`,
            graduation_year: 2015 + (i % 10), // Years from 2015-2024
            department: getRandom(departments),
            current_company: getRandom(companies),
            current_position: getRandom(positions),
            location: getRandom(locations),
            linkedin_url: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i}`,
            bio: `Passionate ${getRandom(positions).toLowerCase()} with ${2 + (i % 8)} years of experience.`,
            skills: `JavaScript, Python, ${getRandom(['React', 'Angular', 'Vue'])}, ${getRandom(['AWS', 'Azure', 'GCP'])}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        try {
            console.log(`📤 Inserting profile ${i}/20: ${profile.full_name}`);
            
            const { data, error } = await supabase
                .from('profiles')
                .insert([profile])
                .select();
            
            if (error) {
                console.error(`❌ Failed to insert profile ${i}:`, error.message);
                failureCount++;
            } else {
                console.log(`✅ Successfully inserted profile ${i}: ${profile.full_name}`);
                successCount++;
            }
            
            // Small delay between insertions
            await new Promise(resolve => setTimeout(resolve, 300));
            
        } catch (err) {
            console.error(`❌ Exception inserting profile ${i}:`, err.message);
            failureCount++;
        }
    }
    
    console.log('\n🎉 Dummy data insertion completed!');
    console.log(`✅ Successfully inserted: ${successCount} profiles`);
    console.log(`❌ Failed to insert: ${failureCount} profiles`);
    
    if (successCount > 0) {
        console.log('\n💡 Next steps:');
        console.log('1. Go to Dashboard to see updated stats');
        console.log('2. Go to Network to browse profiles');
        console.log('3. Refresh the page to see all changes');
    }
    
    return { successCount, failureCount };
}

// Run the function
addSimpleDummyData();
