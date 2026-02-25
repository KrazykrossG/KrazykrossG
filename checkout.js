// ============================================
// CHECKOUT PAGE - ENHANCED VERSION
// Works with Games & PS Plus Subscriptions
// Integrated with EmailJS & Stock Management
// ============================================

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== CHECKOUT PAGE LOADED ===');
    console.log('🎮 Enhanced version - Games & PS Plus compatible');
    
    setTimeout(() => {
        loadAndDisplayCart();
        setupEventListeners();
        updateCartBadge();
    }, 100);
});

// ============================================
// CART MANAGEMENT
// ============================================

// Get cart from localStorage
function getCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('krazykrossCart');
        console.log('📦 Raw cart data from localStorage:', savedCart);
        
        if (!savedCart || savedCart === 'null' || savedCart === 'undefined') {
            console.log('⚠️ No cart found in localStorage');
            return [];
        }
        
        const cart = JSON.parse(savedCart);
        console.log('✅ Parsed cart:', cart);
        console.log('📊 Cart length:', cart.length);
        
        if (!Array.isArray(cart)) {
            console.error('❌ Cart is not an array!');
            return [];
        }
        
        return cart;
        
    } catch (error) {
        console.error('❌ Error loading cart:', error);
        return [];
    }
}

// Save cart to localStorage
function saveCartToStorage(cart) {
    try {
        localStorage.setItem('krazykrossCart', JSON.stringify(cart));
        console.log('💾 Cart saved:', cart);
        updateCartBadge();
    } catch (error) {
        console.error('❌ Error saving cart:', error);
    }
}

// Update cart badge (navbar)
function updateCartBadge() {
    const cart = getCartFromStorage();
    const badges = document.querySelectorAll('.cart-badge');
    
    badges.forEach(badge => {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    });
}

// ============================================
// DISPLAY CART
// ============================================

// Load cart and display
function loadAndDisplayCart() {
    console.log('🔄 Loading and displaying cart...');
    
    const cart = getCartFromStorage();
    console.log('📦 Cart to display:', cart);
    console.log('📊 Number of items:', cart.length);
    
    if (cart.length === 0) {
        console.log('📭 Cart is empty - showing empty state');
        showEmptyCart();
        return;
    }
    
    console.log('🛒 Cart has items - displaying...');
    displayCartItems(cart);
    calculateTotals(cart);
}

// Display cart items
function displayCartItems(cart) {
    console.log('🎨 Starting to display cart items...');
    
    let cartContainer = document.getElementById('cart-items');
    
    if (!cartContainer) {
        console.log('⚠️ #cart-items not found, trying .cart-items...');
        cartContainer = document.querySelector('.cart-items');
    }
    
    if (!cartContainer) {
        console.error('❌ CRITICAL: Cart container not found!');
        return;
    }
    
    console.log('✅ Cart container found:', cartContainer);
    
    // Clear existing content
    cartContainer.innerHTML = '';
    console.log('🧹 Cleared container contents');
    
    // Create and append cart items
    let itemsAdded = 0;
    cart.forEach((item, index) => {
        console.log(`📝 Creating item ${index + 1}:`, item);
        const cartItem = createCartItemElement(item, index);
        cartContainer.appendChild(cartItem);
        itemsAdded++;
    });
    
    console.log(`✅ Successfully displayed ${itemsAdded} items`);
}

// Create individual cart item element - ENHANCED
function createCartItemElement(item, index) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.setAttribute('data-index', index);
    cartItem.setAttribute('data-item-id', item.id || index);
    
    // Detect item type
    const isGame = !item.type || item.type === 'game';
    const isPsPlus = item.type === 'ps-plus-subscription';
    
    // Extract price (handle both string and number formats)
    let priceText = '';
    if (typeof item.price === 'string') {
        priceText = item.price;
    } else if (typeof item.price === 'number') {
        priceText = `Rs. ${item.price.toFixed(2)}`;
    } else {
        priceText = 'Rs. 0.00';
    }
    
    // Get image
    const imageUrl = item.image || 'https://via.placeholder.com/100x100/1a1a2e/00d9ff?text=Game';
    
    // Build item details based on type
    let itemDetails = '';
    
    if (isPsPlus) {
        // PS Plus subscription details
        itemDetails = `
            <h4 class="cart-item-title">${item.title || 'PS Plus Subscription'}</h4>
            ${item.selectedOption ? `<p class="cart-item-option">Account: ${item.selectedOption}</p>` : ''}
            ${item.accountType ? `<p class="cart-item-account-type">${item.accountType}</p>` : ''}
            ${item.duration ? `<p class="cart-item-duration">Duration: ${item.duration}</p>` : ''}
            <p class="cart-item-price">${priceText}</p>
        `;
    } else {
        // Regular game details
        itemDetails = `
            <h4 class="cart-item-title">${item.title || 'Game'}</h4>
            ${item.rentalPeriod ? `<p class="cart-item-rental">Rental: ${item.rentalPeriod}</p>` : ''}
            <p class="cart-item-price">${priceText}</p>
        `;
    }
    
    console.log(`  Creating cart item: ${item.title}`);
    console.log(`    Type: ${isPsPlus ? 'PS Plus' : 'Game'}`);
    console.log(`    Price: ${priceText}`);
    console.log(`    Image: ${imageUrl}`);
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${imageUrl}" 
                 alt="${item.title}"
                 onerror="this.src='https://via.placeholder.com/100x100/1a1a2e/00d9ff?text=Game'">
        </div>
        <div class="cart-item-details">
            ${itemDetails}
        </div>
        <button class="cart-item-remove" onclick="removeCartItem(${index})" title="Remove from cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    return cartItem;
}

