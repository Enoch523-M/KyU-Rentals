# style.css - Main Stylesheet

**Purpose:** Contains every CSS rule for the entire KyU Rentals website. All six HTML pages share this single stylesheet.

---

## File Structure (Top to Bottom)

| Section | Lines (approx.) | What It Styles |
|---------|-----------------|----------------|
| CSS Reset & Base | 1–70 | Removes default margins/padding, sets font & base styles |
| `:root` Variables | 10–37 | All design tokens (colours, shadows, border radii) |
| Navbar | 74–124 | Sticky top bar with logo and navigation links |
| Hero Section | 127–147 | Landing page gradient banner |
| Role Cards | 150–237 | Student/Landlord selection cards on landing page |
| Features Section | 240–310 | Three feature highlight cards on landing page |
| Footer | 313–323 | Dark footer bar |
| Container | 326–330 | Max-width wrapper used on most pages |
| Student Page | 333–608 | Search bar, filter selects, amenity pills, listing cards, no-results state |
| Listing Detail | 611–836 | Photo gallery, property info, amenities grid, contact card |
| Landlord Page | 839–1107 | Listings table, add-listing form, checkbox grid, toggle switch, success message |
| Login Pages | 1110–1317 | Centred login/signup card, form inputs, nav user indicator |
| Responsive | 1350–1451 | `768px` tablet and `480px` mobile breakpoints |

---

## Design Tokens (CSS Custom Properties)

All colours, shadows, and radii are defined as CSS variables in `:root`. This makes it easy to change the theme in one place.

```css
--primary: #2563EB;      /* Main brand blue */
--teal: #0D9488;          /* Landlord accent colour */
--dark: #1E293B;          /* Dark text */
--bg: #F8FAFC;            /* Page background */
--radius: 12px;           /* Default border radius */
```

### How variables are used
Instead of writing a colour value directly, the stylesheet references a variable:
```css
.navbar .logo {
  color: var(--primary);    /* Uses the blue defined in :root */
}
```
If you change `--primary` in `:root`, **every element** that references `var(--primary)` updates automatically.

---

## Key CSS Concepts Used

### 1. Flexbox
Used for one-dimensional layouts (rows or columns):
```css
.navbar {
  display: flex;
  align-items: center;        /* Vertically centre items */
  justify-content: space-between; /* Push logo left, links right */
}
```

### 2. CSS Grid
Used for two-dimensional card layouts:
```css
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  /* Creates as many 320px+ columns as will fit */
  gap: 24px;
}
```

### 3. Sticky Positioning
The navbar stays at the top when you scroll:
```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;  /* Stays above other content */
}
```

### 4. CSS Transitions
Smooth hover effects on cards:
```css
.listing-card {
  transition: transform 0.2s, box-shadow 0.2s;
}
.listing-card:hover {
  transform: translateY(-4px);  /* Lifts the card up */
}
```

### 5. Pseudo-elements
The vacancy toggle uses `::after` to create a sliding circle without extra HTML:
```css
.toggle::after {
  content: '';            /* Creates an empty element */
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;    /* Makes it a circle */
}
.toggle.active::after {
  transform: translateX(22px);  /* Slides right when active */
}
```

### 6. Responsive Design
Media queries change layouts for smaller screens:
```css
@media (max-width: 768px) {
  .listings-grid {
    grid-template-columns: 1fr;  /* Single column on tablets */
  }
  .form-grid {
    grid-template-columns: 1fr;  /* Stack form fields */
  }
}
```

---

## Colour Scheme at a Glance

| Colour | Variable | Where Used |
|--------|----------|------------|
| Blue `#2563EB` | `--primary` | Buttons, links, student theme |
| Teal `#0D9488` | `--teal` | Landlord theme |
| Green `#16A34A` | `--green` | Available badges, contact button |
| Red `#DC2626` | `--red` | Occupied badges, logout button |
| Dark `#1E293B` | `--dark` | Headings, footer background |
| Light `#F8FAFC` | `--bg` | Page background |

---

## How to Add a New Section

1. Pick a spot in the file (keep related sections together)
2. Add a section header: `/* ===== SECTION NAME ===== */`
3. Use existing variables for colours and radii
4. Test at desktop, 768px, and 480px widths
