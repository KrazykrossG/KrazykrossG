// ============================================
// PS PLUS GOOGLE SHEETS INTEGRATION
// Frontend connector for PS Plus stock management
// ============================================

// Configuration - UPDATE THIS WITH YOUR WEB APP URL
const PSPLUS_GOOGLE_SHEETS_CONFIG = {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbw91a5_6OzJ5YWgovLuf3Xcky6ZUc-p3AUY1PAmAKcQxeuV7UpIRwXAcIRLpndSvB21/exec', // Get this after deploying Google Apps Script
    useGoogleSheets: true, // Set to false to use localStorage only
    fallbackToLocal: true  // Use localStorage if Google Sheets fails
};

// ============================================
// GOOGLE SHEETS API CALLS
// ============================================

/**
 * Get all PS Plus stock from Google Sheets
 */
async function getPsPlusStockFromSheets() {
    if (!PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        return null;
    }
    
    try {
        const url = PSPLUS_GOOGLE_SHEETS_CONFIG.webAppUrl + '?action=getPsPlusStock';
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ PS Plus stock loaded from Google Sheets');
            return data.stock;
        } else {
            console.error('❌ Google Sheets error:', data.error);
            return null;
        }
    } catch (error) {
        console.error('❌ Error fetching PS Plus stock from Sheets:', error);
        return null;
    }
}

/**
 * Check specific PS Plus option stock in Google Sheets
 */
async function checkPsPlusStockInSheets(optionId, quantity) {
    if (!PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        return null;
    }
    
    try {
        const url = PSPLUS_GOOGLE_SHEETS_CONFIG.webAppUrl + 
                    '?action=checkPsPlusStock&optionId=' + optionId + 
                    '&quantity=' + (quantity || 1);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            return {
                available: data.inStock,
                stock: data.available,
                isLowStock: data.isLowStock,
                isOutOfStock: data.isOutOfStock
            };
        } else {
            console.error('❌ Check stock error:', data.error);
            return null;
        }
    } catch (error) {
        console.error('❌ Error checking PS Plus stock:', error);
        return null;
    }
}

/**
 * Update PS Plus stock in Google Sheets
 */
async function updatePsPlusStockInSheets(optionId, quantity, operation) {
    if (!PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        return { success: false, error: 'Google Sheets not enabled' };
    }
    
    try {
        const url = PSPLUS_GOOGLE_SHEETS_CONFIG.webAppUrl + '?action=updatePsPlusStock';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                optionId: optionId,
                quantity: quantity,
                operation: operation // 'reduce' or 'increase'
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ PS Plus stock updated in Google Sheets');
        } else {
            console.error('❌ Update stock error:', data.error);
        }
        
        return data;
    } catch (error) {
        console.error('❌ Error updating PS Plus stock:', error);
        return { success: false, error: error.toString() };
    }
}

/**
 * Process PS Plus order in Google Sheets
 */
async function processPsPlusOrderInSheets(orderData) {
    if (!PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        return { success: false, error: 'Google Sheets not enabled' };
    }
    
    try {
        const url = PSPLUS_GOOGLE_SHEETS_CONFIG.webAppUrl + '?action=processPsPlusOrder';
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ PS Plus order processed in Google Sheets');
        } else {
            console.error('❌ Process order error:', data.error);
        }
        
        return data;
    } catch (error) {
        console.error('❌ Error processing PS Plus order:', error);
        return { success: false, error: error.toString() };
    }
}

// ============================================
// HYBRID STOCK MANAGEMENT
// Uses Google Sheets when available, falls back to localStorage
// ============================================

/**
 * Initialize PS Plus stock (hybrid mode)
 */
async function initializePsPlusStockHybrid() {
    console.log('📦 Initializing PS Plus stock (hybrid mode)...');
    
    // Try Google Sheets first
    if (PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        const sheetsStock = await getPsPlusStockFromSheets();
        
        if (sheetsStock) {
            // Save to localStorage as cache
            localStorage.setItem('krazykross_psplus_stock_cache', JSON.stringify(sheetsStock));
            localStorage.setItem('krazykross_psplus_stock_source', 'google-sheets');
            
            console.log('✅ Using Google Sheets for PS Plus stock');
            return sheetsStock;
        }
    }
    
    // Fallback to localStorage
    if (PSPLUS_GOOGLE_SHEETS_CONFIG.fallbackToLocal) {
        console.log('⚠️ Falling back to localStorage for PS Plus stock');
        localStorage.setItem('krazykross_psplus_stock_source', 'local');
        return initializePsPlusStock(); // Use original localStorage function
    }
    
    console.error('❌ No stock source available');
    return null;
}

/**
 * Check PS Plus stock (hybrid mode)
 */
async function checkPsPlusAvailabilityHybrid(optionId, quantity) {
    quantity = quantity || 1;
    
    // Try Google Sheets first
    if (PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        const sheetsResult = await checkPsPlusStockInSheets(optionId, quantity);
        
        if (sheetsResult) {
            return sheetsResult;
        }
    }
    
    // Fallback to localStorage
    if (PSPLUS_GOOGLE_SHEETS_CONFIG.fallbackToLocal) {
        return checkPsPlusAvailability(optionId, quantity); // Use original localStorage function
    }
    
    return {
        available: false,
        stock: 0,
        message: 'Stock check failed',
        isOutOfStock: true
    };
}

