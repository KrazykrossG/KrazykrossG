// ============================================
// PS PLUS PAGE FUNCTIONALITY - ENHANCED
// With multiple pricing options selection
// ============================================

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 PS Plus page loading...');
    
    // Display subscription cards
    displaySubscriptionCards();
    
    // Setup FAQ toggles
    setupFAQToggles();
    
    // Update stock badges after short delay
    setTimeout(function() {
        if (typeof updateAllPsPlusStockBadges === 'function') {
            updateAllPsPlusStockBadges();
        }
    }, 500);
    
    // Update cart badge
    updateCartBadge();
    
    console.log('✅ PS Plus page loaded');
});

// ============================================
// DISPLAY SUBSCRIPTION CARDS
// ============================================
function displaySubscriptionCards() {
    const container = document.getElementById('subscriptions-grid');
    
    if (!container) {
        console.error('❌ Subscriptions grid container not found');
        return;
    }
    
    container.innerHTML = '';
    
    psPlusSubscriptions.forEach(function(subscription) {
        const card = createSubscriptionCard(subscription);
        container.appendChild(card);
    });
    
    console.log('✅ Displayed', psPlusSubscriptions.length, 'subscription cards');
}

// ============================================
// CREATE SUBSCRIPTION CARD - ENHANCED
// ============================================
function createSubscriptionCard(subscription) {
    const card = document.createElement('div');
    card.className = 'subscription-card';
    card.setAttribute('data-sub-id', subscription.id);
    
    // Add premium class for Deluxe
    if (subscription.tier === 'Deluxe') {
        card.classList.add('premium');
    }
    
    // Features list HTML
    const featuresHTML = subscription.features.map(function(feature) {
        return '<li>' + feature + '</li>';
    }).join('');
    
    // Badge HTML
    const badgeHTML = subscription.badge ? 
        '<div class="subscription-badge">' + subscription.badge + '</div>' : '';
    
    // Pricing options radio buttons HTML
    const pricingOptionsHTML = subscription.pricingOptions.map(function(option, index) {
        const isRecommended = option.recommended ? '<span class="recommended-tag">Recommended</span>' : '';
        const checkedAttr = index === 0 ? 'checked' : ''; // First option selected by default
        
        return '\
            <label class="pricing-option ' + (option.recommended ? 'recommended' : '') + '">\
                <input type="radio" \
                       name="pricing_' + subscription.id + '" \
                       value="' + option.id + '" \
                       data-price="' + option.price + '" \
                       data-label="' + option.label + '" \
                       data-account-type="' + option.accountType + '" \
                       ' + checkedAttr + '\
                       class="pricing-radio">\
                <div class="pricing-option-content">\
                    <div class="pricing-option-header">\
                        <span class="pricing-option-label">' + option.label + '</span>\
                        ' + isRecommended + '\
                    </div>\
                    <div class="pricing-option-price">Rs. ' + option.price.toLocaleString() + '</div>\
                    <div class="pricing-option-description">' + option.description + '</div>\
                </div>\
            </label>\
        ';
    }).join('');
    
    // Get default (first) price
    const defaultPrice = subscription.pricingOptions[0].price;
    
    card.innerHTML = '\
        <div class="subscription-header">\
            <div class="subscription-tier-label">' + subscription.tier + '</div>\
            ' + badgeHTML + '\
        </div>\
        \
        <div class="subscription-image-container">\
            <img src="' + subscription.image + '" alt="' + subscription.title + '" class="subscription-tier-image">\
        </div>\
        \
        <div class="subscription-body">\
            <h2 class="subscription-title">' + subscription.title + '</h2>\
            <p class="subscription-description">' + subscription.description + '</p>\
            \
            <div class="pricing-options-container">\
                <h4 class="pricing-options-title">Select Account Type:</h4>\
                <div class="pricing-options-grid">\
                    ' + pricingOptionsHTML + '\
                </div>\
            </div>\
            \
            <div class="subscription-features">\
                <h4>What\'s Included:</h4>\
                <ul>' + featuresHTML + '</ul>\
            </div>\
            \
            <div class="subscription-delivery">\
                <span class="delivery-icon">⚡</span>\
                <span>ACCESS Given Via QR</span>\
            </div>\
        </div>\
        \
        <div class="subscription-footer">\
            <button class="btn-add-subscription" data-sub-id="' + subscription.id + '">\
                <span class="btn-icon">🛒</span>\
                <span class="btn-text">Add to Cart</span>\
            </button>\
            <button class="btn-view-details" data-sub-id="' + subscription.id + '">\
                <span class="btn-icon">ℹ️</span>\
                <span class="btn-text">View Details</span>\
            </button>\
        </div>\
    ';
    
    // Add event listeners for radio buttons
    const radioButtons = card.querySelectorAll('.pricing-radio');
    radioButtons.forEach(function(radio) {
        radio.addEventListener('change', function() {
            // Update selected styling
            const allOptions = card.querySelectorAll('.pricing-option');
            allOptions.forEach(function(opt) {
                opt.classList.remove('selected');
            });
            
            if (this.checked) {
                this.closest('.pricing-option').classList.add('selected');
            }
        });
    });
    
    // Set first option as selected initially
    if (radioButtons.length > 0) {
        radioButtons[0].closest('.pricing-option').classList.add('selected');
    }
    
    // Add to cart button event
    const addButton = card.querySelector('.btn-add-subscription');
    addButton.addEventListener('click', function() {
        handleAddToCartWithSelection(subscription, card);
    });
    
    // View details button event
    const detailsButton = card.querySelector('.btn-view-details');
    detailsButton.addEventListener('click', function() {
        showSubscriptionDetails(subscription);
    });
    
    return card;
}

