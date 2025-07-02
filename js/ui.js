// Navigation and UI functions

// Show authentication section with animations
function showAuthSection() {
    console.log('🎨 Showing auth section with animations...');
    
    const authSection = document.getElementById('auth-section');
    const navbar = document.getElementById('navbar');
    
    // Animate out navbar
    if (navbar) {
        navbar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            navbar.classList.add('hidden');
        }, 300);
    }
    
    // Hide all main sections with animation
    const sections = ['dashboard-section', 'profile-section', 'network-section', 'events-section', 'mentorship-section', 'analytics-section'];
    sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId);
        if (element && !element.classList.contains('hidden')) {
            element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            element.style.opacity = '0';
            element.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                element.classList.add('hidden');
            }, 300);
        }
    });
    
    // Animate in auth section
    if (authSection) {
        setTimeout(() => {
            authSection.classList.remove('hidden');
            authSection.style.opacity = '0';
            authSection.style.transform = 'scale(0.95)';
            authSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                authSection.style.opacity = '1';
                authSection.style.transform = 'scale(1)';
                
                // Add floating animation to auth card
                const authCard = authSection.querySelector('.bg-white');
                if (authCard) {
                    AnimationUtils.addFloatingAnimation(authCard, 4000);
                }
            }, 100);
        }, 400);
    }
}

// Show main application with enhanced animations
function showMainApp() {
    console.log('🎨 Showing main app with animations...');
    
    const authSection = document.getElementById('auth-section');
    const navbar = document.getElementById('navbar');
    
    // Animate out auth section
    if (authSection) {
        authSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        authSection.style.opacity = '0';
        authSection.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            authSection.classList.add('hidden');
        }, 500);
    }
    
    // Animate in navbar
    if (navbar) {
        navbar.classList.remove('hidden');
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-20px)';
        navbar.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            navbar.style.opacity = '1';
            navbar.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Show dashboard with delay for smooth transition
    setTimeout(() => {
        showSection('dashboard');
        
        // Initialize all page animations
        setTimeout(() => {
            initializePageAnimations();
            enhanceFormInteractions();
            
            // Add welcome animation
            AnimationUtils.showToast('Welcome to AlumniNet! 🎉', 'success', 4000);
        }, 800);
    }, 600);
}

