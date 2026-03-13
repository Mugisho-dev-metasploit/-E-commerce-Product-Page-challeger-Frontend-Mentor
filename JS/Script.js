
// PRODUCT IMAGE GALLERY - ISSUE 4
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(thumbnail => {
    // Click handler
    thumbnail.addEventListener('click', function() {
        switchImage.call(this);
    });
    
    // Keyboard handler
    thumbnail.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchImage.call(this);
        }
    });
});

function switchImage() {
    const newImageSrc = this.getAttribute('data-image');
    mainImage.src = newImageSrc;
    mainImage.alt = this.querySelector('img').alt;
    
    // Update active thumbnail
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    this.classList.add('active');
    
    // Update current image index for lightbox
    currentImageIndex = images.findIndex(img => img === newImageSrc);
}
// LIGHTBOX FUNCTIONALITY
// =====================================================
const lightbox = document.getElementById('lightbox');
const lightboxMainImage = document.getElementById('lightboxMainImage');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;
const images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
];

// Open lightbox
mainImage.addEventListener('click', openLightbox);

function openLightbox() {
    updateLightboxImage();
    updateLightboxThumbnails();
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Close lightbox
lightboxClose.addEventListener('click', closeLightbox);

function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scroll
}

// Close on outside click
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close on Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
    }
});

// Previous image
lightboxPrev.addEventListener('click', prevImage);

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
    updateLightboxThumbnails();
}

// Next image
lightboxNext.addEventListener('click', nextImage);

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
    updateLightboxThumbnails();
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    }
});

// Thumbnail click in lightbox
lightboxThumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
        currentImageIndex = index;
        updateLightboxImage();
        updateLightboxThumbnails();
    });
});

function updateLightboxImage() {
    lightboxMainImage.src = images[currentImageIndex];
    lightboxMainImage.alt = `Product image ${currentImageIndex + 1}`;
    
    // Sync with main gallery
    mainImage.src = images[currentImageIndex];
    mainImage.alt = `Product image ${currentImageIndex + 1}`;
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Mobile gallery navigation
const mobilePrev = document.getElementById('mobilePrev');
const mobileNext = document.getElementById('mobileNext');

if (mobilePrev && mobileNext) {
    mobilePrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
        syncMainImage();
    });
    
    mobileNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
        syncMainImage();
    });
}

function syncMainImage() {
    mainImage.src = images[currentImageIndex];
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// =====================================================
// QUANTITY SELECTOR - ISSUE 6
// =====================================================
const quantityDisplay = document.getElementById('quantityDisplay');
const increaseBtn = document.getElementById('increaseBtn');
const decreaseBtn = document.getElementById('decreaseBtn');

let quantity = 0;

increaseBtn.addEventListener('click', increaseQuantity);
decreaseBtn.addEventListener('click', decreaseQuantity);

// Keyboard support
[increaseBtn, decreaseBtn].forEach(btn => {
    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

function increaseQuantity() {
    quantity++;
    updateQuantityDisplay();
}

function decreaseQuantity() {
    if (quantity > 0) {
        quantity--;
        updateQuantityDisplay();
    }
}

function updateQuantityDisplay() {
    quantityDisplay.textContent = quantity;
}

// =====================================================
// CART MANAGEMENT - ISSUE 7 & 8
// =====================================================
const addToCartBtn = document.getElementById('addToCartBtn');
const cartDropdown = document.getElementById('cartDropdown');
const cartEmpty = document.querySelector('.cart-empty');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');
// Removed dead code: cartQuantity

let cart = [];
const PRODUCT_ID = 1;
const PRODUCT_NAME = 'Fall Limited Edition Sneakers';
const PRODUCT_PRICE = 125.00;
const PRODUCT_IMAGE = './images/image-product-1-thumbnail.jpg';

// Add to cart
addToCartBtn.addEventListener('click', addToCart);

function addToCart() {
    if (quantity > 0) {
        const existingItem = cart.find(item => item.id === PRODUCT_ID);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: PRODUCT_ID,
                name: PRODUCT_NAME,
                price: PRODUCT_PRICE,
                quantity: quantity,
                image: PRODUCT_IMAGE
            });
        }
        
        updateCartDisplay();
        quantity = 0;
        updateQuantityDisplay();
        
        // Visual feedback
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added to Cart';
        addToCartBtn.disabled = true;
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.disabled = false;
        }, 1500);
    } else {
        showNotification('Please select a quantity before adding to cart.');
    }
}