// ============================================
// HANDLE ADD TO CART WITH SELECTED OPTION
// ============================================
function handleAddToCartWithSelection(subscription, card) {
    // Get selected pricing option
    const selectedRadio = card.querySelector('.pricing-radio:checked');
    
    if (!selectedRadio) {
        showPsPlusNotification('Please select an account type', 'warning');
        return;
    }
    
    const selectedOptionId = selectedRadio.value;
    const selectedPrice = parseFloat(selectedRadio.getAttribute('data-price'));
    const selectedLabel = selectedRadio.getAttribute('data-label');
    const selectedAccountType = selectedRadio.getAttribute('data-account-type');
    
    // Find the pricing option details
    const pricingOption = subscription.pricingOptions.find(function(opt) {
        return opt.id === selectedOptionId;
    });
    
    if (!pricingOption) {
        showPsPlusNotification('Invalid selection', 'error');
        return;
    }
    
    // Create enhanced subscription object with selected option
    const enhancedSubscription = {
        id: subscription.id + '_' + selectedOptionId, // Unique ID combining subscription and option
        baseId: subscription.id,
        optionId: selectedOptionId,
        title: subscription.title,
        tier: subscription.tier,
        selectedOption: selectedLabel,
        accountType: selectedAccountType,
        price: selectedPrice,
        duration: subscription.duration,
        image: subscription.image,
        pricingOption: pricingOption
    };
    
    // Call the stock-aware add to cart function
    if (typeof addPsPlusToCart === 'function') {
        addPsPlusToCart(enhancedSubscription, card.querySelector('.btn-add-subscription'));
    } else {
        console.error('❌ addPsPlusToCart function not found');
    }
}

