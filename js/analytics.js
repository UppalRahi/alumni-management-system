// Analytics functions

// Load analytics data
async function loadAnalyticsData() {
    console.log('📊 Loading analytics data...');
    
    try {
        await loadAdvancedStats();
        await loadAnalyticsCharts();
        await loadCompaniesTable();
    } catch (err) {
        console.error('❌ Analytics load error:', err);
    }
}

// Load advanced statistics
async function loadAdvancedStats() {
    try {
        // Calculate network growth (placeholder)
        document.getElementById('network-growth').textContent = '+12%';
        
        // Active members in last 30 days
        const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id', { count: 'exact' })
            .gte('updated_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
        
        if (!profilesError) {
            document.getElementById('active-members').textContent = profilesData?.length || 0;
        }
        
        // Event attendance (placeholder)
        document.getElementById('event-attendance').textContent = '78%';
        
        // Connections made (placeholder)
        document.getElementById('connections-made').textContent = '156';
        
    } catch (err) {
        console.error('❌ Advanced stats error:', err);
    }
}

// Load analytics charts
async function loadAnalyticsCharts() {
    try {
        await loadLocationChart();
        await loadCareerChart();
    } catch (err) {
        console.error('❌ Analytics charts error:', err);
    }
}

// Load geographic distribution chart
async function loadLocationChart() {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('location')
            .not('location', 'is', null);
        
        if (error) {
            console.error('Location chart error:', error);
            loadSampleLocationChart();
            return;
        }
        
        // Process location data
        const locationCount = {};
        data?.forEach(profile => {
            const location = profile.location;
            if (location) {
                // Extract city/state from location
                const city = location.split(',')[0].trim();
                locationCount[city] = (locationCount[city] || 0) + 1;
            }
        });
        
        // Get top 10 locations
        const sortedLocations = Object.entries(locationCount)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);
        
        const ctx = document.getElementById('locationChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedLocations.map(([location]) => location),
                datasets: [{
                    label: 'Alumni Count',
                    data: sortedLocations.map(([, count]) => count),
                    backgroundColor: '#10B981'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
    } catch (err) {
        console.error('❌ Location chart error:', err);
        loadSampleLocationChart();
    }
}

// Load sample location chart
function loadSampleLocationChart() {
    const sampleData = {
        labels: ['San Francisco', 'New York', 'Seattle', 'Boston', 'Austin', 'Chicago'],
        data: [45, 38, 32, 28, 25, 22]
    };
    
    const ctx = document.getElementById('locationChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sampleData.labels,
            datasets: [{
                label: 'Alumni Count',
                data: sampleData.data,
                backgroundColor: '#10B981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Load career progression chart
async function loadCareerChart() {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('graduation_year, current_position')
            .not('graduation_year', 'is', null)
            .not('current_position', 'is', null);
        
        if (error) {
            console.error('Career chart error:', error);
            loadSampleCareerChart();
            return;
        }
        
        // Process career progression data
        const careerLevels = {
            'Entry Level': 0,
            'Mid Level': 0,
            'Senior Level': 0,
            'Leadership': 0
        };
        
        data?.forEach(profile => {
            const position = profile.current_position.toLowerCase();
            if (position.includes('senior') || position.includes('lead')) {
                careerLevels['Senior Level']++;
            } else if (position.includes('director') || position.includes('manager') || position.includes('vp')) {
                careerLevels['Leadership']++;
            } else if (position.includes('junior') || position.includes('associate') || position.includes('entry')) {
                careerLevels['Entry Level']++;
            } else {
                careerLevels['Mid Level']++;
            }
        });
        
        const ctx = document.getElementById('careerChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(careerLevels),
                datasets: [{
                    data: Object.values(careerLevels),
                    backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        
    } catch (err) {
        console.error('❌ Career chart error:', err);
        loadSampleCareerChart();
    }
}

// Load sample career chart
function loadSampleCareerChart() {
    const sampleData = {
        labels: ['Entry Level', 'Mid Level', 'Senior Level', 'Leadership'],
        data: [25, 45, 35, 20]
    };
    
    const ctx = document.getElementById('careerChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sampleData.labels,
            datasets: [{
                data: sampleData.data,
                backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Load companies table
async function loadCompaniesTable() {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('current_company, graduation_year')
            .not('current_company', 'is', null);
        
        if (error) {
            console.error('Companies table error:', error);
            loadSampleCompaniesTable();
            return;
        }
        
        // Process company data
        const companyStats = {};
        data?.forEach(profile => {
            const company = profile.current_company;
            if (company) {
                if (!companyStats[company]) {
                    companyStats[company] = {
                        count: 0,
                        years: []
                    };
                }
                companyStats[company].count++;
                if (profile.graduation_year) {
                    companyStats[company].years.push(profile.graduation_year);
                }
            }
        });
        
        // Calculate average experience and growth rate
        const companiesArray = Object.entries(companyStats)
            .map(([company, stats]) => {
                const avgYear = stats.years.length > 0 
                    ? stats.years.reduce((sum, year) => sum + year, 0) / stats.years.length
                    : 0;
                const avgExperience = avgYear > 0 ? new Date().getFullYear() - avgYear : 0;
                
                return {
                    name: company,
                    count: stats.count,
                    avgExperience: Math.round(avgExperience),
                    growth: Math.floor(Math.random() * 20) + '%' // Placeholder
                };
            })
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
        
        displayCompaniesTable(companiesArray);
        
    } catch (err) {
        console.error('❌ Companies table error:', err);
        loadSampleCompaniesTable();
    }
}

// Display companies table
function displayCompaniesTable(companies) {
    const tableBody = document.getElementById('companies-table');
    
    if (!companies || companies.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center py-8 text-gray-500">No company data available</td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = companies.map(company => `
        <tr class="border-b hover:bg-gray-50">
            <td class="p-3">
                <div class="font-medium">${company.name}</div>
            </td>
            <td class="p-3">${company.count}</td>
            <td class="p-3">${company.avgExperience} years</td>
            <td class="p-3">
                <span class="status-badge status-online">+${company.growth}</span>
            </td>
        </tr>
    `).join('');
}

// Load sample companies table
function loadSampleCompaniesTable() {
    const sampleCompanies = [
        { name: 'Tech Solutions Inc.', count: 15, avgExperience: 8, growth: '12%' },
        { name: 'Global Finance Corp', count: 12, avgExperience: 10, growth: '8%' },
        { name: 'Innovation Labs', count: 10, avgExperience: 6, growth: '15%' },
        { name: 'Healthcare Partners', count: 8, avgExperience: 9, growth: '5%' },
        { name: 'Education First', count: 7, avgExperience: 12, growth: '3%' },
        { name: 'StartupXYZ', count: 6, avgExperience: 4, growth: '25%' },
        { name: 'Consulting Group', count: 5, avgExperience: 7, growth: '10%' },
        { name: 'Manufacturing Co.', count: 4, avgExperience: 15, growth: '2%' }
    ];
    
    displayCompaniesTable(sampleCompanies);
}
