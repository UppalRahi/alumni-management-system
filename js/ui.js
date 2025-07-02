// Navigation and UI functions

// Show authentication section
function showAuthSection() {
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('navbar').classList.add('hidden');
    
    // Hide all main sections
    const sections = ['dashboard-section', 'profile-section', 'network-section', 'events-section', 'mentorship-section', 'analytics-section'];
    sections.forEach(sectionId => {
        document.getElementById(sectionId).classList.add('hidden');
    });
}

// Show main application
function showMainApp() {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('navbar').classList.remove('hidden');
    
    // Show dashboard by default
    showSection('dashboard');
}

// Show specific section
function showSection(sectionName) {
    console.log(`🔄 Switching to section: ${sectionName}`);
    
    // Cleanup dashboard charts if switching away from dashboard
    if (typeof cleanupDashboardCharts === 'function') {
        cleanupDashboardCharts();
    }
    
    // Hide all sections
    const sections = ['dashboard-section', 'profile-section', 'network-section', 'events-section', 'mentorship-section', 'analytics-section'];
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.classList.add('hidden');
        } else {
            console.warn(`⚠️ Section element not found: ${sectionId}`);
        }
    });
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.remove('hidden');
        console.log(`✅ Section shown: ${sectionName}`);
    } else {
        console.error(`❌ Target section not found: ${sectionName}-section`);
        return;
    }
    
    // Add active class to current nav item
    const currentNavItem = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (currentNavItem) {
        currentNavItem.classList.add('active');
    }
    
    // Load section-specific data with error handling
    try {
        switch(sectionName) {
            case 'dashboard':
                if (typeof loadDashboardData === 'function') {
                    loadDashboardData();
                } else {
                    console.warn('⚠️ loadDashboardData function not available');
                }
                break;
            case 'profile':
                // Ensure profile data is loaded when showing profile section
                if (currentUserProfile) {
                    // Add a small delay to ensure the profile component is fully loaded
                    setTimeout(() => {
                        console.log('🔄 Profile section loaded, updating UI...');
                        if (typeof initializeLocationDropdown === 'function') {
                            initializeLocationDropdown();
                        }
                        if (typeof updateProfileUI === 'function') {
                            updateProfileUI();
                        }
                    }, 100);
                } else {
                    console.log('ℹ️ No profile data available yet');
                }
                break;
            case 'network':
                if (typeof loadAlumniNetwork === 'function') {
                    loadAlumniNetwork();
                } else {
                    console.warn('⚠️ loadAlumniNetwork function not available');
                }
                break;
            case 'events':
                if (typeof loadEvents === 'function') {
                    loadEvents();
                } else {
                    console.warn('⚠️ loadEvents function not available');
                }
                break;
            case 'mentorship':
                if (typeof loadMentorshipData === 'function') {
                    loadMentorshipData();
                } else {
                    console.warn('⚠️ loadMentorshipData function not available');
                }
                break;
            case 'analytics':
                if (typeof loadAnalyticsData === 'function') {
                    loadAnalyticsData();
                } else {
                    console.warn('⚠️ loadAnalyticsData function not available');
                }
                break;
        }
    } catch (error) {
        console.error(`❌ Error loading section ${sectionName}:`, error);
    }
}

