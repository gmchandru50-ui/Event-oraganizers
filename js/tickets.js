// ===== TICKETS MANAGEMENT =====
let ticketFilter = 'all';

function initTickets() {
  renderTicketStats();
  renderSalesChart();
  renderAttendeeTable();
}

function renderTicketStats() {
  const container = document.getElementById('ticketStatsRow');
  if (!container) return;

  const totalSold = ATTENDEES.filter(a => a.status === 'confirmed').length;
  const totalRevenue = ATTENDEES.reduce((sum, a) => sum + a.amount, 0);
  const pending = ATTENDEES.filter(a => a.status === 'pending').length;

  container.innerHTML = `
    <div class="ticket-stat-card">
      <div class="ticket-stat-label">Tickets Sold</div>
      <div class="ticket-stat-value">${totalSold * 85}</div>
      <div class="ticket-stat-change up">↑ 12% from last month</div>
    </div>
    <div class="ticket-stat-card">
      <div class="ticket-stat-label">Total Revenue</div>
      <div class="ticket-stat-value">$${(totalRevenue * 85).toLocaleString()}</div>
      <div class="ticket-stat-change up">↑ 18% from last month</div>
    </div>
    <div class="ticket-stat-card">
      <div class="ticket-stat-label">Pending Orders</div>
      <div class="ticket-stat-value">${pending * 14}</div>
      <div class="ticket-stat-change up">↓ 5% from last week</div>
    </div>
  `;
}

function renderSalesChart() {
  const container = document.getElementById('salesChart');
  if (!container) return;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const vipData = [20, 35, 25, 45, 40, 55, 30, 60, 50, 45, 65, 70];
  const genData = [50, 65, 55, 75, 70, 85, 60, 90, 80, 70, 85, 95];
  const freeData = [15, 20, 10, 25, 20, 30, 15, 35, 25, 20, 30, 40];

  container.innerHTML = months.map((m, i) => `
    <div class="bar-group">
      <div class="bar-stack">
        <div class="bar vip" style="height:${vipData[i]}%"></div>
        <div class="bar general" style="height:${genData[i]}%"></div>
        <div class="bar free" style="height:${freeData[i]}%"></div>
      </div>
      <span class="bar-label">${m}</span>
    </div>
  `).join('');
}

function renderAttendeeTable() {
  const tbody = document.getElementById('attendeeTableBody');
  if (!tbody) return;

  let attendees = ATTENDEES;
  if (ticketFilter !== 'all') {
    attendees = attendees.filter(a => a.status === ticketFilter);
  }

  tbody.innerHTML = attendees.map(a => {
    const event = getEventById(a.eventId);
    const initials = a.name.split(' ').map(n => n[0]).join('');
    const statusBadge = {
      confirmed: '<span class="badge badge-success">Confirmed</span>',
      pending: '<span class="badge badge-warning">Pending</span>',
      cancelled: '<span class="badge badge-danger">Cancelled</span>',
    };
    return `
      <tr>
        <td>
          <div class="attendee-cell">
            <div class="attendee-table-avatar">${initials}</div>
            <div>
              <div class="attendee-table-name">${a.name}</div>
              <div class="attendee-table-email">${a.email}</div>
            </div>
          </div>
        </td>
        <td>${event ? event.title.substring(0, 30) + '...' : 'Unknown'}</td>
        <td>${a.ticket}</td>
        <td>$${a.amount}</td>
        <td class="status-cell">${statusBadge[a.status]}</td>
        <td>${a.date}</td>
      </tr>
    `;
  }).join('');
}

function filterTickets(filter) {
  ticketFilter = filter;
  document.querySelectorAll('.ticket-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.filter === filter);
  });
  renderAttendeeTable();
}
