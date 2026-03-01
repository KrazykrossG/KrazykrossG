// Game Detail Page Functionality

// Get game ID from URL parameter
function getGameIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Load game details
function loadGameDetails() {
    const gameId = getGameIdFromURL();
    
    if (!gameId) {
        window.location.href = 'games.html';
        return;
    }
    
    const game = getGameById(gameId);
    
    if (!game) {
        window.location.href = 'games.html';
        return;
    }
    
    // Update page title
    document.title = `${game.title} - Krazykross Games`;
    document.getElementById('game-title').textContent = `${game.title} - Krazykross Games`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-title').textContent = game.title;
    
    // Update main image
    const detailImage = document.getElementById('detail-image');
    detailImage.src = game.image;
    detailImage.alt = game.title;
    
    // Update badge
    const badgeElement = document.getElementById('detail-badge');
    if (game.badge) {
        badgeElement.textContent = game.badge;
        badgeElement.style.display = 'block';
        if (game.badge === 'Sale') {
            badgeElement.classList.add('sale');
        }
    } else {
        badgeElement.style.display = 'none';
    }
    
    // Update info
    document.getElementById('detail-genre').textContent = game.genre;
    document.getElementById('detail-rating').textContent = `★ ${game.rating}`;
    document.getElementById('detail-title').textContent = game.title;
    document.getElementById('detail-description').textContent = game.description;
    
    // Update pricing
    const priceOld = document.getElementById('detail-price-old');
    const priceCurrent = document.getElementById('detail-price-current');
    const discountBadge = document.getElementById('detail-discount');
    
    if (game.originalPrice) {
        priceOld.textContent = `$${game.originalPrice.toFixed(2)}`;
        priceOld.style.display = 'inline';
        discountBadge.textContent = `-${game.discount}%`;
        discountBadge.style.display = 'inline-block';
    } else {
        priceOld.style.display = 'none';
        discountBadge.style.display = 'none';
    }
    
    priceCurrent.textContent = `$${game.price.toFixed(2)}`;
    
    // Update quick info
    document.getElementById('detail-publisher').textContent = game.publisher;
    document.getElementById('detail-release').textContent = new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('detail-players').textContent = game.players;
    document.getElementById('detail-online').textContent = game.onlinePlay ? 'Yes' : 'No';
    
    // Update long description
    document.getElementById('detail-long-description').textContent = game.longDescription;
    
    // Update features list
    const featuresList = document.getElementById('detail-features');
    featuresList.innerHTML = '';
    game.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update requirements
    document.getElementById('detail-requirements').textContent = game.systemRequirements;
    
    // Load related games
    loadRelatedGames(game.id);
    
    // Setup add to cart button
    document.getElementById('add-to-cart-detail').addEventListener('click', () => {
        console.log('🎮 Add to Cart clicked on detail page');
        
        // Get cart from localStorage
        let cart = [];
        try {
            const savedCart = localStorage.getItem('krazykrossCart');
            cart = savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            cart = [];
        }
        
        // Check if already in cart
        const existingItem = cart.find(item => item.id === game.id);
        if (existingItem) {
            showNotification(`${game.title} is already in your cart!`, 'info');
            return;
        }
        
        // Create cart item with ALL required fields
        const cartItem = {
            id: game.id,
            title: game.title,
            price: `Rs. ${game.price.toFixed(2)}`,
            image: game.image,
            type: 'game',
            rentalPeriod: game.rentalPeriodDays ? `${game.rentalPeriodDays} days` : null
        };
        
        console.log('📦 Adding to cart:', cartItem);
        
        // Add to cart
        cart.push(cartItem);
        
        // Save to localStorage
        try {
            localStorage.setItem('krazykrossCart', JSON.stringify(cart));
            console.log('✅ Cart saved to localStorage');
        } catch (error) {
            console.error('Error saving cart:', error);
        }
        
        // Update cart badge
        if (typeof updateCartBadge === 'function') {
            updateCartBadge();
        } else {
            // Update badge manually
            const badges = document.querySelectorAll('.cart-badge');
            badges.forEach(badge => {
                badge.textContent = cart.length;
                badge.style.display = cart.length > 0 ? 'flex' : 'none';
            });
        }
        
        // Show notification
        if (typeof showNotification === 'function') {
            showNotification(`${game.title} added to cart!`, 'success');
        } else {
            alert(`${game.title} added to cart!`);
        }
        
        console.log('✅ Item added to cart successfully');
    });
}

