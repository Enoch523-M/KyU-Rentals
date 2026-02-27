/*
 * KyU Rentals - Core Application Logic
 * Sections: Persistence, Auth (landlord only), Student Page, Listing Detail, Landlord Dashboard, Init
 * Student pages are public; only landlord pages require login
 * Landlord-added listings are persisted in localStorage
 */

// ===== PERSISTENCE =====
// Load any landlord-added listings from localStorage into the listings array
// Guard: only runs on pages that load data.js (not the login page)
(function loadSavedListings() {
  if (typeof listings === 'undefined') return;
  const saved = localStorage.getItem('kyuAddedListings');
  if (saved) {
    const parsed = JSON.parse(saved);
    parsed.forEach(item => listings.push(item));
  }
})();

// ===== AUTH / LOGIN LOGIC (Landlord Only) =====

function initLoginPage() {
  const landlordLoginForm = document.getElementById('landlordLoginForm');
  const landlordSignupForm = document.getElementById('landlordSignupForm');
  const toggleAuth = document.getElementById('toggleAuth');
  const toggleText = document.getElementById('toggleText');

  // Toggle between login and signup forms
  if (toggleAuth) {
    let showingLogin = true;
    toggleAuth.addEventListener('click', (e) => {
      e.preventDefault();
      showingLogin = !showingLogin;

      if (landlordLoginForm && landlordSignupForm) {
        landlordLoginForm.style.display = showingLogin ? 'block' : 'none';
        landlordSignupForm.style.display = showingLogin ? 'none' : 'block';
      }

      toggleText.textContent = showingLogin ? "Don't have an account?" : "Already have an account?";
      toggleAuth.textContent = showingLogin ? "Sign Up" : "Sign In";
    });
  }

  // Landlord login handler
  if (landlordLoginForm) {
    landlordLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('landlordEmail').value.trim();
      const password = document.getElementById('landlordPassword').value;

      if (email && password.length >= 4) {
        const name = email.split('@')[0].replace(/[._]/g, ' ');
        sessionStorage.setItem('kyuUser', JSON.stringify({
          role: 'landlord',
          name: name,
          email: email
        }));
        window.location.href = 'landlord.html';
      }
    });
  }

  // Landlord signup handler
  if (landlordSignupForm) {
    landlordSignupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('landlordSignupName').value.trim();
      const email = document.getElementById('landlordSignupEmail').value.trim();
      const phone = document.getElementById('landlordSignupPhone').value.trim();
      const password = document.getElementById('landlordSignupPassword').value;

      if (name && email && phone && password.length >= 4) {
        sessionStorage.setItem('kyuUser', JSON.stringify({
          role: 'landlord',
          name: name,
          email: email,
          phone: phone
        }));
        window.location.href = 'landlord.html';
      }
    });
  }
}

// Update navbar with landlord info if logged in
function updateNavAuth() {
  const userInfo = document.getElementById('navUserInfo');
  if (!userInfo) return;

  const userData = sessionStorage.getItem('kyuUser');
  if (userData) {
    const user = JSON.parse(userData);
    const firstName = user.name.split(' ')[0];
    const capitalName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    userInfo.innerHTML = `
      <div class="nav-user">
        <i class="fa-solid fa-circle-user"></i>
        <span>${capitalName}</span>
        <button class="logout-btn" onclick="logout()">Logout</button>
      </div>
    `;
  } else {
    // On landlord page, show login link if not logged in
    const page = window.location.pathname;
    if (page.includes('landlord')) {
      userInfo.innerHTML = `<a href="landlord-login.html">Login</a>`;
    }
  }
}

function logout() {
  sessionStorage.removeItem('kyuUser');
  window.location.href = 'index.html';
}

// Protect landlord pages that require login
function requireAuth() {
  const userData = sessionStorage.getItem('kyuUser');
  if (!userData) {
    window.location.href = 'landlord-login.html';
    return false;
  }
  const user = JSON.parse(userData);
  if (user.role !== 'landlord') {
    window.location.href = 'landlord-login.html';
    return false;
  }
  return true;
}


// ===== STUDENT PAGE LOGIC =====

function initStudentPage() {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;

  const searchInput = document.getElementById('searchInput');
  const priceFilter = document.getElementById('priceFilter');
  const distanceFilter = document.getElementById('distanceFilter');
  const roomTypeFilter = document.getElementById('roomTypeFilter');

  // Build amenity filter pills
  buildAmenityFilters();

  // Render all listings initially
  renderListings(listings);

  // Attach filter listeners
  searchInput.addEventListener('input', applyFilters);
  priceFilter.addEventListener('change', applyFilters);
  distanceFilter.addEventListener('change', applyFilters);
  roomTypeFilter.addEventListener('change', applyFilters);
}

