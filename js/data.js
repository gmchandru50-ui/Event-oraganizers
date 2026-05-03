// ===== MOCK DATA =====
const CATEGORIES = [
  { id: 'all', name: 'All Events', icon: '🎯' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'tech', name: 'Technology', icon: '💻' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'art', name: 'Art & Culture', icon: '🎨' },
  { id: 'food', name: 'Food & Drink', icon: '🍕' },
  { id: 'business', name: 'Business', icon: '💼' },
];

const EVENTS = [
  {
    id: 1,
    title: 'Eclipse Music Festival 2026',
    description: 'Experience the ultimate outdoor music festival featuring world-renowned artists, stunning visual productions, and an unforgettable atmosphere. Three stages, gourmet food vendors, and art installations.',
    category: 'music',
    date: '2026-06-15',
    time: '16:00',
    endDate: '2026-06-17',
    venue: 'Sunset Valley Amphitheatre',
    city: 'Los Angeles, CA',
    image: 'assets/music-festival.png',
    price: 149,
    maxPrice: 399,
    capacity: 15000,
    registered: 11247,
    status: 'active',
    featured: true,
    organizer: { name: 'LiveNation Events', avatar: 'LN', events: 48 },
    tickets: [
      { name: 'General Admission', price: 149, available: 3753, total: 10000 },
      { name: 'VIP Experience', price: 299, available: 421, total: 3000 },
      { name: 'Backstage Pass', price: 399, available: 87, total: 2000 }
    ],
    speakers: [
      { name: 'DJ Aurora', role: 'Headliner', avatar: 'DA' },
      { name: 'The Resonance', role: 'Main Stage', avatar: 'TR' },
      { name: 'Luna Wave', role: 'Electronic Stage', avatar: 'LW' },
      { name: 'Cosmic Drift', role: 'Sunset Stage', avatar: 'CD' }
    ]
  },
  {
    id: 2,
    title: 'TechNovate 2026 — AI & Innovation Summit',
    description: 'Join 5,000+ tech leaders, innovators, and entrepreneurs for the premier AI & Innovation Summit. Keynotes, workshops, hackathons, and unparalleled networking.',
    category: 'tech',
    date: '2026-07-20',
    time: '09:00',
    endDate: '2026-07-22',
    venue: 'Bay Convention Center',
    city: 'San Francisco, CA',
    image: 'assets/tech-conference.png',
    price: 299,
    maxPrice: 899,
    capacity: 5000,
    registered: 3842,
    status: 'active',
    featured: true,
    organizer: { name: 'InnovateTech Group', avatar: 'IT', events: 32 },
    tickets: [
      { name: 'Standard Pass', price: 299, available: 1158, total: 3000 },
      { name: 'Premium Pass', price: 599, available: 380, total: 1500 },
      { name: 'Executive Pass', price: 899, available: 62, total: 500 }
    ],
    speakers: [
      { name: 'Dr. Sarah Chen', role: 'Keynote Speaker', avatar: 'SC' },
      { name: 'James Rodriguez', role: 'AI Workshop Lead', avatar: 'JR' },
      { name: 'Priya Patel', role: 'Innovation Panel', avatar: 'PP' },
      { name: 'Marcus Webb', role: 'Tech Demo', avatar: 'MW' }
    ]
  },
  {
    id: 3,
    title: 'Contemporary Visions Art Exhibition',
    description: 'A curated showcase of contemporary art featuring 40+ artists from around the world. Opening night gala with wine reception, artist talks, and live performances.',
    category: 'art',
    date: '2026-08-05',
    time: '18:00',
    endDate: '2026-08-05',
    venue: 'Metropolitan Gallery',
    city: 'New York, NY',
    image: 'assets/art-gallery.png',
    price: 45,
    maxPrice: 120,
    capacity: 800,
    registered: 634,
    status: 'active',
    featured: false,
    organizer: { name: 'ArtSpace Collective', avatar: 'AC', events: 15 },
    tickets: [
      { name: 'General Entry', price: 45, available: 166, total: 500 },
      { name: 'VIP Gala', price: 120, available: 78, total: 300 }
    ],
    speakers: [
      { name: 'Elena Moretti', role: 'Featured Artist', avatar: 'EM' },
      { name: 'Kai Tanaka', role: 'Sculptor', avatar: 'KT' },
      { name: 'Amara Osei', role: 'Digital Artist', avatar: 'AO' }
    ]
  },
  {
    id: 4,
    title: 'Global Flavors Food Festival',
    description: 'A culinary celebration featuring 80+ food vendors from 30 cuisines. Live cooking demos, chef battles, tastings, and family-friendly activities.',
    category: 'food',
    date: '2026-09-10',
    time: '11:00',
    endDate: '2026-09-12',
    venue: 'Riverside Park',
    city: 'Chicago, IL',
    image: 'assets/food-festival.png',
    price: 25,
    maxPrice: 75,
    capacity: 20000,
    registered: 14563,
    status: 'active',
    featured: true,
    organizer: { name: 'FeastWorks Inc.', avatar: 'FW', events: 22 },
    tickets: [
      { name: 'Day Pass', price: 25, available: 5437, total: 15000 },
      { name: 'Weekend Pass', price: 55, available: 1890, total: 4000 },
      { name: 'VIP Tasting', price: 75, available: 210, total: 1000 }
    ],
    speakers: [
      { name: 'Chef Marco', role: 'Celebrity Chef', avatar: 'CM' },
      { name: 'Yuki Sato', role: 'Sushi Master', avatar: 'YS' },
      { name: 'Rosa Alvarez', role: 'Pastry Chef', avatar: 'RA' }
    ]
  },
  {
    id: 5,
    title: 'City Marathon 2026',
    description: 'Run through iconic city landmarks in this annual marathon featuring 5K, 10K, half-marathon, and full marathon categories. Professional timing, hydration stations, and after-party.',
    category: 'sports',
    date: '2026-10-18',
    time: '06:00',
    endDate: '2026-10-18',
    venue: 'Downtown Start Line',
    city: 'Boston, MA',
    image: 'assets/sports-marathon.png',
    price: 50,
    maxPrice: 120,
    capacity: 30000,
    registered: 22451,
    status: 'active',
    featured: false,
    organizer: { name: 'RunCity Athletics', avatar: 'RC', events: 12 },
    tickets: [
      { name: '5K Run', price: 50, available: 4549, total: 10000 },
      { name: 'Half Marathon', price: 85, available: 3200, total: 12000 },
      { name: 'Full Marathon', price: 120, available: 1800, total: 8000 }
    ],
    speakers: [
      { name: 'Coach Davis', role: 'Head Coach', avatar: 'CD' },
      { name: 'Maria Santos', role: 'Olympic Runner', avatar: 'MS' }
    ]
  },
  {
    id: 6,
    title: 'Global Innovation Forum 2026',
    description: 'An exclusive business summit bringing together C-suite executives, investors, and thought leaders. Roundtable discussions, deal-making, and luxury networking.',
    category: 'business',
    date: '2026-11-08',
    time: '08:30',
    endDate: '2026-11-09',
    venue: 'The Grand Hotel Conference Center',
    city: 'London, UK',
    image: 'assets/business-summit.png',
    price: 499,
    maxPrice: 1499,
    capacity: 1200,
    registered: 987,
    status: 'active',
    featured: true,
    organizer: { name: 'Global Forums Ltd.', avatar: 'GF', events: 56 },
    tickets: [
      { name: 'Conference Pass', price: 499, available: 213, total: 800 },
      { name: 'Executive Suite', price: 999, available: 68, total: 300 },
      { name: 'Platinum Circle', price: 1499, available: 12, total: 100 }
    ],
    speakers: [
      { name: 'Richard Blackwell', role: 'Keynote Speaker', avatar: 'RB' },
      { name: 'Dr. Aisha Khan', role: 'Sustainability Panel', avatar: 'AK' },
      { name: 'Tom Nakamura', role: 'Investor Spotlight', avatar: 'TN' },
      { name: 'Claire Dubois', role: 'Fireside Chat', avatar: 'CL' }
    ]
  }
];

