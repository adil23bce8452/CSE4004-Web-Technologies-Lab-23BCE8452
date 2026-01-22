const inventory = [
    { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
    { id: 2, name: "Headphones", price: 200, category: "Electronics" },
    { id: 3, name: "Coffee Mug", price: 15, category: "Home" },
    { id: 4, name: "Notebook", price: 5, category: "Stationery" }
];

let cart = [];
let activeCoupon = null;

function addToCart(productId) {
    const product = inventory.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
    }
    renderCart();
}

function calculateTotals() {
    let subtotal = 0;
    let discounts = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        if (item.quantity >= 3) {
            discounts += itemTotal * 0.10;
        }

        if (item.category === "Electronics" && item.price > 500) {
            discounts += 20;
        }
    });

    const currentHour = new Date().getHours();
    if (currentHour >= 16 && currentHour <= 18) {
        discounts += (subtotal - discounts) * 0.05;
    }

    if (activeCoupon) {
        const cleanCoupon = activeCoupon.trim().toUpperCase();
        if (cleanCoupon.startsWith("SAVE") && cleanCoupon.length === 6) {
            const amount = parseInt(cleanCoupon.slice(4));
            if (!isNaN(amount)) discounts += amount;
        }
    }

    return {
        subtotal,
        discounts,
        finalTotal: Math.max(0, subtotal - discounts)
    };
}

function renderCart() {
    const cartDiv = document.getElementById('cart-items');
    cartDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} ($${item.price})</span>
            <div>
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const totals = calculateTotals();
    document.getElementById('subtotal').textContent = totals.subtotal.toFixed(2);
    document.getElementById('discountTotal').textContent = totals.discounts.toFixed(2);
    document.getElementById('finalTotal').textContent = totals.finalTotal.toFixed(2);
}

function applyCoupon() {
    activeCoupon = document.getElementById('couponInput').value;
    renderCart();
}

document.getElementById('product-list').innerHTML = inventory.map(p => `
    <div class="product">
        <span>${p.name} - $${p.price}</span>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
`).join('');