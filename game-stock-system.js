// ============================================
// GAME STOCK MANAGEMENT SYSTEM - WITH GOOGLE SHEETS SYNC
// For Krazykross Games - Enhanced with cloud sync
// ============================================

const STOCK_CONFIG = {
    storageKey: 'krazykross_game_stock',
    lowStockThreshold: 1,
    defaultStock: 3,
    googleAppsScriptURL: 'https://script.google.com/macros/s/AKfycbwxoNEQfVt0MDciUiZx5C_fzSYPc1u0OYmrRjz4CxzrrPuf4WMsPpE7iW9Eesxxy0qx1w/exec', // ADD YOUR DEPLOYED WEB APP URL HERE
    syncEnabled: true,       // Set to true after deploying Google Apps Script
    syncInterval: 300000,     // Sync every 5 minutes (300000ms)
    lastSyncKey: 'krazykross_last_sync'
};

// ============================================
// GOOGLE SHEETS SYNC
// ============================================

async function syncWithGoogleSheets(action, data) {
    if (!STOCK_CONFIG.syncEnabled || !STOCK_CONFIG.googleAppsScriptURL) {
        console.warn('⚠️ Google Sheets sync not configured');
        return null;
    }
    
    try {
        const url = STOCK_CONFIG.googleAppsScriptURL;
        const options = {
            method: action === 'get' ? 'GET' : 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (action !== 'get' && data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Google Sheets sync successful');
            localStorage.setItem(STOCK_CONFIG.lastSyncKey, new Date().toISOString());
            return result;
        } else {
            console.error('❌ Google Sheets sync failed:', result.error);
            return null;
        }
        
    } catch (error) {
        console.error('❌ Sync error:', error);
        return null;
    }
}

async function pullStockFromGoogleSheets() {
    if (!STOCK_CONFIG.syncEnabled) {
        console.log('ℹ️ Cloud sync disabled - using local stock');
        return false;
    }
    
    try {
        const url = STOCK_CONFIG.googleAppsScriptURL + '?action=getStock';
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success && result.stock) {
            localStorage.setItem(STOCK_CONFIG.storageKey, JSON.stringify(result.stock));
            console.log('✅ Stock pulled from Google Sheets');
            console.log('📊 Last sync:', result.timestamp);
            return true;
        }
        
        return false;
        
    } catch (error) {
        console.error('❌ Pull error:', error);
        return false;
    }
}

async function pushStockToGoogleSheets(gameId, operation, quantity) {
    if (!STOCK_CONFIG.syncEnabled) {
        return true; // Continue with local operation
    }
    
    try {
        const url = STOCK_CONFIG.googleAppsScriptURL;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'updateStock',
                gameId: gameId,
                operation: operation,
                quantity: quantity
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Stock pushed to Google Sheets');
            return true;
        }
        
        console.warn('⚠️ Failed to push to Google Sheets, continuing with local');
        return true; // Still return true to continue locally
        
    } catch (error) {
        console.error('❌ Push error:', error);
        return true; // Continue locally even if sync fails
    }
}

async function sendOrderToGoogleSheets(orderData) {
    if (!STOCK_CONFIG.syncEnabled) {
        return true;
    }
    
    try {
        const url = STOCK_CONFIG.googleAppsScriptURL;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'processOrder',
                ...orderData
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Order sent to Google Sheets:', result.orderId);
            return result.orderId;
        }
        
        return null;
        
    } catch (error) {
        console.error('❌ Order sync error:', error);
        return null;
    }
}

// Auto-sync on page load
document.addEventListener('DOMContentLoaded', function() {
    if (STOCK_CONFIG.syncEnabled) {
        pullStockFromGoogleSheets().then(synced => {
            if (synced) {
                console.log('🔄 Auto-sync completed');
                if (typeof updateAllStockBadges === 'function') {
                    updateAllStockBadges();
                }
            }
        });
        
        // Set up periodic sync
        setInterval(() => {
            pullStockFromGoogleSheets();
        }, STOCK_CONFIG.syncInterval);
    }
});

// ============================================
// INITIALIZE STOCK
// ============================================
function initializeGameStock() {
    let stock = localStorage.getItem(STOCK_CONFIG.storageKey);
    
    if (!stock) {
        console.log('📦 Initializing stock for first time...');
        const initialStock = {};
        
        // Create stock entry for each game in database
        gamesDatabase.forEach(game => {
            initialStock[game.id] = {
                gameId: game.id,
                title: game.title,
                totalStock: STOCK_CONFIG.defaultStock,
                available: STOCK_CONFIG.defaultStock,
                rented: 0,
                minStock: STOCK_CONFIG.lowStockThreshold
            };
        });
        
        localStorage.setItem(STOCK_CONFIG.storageKey, JSON.stringify(initialStock));
        console.log('✅ Stock initialized for', Object.keys(initialStock).length, 'games');
        
        return initialStock;
    }
    
    return JSON.parse(stock);
}

