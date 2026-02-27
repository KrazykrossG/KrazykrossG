// ============================================
// BLOG LISTING PAGE - ENHANCED VERSION
// With Better Error Handling & Debugging
// ============================================

// CONTENTFUL CONFIGURATION
const CONTENTFUL_CONFIG = {
    space: 'wm86ywmrftpw', // ← REPLACE THIS!
    accessToken: 'MzrFzNX44mLGR6IVqrjZwF0nVeN1fhLK1ZBLRePtj6Q', // ← REPLACE THIS!
    environment: 'master',
    contentType: 'blogPost' // ← CHANGE IF DIFFERENT!
};

// Build Contentful API URL
function getContentfulUrl(query = '') {
    const base = `https://cdn.contentful.com/spaces/${CONTENTFUL_CONFIG.space}/environments/${CONTENTFUL_CONFIG.environment}/entries`;
    return `${base}?access_token=${CONTENTFUL_CONFIG.accessToken}&content_type=${CONTENTFUL_CONFIG.contentType}${query}`;
}

// State
let allPosts = [];
let displayedPosts = [];
let currentCategory = 'all';
const POSTS_PER_PAGE = 6;
let currentPage = 1;

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Blog initializing...');
    console.log('📡 Contentful Config:', {
        space: CONTENTFUL_CONFIG.space,
        contentType: CONTENTFUL_CONFIG.contentType
    });
    
    loadBlogPosts();
    setupFilterButtons();
    setupLoadMore();
});