// Show empty cart message
function showEmptyCart() {
    console.log('📭 Showing empty cart message...');
    
    let cartContainer = document.getElementById('cart-items');
    if (!cartContainer) {
        cartContainer = document.querySelector('.cart-items');
    }
    
    if (cartContainer) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <a href="games.html" class="btn btn-secondary" style="margin-right: 10px;">Browse Games</a>
                <a href="ps-plus.html" class="btn btn-secondary">View PS Plus</a>
            </div>
        `;
        console.log('✅ Empty cart message displayed');
    }
    
    updateTotalDisplay('subtotal', 0);
    updateTotalDisplay('tax', 0);
    updateTotalDisplay('total', 0);
}

// ============================================
// PRICE CALCULATION - ENHANCED
// ============================================

// Calculate and display totals with robust price parsing
function calculateTotals(cart) {
    console.log('💰 Calculating totals...');
    let subtotal = 0;
    
    cart.forEach((item, idx) => {
        console.log(`\n🔍 Item ${idx + 1}: ${item.title}`);
        
        let priceNumber = 0;
        
        // Handle different price formats
        if (typeof item.price === 'number') {
            // Direct number
            priceNumber = item.price;
            console.log(`   Direct number: ${priceNumber}`);
        } else if (typeof item.price === 'string') {
            // String format (e.g., "Rs. 16500.00" or "Rs 16,500.00")
            const priceString = item.price;
            console.log(`   Raw price string: "${priceString}"`);
            
            // ROBUST PRICE PARSING
            let cleaned = priceString.replace(/[^0-9.]/g, '');
            console.log(`   Cleaned string: "${cleaned}"`);
            
            // Handle multiple decimals
            const parts = cleaned.split('.');
            if (parts.length > 2) {
                cleaned = parts[0] + '.' + parts[1];
                console.log(`   Multiple decimals fixed: "${cleaned}"`);
            }
            
            // Parse to float
            priceNumber = parseFloat(cleaned);
        }
        
        // Validation
        if (isNaN(priceNumber) || priceNumber <= 0) {
            console.warn(`   ⚠️ WARNING: Invalid price for ${item.title}, using 0`);
            priceNumber = 0;
        }
        
        console.log(`   ✅ Final parsed price: ${priceNumber}`);
        
        subtotal += priceNumber;
    });
    
    // Calculate tax (0% by default)
    const taxRate = 0;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    console.log('\n💵 TOTALS CALCULATED:');
    console.log(`   Subtotal: Rs. ${subtotal.toFixed(2)}`);
    console.log(`   Tax (${taxRate * 100}%): Rs. ${tax.toFixed(2)}`);
    console.log(`   Total: Rs. ${total.toFixed(2)}`);
    
    // Update display
    updateTotalDisplay('subtotal', subtotal);
    updateTotalDisplay('tax', tax);
    updateTotalDisplay('total', total);
}

// Update total display
function updateTotalDisplay(elementId, amount) {
    const element = document.getElementById(elementId);
    
    if (element) {
        element.textContent = `Rs. ${amount.toFixed(2)}`;
        console.log(`  ✅ Updated #${elementId}: Rs. ${amount.toFixed(2)}`);
    } else {
        console.warn(`  ⚠️ Element #${elementId} not found`);
    }
}

// ============================================
// CART ITEM REMOVAL
// ============================================