// ============================================
// GET STOCK FOR GAME
// ============================================
function getStockForGame(gameId) {
    const allStock = initializeGameStock();
    return allStock[gameId] || null;
}

// ============================================
// CHECK STOCK AVAILABILITY
// ============================================
function checkStockAvailability(gameId, quantity) {
    quantity = quantity || 1;
    
    const gameStock = getStockForGame(gameId);
    
    if (!gameStock) {
        return {
            available: false,
            stock: 0,
            message: 'Game not found',
            isLowStock: false,
            isOutOfStock: true
        };
    }
    
    return {
        available: gameStock.available >= quantity,
        stock: gameStock.available,
        isLowStock: gameStock.available > 0 && gameStock.available <= gameStock.minStock,
        isOutOfStock: gameStock.available === 0,
        message: gameStock.available >= quantity ? 'In stock' : 'Not enough stock'
    };
}

// ============================================
// REDUCE STOCK (When rented) - WITH SYNC
// ============================================
async function reduceGameStock(gameId, quantity) {
    quantity = quantity || 1;
    
    const allStock = initializeGameStock();
    
    if (!allStock[gameId]) {
        console.error('❌ Game not found:', gameId);
        return false;
    }
    
    if (allStock[gameId].available < quantity) {
        console.error('❌ Not enough stock. Available:', allStock[gameId].available, 'Requested:', quantity);
        return false;
    }
    
    // Reduce available, increase rented
    allStock[gameId].available -= quantity;
    allStock[gameId].rented += quantity;
    
    // Save locally
    localStorage.setItem(STOCK_CONFIG.storageKey, JSON.stringify(allStock));
    
    console.log('✅ Stock reduced for game ID', gameId);
    console.log('   Available:', allStock[gameId].available);
    console.log('   Rented:', allStock[gameId].rented);
    
    // Sync to Google Sheets
    await pushStockToGoogleSheets(gameId, 'reduce', quantity);
    
    return true;
}

// ============================================
// RETURN GAME (Increase stock) - WITH SYNC
// ============================================
async function returnGameStock(gameId, quantity) {
    quantity = quantity || 1;
    
    const allStock = initializeGameStock();
    
    if (!allStock[gameId]) {
        console.error('❌ Game not found');
        return false;
    }
    
    // Increase available, decrease rented
    allStock[gameId].available += quantity;
    allStock[gameId].rented = Math.max(0, allStock[gameId].rented - quantity);
    
    // Save locally
    localStorage.setItem(STOCK_CONFIG.storageKey, JSON.stringify(allStock));
    
    console.log('✅ Game returned - stock increased');
    
    // Sync to Google Sheets
    await pushStockToGoogleSheets(gameId, 'add', quantity);
    
    return true;
}

// ============================================
// ADD STOCK (Admin) - WITH SYNC
// ============================================
async function addGameStock(gameId, quantity) {
    const allStock = initializeGameStock();
    
    if (!allStock[gameId]) {
        console.error('❌ Game not found');
        return false;
    }
    
    allStock[gameId].totalStock += quantity;
    allStock[gameId].available += quantity;
    
    localStorage.setItem(STOCK_CONFIG.storageKey, JSON.stringify(allStock));
    
    console.log('✅ Added', quantity, 'stock to game ID', gameId);
    
    // Sync to Google Sheets
    await pushStockToGoogleSheets(gameId, 'add', quantity);
    
    return true;
}