// ============================================
// LOAD POSTS
// ============================================
async function loadBlogPosts() {
    console.log('📡 Fetching posts from Contentful...');
    
    const grid = document.getElementById('blog-posts-grid');
    
    try {
        const url = getContentfulUrl('&order=-fields.publishedDate&limit=50');
        console.log('🌐 API URL:', url);
        
        const response = await fetch(url);
        
        console.log('📨 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log('✅ API Response:', data);
        console.log('📊 Total entries:', data.total);
        console.log('📦 Items received:', data.items?.length || 0);
        
        if (!data.items || data.items.length === 0) {
            console.warn('⚠️ No items in response');
            showEmptyState('No blog posts found. Create some in Contentful!');
            return;
        }
        
        // Process posts
        allPosts = data.items.map((item, index) => {
            console.log(`Processing post ${index + 1}:`, item.fields?.title);
            return processPost(item, data.includes);
        });
        
        console.log('✅ Processed posts:', allPosts);
        
        // Display
        displayFeaturedPost();
        filterAndDisplayPosts('all');
        
    } catch (error) {
        console.error('❌ Error loading posts:', error);
        showErrorState(error.message);
    }
}

// ============================================
// PROCESS POST
// ============================================
function processPost(item, includes) {
    const fields = item.fields;
    
    console.log('  📝 Processing:', fields.title);
    
    // Get image
    let imageUrl = 'https://via.placeholder.com/800x450/1a1a2e/00d9ff?text=Blog+Post';
    
    if (fields.featuredImage && includes?.Asset) {
        const imageId = fields.featuredImage.sys.id;
        const asset = includes.Asset.find(a => a.sys.id === imageId);
        if (asset?.fields?.file) {
            imageUrl = 'https:' + asset.fields.file.url;
            console.log('  🖼️ Image found:', imageUrl);
        }
    }
    
    // Format date
    const publishedDate = new Date(fields.publishedDate);
    const formattedDate = publishedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const post = {
        id: item.sys.id,
        title: fields.title || 'Untitled Post',
        slug: fields.slug || 'untitled',
        excerpt: fields.excerpt || 'No excerpt available',
        author: fields.author || 'KrazyKross Team',
        category: fields.category || 'General',
        tags: fields.tags || [],
        publishedDate: publishedDate,
        formattedDate: formattedDate,
        imageUrl: imageUrl,
        featured: fields.featured || false
    };
    
    console.log('  ✅ Post processed:', post.title);
    
    return post;
}

// ============================================
// DISPLAY FEATURED POST
// ============================================
function displayFeaturedPost() {
    const container = document.getElementById('featured-post');
    const featuredPost = allPosts.find(p => p.featured);
    
    if (!featuredPost) {
        console.log('ℹ️ No featured post');
        container.style.display = 'none';
        return;
    }
    
    console.log('⭐ Displaying featured post:', featuredPost.title);
    
    container.innerHTML = `
        <div class="featured-post">
            <div class="featured-post-image">
                <img src="${featuredPost.imageUrl}" alt="${featuredPost.title}">
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
                    <a href="blog-post.html?slug=${featuredPost.slug}" class="btn btn-primary">Read More →</a>
                </div>
            </div>
        </div>
    `;
    
    container.style.display = 'block';
}

// ============================================
// FILTER & DISPLAY
// ============================================
function filterAndDisplayPosts(category) {
    currentCategory = category;
    currentPage = 1;
    
    console.log('🔍 Filtering by:', category);
    
    if (category === 'all') {
        displayedPosts = allPosts.filter(p => !p.featured);
    } else {
        displayedPosts = allPosts.filter(p => 
            p.category === category && !p.featured
        );
    }
    
    console.log('📊 Filtered results:', displayedPosts.length);
    
    renderPosts();
}

// ============================================
// RENDER POSTS
// ============================================
function renderPosts() {
    const grid = document.getElementById('blog-posts-grid');
    
    console.log('🎨 Rendering posts...');
    
    if (!grid) {
        console.error('❌ Grid container not found!');
        return;
    }
    
    if (displayedPosts.length === 0) {
        showEmptyState('No posts in this category');
        return;
    }
    
    const postsToShow = displayedPosts.slice(0, currentPage * POSTS_PER_PAGE);
    
    console.log(`📦 Showing ${postsToShow.length} of ${displayedPosts.length} posts`);
    
    // Clear grid
    grid.innerHTML = '';
    
    // Create cards
    postsToShow.forEach((post, index) => {
        console.log(`  Creating card ${index + 1}:`, post.title);
        const card = createPostCard(post);
        grid.appendChild(card);
    });
    
    console.log('✅ Posts rendered successfully');
    
    // Load more button
    const loadMoreContainer = document.querySelector('.load-more-container');
    if (loadMoreContainer) {
        loadMoreContainer.style.display = 
            postsToShow.length < displayedPosts.length ? 'block' : 'none';
    }
}

// ============================================
// CREATE CARD
// ============================================
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    const tagsHTML = post.tags.slice(0, 3)
        .map(tag => `<span class="post-tag">${tag}</span>`)
        .join('');
    
    card.innerHTML = `
        <div class="blog-card-image">
            <img src="${post.imageUrl}" alt="${post.title}" loading="lazy">
            <div class="blog-card-category">${post.category}</div>
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
// ERROR STATES
// ============================================
function showEmptyState(message) {
    const grid = document.getElementById('blog-posts-grid');
    grid.innerHTML = `
        <div class="empty-state">
            <div style="font-size: 64px">📝</div>
            <h3>No Posts Found</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 20px">
                Refresh Page
            </button>
        </div>
    `;
}

function showErrorState(message) {
    const grid = document.getElementById('blog-posts-grid');
    grid.innerHTML = `
        <div class="error-state">
            <div style="font-size: 64px">⚠️</div>
            <h3>Error Loading Posts</h3>
            <p>${message}</p>
            <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 20px">
                Try Again
            </button>
        </div>
    `;
}

// ============================================
// FILTER BUTTONS
// ============================================
function setupFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterAndDisplayPosts(category);
        });
    });
}

// ============================================
// LOAD MORE
// ============================================
function setupLoadMore() {
    const btn = document.getElementById('load-more-btn');
    
    if (btn) {
        btn.addEventListener('click', function() {
            currentPage++;
            renderPosts();
        });
    }
}

// Make functions global for debugging
window.allPosts = allPosts;
window.displayedPosts = displayedPosts;
window.refreshBlog = loadBlogPosts;

console.log('✅ Blog.js loaded');
console.log('💡 Debug in console: window.allPosts, window.refreshBlog()');