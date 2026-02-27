# index.html - Landing Page

**Purpose:** This is the entry point of the KyU Rentals website. It's the first page users see when they visit the site.

---

## What This Page Does

1. Displays the **KyU Rentals** brand with a navigation bar
2. Shows a **hero section** with a welcoming headline and description
3. Presents two **role selection cards** - one for Students, one for Landlords
4. Lists **three feature highlights** explaining why users should choose KyU
5. Has a **footer** at the bottom

---

## Structure Breakdown

### Head Section (Lines 1-11)
```html
<!DOCTYPE html>          <!-- Tells browser this is HTML5 -->
<html lang="en">         <!-- Root element, language is English -->
<meta charset="UTF-8">   <!-- Character encoding for special characters -->
<meta name="viewport">   <!-- Makes page responsive on mobile devices -->
```

**External Resources Loaded:**
- **Google Fonts (Inter)** - The font used throughout the site
- **Font Awesome** - Icon library (the little icons like house, search, building)
- **style.css** - Our custom stylesheet

### Navigation Bar (Lines 14-24)
- Uses `<nav>` semantic tag (tells browser this is navigation)
- Logo links back to `index.html` (home)
- Two nav links go to the login pages
- `class="navbar"` applies sticky positioning (stays at top when scrolling)

### Hero Section (Lines 27-30)
- Full-width banner with a blue-to-purple gradient background
- Contains the main headline and a description paragraph
- The gradient is done in CSS: `linear-gradient(135deg, blue, purple)`

### Role Cards (Lines 33-50)
- Two clickable cards that act as the main call-to-action
- Each card is an `<a>` tag (link) wrapping the entire card - so clicking anywhere on the card navigates
- `class="role-card student"` and `class="role-card landlord"` apply different color schemes
- The `<i>` tags are Font Awesome icons (e.g., `fa-graduation-cap` = graduation hat icon)
- Cards use `margin-top: -40px` in CSS to overlap the hero section (creates a floating effect)

### Features Grid (Lines 53-79)
- Three cards explaining the platform's benefits
- Uses CSS Grid (`features-grid` class) to automatically arrange cards in columns
- `auto-fit` and `minmax(280px, 1fr)` means: "fit as many 280px+ columns as possible"

### Footer (Lines 82-84)
- Simple copyright notice
- `&copy;` is an HTML entity that displays the copyright symbol
- Dark background achieved via CSS class `.footer`

---

## How It Connects to Other Pages

```
index.html
  |-- "Student Login" link --> student-login.html
  |-- "Landlord Login" link --> landlord-login.html
  |-- Student role card --> student-login.html
  |-- Landlord role card --> landlord-login.html
```

---

## Key HTML Concepts in This File

| Concept | Example | What It Does |
|---------|---------|-------------|
| Semantic tags | `<nav>`, `<section>`, `<footer>` | Give meaning to page structure |
| Links | `<a href="student-login.html">` | Navigate to another page |
| Classes | `class="role-card student"` | Apply CSS styles |
| Font Awesome | `<i class="fa-solid fa-graduation-cap">` | Display an icon |
| HTML Entities | `&copy;` | Display special characters |
