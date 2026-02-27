# student.html - Student Browse Listings Page

**Purpose:** The main page where students search and browse available rental properties near Kirinyaga University.

---

## What This Page Does

1. Shows a **search bar** to search by property name or location
2. Provides **filter dropdowns** for price, distance, and room type
3. Displays **amenity filter pills** (clickable buttons like WiFi, Parking, Gym)
4. Shows a **results count** ("Showing 8 of 12 properties")
5. Renders a **grid of property cards** with photos, prices, and key details
6. Clicking a card navigates to `listing.html?id=X` for full details

---

## Structure Breakdown

### Protected Page
This page requires a student login. When it loads, `app.js` runs `requireAuth('student')` which checks if a student is logged in via sessionStorage. If not, it redirects to `student-login.html`.

### Search Box
```html
<div class="search-box">
  <i class="fa-solid fa-magnifying-glass"></i>
  <input type="text" id="searchInput" placeholder="Search by name or location...">
</div>
```
- The magnifying glass icon is positioned absolutely inside the input (CSS trick)
- `id="searchInput"` connects to JavaScript which listens for the `input` event
- Every keystroke triggers filtering in real-time (no need to press Enter)

### Filter Dropdowns
```html
<select class="filter-select" id="priceFilter">
  <option value="">All Prices</option>
  <option value="0-8000">Under KSh 8,000</option>
  <option value="8000-15000">KSh 8,000 - 15,000</option>
</select>
```
- `<select>` creates a dropdown menu
- `<option>` defines each choice
- `value="8000-15000"` - The value is a "min-max" format that JavaScript splits with `.split('-')` to get the range
- `value=""` (empty) means "no filter applied"

### Empty Containers (JavaScript Render Targets)
```html
<div class="amenity-filters" id="amenityFilters"></div>
<div class="results-count" id="resultsCount"></div>
<div class="listings-grid" id="listingsGrid"></div>
```
These `<div>` elements are **empty on purpose**. JavaScript fills them with content:
- `amenityFilters` - Gets filled with clickable amenity pill buttons
- `resultsCount` - Gets text like "Showing 8 of 12 properties"
- `listingsGrid` - Gets filled with property cards generated from data.js

This pattern is called **dynamic rendering** - the HTML structure is built by JavaScript, not written by hand.

### Script Loading Order
```html
<script src="js/data.js"></script>    <!-- FIRST: loads the listings data -->
<script src="js/app.js"></script>     <!-- SECOND: loads the logic that uses the data -->
```
**Order matters!** `app.js` references the `listings` array from `data.js`, so `data.js` must load first. If you swap them, you'll get a "listings is not defined" error.

---

## How the Filtering Works

```
User types in search box or changes a dropdown
        |
        v
applyFilters() function runs
        |
        v
Takes ALL 12 listings from data.js
        |
        v
Applies each filter one by one:
  1. Does title/location match search text?
  2. Is price within selected range?
  3. Is distance within selected range?
  4. Does it match the selected room type?
  5. Does it have ALL selected amenities?
        |
        v
Only listings that pass ALL filters remain
        |
        v
renderListings() displays the filtered results as HTML cards
```

---

## How Cards Link to Detail Page

```html
<div class="listing-card" onclick="window.location.href='listing.html?id=${listing.id}'">
```
- `onclick` runs JavaScript when the card is clicked
- `listing.html?id=3` navigates to the listing detail page
- `?id=3` is a **URL parameter** that tells the detail page which property to show
- The detail page reads this with `new URLSearchParams(window.location.search)`

---

## Key Concepts in This File

| Concept | Where | What It Does |
|---------|-------|-------------|
| Search input | `id="searchInput"` | Real-time text filtering |
| Select dropdown | `<select>` / `<option>` | Predefined filter choices |
| Empty div targets | `id="listingsGrid"` | JavaScript fills with content |
| Script order | data.js before app.js | Data must load before logic |
| URL parameters | `?id=${listing.id}` | Pass data between pages |
