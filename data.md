# data.js - Static Demo Data

**Purpose:** Contains all the sample rental property data used throughout the website. Acts as a "database" for the demo.

---

## What This File Does

Defines two things:
1. A `listings` array containing 12 rental property objects
2. An `amenityIcons` object mapping amenity names to Font Awesome icon classes

---

## The listings Array

```javascript
const listings = [ ... ];
```

### What is `const`?
`const` declares a **constant variable** - it cannot be reassigned to a different value. However, you CAN still modify the contents of an array or object declared with `const`. That's why we can `.push()` new listings to it later.

```javascript
const listings = [1, 2, 3];
listings.push(4);        // OK - modifying contents
listings = [5, 6, 7];    // ERROR - cannot reassign
```

### Each Listing Object

Each property is a JavaScript **object** (data grouped together with key-value pairs):

```javascript
{
  id: 1,                    // Unique identifier number
  title: "Sunset View...",  // Property name (string)
  landlord: "James Mwangi", // Owner's name
  phone: "+254 712...",      // Contact number
  location: "123 Uni Ave",   // Physical address
  distanceKm: 0.3,          // Distance from KyU in kilometers (decimal number)
  price: 15000,             // Monthly rent in KSh (integer)
  roomType: "1 Bedroom",    // One of: Bedsitter, Single Room, Double Room, 1 Bedroom
  vacancy: true,            // true = available, false = occupied (boolean)
  amenities: ["WiFi", ...], // Array (list) of amenity strings
  description: "A modern..",// Long text description
  photos: [                 // Array of local image paths
    "photos/1a.jpg",
    ...
  ]
}
```

### Data Types Used

| Type | Example | Meaning |
|------|---------|---------|
| Number (integer) | `price: 15000` | Whole number |
| Number (decimal) | `distanceKm: 0.3` | Number with decimal point |
| String | `title: "Sunset View"` | Text in quotes |
| Boolean | `vacancy: true` | Only `true` or `false` |
| Array | `amenities: ["WiFi", "Water"]` | Ordered list of values |
| Array of strings | `photos: ["url1", "url2"]` | List of image URLs |

### About the Photos
```javascript
photos: [
  "photos/1a.jpg",
  "photos/1b.jpg",
  "photos/1c.jpg"
]
```
- Photos are stored locally in the `photos/` folder
- Naming convention: `{listing id}{letter}.jpg` (e.g. `1a.jpg`, `1b.jpg`, `1c.jpg`)
- Each listing has 3 photo slots (a, b, c)
- Add your own property images to the `photos/` folder with matching names

---

## The amenityIcons Object

```javascript
const amenityIcons = {
  "WiFi": "fa-wifi",
  "Water": "fa-droplet",
  "Electricity": "fa-bolt",
  ...
};
```

This is a **lookup table** (also called a dictionary or map). It maps amenity names to their Font Awesome CSS class names:

```javascript
// To get the icon for "WiFi":
amenityIcons["WiFi"]     // Returns "fa-wifi"

// Used in HTML like:
`<i class="fa-solid ${amenityIcons["WiFi"]}"></i>`
// Becomes: <i class="fa-solid fa-wifi"></i>
// Which displays: the WiFi icon
```

### How It's Used in the Project

1. **Student page** - Amenity filter pills show icons next to text
2. **Listing detail page** - Each amenity in the grid shows its icon
3. **Landlord page** - Checkbox labels built from `Object.keys(amenityIcons)`

---

## Why Separate Data from Logic?

The data is in its own file (`data.js`) rather than inside `app.js` because:

1. **Separation of concerns** - Data and logic are different things
2. **Easy to modify** - You can change properties without touching the logic
3. **Reusable** - Multiple pages can load the same data file
4. **Scalable** - In a real app, this data would come from a database API instead

---

## Key JavaScript Concepts

| Concept | Example | Meaning |
|---------|---------|---------|
| `const` | `const listings = [...]` | Constant - cannot be reassigned |
| Array | `[item1, item2, ...]` | Ordered list of values |
| Object | `{ key: value }` | Collection of related key-value pairs |
| Array of objects | `[{...}, {...}]` | List where each item is an object |
| Property access | `listing.title` or `listing["title"]` | Get a value from an object |
| Boolean | `true` / `false` | Represents yes/no, on/off |