// Show specific section with enhanced animations
function showSection(sectionName) {
    console.log(`🔄 Switching to section: ${sectionName}`);
    
    // Cleanup dashboard charts if switching away from dashboard
    if (typeof cleanupDashboardCharts === 'function') {
        cleanupDashboardCharts();
    }
    
    // Find current active section
    const sections = ['dashboard-section', 'profile-section', 'network-section', 'events-section', 'mentorship-section', 'analytics-section'];
    let currentSection = null;
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element && !element.classList.contains('hidden')) {
            currentSection = element;
        }
    });
    
    // Get target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (!targetSection) {
        console.error(`❌ Target section not found: ${sectionName}-section`);
        return;
    }
    
    // Remove active class from all nav items with animation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.style.transition = 'all 0.3s ease';
        item.classList.remove('active');
    });
    
    // Add active class to current nav item with animation
    const currentNavItem = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (currentNavItem) {
        setTimeout(() => {
            currentNavItem.classList.add('active');
            // Add a subtle scale animation
            currentNavItem.style.transform = 'scale(1.05)';
            setTimeout(() => {
                currentNavItem.style.transform = '';
            }, 200);
        }, 150);
    }
    
    // Show enhanced toast notification for section change
    const sectionNames = {
        'dashboard': '📊 Dashboard',
        'profile': '👤 Profile',
        'network': '🌐 Network',
        'events': '📅 Events',
        'mentorship': '🎓 Mentorship',
        'analytics': '📈 Analytics'
    };
    
    // Add particle effect to the nav item being clicked
    if (currentNavItem) {
        AnimationUtils.createParticleExplosion(currentNavItem, 10);
        AnimationUtils.elasticBounce(currentNavItem, 1.1);
    }
    
    AnimationUtils.showToast(`✨ ${sectionNames[sectionName] || sectionName}`, 'info', 2500);
    
    // Choose a random transition effect for variety
    const transitionEffects = ['slide', 'fade', 'scale', 'flip'];
    const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
    
    // Use enhanced transition with random effect
    PageTransitionManager.transitionToSection(currentSection, targetSection, () => {
        // Load section-specific data with enhanced animations
        try {
            switch(sectionName) {
                case 'dashboard':
                    if (typeof loadDashboardData === 'function') {
                        // Show loading skeleton first
                        const dashboardContainer = targetSection.querySelector('.dashboard-content');
                        if (dashboardContainer) {
                            AnimationUtils.showSkeleton(dashboardContainer, 4);
                        }
                        
                        setTimeout(() => {
                            loadDashboardData();
                            // Add stagger animation to dashboard cards
                            setTimeout(() => {
                                const cards = targetSection.querySelectorAll('.card-hover');
                                AnimationUtils.staggerAnimation(Array.from(cards), 200);
                            }, 500);
                        }, 800);
                    } else {
                        console.warn('⚠️ loadDashboardData function not available');
                    }
                    break;
                    
                case 'profile':
                    // Ensure profile data is loaded when showing profile section
                    if (currentUserProfile) {
                        setTimeout(() => {
                            console.log('🔄 Profile section loaded, updating UI...');
                            if (typeof initializeLocationDropdown === 'function') {
                                initializeLocationDropdown();
                            }
                            if (typeof updateProfileUI === 'function') {
                                updateProfileUI();
                            }
                            
                            // Add animations to profile elements
                            const profileElements = targetSection.querySelectorAll('.profile-element');
                            AnimationUtils.staggerAnimation(Array.from(profileElements), 150);
                        }, 300);
                    } else {
                        console.log('ℹ️ No profile data available yet');
                    }
                    break;
                    
                case 'network':
                    if (typeof loadAlumniNetwork === 'function') {
                        // Show loading skeleton
                        const networkContainer = targetSection.querySelector('.network-content');
                        if (networkContainer) {
                            AnimationUtils.showSkeleton(networkContainer, 6);
                        }
                        
                        setTimeout(() => {
                            loadAlumniNetwork();
                            // Add network-specific animations
                            setTimeout(() => {
                                const networkCards = targetSection.querySelectorAll('.alumni-card');
                                AnimationUtils.staggerAnimation(Array.from(networkCards), 100);
                            }, 600);
                        }, 1000);
                    } else {
                        console.warn('⚠️ loadAlumniNetwork function not available');
                    }
                    break;
                    
                case 'events':
                    if (typeof loadEvents === 'function') {
                        loadEvents();
                        // Add event-specific animations
                        setTimeout(() => {
                            const eventCards = targetSection.querySelectorAll('.event-card');
                            AnimationUtils.staggerAnimation(Array.from(eventCards), 120);
                        }, 400);
                    } else {
                        console.warn('⚠️ loadEvents function not available');
                    }
                    break;
                    
                case 'mentorship':
                    if (typeof loadMentorshipData === 'function') {
                        loadMentorshipData();
                        // Add mentorship-specific animations
                        setTimeout(() => {
                            const mentorCards = targetSection.querySelectorAll('.mentor-card');
                            AnimationUtils.staggerAnimation(Array.from(mentorCards), 140);
                        }, 500);
                    } else {
                        console.warn('⚠️ loadMentorshipData function not available');
                    }
                    break;
                    
                case 'analytics':
                    if (typeof loadAnalyticsData === 'function') {
                        loadAnalyticsData();
                        // Add chart animation effects
                        setTimeout(() => {
                            const charts = targetSection.querySelectorAll('.chart-container');
                            charts.forEach((chart, index) => {
                                chart.style.opacity = '0';
                                chart.style.transform = 'scale(0.8)';
                                chart.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                                
                                setTimeout(() => {
                                    chart.style.opacity = '1';
                                    chart.style.transform = 'scale(1)';
                                }, index * 200);
                            });
                        }, 600);
                    } else {
                        console.warn('⚠️ loadAnalyticsData function not available');
                    }
                    break;
            }
        } catch (error) {
            console.error(`❌ Error loading section ${sectionName}:`, error);
            AnimationUtils.showToast(`Error loading ${sectionName} section`, 'error');
        }
        
        // Re-initialize animations for the new section
        setTimeout(() => {
            initializePageAnimations();
            enhanceFormInteractions();
        }, 800);
    });
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
    console.log('🎨 Initializing UI components with animations...');
    
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
    
    // Add scroll indicator
    addScrollIndicator();
    
    // Initialize page animations
    initializePageAnimations();
    
    // Enhance form interactions
    enhanceFormInteractions();
    
    // Add click animations to all interactive elements
    document.querySelectorAll('[onclick], button, .btn, .interactive').forEach(element => {
        element.addEventListener('click', function(e) {
            // Add a subtle scale animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Add scroll progress indicator
function addScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = `${scrolled}%`;
    });
}

// Enhanced loading states
function showLoadingState(element, text = 'Loading...') {
    if (!element) return;
    
    const originalContent = element.innerHTML;
    element.dataset.originalContent = originalContent;
    
    element.innerHTML = `
        <div class="flex items-center justify-center space-x-2">
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span>${text}</span>
        </div>
    `;
    
    element.style.pointerEvents = 'none';
    element.style.opacity = '0.7';
}

function hideLoadingState(element) {
    if (!element || !element.dataset.originalContent) return;
    
    element.innerHTML = element.dataset.originalContent;
    element.style.pointerEvents = '';
    element.style.opacity = '';
    delete element.dataset.originalContent;
}

// Particle effect for special interactions
function createParticleEffect(x, y, color = '#3B82F6') {
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${vx}px, ${vy}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    }
}

