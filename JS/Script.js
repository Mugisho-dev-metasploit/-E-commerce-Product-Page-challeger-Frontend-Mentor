



// ===================================================== 
// ISSUE 3: HEADER & MOBILE NAVIGATION
// Responsive header with hamburger menu for mobile
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


// ===================================================== 
// ISSUE 4: PRODUCT IMAGE GALLERY
// Main image gallery with thumbnail selection
// =====================================================
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