// Remove item from cart
function removeCartItem(index) {
    console.log('🗑️ Removing item at index:', index);
    
    let cart = getCartFromStorage();
    
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        console.log('  Removing:', removedItem.title);
        
        cart.splice(index, 1);
        
        saveCartToStorage(cart);
        
        if (cart.length === 0) {
            console.log('  Cart now empty');
            showEmptyCart();
        } else {
            console.log('  Reloading cart display...');
            loadAndDisplayCart();
        }
        
        showNotification('Item removed from cart', 'info');
    } else {
        console.error('❌ Invalid index:', index);
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

// Show notification
function showNotification(message, type) {
    type = type || 'success';
    
    console.log(`📢 Notification: ${message} (${type})`);
    
    // Remove existing notification
    const existing = document.querySelector('.checkout-notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'checkout-notification';
    
    let bgGradient;
    switch(type) {
        case 'error':
            bgGradient = 'linear-gradient(135deg, #ff4757 0%, #ff6348 100%)';
            break;
        case 'info':
            bgGradient = 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)';
            break;
        default:
            bgGradient = 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${bgGradient};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 500;
        box-shadow: 0 8px 24px rgba(0, 217, 255, 0.5);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Setup event listeners
function setupEventListeners() {
    console.log('🎧 Setting up event listeners...');
    
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handlePlaceOrder);
        console.log('✅ Checkout form listener attached');
    } else {
        console.error('❌ Checkout form #checkout-form not found!');
    }
}

// ============================================
// ORDER PROCESSING - ENHANCED
// ============================================

function handlePlaceOrder(event) {
    event.preventDefault();
    console.log('📝 Form submitted - processing order...');
    
    const cart = getCartFromStorage();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        console.error('❌ Cannot place order - cart is empty');
        return;
    }
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get customer info
    const customerInfo = {
        firstName: formData.get('firstName') || formData.get('first-name') || '',
        lastName: formData.get('lastName') || formData.get('last-name') || '',
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        country: formData.get('country') || '',
        notes: formData.get('notes') || ''
    };
    
    console.log('👤 Customer info:', customerInfo);
    
    // Calculate totals - ENHANCED for both games and PS Plus
    let subtotal = 0;
    cart.forEach(item => {
        let priceNumber = 0;
        
        if (typeof item.price === 'number') {
            priceNumber = item.price;
        } else if (typeof item.price === 'string') {
            const cleaned = item.price.replace(/[^0-9.]/g, '');
            const parts = cleaned.split('.');
            const finalCleaned = parts.length > 2 ? parts[0] + '.' + parts[1] : cleaned;
            priceNumber = parseFloat(finalCleaned);
        }
        
        if (!isNaN(priceNumber) && priceNumber > 0) {
            subtotal += priceNumber;
        }
    });
    
    const taxRate = 0;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    const orderId = 'KKG-' + Date.now();
    
    // ============================================
    // PROCESS STOCK REDUCTION - ENHANCED
    // ============================================
    
    console.log('📊 Processing stock reduction...');
    
    let stockProcessSuccess = true;
    
    // Check for regular game stock management
    if (typeof processCheckoutWithStock === 'function') {
        console.log('  🎮 Processing game stock...');
        const gameStockOk = processCheckoutWithStock();
        
        if (!gameStockOk) {
            console.error('❌ Game stock processing failed');
            stockProcessSuccess = false;
        } else {
            console.log('  ✅ Game stock reduced successfully');
        }
    }
    
    // Check for PS Plus stock management
    if (stockProcessSuccess && typeof processPsPlusCheckout === 'function') {
        console.log('  💎 Processing PS Plus stock...');
        const psPlusStockOk = processPsPlusCheckout();
        
        if (!psPlusStockOk) {
            console.error('❌ PS Plus stock processing failed');
            stockProcessSuccess = false;
        } else {
            console.log('  ✅ PS Plus stock reduced successfully');
        }
    }
    
    // If stock processing failed, stop checkout
    if (!stockProcessSuccess) {
        showNotification('Some items are no longer available. Please review your cart.', 'error');
        return;
    }
    
    console.log('✅ All stock processing complete');
    
    // ============================================
    // END STOCK PROCESSING
    // ============================================
    
    // Create order object
    const order = {
        orderId: orderId,
        date: new Date().toISOString(),
        items: cart,
        customerInfo: customerInfo,
        subtotal: `Rs. ${subtotal.toFixed(2)}`,
        tax: `Rs. ${tax.toFixed(2)}`,
        total: `Rs. ${total.toFixed(2)}`
    };
    
    console.log('📦 Order created:', order);
    
    // ============================================
    // SEND EMAIL VIA EMAILJS
    // ============================================
    
    // Prepare items list for email - ENHANCED
    const itemsList = cart.map(item => {
        let itemText = item.title;
        
        // Add PS Plus specific details
        if (item.type === 'ps-plus-subscription') {
            if (item.selectedOption) {
                itemText += ` (${item.selectedOption})`;
            }
        }
        
        // Add price
        const priceText = typeof item.price === 'string' ? item.price : `Rs. ${item.price.toFixed(2)}`;
        itemText += ` - ${priceText}`;
        
        return itemText;
    }).join('\n');
    
    // Prepare email data
    const emailData = {
        order_id: orderId,
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_country: customerInfo.country,
        items_list: itemsList,
        subtotal: `Rs. ${subtotal.toFixed(2)}`,
        tax: `Rs. ${tax.toFixed(2)}`,
        total: `Rs. ${total.toFixed(2)}`,
        order_date: new Date().toLocaleString(),
        notes: customerInfo.notes || 'No special notes'
    };
    
    console.log('📧 Preparing to send email...');
    console.log('Email data:', emailData);
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS not loaded! Make sure you added the script to HTML.');
        alert('Email service not available. Order will be saved but you may not receive confirmation email.');
        
        // Continue with order anyway
        saveOrderAndRedirect(order);
        return;
    }
    
    // Send email using EmailJS
    emailjs.send('service_zmg2vcd', 'template_xc01baj', emailData)
        .then(function(response) {
            console.log('✅ Email sent successfully!', response.status, response.text);
            showNotification('Order placed! Confirmation email sent.', 'success');
            
            // Save order and redirect
            saveOrderAndRedirect(order);
            
        }, function(error) {
            console.error('❌ Email send failed:', error);
            console.error('Error details:', error.text);
            
            // Show error but still save order
            showNotification('Order placed! Email notification may be delayed.', 'info');
            
            // Save order and redirect anyway
            saveOrderAndRedirect(order);
        });
}

