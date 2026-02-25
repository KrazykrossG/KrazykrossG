// Order Confirmation Page Functionality

// Get order ID from URL
function getOrderIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('orderId');
}

// Get order data
function getOrderData(orderId) {
    const orders = JSON.parse(localStorage.getItem('krazykross_orders') || '[]');
    return orders.find(order => order.orderId === orderId);
}

// Display order information
function displayOrderInfo() {
    const orderId = getOrderIdFromURL();
    
    if (!orderId) {
        window.location.href = 'index.html';
        return;
    }
    
    const order = getOrderData(orderId);
    
    if (!order) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display Order ID
    document.getElementById('display-order-id').textContent = order.orderId;
    document.getElementById('transfer-reference').textContent = order.orderId;
    
    // Display Transfer Amount
    document.getElementById('transfer-amount').textContent = order.total;
    document.getElementById('order-total').textContent = order.total;
    
    // Display Customer Email
    document.getElementById('customer-email').textContent = order.customerInfo.email;
    
    // Display Order Items
    const itemsList = document.getElementById('order-items-list');
    itemsList.innerHTML = '';
    
    order.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item-row';
        itemDiv.innerHTML = `
            <span class="order-item-name">${item.title}</span>
            <span class="order-item-price">${item.price}</span>
        `;
        itemsList.appendChild(itemDiv);
    });
    
    // Display Customer Details
    const customerDetails = document.getElementById('customer-details');
    customerDetails.innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Name:</span>
            <span class="detail-value">${order.customerInfo.firstName} ${order.customerInfo.lastName}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${order.customerInfo.email}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">${order.customerInfo.phone}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Country:</span>
            <span class="detail-value">${order.customerInfo.country}</span>
        </div>
        ${order.customerInfo.notes ? `
        <div class="detail-row">
            <span class="detail-label">Notes:</span>
            <span class="detail-value">${order.customerInfo.notes}</span>
        </div>
        ` : ''}
    `;
}

// Copy order ID to clipboard
function copyOrderId() {
    const orderId = document.getElementById('display-order-id').textContent;
    copyToClipboard(orderId);
    showNotification('Order ID copied to clipboard!');
}

// Copy text to clipboard
function copyText(text) {
    copyToClipboard(text);
    showNotification('Copied to clipboard!');
}

// Copy amount
function copyAmount() {
    const amount = document.getElementById('transfer-amount').textContent;
    copyToClipboard(amount);
    showNotification('Amount copied to clipboard!');
}

// Copy reference
function copyReference() {
    const reference = document.getElementById('transfer-reference').textContent;
    copyToClipboard(reference);
    showNotification('Reference copied to clipboard!');
}

// Copy to clipboard helper
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayOrderInfo();
});

// Make functions globally available
window.copyOrderId = copyOrderId;
window.copyText = copyText;
window.copyAmount = copyAmount;
window.copyReference = copyReference;