// Update profile function
async function updateProfile(event) {
    event.preventDefault();
    
    if (!currentUser) {
        console.error('❌ No current user found');
        alert('Error: User not authenticated');
        return;
    }
    
    // Show loading state
    const updateBtn = document.getElementById('update-profile-btn');
    const updateBtnText = document.getElementById('update-btn-text');
    const updateLoading = document.getElementById('update-loading');
    
    if (updateBtn) updateBtn.disabled = true;
    if (updateBtnText) updateBtnText.textContent = 'Updating...';
    if (updateLoading) updateLoading.classList.remove('hidden');
    
    try {
        console.log('💾 Updating profile for user:', currentUser.id);
        
        // Build profile data with only existing fields
        const profileData = {
            updated_at: new Date().toISOString()
        };
        
        // Required fields
        const nameField = document.getElementById('profile-name');
        const yearField = document.getElementById('profile-year');
        
        if (nameField && nameField.value.trim()) {
            profileData.full_name = nameField.value.trim();
        }
        
        if (yearField && yearField.value) {
            profileData.graduation_year = parseInt(yearField.value);
        }
        
        // Optional fields with correct mapping
        const fieldMappings = {
            'profile-department': 'department',
            'profile-company': 'current_company',
            'profile-position': 'current_position',
            'profile-location': 'location',  // This now gets value from hidden input
            'profile-linkedin': 'linkedin_url',
            'profile-bio': 'bio',
            'profile-skills': 'skills'
        };
        
        Object.entries(fieldMappings).forEach(([htmlId, dbField]) => {
            const element = document.getElementById(htmlId);
            if (element && element.value && element.value.trim()) {
                profileData[dbField] = element.value.trim();
            }
        });
        
        // Handle mentor checkbox separately (only if element exists)
        const mentorCheckbox = document.getElementById('profile-mentor');
        if (mentorCheckbox) {
            // Only include is_mentor if the column exists in the database
            // For now, we'll skip this field to avoid the schema error
            console.log('Mentor status:', mentorCheckbox.checked, '(field not updated due to schema)');
        }
        
        console.log('📋 Profile data to update:', profileData);
        
        // Sanitize profile data to prevent schema errors
        const sanitizedData = sanitizeProfileData(profileData);
        console.log('🔍 Sanitized data:', sanitizedData);
        
        const { data, error } = await supabase
            .from('profiles')
            .update(sanitizedData)
            .eq('id', currentUser.id)
            .select();
        
        if (error) {
            console.error('❌ Database update error:', error);
            handleDatabaseError(error, 'Profile update');
            return;
        }
        
        console.log('✅ Profile updated successfully:', data);
        
        // Always reload the profile from the database to ensure we have the latest data
        console.log('🔄 Reloading profile from database to ensure UI consistency...');
        await loadUserProfile();
        
        // Show a more detailed success message
        const updatedFields = Object.keys(sanitizedData).filter(key => key !== 'updated_at');
        alert(`Profile updated successfully!\n\nUpdated fields: ${updatedFields.join(', ')}`);
        
        console.log('✅ Profile update workflow completed');
        
    } catch (err) {
        console.error('❌ Profile update exception:', err);
        alert('Profile update failed: ' + err.message);
    } finally {
        // Reset loading state
        const updateBtn = document.getElementById('update-profile-btn');
        const updateBtnText = document.getElementById('update-btn-text');
        const updateLoading = document.getElementById('update-loading');
        
        if (updateBtn) updateBtn.disabled = false;
        if (updateBtnText) updateBtnText.textContent = 'Update Profile';
        if (updateLoading) updateLoading.classList.add('hidden');
    }
}

// Show/hide event creation modal
function showCreateEventModal() {
    document.getElementById('event-modal').classList.remove('hidden');
}

function hideCreateEventModal() {
    document.getElementById('event-modal').classList.add('hidden');
    // Reset form
    document.querySelector('#event-modal form').reset();
}

// Mentorship tab navigation
function showMentorshipTab(tabName) {
    // Hide all tab contents
    const tabContents = ['find-mentors-content', 'be-mentor-content', 'my-connections-content'];
    tabContents.forEach(contentId => {
        document.getElementById(contentId).classList.add('hidden');
    });
    
    // Remove active class from all tabs
    const tabs = ['find-mentors-tab', 'be-mentor-tab', 'my-connections-tab'];
    tabs.forEach(tabId => {
        const tab = document.getElementById(tabId);
        tab.classList.remove('bg-blue-500', 'text-white');
        tab.classList.add('bg-gray-300', 'text-gray-700');
    });
    
    // Show selected tab content
    document.getElementById(tabName + '-content').classList.remove('hidden');
    
    // Add active class to selected tab
    const activeTab = document.getElementById(tabName + '-tab');
    activeTab.classList.remove('bg-gray-300', 'text-gray-700');
    activeTab.classList.add('bg-blue-500', 'text-white');
    
    // Load tab-specific data
    switch(tabName) {
        case 'find-mentors':
            loadMentors();
            break;
        case 'my-connections':
            loadMentorshipConnections();
            break;
    }
}

