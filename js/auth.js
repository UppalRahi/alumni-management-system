// Authentication functions

// Initialize the application
async function initializeApp() {
    console.log('🚀 Initializing Alumni Network App...');
    
    // Load page components first
    if (typeof initializeComponents === 'function') {
        try {
            await initializeComponents();
            console.log('✅ Components loaded successfully');
        } catch (error) {
            console.error('❌ Error loading components:', error);
        }
    }
    
    // Check if user is already logged in
    checkAuthStatus();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize UI components
    if (typeof initializeUIComponents === 'function') {
        initializeUIComponents();
    }
    
    // Set up auth state change listener
    if (supabase && supabase.auth && typeof supabase.auth.onAuthStateChange === 'function') {
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
    }
    
    console.log('✅ App initialized successfully');
}

// Setup event listeners
function setupEventListeners() {
    // Add any global event listeners here
    document.addEventListener('click', function(e) {
        // Close dropdowns when clicking outside
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.add('hidden');
            }
        });
    });
}

// Toggle between login and signup forms
function toggleAuthMode() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (loginForm.classList.contains('hidden')) {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    }
}

// Sign in function
async function signIn(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginBtn = document.getElementById('login-btn-text');
    const loginLoading = document.getElementById('login-loading');
    const form = event.target;
    
    // Add loading animation to the form
    form.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    form.style.transform = 'scale(0.98)';
    form.style.opacity = '0.7';
    
    // Show loading state with animation
    loginBtn.style.transition = 'opacity 0.3s ease';
    loginBtn.style.opacity = '0';
    setTimeout(() => {
        loginBtn.style.display = 'none';
        loginLoading.classList.remove('hidden');
        loginLoading.style.animation = 'pulse 1.5s ease-in-out infinite';
    }, 300);
    
    try {
        console.log('🔐 Attempting sign in...');
        
        const result = await withSupabaseErrorHandling(
            () => supabase.auth.signInWithPassword({
                email: email,
                password: password
            }),
            'Sign in failed'
        );
        
        if (result.error) {
            console.error('❌ Sign in error:', result.error);
            
            // Show error with shake animation
            form.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => form.style.animation = '', 500);
            
            if (typeof showErrorMessage === 'function') {
                showErrorMessage('Sign in failed: ' + result.error.message);
            } else if (typeof AnimationUtils !== 'undefined') {
                AnimationUtils.showToast('❌ Sign in failed: ' + result.error.message, 'error', 4000);
            } else {
                alert('Sign in failed: ' + result.error.message);
            }
            return;
        }
        
        console.log('✅ Sign in successful:', result.data);
        currentUser = result.data.user;
        
        // Success animation
        form.style.transform = 'scale(1.02)';
        form.style.opacity = '1';
        form.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        form.style.color = 'white';
        
        // Add success particles
        if (typeof AnimationUtils !== 'undefined') {
            AnimationUtils.createParticleExplosion(form, 20);
            AnimationUtils.showToast('🎉 Welcome back!', 'success', 3000);
        }
        
        // Load user profile
        await loadUserProfile();
        
        // Show main app with enhanced transition
        setTimeout(() => {
            showMainApp();
        }, 1000);
        
    } catch (err) {
        console.error('❌ Sign in exception:', err);
        
        // Error animation
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => form.style.animation = '', 500);
        
        if (typeof showErrorMessage === 'function') {
            showErrorMessage('Sign in failed: ' + err.message);
        } else if (typeof AnimationUtils !== 'undefined') {
            AnimationUtils.showToast('❌ Sign in failed: ' + err.message, 'error', 4000);
        } else {
            alert('Sign in failed: ' + err.message);
        }
    } finally {
        // Reset button state with animation
        loginLoading.style.animation = '';
        loginLoading.classList.add('hidden');
        loginBtn.style.display = 'inline';
        loginBtn.style.opacity = '1';
        
        // Reset form state
        setTimeout(() => {
            form.style.transform = 'scale(1)';
            form.style.opacity = '1';
            form.style.background = '';
            form.style.color = '';
        }, 1500);
    }
}