/**
 * Process checkout with Google Sheets integration
 */
async function processPsPlusCheckoutHybrid() {
    const cart = JSON.parse(localStorage.getItem('krazykrossCart') || '[]');
    
    if (cart.length === 0) {
        return true;
    }
    
    console.log('📊 Processing PS Plus checkout (hybrid mode)...');
    
    // Find PS Plus items in cart
    const psPlusItems = cart.filter(function(item) {
        return item.type === 'ps-plus-subscription';
    });
    
    if (psPlusItems.length === 0) {
        return true; // No PS Plus items
    }
    
    // Use Google Sheets if available
    if (PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        console.log('📊 Processing with Google Sheets...');
        
        // Check all items first
        for (var i = 0; i < psPlusItems.length; i++) {
            const item = psPlusItems[i];
            const optionId = item.id;
            
            const stockCheck = await checkPsPlusStockInSheets(optionId, 1);
            
            if (!stockCheck || !stockCheck.available) {
                showPsPlusNotification('Sorry, ' + item.title + ' is no longer available!', 'error');
                console.error('❌ Stock check failed for:', optionId);
                return false;
            }
        }
        
        // All checks passed - reduce stock for each
        for (var i = 0; i < psPlusItems.length; i++) {
            const item = psPlusItems[i];
            const optionId = item.id;
            
            const result = await updatePsPlusStockInSheets(optionId, 1, 'reduce');
            
            if (!result.success) {
                console.error('❌ Failed to reduce stock for:', optionId);
                return false;
            }
        }
        
        console.log('✅ PS Plus checkout processed with Google Sheets');
        return true;
    }
    
    // Fallback to localStorage
    if (PSPLUS_GOOGLE_SHEETS_CONFIG.fallbackToLocal) {
        console.log('⚠️ Processing with localStorage...');
        return processPsPlusCheckout(); // Use original localStorage function
    }
    
    console.error('❌ No checkout method available');
    return false;
}

/**
 * Sync stock from Google Sheets to localStorage
 */
async function syncPsPlusStockFromSheets() {
    if (!PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
        console.log('⚠️ Google Sheets not enabled');
        return false;
    }
    
    console.log('🔄 Syncing PS Plus stock from Google Sheets...');
    
    const sheetsStock = await getPsPlusStockFromSheets();
    
    if (sheetsStock) {
        // Convert Google Sheets format to localStorage format
        const localStock = {};
        
        for (var optionId in sheetsStock) {
            if (sheetsStock.hasOwnProperty(optionId)) {
                const item = sheetsStock[optionId];
                
                localStock[optionId] = {
                    optionId: item.optionId,
                    subId: item.subId,
                    title: item.tier + ' - ' + item.label,
                    tier: item.tier,
                    label: item.label,
                    accountType: item.accountType,
                    price: item.price,
                    totalStock: item.totalStock,
                    available: item.available,
                    sold: item.sold,
                    minStock: item.minStock
                };
            }
        }
        
        // Save to localStorage
        localStorage.setItem('krazykross_psplus_stock', JSON.stringify(localStock));
        localStorage.setItem('krazykross_psplus_stock_last_sync', new Date().toISOString());
        
        console.log('✅ PS Plus stock synced from Google Sheets');
        
        // Update badges
        if (typeof updateAllPsPlusStockBadges === 'function') {
            updateAllPsPlusStockBadges();
        }
        
        return true;
    }
    
    console.error('❌ Failed to sync PS Plus stock');
    return false;
}

// ============================================
// AUTO-SYNC ON PAGE LOAD
// ============================================

// Sync stock when page loads (if Google Sheets enabled)
if (PSPLUS_GOOGLE_SHEETS_CONFIG.useGoogleSheets) {
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit before syncing to avoid race conditions
        setTimeout(function() {
            syncPsPlusStockFromSheets();
        }, 2000);
        
        // Auto-sync every 5 minutes
        setInterval(function() {
            syncPsPlusStockFromSheets();
        }, 5 * 60 * 1000);
    });
}

// ============================================
// GLOBAL API (Extended)
// ============================================

window.psPlusStockSheets = {
    getStock: getPsPlusStockFromSheets,
    checkStock: checkPsPlusStockInSheets,
    updateStock: updatePsPlusStockInSheets,
    processOrder: processPsPlusOrderInSheets,
    sync: syncPsPlusStockFromSheets,
    
    // Hybrid functions
    initHybrid: initializePsPlusStockHybrid,
    checkHybrid: checkPsPlusAvailabilityHybrid,
    processCheckoutHybrid: processPsPlusCheckoutHybrid
};

console.log('✅ PS Plus Google Sheets integration loaded');
console.log('💡 Commands:');
console.log('   - window.psPlusStockSheets.sync() - Sync from Google Sheets');
console.log('   - window.psPlusStockSheets.getStock() - Get all stock from Sheets');
