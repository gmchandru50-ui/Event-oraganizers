// ===== EVENT CREATION WIZARD =====
let wizardStep = 1;
const MAX_STEPS = 4;
let eventDraft = { title: '', description: '', category: 'music', date: '', time: '', venue: '', city: '', isOnline: false, tickets: [{ name: 'General Admission', price: 0, quantity: 100 }] };

function initCreateWizard() {
  wizardStep = 1;
  eventDraft = { title: '', description: '', category: 'music', date: '', time: '', venue: '', city: '', isOnline: false, tickets: [{ name: 'General Admission', price: 0, quantity: 100 }] };
  updateWizardUI();
  setupWizardListeners();
}

function updateWizardUI() {
  // Update step indicators
  document.querySelectorAll('.wizard-step').forEach((step, i) => {
    step.classList.remove('active', 'completed');
    if (i + 1 === wizardStep) step.classList.add('active');
    else if (i + 1 < wizardStep) step.classList.add('completed');
  });

  // Show current step content
  document.querySelectorAll('.wizard-step-content').forEach(c => c.classList.remove('active'));
  const current = document.getElementById(`wizardStep${wizardStep}`);
  if (current) current.classList.add('active');

  // Update buttons
  const prevBtn = document.getElementById('wizardPrev');
  const nextBtn = document.getElementById('wizardNext');
  if (prevBtn) prevBtn.style.visibility = wizardStep === 1 ? 'hidden' : 'visible';
  if (nextBtn) {
    nextBtn.textContent = wizardStep === MAX_STEPS ? '🎉 Publish Event' : 'Continue →';
    nextBtn.className = wizardStep === MAX_STEPS ? 'btn btn-accent btn-lg' : 'btn btn-primary';
  }

  updatePreview();
}

function setupWizardListeners() {
  // Live preview updates
  const fields = ['eventTitle', 'eventDescription', 'eventCategory', 'eventDate', 'eventTime', 'eventVenue', 'eventCity'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        eventDraft[id.replace('event', '').toLowerCase()] = el.value;
        updatePreview();
      });
    }
  });

  // Online toggle
  const toggle = document.getElementById('onlineToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      eventDraft.isOnline = !eventDraft.isOnline;
      toggle.classList.toggle('active');
    });
  }
}

function nextStep() {
  // Validate current step
  if (wizardStep === 1) {
    const title = document.getElementById('eventTitle')?.value?.trim();
    if (!title) {
      showToast('Please enter an event title', 'error');
      document.getElementById('eventTitle')?.focus();
      return;
    }
    eventDraft.title = title;
    eventDraft.description = document.getElementById('eventDescription')?.value || '';
    eventDraft.category = document.getElementById('eventCategory')?.value || 'music';
  }
  if (wizardStep === 2) {
    const date = document.getElementById('eventDate')?.value;
    if (!date) {
      showToast('Please select a date', 'error');
      return;
    }
    eventDraft.date = date;
    eventDraft.time = document.getElementById('eventTime')?.value || '09:00';
    eventDraft.venue = document.getElementById('eventVenue')?.value || '';
    eventDraft.city = document.getElementById('eventCity')?.value || '';
  }
  if (wizardStep === 3) {
    collectTicketTiers();
  }

  if (wizardStep < MAX_STEPS) {
    wizardStep++;
    updateWizardUI();
  } else {
    publishEvent();
  }
}

function prevStep() {
  if (wizardStep > 1) {
    wizardStep--;
    updateWizardUI();
  }
}

function updatePreview() {
  const title = document.getElementById('previewTitle');
  const date = document.getElementById('previewDate');
  const location = document.getElementById('previewLocation');
  const price = document.getElementById('previewPrice');

  if (title) title.textContent = eventDraft.title || 'Event Title';
  if (date) date.textContent = eventDraft.date ? formatDate(eventDraft.date) : 'Select a date';
  if (location) location.textContent = eventDraft.venue || eventDraft.city || 'Add a venue';
  if (price) {
    const p = eventDraft.tickets[0]?.price || 0;
    price.textContent = p > 0 ? `$${p}` : 'Free';
  }
}

function collectTicketTiers() {
  const tiers = document.querySelectorAll('#ticketTiers .ticket-tier');
  eventDraft.tickets = [];
  tiers.forEach(tier => {
    const inputs = tier.querySelectorAll('.form-input');
    const name = inputs[0]?.value || 'General';
    const price = parseFloat(inputs[1]?.value) || 0;
    const qty = parseInt(inputs[2]?.value) || 100;
    eventDraft.tickets.push({ name, price, quantity: qty });
  });
  if (eventDraft.tickets.length === 0) {
    eventDraft.tickets.push({ name: 'General Admission', price: 0, quantity: 100 });
  }
}

