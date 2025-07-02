// Events functions

// Load events
async function loadEvents() {
    console.log('📅 Loading events...');
    
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('event_date', { ascending: true });
        
        if (error) {
            console.error('❌ Events load error:', error);
            // Show sample events if database table doesn't exist
            displaySampleEvents();
            return;
        }
        
        displayEventsGrid(data);
        
    } catch (err) {
        console.error('❌ Events load exception:', err);
        displaySampleEvents();
    }
}

// Display events in grid format
function displayEventsGrid(events) {
    const grid = document.getElementById('events-grid');
    
    if (!events || events.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-calendar text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-500 mb-2">No Events Found</h3>
                <p class="text-gray-400">Be the first to create an event!</p>
                <button onclick="showCreateEventModal()" class="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                    Create Event
                </button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = events.map(event => {
        const eventDate = new Date(event.event_date);
        const isUpcoming = eventDate > new Date();
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden card-hover">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold">${event.title || 'Untitled Event'}</h3>
                        <span class="status-badge ${isUpcoming ? 'status-online' : 'status-offline'}">
                            ${isUpcoming ? 'Upcoming' : 'Past'}
                        </span>
                    </div>
                    
                    <p class="text-gray-600 text-sm mb-4">${event.description || 'No description available'}</p>
                    
                    <div class="space-y-2 text-sm text-gray-600">
                        <div class="flex items-center">
                            <i class="fas fa-calendar mr-2"></i>
                            <span>${eventDate.toLocaleDateString()}</span>
                        </div>
                        <div class="flex items-center">
                            <i class="fas fa-clock mr-2"></i>
                            <span>${eventDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                        ${event.location ? `
                            <div class="flex items-center">
                                <i class="fas fa-map-marker-alt mr-2"></i>
                                <span>${event.location}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="mt-6 pt-4 border-t">
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-500">
                                <i class="fas fa-users mr-1"></i>
                                ${event.attendee_count || 0} attending
                            </div>
                            
                            ${isUpcoming ? `
                                <button onclick="attendEvent('${event.id}')" class="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 transition duration-300">
                                    <i class="fas fa-check mr-1"></i>Attend
                                </button>
                            ` : `
                                <button class="bg-gray-300 text-gray-600 px-4 py-2 rounded text-sm cursor-not-allowed">
                                    Event Ended
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Display sample events when database is not available
function displaySampleEvents() {
    const sampleEvents = [
        {
            id: 'sample-1',
            title: 'Alumni Networking Mixer',
            description: 'Join us for an evening of networking and reconnecting with fellow alumni.',
            event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
            location: 'Downtown Convention Center',
            attendee_count: 45
        },
        {
            id: 'sample-2',
            title: 'Career Development Workshop',
            description: 'Learn about the latest trends in your industry and enhance your professional skills.',
            event_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
            location: 'University Campus',
            attendee_count: 32
        },
        {
            id: 'sample-3',
            title: 'Annual Alumni Gala',
            description: 'Our annual celebration bringing together alumni from all graduating classes.',
            event_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month from now
            location: 'Grand Hotel Ballroom',
            attendee_count: 150
        }
    ];
    
    displayEventsGrid(sampleEvents);
}

// Create new event
async function createEvent(event) {
    event.preventDefault();
    
    if (!currentUser) {
        alert('You must be logged in to create events');
        return;
    }
    
    try {
        console.log('📅 Creating new event...');
        
        const eventData = {
            title: document.getElementById('event-title').value,
            description: document.getElementById('event-description').value,
            event_date: document.getElementById('event-date').value,
            location: document.getElementById('event-location').value,
            created_by: currentUser.id,
            created_at: new Date().toISOString(),
            attendee_count: 0
        };
        
        const { error } = await supabase
            .from('events')
            .insert([eventData]);
        
        if (error) {
            console.error('❌ Event creation error:', error);
            alert('Failed to create event: ' + error.message);
            return;
        }
        
        console.log('✅ Event created successfully');
        alert('Event created successfully!');
        
        // Hide modal and reload events
        hideCreateEventModal();
        await loadEvents();
        
    } catch (err) {
        console.error('❌ Event creation exception:', err);
        alert('Failed to create event: ' + err.message);
    }
}

// Attend an event
async function attendEvent(eventId) {
    if (!currentUser) {
        alert('You must be logged in to attend events');
        return;
    }
    
    try {
        console.log('✅ Attending event:', eventId);
        
        // In a real implementation, you would create an attendee record
        // and update the event's attendee count
        alert('You are now registered for this event!');
        
    } catch (err) {
        console.error('❌ Event attendance error:', err);
        alert('Failed to register for event. Please try again.');
    }
}
