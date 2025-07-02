// Error handling and loading utilities

// Global error handler
window.addEventListener('error', function(event) {
    console.error('🚨 Global error:', event.error);
    showErrorMessage('An unexpected error occurred. Please refresh the page.');
});

// Global promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('🚨 Unhandled promise rejection:', event.reason);
    
    // Don't show error message for certain types of expected errors
    const errorMessage = event.reason?.message || event.reason?.toString() || 'Unknown error';
    
    // Skip showing user messages for these common/expected errors
    if (errorMessage.includes('fetch') || 
        errorMessage.includes('NetworkError') ||
        errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('Load failed') ||
        errorMessage.includes('Component load') ||
        errorMessage.includes('Network request failed')) {
        console.log('ℹ️ Network error suppressed from user notification');
        return;
    }
    
    // Only show critical errors to users
    if (errorMessage.includes('Database') || 
        errorMessage.includes('Authentication') || 
        errorMessage.includes('Permission')) {
        showErrorMessage('An error occurred. Please refresh the page if problems persist.');
    }
});

// Show error messages to user
function showErrorMessage(message, type = 'error') {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-toast');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error toast
    const errorToast = document.createElement('div');
    errorToast.className = `error-toast fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg ${
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 
        'bg-blue-500'
    } text-white`;
    
    errorToast.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <div class="mr-2">
                    ${type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
                </div>
                <div>${message}</div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                ✕
            </button>
        </div>
    `;
    
    document.body.appendChild(errorToast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorToast.parentElement) {
            errorToast.remove();
        }
    }, 5000);
}

// Show loading spinner
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `
            <div class="flex items-center justify-center p-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span class="ml-2">Loading...</span>
            </div>
        `;
    }
}

// Hide loading spinner
function hideLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '';
    }
}

// Check if running on GitHub Pages
function isGitHubPages() {
    return window.location.hostname.includes('github.io');
}

// Environment-specific configuration
function getEnvironmentConfig() {
    if (isGitHubPages()) {
        return {
            isDevelopment: false,
            baseUrl: window.location.origin + window.location.pathname,
            enableDebugLogs: false
        };
    } else {
        return {
            isDevelopment: true,
            baseUrl: window.location.origin,
            enableDebugLogs: true
        };
    }
}

// Debug logging function
function debugLog(message, data = null) {
    const config = getEnvironmentConfig();
    if (config.enableDebugLogs) {
        if (data) {
            console.log(`🐛 ${message}`, data);
        } else {
            console.log(`🐛 ${message}`);
        }
    }
}

// Safe function execution with error handling
function safeExecute(fn, errorMessage = 'An error occurred') {
    try {
        return fn();
    } catch (error) {
        console.error(`❌ ${errorMessage}:`, error);
        showErrorMessage(errorMessage);
        return null;
    }
}

// Safe async function execution
async function safeExecuteAsync(fn, errorMessage = 'An error occurred') {
    try {
        return await fn();
    } catch (error) {
        console.error(`❌ ${errorMessage}:`, error);
        showErrorMessage(errorMessage);
        return null;
    }
}

// Connection test function
async function testConnection() {
    try {
        const response = await fetch('css/style.css');
        if (response.ok) {
            debugLog('✅ Local files accessible');
            return true;
        } else {
            console.error('❌ Local files not accessible');
            return false;
        }
    } catch (error) {
        console.error('❌ Connection test failed:', error);
        return false;
    }
}

// Initialize error handling
function initializeErrorHandling() {
    debugLog('🛡️ Error handling initialized');
    
    // Test basic connectivity
    testConnection().then(isConnected => {
        if (!isConnected) {
            showErrorMessage('Some resources may not load properly. Please refresh the page.', 'warning');
        }
    });
}