let activeAmenities = [];

function buildAmenityFilters() {
  const container = document.getElementById('amenityFilters');
  if (!container) return;

  const allAmenities = Object.keys(amenityIcons);
  container.innerHTML = allAmenities.map(amenity => `
    <button class="amenity-pill" data-amenity="${amenity}">
      <i class="fa-solid ${amenityIcons[amenity]}"></i>
      ${amenity}
    </button>
  `).join('');

  container.querySelectorAll('.amenity-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const amenity = pill.dataset.amenity;
      pill.classList.toggle('active');
      if (activeAmenities.includes(amenity)) {
        activeAmenities = activeAmenities.filter(a => a !== amenity);
      } else {
        activeAmenities.push(amenity);
      }
      applyFilters();
    });
  });
}

function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const priceRange = document.getElementById('priceFilter').value;
  const distanceRange = document.getElementById('distanceFilter').value;
  const roomType = document.getElementById('roomTypeFilter').value;

  let filtered = listings.filter(listing => {
    // Search filter
    if (search) {
      const matchesSearch = listing.title.toLowerCase().includes(search) ||
                            listing.location.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // Price filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (listing.price < min || listing.price > max) return false;
    }

    // Distance filter
    if (distanceRange) {
      const [min, max] = distanceRange.split('-').map(Number);
      if (listing.distanceKm < min || listing.distanceKm > max) return false;
    }

    // Room type filter
    if (roomType) {
      if (listing.roomType !== roomType) return false;
    }

    // Amenity filter
    if (activeAmenities.length > 0) {
      const hasAll = activeAmenities.every(a => listing.amenities.includes(a));
      if (!hasAll) return false;
    }

    return true;
  });

  renderListings(filtered);
}

