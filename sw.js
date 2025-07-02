// Service Worker for Alumni Network
const CACHE_NAME = 'alumni-network-v1';
const urlsToCache = [
    '/alumni-management-system/',
    '/alumni-management-system/index.html',
    '/alumni-management-system/css/style.css',
    '/alumni-management-system/js/config.js',
    '/alumni-management-system/js/error-handling.js',
    '/alumni-management-system/js/auth.js',
    '/alumni-management-system/js/ui.js',
    '/alumni-management-system/js/database.js',
    '/alumni-management-system/js/components.js',
    '/alumni-management-system/js/dashboard.js',
    '/alumni-management-system/js/network.js',
    '/alumni-management-system/js/events.js',
    '/alumni-management-system/js/mentorship.js',
    '/alumni-management-system/js/analytics.js',
    '/alumni-management-system/components/profile.html',
    '/alumni-management-system/components/network.html',
    '/alumni-management-system/components/events.html',
    '/alumni-management-system/components/mentorship.html',
    '/alumni-management-system/components/analytics.html'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('🔧 Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('❌ Cache installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('✅ Service Worker activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip external resources (CDNs)
    if (!event.request.url.includes('github.io/alumni-management-system')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('📋 Serving from cache:', event.request.url);
                    return response;
                }
                
                console.log('🌐 Fetching from network:', event.request.url);
                return fetch(event.request).then(response => {
                    // Don't cache responses that aren't valid
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response
                    const responseToCache = response.clone();
                    
                    // Cache the response
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(error => {
                    console.error('❌ Network fetch failed:', error);
                    
                    // Return offline page for navigation requests
                    if (event.request.mode === 'navigate') {
                        return caches.match('/alumni-management-system/offline.html');
                    }
                    
                    return new Response('Network error occurred', {
                        status: 408,
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
            })
    );
});
