// ===== DASHBOARD =====
function initDashboard() {
  renderStats();
  renderUpcomingEvents();
  renderActivityFeed();
  renderMiniChart();
}

function renderStats() {
  const stats = getTotalStats();
  const items = [
    { label: 'Total Events', value: stats.totalEvents, icon: '📅', trend: '+3', up: true },
    { label: 'Attendees', value: formatNumber(stats.totalAttendees), icon: '👥', trend: '+12%', up: true },
    { label: 'Revenue', value: '$' + formatNumber(stats.totalRevenue), icon: '💰', trend: '+18%', up: true },
    { label: 'Upcoming', value: stats.upcoming, icon: '🚀', trend: 'This month', up: true },
  ];

  const grid = document.getElementById('statsGrid');
  if (!grid) return;
  grid.innerHTML = items.map((s, i) => `
    <div class="stat-card animate-in animate-delay-${i + 1}">
      <div class="stat-header">
        <div class="stat-icon">${s.icon}</div>
        <span class="stat-trend up">↑ ${s.trend}</span>
      </div>
      <div class="stat-value" data-count="${s.value}">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  // Animate counters
  animateCounters();
}

function animateCounters() {
  document.querySelectorAll('.stat-value[data-count]').forEach(el => {
    const raw = el.dataset.count;
    const isFormatted = raw.includes('$') || raw.includes('K');
    if (isFormatted) return; // Skip formatted values

    const target = parseInt(raw);
    if (isNaN(target)) return;

    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 30);
  });
}

function renderUpcomingEvents() {
  const container = document.getElementById('upcomingEvents');
  if (!container) return;

  const upcoming = EVENTS.slice(0, 5);
  container.innerHTML = upcoming.map(event => {
    const d = formatDateShort(event.date);
    const pct = Math.round((event.registered / event.capacity) * 100);
    return `
      <div class="upcoming-event-item" onclick="window.location.hash='detail/${event.id}'">
        <div class="event-date-badge">
          <span class="event-date-month">${d.month}</span>
          <span class="event-date-day">${d.day}</span>
        </div>
        <div class="event-info">
          <div class="event-info-title">${event.title}</div>
          <div class="event-info-meta">
            <span>📍 ${event.city}</span>
            <span>👥 ${formatNumber(event.registered)}</span>
          </div>
        </div>
        <div class="badge ${pct > 80 ? 'badge-warning' : 'badge-primary'}">${pct}%</div>
      </div>
    `;
  }).join('');
}

function renderActivityFeed() {
  const container = document.getElementById('activityFeed');
  if (!container) return;

  container.innerHTML = ACTIVITY.map(a => `
    <div class="activity-item">
      <div class="activity-dot ${a.type}"></div>
      <div>
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

function renderMiniChart() {
  const container = document.getElementById('miniChart');
  if (!container) return;

  const values = [35, 55, 40, 70, 60, 85, 45, 90, 65, 50, 75, 80];
  container.innerHTML = values.map(v =>
    `<div class="mini-chart-bar" style="height:${v}%" title="${v}%"></div>`
  ).join('');
}
