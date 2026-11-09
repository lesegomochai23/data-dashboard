 const API_URL = 'http://localhost:5036/api/dashboard';

async function loadDashboard() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // 1. Format numbers as South African Rand (ZAR)
        const revenueFormatter = new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            maximumFractionDigits: 0
        });

        // Update Summary Cards
        document.getElementById('totalRevenue').innerText = revenueFormatter.format(data.totalRevenue);
        document.getElementById('totalUsers').innerText = data.totalUsers.toLocaleString('en-ZA');
        document.getElementById('totalOrders').innerText = data.totalOrders.toLocaleString('en-ZA');
        document.getElementById('conversionRate').innerText = data.conversionRate + '%';

        // 2. Line Chart (Orange Theme)
        const lineCtx = document.getElementById('lineChart').getContext('2d');
        new Chart(lineCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue (ZAR)',
                    data: data.monthlyRevenue,
                    borderColor: '#ff6b00', // Orange line
                    backgroundColor: 'rgba(255, 107, 0, 0.15)', // Orange fill
                    borderWidth: 4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#ff6b00',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { 
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return revenueFormatter.format(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: { 
                        ticks: { color: '#5a5a66' }, 
                        grid: { color: 'rgba(0,0,0,0.05)' },
                        border: { display: false }
                    },
                    x: { 
                        ticks: { color: '#5a5a66' }, 
                        grid: { display: false },
                        border: { display: false }
                    }
                }
            }
        });

        // 3. Doughnut Chart (Red, White, Orange Theme)
        const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
        new Chart(doughnutCtx, {
            type: 'doughnut',
            data: {
                labels: ['Organic Search', 'Social Media', 'Direct', 'Referral'],
                datasets: [{
                    data: data.trafficSources,
                    backgroundColor: [
                        '#e63946', // Red
                        '#ffffff', // White
                        '#ff6b00', // Orange
                        '#ffb366'  // Light Orange
                    ],
                    borderWidth: 2,
                    borderColor: 'rgba(255,255,255,0.5)',
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: { 
                        position: 'bottom', 
                        labels: { 
                            color: '#1e1e24',
                            padding: 20,
                            font: { size: 12, weight: 'bold' }
                        } 
                    }
                }
            }
        });

    } catch (error) {
        console.error("Error loading dashboard:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadDashboard);