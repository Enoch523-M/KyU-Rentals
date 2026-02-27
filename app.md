# app.js - Core Application Logic

**Purpose:** Contains all the JavaScript that powers the KyU Rentals website - authentication, page rendering, filtering, form handling, and page routing.

---

## File Structure

The file is organised into six sections:

| Section | Functions | What It Does |
|---------|-----------|--------------|
| Persistence | `loadSavedListings()` (IIFE) | Loads landlord-added listings from localStorage on startup |
| Auth / Login | `initLoginPage()`, `updateNavAuth()`, `logout()`, `requireAuth(role)` | Handles login/signup forms and session management |
| Student Page | `initStudentPage()`, `buildAmenityFilters()`, `applyFilters()`, `renderListings(data)` | Renders listing cards with search and filter support |
| Listing Detail | `initDetailPage()`, `changePhoto(src, thumbEl)` | Shows full property details with photo gallery |
| Landlord Dashboard | `initLandlordPage()`, `renderLandlordTable()`, `setupAddForm()` | Displays landlord's listings and handles new listing form |
| Init (DOMContentLoaded) | Anonymous listener | Routes to the correct page initialiser based on URL |

---

## Section 1: Auth / Login

### `initLoginPage()`
- Runs on both `student-login.html` and `landlord-login.html`
- Toggles between login and signup forms using a `showingLogin` boolean
- On form submit, saves user data to `sessionStorage` and redirects

**Key pattern - Toggle forms:**
```js
showingLogin = !showingLogin;
studentLoginForm.style.display = showingLogin ? 'block' : 'none';
studentSignupForm.style.display = showingLogin ? 'none' : 'block';
```

**Key pattern - Extract name from email:**
```js
const name = email.split('@')[0].replace(/[._]/g, ' ');
// "john.doe@mail.com" → "john doe"
```

### `updateNavAuth()`
- Reads `kyuUser` from `sessionStorage`
- If logged in: shows user name + logout button in the navbar
- If not logged in: shows a "Login" link

### `logout()`
- Removes `kyuUser` from `sessionStorage`
- Redirects to `index.html`

### `requireAuth(role)`
- Checks if the user is logged in AND has the correct role
- If not, redirects to the appropriate login page
- Returns `true` or `false` so the caller can decide whether to initialise the page

**How sessionStorage works:**
```js
// Save (login)
sessionStorage.setItem('kyuUser', JSON.stringify({ role: 'student', name: 'John', email: '...' }));

// Read (check auth)
const userData = sessionStorage.getItem('kyuUser');  // returns string or null
const user = JSON.parse(userData);                    // convert back to object

// Remove (logout)
sessionStorage.removeItem('kyuUser');
```
> `sessionStorage` data lasts only while the browser tab is open. Closing the tab clears it.

---

## Section 2: Student Page

### `initStudentPage()`
- Gets references to all filter inputs (search, price, distance, room type)
- Calls `buildAmenityFilters()` to create clickable amenity pills
- Calls `renderListings(listings)` to show all properties initially
- Attaches event listeners so filtering happens on every change

### `buildAmenityFilters()`
- Reads amenity names from `amenityIcons` (defined in `data.js`)
- Creates a button (pill) for each amenity using `.map()` and `.join()`
- Clicking a pill toggles it in the `activeAmenities` array and re-filters

### `applyFilters()`
- Reads current values from all filter inputs
- Uses `listings.filter()` to chain multiple conditions:
  1. **Search** - title or location includes the search text
  2. **Price** - price falls within selected range (parsed with `.split('-')`)
  3. **Distance** - distance falls within selected range
  4. **Room Type** - exact match (Bedsitter, Single Room, Double Room, or 1 Bedroom)
  5. **Amenities** - listing has ALL selected amenities (`.every()`)
- Passes the filtered array to `renderListings()`

**Key pattern - Chained filtering:**
```js
let filtered = listings.filter(listing => {
  if (search && !matchesSearch) return false;  // Fails search? Skip
  if (priceRange && outOfRange) return false;   // Fails price? Skip
  // ...more conditions...
  return true;  // Passed all filters
});
```

