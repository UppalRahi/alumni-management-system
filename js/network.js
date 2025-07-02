// Alumni Network functions

// Load alumni network
async function loadAlumniNetwork() {
    console.log('👥 Loading alumni network...');
    
    try {
        await loadAlumniFilters();
        await searchAlumni();
    } catch (err) {
        console.error('❌ Network load error:', err);
    }
}

// Load filter options
async function loadAlumniFilters() {
    try {
        // Load graduation years for filter
        const { data: yearData, error: yearError } = await supabase
            .from('profiles')
            .select('graduation_year')
            .not('graduation_year', 'is', null);
        
        if (!yearError && yearData) {
            const years = [...new Set(yearData.map(p => p.graduation_year))].sort();
            const yearSelect = document.getElementById('filter-year');
            if (yearSelect) {
                yearSelect.innerHTML = '<option value="">All Years</option>';
                years.forEach(year => {
                    yearSelect.innerHTML += `<option value="${year}">${year}</option>`;
                });
                console.log(`✅ Loaded ${years.length} graduation years for filter`);
            } else {
                console.warn('⚠️ Year filter element not found');
            }
        }
        
        // Load departments for filter
        const { data: deptData, error: deptError } = await supabase
            .from('profiles')
            .select('department')
            .not('department', 'is', null);
        
        if (!deptError && deptData) {
            const departments = [...new Set(deptData.map(p => p.department).filter(d => d))].sort();
            const deptSelect = document.getElementById('filter-department');
            if (deptSelect) {
                deptSelect.innerHTML = '<option value="">All Departments</option>';
                departments.forEach(dept => {
                    deptSelect.innerHTML += `<option value="${dept}">${dept}</option>`;
                });
                console.log(`✅ Loaded ${departments.length} departments for filter`);
            } else {
                console.warn('⚠️ Department filter element not found');
            }
        }
        
    } catch (err) {
        console.error('❌ Filter load error:', err);
    }
}

// Search alumni function
async function searchAlumni() {
    try {
        console.log('🔍 Searching alumni...');
        
        const searchTerm = document.getElementById('search-alumni').value.toLowerCase();
        const filterYear = document.getElementById('filter-year').value;
        const filterDept = document.getElementById('filter-department').value;
        
        let query = supabase
            .from('profiles')
            .select('*')
            .neq('id', currentUser?.id || ''); // Exclude current user
        
        // Apply filters
        if (filterYear) {
            query = query.eq('graduation_year', filterYear);
        }
        
        if (filterDept) {
            query = query.eq('department', filterDept);
        }
        
        const { data, error } = await query.limit(50);
        
        if (error) {
            console.error('❌ Alumni search error:', error);
            return;
        }
        
        // Filter by search term on client side
        let filteredData = data || [];
        if (searchTerm) {
            filteredData = filteredData.filter(profile => 
                (profile.full_name?.toLowerCase().includes(searchTerm)) ||
                (profile.current_company?.toLowerCase().includes(searchTerm)) ||
                (profile.current_position?.toLowerCase().includes(searchTerm)) ||
                (profile.location?.toLowerCase().includes(searchTerm))
            );
        }
        
        displayAlumniGrid(filteredData);
        
    } catch (err) {
        console.error('❌ Alumni search exception:', err);
    }
}

// Display alumni in grid format
function displayAlumniGrid(alumni) {
    const grid = document.getElementById('alumni-grid');
    
    if (!alumni || alumni.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-users text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-500 mb-2">No Alumni Found</h3>
                <p class="text-gray-400">Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = alumni.map(profile => `
        <div class="bg-white rounded-lg shadow-md p-6 card-hover">
            <div class="flex items-center mb-4">
                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    ${(profile.full_name || 'U').charAt(0).toUpperCase()}
                </div>
                <div class="ml-4">
                    <h3 class="text-lg font-semibold">${profile.full_name || 'Unknown'}</h3>
                    <p class="text-gray-600 text-sm">${profile.current_position || 'Position not specified'}</p>
                </div>
            </div>
            
            <div class="space-y-2 text-sm">
                ${profile.current_company ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-building mr-2"></i>
                        <span>${profile.current_company}</span>
                    </div>
                ` : ''}
                
                ${profile.graduation_year ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-graduation-cap mr-2"></i>
                        <span>Class of ${profile.graduation_year}</span>
                    </div>
                ` : ''}
                
                ${profile.location ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-map-marker-alt mr-2"></i>
                        <span>${profile.location}</span>
                    </div>
                ` : ''}
                
                ${profile.department ? `
                    <div class="flex items-center text-gray-600">
                        <i class="fas fa-university mr-2"></i>
                        <span>${profile.department}</span>
                    </div>
                ` : ''}
            </div>
            
            ${profile.bio ? `
                <p class="text-gray-700 text-sm mt-3 line-clamp-3">${profile.bio}</p>
            ` : ''}
            
            ${profile.skills ? `
                <div class="mt-3">
                    <div class="flex flex-wrap gap-1">
                        ${profile.skills.split(',').slice(0, 3).map(skill => 
                            `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${skill.trim()}</span>`
                        ).join('')}
                        ${profile.skills.split(',').length > 3 ? `<span class="text-xs text-gray-500">+${profile.skills.split(',').length - 3} more</span>` : ''}
                    </div>
                </div>
            ` : ''}
            
            <div class="flex justify-between items-center mt-4 pt-4 border-t">
                <div class="flex space-x-2">
                    ${profile.linkedin_url ? `
                        <a href="${profile.linkedin_url}" target="_blank" class="text-blue-600 hover:text-blue-800">
                            <i class="fab fa-linkedin text-lg"></i>
                        </a>
                    ` : ''}
                    ${profile.is_mentor === true ? `
                        <span class="status-badge status-online">
                            <i class="fas fa-graduation-cap mr-1"></i>Mentor
                        </span>
                    ` : ''}
                </div>
                
                <button onclick="connectWithAlumni('${profile.id}')" class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition duration-300">
                    Connect
                </button>
            </div>
        </div>
    `).join('');
}

// Connect with an alumni
async function connectWithAlumni(alumniId) {
    try {
        console.log('🤝 Connecting with alumni:', alumniId);
        
        // In a real implementation, you would create a connection record
        // For now, just show a success message
        alert('Connection request sent! They will be notified.');
        
    } catch (err) {
        console.error('❌ Connection error:', err);
        alert('Failed to send connection request. Please try again.');
    }
}