// Add particle effects to special buttons
function addParticleEffectsToButtons() {
    document.querySelectorAll('.btn-primary, .btn-success').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            createParticleEffect(x, y);
        });
    });
}

// Magnetic effect for buttons
function addMagneticEffect(element) {
    element.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
            this.style.transition = '';
        }, 300);
    });
}

// ===== ADVANCED NAVIGATION & INTERACTION ANIMATIONS =====

// Enhanced page transition manager
const PageTransitionManager = {
    isTransitioning: false,
    
    // Advanced section transition with multiple effects
    transitionToSection(fromElement, toElement, callback, transitionType = 'slide') {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        const transitions = {
            slide: this.slideTransition,
            fade: this.fadeTransition,
            scale: this.scaleTransition,
            flip: this.flipTransition,
            morph: this.morphTransition
        };
        
        const transition = transitions[transitionType] || transitions.slide;
        transition.call(this, fromElement, toElement, () => {
            this.isTransitioning = false;
            if (callback) callback();
        });
    },
    
    slideTransition(fromElement, toElement, callback) {
        if (fromElement) {
            fromElement.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease';
            fromElement.style.transform = 'translateX(-100%) scale(0.95)';
            fromElement.style.opacity = '0';
            
            setTimeout(() => {
                fromElement.classList.add('hidden');
                this.showElement(toElement, 'translateX(100%)', callback);
            }, 500);
        } else {
            this.showElement(toElement, 'translateY(50px)', callback);
        }
    },
    
    fadeTransition(fromElement, toElement, callback) {
        if (fromElement) {
            fromElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            fromElement.style.opacity = '0';
            fromElement.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                fromElement.classList.add('hidden');
                this.showElement(toElement, 'scale(0.9)', callback);
            }, 400);
        } else {
            this.showElement(toElement, 'scale(0.9)', callback);
        }
    },
    
    scaleTransition(fromElement, toElement, callback) {
        if (fromElement) {
            fromElement.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.6s ease';
            fromElement.style.transform = 'scale(0) rotate(180deg)';
            fromElement.style.opacity = '0';
            
            setTimeout(() => {
                fromElement.classList.add('hidden');
                this.showElement(toElement, 'scale(1.2) rotate(-180deg)', callback);
            }, 600);
        } else {
            this.showElement(toElement, 'scale(1.2)', callback);
        }
    },
    
    flipTransition(fromElement, toElement, callback) {
        if (fromElement) {
            fromElement.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            fromElement.style.transform = 'rotateY(90deg) scale(0.8)';
            
            setTimeout(() => {
                fromElement.classList.add('hidden');
                this.showElement(toElement, 'rotateY(-90deg) scale(0.8)', callback);
            }, 400);
        } else {
            this.showElement(toElement, 'rotateY(-90deg)', callback);
        }
    },
    
    morphTransition(fromElement, toElement, callback) {
        if (fromElement) {
            fromElement.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            fromElement.style.transform = 'scale(0.3) rotate(45deg)';
            fromElement.style.opacity = '0';
            fromElement.style.borderRadius = '50%';
            
            setTimeout(() => {
                fromElement.classList.add('hidden');
                this.showElement(toElement, 'scale(1.3) rotate(-45deg)', callback);
            }, 700);
        } else {
            this.showElement(toElement, 'scale(1.3)', callback);
        }
    },
    
    showElement(element, initialTransform, callback) {
        if (!element) return;
        
        element.classList.remove('hidden');
        element.style.opacity = '0';
        element.style.transform = initialTransform;
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0) scale(1) rotate(0deg)';
            element.style.borderRadius = '';
            
            setTimeout(() => {
                if (callback) callback();
            }, 600);
        }, 50);
    }
};

