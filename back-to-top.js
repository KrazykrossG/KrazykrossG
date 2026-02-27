// ============================================
// MODERN BACK TO TOP BUTTON WITH PROGRESS
// Add this to blog-post.js or create new file
// ============================================

/**
 * Enhanced Back to Top Button
 * Features:
 * - Circular progress indicator
 * - Smooth scroll animation
 * - Multiple style options
 * - Mobile responsive
 */

class BackToTopButton {
    constructor(options = {}) {
        this.options = {
            scrollThreshold: 300,           // Show button after this many pixels
            style: 'circle',                 // 'circle', 'square', or 'pill'
            showProgress: true,              // Show progress indicator
            smoothScroll: true,              // Smooth scroll animation
            scrollDuration: 800,             // Scroll duration in ms
            showPercentage: false,           // Show percentage text
            floatAnimation: false,           // Add floating animation
            glowEffect: true,                // Add glow on hover
            ...options
        };
        
        this.button = null;
        this.progressCircle = null;
        this.progressPercent = null;
        this.isVisible = false;
        
        this.init();
    }
    
    init() {
        this.createButton();
        this.attachEventListeners();
        console.log('✅ Back to Top button initialized');
    }
    
    createButton() {
        // Remove existing button if any
        const existing = document.getElementById('back-to-top-enhanced');
        if (existing) existing.remove();
        
        // Create button
        this.button = document.createElement('button');
        this.button.id = 'back-to-top-enhanced';
        this.button.className = 'back-to-top';
        this.button.setAttribute('aria-label', 'Back to top');
        this.button.setAttribute('title', 'Back to top');
        
        // Add style classes
        if (this.options.style === 'square') {
            this.button.classList.add('style-square');
        } else if (this.options.style === 'pill') {
            this.button.classList.add('style-pill');
        }
        
        if (this.options.floatAnimation) {
            this.button.classList.add('animate-float');
        }
        
        if (this.options.glowEffect) {
            this.button.classList.add('glow-effect');
        }
        
        // Build button content based on style
        if (this.options.style === 'circle' && this.options.showProgress) {
            this.button.innerHTML = this.createCircleStyle();
        } else if (this.options.style === 'square') {
            this.button.innerHTML = this.createSquareStyle();
        } else if (this.options.style === 'pill') {
            this.button.innerHTML = this.createPillStyle();
        } else {
            this.button.innerHTML = this.createSimpleStyle();
        }
        
        // Append to body
        document.body.appendChild(this.button);
        
        // Get references to progress elements
        if (this.options.showProgress && this.options.style === 'circle') {
            this.progressCircle = this.button.querySelector('.progress-ring-circle');
            this.progressPercent = this.button.querySelector('.progress-percent');
        }
    }
    
    createCircleStyle() {
        const radius = 26;
        const circumference = 2 * Math.PI * radius;
        
        return `
            <svg class="progress-ring" width="60" height="60">
                <circle
                    class="progress-ring-circle"
                    stroke="currentColor"
                    stroke-width="3"
                    fill="transparent"
                    r="${radius}"
                    cx="30"
                    cy="30"
                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${circumference};"
                />
            </svg>
            <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            ${this.options.showPercentage ? '<span class="progress-percent">0%</span>' : ''}
        `;
    }
    
    createSquareStyle() {
        return `
            <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            ${this.options.showProgress ? '<div class="progress-bar" style="width: 0%"></div>' : ''}
        `;
    }
    
    createPillStyle() {
        return `
            <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span class="pill-text">Top</span>
        `;
    }
    
    createSimpleStyle() {
        return `
            <svg class="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
        `;
    }
    
    attachEventListeners() {
        // Scroll event for showing/hiding button and updating progress
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Click event for scrolling to top
        this.button.addEventListener('click', () => this.scrollToTop());
        
        // Initial check
        this.handleScroll();
    }
    
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Show/hide button
        if (scrollTop > this.options.scrollThreshold) {
            if (!this.isVisible) {
                this.button.classList.add('visible');
                this.isVisible = true;
            }
        } else {
            if (this.isVisible) {
                this.button.classList.remove('visible');
                this.isVisible = false;
            }
        }
        
        // Update progress indicator
        if (this.isVisible && this.options.showProgress) {
            this.updateProgress(scrollPercent);
        }
    }
    
    updateProgress(percent) {
        if (this.options.style === 'circle' && this.progressCircle) {
            // Update circular progress
            const radius = 26;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100) * circumference;
            this.progressCircle.style.strokeDashoffset = offset;
            
            // Update percentage text if enabled
            if (this.options.showPercentage && this.progressPercent) {
                this.progressPercent.textContent = Math.round(percent) + '%';
            }
        } else if (this.options.style === 'square') {
            // Update progress bar
            const progressBar = this.button.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = percent + '%';
            }
        }
    }
    
    scrollToTop() {
        if (this.options.smoothScroll) {
            this.smoothScrollToTop();
        } else {
            window.scrollTo(0, 0);
        }
    }
    
    smoothScrollToTop() {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();
        const duration = this.options.scrollDuration;
        
        const easeInOutCubic = (t) => {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const scroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition * (1 - easing));
            
            if (progress < 1) {
                requestAnimationFrame(scroll);
            }
        };
        
        requestAnimationFrame(scroll);
    }
    
    // Public methods for customization
    setStyle(style) {
        this.options.style = style;
        this.createButton();
        this.attachEventListeners();
    }
    
    destroy() {
        if (this.button) {
            this.button.remove();
        }
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackToTop);
} else {
    initBackToTop();
}

function initBackToTop() {
    // Check if we're on a blog post page
    const isBlogPost = document.querySelector('.blog-post-page') || 
                       document.querySelector('.post-content-main');
    
    if (!isBlogPost) {
        console.log('ℹ️ Not a blog post page, skipping back-to-top initialization');
        return;
    }
    
    // Initialize with default options
    window.backToTopButton = new BackToTopButton({
        scrollThreshold: 300,
        style: 'circle',              // Options: 'circle', 'square', 'pill'
        showProgress: true,
        smoothScroll: true,
        scrollDuration: 800,
        showPercentage: false,        // Set to true to show percentage
        floatAnimation: false,        // Set to true for floating effect
        glowEffect: true
    });
    
    console.log('✅ Modern Back to Top button loaded');
}

// ============================================
// USAGE EXAMPLES (Comment out when not needed)
// ============================================

/*
// Example 1: Circle with progress (default)
window.backToTopButton = new BackToTopButton({
    style: 'circle',
    showProgress: true,
    showPercentage: false
});

// Example 2: Square with progress bar
window.backToTopButton = new BackToTopButton({
    style: 'square',
    showProgress: true
});

// Example 3: Pill style with text
window.backToTopButton = new BackToTopButton({
    style: 'pill',
    showProgress: false
});

// Example 4: Circle with percentage
window.backToTopButton = new BackToTopButton({
    style: 'circle',
    showProgress: true,
    showPercentage: true
});

// Example 5: With floating animation
window.backToTopButton = new BackToTopButton({
    style: 'circle',
    showProgress: true,
    floatAnimation: true
});

// Change style dynamically
window.backToTopButton.setStyle('square');

// Destroy button
window.backToTopButton.destroy();
*/

// Make class globally available
window.BackToTopButton = BackToTopButton;
