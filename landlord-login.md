# landlord-login.html - Landlord Login & Registration Page

**Purpose:** Allows landlords (property owners) to sign in or create an account before managing their listings.

---

## What This Page Does

Identical structure to `student-login.html` but with these differences:

1. Different **icon** (building instead of graduation cap)
2. Different **color scheme** (teal instead of blue)
3. Signup form has an **extra field** for phone number
4. Redirects to `landlord.html` instead of `student.html`
5. Saves role as `"landlord"` instead of `"student"` in sessionStorage

---

## Key Differences from Student Login

### Icon & Colors
```html
<div class="login-icon landlord">           <!-- teal background -->
  <i class="fa-solid fa-building"></i>       <!-- building icon -->
</div>
```
vs Student:
```html
<div class="login-icon student">             <!-- blue background -->
  <i class="fa-solid fa-graduation-cap"></i> <!-- graduation cap -->
</div>
```

### Extra Phone Field (Signup Only)
```html
<div class="login-field">
  <label for="landlordSignupPhone">Phone Number</label>
  <div class="input-icon">
    <i class="fa-solid fa-phone"></i>
    <input type="tel" id="landlordSignupPhone" placeholder="+254 712 345 678" required>
  </div>
</div>
```
- `type="tel"` - Tells mobile browsers to show a phone keyboard
- Landlords need a phone number so students can contact them about properties

### Button Class
```html
<button type="submit" class="login-btn landlord-btn">  <!-- teal button -->
```
vs Student:
```html
<button type="submit" class="login-btn student-btn">   <!-- blue button -->
```

---

## Role-Based Access

When a landlord logs in, JavaScript saves:
```javascript
sessionStorage.setItem('kyuUser', JSON.stringify({
  role: 'landlord',    // <-- This is the key difference
  name: name,
  email: email,
  phone: phone         // <-- Extra field for landlords
}));
```

The `role: 'landlord'` value is what allows access to `landlord.html` and blocks access to `student.html` (and vice versa).