// Enhanced magnetic button effects
const MagneticEffect = {
    init() {
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.addMagneticElements();
    },
    
    addMagneticElements() {
        document.querySelectorAll('button, .nav-item, .card-hover').forEach(element => {
            element.classList.add('btn-magnetic');
            element.addEventListener('mouseenter', this.onElementEnter.bind(this));
            element.addEventListener('mouseleave', this.onElementLeave.bind(this));
        });
    },
    
    handleMouseMove(e) {
        document.querySelectorAll('.btn-magnetic:hover').forEach(element => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            const moveX = x * strength;
            const moveY = y * strength;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
    },
    
    onElementEnter(e) {
        e.target.style.transition = 'transform 0.1s ease-out';
    },
    
    onElementLeave(e) {
        e.target.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        e.target.style.transform = 'translate(0px, 0px) scale(1)';
    }
};

// Advanced scroll animations
const ScrollAnimations = {
    init() {
        this.createScrollIndicator();
        this.initParallaxElements();
        this.initRevealAnimations();
        window.addEventListener('scroll', this.handleScroll.bind(this));
    },
    
    createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'scroll-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
    },
    
    handleScroll() {
        // Update scroll indicator
        const indicator = document.getElementById('scroll-indicator');
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (indicator) {
            indicator.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
        
        // Handle parallax
        this.updateParallax();
        
        // Handle reveal animations
        this.checkRevealElements();
    },
    
    initParallaxElements() {
        document.querySelectorAll('.parallax-element').forEach(element => {
            element.dataset.speed = element.dataset.speed || '0.5';
        });
    },
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.parallax-element').forEach(element => {
            const speed = parseFloat(element.dataset.speed);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    },
    
    initRevealAnimations() {
        document.querySelectorAll('.section-reveal, .list-item-slide').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = element.classList.contains('list-item-slide') 
                ? 'translateX(-30px)' 
                : 'translateY(40px)';
        });
    },
    
    checkRevealElements() {
        const elements = document.querySelectorAll('.section-reveal:not(.visible), .list-item-slide:not(.visible)');
        elements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    },
    
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight * 0.8 &&
            rect.bottom > 0
        );
    }
};

// Enhanced interaction feedback
const InteractionFeedback = {
    init() {
        this.addHoverSounds();
        this.addClickEffects();
        this.addFocusEffects();
    },
    
    addHoverSounds() {
        // Create audio context for interaction sounds (optional)
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            this.audioContext = new (AudioContext || webkitAudioContext)();
        }
    },
    
    addClickEffects() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, .nav-item')) {
                this.createClickRipple(e);
                this.addClickScale(e.target);
            }
        });
    },
    
    createClickRipple(e) {
        const ripple = document.createElement('div');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    },
    
    addClickScale(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.transition = 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        }, 100);
    },
    
    addFocusEffects() {
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('input, textarea, button, select')) {
                e.target.classList.add('focus-ring');
            }
        });
        
        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-ring');
        });
    }
};

