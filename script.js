// Product Data
const products = [
    { id: 1, brand: "BALENCIAGA", name: "OVERSIZED WOOL BLEND COAT", price: 899.00, image: "wool-coat.jpg", category: "femme" },
    { id: 2, brand: "KHAITE", name: "ROBE MANTEAU CEINTURE LARGE ZW COLLECTION LIMITED EDITION", price: 599.00, salePrice: 499.00, image: "limited.jpg", category: "femme" },
    { id: 3, brand: "JACQUEMUS", name: "BLOUSE AJUSTÉE EFFET FROISSÉ", price: 149, image: "blouse.jpg", category: "femme" },
    { id: 4, brand: "ALEXANDER MCQUEEN", name: "CHEMISE SATINÉE À EMMANCHURE TOMBANTE", price: 139.00, image: "chemise.jpg", category: "femme" },
    { id: 5, brand: "GANNI", name: "BLOUSE RAYURES ET NŒUD", price: 139.00, image: "blouse2.jpg", category: "femme" },
    { id: 6, brand: "PRADA", name: "CHEMISE ROMANTIQUE EN PLUMETIS", price: 159.00, image: "chemise2.jpg", category: "femme" },
    { id: 7, brand: "ZARA", name: "BASIC LONG SLEEVE TECHNICAL T-SHIRT", price: 109, image: "basic-long-sleeve.jpg" },
    { id: 8, brand: "ZARA", name: "OPENWORK STRIPED SWEATER", price: 199, image: "openwork.jpg" },
    { id: 9, brand: "BALENCIAGA", name: "CLOTH CAP WITH INITIAL", price: 55.90, image: "cap.jpg" },
    { id: 10, brand: "PRADA", name: "SOFT KNIT VEST TOP", price: 109.00, image: "knit.jpg" }
];

let cart = {};

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    
    // Render products on products page
    if (document.getElementById('productsGrid')) {
        renderProducts();
    }
    
    // Render new collection on home page
    if (document.getElementById('newCollectionGrid')) {
        renderNewCollection();
    }
    
    // Render cart on cart page
    if (document.getElementById('cartItems')) {
        renderCart();
    }
    
    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Render products on products page
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const countElement = document.getElementById('productsCount');
    
    if (!grid) return;
    
    countElement.textContent = `${products.length} articles`;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image-wrapper">
                <div class="product-image"><img src="images/${product.image}" alt="${product.name}"></div>
            </div>
            <div class="product-overlay">
                <div class="overlay-icon"><svg width="60" height="60" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M18 12h-6m0 0H6m6 0V6m0 6v6'/></svg></div>
                <button class="overlay-btn" onclick="addToCart(${product.id})">Ajouter au Panier</button>
            </div>
            <div class="product-brand">${product.brand}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">
                ${product.salePrice ? `
                    <span class="original-price">${product.price.toFixed(2)} TND</span>
                    <span class="sale-price">${product.salePrice.toFixed(2)} TND</span>
                ` : `${product.price.toFixed(2)} TND`}
            </div>
        </div>
    `).join('');
}

// Render new collection on home page
function renderNewCollection() {
    const grid = document.getElementById('newCollectionGrid');
    if (!grid) return;
    
    const featuredProducts = [
        { id: 7, name: "BASIC LONG SLEEVE TECHNICAL T-SHIRT", desc: "T-shirt made from a structured, lightweight, and elastic technical fabric.", price: "109 TND", image: "basic-long-sleeve.jpg" },
        { id: 8, name: "OPENWORK STRIPED SWEATER", desc: "Relaxed fit sweater with an open knit. Featuring a V-neck and long sleeves. Ribbed trims.", price: "199 TND", image: "openwork.jpg" },
        { id: 9, name: "CLOTH CAP WITH INITIAL", desc: "Cap with adjustable hook-and-loop fastening at the back..", price: "55.90 TND", image: "cap.jpg" },
        { id: 10, name: "SOFT KNIT VEST TOP", desc: "Plain knit vest top with a v-neck and sleeveless design. Ribbed trims.", price: "109.00 TND", image: "basic-long-sleeve.jpg" }
    ];
    
    grid.innerHTML = featuredProducts.map(product => `
        <div class="collection-card">
            <div class="collection-image">
                <div class="product-image"><img src="images/${product.image}" alt="${product.name}"></div>
            </div>
            <div class="collection-overlay">
                <div class="overlay-icon"><svg width="60" height="60" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M18 12h-6m0 0H6m6 0V6m0 6v6'/></svg></div>
                <button class="overlay-btn" onclick="addToCart(${product.id})">Ajouter au Panier</button>
            </div>
            <div class="collection-info">
                <div class="collection-name">${product.name}</div>
                <div class="collection-desc">${product.desc}</div>
                <div class="collection-price">${product.price}</div>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (cart[productId]) {
        cart[productId].quantity++;
    } else {
        cart[productId] = { 
            ...product, 
            quantity: 1,
            finalPrice: product.salePrice || product.price
        };
    }
    updateCartCount();
    saveCart();
    
    // Show feedback
    alert('✓ Produit ajouté au panier avec succès!');
}

