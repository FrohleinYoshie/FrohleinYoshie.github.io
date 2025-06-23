document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const headerHeight = document.getElementById('header').offsetHeight;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    link.classList.add('inactive-nav');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-nav');
                        link.classList.remove('inactive-nav');
                    }
                });
            }
        });
    }, { rootMargin: `-${headerHeight}px 0px 0px 0px` });

    sections.forEach(section => {
        observer.observe(section);
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('hidden') === false) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    const busIcon = document.getElementById('bus-icon');
    setInterval(() => {
        busIcon.style.left = busIcon.style.left === '15%' ? '75%' : '15%';
    }, 3000);

    const shuttleDiagramContainer = document.getElementById('shuttle-diagram');
    const beforeBtn = document.getElementById('shuttle-before-btn');
    const afterBtn = document.getElementById('shuttle-after-btn');
    const shuttleData = {
        before: [
            { from: 'R5A', to: '/' },
            { from: 'R5B', to: '���X' },
            { from: '�-C', to: '/' },
        ],
        after: [
            { from: 'SadoRide', to: 'R5A' },
            { from: 'SadoRide', to: 'R5B' },
            { from: 'SadoRide', to: '�-C' },
            { from: 'SadoRide', to: '/' },
            { from: 'SadoRide', to: '���X' },
        ]
    };
    
    function createShuttleDiagram(state) {
        shuttleDiagramContainer.innerHTML = '';
        const isAfter = state === 'after';
        const centerNode = document.createElement('div');
        centerNode.className = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full ${isAfter ? 'bg-sado-blue text-white' : 'hidden'}`;
        centerNode.innerHTML = '<span>SadoRide</span>';
        shuttleDiagramContainer.appendChild(centerNode);

        const points = isAfter ? ['R5A', 'R5B', '�-C', '/', '���X'] : ['R5A', 'R5B', '�-C', '/', '���X'];
        points.forEach((p, i) => {
            const angle = (i / points.length) * 2 * Math.PI;
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            
            const pointNode = document.createElement('div');
            pointNode.className = 'absolute p-1 text-xs bg-white border rounded-full text-center';
            pointNode.style.left = `${x}%`;
            pointNode.style.top = `${y}%`;
            pointNode.style.transform = 'translate(-50%, -50%)';
            pointNode.textContent = p;
            shuttleDiagramContainer.appendChild(pointNode);
            
            if (isAfter) {
                const line = document.createElement('div');
                line.className = 'absolute bg-blue-200';
                line.style.left = '50%';
                line.style.top = '50%';
                line.style.width = '40%';
                line.style.height = '2px';
                line.style.transformOrigin = '0 0';
                line.style.transform = `rotate(${angle * 180 / Math.PI}deg)`;
                shuttleDiagramContainer.insertBefore(line, centerNode);
            }
        });

        if(!isAfter) {
            const connections = [[0,3], [1,4], [2,3]];
            connections.forEach(conn => {
                const p1 = shuttleDiagramContainer.children[conn[0]+1];
                const p2 = shuttleDiagramContainer.children[conn[1]+1];
                const line = document.createElement('div');
                const p1x = parseFloat(p1.style.left);
                const p1y = parseFloat(p1.style.top);
                const p2x = parseFloat(p2.style.left);
                const p2y = parseFloat(p2.style.top);
                const angle = Math.atan2(p2y - p1y, p2x - p1x) * 180 / Math.PI;
                const length = Math.sqrt(Math.pow(p2x-p1x, 2) + Math.pow(p2y-p1y, 2));

                line.className = 'absolute bg-gray-300';
                line.style.left = `${p1x}%`;
                line.style.top = `${p1y}%`;
                line.style.width = `${length}%`;
                line.style.height = '2px';
                line.style.transformOrigin = '0 0';
                line.style.transform = `rotate(${angle}deg)`;
                shuttleDiagramContainer.insertBefore(line, shuttleDiagramContainer.firstChild);
            });
        }
    }

    beforeBtn.addEventListener('click', () => {
        createShuttleDiagram('before');
        beforeBtn.classList.add('bg-sado-blue', 'text-white');
        beforeBtn.classList.remove('bg-white', 'text-sado-blue', 'border', 'border-sado-blue');
        afterBtn.classList.add('bg-white', 'text-sado-blue', 'border', 'border-sado-blue');
        afterBtn.classList.remove('bg-sado-blue', 'text-white');
    });
    afterBtn.addEventListener('click', () => {
        createShuttleDiagram('after');
        afterBtn.classList.add('bg-sado-blue', 'text-white');
        afterBtn.classList.remove('bg-white', 'text-sado-blue', 'border', 'border-sado-blue');
        beforeBtn.classList.add('bg-white', 'text-sado-blue', 'border', 'border-sado-blue');
        beforeBtn.classList.remove('bg-sado-blue', 'text-white');
    });

    createShuttleDiagram('before');


    const targetMarketCtx = document.getElementById('targetMarketChart').getContext('2d');
    new Chart(targetMarketCtx, {
        type: 'doughnut',
        data: {
labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
            datasets: [{
                label: 'Target Market',
                data: [40, 30, 20, 10],
                backgroundColor: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'],
                borderColor: '#F5F5F4',
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: false
                }
            }
        }
    });

    const fundingCtx = document.getElementById('fundingChart').getContext('2d');
    new Chart(fundingCtx, {
        type: 'bar',
        data: {
            labels: ['Funding A', 'Funding B', 'Funding C', 'Funding D'],
                        datasets: [{
                            label: 'Funding (%)',
                            data: [45, 25, 15, 15],
                            backgroundColor: '#3B82F6',
                            borderRadius: 4
                        }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 50,
                     ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    
const roadmapData = [
    {
        phase: 'Phase 1',
        title: 'MVP Launch (2026 Q1)',
        details: 'Develop MVP; integrate GPS tracking; initial pilot launch.',
        icon: '🚀'
    },
    {
        phase: 'Phase 2',
        title: 'Expansion (2026 Q3)',
        details: 'Expand service area; onboard more users; improve features.',
        icon: '🌐'
    },
    {
        phase: 'Phase 3',
        title: 'AI Integration (2027 Q1)',
        details: 'Integrate AI for route optimization; scale operations.',
        icon: '🤖'
    }
];
    const timelineContainer = document.getElementById('roadmap-timeline');
    roadmapData.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'timeline-item relative pl-12 pb-8';
        
        itemEl.innerHTML = `
            <div class="timeline-dot bg-blue-200 text-sado-blue rounded-full flex items-center justify-center font-bold ring-8 ring-warm-gray">${item.icon}</div>
            <div class="bg-white p-4 rounded-lg shadow-md cursor-pointer roadmap-item">
                <h4 class="font-bold text-lg text-sado-blue">${item.phase}: ${item.title}</h4>
                <p class="roadmap-details hidden mt-2 text-gray-600">${item.details}</p>
            </div>
        `;
        timelineContainer.appendChild(itemEl);
    });
    
    document.querySelectorAll('.roadmap-item').forEach(item => {
        item.addEventListener('click', () => {
            item.querySelector('.roadmap-details').classList.toggle('hidden');
        });
    });
});