// Enhanced loading states manager
const LoadingManager = {
    show(element, type = 'dots') {
        const loaders = {
            dots: this.createDotsLoader(),
            spinner: this.createSpinnerLoader(),
            skeleton: this.createSkeletonLoader(),
            progress: this.createProgressLoader()
        };
        
        const loader = loaders[type] || loaders.dots;
        element.innerHTML = '';
        element.appendChild(loader);
        element.classList.add('loading-state');
    },
    
    hide(element, callback) {
        const loader = element.querySelector('.loader');
        if (loader) {
            loader.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            loader.style.opacity = '0';
            loader.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                element.classList.remove('loading-state');
                if (callback) callback();
            }, 300);
        }
    },
    
    createDotsLoader() {
        const loader = document.createElement('div');
        loader.className = 'loading-dots loader';
        loader.innerHTML = '<div></div><div></div><div></div><div></div>';
        return loader;
    },
    
    createSpinnerLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>';
        return loader;
    },
    
    createSkeletonLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        `;
        return loader;
    },
    
    createProgressLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full loading-progress" style="width: 0%"></div>
            </div>
        `;
        
        // Animate progress
        const progress = loader.querySelector('.loading-progress');
        let width = 0;
        const interval = setInterval(() => {
            width += Math.random() * 10;
            if (width >= 90) {
                clearInterval(interval);
                width = 90;
            }
            progress.style.width = width + '%';
        }, 200);
        
        return loader;
    }
};

// ===== ENHANCED ANIMATION UTILS ADDITIONS =====
// Animation utilities
const AnimationUtils = {
    // Smooth section transitions
    transitionToSection(fromElement, toElement, callback) {
        fromElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        fromElement.style.opacity = '0';
        fromElement.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            fromElement.classList.add('hidden');
            if (toElement) {
                toElement.classList.remove('hidden');
                toElement.style.opacity = '0';
                toElement.style.transform = 'translateX(30px)';
                toElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                setTimeout(() => {
                    toElement.style.opacity = '1';
                    toElement.style.transform = 'translateX(0)';
                    if (callback) callback();
                }, 50);
            }
        }, 300);
    },

    // Enhanced section transition with multiple effect types
    transitionToSectionAdvanced(fromElement, toElement, callback, effect = 'slide') {
        return PageTransitionManager.transitionToSection(fromElement, toElement, callback, effect);
    },

    // Stagger animation for lists
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * delay);
        });
    },

    // Magnetic cursor effect for elements
    addMagneticEffect(element, strength = 0.3) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * strength;
            const moveY = y * strength;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            element.style.transition = 'transform 0.1s ease-out';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
            element.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    },

    // Advanced stagger with multiple directions
    staggerAnimationAdvanced(elements, delay = 100, direction = 'up', distance = 30) {
        const directions = {
            up: `translateY(${distance}px)`,
            down: `translateY(-${distance}px)`,
            left: `translateX(${distance}px)`,
            right: `translateX(-${distance}px)`,
            scale: 'scale(0.8)',
            rotate: 'rotate(180deg)',
            fade: 'scale(1.1)'
        };
        
        const transform = directions[direction] || directions.up;
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = transform;
            element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0) translateY(0) scale(1) rotate(0deg)';
            }, index * delay);
        });
    },

    // Liquid morphing effect
    addLiquidEffect(element) {
        element.classList.add('card-liquid');
        
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px)';
            element.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '';
        });
    },

    // Elastic bounce animation
    elasticBounce(element, scale = 1.1) {
        element.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 600);
    },

    // Breathing animation for important elements
    addBreathingEffect(element, duration = 3000) {
        element.classList.add('breathing');
        element.style.animationDuration = `${duration}ms`;
    },

    // Text shimmer effect
    addTextShimmer(element) {
        element.classList.add('text-shimmer');
    },

    // Advanced loading with progress
    showAdvancedLoading(container, type = 'dots', message = 'Loading...') {
        LoadingManager.show(container, type);
        
        if (message) {
            const messageEl = document.createElement('p');
            messageEl.className = 'text-center text-gray-600 mt-4 loading-message';
            messageEl.textContent = message;
            container.appendChild(messageEl);
        }
    },

    hideAdvancedLoading(container, callback) {
        LoadingManager.hide(container, callback);
    },

    // Particle explosion effect
    createParticleExplosion(element, particleCount = 20) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 100 + Math.random() * 100;
            const lifetime = 1000 + Math.random() * 500;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: lifetime,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
        }
    },

    // Morphing button state
    morphButton(button, newText, newIcon = null, duration = 500) {
        const originalText = button.textContent;
        const originalIcon = button.querySelector('i');
        
        button.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        button.style.transform = 'scale(0.9)';
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.textContent = newText;
            if (newIcon && originalIcon) {
                originalIcon.className = newIcon;
            }
            button.style.transform = 'scale(1)';
            button.style.opacity = '1';
        }, duration / 2);
        
        return () => {
            button.style.transform = 'scale(0.9)';
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.textContent = originalText;
                if (originalIcon && newIcon) {
                    originalIcon.className = originalIcon.dataset.originalClass || 'fas fa-circle';
                }
                button.style.transform = 'scale(1)';
                button.style.opacity = '1';
            }, duration / 2);
        };
    },

    // Smooth reveal with intersection observer
    revealOnScroll(selector, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (options.callback) {
                        options.callback(entry.target);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, defaultOptions);
        
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('section-reveal');
            observer.observe(el);
        });
    }
};