// ============================================
// ADD STOCK BADGE TO GAME CARD
// ============================================
function addStockBadgeToGameCard(card, gameId) {
    const stockStatus = checkStockAvailability(gameId);
    const gameImage = card.querySelector('.game-image');
    
    if (!gameImage) {
        console.warn('⚠️ Game image not found in card');
        return;
    }
    
    // Remove existing badge
    const existingBadge = gameImage.querySelector('.stock-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Create stock badge
    const badge = document.createElement('div');
    badge.className = 'stock-badge';
    
    if (stockStatus.isOutOfStock) {
        badge.classList.add('out-of-stock');
        badge.textContent = '❌ Out of Stock';
        
        // Disable add to cart button
        const addBtn = card.querySelector('.btn-add-cart');
        if (addBtn) {
            addBtn.disabled = true;
            addBtn.textContent = 'Sold Out';
            addBtn.style.opacity = '0.5';
            addBtn.style.cursor = 'not-allowed';
            addBtn.style.background = 'rgba(255, 71, 87, 0.2)';
        }
    } else if (stockStatus.isLowStock) {
        badge.classList.add('low-stock');
        badge.textContent = '⚡ Only ' + stockStatus.stock + ' left!';
    } else {
        badge.classList.add('in-stock');
        badge.textContent = '✔ ' + stockStatus.stock + ' available';
    }
    
    gameImage.appendChild(badge);
}

// ============================================
// UPDATE ALL STOCK BADGES
// ============================================
function updateAllStockBadges() {
    const gameCards = document.querySelectorAll('.game-card');
    let updated = 0;
    
    gameCards.forEach(card => {
        const addBtn = card.querySelector('.btn-add-cart');
        if (addBtn) {
            const gameId = parseInt(addBtn.getAttribute('data-game-id'));
            if (gameId) {
                addStockBadgeToGameCard(card, gameId);
                updated++;
            }
        }
    });
    
    console.log('✅ Updated stock badges on', updated, 'game cards');
    
    // Show sync status
    if (STOCK_CONFIG.syncEnabled) {
        const lastSync = localStorage.getItem(STOCK_CONFIG.lastSyncKey);
        if (lastSync) {
            const syncDate = new Date(lastSync);
            console.log('🔄 Last synced:', syncDate.toLocaleString());
        }
    }
}

// ============================================
// ENHANCED ADD TO CART WITH STOCK CHECK
// ============================================
function addToCartWithStockCheck(game, addToCartBtn) {
    console.log('🛒 Attempting to add to cart:', game.title, '(ID:', game.id, ')');
    
    // Check stock first
    const stockStatus = checkStockAvailability(game.id);
    
    if (!stockStatus.available) {
        showStockNotification('Sorry, ' + game.title + ' is currently out of stock!', 'error');
        console.error('❌ Out of stock');
        return false;
    }
    
    // Check how many of this game are already in cart
    const cart = JSON.parse(localStorage.getItem('krazykrossCart') || '[]');
    const itemsInCart = cart.filter(function(item) {
        return item.id === game.id;
    }).length;
    
    if (itemsInCart >= stockStatus.stock) {
        showStockNotification('Only ' + stockStatus.stock + ' available! You already have ' + itemsInCart + ' in cart.', 'warning');
        console.warn('⚠️ Cannot add more - limit reached');
        return false;
    }
    
    // Add to cart
    const CART_STORAGE_KEY = 'krazykrossCart';
    
    const cartItem = {
        id: game.id,
        title: game.title,
        price: 'Rs ' + game.price.toFixed(2),
        image: game.image
    };
    
    cart.push(cartItem);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    
    console.log('✅ Added to cart. Total items in cart:', cart.length);
    
    // Update cart badge
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(function(badge) {
        badge.textContent = cart.length;
        badge.style.display = 'flex';
    });
    
    showStockNotification(game.title + ' added to cart!', 'success');
    
    // Animate button
    const originalText = addToCartBtn.textContent;
    addToCartBtn.textContent = 'Added!';
    addToCartBtn.style.background = 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
    addToCartBtn.style.borderColor = 'transparent';
    
    setTimeout(function() {
        addToCartBtn.textContent = originalText;
        addToCartBtn.style.background = 'transparent';
        addToCartBtn.style.borderColor = 'var(--color-border)';
    }, 1500);
    
    return true;
}

// ============================================
// PROCESS CHECKOUT - REDUCE STOCK & SYNC TO GOOGLE SHEETS
// ============================================
async function processCheckoutWithStock(customerData) {
    const cart = JSON.parse(localStorage.getItem('krazykrossCart') || '[]');
    
    if (cart.length === 0) {
        console.log('⚠️ Cart is empty');
        return false;
    }
    
    console.log('📊 Processing checkout stock for', cart.length, 'items...');
    
    // Count quantities per game
    const quantities = {};
    cart.forEach(function(item) {
        quantities[item.id] = (quantities[item.id] || 0) + 1;
    });
    
    console.log('📦 Quantities:', quantities);
    
    // Check all items are still available
    for (var gameId in quantities) {
        if (quantities.hasOwnProperty(gameId)) {
            const id = parseInt(gameId);
            const qty = quantities[gameId];
            const stockStatus = checkStockAvailability(id, qty);
            
            if (!stockStatus.available) {
                const game = gamesDatabase.find(function(g) { return g.id === id; });
                const title = game ? game.title : 'Unknown game';
                
                showStockNotification('Sorry, ' + title + ' is no longer available in requested quantity!', 'error');
                console.error('❌ Stock check failed for game ID:', id);
                return false;
            }
        }
    }
    
    // Prepare order data for Google Sheets
    const orderItems = [];
    let totalAmount = 0;
    
    for (var gameId in quantities) {
        if (quantities.hasOwnProperty(gameId)) {
            const id = parseInt(gameId);
            const qty = quantities[gameId];
            const game = gamesDatabase.find(g => g.id === id);
            
            if (game) {
                orderItems.push({
                    gameId: id,
                    title: game.title,
                    quantity: qty,
                    price: game.price.toFixed(2)
                });
                totalAmount += game.price * qty;
            }
        }
    }
    
    // Send order to Google Sheets
    const orderData = {
        customerName: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        items: orderItems,
        totalAmount: totalAmount.toFixed(2),
        paymentMethod: customerData.paymentMethod || 'Not specified'
    };
    
    const orderId = await sendOrderToGoogleSheets(orderData);
    
    if (orderId) {
        console.log('✅ Order recorded in Google Sheets:', orderId);
    }
    
    // All checks passed - reduce stock
    for (var gameId in quantities) {
        if (quantities.hasOwnProperty(gameId)) {
            const id = parseInt(gameId);
            const qty = quantities[gameId];
            
            const reduced = await reduceGameStock(id, qty);
            if (!reduced) {
                console.error('❌ Failed to reduce stock for game ID:', id);
                return false;
            }
        }
    }
    
    console.log('✅ Checkout stock processing complete');
    
    // Update displays
    if (typeof updateAllStockBadges === 'function') {
        setTimeout(function() {
            updateAllStockBadges();
        }, 1000);
    }
    
    return orderId || true;
}

// ============================================
// SHOW NOTIFICATION
// ============================================
function showStockNotification(message, type) {
    type = type || 'info';
    
    // Remove existing
    var existing = document.querySelector('.stock-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    var notification = document.createElement('div');
    notification.className = 'stock-notification';
    
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

// Reset stock to default
function resetAllStock() {
    localStorage.removeItem(STOCK_CONFIG.storageKey);
    initializeGameStock();
    console.log('✅ Stock reset to default values');
    
    if (typeof updateAllStockBadges === 'function') {
        updateAllStockBadges();
    }
}

// View all stock
function viewAllStock() {
    const stock = initializeGameStock();
    console.table(stock);
    return stock;
}

// Set stock for specific game
async function setGameStock(gameId, newStock) {
    const allStock = initializeGameStock();
    
    if (!allStock[gameId]) {
        console.error('❌ Game not found');
        return false;
    }
    
    const currentRented = allStock[gameId].rented;
    
    allStock[gameId].totalStock = newStock;
    allStock[gameId].available = Math.max(0, newStock - currentRented);
    
    localStorage.setItem(STOCK_CONFIG.storageKey, JSON.stringify(allStock));
    
    console.log('✅ Stock set for game ID', gameId, 'to', newStock);
    
    // Sync to Google Sheets
    await pushStockToGoogleSheets(gameId, 'set', allStock[gameId].available);
    
    return true;
}

// Enable/disable Google Sheets sync
function toggleGoogleSheetsSync(enable, webAppURL) {
    STOCK_CONFIG.syncEnabled = enable;
    if (webAppURL) {
        STOCK_CONFIG.googleAppsScriptURL = webAppURL;
    }
    
    console.log(enable ? '✅ Google Sheets sync enabled' : '❌ Google Sheets sync disabled');
    
    if (enable && webAppURL) {
        console.log('🔗 Web App URL:', webAppURL);
        pullStockFromGoogleSheets();
    }
}

// ============================================
// GLOBAL API
// ============================================
window.gameStock = {
    check: checkStockAvailability,
    reduce: reduceGameStock,
    return: returnGameStock,
    add: addGameStock,
    set: setGameStock,
    reset: resetAllStock,
    viewAll: viewAllStock,
    updateBadges: updateAllStockBadges,
    processCheckout: processCheckoutWithStock,
    syncPull: pullStockFromGoogleSheets,
    syncPush: pushStockToGoogleSheets,
    toggleSync: toggleGoogleSheetsSync
};

// ============================================
// AUTO-INITIALIZE
// ============================================
initializeGameStock();

console.log('✅ Game Stock Management System loaded');
console.log('💡 Available commands:');
console.log('   - window.gameStock.viewAll() - View all stock');
console.log('   - window.gameStock.check(gameId) - Check stock for game');
console.log('   - window.gameStock.add(gameId, quantity) - Add stock');
console.log('   - window.gameStock.set(gameId, total) - Set total stock');
console.log('   - window.gameStock.reset() - Reset to defaults');
console.log('   - window.gameStock.syncPull() - Pull from Google Sheets');
console.log('   - window.gameStock.toggleSync(true, "URL") - Enable sync');

if (STOCK_CONFIG.syncEnabled) {
    console.log('☁️ Google Sheets sync: ENABLED');
} else {
    console.log('📴 Google Sheets sync: DISABLED');
    console.log('💡 To enable: window.gameStock.toggleSync(true, "YOUR_WEB_APP_URL")');
}
