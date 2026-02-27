# student-login.html - Student Login & Registration Page

**Purpose:** Allows students to sign in or create a new account before browsing rental listings.

---

## What This Page Does

1. Displays a centered **login card** with a student icon
2. Shows a **login form** (email + password) by default
3. Has a **signup form** (hidden by default) with name + email + password
4. User can **toggle** between login and signup by clicking the link at the bottom
5. On successful login/signup, redirects to `student.html`

---

## Structure Breakdown

### Login Card Container
```html
<div class="login-page">      <!-- Full-page centered background -->
  <div class="login-card">    <!-- White card with shadow -->
```
- `login-page` uses Flexbox (`display: flex; align-items: center; justify-content: center`) to center the card both vertically and horizontally on the page.

### Login Form
```html
<form id="studentLoginForm" class="login-form">
```
- The `id="studentLoginForm"` is crucial - JavaScript uses this to find and attach an event listener to the form
- `class="login-form"` applies the styling

### Input Fields with Icons
```html
<div class="input-icon">
  <i class="fa-solid fa-envelope"></i>
  <input type="email" id="studentEmail" placeholder="you@student.kyu.ac.ke" required>
</div>
```
- `type="email"` - Browser validates that input looks like an email
- `type="password"` - Browser hides the characters as dots
- `required` - Browser won't submit the form if this field is empty
- `placeholder` - Gray hint text shown when field is empty
- The icon is positioned absolutely inside the input using CSS

### Remember Me & Forgot Password
```html
<div class="login-options">
  <label class="remember-me">
    <input type="checkbox"> Remember me
  </label>
  <a href="#" class="forgot-link">Forgot password?</a>
</div>
```
- `type="checkbox"` creates a tickbox
- `href="#"` is a placeholder link (doesn't go anywhere in this demo)

### Hidden Signup Form
```html
<form id="studentSignupForm" class="login-form" style="display: none;">
```
- `style="display: none;"` hides this form when the page first loads
- JavaScript toggles between showing login form and signup form

### Toggle Link
```html
<p class="login-toggle">
  <span id="toggleText">Don't have an account?</span>
  <a href="#" id="toggleAuth">Sign Up</a>
</p>
```
- `id="toggleAuth"` - JavaScript listens for clicks on this link
- When clicked, it hides the login form and shows the signup form (and vice versa)
- The text also changes between "Don't have an account?" and "Already have an account?"

---

## How Login Works (JavaScript Flow)

```
1. User fills in email and password
2. User clicks "Sign In" button
3. JavaScript intercepts the form submit (e.preventDefault())
4. JavaScript checks: is email filled? is password 4+ characters?
5. If yes: saves user data to sessionStorage
6. Redirects to student.html
7. student.html checks sessionStorage - finds user data - allows access
```

---

## Key HTML Form Concepts

| Concept | Example | What It Does |
|---------|---------|-------------|
| Form tag | `<form id="...">` | Groups inputs together, can be submitted |
| Input types | `type="email"`, `type="password"` | Built-in browser validation |
| Required | `required` | Prevents empty submission |
| Labels | `<label for="studentEmail">` | Clicking label focuses the input |
| Placeholder | `placeholder="hint text"` | Shows gray hint text |
| Submit button | `<button type="submit">` | Triggers form submission |
| Inline styles | `style="display: none"` | CSS applied directly to element |

---

## Important: No data.js on This Page

Notice that this page only loads `app.js` (not `data.js`). That's because the login page doesn't need property listings - it only needs the authentication functions.
