/*
 * Static demo data - 12 sample rental listings and an amenity-to-icon lookup.
 * Used by app.js for rendering cards, filtering, and detail pages.
 * Photos reference the local photos/ folder — add your own images there.
 */

const listings = [
  {
    id: 1,
    title: "Sunset View Apartments",
    landlord: "James Mwangi",
    phone: "+254 712 345 678",
    location: "123 University Avenue, Westlands",
    distanceKm: 0.3,
    price: 15000,
    roomType: "1 Bedroom",
    vacancy: true,
    amenities: ["WiFi", "Water", "Electricity", "Security", "Parking"],
    description: "A modern 1-bedroom apartment just a 5-minute walk from campus. Spacious living area with plenty of natural light, tiled floors, and a fitted kitchen. Ideal for students who want comfort and convenience.",
    photos: [
      "photos/1a.jpg",
      "photos/1b.jpg",
      "photos/1c.jpg"
    ]
  },
  {
    id: 2,
    title: "Green Valley Hostels",
    landlord: "Faith Njeri",
    phone: "+254 723 456 789",
    location: "45 College Road, South B",
    distanceKm: 0.8,
    price: 8000,
    roomType: "Single Room",
    vacancy: true,
    amenities: ["Water", "Electricity", "Security"],
    description: "Affordable single-room hostel units designed for students. Each unit comes with a private bathroom, study desk, and wardrobe.",
    photos: [
      "photos/2a.jpg",
      "photos/2b.jpg",
      "photos/2c.jpg"
    ]
  },
  {
    id: 3,
    title: "Prestige Heights",
    landlord: "David Ochieng",
    phone: "+254 734 567 890",
    location: "78 Ngong Road, Kilimani",
    distanceKm: 2.5,
    price: 25000,
    roomType: "1 Bedroom",
    vacancy: true,
    amenities: ["WiFi", "Water", "Electricity", "Parking", "Security", "Gym", "CCTV"],
    description: "Premium 1-bedroom apartment in the upscale Kilimani area. Features a gym, 24/7 CCTV surveillance, ample parking, and a rooftop terrace with stunning city views.",
    photos: [
      "photos/3a.jpg",
      "photos/3b.jpg",
      "photos/3c.jpg"
    ]
  },
  {
    id: 4,
    title: "Campus Edge Studios",
    landlord: "Grace Wambui",
    phone: "+254 745 678 901",
    location: "12 Gate Avenue, Main Campus",
    distanceKm: 0.1,
    price: 12000,
    roomType: "Bedsitter",
    vacancy: false,
    amenities: ["WiFi", "Water", "Electricity", "Security"],
    description: "Compact bedsitter apartments right at the university gate. Comes with a bed area, desk, and kitchenette. Perfect for focused students who want to be close to campus.",
    photos: [
      "photos/4a.jpg",
      "photos/4b.jpg",
      "photos/4c.jpg"
    ]
  },
  {
    id: 5,
    title: "Maple Court Residences",
    landlord: "Peter Kamau",
    phone: "+254 756 789 012",
    location: "200 Thika Road, Roysambu",
    distanceKm: 3.0,
    price: 18000,
    roomType: "Double Room",
    vacancy: true,
    amenities: ["WiFi", "Water", "Electricity", "Parking", "Security", "CCTV"],
    description: "Spacious double-room apartments along Thika Road with easy access to public transport. Gated community with round-the-clock security and CCTV.",
    photos: [
      "photos/5a.jpg",
      "photos/5b.jpg",
      "photos/5c.jpg"
    ]
  },
  {
    id: 6,
    title: "Unity Bedsitters",
    landlord: "Mary Akinyi",
    phone: "+254 767 890 123",
    location: "33 Jogoo Road, Buruburu",
    distanceKm: 4.5,
    price: 6000,
    roomType: "Bedsitter",
    vacancy: true,
    amenities: ["Water", "Electricity", "Security"],
    description: "Budget-friendly bedsitter units ideal for students on a tight budget. Each unit has a private bathroom and a small cooking area. Located in a quiet residential neighborhood.",
    photos: [
      "photos/6a.jpg",
      "photos/6b.jpg",
      "photos/6c.jpg"
    ]
  },
  {
    id: 7,
    title: "Lakeview Apartments",
    landlord: "Samuel Kipchoge",
    phone: "+254 778 901 234",
    location: "55 Riverside Drive, Lavington",
    distanceKm: 1.5,
    price: 22000,
    roomType: "1 Bedroom",
    vacancy: false,
    amenities: ["WiFi", "Water", "Electricity", "Parking", "Security", "Gym"],
    description: "Elegant apartments with a view of the nearby dam. Includes gym access and assigned parking. A serene environment perfect for studying and relaxation.",
    photos: [
      "photos/7a.jpg",
      "photos/7b.jpg",
      "photos/7c.jpg"
    ]
  },
  {
    id: 8,
    title: "Scholar's Nest",
    landlord: "Angela Muthoni",
    phone: "+254 789 012 345",
    location: "8 Library Lane, University Quarter",
    distanceKm: 0.5,
    price: 10000,
    roomType: "Single Room",
    vacancy: true,
    amenities: ["WiFi", "Water", "Electricity", "Security"],
    description: "Purpose-built student accommodation with high-speed WiFi. Located just 500m from the main library. Ideal for students who value a quiet study environment.",
    photos: [
      "photos/8a.jpg",
      "photos/8b.jpg",
      "photos/8c.jpg"
    ]
  },
  {
    id: 9,
    title: "Royal Palm Villas",
    landlord: "Henry Otieno",
    phone: "+254 790 123 456",
    location: "100 Karen Road, Karen",
    distanceKm: 5.0,
    price: 35000,
    roomType: "1 Bedroom",
    vacancy: true,
    amenities: ["WiFi", "Water", "Electricity", "Parking", "Security", "Gym", "CCTV"],
    description: "Luxurious 1-bedroom villa in the leafy suburb of Karen. Features a private garden, modern finishes, gym, and dedicated parking. Ideal for postgraduate students or shared living.",
    photos: [
      "photos/9a.jpg",
      "photos/9b.jpg",
      "photos/9c.jpg"
    ]
  },
  {
    id: 10,
    title: "Harmony Flats",
    landlord: "Lucy Wanjiku",
    phone: "+254 701 234 567",
    location: "22 Moi Avenue, CBD",
    distanceKm: 1.8,
    price: 14000,
    roomType: "Double Room",
    vacancy: true,
    amenities: ["Water", "Electricity", "Security", "CCTV", "Parking"],
    description: "Well-maintained double-room flats in the city centre with excellent public transport connections. Secure building with CCTV and controlled access. Walking distance to shops and restaurants.",
    photos: [
      "photos/10a.jpg",
      "photos/10b.jpg",
      "photos/10c.jpg"
    ]
  },
  {
    id: 11,
    title: "Parkside Rooms",
    landlord: "Joseph Mutua",
    phone: "+254 712 098 765",
    location: "67 Uhuru Gardens Road, Langata",
    distanceKm: 3.5,
    price: 9000,
    roomType: "Single Room",
    vacancy: true,
    amenities: ["Water", "Electricity", "Security", "Parking"],
    description: "Cozy single rooms next to Uhuru Gardens. Quiet, leafy environment perfect for students who prefer a peaceful setting. On-site caretaker available.",
    photos: [
      "photos/11a.jpg",
      "photos/11b.jpg",
      "photos/11c.jpg"
    ]
  },
  {
    id: 12,
    title: "The Hub Student Living",
    landlord: "James Mwangi",
    phone: "+254 712 345 678",
    location: "5 Innovation Drive, Techpark",
    distanceKm: 1.0,
    price: 16000,
    roomType: "Double Room",
    vacancy: false,
    amenities: ["WiFi", "Water", "Electricity", "Security", "Gym", "CCTV"],
    description: "Modern co-living space designed for university students. Features communal areas, a gym, fast WiFi throughout, and regular social events. All-inclusive pricing covers utilities.",
    photos: [
      "photos/12a.jpg",
      "photos/12b.jpg",
      "photos/12c.jpg"
    ]
  }
];

/* Maps amenity names to Font Awesome icon class names */
const amenityIcons = {
  "WiFi": "fa-wifi",
  "Water": "fa-droplet",
  "Electricity": "fa-bolt",
  "Parking": "fa-square-parking",
  "Security": "fa-shield-halved",
  "Gym": "fa-dumbbell",
  "CCTV": "fa-video"
};