function addTicketTier() {
  const container = document.getElementById('ticketTiers');
  if (!container) return;

  const idx = container.querySelectorAll('.ticket-tier').length;
  const tier = document.createElement('div');
  tier.className = 'ticket-tier';
  tier.innerHTML = `
    <div class="ticket-tier-header">
      <span class="ticket-tier-name">Tier ${idx + 1}</span>
      <button class="remove-tier-btn" onclick="this.closest('.ticket-tier').remove()">✕</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Tier Name</label>
        <input type="text" class="form-input" placeholder="e.g. VIP Pass">
      </div>
      <div class="form-group">
        <label class="form-label">Price ($)</label>
        <input type="number" class="form-input" placeholder="0" min="0">
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Quantity Available</label>
      <input type="number" class="form-input" placeholder="100" min="1">
    </div>
  `;
  const addBtn = container.querySelector('.add-tier-btn');
  container.insertBefore(tier, addBtn);
}

function publishEvent() {
  // Collect final data from all steps
  eventDraft.title = document.getElementById('eventTitle')?.value?.trim() || eventDraft.title;
  eventDraft.description = document.getElementById('eventDescription')?.value || eventDraft.description;
  eventDraft.category = document.getElementById('eventCategory')?.value || eventDraft.category;
  eventDraft.date = document.getElementById('eventDate')?.value || eventDraft.date;
  eventDraft.time = document.getElementById('eventTime')?.value || eventDraft.time || '09:00';
  eventDraft.venue = document.getElementById('eventVenue')?.value || eventDraft.venue;
  eventDraft.city = document.getElementById('eventCity')?.value || eventDraft.city;
  collectTicketTiers();

  if (!eventDraft.title) {
    showToast('Please enter an event title before publishing', 'error');
    return;
  }

  // Pick a random existing image based on category
  const catImages = {
    music: 'assets/music-festival.png',
    tech: 'assets/tech-conference.png',
    art: 'assets/art-gallery.png',
    food: 'assets/food-festival.png',
    sports: 'assets/sports-marathon.png',
    business: 'assets/business-summit.png',
  };

  // Build the new event object
  const newId = EVENTS.length > 0 ? Math.max(...EVENTS.map(e => e.id)) + 1 : 1;
  const totalCapacity = eventDraft.tickets.reduce((sum, t) => sum + (t.quantity || 100), 0);
  const minPrice = Math.min(...eventDraft.tickets.map(t => t.price || 0));
  const maxPrice = Math.max(...eventDraft.tickets.map(t => t.price || 0));
  const initials = eventDraft.title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  const newEvent = {
    id: newId,
    title: eventDraft.title,
    description: eventDraft.description || 'An exciting upcoming event. Stay tuned for more details!',
    category: eventDraft.category,
    date: eventDraft.date || new Date().toISOString().split('T')[0],
    time: eventDraft.time,
    endDate: eventDraft.date || new Date().toISOString().split('T')[0],
    venue: eventDraft.venue || (eventDraft.isOnline ? 'Online Event' : 'TBD'),
    city: eventDraft.city || (eventDraft.isOnline ? 'Virtual' : 'TBD'),
    image: catImages[eventDraft.category] || 'assets/tech-conference.png',
    price: minPrice,
    maxPrice: maxPrice || minPrice,
    capacity: totalCapacity,
    registered: 0,
    status: 'active',
    featured: false,
    isUserCreated: true,
    organizer: {
      name: userProfile.name,
      avatar: userProfile.name.split(' ').map(w => w[0]).join('').toUpperCase(),
      events: EVENTS.filter(e => e.isUserCreated).length + 1
    },
    tickets: eventDraft.tickets.map(t => ({
      name: t.name,
      price: t.price || 0,
      available: t.quantity || 100,
      total: t.quantity || 100
    })),
    speakers: []
  };

  // Push to the global EVENTS array
  EVENTS.unshift(newEvent);

  // Add activity
  ACTIVITY.unshift({
    text: `<strong>${eventDraft.title}</strong> was just published!`,
    time: 'Just now',
    type: 'success'
  });

  // Update sidebar badge
  const badge = document.querySelector('.nav-item[data-page="events"] .nav-badge');
  if (badge) badge.textContent = EVENTS.length;

  showToast(`🎉 "${eventDraft.title}" published successfully!`, 'success');

  // Navigate to events page to see the new event
  setTimeout(() => {
    window.location.hash = 'events';
  }, 1500);
}
