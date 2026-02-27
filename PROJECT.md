# KyU Rentals - Project Documentation

**Student:** Enoch Musyoka
**University:** Kirinyaga University (KyU)
**Project Duration:** 5 Weeks
**Tech Stack:** HTML, CSS, JavaScript (Vanilla)

---

## Project Overview

KyU Rentals is a web-based platform that connects Kirinyaga University students with landlords who have rental properties near campus. The system has two types of users:

1. **Students** - Can browse, search, and filter available rental houses. They can view photos, amenities, prices, and how far each property is from the university.

2. **Landlords** - Can view their listed properties and add new rental listings with details like photos, amenities, pricing, and vacancy status.

---

## How the Project Works (Big Picture)

```
User opens index.html (Landing Page)
        |
        |--- Clicks "I'm a Student"
        |        |
        |        v
        |    student-login.html (Login / Sign Up)
        |        |
        |        v
        |    student.html (Browse Listings with Search & Filters)
        |        |
        |        v
        |    listing.html?id=X (View Full Property Details)
        |
        |--- Clicks "I'm a Landlord"
                 |
                 v
             landlord-login.html (Login / Sign Up)
                 |
                 v
             landlord.html (Dashboard: View Listings + Add New)
```

---

## File Structure

```
Rent dashboard/
|
|-- index.html              --> Landing page (entry point)
|-- student-login.html      --> Student login & registration
|-- landlord-login.html     --> Landlord login & registration
|-- student.html            --> Student browsing page (protected)
|-- listing.html            --> Property detail page (protected)
|-- landlord.html           --> Landlord dashboard (protected)
|
|-- css/
|   |-- style.css           --> All styles for the entire website
|
|-- js/
|   |-- data.js             --> Static demo data (12 sample listings)
|   |-- app.js              --> All JavaScript logic (auth, filters, forms)
|
|-- photos/                 --> Local property photos (add your own .jpg files)
|
|-- docs/                   --> Documentation files (you are here)
|   |-- index.md
|   |-- student-login.md
|   |-- landlord-login.md
|   |-- student.md
|   |-- listing.md
|   |-- landlord.md
|   |-- style.md
|   |-- data.md
|   |-- app.md
|
|-- PROJECT.md              --> This file (project overview)
```

---

## Key Concepts Used

### HTML Concepts
- **Semantic HTML**: Using `<nav>`, `<section>`, `<footer>`, `<form>`, `<table>` for meaningful structure
- **Forms**: `<form>`, `<input>`, `<select>`, `<textarea>` with types like `email`, `password`, `number`, `tel`, `url`
- **Form Validation**: The `required` attribute makes fields mandatory
- **Links**: `<a href="page.html">` connects pages together
- **External Resources**: Loading fonts from Google Fonts and icons from Font Awesome via CDN

### CSS Concepts
- **CSS Variables**: `:root { --primary: #2563EB; }` defines reusable colors
- **Flexbox**: `display: flex` for one-dimensional layouts (rows or columns)
- **CSS Grid**: `display: grid` for two-dimensional layouts (rows AND columns)
- **Responsive Design**: `@media (max-width: 768px)` adapts layout for mobile
- **Transitions**: `transition: all 0.2s` for smooth hover animations
- **Sticky Positioning**: `position: sticky; top: 0` keeps navbar at top while scrolling
- **Box Shadow**: Creates depth with subtle shadows under cards

### JavaScript Concepts
- **DOM Manipulation**: `document.getElementById()` to find HTML elements
- **Event Listeners**: `addEventListener('click', function)` to respond to user actions
- **Template Literals**: Backtick strings `` `Hello ${name}` `` for building HTML dynamically
- **Array Methods**: `.map()`, `.filter()`, `.join()`, `.includes()`, `.every()` for data processing
- **Session Storage**: `sessionStorage.setItem()` to store login data in the browser
- **Local Storage**: `localStorage.setItem()` to persist landlord-added listings across sessions
- **JSON**: `JSON.stringify()` and `JSON.parse()` to convert data to/from strings
- **URL Parameters**: `?id=3` passes data between pages via the URL

---

## Authentication System

The login system uses **sessionStorage** (browser-based, temporary storage):

1. User fills in the login/signup form
2. JavaScript saves their info to `sessionStorage` as a JSON string
3. Protected pages check `sessionStorage` before loading - if no user data found, they redirect to the login page
4. Logging out removes the data from `sessionStorage`

**Note:** This is a demo/prototype system. In a production application, you would use a backend server with a database (e.g., Node.js + MongoDB, or PHP + MySQL) to securely store user credentials.

---

## Data Flow

Since this project uses no backend server, all property data comes from `data.js`:

1. `data.js` defines a `listings` array with 12 sample properties
2. On page load, `app.js` merges any landlord-added listings from `localStorage` into the array
3. `app.js` reads this combined array and renders it as HTML cards
4. When a landlord adds a new listing via the form, it gets pushed to the array AND saved to `localStorage`
5. Landlord-added listings persist across page refreshes and logout/login cycles

---

## How to Run

1. Open `index.html` in any web browser (Chrome, Firefox, Edge)
2. No server installation needed - just double-click the file
3. Choose Student or Landlord role
4. Login with any email and password (4+ characters)
5. Browse listings or add new ones

---

## External Libraries Used

| Library | Purpose | Loaded From |
|---------|---------|-------------|
| **Inter Font** | Clean, modern typography | Google Fonts CDN |
| **Font Awesome 6.5** | Icons (search, bed, bath, wifi, etc.) | cdnjs CDN |

Both are loaded via `<link>` tags in the `<head>` of each HTML file. CDN = Content Delivery Network (a remote server that hosts files so you don't have to).

---

## Future Improvements (If Extended)

- Add a real backend (Node.js, PHP, or Python) with a database
- Implement proper password hashing and authentication
- Add image file upload instead of URL pasting
- Add a map showing property locations
- Add a review/rating system for properties
- Add email notifications for landlords when students enquire
