
/* ══════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════ */
function showToast(msg, type='info') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast ${type === 'success' ? 'success' : type === 'error' ? 'error' : ''}`;
  t.innerHTML = (type==='success'?'✅ ':type==='error'?'❌ ':'ℹ️ ') + msg;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3000);
}

/* ══════════════════════════════════════
   COUNTDOWN TIMER
══════════════════════════════════════ */
const weddingDate = new Date('2027-02-25T00:00:00');
function updateCountdown() {
  const now = new Date();
  let diff = weddingDate - now;
  if (diff < 0) {
    document.getElementById('countdown').innerHTML = '<p style="font-family:var(--serif);font-size:1.2rem;color:var(--rose-dk);">🎉 The wedding has happened!</p>';
    return;
  }
  const d = Math.floor(diff / 86400000); diff %= 86400000;
  const h = Math.floor(diff / 3600000); diff %= 3600000;
  const m = Math.floor(diff / 60000); diff %= 60000;
  const s = Math.floor(diff / 1000);
  document.getElementById('cdDays').textContent  = String(d).padStart(2,'0');
  document.getElementById('cdHours').textContent = String(h).padStart(2,'0');
  document.getElementById('cdMins').textContent  = String(m).padStart(2,'0');
  document.getElementById('cdSecs').textContent  = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ══════════════════════════════════════
   ANIMATED STAT COUNTERS
══════════════════════════════════════ */
function animateCounter(el, target, suffix='') {
  let start = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start.toLocaleString() + suffix;
    if (start >= target) clearInterval(timer);
  }, 25);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const t = parseInt(el.dataset.target);
        const suffix = t === 98 ? '%' : t > 999 ? '+' : '+';
        animateCounter(el, t, suffix);
        delete el.dataset.target;
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
statsObserver.observe(document.querySelector('.stats-bar'));

/* ══════════════════════════════════════
   SCROLL FADE-UP ANIMATIONS
══════════════════════════════════════ */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ══════════════════════════════════════
   ACTIVE NAV HIGHLIGHT ON SCROLL
══════════════════════════════════════ */
const sections = document.querySelectorAll('section[id], div[id="cta"]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#'+current); });
});

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
function toggleMobileMenu() {
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  m.classList.toggle('open');
  h.textContent = m.classList.contains('open') ? '✕' : '☰';
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').textContent = '☰';
}

/* ══════════════════════════════════════
   SERVICES SEARCH & FILTER
══════════════════════════════════════ */
let activeSvcCat = 'all';
function filterServices() {
  const q = document.getElementById('serviceSearch').value.toLowerCase();
  document.querySelectorAll('.service-card').forEach(c => {
    const match = c.textContent.toLowerCase().includes(q);
    const catMatch = activeSvcCat === 'all' || c.dataset.cat === activeSvcCat;
    c.classList.toggle('hidden', !(match && catMatch));
  });
}
function filterServiceCat(btn, cat) {
  activeSvcCat = cat;
  document.querySelectorAll('.search-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterServices();
}

/* ══════════════════════════════════════
   INTERACTIVE CHECKLIST
══════════════════════════════════════ */
function toggleCheck(item) {
  const box = item.querySelector('.check-box');
  const text = item.querySelector('.item-text');
  const isDone = box.classList.contains('done');
  box.classList.toggle('done', !isDone);
  box.classList.toggle('todo', isDone);
  box.textContent = isDone ? '' : '✓';
  text.classList.toggle('done', !isDone);
  updateChecklistProgress();
  showToast(isDone ? 'Task marked as pending' : 'Task completed! 🎉', isDone ? 'info' : 'success');
}
function updateChecklistProgress() {
  const all = document.querySelectorAll('.checklist-item').length;
  const done = document.querySelectorAll('.check-box.done').length;
  const pct = Math.round((done / all) * 100);
  document.getElementById('checklistFill').style.width = pct + '%';
  document.getElementById('checklistPct').textContent = pct + '%';
}
updateChecklistProgress();

/* ══════════════════════════════════════
   BUDGET ITEMS
══════════════════════════════════════ */
let spent = 12_10_000; const total = 18_40_000;
function addBudgetItem() {
  const name = document.getElementById('budgetItem').value.trim();
  const amt  = parseInt(document.getElementById('budgetAmt').value);
  if (!name || isNaN(amt) || amt <= 0) { showToast('Please enter a valid item and amount', 'error'); return; }
  spent += amt;
  const pct = Math.min(Math.round((spent / total) * 100), 100);
  document.getElementById('budgetFill').style.width = pct + '%';
  document.getElementById('budgetPctLabel').textContent = pct + '% used';
  const row = document.createElement('div');
  row.className = 'budget-row';
  row.innerHTML = `<span>${name}</span><span>₹${amt.toLocaleString()}</span>`;
  document.querySelector('.budget-bar-wrap').before(row);
  document.getElementById('budgetItem').value = '';
  document.getElementById('budgetAmt').value = '';
  showToast(`Added ₹${amt.toLocaleString()} for ${name} 💰`, 'success');
}

/* ══════════════════════════════════════
   VENDOR FILTER & BOOKING
══════════════════════════════════════ */
let activeVndCat = 'all';
function filterVendors() {
  const q = document.getElementById('vendorSearch').value.toLowerCase();
  document.querySelectorAll('.vendor-card').forEach(c => {
    const match = c.textContent.toLowerCase().includes(q);
    const catMatch = activeVndCat === 'all' || c.dataset.cat === activeVndCat;
    c.classList.toggle('hidden', !(match && catMatch));
  });
}
function filterVendorCat(btn, cat) {
  activeVndCat = cat;
  document.querySelectorAll('#vendors .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterVendors();
}
function bookVendor(btn, name) {
  if (btn.classList.contains('booked')) return;
  btn.classList.add('booked');
  btn.textContent = '✓ Booked';
  showToast(`${name} booked successfully! 🎉`, 'success');
}

/* ══════════════════════════════════════
   GALLERY LIGHTBOX
══════════════════════════════════════ */
function openLightbox(emoji, title, desc, imageSrc = '') {
  const image = document.getElementById('lbImage');
  image.src = imageSrc;
  image.alt = title;
  image.style.display = imageSrc ? 'block' : 'none';
  document.getElementById('lbEmoji').textContent = imageSrc ? '' : emoji;
  document.getElementById('lbTitle').textContent = title;
  document.getElementById('lbDesc').textContent  = desc;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
document.getElementById('lightbox').addEventListener('click', e => { if (e.target === e.currentTarget) closeLightbox(); });

/* ══════════════════════════════════════
   GUEST MANAGEMENT
══════════════════════════════════════ */
let guests = [
  { name:'Sharma Family',    side:'Bride',        meal:'Veg',     count:4, status:'confirmed' },
  { name:'Kapoor Family',    side:'Groom',        meal:'Veg',     count:6, status:'confirmed' },
  { name:'Mehta & Assoc.',   side:'Groom',        meal:'Mixed',   count:3, status:'pending'   },
  { name:'Agarwal Family',   side:'Bride',        meal:'Veg',     count:5, status:'confirmed' },
  { name:'Verma Couple',     side:'Family Friend',meal:'Veg',     count:2, status:'declined'  },
  { name:'Gupta Family',     side:'Bride',        meal:'Jain',    count:4, status:'pending'   },
];
let guestFilter = '', guestSort = { key:'name', asc:true };

function renderGuests() {
  const q = document.getElementById('guestSearch').value.toLowerCase();
  let list = guests.filter(g =>
    (!guestFilter || g.status === guestFilter) &&
    g.name.toLowerCase().includes(q)
  );
  list.sort((a,b) => {
    let va = a[guestSort.key], vb = b[guestSort.key];
    if (typeof va === 'string') va = va.toLowerCase(), vb = vb.toLowerCase();
    return guestSort.asc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });
  const tbody = document.getElementById('guestTbody');
  tbody.innerHTML = list.map((g,i) => `
    <tr data-index="${guests.indexOf(g)}">
      <td><strong>${g.name}</strong></td>
      <td>${g.side}</td>
      <td>${g.meal}</td>
      <td>${g.count}</td>
      <td><span class="status-badge ${g.status}"><span class="status-dot ${g.status}"></span>${g.status.charAt(0).toUpperCase()+g.status.slice(1)}</span></td>
      <td><button class="delete-btn" onclick="deleteGuest(${guests.indexOf(g)})" title="Remove">🗑</button></td>
    </tr>
  `).join('');
  updateGuestCounts();
}

function updateGuestCounts() {
  const total = guests.length;
  const confirmed = guests.filter(g=>g.status==='confirmed').length;
  const pending   = guests.filter(g=>g.status==='pending').length;
  const declined  = guests.filter(g=>g.status==='declined').length;
  document.getElementById('guestCountTitle').textContent = `Guest List — ${total} Invited`;
  document.getElementById('chipConfirmed').textContent   = `${confirmed} Confirmed`;
  document.getElementById('chipPending').textContent     = `${pending} Pending`;
  document.getElementById('chipDeclined').textContent    = `${declined} Declined`;
}

function filterGuests(status, chip) {
  guestFilter = guestFilter === status ? '' : status;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active-filter'));
  if (guestFilter) chip.classList.add('active-filter');
  renderGuests();
}

function searchGuests() { renderGuests(); }

function sortGuests(key) {
  if (guestSort.key === key) guestSort.asc = !guestSort.asc;
  else { guestSort.key = key; guestSort.asc = true; }
  renderGuests();
}

function deleteGuest(idx) {
  const name = guests[idx].name;
  guests.splice(idx, 1);
  renderGuests();
  showToast(`${name} removed from guest list`, 'error');
}

function openGuestModal()  { document.getElementById('guestModal').classList.add('open'); }
function closeGuestModal() { document.getElementById('guestModal').classList.remove('open'); }

function addGuest() {
  const name   = document.getElementById('newGuestName').value.trim();
  const side   = document.getElementById('newGuestSide').value;
  const meal   = document.getElementById('newGuestMeal').value;
  const count  = parseInt(document.getElementById('newGuestCount').value) || 1;
  const status = document.getElementById('newGuestStatus').value;
  if (!name) { showToast('Please enter a guest name', 'error'); return; }
  guests.push({ name, side, meal, count, status });
  renderGuests();
  closeGuestModal();
  showToast(`${name} added to guest list! 🎉`, 'success');
  document.getElementById('newGuestName').value = '';
}

document.getElementById('guestModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeGuestModal(); });

renderGuests();

/* ══════════════════════════════════════
   CTA EMAIL FORM
══════════════════════════════════════ */
function handleCTASubmit() {
  const email = document.getElementById('ctaEmail').value.trim();
  if (!email || !email.includes('@')) { showToast('Please enter a valid email address', 'error'); return; }
  showToast(`Welcome to Vivah, ${email}! 🌸 Check your inbox.`, 'success');
  document.getElementById('ctaEmail').value = '';
}