// Sign up function
async function signUp(event) {
    event.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const year = document.getElementById('signup-year').value;
    const signupBtn = document.getElementById('signup-btn-text');
    const signupLoading = document.getElementById('signup-loading');
    const form = event.target;
    
    // Add loading animation to the form
    form.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    form.style.transform = 'scale(0.98)';
    form.style.opacity = '0.7';
    
    // Show loading state with animation
    signupBtn.style.transition = 'opacity 0.3s ease';
    signupBtn.style.opacity = '0';
    setTimeout(() => {
        signupBtn.style.display = 'none';
        signupLoading.classList.remove('hidden');
        signupLoading.style.animation = 'pulse 1.5s ease-in-out infinite';
    }, 300);
    
    try {
        console.log('📝 Attempting sign up...');
        
        // Sign up with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name,
                    graduation_year: year
                }
            }
        });
        
        if (error) {
            console.error('❌ Sign up error:', error);
            
            // Show error with shake animation
            form.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => form.style.animation = '', 500);
            
            if (typeof AnimationUtils !== 'undefined') {
                AnimationUtils.showToast('❌ Sign up failed: ' + error.message, 'error', 4000);
            } else {
                alert('Sign up failed: ' + error.message);
            }
            return;
        }
        
        console.log('✅ Auth sign up successful:', data);
        
        if (data.user) {
            currentUser = data.user;
            
            // Success animation
            form.style.transform = 'scale(1.02)';
            form.style.opacity = '1';
            form.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            form.style.color = 'white';
            
            // Add success particles
            if (typeof AnimationUtils !== 'undefined') {
                AnimationUtils.createParticleExplosion(form, 25);
            }
            
            // Try to create profile in profiles table
            console.log('📊 Creating user profile...');
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([{
                    id: data.user.id,
                    full_name: name,
                    email: email,
                    graduation_year: parseInt(year),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }]);
            
            if (profileError) {
                console.error('❌ Profile creation error:', profileError);
                
                // Check if it's an RLS policy error
                if (profileError.code === '42501' || profileError.message.includes('row-level security')) {
                    console.log('🔧 RLS policy issue detected. Please set up your database tables and policies.');
                    
                    if (typeof AnimationUtils !== 'undefined') {
                        AnimationUtils.showToast('⚠️ Database Setup Required! Check console for details.', 'warning', 6000);
                    } else {
                        alert(`⚠️ Database Setup Required!\n\nYour account was created successfully, but the profiles table needs proper Row Level Security (RLS) policies for full functionality.\n\nPlease run this SQL in your Supabase dashboard:\n\n-- Enable RLS\nALTER TABLE profiles ENABLE ROW LEVEL SECURITY;\n\n-- Allow users to insert their own profile\nCREATE POLICY "Users can insert own profile" ON profiles\nFOR INSERT WITH CHECK (auth.uid() = id);\n\n-- Allow users to view their own profile\nCREATE POLICY "Users can view own profile" ON profiles\nFOR SELECT USING (auth.uid() = id);\n\n-- Allow users to update their own profile\nCREATE POLICY "Users can update own profile" ON profiles\nFOR UPDATE USING (auth.uid() = id);\n\nFor now, the app will work in demo mode.`);
                    }
                } else {
                    if (typeof AnimationUtils !== 'undefined') {
                        AnimationUtils.showToast(`✅ Account created! Profile setup issue: ${profileError.message}`, 'warning', 5000);
                    } else {
                        alert(`Account created successfully!\n\nHowever, there was an issue creating your profile: ${profileError.message}\n\nThe app will work in demo mode for now.`);
                    }
                }
                
                // For now, continue without profile creation for demo purposes
                console.log('⚠️ Continuing without profile creation for demo...');
                currentUserProfile = {
                    id: data.user.id,
                    full_name: name,
                    email: email,
                    graduation_year: parseInt(year)
                };
                updateProfileUI();
                
                // Show main app with celebration animation
                if (typeof AnimationUtils !== 'undefined') {
                    AnimationUtils.showToast('🎉 Welcome to AlumniNet!', 'success', 4000);
                }
                
                setTimeout(() => {
                    showMainApp();
                }, 1500);
                return;
            }
            
            console.log('✅ Profile created successfully');
            
            // Load the newly created profile
            await loadUserProfile();
            
            // Show success message with celebration
            if (typeof AnimationUtils !== 'undefined') {
                AnimationUtils.showToast('🎉 Account created successfully! Welcome to AlumniNet!', 'success', 5000);
            } else {
                alert('Account created successfully! Welcome to AlumniNet!');
            }
            
            // Show main app with delay for celebration
            setTimeout(() => {
                showMainApp();
            }, 2000);
        } else {
            console.log('📧 Check your email to confirm your account');
            
            if (typeof AnimationUtils !== 'undefined') {
                AnimationUtils.showToast('📧 Please check your email to confirm your account', 'info', 5000);
            } else {
                alert('Please check your email to confirm your account before signing in.');
            }
        }
        
    } catch (err) {
        console.error('❌ Sign up exception:', err);
        
        // Error animation
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => form.style.animation = '', 500);
        
        if (typeof AnimationUtils !== 'undefined') {
            AnimationUtils.showToast('❌ Sign up failed: ' + err.message, 'error', 4000);
        } else {
            alert('Sign up failed: ' + err.message);
        }
    } finally {
        // Reset button state with animation
        signupLoading.style.animation = '';
        signupLoading.classList.add('hidden');
        signupBtn.style.display = 'inline';
        signupBtn.style.opacity = '1';
        
        // Reset form state
        setTimeout(() => {
            form.style.transform = 'scale(1)';
            form.style.opacity = '1';
            form.style.background = '';
            form.style.color = '';
        }, 2500);
    }
}

