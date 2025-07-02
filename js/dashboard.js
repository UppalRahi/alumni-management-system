// Dashboard functions

// Store chart instances to prevent memory leaks
let industryChartInstance = null;
let yearChartInstance = null;

// Load dashboard data
async function loadDashboardData() {
    console.log('📊 Loading dashboard data...');
    
    try {
        // Load stats
        await loadDashboardStats();
        
        // Load charts
        await loadDashboardCharts();
        
        // Load recent activity
        await loadRecentActivity();
        
    } catch (err) {
        console.error('❌ Dashboard load error:', err);
    }
}

// Load dashboard statistics
async function loadDashboardStats() {
    try {
        // Total alumni count
        const { data: alumniData, error: alumniError } = await supabase
            .from('profiles')
            .select('id', { count: 'exact' });
        
        if (!alumniError) {
            document.getElementById('total-alumni').textContent = alumniData?.length || 0;
        }
        
        // Upcoming events count
        const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select('id', { count: 'exact' })
            .gte('event_date', new Date().toISOString());
        
        if (!eventsError) {
            document.getElementById('upcoming-events').textContent = eventsData?.length || 0;
        }
        
        // Connections count (placeholder for now)
        document.getElementById('connections-count').textContent = '0';
        
    } catch (err) {
        console.error('❌ Stats load error:', err);
    }
}

// Load dashboard charts
async function loadDashboardCharts() {
    try {
        await loadIndustryChart();
        await loadYearChart();
    } catch (err) {
        console.error('❌ Charts load error:', err);
    }
}

// Load industry distribution chart
async function loadIndustryChart() {
    try {
        // Destroy existing chart to prevent memory leaks
        if (industryChartInstance) {
            industryChartInstance.destroy();
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('current_company')
            .not('current_company', 'is', null);
        
        if (error) {
            console.error('Industry chart error:', error);
            return;
        }
        
        // Process data to get industry distribution (simplified)
        const industryCount = {};
        data?.forEach(profile => {
            const company = profile.current_company;
            if (company) {
                // Simple industry categorization based on company name
                let industry = 'Other';
                if (company.toLowerCase().includes('tech') || company.toLowerCase().includes('software')) {
                    industry = 'Technology';
                } else if (company.toLowerCase().includes('bank') || company.toLowerCase().includes('finance')) {
                    industry = 'Finance';
                } else if (company.toLowerCase().includes('health') || company.toLowerCase().includes('medical')) {
                    industry = 'Healthcare';
                } else if (company.toLowerCase().includes('education') || company.toLowerCase().includes('university')) {
                    industry = 'Education';
                }
                industryCount[industry] = (industryCount[industry] || 0) + 1;
            }
        });
        
        const ctx = document.getElementById('industryChart');
        if (!ctx) return;
        
        industryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(industryCount),
                datasets: [{
                    data: Object.values(industryCount),
                    backgroundColor: [
                        '#3B82F6',  // Blue
                        '#10B981',  // Green  
                        '#F59E0B',  // Yellow
                        '#EF4444',  // Red
                        '#8B5CF6'   // Purple
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 400  // Faster animation
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
        
    } catch (err) {
        console.error('❌ Industry chart error:', err);
    }
}

// Load graduation years chart
async function loadYearChart() {
    try {
        // Destroy existing chart to prevent memory leaks
        if (yearChartInstance) {
            yearChartInstance.destroy();
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('graduation_year')
            .not('graduation_year', 'is', null);
        
        if (error) {
            console.error('Year chart error:', error);
            // Show placeholder data for demo
            createYearChartWithDemoData();
            return;
        }
        
        // Process data to get year distribution
        const yearCount = {};
        data?.forEach(profile => {
            const year = profile.graduation_year;
            if (year && year >= 1980 && year <= 2030) { // Reasonable year range
                yearCount[year] = (yearCount[year] || 0) + 1;
            }
        });
        
        // If no data, show demo data
        if (Object.keys(yearCount).length === 0) {
            createYearChartWithDemoData();
            return;
        }
        
        // Sort years and prepare data
        const sortedYears = Object.keys(yearCount).sort((a, b) => a - b);
        const yearData = sortedYears.map(year => yearCount[year]);
        
        const ctx = document.getElementById('yearChart');
        if (!ctx) return;
        
        yearChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedYears,
                datasets: [{
                    label: 'Alumni Count',
                    data: yearData,
                    backgroundColor: '#3B82F6',
                    borderColor: '#1D4ED8',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 400  // Faster animation
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            color: '#6B7280'
                        },
                        grid: {
                            color: '#E5E7EB'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            color: '#6B7280'
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1F2937',
                        titleColor: '#F9FAFB',
                        bodyColor: '#F9FAFB',
                        borderColor: '#3B82F6',
                        borderWidth: 1
                    }
                }
            }
        });
        
    } catch (err) {
        console.error('❌ Year chart error:', err);
        createYearChartWithDemoData();
    }
}

// Create demo data for year chart when no real data is available
function createYearChartWithDemoData() {
    try {
        const ctx = document.getElementById('yearChart');
        if (!ctx) return;
        
        // Demo data showing a realistic distribution
        const currentYear = new Date().getFullYear();
        const demoYears = [];
        const demoData = [];
        
        // Generate demo data for last 10 years
        for (let i = 10; i >= 0; i--) {
            const year = currentYear - i;
            demoYears.push(year.toString());
            // Random but realistic distribution
            demoData.push(Math.floor(Math.random() * 15) + 1);
        }
        
        yearChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: demoYears,
                datasets: [{
                    label: 'Alumni Count',
                    data: demoData,
                    backgroundColor: '#3B82F6',
                    borderColor: '#1D4ED8',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 400
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0,
                            color: '#6B7280'
                        },
                        grid: {
                            color: '#E5E7EB'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            color: '#6B7280'
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1F2937',
                        titleColor: '#F9FAFB',
                        bodyColor: '#F9FAFB',
                        borderColor: '#3B82F6',
                        borderWidth: 1
                    }
                }
            }
        });
        
    } catch (err) {
        console.error('❌ Demo year chart error:', err);
    }
}

