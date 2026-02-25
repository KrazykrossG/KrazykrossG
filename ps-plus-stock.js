// ============================================
// PS PLUS STOCK MANAGEMENT SYSTEM - FIXED
// With support for multiple pricing options
// ============================================

const PS_PLUS_STOCK_CONFIG = {
    storageKey: 'krazykross_psplus_stock',
    lowStockThreshold: 1,
    defaultStock: 3
};

// ============================================
// INITIALIZE PS PLUS STOCK
// ============================================
function initializePsPlusStock() {
    let stock = localStorage.getItem(PS_PLUS_STOCK_CONFIG.storageKey);
    
    if (!stock) {
        console.log('📦 Initializing PS Plus stock...');
        const initialStock = {};
        
        // Create stock entry for each pricing option
        psPlusSubscriptions.forEach(function(sub) {
            sub.pricingOptions.forEach(function(option) {
                initialStock[option.id] = {
                    optionId: option.id,
                    subId: sub.id,
                    title: sub.title,
                    tier: sub.tier,
                    label: option.label,
                    accountType: option.accountType,
                    price: option.price,
                    totalStock: PS_PLUS_STOCK_CONFIG.defaultStock,
                    available: PS_PLUS_STOCK_CONFIG.defaultStock,
                    sold: 0,
                    minStock: PS_PLUS_STOCK_CONFIG.lowStockThreshold
                };
            });
        });
        
        localStorage.setItem(PS_PLUS_STOCK_CONFIG.storageKey, JSON.stringify(initialStock));
        console.log('✅ PS Plus stock initialized');
        
        return initialStock;
    }
    
    return JSON.parse(stock);
}

// ============================================
// GET STOCK FOR PRICING OPTION
// ============================================
function getPsPlusStock(optionId) {
    const allStock = initializePsPlusStock();
    return allStock[optionId] || null;
}

// ============================================
// CHECK STOCK AVAILABILITY
// ============================================
function checkPsPlusAvailability(optionId, quantity) {
    quantity = quantity || 1;
    
    const optionStock = getPsPlusStock(optionId);
    
    if (!optionStock) {
        return {
            available: false,
            stock: 0,
            message: 'Option not found',
            isLowStock: false,
            isOutOfStock: true
        };
    }
    
    return {
        available: optionStock.available >= quantity,
        stock: optionStock.available,
        isLowStock: optionStock.available > 0 && optionStock.available <= optionStock.minStock,
        isOutOfStock: optionStock.available === 0,
        message: optionStock.available >= quantity ? 'In stock' : 'Not enough stock'
    };
}

// ============================================
// REDUCE STOCK (When purchased)
// ============================================
function reducePsPlusStock(optionId, quantity) {
    quantity = quantity || 1;
    
    const stockData = initializePsPlusStock();
    
    if (!stockData[optionId]) {
        console.error('❌ Pricing option not found:', optionId);
        return false;
    }
    
    if (stockData[optionId].available < quantity) {
        console.error('❌ Not enough stock. Available:', stockData[optionId].available);
        return false;
    }
    
    // Reduce available, increase sold
    stockData[optionId].available -= quantity;
    stockData[optionId].sold += quantity;
    
    // Save
    localStorage.setItem(PS_PLUS_STOCK_CONFIG.storageKey, JSON.stringify(stockData));
    
    console.log('✅ Stock reduced for', optionId);
    console.log('   Available:', stockData[optionId].available);
    console.log('   Sold:', stockData[optionId].sold);
    
    return true;
}

// ============================================
// ADD STOCK (Admin)
// ============================================
function addPsPlusStockQuantity(optionId, quantity) {
    const stockData = initializePsPlusStock();
    
    if (!stockData[optionId]) {
        console.error('❌ Pricing option not found');
        return false;
    }
    
    stockData[optionId].totalStock += quantity;
    stockData[optionId].available += quantity;
    
    localStorage.setItem(PS_PLUS_STOCK_CONFIG.storageKey, JSON.stringify(stockData));
    
    console.log('✅ Added', quantity, 'stock to', optionId);
    
    return true;
}