// Sign out function
async function signOut() {
    try {
        console.log('🚪 Signing out...');
        
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('❌ Sign out error:', error);
            alert('Sign out failed: ' + error.message);
            return;
        }
        
        console.log('✅ Sign out successful');
        
        // Reset state
        currentUser = null;
        currentUserProfile = null;
        
        // Show auth section
        showAuthSection();
        
    } catch (err) {
        console.error('❌ Sign out exception:', err);
        alert('Sign out failed: ' + err.message);
    }
}

// Load user profile
async function loadUserProfile() {
    if (!currentUser) {
        console.error('❌ No current user to load profile for');
        return;
    }
    
    try {
        console.log('👤 Loading user profile for ID:', currentUser.id);
        
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();
        
        if (error) {
            console.error('❌ Profile load error:', error);
            console.log('🆕 Profile not found, creating basic profile...');
            // Create a basic profile if it doesn't exist
            await createBasicProfile();
            return;
        }
        
        console.log('✅ Profile loaded from database:', data);
        currentUserProfile = data;
        
        // Update UI with profile data
        updateProfileUI();
        
    } catch (err) {
        console.error('❌ Profile load exception:', err);
    }
}

// Create basic profile if one doesn't exist
async function createBasicProfile() {
    if (!currentUser) return;
    
    try {
        console.log('🆕 Creating basic profile...');
        
        const basicProfileData = {
            id: currentUser.id,
            full_name: currentUser.user_metadata?.full_name || 'User',
            email: currentUser.email,
            graduation_year: currentUser.user_metadata?.graduation_year || new Date().getFullYear(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        console.log('📝 Basic profile data:', basicProfileData);
        
        const { data, error } = await supabase
            .from('profiles')
            .insert([basicProfileData])
            .select()
            .single();
        
        if (error) {
            console.error('❌ Basic profile creation error:', error);
            
            // If we can't create in database, create a local demo profile
            console.log('⚠️ Creating local demo profile...');
            currentUserProfile = basicProfileData;
            updateProfileUI();
            return;
        }
        
        console.log('✅ Basic profile created');
        currentUserProfile = data;
        updateProfileUI();
        
    } catch (err) {
        console.error('❌ Basic profile creation exception:', err);
        
        // Fallback to local demo profile
        currentUserProfile = {
            id: currentUser.id,
            full_name: currentUser.user_metadata?.full_name || 'User',
            email: currentUser.email,
            graduation_year: currentUser.user_metadata?.graduation_year || new Date().getFullYear()
        };
        updateProfileUI();
    }
}

// Update profile UI elements
function updateProfileUI() {
    console.log('🎨 updateProfileUI called with profile:', currentUserProfile);
    
    if (!currentUserProfile) {
        console.warn('⚠️ No currentUserProfile found, skipping UI update');
        return;
    }
    
    // Update navigation greeting
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = currentUserProfile.full_name || 'User';
        console.log('👤 Updated user name in navbar:', currentUserProfile.full_name);
    }
    
    // Update profile form - safely handle missing fields
    const profileElements = {
        'profile-name': currentUserProfile.full_name,
        'profile-email': currentUserProfile.email,
        'profile-year': currentUserProfile.graduation_year,
        'profile-department': currentUserProfile.department,
        'profile-company': currentUserProfile.current_company,
        'profile-position': currentUserProfile.current_position,
        'profile-location': currentUserProfile.location,
        'profile-linkedin': currentUserProfile.linkedin_url,
        'profile-bio': currentUserProfile.bio,
        'profile-skills': currentUserProfile.skills
    };
    
    // Try updating elements, retry if not found (elements might not be loaded yet)
    updateProfileFormElements(profileElements);
    
    // Update mentor checkbox - safely handle missing field
    const mentorCheckbox = document.getElementById('profile-mentor');
    if (mentorCheckbox) {
        // Only set if the field exists in the profile, otherwise default to false
        mentorCheckbox.checked = currentUserProfile.hasOwnProperty('is_mentor') ? 
            currentUserProfile.is_mentor : false;
        console.log('✅ Updated mentor checkbox:', mentorCheckbox.checked);
    } else {
        console.warn('⚠️ Mentor checkbox not found');
    }
    
    console.log('🎨 updateProfileUI completed');
}

// Helper function to update profile form elements with retry logic
function updateProfileFormElements(profileElements, retryCount = 0) {
    let elementsUpdated = 0;
    let elementsNotFound = [];
    
    Object.entries(profileElements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            // Special handling for location dropdown
            if (id === 'profile-location') {
                updateLocationDropdown(value);
                elementsUpdated++;
                console.log(`📝 Updated location dropdown: "${value}"`);
            } else {
                element.value = value || '';  // Set empty string if value is null/undefined
                elementsUpdated++;
                console.log(`📝 Updated ${id}: "${value}"`);
            }
        } else {
            elementsNotFound.push(id);
        }
    });
    
    console.log(`✅ Updated ${elementsUpdated} profile form elements`);
    
    // If elements not found and we haven't retried too many times, retry after a delay
    if (elementsNotFound.length > 0 && retryCount < 3) {
        console.warn(`⚠️ ${elementsNotFound.length} elements not found, retrying in 100ms... (attempt ${retryCount + 1})`);
        setTimeout(() => {
            updateProfileFormElements(
                Object.fromEntries(elementsNotFound.map(id => [id, profileElements[id]])), 
                retryCount + 1
            );
        }, 100);
    } else if (elementsNotFound.length > 0) {
        console.warn(`⚠️ Elements not found after retries:`, elementsNotFound);
    }
}