// Load recent activity
async function loadRecentActivity() {
    try {
        // For now, show sample activity
        const activityContainer = document.getElementById('recent-activity');
        activityContainer.innerHTML = `
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div class="bg-blue-500 text-white p-2 rounded-full">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div>
                    <p class="font-medium">New Alumni Joined</p>
                    <p class="text-sm text-gray-600">Welcome to the network!</p>
                    <p class="text-xs text-gray-500">2 hours ago</p>
                </div>
            </div>
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div class="bg-green-500 text-white p-2 rounded-full">
                    <i class="fas fa-calendar"></i>
                </div>
                <div>
                    <p class="font-medium">New Event Created</p>
                    <p class="text-sm text-gray-600">Alumni Networking Meetup scheduled</p>
                    <p class="text-xs text-gray-500">1 day ago</p>
                </div>
            </div>
            <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div class="bg-purple-500 text-white p-2 rounded-full">
                    <i class="fas fa-handshake"></i>
                </div>
                <div>
                    <p class="font-medium">Mentorship Connection</p>
                    <p class="text-sm text-gray-600">A new mentoring relationship was established</p>
                    <p class="text-xs text-gray-500">3 days ago</p>
                </div>
            </div>
        `;
        
    } catch (err) {
        console.error('❌ Recent activity load error:', err);
    }
}

// Cleanup function to destroy charts and prevent memory leaks
function cleanupDashboardCharts() {
    if (industryChartInstance) {
        industryChartInstance.destroy();
        industryChartInstance = null;
    }
    if (yearChartInstance) {
        yearChartInstance.destroy();
        yearChartInstance = null;
    }
}
