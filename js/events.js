// ===== EVENTS DISCOVERY =====
let activeCategory = 'all';
let searchQuery = '';

function initEvents() {
  renderCategoryChips();
  renderEventCards();
  setupEventSearch();
}

function renderCategoryChips() {
  const container = document.getElementById('categoryChips');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-chip ${cat.id === activeCategory ? 'active' : ''}"
            data-category="${cat.id}"
            onclick="filterByCategory('${cat.id}')">
      <span class="chip-icon">${cat.icon}</span>
      ${cat.name}
    </button>
  `).join('');
}

function filterByCategory(catId) {
  activeCategory = catId;
  renderCategoryChips();
  renderEventCards();
}

function setupEventSearch() {
  const input = document.getElementById('eventSearchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderEventCards();
  });
}

function renderEventCards() {
  const container = document.getElementById('eventsGrid');
  if (!container) return;

  let events = activeCategory === 'all' ? EVENTS : getEventsByCategory(activeCategory);
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    events = events.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.city.toLowerCase().includes(q)
    );
  }

  if (events.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>No events found</h3>
        <p>Try adjusting your search or filters</p>
      </div>`;
    return;
  }

  container.innerHTML = events.map((event, i) => {
    const pct = Math.round((event.registered / event.capacity) * 100);
    return `
      <div class="event-card animate-in animate-delay-${(i % 4) + 1}" onclick="window.location.hash='detail/${event.id}'">
        <div class="event-card-image">
          <img src="${event.image}" alt="${event.title}" loading="lazy">
          <div class="event-card-overlay">
            <span class="event-card-category">${CATEGORIES.find(c => c.id === event.category)?.icon || ''} ${event.category}</span>
            <span class="event-card-price">${event.price === 0 ? 'Free' : 'From $' + event.price}</span>
          </div>
        </div>
        <div class="event-card-body">
          <div class="event-card-date">📅 ${formatDate(event.date)}</div>
          <h3 class="event-card-title">${event.title}</h3>
          <div class="event-card-location">📍 ${event.venue}, ${event.city}</div>
          <div class="event-card-footer">
            <div class="event-card-attendees">
              <div style="display:flex">
                ${['A','B','C'].map((l, j) => `<div class="attendee-avatar" style="margin-left:${j > 0 ? '-8px' : '0'};background:hsl(${220 + j * 40},60%,50%)">${l}</div>`).join('')}
              </div>
              <span class="event-card-attendees-count">${formatNumber(event.registered)} going</span>
            </div>
            <span class="event-card-action">View →</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