// Helper function to update location dropdown
function updateLocationDropdown(locationValue) {
    const stateSelect = document.getElementById('profile-state');
    const customInput = document.getElementById('profile-location-custom');
    const hiddenLocationInput = document.getElementById('profile-location');
    
    if (!stateSelect || !customInput || !hiddenLocationInput) {
        console.warn('⚠️ Location dropdown elements not found');
        return;
    }
    
    // Set the hidden input value
    hiddenLocationInput.value = locationValue || '';
    
    if (locationValue) {
        // Check if the location exists in the dropdown options
        const option = Array.from(stateSelect.options).find(opt => opt.value === locationValue);
        
        if (option) {
            stateSelect.value = locationValue;
            customInput.classList.add('hidden');
            customInput.value = '';
        } else {
            // Location not in dropdown, use custom input
            stateSelect.value = 'Other';
            customInput.classList.remove('hidden');
            customInput.value = locationValue;
        }
    } else {
        // No location value
        stateSelect.value = '';
        customInput.classList.add('hidden');
        customInput.value = '';
    }
}

// Check if user is already signed in
async function checkAuthStatus() {
    try {
        console.log('🔍 Checking auth status...');
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
            console.log('✅ User already logged in');
            currentUser = session.user;
            await loadUserProfile();
            showMainApp();
        } else {
            console.log('ℹ️ No active session, showing login');
            showAuthSection();
        }
    } catch (error) {
        console.error('❌ Error checking auth status:', error);
        showAuthSection();
    }
}

// Initialize the app
initializeApp();