// Enhanced page load animations
function initializePageAnimations() {
    console.log('🎨 Initializing advanced page animations...');
    
    // Initialize all animation systems
    setTimeout(() => {
        MagneticEffect.init();
        ScrollAnimations.init();
        InteractionFeedback.init();
    }, 100);
    
    // Add enhanced ripple effect to all buttons
    document.querySelectorAll('button, .btn').forEach(button => {
        if (!button.classList.contains('ripple-added')) {
            AnimationUtils.addRippleEffect(button);
            AnimationUtils.addMagneticEffect(button, 0.2);
            button.classList.add('ripple-added', 'btn-ripple', 'btn-morph');
        }
    });
    
    // Add enhanced floating animation to cards with stagger
    document.querySelectorAll('.card-hover').forEach((card, index) => {
        card.classList.add('card-liquid');
        AnimationUtils.addLiquidEffect(card);
        
        setTimeout(() => {
            card.classList.add('floating');
            AnimationUtils.addMagneticEffect(card, 0.15);
        }, index * 100);
    });
    
    // Add enhanced pulse to profile pictures
    document.querySelectorAll('.profile-pic').forEach(pic => {
        AnimationUtils.addPulseAnimation(pic);
        AnimationUtils.addBreathingEffect(pic, 4000);
    });
    
    // Setup reveal animations for scroll
    AnimationUtils.revealOnScroll('.card-hover, .stats-card, .nav-item', {
        callback: (element) => {
            AnimationUtils.elasticBounce(element, 1.05);
        }
    });
    
    // Add advanced stagger animations with different directions
    setTimeout(() => {
        const dashboardItems = document.querySelectorAll('.dashboard-section .card-hover');
        if (dashboardItems.length > 0) {
            AnimationUtils.staggerAnimationAdvanced(Array.from(dashboardItems), 120, 'up', 40);
        }
        
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems.length > 0) {
            navItems.forEach(item => item.classList.add('nav-item-enhanced'));
            AnimationUtils.staggerAnimationAdvanced(Array.from(navItems), 80, 'scale', 20);
        }
        
        // Add shimmer effect to titles
        document.querySelectorAll('h1, h2.text-2xl').forEach(title => {
            AnimationUtils.addTextShimmer(title);
        });
    }, 600);
    
    // Initialize particle effects on important actions
    document.querySelectorAll('[onclick*="signIn"], [onclick*="signUp"]').forEach(button => {
        button.addEventListener('click', (e) => {
            AnimationUtils.createParticleExplosion(e.target, 15);
        });
    });
}

// Enhanced form interactions
function enhanceFormInteractions() {
    // Add floating label effect
    document.querySelectorAll('input, textarea').forEach(input => {
        if (input.nextElementSibling && input.nextElementSibling.tagName === 'LABEL') {
            input.parentElement.classList.add('floating-label');
        }
        
        // Add focus animations
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}