const ATTENDEES = [
  { id: 1, name: 'Emma Thompson', email: 'emma.t@email.com', eventId: 1, ticket: 'VIP Experience', date: '2026-05-01', status: 'confirmed', amount: 299 },
  { id: 2, name: 'Liam Chen', email: 'liam.c@email.com', eventId: 2, ticket: 'Premium Pass', date: '2026-05-01', status: 'confirmed', amount: 599 },
  { id: 3, name: 'Sophia Patel', email: 'sophia.p@email.com', eventId: 1, ticket: 'General Admission', date: '2026-04-30', status: 'confirmed', amount: 149 },
  { id: 4, name: 'Noah Williams', email: 'noah.w@email.com', eventId: 4, ticket: 'Weekend Pass', date: '2026-04-30', status: 'pending', amount: 55 },
  { id: 5, name: 'Olivia Garcia', email: 'olivia.g@email.com', eventId: 3, ticket: 'VIP Gala', date: '2026-04-29', status: 'confirmed', amount: 120 },
  { id: 6, name: 'James Brown', email: 'james.b@email.com', eventId: 6, ticket: 'Executive Suite', date: '2026-04-29', status: 'confirmed', amount: 999 },
  { id: 7, name: 'Ava Martinez', email: 'ava.m@email.com', eventId: 5, ticket: 'Full Marathon', date: '2026-04-28', status: 'confirmed', amount: 120 },
  { id: 8, name: 'Ethan Kim', email: 'ethan.k@email.com', eventId: 2, ticket: 'Standard Pass', date: '2026-04-28', status: 'cancelled', amount: 299 },
  { id: 9, name: 'Isabella Lee', email: 'isabella.l@email.com', eventId: 1, ticket: 'Backstage Pass', date: '2026-04-27', status: 'confirmed', amount: 399 },
  { id: 10, name: 'Alexander Davis', email: 'alex.d@email.com', eventId: 6, ticket: 'Platinum Circle', date: '2026-04-27', status: 'confirmed', amount: 1499 },
  { id: 11, name: 'Mia Johnson', email: 'mia.j@email.com', eventId: 4, ticket: 'VIP Tasting', date: '2026-04-26', status: 'confirmed', amount: 75 },
  { id: 12, name: 'Benjamin Wilson', email: 'ben.w@email.com', eventId: 2, ticket: 'Executive Pass', date: '2026-04-26', status: 'pending', amount: 899 },
];