// ============================================
// UPDATE STOCK BADGE ON CARD
// ============================================
function addPsPlusStockBadge(card, optionId) {
    const stockStatus = checkPsPlusAvailability(optionId);
    const cardHeader = card.querySelector('.subscription-header');
    
    if (!cardHeader) {
        console.warn('⚠️ Card header not found');
        return;
    }
    
    // Remove existing badge
    const existingBadge = cardHeader.querySelector('.stock-badge-psplus');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Create stock badge
    const badge = document.createElement('div');
    badge.className = 'stock-badge-psplus';
    
    if (stockStatus.isOutOfStock) {
        badge.classList.add('out-of-stock');
        badge.textContent = '❌ Out of Stock';
        
        // Disable add to cart button
        const addBtn = card.querySelector('.btn-add-subscription');
        if (addBtn) {
            addBtn.disabled = true;
            addBtn.textContent = 'Sold Out';
            addBtn.style.opacity = '0.5';
            addBtn.style.cursor = 'not-allowed';
        }
    } else if (stockStatus.isLowStock) {
        badge.classList.add('low-stock');
        badge.textContent = '⚡ Only ' + stockStatus.stock + ' left!';
    } else {
        badge.classList.add('in-stock');
        badge.textContent = '✓ ' + stockStatus.stock + ' available';
    }
    
    cardHeader.appendChild(badge);
}

// ============================================
// UPDATE ALL STOCK BADGES
// ============================================
function updateAllPsPlusStockBadges() {
    const cards = document.querySelectorAll('.subscription-card');
    let updated = 0;
    
    cards.forEach(function(card) {
        // Get selected pricing option
        const selectedRadio = card.querySelector('.pricing-radio:checked');
        if (selectedRadio) {
            const optionId = selectedRadio.value;
            addPsPlusStockBadge(card, optionId);
            updated++;
        }
    });
    
    console.log('✅ Updated PS Plus stock badges on', updated, 'cards');
}

