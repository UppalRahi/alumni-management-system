// Script to add 100 dummy profiles to the database
// Run this in the browser console after logging into the app

async function addDummyProfiles() {
    console.log('🚀 Starting to add 100 dummy profiles...');
    
    // Check if supabase is available
    if (typeof supabase === 'undefined') {
        console.error('❌ Supabase not available. Please run this in the browser console on the app page.');
        return;
    }
    
    // Sample data arrays
    const firstNames = [
        'John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Jessica', 'Matthew', 'Ashley',
        'James', 'Amanda', 'Robert', 'Jennifer', 'William', 'Lisa', 'Richard', 'Michelle', 'Thomas', 'Kimberly',
        'Charles', 'Amy', 'Joseph', 'Angela', 'Christopher', 'Brenda', 'Daniel', 'Emma', 'Paul', 'Olivia',
        'Mark', 'Cynthia', 'Donald', 'Marie', 'Steven', 'Janet', 'Kenneth', 'Catherine', 'Joshua', 'Frances',
        'Kevin', 'Christine', 'Brian', 'Samantha', 'George', 'Deborah', 'Edward', 'Rachel', 'Ronald', 'Carolyn'
    ];
    
    const lastNames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
        'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
        'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
        'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
    ];
    
    const departments = [
        'Computer Science', 'Engineering', 'Business Administration', 'Economics', 'Mathematics',
        'Physics', 'Chemistry', 'Biology', 'Psychology', 'English Literature',
        'History', 'Political Science', 'Sociology', 'Philosophy', 'Art & Design',
        'Marketing', 'Finance', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'
    ];
    
    const companies = [
        'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta', 'Tesla', 'Netflix', 'Uber', 'Airbnb', 'Spotify',
        'IBM', 'Oracle', 'Salesforce', 'Adobe', 'Intel', 'NVIDIA', 'PayPal', 'Twitter', 'LinkedIn', 'Zoom',
        'Slack', 'Dropbox', 'Square', 'Stripe', 'Palantir', 'Snowflake', 'Atlassian', 'ServiceNow', 'Workday', 'DocuSign',
        'Goldman Sachs', 'JPMorgan Chase', 'Bank of America', 'Wells Fargo', 'Citigroup', 'Morgan Stanley', 'American Express',
        'Deloitte', 'PwC', 'EY', 'KPMG', 'McKinsey & Company', 'Boston Consulting Group', 'Accenture', 'Bain & Company'
    ];
    
    const positions = [
        'Software Engineer', 'Senior Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer',
        'DevOps Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Mobile Developer',
        'Machine Learning Engineer', 'Data Analyst', 'Business Analyst', 'Product Designer', 'Engineering Manager',
        'Technical Lead', 'Software Architect', 'Cloud Architect', 'Security Engineer', 'Site Reliability Engineer',
        'Marketing Manager', 'Sales Manager', 'Financial Analyst', 'Consultant', 'Project Manager',
        'Operations Manager', 'HR Manager', 'Customer Success Manager', 'Account Manager', 'Research Scientist'
    ];
    
    const locations = [
        'CA, USA', 'NY, USA', 'TX, USA', 'WA, USA', 'IL, USA', 'FL, USA', 'MA, USA', 'CO, USA', 'OR, USA', 'NC, USA',
        'Karnataka, India', 'Maharashtra, India', 'Delhi, India', 'Tamil Nadu, India', 'Telangana, India', 'Gujarat, India',
        'Ontario, Canada', 'British Columbia, Canada', 'Quebec, Canada', 'Alberta, Canada',
        'England, UK', 'Scotland, UK', 'Germany', 'France', 'Australia', 'Singapore', 'Japan', 'UAE'
    ];
    
    const skillSets = [
        ['JavaScript', 'React', 'Node.js'],
        ['Python', 'Django', 'Machine Learning'],
        ['Java', 'Spring Boot', 'Microservices'],
        ['C++', 'System Design', 'Algorithms'],
        ['SQL', 'Data Analysis', 'Tableau'],
        ['AWS', 'Docker', 'Kubernetes'],
        ['Project Management', 'Agile', 'Scrum'],
        ['Marketing', 'SEO', 'Content Strategy'],
        ['Finance', 'Excel', 'Financial Modeling'],
        ['Design', 'Figma', 'User Research']
    ];
    
    const bioTemplates = [
        "Passionate about technology and innovation. Love solving complex problems and building scalable solutions.",
        "Experienced professional with a focus on data-driven decision making and continuous learning.",
        "Creative thinker with strong analytical skills. Enjoy collaborating with cross-functional teams.",
        "Results-oriented leader with expertise in product development and team management.",
        "Dedicated to creating user-centric designs and improving customer experiences.",
        "Enthusiastic about emerging technologies and their potential to transform industries.",
        "Strategic thinker with a background in business development and market analysis.",
        "Detail-oriented professional committed to delivering high-quality solutions.",
        "Innovative problem solver with experience in startup environments and rapid growth.",
        "Collaborative team player with strong communication and leadership skills."
    ];
    
    // Helper functions
    function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    function getRandomYear() {
        return Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010;
    }
    
    function generateEmail(firstName, lastName) {
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'];
        return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${getRandomElement(domains)}`;
    }
    
    function generateLinkedInUrl(firstName, lastName) {
        return `https://www.linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(Math.random() * 1000)}`;
    }
    
    // Generate dummy profiles
    const profiles = [];
    
    for (let i = 0; i < 100; i++) {
        const firstName = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);
        const fullName = `${firstName} ${lastName}`;
        const email = generateEmail(firstName, lastName);
        
        const profile = {
            id: `dummy-${i + 1}-${Date.now()}`, // Temporary ID for dummy data
            full_name: fullName,
            email: email,
            graduation_year: getRandomYear(),
            department: getRandomElement(departments),
            current_company: getRandomElement(companies),
            current_position: getRandomElement(positions),
            location: getRandomElement(locations),
            linkedin_url: generateLinkedInUrl(firstName, lastName),
            bio: getRandomElement(bioTemplates),
            skills: getRandomElement(skillSets).join(', '),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        profiles.push(profile);
    }
    
    console.log('📋 Generated 100 dummy profiles. Sample:', profiles[0]);
    
    // Insert profiles in batches of 10 to avoid overwhelming the database
    const batchSize = 10;
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < profiles.length; i += batchSize) {
        const batch = profiles.slice(i, i + batchSize);
        
        try {
            console.log(`📤 Inserting batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(profiles.length / batchSize)}...`);
            
            const { data, error } = await supabase
                .from('profiles')
                .insert(batch);
            
            if (error) {
                console.error('❌ Batch insert error:', error);
                errorCount += batch.length;
            } else {
                console.log(`✅ Successfully inserted batch of ${batch.length} profiles`);
                successCount += batch.length;
            }
            
            // Small delay between batches
            await new Promise(resolve => setTimeout(resolve, 100));
            
        } catch (err) {
            console.error('❌ Batch insert exception:', err);
            errorCount += batch.length;
        }
    }
    
    console.log('\n🎉 Dummy data insertion completed!');
    console.log(`✅ Successfully inserted: ${successCount} profiles`);
    console.log(`❌ Failed to insert: ${errorCount} profiles`);
    
    if (successCount > 0) {
        console.log('\n💡 You can now:');
        console.log('1. Refresh the dashboard to see updated stats');
        console.log('2. Browse the network section to see all profiles');
        console.log('3. Test search and filtering functionality');
    }
    
    return { successCount, errorCount, totalGenerated: profiles.length };
}

// Make function available globally
window.addDummyProfiles = addDummyProfiles;

console.log('📋 Dummy data script loaded!');
console.log('💡 To add 100 dummy profiles, run: addDummyProfiles()');
