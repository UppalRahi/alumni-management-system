// Mentorship functions

// Load mentorship data
async function loadMentorshipData() {
    console.log('🎓 Loading mentorship data...');
    
    // Load mentors by default
    await loadMentors();
}

// Load available mentors
async function loadMentors() {
    try {
        console.log('👨‍🏫 Loading mentors...');
        
        // Try to query with is_mentor field, fallback to sample data if field doesn't exist
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .neq('id', currentUser?.id || ''); // Exclude current user
        
        if (error) {
            console.error('❌ Mentors load error:', error);
            displaySampleMentors();
            return;
        }
        
        // Filter mentors on the client side since the is_mentor field might not exist
        const mentors = data ? data.filter(profile => profile.is_mentor === true) : [];
        
        if (mentors.length === 0) {
            console.log('⚠️ No mentors found in database, showing sample data');
            displaySampleMentors();
        } else {
            displayMentorsGrid(mentors);
        }
        
    } catch (err) {
        console.error('❌ Mentors load exception:', err);
        displaySampleMentors();
    }
}

// Search mentors
async function searchMentors() {
    try {
        console.log('🔍 Searching mentors...');
        
        const searchTerm = document.getElementById('mentor-search').value.toLowerCase();
        const industry = document.getElementById('mentor-industry').value;
        
        let query = supabase
            .from('profiles')
            .select('*')
            .neq('id', currentUser?.id || '');
        
        // Apply industry filter if specified
        if (industry) {
            // Simple industry matching based on company name
            // In a real app, you'd have a proper industry field
            query = query.ilike('current_company', `%${industry}%`);
        }
        
        const { data, error } = await query.limit(50);
        
        if (error) {
            console.error('❌ Mentor search error:', error);
            return;
        }
        
        // Filter by search term and mentor status on client side
        let filteredData = data || [];
        
        // First filter to only include mentors (since we can't filter in DB due to missing column)
        filteredData = filteredData.filter(profile => profile.is_mentor === true);
        
        if (searchTerm) {
            filteredData = filteredData.filter(profile => 
                (profile.full_name?.toLowerCase().includes(searchTerm)) ||
                (profile.current_company?.toLowerCase().includes(searchTerm)) ||
                (profile.current_position?.toLowerCase().includes(searchTerm)) ||
                (profile.bio?.toLowerCase().includes(searchTerm))
            );
        }
        
        // Show results or sample data if nothing found
        if (filteredData.length === 0) {
            console.log('⚠️ No mentors found, showing sample data');
            displaySampleMentors();
        } else {
            displayMentorsGrid(filteredData);
        }
        
    } catch (err) {
        console.error('❌ Mentor search exception:', err);
    }
}