### `renderListings(data)`
- Updates the results count text
- If no results, shows a "No properties found" message
- Otherwise, maps each listing to an HTML card using template literals
- Each card shows: photo, badge (Available/Occupied), title, location, meta info, amenities (max 4 + overflow count), price, and a "View Details" button
- Clicking a card navigates to `listing.html?id=X`

---

## Section 3: Listing Detail

### `initDetailPage()`
- Reads the `id` parameter from the URL: `new URLSearchParams(window.location.search)`
- Finds the matching listing with `listings.find(l => l.id === id)`
- If not found, shows a "Listing not found" message
- Otherwise, builds the full detail view:
  - Photo gallery with clickable thumbnails
  - Title, price, vacancy badge
  - Location, distance, room type
  - Description, amenities grid, landlord contact card

### `changePhoto(src, thumbEl)`
- Swaps the main gallery image when a thumbnail is clicked
- Removes `.active` from all thumbnails, adds it to the clicked one

---

## Section 4: Landlord Dashboard

### `initLandlordPage()`
- Calls `renderLandlordTable()` and `setupAddForm()`

### `renderLandlordTable()`
- Filters `listings` for those belonging to "James Mwangi" (demo landlord)
- Renders each as a table row showing title, location, price, room type, status

### `setupAddForm()`
- Dynamically creates amenity checkboxes from `amenityIcons`
- Sets up the vacancy toggle (click toggles `.active` class)
- Handles "Add photo" button (max 5 photo URL inputs)
- On form submit:
  1. Reads all form values
  2. Validates required fields
  3. Creates a new listing object and pushes it to the `listings` array
  4. **Saves to `localStorage`** so the listing persists across sessions
  5. Re-renders the table to include the new row
  6. Shows a success message for 3 seconds
  7. Resets the form

> New listings are saved to `localStorage`, so they survive page refreshes and logout/login cycles. The original 12 listings from `data.js` are always present; landlord-added listings are loaded from `localStorage` on top of those.

---

## Section 5: Initialisation

```js
document.addEventListener('DOMContentLoaded', () => { ... });
```

This runs when the HTML has finished loading. It checks the current page URL and calls the appropriate initialiser:

| URL contains | Action |
|-------------|--------|
| `student-login` or `landlord-login` | `initLoginPage()` |
| `student.html` | `requireAuth('student')` → `initStudentPage()` |
| `landlord.html` | `requireAuth('landlord')` → `initLandlordPage()` |
| `listing.html` | `requireAuth('student')` → `initDetailPage()` |
| anything else | Just `updateNavAuth()` |

---

## Key JavaScript Concepts Used

| Concept | Example | Explanation |
|---------|---------|-------------|
| `Array.map()` | `listings.map(l => \`<div>...\`)` | Transforms each array item into HTML |
| `Array.filter()` | `listings.filter(l => l.price < 15000)` | Returns items that pass a condition |
| `Array.find()` | `listings.find(l => l.id === 3)` | Returns the first matching item |
| `Array.every()` | `amenities.every(a => listing.amenities.includes(a))` | Checks if ALL items pass |
| Template literals | `` `KSh ${price}` `` | Embed variables inside strings |
| `JSON.stringify/parse` | `JSON.stringify(user)` | Convert objects to/from strings for storage |
| `URLSearchParams` | `params.get('id')` | Read query parameters from the URL |
| Event delegation | `onclick="window.location.href='...'"` | Handle clicks on dynamically created elements |
| `sessionStorage` | `sessionStorage.setItem('key', 'value')` | Store data that lasts for one browser session |
| `localStorage` | `localStorage.setItem('key', 'value')` | Store data permanently (survives tab close) |

---

## Data Flow Diagram

```
data.js (12 default listings)
    │
    ├── loadSavedListings() merges localStorage items into array
    │
    ├── student.html
    │     └── initStudentPage() → applyFilters() → renderListings()
    │
    ├── listing.html
    │     └── initDetailPage() → finds listing by URL ?id= param
    │
    └── landlord.html
          ├── renderLandlordTable() → filters by landlord name
          └── setupAddForm() → pushes new listing + saves to localStorage
```