// Debug function to check current state
function debugProfileState() {
    console.log('🔍 Debug Profile State:');
    console.log('Current User:', currentUser);
    console.log('Current User Profile:', currentUserProfile);
    
    // Check form values
    const formData = {
        'profile-name': document.getElementById('profile-name')?.value,
        'profile-year': document.getElementById('profile-year')?.value,
        'profile-department': document.getElementById('profile-department')?.value,
        'profile-company': document.getElementById('profile-company')?.value,
        'profile-position': document.getElementById('profile-position')?.value,
        'profile-state': document.getElementById('profile-state')?.value,
        'profile-location': document.getElementById('profile-location')?.value,
        'profile-location-custom': document.getElementById('profile-location-custom')?.value,
        'profile-linkedin': document.getElementById('profile-linkedin')?.value,
        'profile-bio': document.getElementById('profile-bio')?.value,
        'profile-skills': document.getElementById('profile-skills')?.value
    };
    console.log('Form Data:', formData);
    
    return { currentUser, currentUserProfile, formData };
}

// Test function to manually update profile UI
function testUpdateProfileUI() {
    console.log('🧪 Testing updateProfileUI function...');
    updateProfileUI();
}

// Debug function to check what's in the database
async function debugDatabaseProfile() {
    if (!currentUser) {
        console.error('❌ No current user to check database for');
        return;
    }
    
    try {
        console.log('🔍 Checking database profile for user:', currentUser.id);
        
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();
        
        if (error) {
            console.error('❌ Database profile check error:', error);
        } else {
            console.log('📋 Database profile data:', data);
        }
        
        return data;
    } catch (err) {
        console.error('❌ Database profile check exception:', err);
    }
}

// Test full profile update workflow
async function testProfileUpdate() {
    console.log('🧪 Testing full profile update workflow...');
    
    // 1. Check current state
    console.log('1️⃣ Current state:');
    debugProfileState();
    
    // 2. Check database state
    console.log('2️⃣ Database state:');
    await debugDatabaseProfile();
    
    // 3. Test UI update
    console.log('3️⃣ Testing UI update:');
    testUpdateProfileUI();
    
    // 4. Show profile section
    console.log('4️⃣ Showing profile section:');
    showSection('profile');
    
    console.log('✅ Test completed. Check console output above.');
}

// Comprehensive test that simulates a profile update
async function simulateProfileUpdate() {
    console.log('🧪 Starting comprehensive profile update test...');
    
    if (!currentUser) {
        console.error('❌ Please log in first');
        return;
    }
    
    // 1. Navigate to profile section
    console.log('1️⃣ Navigating to profile section...');
    showSection('profile');
    
    // Wait for components to load
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // 2. Check current state
    console.log('2️⃣ Checking current state...');
    const currentState = debugProfileState();
    
    // 3. Make a test change
    console.log('3️⃣ Making test change to company field...');
    const companyField = document.getElementById('profile-company');
    if (companyField) {
        const oldValue = companyField.value;
        companyField.value = `Test Company ${Date.now()}`;
        console.log(`Changed company from "${oldValue}" to "${companyField.value}"`);
    }
    
    // 4. Trigger update
    console.log('4️⃣ Triggering profile update...');
    const form = document.querySelector('form[onsubmit*="updateProfile"]');
    if (form) {
        const event = new Event('submit');
        form.dispatchEvent(event);
    } else {
        console.error('❌ Profile form not found');
    }
    
    console.log('✅ Test completed. Check the results above.');
}

// Make debug functions available globally for testing
window.debugProfileState = debugProfileState;
window.testUpdateProfileUI = testUpdateProfileUI;
window.debugDatabaseProfile = debugDatabaseProfile;
window.testProfileUpdate = testProfileUpdate;
window.simulateProfileUpdate = simulateProfileUpdate;

