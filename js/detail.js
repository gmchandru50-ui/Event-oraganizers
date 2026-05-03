// ===== EVENT DETAIL =====
let selectedTicket = 0;
let ticketQty = 1;

function initDetail(eventId) {
  const event = getEventById(eventId);
  if (!event) {
    window.location.hash = 'events';
    return;
  }
  selectedTicket = 0;
  ticketQty = 1;
  renderDetail(event);
}

function renderDetail(event) {
  const section = document.getElementById('page-detail');
  if (!section) return;

  section.innerHTML = `
    <!-- Hero -->
    <div class="detail-hero">
      <img src="${event.image}" alt="${event.title}">
      <div class="detail-hero-overlay">
        <button class="detail-back-btn" onclick="window.location.hash='events'">← Back to Events</button>
        <div class="detail-hero-badges">
          <span class="badge badge-primary">${CATEGORIES.find(c => c.id === event.category)?.icon || ''} ${event.category}</span>
          <span class="badge badge-success">● ${event.status}</span>
        </div>
        <h1 class="detail-hero-title">${event.title}</h1>
        <div class="detail-hero-meta">
          <span>📅 ${formatDate(event.date)}${event.endDate !== event.date ? ' — ' + formatDate(event.endDate) : ''}</span>
          <span>📍 ${event.city}</span>
          <span>👥 ${formatNumber(event.registered)} registered</span>
        </div>
      </div>
    </div>

    <!-- Info Cards -->
    <div class="detail-info-grid">
      <div class="detail-info-card">
        <div class="detail-info-icon">📅</div>
        <div>
          <div class="detail-info-label">Date & Time</div>
          <div class="detail-info-value">${formatDate(event.date)}, ${event.time}</div>
        </div>
      </div>
      <div class="detail-info-card">
        <div class="detail-info-icon">📍</div>
        <div>
          <div class="detail-info-label">Location</div>
          <div class="detail-info-value">${event.venue}</div>
        </div>
      </div>
      <div class="detail-info-card">
        <div class="detail-info-icon">👥</div>
        <div>
          <div class="detail-info-label">Capacity</div>
          <div class="detail-info-value">${event.registered.toLocaleString()} / ${event.capacity.toLocaleString()}</div>
        </div>
      </div>
      <div class="detail-info-card">
        <div class="detail-info-icon">💰</div>
        <div>
          <div class="detail-info-label">Price Range</div>
          <div class="detail-info-value">$${event.price} — $${event.maxPrice}</div>
        </div>
      </div>
    </div>

    <!-- Content Layout -->
    <div class="detail-layout">
      <div class="detail-main">
        <!-- Description -->
        <div class="detail-section">
          <h2 class="detail-section-title">📝 About This Event</h2>
          <p class="detail-description">${event.description}</p>
        </div>

        <!-- Speakers -->
        <div class="detail-section">
          <h2 class="detail-section-title">🎤 ${event.category === 'music' ? 'Performers' : 'Speakers'}</h2>
          <div class="speakers-grid">
            ${event.speakers.map(s => `
              <div class="speaker-card">
                <div class="speaker-avatar">${s.avatar}</div>
                <div class="speaker-name">${s.name}</div>
                <div class="speaker-role">${s.role}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Ticket Sidebar -->
      <div class="ticket-sidebar">
        <div class="ticket-selection-card">
          <h3 class="ticket-selection-title">🎟️ Select Tickets</h3>
          ${event.tickets.map((t, i) => `
            <div class="ticket-option ${i === selectedTicket ? 'selected' : ''}" onclick="selectTicketOption(${i}, ${event.id})">
              <div class="ticket-option-header">
                <span class="ticket-option-name">${t.name}</span>
                <span class="ticket-option-price">${formatPrice(t.price)}</span>
              </div>
              <div class="ticket-option-desc">${t.available} of ${t.total} available</div>
              <div class="ticket-option-avail">● ${t.available > 100 ? 'Available' : t.available > 0 ? 'Limited' : 'Sold Out'}</div>
            </div>
          `).join('')}

          <div class="ticket-quantity">
            <button class="qty-btn" onclick="changeQty(-1, ${event.id})">−</button>
            <span class="qty-value" id="qtyValue">${ticketQty}</span>
            <button class="qty-btn" onclick="changeQty(1, ${event.id})">+</button>
          </div>

          <div class="ticket-total">
            <span class="ticket-total-label">Total</span>
            <span class="ticket-total-price" id="totalPrice">$${event.tickets[selectedTicket].price * ticketQty}</span>
          </div>

          <button class="register-btn" onclick="handleRegister(${event.id})">
            Register Now
          </button>
        </div>

        <!-- Organizer -->
        <div class="organizer-card">
          <div class="organizer-avatar">${event.organizer.avatar}</div>
          <div>
            <div class="organizer-name">${event.organizer.name}</div>
            <div class="organizer-events">${event.organizer.events} events hosted</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectTicketOption(index, eventId) {
  selectedTicket = index;
  const event = getEventById(eventId);
  if (!event) return;

  document.querySelectorAll('.ticket-option').forEach((el, i) => {
    el.classList.toggle('selected', i === index);
  });
  updateTotal(event);
}

function changeQty(delta, eventId) {
  ticketQty = Math.max(1, Math.min(10, ticketQty + delta));
  document.getElementById('qtyValue').textContent = ticketQty;
  const event = getEventById(eventId);
  if (event) updateTotal(event);
}

function updateTotal(event) {
  const price = event.tickets[selectedTicket].price * ticketQty;
  document.getElementById('totalPrice').textContent = `$${price.toLocaleString()}`;
}

function handleRegister(eventId) {
  const event = getEventById(eventId);
  if (!event) return;
  const ticket = event.tickets[selectedTicket];
  showToast(`Successfully registered for ${event.title} — ${ticket.name} × ${ticketQty}`, 'success');
}
