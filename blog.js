// ============================================
// BLOG LISTING PAGE
// Contentful Integration for KrazyKross Games
// ============================================

// CONTENTFUL CONFIGURATION
const CONTENTFUL_CONFIG = {
    space: 'wm86ywmrftpw', // Replace with your Space ID
    accessToken: 'MzrFzNX44mLGR6IVqrjZwF0nVeN1fhLK1ZBLRePtj6Q', // Replace with your Access Token
    environment: 'master',
    apiUrl: 'https://cdn.contentful.com'
};

// Build Contentful API URL
function getContentfulUrl(contentType, query = '') {
    return `${CONTENTFUL_CONFIG.apiUrl}/spaces/${CONTENTFUL_CONFIG.space}/environments/${CONTENTFUL_CONFIG.environment}/entries?access_token=${CONTENTFUL_CONFIG.accessToken}&content_type=${contentType}${query}`;
}

// State management
let allPosts = [];
let displayedPosts = [];
let currentCategory = 'all';
const POSTS_PER_PAGE = 6;
let currentPage = 1;

// ============================================
// INITIALIZE BLOG
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Blog page loading...');
    
    loadBlogPosts();
    setupFilterButtons();
    setupLoadMore();
    setupSearch();
    
    console.log('✅ Blog initialized');
});

// ============================================
// FETCH BLOG POSTS FROM CONTENTFUL
// ============================================
async function loadBlogPosts() {
    console.log('📡 Fetching blog posts from Contentful...');
    
    try {
        // Fetch all blog posts, ordered by published date
        const url = getContentfulUrl('blogPost', '&order=-fields.publishedDate');
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('✅ Contentful response:', data);
        
        // Process posts
        allPosts = data.items.map(item => processPost(item, data.includes));
        
        console.log(`📚 Loaded ${allPosts.length} blog posts`);
        
        // Display posts
        displayFeaturedPost();
        filterAndDisplayPosts('all');
        
    } catch (error) {
        console.error('❌ Error loading blog posts:', error);
        showErrorState();
    }
}

// ============================================
// PROCESS POST DATA
// ============================================
function processPost(item, includes) {
    const fields = item.fields;
    
    // Get featured image
    let imageUrl = 'https://via.placeholder.com/800x450/1a1a2e/00d9ff?text=Blog+Post';
    
    if (fields.featuredImage && includes && includes.Asset) {
        const imageAsset = includes.Asset.find(asset => asset.sys.id === fields.featuredImage.sys.id);
        if (imageAsset && imageAsset.fields && imageAsset.fields.file) {
            imageUrl = 'https:' + imageAsset.fields.file.url;
        }
    }
    
    // Format date
    const publishedDate = new Date(fields.publishedDate);
    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Process rich text content to plain text excerpt if needed
    let content = '';
    if (fields.content && fields.content.content) {
        content = extractTextFromRichText(fields.content);
    }
    
    return {
        id: item.sys.id,
        title: fields.title || 'Untitled Post',
        slug: fields.slug || '',
        excerpt: fields.excerpt || content.substring(0, 200) + '...',
        content: fields.content,
        contentText: content,
        author: fields.author || 'KrazyKross Team',
        category: fields.category || 'General',
        tags: fields.tags || [],
        publishedDate: publishedDate,
        formattedDate: formattedDate,
        imageUrl: imageUrl,
        featured: fields.featured || false
    };
}

// Extract text from Contentful rich text
function extractTextFromRichText(richText) {
    if (!richText || !richText.content) return '';
    
    let text = '';
    
    richText.content.forEach(node => {
        if (node.nodeType === 'paragraph' && node.content) {
            node.content.forEach(contentNode => {
                if (contentNode.value) {
                    text += contentNode.value + ' ';
                }
            });
        }
    });
    
    return text.trim();
}

// ============================================
// DISPLAY FEATURED POST
// ============================================
function displayFeaturedPost() {
    const featuredPost = allPosts.find(post => post.featured);
    
    if (!featuredPost) {
        document.getElementById('featured-post').style.display = 'none';
        return;
    }
    
    const container = document.getElementById('featured-post');
    
    container.innerHTML = `
        <div class="featured-post">
            <div class="featured-post-image">
                <img src="${featuredPost.imageUrl}" alt="${featuredPost.title}" loading="eager">
                <div class="featured-badge">⭐ Featured</div>
            </div>
            <div class="featured-post-content">
                <div class="post-meta">
                    <span class="post-category">${featuredPost.category}</span>
                    <span class="post-date">${featuredPost.formattedDate}</span>
                </div>
                <h2 class="featured-post-title">${featuredPost.title}</h2>
                <p class="featured-post-excerpt">${featuredPost.excerpt}</p>
                <div class="post-footer">
                    <span class="post-author">By ${featuredPost.author}</span>
                    <a href="blog-post.html?slug=${featuredPost.slug}" class="btn btn-primary">
                        Read More →
                    </a>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// FILTER AND DISPLAY POSTS
// ============================================
function filterAndDisplayPosts(category) {
    currentCategory = category;
    currentPage = 1;
    
    // Filter posts
    if (category === 'all') {
        displayedPosts = allPosts.filter(post => !post.featured);
    } else {
        displayedPosts = allPosts.filter(post => 
            post.category === category && !post.featured
        );
    }
    
    console.log(`📊 Filtered to ${displayedPosts.length} posts in category: ${category}`);
    
    renderPosts();
}

// ============================================
// RENDER POSTS
// ============================================
function renderPosts() {
    const grid = document.getElementById('blog-posts-grid');
    
    if (displayedPosts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 64px; margin-bottom: 16px;">📝</div>
                <h3>No posts found</h3>
                <p>Check back soon for more content!</p>
                <a href="blog.html" class="btn btn-primary" style="margin-top: 24px;">View All Posts</a>
            </div>
        `;
        document.querySelector('.load-more-container').style.display = 'none';
        return;
    }
    
    // Calculate posts to show
    const postsToShow = displayedPosts.slice(0, currentPage * POSTS_PER_PAGE);
    
    // Clear grid
    grid.innerHTML = '';
    
    // Create post cards
    postsToShow.forEach(post => {
        const card = createPostCard(post);
        grid.appendChild(card);
    });
    
    // Show/hide load more button
    const loadMoreContainer = document.querySelector('.load-more-container');
    if (postsToShow.length < displayedPosts.length) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// ============================================