// Load related games
function loadRelatedGames(gameId) {
    const relatedGames = getRelatedGames(gameId, 4);
    const container = document.getElementById('related-games-grid');
    
    container.innerHTML = '';
    
    relatedGames.forEach(game => {
        const gameCard = createGameCard(game);
        container.appendChild(gameCard);
    });
}

// Create game card element
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    const badge = game.badge ? `<div class="game-badge ${game.badge === 'Sale' ? 'sale' : ''}">${game.badge}</div>` : '';
    const oldPrice = game.originalPrice ? `<span class="price-old">$${game.originalPrice.toFixed(2)}</span>` : '';
    
    card.innerHTML = `
        <div class="game-image">
            <img src="${game.image}" alt="${game.title}" style="width: 100%; height: 100%; object-fit: cover;">
            ${badge}
        </div>
        <div class="game-info">
            <div class="game-meta">
                <span class="game-genre">${game.genre}</span>
                <span class="game-rating">★ ${game.rating}</span>
            </div>
            <h3 class="game-title">${game.title}</h3>
            <p class="game-description">${game.description}</p>
            <div class="game-footer">
                <div class="game-price">
                    ${oldPrice}
                    <span class="price-current">$${game.price.toFixed(2)}</span>
                </div>
                <button class="btn-add-cart">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add click handler to navigate to detail page
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('btn-add-cart')) {
            window.location.href = `game-detail.html?id=${game.id}`;
        }
    });
    
    // Add to cart functionality for the button
    const addToCartBtn = card.querySelector('.btn-add-cart');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        console.log('🎮 Add to Cart clicked (related game)');
        
        // Get cart from localStorage
        let cart = [];
        try {
            const savedCart = localStorage.getItem('krazykrossCart');
            cart = savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            cart = [];
        }
        
        // Check if already in cart
        const existingItem = cart.find(item => item.id === game.id);
        if (existingItem) {
            if (typeof showNotification === 'function') {
                showNotification(`${game.title} is already in your cart!`, 'info');
            } else {
                alert(`${game.title} is already in your cart!`);
            }
            return;
        }
        
        // Create cart item with ALL required fields
        const cartItem = {
            id: game.id,
            title: game.title,
            price: `Rs. ${game.price.toFixed(2)}`,
            image: game.image,
            type: 'game',
            rentalPeriod: game.rentalPeriodDays ? `${game.rentalPeriodDays} days` : null
        };
        
        console.log('📦 Adding to cart:', cartItem);
        
        // Add to cart
        cart.push(cartItem);
        
        // Save to localStorage
        try {
            localStorage.setItem('krazykrossCart', JSON.stringify(cart));
            console.log('✅ Cart saved to localStorage');
        } catch (error) {
            console.error('Error saving cart:', error);
        }
        
        // Update cart badge
        if (typeof updateCartBadge === 'function') {
            updateCartBadge();
        } else {
            // Update badge manually
            const badges = document.querySelectorAll('.cart-badge');
            badges.forEach(badge => {
                badge.textContent = cart.length;
                badge.style.display = cart.length > 0 ? 'flex' : 'none';
            });
        }
        
        // Show notification
        if (typeof showNotification === 'function') {
            showNotification(`${game.title} added to cart!`, 'success');
        } else {
            alert(`${game.title} added to cart!`);
        }
        
        console.log('✅ Item added to cart successfully');
    });
    
    return card;
}

// Tab functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGameDetails();
    setupTabs();
});
