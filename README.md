# E-commerce Product Page

This project is a responsive e-commerce product page for sneakers, developed with HTML5, CSS3 and vanilla JavaScript. It's a Frontend Mentor challenge aiming to create a pixel-perfect and accessible interface.

## Technologies Used
- **HTML5**: Semantic structure with accessibility (ARIA, skip links)
- **CSS3**: Flexbox/Grid, CSS variables, media queries for responsive design
- **JavaScript ES6+**: Handling interactions (gallery, cart, lightbox)
- **Font**: Kumbh Sans (Google Fonts)
- **Icons**: Integrated SVGs

## Implemented Issues

### Issue 1: Initial Setup
- Setting up the basic HTML/CSS/JS structure
- Configuring CSS variables and fonts
- Files: `index.html`, `CSS/styles.css`

### Issue 2: Design System
- Defining colors, typography and spacing
- CSS variables for consistency
- Files: `CSS/styles.css` (section `:root`)

### Issue 3: Header & Navigation
- Responsive header with desktop/mobile navigation
- Hamburger menu for mobile
- Mobile overlay with navigation
- Files: `index.html` (header), `CSS/styles.css` (.header, .mobile-nav), `JS/Script.js` (toggle menu)

### Issue 4: Product Gallery
- Main image gallery with navigation
- Clickable thumbnails
- Mobile navigation with prev/next buttons
- Files: `index.html` (.product-gallery), `CSS/styles.css` (.main-image, .thumbnails), `JS/Script.js` (switchImage)

### Issue 5: Product Information
- Product info section: title, description, pricing
- Responsive layout for mobile/tablet
- Files: `index.html` (.product-info), `CSS/styles.css` (.product-title, .pricing-section)

### Issue 6: Quantity Selector
- + and - buttons to select quantity
- Validation and dynamic display
- Files: `index.html` (.quantity-selector), `CSS/styles.css` (.quantity-btn), `JS/Script.js` (increase/decrease)

### Issue 7: Add to Cart
- Functional "Add to cart" button
- Adding to cart with quantity
- Files: `index.html` (.add-to-cart-btn), `JS/Script.js` (addToCart)

### Issue 8: Cart Dropdown
- Cart dropdown with items, total, checkout
- Notification badge
- Files: `index.html` (.cart-dropdown), `CSS/styles.css` (.cart-content), `JS/Script.js` (toggleCart, updateCart)

### Issue 9: Responsive Design
- Breakpoints: mobile (< 480px), tablet (481-768px), desktop (> 768px)
- Adaptation of all components
- Files: `CSS/styles.css` (media queries)

### Issue 10: Polish & Accessibility
- Accessibility: ARIA labels, focus management, skip links
- Subtle animations and transitions
- Lightbox for desktop
- Files: `index.html` (lightbox), `CSS/styles.css` (animations), `JS/Script.js` (lightbox, keyboard nav)

### ISSUE 11 – Code Review and Final Improvement

This step involves:

🔎 Reviewing all the code

🐞 Fixing bugs

⚡ Optimizing and improving the code

🎨 Enhancing the user experience

📦 Preparing the final version of the project

## File Structure
```
Challenge frontend Mentor/
├── index.html              # Main page
├── CSS/
│   └── styles.css          # Complete styles
├── JS/
│   └── Script.js           # JavaScript logic
├── images/                 # Product images and icons
├── design/                 # Design reference images
└── README.md              # This file
```

## Main Features
- ✅ Interactive image gallery
- ✅ Quantity selection
- ✅ Functional cart with dropdown
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Lightbox for desktop
- ✅ Mobile navigation
- ✅ Accessibility (WCAG)

## How to Use
1. Open `index.html` in a browser
2. Navigate the gallery with thumbnails
3. Select a quantity
4. Add to cart
5. View the cart dropdown

## Responsive Breakpoints
- **Mobile**: < 480px (font-size: 14px)
- **Tablet**: 481px - 768px (font-size: 15px)
- **Desktop**: > 768px (font-size: 16px)

## Development Notes
- Vanilla code (no frameworks)
- CSS organized by sections/issues
- Modular JavaScript with dedicated functions
- JS/CSS syntax validation performed</content>
<parameter name="filePath">/home/ir_mugisho_merci/Bureau/Tout-mes-project-dev/E-commerce-product-page/README.md