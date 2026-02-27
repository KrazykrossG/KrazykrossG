// ============================================
// BLOG POST DETAIL PAGE
// Contentful Integration
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

// Current post data
let currentPost = null;
let allPosts = [];

// ============================================
// INITIALIZE PAGE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📖 Blog post page loading...');
    
    // Get slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    
    if (!slug) {
        console.error('❌ No slug provided in URL');
        showErrorState();
        return;
    }
    
    console.log('🔍 Loading post with slug:', slug);
    
    loadBlogPost(slug);
    setupBackToTop();
    
    console.log('✅ Page initialized');
});

// ============================================
// LOAD BLOG POST
// ============================================
async function loadBlogPost(slug) {
    try {
        // Show loading
        document.getElementById('loading-state').style.display = 'flex';
        
        // Fetch post by slug
        const url = getContentfulUrl('blogPost', `&fields.slug=${slug}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('✅ Contentful response:', data);
        
        if (!data.items || data.items.length === 0) {
            console.error('❌ Post not found');
            showErrorState();
            return;
        }
        
        // Process post
        currentPost = processPost(data.items[0], data.includes);
        
        console.log('📄 Post loaded:', currentPost);
        
        // Display post
        displayPost(currentPost);
        
        // Load related posts
        loadRelatedPosts(currentPost.category);
        
        // Hide loading, show content
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('blog-post-content').style.display = 'block';
        
    } catch (error) {
        console.error('❌ Error loading blog post:', error);
        showErrorState();
    }
}

// ============================================
// PROCESS POST DATA
// ============================================
function processPost(item, includes) {
    const fields = item.fields;
    
    // Get featured image
    let imageUrl = 'https://via.placeholder.com/1200x600/1a1a2e/00d9ff?text=Blog+Post';
    
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
    
    // Process content
    let contentHtml = '';
    if (fields.content) {
        contentHtml = renderRichText(fields.content);
    }
    
    return {
        id: item.sys.id,
        title: fields.title || 'Untitled Post',
        slug: fields.slug || '',
        excerpt: fields.excerpt || '',
        content: contentHtml,
        rawContent: fields.content,
        author: fields.author || 'KrazyKross Team',
        category: fields.category || 'General',
        tags: fields.tags || [],
        publishedDate: publishedDate,
        formattedDate: formattedDate,
        imageUrl: imageUrl,
        featured: fields.featured || false
    };
}

// ============================================
// RENDER CONTENTFUL RICH TEXT TO HTML
// ============================================
function renderRichText(richText) {
    if (!richText || !richText.content) return '';
    
    let html = '';
    
    richText.content.forEach(node => {
        html += renderNode(node);
    });
    
    return html;
}

function renderNode(node) {
    const type = node.nodeType;
    
    switch (type) {
        case 'paragraph':
            return `<p>${renderContent(node.content)}</p>`;
        
        case 'heading-1':
            return `<h1>${renderContent(node.content)}</h1>`;
        
        case 'heading-2':
            return `<h2>${renderContent(node.content)}</h2>`;
        
        case 'heading-3':
            return `<h3>${renderContent(node.content)}</h3>`;
        
        case 'heading-4':
            return `<h4>${renderContent(node.content)}</h4>`;
        
        case 'heading-5':
            return `<h5>${renderContent(node.content)}</h5>`;
        
        case 'heading-6':
            return `<h6>${renderContent(node.content)}</h6>`;
        
        case 'unordered-list':
            return `<ul>${node.content.map(item => renderNode(item)).join('')}</ul>`;
        
        case 'ordered-list':
            return `<ol>${node.content.map(item => renderNode(item)).join('')}</ol>`;
        
        case 'list-item':
            return `<li>${renderContent(node.content)}</li>`;
        
        case 'blockquote':
            return `<blockquote>${node.content.map(item => renderNode(item)).join('')}</blockquote>`;
        
        case 'hr':
            return '<hr>';
        
        case 'hyperlink':
            const url = node.data.uri;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${renderContent(node.content)}</a>`;
        
        default:
            return '';
    }
}

function renderContent(content) {
    if (!content) return '';
    
    return content.map(item => {
        if (item.nodeType === 'text') {
            let text = item.value;
            
            // Apply marks (bold, italic, etc.)
            if (item.marks && item.marks.length > 0) {
                item.marks.forEach(mark => {
                    switch (mark.type) {
                        case 'bold':
                            text = `<strong>${text}</strong>`;
                            break;
                        case 'italic':
                            text = `<em>${text}</em>`;
                            break;
                        case 'underline':
                            text = `<u>${text}</u>`;
                            break;
                        case 'code':
                            text = `<code>${text}</code>`;
                            break;
                    }
                });
            }
            
            return text;
        } else {
            return renderNode(item);
        }
    }).join('');
}

// ============================================
// DISPLAY POST
// ============================================
function displayPost(post) {
    console.log('🎨 Displaying post:', post.title);
    
    // Update page title and meta tags
    document.title = `${post.title} - KrazyKross Games Blog`;
    document.getElementById('post-title').textContent = `${post.title} - KrazyKross Games`;
    document.getElementById('post-description').content = post.excerpt;
    
    // Open Graph
    document.getElementById('og-title').content = post.title;
    document.getElementById('og-description').content = post.excerpt;
    document.getElementById('og-image').content = post.imageUrl;
    
    // Twitter
    document.getElementById('twitter-title').content = post.title;
    document.getElementById('twitter-description').content = post.excerpt;
    document.getElementById('twitter-image').content = post.imageUrl;
    
    // Breadcrumb
    document.getElementById('breadcrumb-category').textContent = post.category;
    
    // Post header
    document.getElementById('post-category-badge').textContent = post.category;
    document.getElementById('post-title-main').textContent = post.title;
    document.getElementById('post-author').textContent = post.author;
    document.getElementById('post-date').textContent = post.formattedDate;
    
    // Featured image
    const featuredImage = document.getElementById('post-featured-image');
    featuredImage.src = post.imageUrl;
    featuredImage.alt = post.title;
    
    // Main content
    document.getElementById('post-content-main').innerHTML = post.content;
    
    // Tags
    const tagsContainer = document.getElementById('post-tags');
    if (post.tags && post.tags.length > 0) {
        tagsContainer.innerHTML = post.tags.map(tag => 
            `<span class="post-tag">${tag}</span>`
        ).join('');
    } else {
        tagsContainer.parentElement.style.display = 'none';
    }
    
    // Author bio
    document.getElementById('author-bio-name').textContent = post.author;
    
    // Generate table of contents if post is long
    generateTableOfContents();
}

// ============================================
// GENERATE TABLE OF CONTENTS
// ============================================
function generateTableOfContents() {
    const content = document.getElementById('post-content-main');
    const headings = content.querySelectorAll('h2, h3');
    
    if (headings.length < 3) {
        // Don't show TOC for short posts
        return;
    }
    
    const toc = document.getElementById('table-of-contents');
    const tocList = document.getElementById('toc-list');
    
    tocList.innerHTML = '';
    
    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        
        const li = document.createElement('li');
        li.className = heading.tagName === 'H3' ? 'toc-sub-item' : 'toc-item';
        
        const a = document.createElement('a');
        a.href = `#${id}`;
        a.textContent = heading.textContent;
        a.onclick = (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
    
    toc.style.display = 'block';
}

// ============================================
// LOAD RELATED POSTS
// ============================================
async function loadRelatedPosts(category) {
    try {
        // Fetch posts in same category
        const url = getContentfulUrl('blogPost', `&fields.category=${category}&limit=3&order=-fields.publishedDate`);
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            document.querySelector('.related-posts-section').style.display = 'none';
            return;
        }
        
        // Process posts
        const relatedPosts = data.items
            .map(item => processPost(item, data.includes))
            .filter(post => post.id !== currentPost.id) // Exclude current post
            .slice(0, 3); // Max 3 posts
        
        if (relatedPosts.length === 0) {
            document.querySelector('.related-posts-section').style.display = 'none';
            return;
        }
        
        // Display related posts
        const grid = document.getElementById('related-posts-grid');
        grid.innerHTML = '';
        
        relatedPosts.forEach(post => {
            const card = createPostCard(post);
            grid.appendChild(card);
        });
        
    } catch (error) {
        console.error('❌ Error loading related posts:', error);
        document.querySelector('.related-posts-section').style.display = 'none';
    }
}

// Create post card (same as blog.js)
function createPostCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    
    const tagsHTML = post.tags.slice(0, 3).map(tag => 
        `<span class="post-tag">${tag}</span>`
    ).join('');
    
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
            <div class="post-tags">
                ${tagsHTML}
            </div>
            <a href="blog-post.html?slug=${post.slug}" class="blog-card-link">Read More →</a>
        </div>
    `;
    
    return card;
}

// ============================================
// SOCIAL SHARING
// ============================================
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentPost.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function shareOnWhatsApp() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${currentPost.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    
    // Try modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
        }).catch(err => {
            // Fallback
            fallbackCopyLink(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyLink(url);
    }
}

function fallbackCopyLink(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard!');
    } catch (err) {
        showNotification('Failed to copy link', 'error');
    }
    
    document.body.removeChild(textarea);
}

// ============================================
// ERROR STATE
// ============================================
function showErrorState() {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('blog-post-content').style.display = 'none';
    document.getElementById('error-state').style.display = 'flex';
}

// ============================================
// NOTIFICATION
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'error' ? '#ff4757' : '#00d9ff'};
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
// MAKE FUNCTIONS GLOBAL
// ============================================
window.shareOnFacebook = shareOnFacebook;
window.shareOnTwitter = shareOnTwitter;
window.shareOnWhatsApp = shareOnWhatsApp;
window.copyLink = copyLink;

console.log('✅ Blog post detail JS loaded');
console.log('📖 Ready to display blog posts from Contentful');