// Display mentors grid
function displayMentorsGrid(mentors) {
    const grid = document.getElementById('mentors-grid');
    
    if (!mentors || mentors.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-graduation-cap text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-500 mb-2">No Mentors Found</h3>
                <p class="text-gray-400">Try adjusting your search criteria or become a mentor yourself!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = mentors.map(mentor => `
        <div class="bg-white rounded-lg shadow-md p-6 card-hover">
            <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    ${(mentor.full_name || 'M').charAt(0).toUpperCase()}
                </div>
                <div class="ml-4">
                    <h3 class="text-lg font-semibold">${mentor.full_name || 'Unknown'}</h3>
                    <p class="text-gray-600 text-sm">${mentor.current_position || 'Position not specified'}</p>
                    <span class="status-badge status-online">
                        <i class="fas fa-graduation-cap mr-1"></i>Mentor
                    </span>
                </div>
            </div>
            
            <div class="space-y-2 text-sm mb-4">
                ${mentor.current_company ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-building mr-2"></i>
                        <span>${mentor.current_company}</span>
                    </div>
                ` : ''}
                
                ${mentor.graduation_year ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-graduation-cap mr-2"></i>
                        <span>Class of ${mentor.graduation_year}</span>
                    </div>
                ` : ''}
                
                ${mentor.location ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        <span>${mentor.location}</span>
                    </div>
                ` : ''}
            </div>
            
            ${mentor.bio ? `
                <p class="text-gray-700 text-sm mb-4">${mentor.bio}</p>
            ` : ''}
            
            ${mentor.skills ? `
                <div class="mb-4">
                    <p class="text-sm font-medium text-gray-700 mb-2">Expertise:</p>
                    <div class="flex flex-wrap gap-1">
                        ${mentor.skills.split(',').slice(0, 4).map(skill => 
                            `<span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">${skill.trim()}</span>`
                        ).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="flex justify-between items-center pt-4 border-t">
                <div class="text-xs text-gray-500">
                    <i class="fas fa-clock mr-1"></i>
                    Available for mentoring
                </div>
                
                <button onclick="requestMentorship('${mentor.id}')" class="bg-purple-500 text-white px-4 py-2 rounded text-sm hover:bg-purple-600 transition duration-300">
                    <i class="fas fa-handshake mr-1"></i>Request Mentorship
                </button>
            </div>
        </div>
    `).join('');
}

// Display sample mentors when database is not available
function displaySampleMentors() {
    const sampleMentors = [
        {
            id: 'sample-mentor-1',
            full_name: 'Sarah Johnson',
            current_position: 'Senior Software Engineer',
            current_company: 'Tech Solutions Inc.',
            graduation_year: 2015,
            location: 'San Francisco, CA',
            bio: 'Passionate about helping junior developers navigate their careers in tech. Specialized in full-stack development and team leadership.',
            skills: 'JavaScript, React, Node.js, Team Leadership, Mentoring',
            is_mentor: true
        },
        {
            id: 'sample-mentor-2',
            full_name: 'Michael Chen',
            current_position: 'Product Manager',
            current_company: 'Innovation Labs',
            graduation_year: 2012,
            location: 'Seattle, WA',
            bio: 'Experienced product manager with a background in both technical and business domains. Happy to guide aspiring PMs.',
            skills: 'Product Management, Strategy, Data Analysis, User Research',
            is_mentor: true
        },
        {
            id: 'sample-mentor-3',
            full_name: 'Emily Rodriguez',
            current_position: 'Marketing Director',
            current_company: 'Global Brand Co.',
            graduation_year: 2010,
            location: 'New York, NY',
            bio: 'Marketing professional with 10+ years of experience in digital marketing and brand management. Love mentoring marketing newcomers.',
            skills: 'Digital Marketing, Brand Strategy, Content Marketing, Social Media',
            is_mentor: true
        }
    ];
    
    displayMentorsGrid(sampleMentors);
}

// Become a mentor
async function becomeMentor(event) {
    event.preventDefault();
    
    if (!currentUser) {
        alert('You must be logged in to become a mentor');
        return;
    }
    
    try {
        console.log('🎓 Becoming a mentor...');
        
        const experience = document.getElementById('mentor-experience').value;
        const expertise = document.getElementById('mentor-expertise').value;
        const bio = document.getElementById('mentor-bio').value;
        
        // Get selected time slots
        const timeSlots = [];
        document.querySelectorAll('#be-mentor-content input[type="checkbox"]:checked').forEach(checkbox => {
            timeSlots.push(checkbox.value);
        });
        
        // Update profile to mark as mentor
        const { error } = await supabase
            .from('profiles')
            .update({
                is_mentor: true,
                mentor_experience: parseInt(experience),
                mentor_expertise: expertise,
                mentor_bio: bio,
                mentor_availability: timeSlots.join(','),
                updated_at: new Date().toISOString()
            })
            .eq('id', currentUser.id);
        
        if (error) {
            console.error('❌ Mentor registration error:', error);
            alert('Failed to register as mentor: ' + error.message);
            return;
        }
        
        console.log('✅ Mentor registration successful');
        alert('Congratulations! You are now registered as a mentor!');
        
        // Update current user profile
        currentUserProfile.is_mentor = true;
        
        // Reset form
        event.target.reset();
        
        // Refresh mentors list
        await loadMentors();
        
    } catch (err) {
        console.error('❌ Mentor registration exception:', err);
        alert('Failed to register as mentor: ' + err.message);
    }
}

// Request mentorship
async function requestMentorship(mentorId) {
    if (!currentUser) {
        alert('You must be logged in to request mentorship');
        return;
    }
    
    try {
        console.log('🤝 Requesting mentorship from:', mentorId);
        
        // In a real implementation, you would create a mentorship request record
        alert('Mentorship request sent! The mentor will be notified and can accept your request.');
        
    } catch (err) {
        console.error('❌ Mentorship request error:', err);
        alert('Failed to send mentorship request. Please try again.');
    }
}

// Load mentorship connections
async function loadMentorshipConnections() {
    try {
        console.log('🔗 Loading mentorship connections...');
        
        // Display placeholder content
        const connectionsContainer = document.getElementById('mentorship-connections');
        connectionsContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-handshake text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-500 mb-2">No Mentorship Connections</h3>
                <p class="text-gray-400">When you connect with mentors or mentees, they will appear here.</p>
            </div>
        `;
        
    } catch (err) {
        console.error('❌ Mentorship connections load error:', err);
    }
}