// Delete item from cart - FIX: Only delete the specific item
function deleteFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    showNotification('Item has been removed from your cart.');
}

// Update cart display
function updateCartDisplay() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cartTotalDiv = document.querySelector('.cart-total'); // Optional, might hide it if using per-item total
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartItems.style.display = 'none';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        if (cartTotalDiv) cartTotalDiv.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        if (checkoutBtn) checkoutBtn.style.display = 'block';
        if (cartTotalDiv) cartTotalDiv.style.display = 'block';
        renderCartItems();
        updateCartTotals();
    }
    
    updateCartBadge();
}

// Render cart items dynamically - FIX: Generate items from cart array
function renderCartItems() {
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.setAttribute('data-item-id', item.id);
        
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">
                    $${item.price.toFixed(2)} x ${item.quantity} <span class="total-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </p>
            </div>
            <button class="delete-btn" aria-label="Remove item">
                <img src="./images/icon-delete.svg" alt="Delete">
            </button>
        `;
        
        // Delete button handler - FIX: Delete only this specific item
        const deleteBtn = itemElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteFromCart(item.id));
        
        cartItems.appendChild(itemElement);
    });
}

// Update cart totals
function updateCartTotals() {
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update cart badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'flex';
            
            // Add bounce animation
            cartBadge.classList.remove('bounce');
            void cartBadge.offsetWidth; // Trigger reflow
            cartBadge.classList.add('bounce');
        } else {
            cartBadge.style.display = 'none';
        }
    }
}

// =====================================================
// CART DROPDOWN TOGGLE
// =====================================================
const cartBtn = document.getElementById('cartBtn');

if (cartBtn) {
    cartBtn.addEventListener('click', toggleCartDropdown);
}

function toggleCartDropdown() {
    const isHidden = cartDropdown.hasAttribute('hidden');
    
    if (isHidden) {
        cartDropdown.removeAttribute('hidden');
        cartDropdown.setAttribute('aria-hidden', 'false');
    } else {
        cartDropdown.setAttribute('hidden', '');
        cartDropdown.setAttribute('aria-hidden', 'true');
    }
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    if (cartBtn && !cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.setAttribute('hidden', '');
        cartDropdown.setAttribute('aria-hidden', 'true');
    }
});

// Close cart on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !cartDropdown.hasAttribute('hidden')) {
        cartDropdown.setAttribute('hidden', '');
        cartDropdown.setAttribute('aria-hidden', 'true');
    }
});

// =====================================================
// CHECKOUT
// =====================================================
const checkoutBtn = document.querySelector('.checkout-btn');

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', processCheckout);
}

function processCheckout() {
    if (cart.length > 0) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        // Modal confirmation instead of simple alert
        const confirmCheckout = confirm(
            `Order Confirmation\n\n` +
            `Total Items: ${totalQty}\n` +
            `Total Amount: $${total.toFixed(2)}\n\n` +
            `Proceed to checkout?`
        );
        
        if (confirmCheckout) {
            cart = [];
            updateCartDisplay();
            cartDropdown.setAttribute('hidden', '');
            cartDropdown.setAttribute('aria-hidden', 'true');
            showNotification('Your order has been successfully confirmed!');
        }
    } else {
        showNotification('Your cart is currently empty.');
    }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// =====================================================
// MOBILE MENU - ISSUE 3
// =====================================================
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

if (menuToggle && closeMenu && mobileNavOverlay) {
    menuToggle.addEventListener('click', () => {
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    closeMenu.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    });

    // Close on link click
    const mobileLinks = mobileNavOverlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Initialize
updateCartDisplay();
console.log('✓ Script loaded successfully');
