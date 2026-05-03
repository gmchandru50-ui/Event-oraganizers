// ===== APP ROUTER & SHELL =====
let currentPage = 'dashboard';

// ===== USER PROFILE =====
let userProfile = {
  name: 'Jordan Davis',
  email: 'jordan.davis@eventhub.com',
  role: 'Event Organizer',
  phone: '+1 (555) 234-5678',
  company: 'EventHub Pro',
  bio: 'Passionate event organizer with 5+ years of experience creating unforgettable experiences.',
  location: 'San Francisco, CA'
};

function initApp() {
  setupRouter();
  setupSidebar();
  setupHeader();
  setupProfileModal();
  navigateFromHash();
}

function setupRouter() {
  window.addEventListener('hashchange', navigateFromHash);
}

function navigateFromHash() {
  const hash = window.location.hash.slice(1) || 'dashboard';
  const parts = hash.split('/');
  const page = parts[0];
  const param = parts[1];

  navigateTo(page, param);
}

function navigateTo(page, param) {
  currentPage = page;

  // Hide all sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  // Update nav
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page === 'detail' ? 'events' : page}"]`);
  if (navItem) navItem.classList.add('active');

  // Update header title
  const titles = {
    dashboard: 'Dashboard',
    events: 'Discover Events',
    create: 'Create Event',
    detail: 'Event Details',
    tickets: 'Ticket Management'
  };
  const headerTitle = document.getElementById('pageTitle');
  if (headerTitle) headerTitle.textContent = titles[page] || 'Dashboard';

  // Show section and init
  const section = document.getElementById(`page-${page}`);
  if (section) {
    section.classList.add('active');
  }

  switch (page) {
    case 'dashboard': initDashboard(); break;
    case 'events': initEvents(); break;
    case 'create': initCreateWizard(); break;
    case 'detail': initDetail(param); break;
    case 'tickets': initTickets(); break;
    default: initDashboard();
  }

  // Close mobile sidebar
  document.querySelector('.sidebar')?.classList.remove('open');
  window.scrollTo(0, 0);
}

function setupSidebar() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      window.location.hash = page;
    });
  });
}

function setupHeader() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar on outside click
  document.addEventListener('click', (e) => {
    if (sidebar?.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !menuToggle?.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ===== PROFILE MODAL =====
function setupProfileModal() {
  const profileBtn = document.getElementById('userProfileBtn');
  if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProfileModal();
    });
  }
}

function openProfileModal() {
  const overlay = document.getElementById('profileModal');
  if (!overlay) return;

  // Populate fields
  document.getElementById('profileName').value = userProfile.name;
  document.getElementById('profileEmail').value = userProfile.email;
  document.getElementById('profilePhone').value = userProfile.phone;
  document.getElementById('profileCompany').value = userProfile.company;
  document.getElementById('profileLocation').value = userProfile.location;
  document.getElementById('profileBio').value = userProfile.bio;

  // Update avatar preview
  const initials = userProfile.name.split(' ').map(w => w[0]).join('').toUpperCase();
  document.getElementById('profileAvatarPreview').textContent = initials;
  document.getElementById('profileNamePreview').textContent = userProfile.name;
  document.getElementById('profileRolePreview').textContent = userProfile.role;

  // Show my events count
  const myEventsCount = EVENTS.filter(e => e.isUserCreated).length;
  document.getElementById('profileEventsCount').textContent = myEventsCount;
  document.getElementById('profileTotalEvents').textContent = EVENTS.length;

  overlay.classList.add('active');
}

function closeProfileModal() {
  document.getElementById('profileModal')?.classList.remove('active');
}

function saveProfile() {
  const name = document.getElementById('profileName')?.value?.trim();
  const email = document.getElementById('profileEmail')?.value?.trim();

  if (!name) {
    showToast('Name is required', 'error');
    return;
  }
  if (!email) {
    showToast('Email is required', 'error');
    return;
  }

  userProfile.name = name;
  userProfile.email = email;
  userProfile.phone = document.getElementById('profilePhone')?.value || '';
  userProfile.company = document.getElementById('profileCompany')?.value || '';
  userProfile.location = document.getElementById('profileLocation')?.value || '';
  userProfile.bio = document.getElementById('profileBio')?.value || '';

  // Update sidebar display
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase();
  const sidebarAvatar = document.querySelector('.sidebar .user-avatar');
  const sidebarName = document.querySelector('.sidebar .user-name');
  if (sidebarAvatar) sidebarAvatar.textContent = initials;
  if (sidebarName) sidebarName.textContent = name;

  // Update dashboard greeting
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) greeting.textContent = `Good morning, ${name.split(' ')[0]} 👋`;

  closeProfileModal();
  showToast('✅ Profile updated successfully!', 'success');
}

// ===== TOAST SYSTEM =====
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-message">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