// ============================================
// SHOW SUBSCRIPTION DETAILS MODAL - UPDATED
// ============================================
function showSubscriptionDetails(subscription) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'subscription-modal';
    modal.style.cssText = '\
        position: fixed;\
        top: 0;\
        left: 0;\
        right: 0;\
        bottom: 0;\
        background: rgba(10, 14, 39, 0.95);\
        backdrop-filter: blur(10px);\
        z-index: 10000;\
        display: flex;\
        align-items: center;\
        justify-content: center;\
        padding: 20px;\
        animation: fadeIn 0.3s ease;\
    ';
    
    // Features HTML
    const featuresHTML = subscription.features.map(function(feature) {
        return '<li>✓ ' + feature + '</li>';
    }).join('');
    
    // Games HTML
    const gamesHTML = subscription.gamesIncluded.map(function(game) {
        return '<li>🎮 ' + game + '</li>';
    }).join('');
    
    // Pricing options table HTML
    const pricingTableHTML = '\
        <div style="background: rgba(0, 217, 255, 0.05); padding: 24px; border-radius: 12px; margin: 30px 0;">\
            <h3 style="font-size: 20px; margin-bottom: 20px; color: var(--color-primary);">💰 Pricing Options</h3>\
            <div style="display: grid; gap: 16px;">\
                ' + subscription.pricingOptions.map(function(option) {
                    const recommendedBadge = option.recommended ? 
                        '<span style="background: var(--gradient-primary); color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; margin-left: 10px;">RECOMMENDED</span>' : '';
                    
                    return '\
                        <div style="background: var(--color-dark-lighter); border: 2px solid var(--color-border); border-radius: 8px; padding: 20px; display: flex; justify-content: space-between; align-items: center;">\
                            <div>\
                                <div style="font-weight: 700; font-size: 16px; margin-bottom: 4px;">\
                                    ' + option.label + ' ' + recommendedBadge + '\
                                </div>\
                                <div style="color: var(--color-text-muted); font-size: 14px;">' + option.accountType + '</div>\
                                <div style="color: var(--color-text-muted); font-size: 13px; margin-top: 4px;">' + option.description + '</div>\
                            </div>\
                            <div style="font-size: 24px; font-weight: 900; color: var(--color-primary); white-space: nowrap; margin-left: 20px;">\
                                Rs. ' + option.price.toLocaleString() + '\
                            </div>\
                        </div>\
                    ';
                }).join('') + '\
            </div>\
        </div>\
    ';
    
    modal.innerHTML = '\
        <div class="modal-content" style="background: var(--color-dark); border-radius: 16px; max-width: 900px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 40px; position: relative; border: 2px solid var(--color-border);">\
            <button class="modal-close" style="position: absolute; top: 20px; right: 20px; background: rgba(255, 255, 255, 0.1); border: none; color: white; font-size: 28px; cursor: pointer; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.3s ease;">&times;</button>\
            \
            <div class="modal-header" style="margin-bottom: 30px; display: flex; align-items: center; gap: 20px;">\
                <img src="' + subscription.image + '" alt="' + subscription.title + '" style="width: 120px; height: 120px; object-fit: contain; border-radius: 12px; background: rgba(255, 255, 255, 0.05); padding: 10px;">\
                <div style="flex: 1;">\
                    <h2 style="font-size: 32px; margin-bottom: 10px; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">' + subscription.title + '</h2>\
                    <p style="color: var(--color-text-muted); font-size: 16px;">12 Month Subscription</p>\
                </div>\
            </div>\
            \
            <div class="modal-body">\
                <div style="background: rgba(0, 217, 255, 0.1); padding: 20px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid var(--color-primary);">\
                    <p style="font-size: 16px; line-height: 1.8; margin: 0;">' + subscription.longDescription + '</p>\
                </div>\
                \
                ' + pricingTableHTML + '\
                \
                <div style="margin-bottom: 30px;">\
                    <h3 style="font-size: 24px; margin-bottom: 20px; color: var(--color-primary);">✨ Features</h3>\
                    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px;">\
                        ' + featuresHTML + '\
                    </ul>\
                </div>\
                \
                <div style="margin-bottom: 30px;">\
                    <h3 style="font-size: 24px; margin-bottom: 20px; color: var(--color-primary);">🎮 Popular Games Included</h3>\
                    <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px;">\
                        ' + gamesHTML + '\
                    </ul>\
                </div>\
                \
                <div style="padding: 20px; background: rgba(255, 190, 11, 0.1); border-radius: 12px; border-left: 4px solid #ffbe0b; margin-bottom: 20px;">\
                    <h4 style="margin-bottom: 10px; color: #ffbe0b; display: flex; align-items: center; gap: 8px;"><span>⚡</span> Instant Delivery</h4>\
                    <p style="margin: 0; color: var(--color-text-muted);">Account Access given Via QR after Payment Confirmation</p>\
                </div>\
                \
                <div style="text-align: center; padding-top: 20px; border-top: 2px solid var(--color-border);">\
                    <p style="font-size: 14px; color: var(--color-text-muted); margin-bottom: 10px;">Select your preferred option in the main card to add to cart</p>\
                    <button class="btn btn-secondary" style="padding: 14px 40px; font-size: 16px;" onclick="closeSubscriptionModal()">Close</button>\
                </div>\
            </div>\
        </div>\
    ';
    
    // Close button handler
    const closeButton = modal.querySelector('.modal-close');
    closeButton.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 71, 87, 0.2)';
        this.style.transform = 'rotate(90deg)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
        this.style.transform = 'rotate(0deg)';
    });
    
    closeButton.addEventListener('click', function() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
            modal.remove();
        }, 300);
    });
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeButton.click();
        }
    });
    
    // Close on Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeButton.click();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    document.body.appendChild(modal);
}

// Global function to close modal
window.closeSubscriptionModal = function() {
    const modal = document.querySelector('.subscription-modal');
    if (modal) {
        modal.querySelector('.modal-close').click();
    }
};

// ============================================
// SETUP FAQ TOGGLES
// ============================================
function setupFAQToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question-ps');
        const answer = item.querySelector('.faq-answer-ps');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('open');
                
                // Close all FAQs
                document.querySelectorAll('.faq-item').forEach(function(otherItem) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer-ps');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    if (otherToggle) {
                        otherToggle.textContent = '+';
                    }
                });
                
                // Open this one if it wasn't open
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.textContent = '−';
                }
            });
        }
    });
    
    console.log('✅ FAQ toggles setup');
}

// ============================================
// UPDATE CART BADGE
// ============================================
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('krazykrossCart') || '[]');
    const badges = document.querySelectorAll('.cart-badge');
    
    badges.forEach(function(badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length > 0 ? 'flex' : 'none';
    });
}

// ============================================
// SIMPLE NOTIFICATION (if not defined)
// ============================================
if (typeof showNotification === 'undefined') {
    function showNotification(message, type) {
        console.log('[' + (type || 'info').toUpperCase() + ']', message);
        
        if (typeof showPsPlusNotification === 'function') {
            showPsPlusNotification(message, type);
        }
    }
}

console.log('✅ PS Plus functionality loaded');
console.log('💡 Enhanced with multiple pricing options per tier');