// ============================================
// ADD TO CART WITH STOCK CHECK - FIXED
// ============================================
function addPsPlusToCart(subscription, button) {
    console.log('🛒 Attempting to add PS Plus to cart:', subscription.title);
    
    // Get the pricing option details
    const pricingOption = subscription.pricingOption;
    const optionId = pricingOption.id;
    
    console.log('   Selected option:', pricingOption.label);
    console.log('   Price:', pricingOption.price);
    
    // Check stock first
    const stockStatus = checkPsPlusAvailability(optionId);
    
    if (!stockStatus.available) {
        showPsPlusNotification('Sorry, ' + pricingOption.label + ' is currently out of stock!', 'error');
        console.error('❌ Out of stock');
        return false;
    }
    
    // Check if this exact option is already in cart
    const cart = JSON.parse(localStorage.getItem('krazykrossCart') || '[]');
    const alreadyInCart = cart.find(function(item) {
        return item.id === optionId;
    });
    
    if (alreadyInCart) {
        showPsPlusNotification('This subscription option is already in your cart!', 'warning');
        return false;
    }
    
    // Add to cart
    const cartItem = {
        id: optionId,  // Use pricing option ID as unique identifier
        title: subscription.title + ' - ' + pricingOption.label,
        price: 'Rs ' + pricingOption.price.toFixed(2),
        image: subscription.image,
        type: 'ps-plus-subscription',
        tier: subscription.tier,
        duration: subscription.duration,
        accountType: pricingOption.accountType,
        platform: pricingOption.platform,
        pricingType: pricingOption.type
    };
    
    cart.push(cartItem);
    localStorage.setItem('krazykrossCart', JSON.stringify(cart));
    
    console.log('✅ Added to cart. Total items:', cart.length);
    
    // Update cart badge
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(function(badge) {
        badge.textContent = cart.length;
        badge.style.display = 'flex';
    });
    
    showPsPlusNotification(subscription.title + ' - ' + pricingOption.label + ' added to cart!', 'success');
    
    // Animate button
    if (button && button.textContent) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
        
        setTimeout(function() {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
    }
    
    return true;
}

// ============================================
// PROCESS CHECKOUT - REDUCE STOCK
// ============================================
function processPsPlusCheckout() {
    const cart = JSON.parse(localStorage.getItem('krazykrossCart') || '[]');
    
    if (cart.length === 0) {
        return true;
    }
    
    console.log('📊 Processing PS Plus checkout stock...');
    
    // Find PS Plus items in cart
    const psPlusItems = cart.filter(function(item) {
        return item.type === 'ps-plus-subscription';
    });
    
    if (psPlusItems.length === 0) {
        return true; // No PS Plus items, continue
    }
    
    // Check and reduce stock for each PS Plus item
    for (var i = 0; i < psPlusItems.length; i++) {
        const item = psPlusItems[i];
        const optionId = item.id; // This is the pricing option ID
        const stockStatus = checkPsPlusAvailability(optionId);
        
        if (!stockStatus.available) {
            showPsPlusNotification('Sorry, ' + item.title + ' is no longer available!', 'error');
            console.error('❌ Stock check failed for:', optionId);
            return false;
        }
        
        // Reduce stock
        if (!reducePsPlusStock(optionId, 1)) {
            console.error('❌ Failed to reduce stock for:', optionId);
            return false;
        }
    }
    
    console.log('✅ PS Plus checkout stock processing complete');
    
    // Update displays
    setTimeout(function() {
        if (typeof updateAllPsPlusStockBadges === 'function') {
            updateAllPsPlusStockBadges();
        }
    }, 1000);
    
    return true;
}

// ============================================
// SHOW NOTIFICATION
// ============================================
function showPsPlusNotification(message, type) {
    type = type || 'info';
    
    // Remove existing
    var existing = document.querySelector('.psplus-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    var notification = document.createElement('div');
    notification.className = 'psplus-notification';
    
    var bgColor;
    if (type === 'error') {
        bgColor = 'linear-gradient(135deg, #ff4757 0%, #ff6348 100%)';
    } else if (type === 'warning') {
        bgColor = 'linear-gradient(135deg, #ffbe0b 0%, #ff9500 100%)';
    } else if (type === 'success') {
        bgColor = 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
    } else {
        bgColor = 'linear-gradient(135deg, #5f27cd 0%, #341f97 100%)';
    }
    
    notification.style.cssText = 'position: fixed; top: 100px; right: 24px; left: auto; background: ' + bgColor + '; color: white; padding: 16px 24px; border-radius: 12px; font-weight: 600; box-shadow: 0 8px 24px rgba(0,0,0,0.4); z-index: 10000; animation: slideInRight 0.3s ease-out; max-width: 400px;';
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// ADMIN FUNCTIONS
// ============================================

// Reset stock
function resetPsPlusStock() {
    localStorage.removeItem(PS_PLUS_STOCK_CONFIG.storageKey);
    initializePsPlusStock();
    console.log('✅ PS Plus stock reset');
    
    if (typeof updateAllPsPlusStockBadges === 'function') {
        updateAllPsPlusStockBadges();
    }
}

// View all stock
function viewPsPlusStock() {
    const stock = initializePsPlusStock();
    console.table(stock);
    return stock;
}

// Set stock for specific pricing option
function setPsPlusStock(optionId, newStock) {
    const stockData = initializePsPlusStock();
    
    if (!stockData[optionId]) {
        console.error('❌ Pricing option not found');
        return false;
    }
    
    const currentSold = stockData[optionId].sold;
    
    stockData[optionId].totalStock = newStock;
    stockData[optionId].available = Math.max(0, newStock - currentSold);
    
    localStorage.setItem(PS_PLUS_STOCK_CONFIG.storageKey, JSON.stringify(stockData));
    
    console.log('✅ Stock set for', optionId, 'to', newStock);
    
    return true;
}

// ============================================
// GLOBAL API
// ============================================
window.psPlusStock = {
    check: checkPsPlusAvailability,
    reduce: reducePsPlusStock,
    add: addPsPlusStockQuantity,
    set: setPsPlusStock,
    reset: resetPsPlusStock,
    viewAll: viewPsPlusStock,
    updateBadges: updateAllPsPlusStockBadges,
    processCheckout: processPsPlusCheckout,
    addToCart: addPsPlusToCart  // Added to global API
};

// Auto-initialize
initializePsPlusStock();

console.log('✅ PS Plus Stock Management loaded');
console.log('💡 Commands: window.psPlusStock.viewAll(), window.psPlusStock.reset()');
