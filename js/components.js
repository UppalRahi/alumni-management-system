// Component loader utility

// Load component HTML into a section
async function loadComponent(componentName, targetSectionId) {
    try {
        console.log(`🔄 Loading component: ${componentName}`);
        const response = await fetch(`components/${componentName}.html`);
        
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`⚠️ Component file not found: ${componentName}.html`);
                // Create a basic placeholder for missing components
                const targetSection = document.getElementById(targetSectionId);
                if (targetSection) {
                    targetSection.innerHTML = `
                        <div class="text-center py-12">
                            <i class="fas fa-puzzle-piece text-6xl text-gray-300 mb-4"></i>
                            <h3 class="text-xl font-medium text-gray-500 mb-2">${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Section</h3>
                            <p class="text-gray-400">This section is under development</p>
                        </div>
                    `;
                }
                return; // Don't throw error for missing components
            }
            throw new Error(`HTTP ${response.status}: Failed to load component: ${componentName}`);
        }
        
        const html = await response.text();
        const targetSection = document.getElementById(targetSectionId);
        
        if (targetSection) {
            targetSection.innerHTML = html;
            console.log(`✅ Component '${componentName}' loaded into '${targetSectionId}'`);
        } else {
            console.error(`❌ Target section '${targetSectionId}' not found`);
        }
        
    } catch (error) {
        console.error(`❌ Error loading component '${componentName}':`, error);
        // Fallback: show error message in target section
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-triangle text-6xl text-yellow-300 mb-4"></i>
                    <h3 class="text-xl font-medium text-gray-500 mb-2">Loading Error</h3>
                    <p class="text-gray-400">Failed to load ${componentName} component</p>
                    <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Refresh Page
                    </button>
                </div>
            `;
        }
    }
}

// Initialize all components
async function initializeComponents() {
    console.log('🔧 Loading page components...');
    
    const components = [
        { name: 'profile', section: 'profile-section' },
        { name: 'network', section: 'network-section' },
        { name: 'events', section: 'events-section' },
        { name: 'mentorship', section: 'mentorship-section' },
        { name: 'analytics', section: 'analytics-section' }
    ];
    
    // Load all components in parallel
    await Promise.all(
        components.map(({ name, section }) => loadComponent(name, section))
    );
    
    console.log('✅ All components loaded');
}
