# landlord.html - Landlord Dashboard Page

**Purpose:** The landlord's management page where they can view their existing properties and add new rental listings.

---

## What This Page Does

1. Shows a **table** of the landlord's current listings with status
2. Provides a **form** to add a new rental property
3. New listings appear in the table and become browseable by students

---

## Structure Breakdown

### Protected Page
Like `student.html`, this page requires authentication. `app.js` runs `requireAuth('landlord')` on load - if the user isn't logged in as a landlord, they're redirected to `landlord-login.html`.

### Listings Table
```html
<table class="listings-table">
  <thead>                          <!-- Table header (column names) -->
    <tr>                           <!-- Table row -->
      <th>Property</th>            <!-- Table header cell -->
      <th>Location</th>
      <th>Rent</th>
      <th>Room Type</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody id="landlordTableBody">   <!-- Table body (filled by JS) -->
  </tbody>
</table>
```

**HTML Table Structure:**
- `<table>` - The table container
- `<thead>` - Groups the header row(s)
- `<tbody>` - Groups the data rows
- `<tr>` - A single row
- `<th>` - Header cell (bold, centered by default)
- `<td>` - Data cell (normal text)

The `<tbody>` is empty - JavaScript fills it with rows using `renderLandlordTable()`.

### Add Listing Form

The form uses a **CSS Grid layout** (2 columns) with various input types:

#### Text Input
```html
<input type="text" id="propTitle" placeholder="e.g. Sunrise Apartments" required>
```
- `type="text"` - Standard text field
- `required` - Cannot submit form if empty

#### Number Input
```html
<input type="number" id="propPrice" placeholder="e.g. 12000" min="0" required>
```
- `type="number"` - Only allows numbers, shows up/down arrows
- `min="0"` - Cannot enter negative numbers
- `step="0.1"` (on distance field) - Allows decimal numbers

#### Select Dropdown (Room Type)
```html
<select id="propRoomType" required>
  <option value="">Select</option>
  <option value="Bedsitter">Bedsitter</option>
  <option value="Single Room">Single Room</option>
  <option value="Double Room">Double Room</option>
  <option value="1 Bedroom">1 Bedroom</option>
</select>
```
- First option with `value=""` acts as placeholder
- `required` prevents submitting without selecting
- Room type options reflect common Kenyan rental categories

#### Telephone Input
```html
<input type="tel" id="propPhone" placeholder="e.g. +254 712 345 678" required>
```
- `type="tel"` - On mobile, shows a phone number keyboard

#### URL Input
```html
<input type="url" placeholder="Paste image URL...">
```
- `type="url"` - Browser validates that it looks like a URL

#### Textarea
```html
<textarea id="propDescription" placeholder="Describe the property..."></textarea>
```
- `<textarea>` is for multi-line text (unlike `<input>` which is single-line)
- CSS `resize: vertical` lets users drag to make it taller

### Amenity Checkboxes
```html
<div class="checkbox-grid" id="amenityCheckboxes"></div>
```
This empty div gets filled by JavaScript with checkboxes for each amenity:
```javascript
Object.keys(amenityIcons).map(amenity => `
  <label class="checkbox-label">
    <input type="checkbox" value="${amenity}">
    ${amenity}
  </label>
`);
```

### Custom Toggle Switch
```html
<div class="toggle active" id="vacancyToggle"></div>
```
- This is a **CSS-only toggle** (no `<input>` needed)
- The visual "knob" is created with CSS `::after` pseudo-element
- JavaScript toggles the `active` class on click
- When `active` class is present: green background, knob slides right
- CSS handles all the animation with `transition`

### Dynamic Photo URL Inputs
```html
<button type="button" class="add-photo-btn" id="addPhotoBtn">
  <i class="fa-solid fa-plus"></i> Add another photo
</button>
```
- `type="button"` (not "submit") prevents the button from submitting the form
- JavaScript creates new input rows when this is clicked (up to 5 max)

### Success Message
```html
<div class="success-message" id="successMessage">
  <i class="fa-solid fa-circle-check"></i>
  Listing added successfully!
</div>
```
- Hidden by default (`display: none` in CSS)
- JavaScript adds the `show` class after form submission
- `setTimeout` removes the `show` class after 3 seconds (auto-hide)

### Full-Width Form Fields
```html
<div class="form-group full-width">
```
- `full-width` class uses `grid-column: 1 / -1` to span across both columns
- Used for amenities, photos, description, and submit button

---

## How Adding a Listing Works

```
1. Landlord fills in the form fields
2. Clicks "Add Listing" button
3. JavaScript intercepts form submission (e.preventDefault())
4. Reads all form values
5. Validates required fields
6. Creates a new listing object
7. Pushes it to the listings array (in memory)
8. Saves it to localStorage (so it persists across sessions)
9. Re-renders the table with the new listing
10. Shows success message for 3 seconds
11. Resets the form
```

**Persistence:** New listings are saved to `localStorage`, so they survive page refreshes and logout/login cycles. A student logging in after the landlord logs out will see the new listing.

---

## Key Concepts in This File

| Concept | Example | What It Does |
|---------|---------|-------------|
| HTML Table | `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` | Structured data display |
| Form inputs | `type="text"`, `number`, `tel`, `url` | Different input validations |
| Select dropdown | `<select>` + `<option>` | Predefined choices |
| Textarea | `<textarea>` | Multi-line text input |
| Checkbox | `<input type="checkbox">` | Toggle on/off selection |
| Required attribute | `required` | Prevents empty form submission |
| CSS Grid columns | `full-width` class | Span across grid columns |
| Pseudo-elements | Toggle switch `::after` | Visual elements created by CSS |
