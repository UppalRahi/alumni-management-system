// Component loader utility

// Load component HTML into a section
async function loadComponent(componentName, targetSectionId) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${componentName}`);
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
                    <i class="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-medium text-gray-500 mb-2">Component Load Error</h3>
                    <p class="text-gray-400">Failed to load ${componentName} component</p>
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