// Database field validation helper
function sanitizeProfileData(profileData) {
    // List of known/safe fields for the profiles table
    const allowedFields = [
        'full_name',
        'email', 
        'graduation_year',
        'department',
        'current_company',
        'current_position', 
        'location',
        'linkedin_url',
        'bio',
        'skills',
        'created_at',
        'updated_at'
        // Note: 'is_mentor' is excluded until it's added to the database schema
    ];
    
    const sanitizedData = {};
    
    Object.entries(profileData).forEach(([key, value]) => {
        if (allowedFields.includes(key)) {
            sanitizedData[key] = value;
        } else {
            console.warn(`⚠️ Skipping unknown field: ${key}`);
        }
    });
    
    return sanitizedData;
}

// Enhanced error handling for database operations
function handleDatabaseError(error, operation = 'database operation') {
    console.error(`❌ ${operation} error:`, error);
    
    // Handle specific error types
    if (error.message.includes('column') && error.message.includes('schema cache')) {
        const columnMatch = error.message.match(/'([^']+)' column/);
        const columnName = columnMatch ? columnMatch[1] : 'unknown';
        
        alert(`⚠️ Database Schema Issue\n\n` +
              `The column '${columnName}' is missing from your database.\n\n` +
              `To fix this, run the following SQL in your Supabase dashboard:\n\n` +
              `ALTER TABLE profiles ADD COLUMN ${columnName} BOOLEAN DEFAULT false;\n\n` +
              `For now, this field will be skipped during updates.`);
        return;
    }
    
    if (error.code === '42501') {
        alert(`⚠️ Permission Error\n\nInsufficient permissions for ${operation}.\nPlease check your Row Level Security (RLS) policies.`);
        return;
    }
    
    // Generic error
    alert(`${operation} failed: ${error.message}`);
}

// Initialize application - this is now handled by initializeApp() in auth.js
// Keeping this commented out to avoid conflicts
/*
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 Alumni Network Platform initializing...');
    
    // Load page components first
    await initializeComponents();
    
    // Check authentication status
    checkAuthStatus();
    
    // Set up auth state change listener
    supabase.auth.onAuthStateChange((event, session) => {
        console.log('🔄 Auth state changed:', event, session);
        
        if (event === 'SIGNED_IN' && session) {
            currentUser = session.user;
            loadUserProfile().then(() => {
                showMainApp();
            });
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            currentUserProfile = null;
            showAuthSection();
        }
    });
    
    // Close modal when clicking outside
    document.getElementById('event-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideCreateEventModal();
        }
    });
    
    // Initialize location dropdown handling
    initializeLocationDropdown();
});
*/

// Initialize UI-specific functionality when needed
function initializeUIComponents() {
    // Close modal when clicking outside
    const eventModal = document.getElementById('event-modal');
    if (eventModal) {
        eventModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hideCreateEventModal();
            }
        });
    }
    
    // Initialize location dropdown handling
    initializeLocationDropdown();
}

// Location dropdown handling
function initializeLocationDropdown() {
    const stateSelect = document.getElementById('profile-state');
    const customInput = document.getElementById('profile-location-custom');
    const hiddenLocationInput = document.getElementById('profile-location');
    
    if (stateSelect && customInput && hiddenLocationInput) {
        stateSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                customInput.classList.remove('hidden');
                customInput.focus();
                customInput.addEventListener('input', function() {
                    hiddenLocationInput.value = this.value;
                });
            } else {
                customInput.classList.add('hidden');
                hiddenLocationInput.value = this.value;
            }
        });
        
        // Initialize with current value if any
        if (hiddenLocationInput.value) {
            const currentLocation = hiddenLocationInput.value;
            const option = Array.from(stateSelect.options).find(opt => opt.value === currentLocation);
            
            if (option) {
                stateSelect.value = currentLocation;
            } else {
                stateSelect.value = 'Other';
                customInput.classList.remove('hidden');
                customInput.value = currentLocation;
            }
        }
    }
}
