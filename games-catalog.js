// Games Catalog Page Functionality

let currentPage = 1;
const gamesPerPage = 9;
let filteredGames = [...gamesDatabase];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateGenreFilter();
    displayGames();
    setupFilterListeners();
    
    // Update stock badges after short delay
    setTimeout(() => {
        if (typeof updateAllStockBadges === 'function') {
            updateAllStockBadges();
        }
    }, 500);
});

// Populate genre dropdown
function populateGenreFilter() {
    const genreFilter = document.getElementById('genre-filter');
    const genres = getUniqueGenres();
    
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Setup filter event listeners
function setupFilterListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', debounce(applyFilters, 300));
    
    // Dropdowns
    document.getElementById('genre-filter').addEventListener('change', applyFilters);
    document.getElementById('price-filter').addEventListener('change', applyFilters);
    document.getElementById('sort-filter').addEventListener('change', applyFilters);
    
    // Checkboxes
    document.getElementById('online-filter').addEventListener('change', applyFilters);
    document.getElementById('sale-filter').addEventListener('change', applyFilters);
    
    // Reset button
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
}

// Apply all filters
function applyFilters() {
    const filters = {
        search: document.getElementById('search-input').value,
        genre: document.getElementById('genre-filter').value,
        priceRange: document.getElementById('price-filter').value,
        onlinePlay: document.getElementById('online-filter').checked ? true : undefined,
        onSale: document.getElementById('sale-filter').checked
    };
    
    // Filter games
    filteredGames = filterGames(filters);
    
    // Sort games
    const sortBy = document.getElementById('sort-filter').value;
    filteredGames = sortGames(filteredGames, sortBy);
    
    // Reset to first page
    currentPage = 1;
    
    // Update display
    displayGames();
    updateResultsCount();
}

// Reset all filters
function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('genre-filter').value = 'all';
    document.getElementById('price-filter').value = '';
    document.getElementById('sort-filter').value = 'featured';
    document.getElementById('online-filter').checked = false;
    document.getElementById('sale-filter').checked = false;
    
    applyFilters();
}

// Display games with pagination
function displayGames() {
    const container = document.getElementById('games-grid');
    const noResults = document.getElementById('no-results');
    
    if (filteredGames.length === 0) {
        container.innerHTML = '';
        noResults.style.display = 'flex';
        document.getElementById('pagination').innerHTML = '';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const gamesToDisplay = filteredGames.slice(startIndex, endIndex);
    
    // Clear container
    container.innerHTML = '';
    
    // Create game cards
    gamesToDisplay.forEach((game, index) => {
        const card = createGameCard(game);
        card.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(card);
    });
    
    // Update stock badges after rendering
    setTimeout(() => {
        if (typeof updateAllStockBadges === 'function') {
            updateAllStockBadges();
        }
    }, 100);
    
    // Update pagination
    updatePagination();
    
    // Scroll to top of results
    document.querySelector('.games-catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Create game card
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    
    const badge = game.badge ? `<div class="game-badge ${game.badge === 'Sale' ? 'sale' : ''}">${game.badge}</div>` : '';
    const oldPrice = game.originalPrice ? `<span class="price-old">Rs ${game.originalPrice.toFixed(2)}</span>` : '';
    
    card.innerHTML = `
        <div class="game-image">
            <img src="${game.image}" alt="${game.title}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;">
            ${badge}
        </div>
        <div class="game-info">
            <div class="game-meta">
                <span class="game-genre">${game.genre}</span>
                <span class="game-rating">★ ${game.rating}</span>
            </div>
            <h3 class="game-title" style="cursor: pointer;">${game.title}</h3>
            <p class="game-description">${game.description}</p>

<div class="rental-period">
    ${formatRentalPeriod(game.rentalPeriodDays)}
</div>

            <div class="game-footer">
                <div class="game-price">
                    ${oldPrice}
                    <span class="price-current">Rs ${game.price.toFixed(2)}</span>
                </div>
                <button class="btn-add-cart" data-game-id="${game.id}">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Click card to view details
    const clickableElements = [card.querySelector('.game-image'), card.querySelector('.game-title')];
    clickableElements.forEach(element => {
        element.addEventListener('click', () => {
            window.location.href = `game-detail.html?id=${game.id}`;
        });
    });
    
    // Add to cart button with stock check
    const addToCartBtn = card.querySelector('.btn-add-cart');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Use stock-aware function if available, fallback to original
        if (typeof addToCartWithStockCheck === 'function') {
            addToCartWithStockCheck(game, addToCartBtn);
        } else {
            addToCart(game);
        }
    });
    
    return card;
}

// Add to cart function (FIXED VERSION)
function addToCart(game) {
    console.log('🛒 Adding to cart from catalog:', game.title);
    
    const CART_STORAGE_KEY = 'krazykrossCart';
    
    // Get existing cart
    let cart = [];
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
    
    // Create cart item with CORRECT structure including ALL required fields
    const cartItem = {
        id: game.id,
        title: game.title,
        price: `Rs ${game.price.toFixed(2)}`,  // ✅ Format: "Rs 1000.00"
        image: game.image                         // ✅ Include image
    };
    
    console.log('📦 Cart item created:', cartItem);
    console.log('   - Price format:', cartItem.price);
    console.log('   - Price value:', game.price);
    
    // Add item to cart
    cart.push(cartItem);
    
    // Save cart
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    console.log('💾 Cart saved. Total items:', cart.length);
    
    // Update badge
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = cart.length;
        badge.style.display = 'flex';
    });
    
    showNotification(`${game.title} added to cart!`);
    
    // Animate button
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.background = 'linear-gradient(135deg, #00d9ff 0%, #0066ff 100%)';
    btn.style.borderColor = 'transparent';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'transparent';
        btn.style.borderColor = 'var(--color-border)';
    }, 1500);
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    pagination.innerHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = createPaginationButton('← Previous', currentPage - 1);
        pagination.appendChild(prevBtn);
    }
    
    // Page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    if (startPage > 1) {
        pagination.appendChild(createPaginationButton(1, 1));
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'pagination-dots';
            pagination.appendChild(dots);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const btn = createPaginationButton(i, i);
        if (i === currentPage) {
            btn.classList.add('active');
        }
        pagination.appendChild(btn);
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.className = 'pagination-dots';
            pagination.appendChild(dots);
        }
        pagination.appendChild(createPaginationButton(totalPages, totalPages));
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextBtn = createPaginationButton('Next →', currentPage + 1);
        pagination.appendChild(nextBtn);
    }
}

// Create pagination button
function createPaginationButton(text, page) {
    const btn = document.createElement('button');
    btn.className = 'pagination-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => {
        currentPage = page;
        displayGames();
    });
    return btn;
}

// Update results count
function updateResultsCount() {
    const count = document.getElementById('results-count');
    const total = filteredGames.length;
    
    if (total === gamesDatabase.length) {
        count.textContent = `Showing all ${total} games`;
    } else {
        count.textContent = `Showing ${total} of ${gamesDatabase.length} games`;
    }
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make resetFilters available globally
window.resetFilters = resetFilters;

console.log('✅ Games catalog loaded with fixed addToCart function');