const ACTIVITY = [
  { text: '<strong>Emma Thompson</strong> registered for Eclipse Music Festival', time: '2 min ago', type: 'primary' },
  { text: '<strong>12 new tickets</strong> sold for TechNovate Summit', time: '15 min ago', type: 'success' },
  { text: '<strong>Global Flavors</strong> Food Festival hit 70% capacity', time: '1 hour ago', type: 'warning' },
  { text: '<strong>City Marathon</strong> registration deadline extended', time: '2 hours ago', type: 'accent' },
  { text: '<strong>$4,200</strong> in revenue from Innovation Forum', time: '3 hours ago', type: 'success' },
  { text: '<strong>VIP passes</strong> for Art Exhibition nearly sold out', time: '5 hours ago', type: 'warning' },
];

// ===== HELPER FUNCTIONS =====
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return { month: d.toLocaleDateString('en-US', { month: 'short' }), day: d.getDate() };
}

function formatPrice(price) {
  return price === 0 ? 'Free' : `$${price.toLocaleString()}`;
}

function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function getEventById(id) {
  return EVENTS.find(e => e.id === parseInt(id));
}

function getEventsByCategory(category) {
  if (category === 'all') return EVENTS;
  return EVENTS.filter(e => e.category === category);
}

function searchEvents(query) {
  const q = query.toLowerCase();
  return EVENTS.filter(e =>
    e.title.toLowerCase().includes(q) ||
    e.city.toLowerCase().includes(q) ||
    e.category.toLowerCase().includes(q)
  );
}

function getTotalStats() {
  return {
    totalEvents: EVENTS.length,
    totalAttendees: EVENTS.reduce((sum, e) => sum + e.registered, 0),
    totalRevenue: ATTENDEES.reduce((sum, a) => sum + a.amount, 0) * 85,
    upcoming: EVENTS.filter(e => new Date(e.date) > new Date()).length,
  };
}