// Helper function to save order and redirect
function saveOrderAndRedirect(order) {
    console.log('💾 Saving order...');
    
    // Save to orders array
    const orders = JSON.parse(localStorage.getItem('krazykross_orders') || '[]');
    orders.push(order);
    localStorage.setItem('krazykross_orders', JSON.stringify(orders));
    console.log('💾 Order saved to localStorage');
    
    // Clear cart
    localStorage.removeItem('krazykrossCart');
    console.log('🧹 Cart cleared from localStorage');
    
    // Update cart badge
    updateCartBadge();
    
    // Redirect to confirmation page
    const confirmUrl = `order-confirmation.html?orderId=${order.orderId}`;
    console.log('🔄 Redirecting to:', confirmUrl);
    
    setTimeout(() => {
        window.location.href = confirmUrl;
    }, 500);
}

// ============================================
// UNIVERSAL ADD TO CART FUNCTION
// ============================================

// Universal function to add items to cart (can be called from any page)
window.addToCartUniversal = function(item) {
    console.log('🛒 Adding to cart (universal):', item);
    
    if (!item || !item.title) {
        console.error('❌ Invalid item:', item);
        return false;
    }
    
    const cart = getCartFromStorage();
    
    // Check if item already exists
    const existingIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingIndex >= 0) {
        console.log('⚠️ Item already in cart');
        showNotification('This item is already in your cart!', 'info');
        return false;
    }
    
    // Add item to cart
    cart.push(item);
    
    // Save cart
    saveCartToStorage(cart);
    
    console.log('✅ Item added to cart');
    showNotification(`${item.title} added to cart!`, 'success');
    
    return true;
};

// ============================================
// DEBUG FUNCTIONS
// ============================================

// Debug function
function debugCheckout() {
    console.log('\n=== CHECKOUT DEBUG INFO ===');
    
    const cart = getCartFromStorage();
    console.log('Cart items:', cart);
    console.log('Cart length:', cart.length);
    
    console.log('\nItem types:');
    cart.forEach((item, i) => {
        const type = item.type || 'game';
        console.log(`${i + 1}. ${item.title} - Type: ${type}`);
    });
    
    console.log('\nPrice parsing test:');
    cart.forEach((item, i) => {
        let priceDisplay;
        if (typeof item.price === 'number') {
            priceDisplay = item.price;
        } else {
            const cleaned = item.price.replace(/[^0-9.]/g, '');
            priceDisplay = parseFloat(cleaned);
        }
        console.log(`${i + 1}. "${item.price}" → ${priceDisplay}`);
    });
    
    const container = document.getElementById('cart-items');
    console.log('\nCart container:', container);
    
    console.log('\nEmailJS loaded:', typeof emailjs !== 'undefined');
    console.log('Game stock system loaded:', typeof processCheckoutWithStock === 'function');
    console.log('PS Plus stock system loaded:', typeof processPsPlusCheckout === 'function');
    
    console.log('======================\n');
}

// ============================================
// MAKE FUNCTIONS GLOBALLY ACCESSIBLE
// ============================================

window.removeCartItem = removeCartItem;
window.debugCheckout = debugCheckout;
window.getCartFromStorage = getCartFromStorage;
window.saveCartToStorage = saveCartToStorage;
window.showNotification = showNotification;
window.updateCartBadge = updateCartBadge;

console.log('✅ Enhanced Checkout.js loaded');
console.log('🎮 Compatible with Games & PS Plus Subscriptions');
console.log('💡 Type debugCheckout() in console to see debug info');