// CREATE POST CARD
// ============================================
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    // Format tags
    const tagsHTML = post.tags.slice(0, 3).map(tag => 
        `<span class="post-tag">${tag}</span>`
    ).join('');
    
    // Category emoji mapping
    const categoryEmojis = {
        'Game Reviews': '🎮',
        'News': '📰',
        'Tips & Guides': '💡',
        'PS Plus': '⭐',
        'Industry News': '📊'
    };
    
    const categoryEmoji = categoryEmojis[post.category] || '📝';
    
    card.innerHTML = `
        <div class="blog-card-image">
            <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
            <div class="blog-card-category">${categoryEmoji} ${post.category}</div>
        </div>
        <div class="blog-card-content">
            <div class="post-meta">
                <span class="post-date">${post.formattedDate}</span>
                <span class="post-author">By ${post.author}</span>
            </div>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-excerpt">${post.excerpt}</p>
            ${tagsHTML ? `<div class="post-tags">${tagsHTML}</div>` : ''}
            <a href="blog-post.html?slug=${post.slug}" class="blog-card-link">Read More →</a>
        </div>
    `;
    
    return card;
}

// ============================================
// FILTER BUTTONS
// ============================================
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            const category = this.getAttribute('data-category');
            filterAndDisplayPosts(category);
            
            // Smooth scroll to posts
            document.getElementById('blog-posts-grid').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });
}

// ============================================
// LOAD MORE FUNCTIONALITY
// ============================================
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            renderPosts();
            
            // Smooth scroll to new content
            setTimeout(() => {
                const cards = document.querySelectorAll('.blog-card');
                const lastVisibleCard = cards[(currentPage - 1) * POSTS_PER_PAGE];
                if (lastVisibleCard) {
                    lastVisibleCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 100);
        });
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function setupSearch() {
    const searchInput = document.getElementById('blog-search');
    const searchBtn = document.querySelector('.blog-search-btn');
    
    if (!searchInput) return;
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // If empty, show all posts
            filterAndDisplayPosts(currentCategory);
            return;
        }
        
        // Filter posts by search term
        displayedPosts = allPosts.filter(post => {
            return !post.featured && (
                post.title.toLowerCase().includes(searchTerm) ||
                post.excerpt.toLowerCase().includes(searchTerm) ||
                post.contentText.toLowerCase().includes(searchTerm) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
                post.category.toLowerCase().includes(searchTerm)
            );
        });
        
        // Reset to first page
        currentPage = 1;
        
        // Update filter buttons (remove active state)
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        console.log(`🔍 Search: "${searchTerm}" - ${displayedPosts.length} results`);
        
        renderPosts();
    }
    
    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // Live search (optional - debounced)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 500);
    });
}

// ============================================
// ERROR STATE
// ============================================
function showErrorState() {
    const grid = document.getElementById('blog-posts-grid');
    const featuredContainer = document.getElementById('featured-post');
    
    grid.innerHTML = `
        <div class="error-state">
            <div style="font-size: 64px; margin-bottom: 16px;">⚠️</div>
            <h3>Unable to Load Posts</h3>
            <p>Please check your internet connection and try again.</p>
            <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 24px;">
                Retry
            </button>
        </div>
    `;
    
    featuredContainer.style.display = 'none';
}

// ============================================
// NEWSLETTER FORM HANDLING
// ============================================
const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Here you can integrate with your email service
        // For now, we'll just show a success message
        
        console.log('📧 Newsletter signup:', email);
        
        // Show success message
        showNotification('✅ Successfully subscribed to newsletter!', 'success');
        
        // Clear form
        emailInput.value = '';
        
        // You can integrate with services like:
        // - EmailJS
        // - Mailchimp
        // - SendGrid
        // - ConvertKit
    });
}

// ============================================
// NOTIFICATION HELPER
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? '#22c55e' : '#ff4757'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// GLOBAL FUNCTIONS
// ============================================
window.refreshBlogPosts = function() {
    loadBlogPosts();
};

console.log('✅ Blog.js loaded');
console.log('💡 Blog posts will auto-update from Contentful');
console.log('🔄 To manually refresh: window.refreshBlogPosts()');