// Update cart count
function updateCartCount() {
    const count = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Render cart
function renderCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartSummaryDiv = document.getElementById('cartSummary');
    
    if (!cartItemsDiv) return;
    
    if (Object.keys(cart).length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon"><svg width="75" height="75" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d='M8.935 7H7.773c-1.072 0-1.962.81-2.038 1.858l-.73 10C4.921 20.015 5.858 21 7.043 21h9.914c1.185 0 2.122-.985 2.038-2.142l-.73-10C18.189 7.81 17.299 7 16.227 7h-1.162m-6.13 0V5c0-1.105.915-2 2.043-2h2.044c1.128 0 2.043.895 2.043 2v2m-6.13 0h6.13'/></svg></div>
                <h3>Votre panier est vide</h3>
                <p>Découvrez notre collection et ajoutez des articles à votre panier</p>
                <button class="btn-primary" onclick="window.location.href='products.html'">
                    Explorer la Collection
                </button>
            </div>
        `;
        cartSummaryDiv.innerHTML = '';
        return;
    }

    const items = Object.values(cart);
    cartItemsDiv.innerHTML = items.map(item => `
        <div class="cart-item">
            <div class="cart-item-image"><img src="images/${item.image}"></div>
            
            <div class="cart-item-details">
                <h3>${item.brand}</h3>
                <p>${item.name}</p>
                <div class="cart-item-controls">
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Supprimer</button>
                </div>
            </div>
            <div class="cart-item-price">
                ${(item.finalPrice * item.quantity).toFixed(2)} TND
            </div>
        </div>
    `).join('');

    const subtotal = items.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + shipping;

    cartSummaryDiv.innerHTML = `
        <div class="cart-summary">
            <div class="summary-row">
                <span>Sous-total</span>
                <span>${subtotal.toFixed(2)} TND</span>
            </div>
            <div class="summary-row">
                <span>Livraison</span>
                <span>${shipping === 0 ? 'Gratuite' : shipping.toFixed(2) + ' TND'}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)} TND</span>
            </div>
            <button class="btn-primary" style="width: 100%; margin-top: 20px;">
                Passer la Commande
            </button>
        </div>
    `;
}

// Update quantity
function updateQuantity(productId, change) {
    if (cart[productId]) {
        cart[productId].quantity += change;
        if (cart[productId].quantity <= 0) {
            delete cart[productId];
        }
        updateCartCount();
        renderCart();
        saveCart();
    }
}

// Remove from cart
function removeFromCart(productId) {
    delete cart[productId];
    updateCartCount();
    renderCart();
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    const cartData = {};
    Object.keys(cart).forEach(key => {
        cartData[key] = {
            id: cart[key].id,
            quantity: cart[key].quantity
        };
    });
    localStorage.setItem('maisonElyseeCart', JSON.stringify(cartData));
}

// Load cart from localStorage
function loadCart() {
    const saved = localStorage.getItem('maisonElyseeCart');
    if (saved) {
        const cartData = JSON.parse(saved);
        Object.keys(cartData).forEach(key => {
            const product = products.find(p => p.id === cartData[key].id);
            if (product) {
                cart[key] = { 
                    ...product, 
                    quantity: cartData[key].quantity,
                    finalPrice: product.salePrice || product.price
                };
            }
        });
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    alert('Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais.');
    e.target.reset();
}



// Countdown Timer
function startCountdown() {
    const promoBanner = document.querySelector('.promo-banner');
    if (!promoBanner) return;

   
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 15);
    endDate.setMinutes(endDate.getMinutes() + 45);
    endDate.setSeconds(endDate.getSeconds() + 37);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = endDate - now;

        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        
        promoBanner.textContent = `Profitez de -25% sur Cette Vente d'Été. Ne Manquez Pas! ${formattedHours}H : ${formattedMinutes}M : ${formattedSeconds}S`;

        
        if (distance < 0) {
            clearInterval(timerInterval);
            promoBanner.textContent = "La vente est terminée!";
        }
    }

    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}


document.addEventListener('DOMContentLoaded', function() {
    startCountdown(); // Add this line
    
    loadCart();
    updateCartCount();
    
    // ... rest of your existing code
});