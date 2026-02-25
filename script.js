// Initialize cart
let cart = [];
let cartCount = 0;

// CONSISTENT STORAGE KEY - must match checkout.js and games-catalog.js
const CART_STORAGE_KEY = 'krazykrossCart';

// Load cart from localStorage on page load
function loadCartFromStorage() {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            cartCount = cart.length;
            console.log('📦 Cart loaded from localStorage:', cart.length, 'items');
        } catch (error) {
            console.error('Error loading cart:', error);
            cart = [];
            cartCount = 0;
        }
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    console.log('💾 Cart saved to localStorage:', cart.length, 'items');
}

// Initialize cart on page load
loadCartFromStorage();

// Update cart badge
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        badge.textContent = cartCount;
    }
}

// ================================================
// BULLETPROOF MOBILE MENU - ADD TO script.js
// Replace existing mobile menu code with this
// ================================================

// Mobile menu toggle - GUARANTEED TO WORK
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    console.log('🔧 Mobile menu initialization:', {
        button: !!mobileMenuBtn,
        nav: !!navLinks,
        viewport: window.innerWidth + 'px'
    });
    
    if (!mobileMenuBtn) {
        console.error('❌ Mobile menu button (.mobile-menu-btn) not found!');
        return;
    }
    
    if (!navLinks) {
        console.error('❌ Navigation links (.nav-links) not found!');
        return;
    }
    
    // Click handler for hamburger button
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🍔 Hamburger clicked!');
        
        // Check current state
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            // CLOSE MENU
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            navLinks.style.display = 'none';
            console.log('❌ Menu closed');
        } else {
            // OPEN MENU
            navLinks.classList.add('active');
            mobileMenuBtn.classList.add('active');
            
            // FORCE display with inline styles (bypasses any CSS issues)
            navLinks.style.display = 'flex';
            navLinks.style.position = 'fixed';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.width = '100vw';
            navLinks.style.height = 'auto';
            navLinks.style.maxHeight = 'calc(100vh - 80px)';
            navLinks.style.overflowY = 'auto';
            navLinks.style.background = 'rgba(10, 10, 20, 0.98)';
            navLinks.style.backdropFilter = 'blur(20px)';
            navLinks.style.webkitBackdropFilter = 'blur(20px)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '0';
            navLinks.style.margin = '0';
            navLinks.style.gap = '0';
            navLinks.style.borderTop = '1px solid rgba(0, 217, 255, 0.2)';
            navLinks.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
            navLinks.style.zIndex = '99999';
            
            console.log('✅ Menu opened with inline styles');
        }
    });
    
    // Close menu when clicking nav links
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('📍 Nav link clicked');
            
            // Only close on mobile
            if (window.innerWidth <= 968) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                navLinks.style.display = 'none';
                console.log('❌ Menu closed (link clicked)');
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 968) {
            const isClickInside = navLinks.contains(e.target) || 
                                 mobileMenuBtn.contains(e.target);
            
            if (!isClickInside && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                navLinks.style.display = 'none';
                console.log('❌ Menu closed (clicked outside)');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            // Desktop - remove mobile styles
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            navLinks.style.display = '';
            navLinks.style.position = '';
            navLinks.style.top = '';
            navLinks.style.left = '';
            navLinks.style.right = '';
            console.log('📱→🖥️ Switched to desktop view');
        }
    });
    
    console.log('✅ Mobile menu fully initialized and ready!');
    console.log('💡 Click the hamburger button (☰) to test');
});
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Add to cart functionality
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const gameCard = this.closest('.game-card');
        const gameTitle = gameCard.querySelector('.game-title').textContent;
        const gamePrice = gameCard.querySelector('.price-current').textContent;
        
        // Try to get game image
        const gameImageEl = gameCard.querySelector('.game-image img');
        const gameImage = gameImageEl ? gameImageEl.src : 'https://via.placeholder.com/300x300/1a1a2e/00d9ff?text=Game';
        
        // Try to get game ID from data attribute or generate one
        const gameId = this.dataset.gameId || Date.now();
        
        console.log('🛒 Adding to cart from home page:');
        console.log('   Title:', gameTitle);
        console.log('   Price:', gamePrice);
        console.log('   Image:', gameImage);
        
        // Add to cart with COMPLETE structure
        const cartItem = {
            id: gameId,
            title: gameTitle,
            price: gamePrice,
            image: gameImage
        };
        
        cart.push(cartItem);
        cartCount++;
        saveCartToStorage();
        updateCartBadge();
        
        console.log('✅ Item added. Total items:', cartCount);
        
        // Button animation
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.background = 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
        this.style.borderColor = 'transparent';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = 'transparent';
            this.style.borderColor = 'var(--color-border)';
        }, 1500);
        
        // Show notification
        showNotification(`${gameTitle} added to cart!`);
    });
});

// Cart button click - go to checkout
// NOTE: Cart button is already an <a> tag with href="checkout.html"
// We just need to make sure it works and updates the badge
// NO need to preventDefault - let the link work naturally!

// Update cart badge when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    
    // Optional: Add click logging for debugging
    const cartBtn = document.querySelector('.btn-cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            // Don't prevent default - let the link work!
            console.log('🛒 Cart button clicked! Navigating to checkout...');
            console.log('   Cart count:', cartCount);
        });
    }
});

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: linear-gradient(135deg, #00d9ff 0%, #0066ff 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 700;
        box-shadow: 0 8px 24px rgba(0, 217, 255, 0.5);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Countdown timer
function updateCountdown() {
    const countdownElements = {
        hours: document.querySelector('.countdown-item:nth-child(1) .countdown-number'),
        minutes: document.querySelector('.countdown-item:nth-child(3) .countdown-number'),
        seconds: document.querySelector('.countdown-item:nth-child(5) .countdown-number')
    };
    
    if (!countdownElements.hours) return;
    
    // Set target time (24 hours from now)
    const targetTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function update() {
        const now = new Date().getTime();
        const difference = targetTime - now;
        
        if (difference > 0) {
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            countdownElements.hours.textContent = hours.toString().padStart(2, '0');
            countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
            countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    update();
    setInterval(update, 1000);
}

// Initialize countdown
updateCountdown();

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
    }
    
    lastScroll = currentScroll;
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('.newsletter-input').value;
        
        if (email) {
            showNotification('Thanks for subscribing!');
            newsletterForm.reset();
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.game-card, .feature-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Search button functionality
const searchBtn = document.querySelector('.btn-search');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        showNotification('Search feature coming soon!');
    });
}

// Category card click handlers
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const category = this.querySelector('.category-title').textContent;
        showNotification(`Browsing ${category} games...`);
    });
});

// Hero CTA buttons
document.querySelectorAll('.hero-actions .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.includes('Browse')) {
            const gamesSection = document.querySelector('#games');
            if (gamesSection) {
                gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (this.textContent.includes('Deals')) {
            const dealsSection = document.querySelector('#deals');
            if (dealsSection) {
                dealsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Deals CTA button
const dealsCTA = document.querySelector('.deals-content .btn-primary');
if (dealsCTA) {
    dealsCTA.addEventListener('click', () => {
        const featuredSection = document.querySelector('#featured');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Console log for debugging
console.log('Krazykross Games - Website loaded successfully!');
console.log('Cart initialized:', cart);

// Update cart badge on page load
updateCartBadge();