function renderListings(data) {
  const grid = document.getElementById('listingsGrid');
  const countEl = document.getElementById('resultsCount');

  countEl.innerHTML = `Showing <span>${data.length}</span> of <span>${listings.length}</span> properties`;

  if (data.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i class="fa-solid fa-house-circle-xmark"></i>
        <h3>No properties found</h3>
        <p>Try adjusting your search or filters to find more listings.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = data.map(listing => {
    const amenitiesHTML = listing.amenities.slice(0, 4).map(a =>
      `<span class="amenity-tag">${a}</span>`
    ).join('');
    const moreCount = listing.amenities.length - 4;
    const moreTag = moreCount > 0 ? `<span class="amenity-tag">+${moreCount}</span>` : '';
    const hasPhotos = listing.photos && listing.photos.length > 0;
    const photoHTML = hasPhotos
      ? `<img src="${listing.photos[0]}" alt="${listing.title}" loading="lazy">`
      : `<div class="no-photo"><i class="fa-solid fa-image"></i></div>`;

    return `
      <div class="listing-card" onclick="window.location.href='listing.html?id=${listing.id}'">
        <div class="card-image">
          ${photoHTML}
          <span class="card-badge ${listing.vacancy ? 'available' : 'occupied'}">
            ${listing.vacancy ? 'Available' : 'Occupied'}
          </span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${listing.title}</h3>
          <div class="card-location">
            <i class="fa-solid fa-location-dot"></i>
            ${listing.location}
          </div>
          <div class="card-meta">
            <span><i class="fa-solid fa-door-open"></i> ${listing.roomType}</span>
            <span><i class="fa-solid fa-route"></i> ${listing.distanceKm} km</span>
          </div>
          <div class="card-amenities">
            ${amenitiesHTML}${moreTag}
          </div>
          <div class="card-footer">
            <div class="price">KSh ${listing.price.toLocaleString()}<small>/mo</small></div>
            <button class="view-btn">View Details</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}


// ===== LISTING DETAIL PAGE LOGIC =====

function initDetailPage() {
  const detailPage = document.getElementById('detailPage');
  if (!detailPage) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const listing = listings.find(l => l.id === id);

  if (!listing) {
    detailPage.innerHTML = `
      <a href="student.html" class="back-link">
        <i class="fa-solid fa-arrow-left"></i> Back to listings
      </a>
      <div class="no-results">
        <i class="fa-solid fa-circle-exclamation"></i>
        <h3>Listing not found</h3>
        <p>This property may no longer be available.</p>
      </div>
    `;
    return;
  }

  // Gallery - only show if photos exist
  const hasPhotos = listing.photos && listing.photos.length > 0;
  let galleryHTML = '';
  if (hasPhotos) {
    const thumbsHTML = listing.photos.map((photo, i) =>
      `<img src="${photo}" alt="Photo ${i + 1}" class="${i === 0 ? 'active' : ''}" onclick="changePhoto('${photo}', this)">`
    ).join('');
    galleryHTML = `
      <div class="gallery">
        <div class="gallery-main">
          <img id="mainPhoto" src="${listing.photos[0]}" alt="${listing.title}">
        </div>
        <div class="gallery-thumbs">
          ${thumbsHTML}
        </div>
      </div>`;
  }

  // Amenities
  const amenitiesHTML = listing.amenities.map(a => `
    <div class="amenity-item">
      <i class="fa-solid ${amenityIcons[a] || 'fa-check'}"></i>
      ${a}
    </div>
  `).join('');

  detailPage.innerHTML = `
    <a href="student.html" class="back-link">
      <i class="fa-solid fa-arrow-left"></i> Back to listings
    </a>

    ${galleryHTML}

    <div class="detail-header">
      <div>
        <h1>${listing.title}</h1>
      </div>
      <div class="detail-price">
        KSh ${listing.price.toLocaleString()}<small>/month</small>
      </div>
    </div>

    <span class="detail-badge ${listing.vacancy ? 'available' : 'occupied'}">
      <i class="fa-solid ${listing.vacancy ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
      ${listing.vacancy ? 'Available for Rent' : 'Currently Occupied'}
    </span>

    <div class="detail-meta">
      <div class="meta-item">
        <i class="fa-solid fa-location-dot"></i>
        ${listing.location}
      </div>
      <div class="meta-item">
        <i class="fa-solid fa-route"></i>
        ${listing.distanceKm} km from university
      </div>
      <div class="meta-item">
        <i class="fa-solid fa-door-open"></i>
        ${listing.roomType}
      </div>
    </div>

    <div class="detail-section">
      <h2>Description</h2>
      <p>${listing.description}</p>
    </div>

    <div class="detail-section">
      <h2>Amenities</h2>
      <div class="amenities-grid">
        ${amenitiesHTML}
      </div>
    </div>

    <div class="detail-section">
      <h2>Contact Landlord</h2>
      <div class="contact-card">
        <h3>Property Manager</h3>
        <div class="contact-info">
          <div class="contact-row">
            <i class="fa-solid fa-user"></i>
            ${listing.landlord}
          </div>
          <div class="contact-row">
            <i class="fa-solid fa-phone"></i>
            ${listing.phone}
          </div>
        </div>
        <a href="tel:${listing.phone.replace(/\s/g, '')}" class="contact-btn">
          <i class="fa-solid fa-phone"></i>
          Call Landlord
        </a>
      </div>
    </div>
  `;
}

function changePhoto(src, thumbEl) {
  document.getElementById('mainPhoto').src = src;
  document.querySelectorAll('.gallery-thumbs img').forEach(img => img.classList.remove('active'));
  thumbEl.classList.add('active');
}


// ===== LANDLORD PAGE LOGIC =====

function initLandlordPage() {
  const tableBody = document.getElementById('landlordTableBody');
  if (!tableBody) return;

  renderLandlordTable();
  setupAddForm();
}

function renderLandlordTable() {
  const tableBody = document.getElementById('landlordTableBody');
  const userData = sessionStorage.getItem('kyuUser');
  const user = userData ? JSON.parse(userData) : { name: 'James Mwangi' };
  const myListings = listings.filter(l => l.landlord === user.name || l.landlord === 'James Mwangi');

  // Check which listings are landlord-added (deletable)
  const saved = JSON.parse(localStorage.getItem('kyuAddedListings') || '[]');
  const savedIds = saved.map(l => l.id);

  tableBody.innerHTML = myListings.map(listing => {
    const isDeletable = savedIds.includes(listing.id);
    return `
    <tr>
      <td class="table-title">${listing.title}</td>
      <td>${listing.location}</td>
      <td>KSh ${listing.price.toLocaleString()}</td>
      <td>${listing.roomType}</td>
      <td>
        <button class="status-toggle ${listing.vacancy ? 'available' : 'occupied'}" onclick="toggleVacancy(${listing.id})">
          ${listing.vacancy ? 'Available' : 'Occupied'}
        </button>
      </td>
      <td>
        ${isDeletable ? `<button class="delete-btn" onclick="deleteListing(${listing.id})"><i class="fa-solid fa-trash"></i> Delete</button>` : '—'}
      </td>
    </tr>`;
  }).join('');
}

// Toggle a listing between Available and Occupied
function toggleVacancy(id) {
  const listing = listings.find(l => l.id === id);
  if (!listing) return;
  listing.vacancy = !listing.vacancy;

  // Update localStorage if this is a landlord-added listing
  const saved = JSON.parse(localStorage.getItem('kyuAddedListings') || '[]');
  const savedListing = saved.find(l => l.id === id);
  if (savedListing) {
    savedListing.vacancy = listing.vacancy;
    localStorage.setItem('kyuAddedListings', JSON.stringify(saved));
  }

  renderLandlordTable();
}

// Delete a landlord-added listing
function deleteListing(id) {
  if (!confirm('Are you sure you want to delete this listing?')) return;

  // Remove from in-memory array
  const index = listings.findIndex(l => l.id === id);
  if (index !== -1) listings.splice(index, 1);

  // Remove from localStorage
  const saved = JSON.parse(localStorage.getItem('kyuAddedListings') || '[]');
  const updated = saved.filter(l => l.id !== id);
  localStorage.setItem('kyuAddedListings', JSON.stringify(updated));

  renderLandlordTable();
}

function setupAddForm() {
  const form = document.getElementById('addListingForm');
  if (!form) return;

  // Build amenity checkboxes
  const checkboxContainer = document.getElementById('amenityCheckboxes');
  checkboxContainer.innerHTML = Object.keys(amenityIcons).map(amenity => `
    <label class="checkbox-label">
      <input type="checkbox" value="${amenity}">
      ${amenity}
    </label>
  `).join('');

  // Add photo URL row
  const addPhotoBtn = document.getElementById('addPhotoBtn');
  const photoInputs = document.getElementById('photoInputs');
  addPhotoBtn.addEventListener('click', () => {
    const count = photoInputs.querySelectorAll('input').length;
    if (count >= 5) return;
    const row = document.createElement('div');
    row.className = 'photo-input-row';
    row.innerHTML = `<input type="url" placeholder="Paste image URL...">`;
    photoInputs.insertBefore(row, addPhotoBtn);
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('propTitle').value.trim();
    const location = document.getElementById('propLocation').value.trim();
    const distance = parseFloat(document.getElementById('propDistance').value);
    const price = parseInt(document.getElementById('propPrice').value);
    const roomType = document.getElementById('propRoomType').value;
    const description = document.getElementById('propDescription').value.trim();
    const phone = document.getElementById('propPhone').value.trim();

    // Get selected amenities
    const amenities = [];
    checkboxContainer.querySelectorAll('input:checked').forEach(cb => {
      amenities.push(cb.value);
    });

    // Get photo URLs (empty array if none provided)
    const photos = [];
    photoInputs.querySelectorAll('input').forEach(input => {
      if (input.value.trim()) photos.push(input.value.trim());
    });

    // Validate
    if (!title || !location || !price || !roomType || !phone) {
      alert('Please fill in all required fields.');
      return;
    }

    // Get landlord name from session
    const userData = sessionStorage.getItem('kyuUser');
    const user = userData ? JSON.parse(userData) : { name: 'James Mwangi' };

    // Create new listing
    const newListing = {
      id: listings.length + 1,
      title,
      landlord: user.name,
      phone,
      location,
      distanceKm: distance || 0,
      price,
      roomType,
      vacancy: true,
      amenities,
      description,
      photos
    };

    // Add to in-memory array
    listings.push(newListing);

    // Persist to localStorage so it survives logout/login
    const saved = JSON.parse(localStorage.getItem('kyuAddedListings') || '[]');
    saved.push(newListing);
    localStorage.setItem('kyuAddedListings', JSON.stringify(saved));

    // Update table
    renderLandlordTable();

    // Show success message
    const success = document.getElementById('successMessage');
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 3000);

    // Reset form
    form.reset();
    checkboxContainer.querySelectorAll('input').forEach(cb => cb.checked = false);
    // Remove extra photo rows
    const photoRows = photoInputs.querySelectorAll('.photo-input-row');
    photoRows.forEach((row, i) => { if (i > 0) row.remove(); });
  });
}


// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname;

  // Landlord login page
  if (page.includes('landlord-login')) {
    initLoginPage();
    return;
  }

  // Student pages - public, no auth required
  if (page.includes('student.html')) {
    initStudentPage();
    return;
  }

  if (page.includes('listing.html')) {
    initDetailPage();
    return;
  }

  // Landlord dashboard - requires auth
  if (page.includes('landlord.html')) {
    if (requireAuth()) {
      updateNavAuth();
      initLandlordPage();
    }
    return;
  }

  // Non-protected pages (index.html)
  updateNavAuth();
});
