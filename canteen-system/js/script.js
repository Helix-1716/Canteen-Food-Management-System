document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAuth();
    
    if (document.getElementById('food-grid')) {
        initStudentDashboard();
    }
    
    if (document.getElementById('admin-food-table')) {
        initAdminDashboard();
    }
    
    if (document.getElementById('kitchen-orders')) {
        initKitchenPanel();
    }
});

function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeBtn, currentTheme);
    
    themeBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let targetTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
        updateThemeIcon(themeBtn, targetTheme);
    });
}

function updateThemeIcon(btn, theme) {
    if (theme === 'dark') {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function initAuth() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const role = document.getElementById('role').value;
            
            localStorage.setItem('currentUser', role);
            
            if (role === 'student') window.location.href = 'student-dashboard.html';
            if (role === 'admin') window.location.href = 'admin-dashboard.html';
            if (role === 'kitchen') window.location.href = 'kitchen-panel.html';
        });
    }
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
}

const defaultMenu = [
    { id: 1, name: 'Masala Dosa', price: 60, category: 'breakfast', img: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', available: true },
    { id: 2, name: 'Paneer Butter Masala', price: 120, category: 'lunch', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', available: true },
    { id: 3, name: 'Samosa', price: 15, category: 'snacks', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', available: true },
    { id: 4, name: 'Cold Coffee', price: 40, category: 'drinks', img: 'https://images.unsplash.com/photo-1461023058943-0708e5215bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', available: true },
    { id: 5, name: 'Veg Burger', price: 55, category: 'snacks', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', available: true },
    { id: 6, name: 'Vada Pav', price: 20, category: 'snacks', img: 'https://images.unsplash.com/photo-1567980973012-0b62e49c7162?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', available: true },
];

function getMenu() {
    if (!localStorage.getItem('menu')) {
        localStorage.setItem('menu', JSON.stringify(defaultMenu));
    }
    return JSON.parse(localStorage.getItem('menu'));
}

let cart = [];

function initStudentDashboard() {
    renderMenu('all');
    
    document.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            renderMenu(e.target.dataset.category);
        });
    });
    
    const searchInput = document.getElementById('search-food');
    searchInput.addEventListener('input', (e) => {
        renderMenu('all', e.target.value);
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
    });
    
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    cartBtn.addEventListener('click', () => cartSidebar.classList.add('open'));
    closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));
    
    document.getElementById('place-order-btn').addEventListener('click', placeOrder);
}

function renderMenu(category, searchQuery = '') {
    const grid = document.getElementById('food-grid');
    const menu = getMenu();
    
    let filtered = menu.filter(item => item.available);
    
    if (category !== 'all') {
        filtered = filtered.filter(item => item.category === category);
    }
    
    if (searchQuery) {
        filtered = filtered.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    grid.innerHTML = '';
    
    if (filtered.length === 0) {
        grid.innerHTML = '<p>No items found.</p>';
        return;
    }
    
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card food-card';
        card.innerHTML = `
            <div class="food-img-container">
                <img src="${item.img}" alt="${item.name}">
                <button class="fav-btn" onclick="toggleFav(this)"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="food-info">
                <div class="food-header">
                    <div class="food-title">${item.name}</div>
                </div>
                <div class="food-desc">Delicious ${item.category} item</div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                    <div class="food-price">₹${item.price}</div>
                    <button class="btn btn-primary add-cart-btn" style="width: auto" onclick="addToCart(${item.id})">Add <i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

window.toggleFav = function(btn) {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.replace('fa-regular', 'fa-solid');
    } else {
        icon.classList.replace('fa-solid', 'fa-regular');
    }
}

window.addToCart = function(id) {
    const menu = getMenu();
    const item = menu.find(i => i.id === id);
    
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('open');
}

window.updateCartQty = function(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');
    const orderBtn = document.getElementById('place-order-btn');
    
    itemsContainer.innerHTML = '';
    
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        total += item.price * item.qty;
        count += item.qty;
        
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
            </div>
        `;
        itemsContainer.appendChild(div);
    });
    
    badge.textContent = count;
    totalEl.textContent = `Total: ₹${total}`;
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align:center; color: var(--text-secondary); margin-top:20px;">Cart is empty</p>';
        orderBtn.disabled = true;
    } else {
        orderBtn.disabled = false;
    }
}

function placeOrder() {
    if (cart.length === 0) return;
    
    const token = Math.floor(100 + Math.random() * 900);
    
    const newOrder = {
        token: `#${token}`,
        items: [...cart],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'Preparing'
    };
    
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    cart = [];
    updateCartUI();
    document.getElementById('cart-sidebar').classList.remove('open');
    
    const modal = document.getElementById('order-modal');
    document.getElementById('modal-token').textContent = newOrder.token;
    modal.classList.add('active');
}

window.closeModal = function() {
    document.getElementById('order-modal').classList.remove('active');
}

function initAdminDashboard() {
    renderAdminTable();
    updateAdminStats();
}

function renderAdminTable() {
    const tbody = document.getElementById('admin-food-table');
    const menu = getMenu();
    
    tbody.innerHTML = '';
    
    menu.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${item.id}</td>
            <td><div style="display:flex; align-items:center; gap:10px;"><img src="${item.img}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;"> ${item.name}</div></td>
            <td style="text-transform: capitalize;">${item.category}</td>
            <td>₹${item.price}</td>
            <td><span class="status-badge ${item.available ? 'status-available' : 'status-unavailable'}">${item.available ? 'Available' : 'Unavailable'}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon" onclick="toggleAvailability(${item.id})" title="Toggle Availability"><i class="fa-solid fa-power-off"></i></button>
                    <button class="btn-icon" onclick="deleteMenuItem(${item.id})" title="Delete"><i class="fa-solid fa-trash" style="color: #ef4444;"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.toggleAvailability = function(id) {
    let menu = getMenu();
    let index = menu.findIndex(i => i.id === id);
    if (index !== -1) {
        menu[index].available = !menu[index].available;
        localStorage.setItem('menu', JSON.stringify(menu));
        renderAdminTable();
        updateAdminStats();
    }
}

window.deleteMenuItem = function(id) {
    if(confirm('Are you sure you want to delete this item?')) {
        let menu = getMenu();
        menu = menu.filter(i => i.id !== id);
        localStorage.setItem('menu', JSON.stringify(menu));
        renderAdminTable();
        updateAdminStats();
    }
}

function updateAdminStats() {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    let totalOrdersEl = document.getElementById('total-orders');
    if (totalOrdersEl) {
        totalOrdersEl.textContent = orders.length;
    }
    
    let menu = getMenu();
    let totalItemsEl = document.getElementById('total-items');
    if (totalItemsEl) {
        totalItemsEl.textContent = menu.length;
    }
}

function initKitchenPanel() {
    renderKitchenOrders();
    setInterval(renderKitchenOrders, 5000);
}

function renderKitchenOrders() {
    const grid = document.getElementById('kitchen-orders');
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    grid.innerHTML = '';
    
    const activeOrders = orders.filter(o => o.status !== 'Completed');
    
    if(activeOrders.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-secondary);">No active orders right now.</p>';
        return;
    }
    
    activeOrders.forEach((order) => {
        const card = document.createElement('div');
        card.className = 'card order-card';
        
        let itemsHtml = order.items.map(i => `
            <li>
                <span>${i.qty}x ${i.name}</span>
            </li>
        `).join('');
        
        let actionsHtml = '';
        if (order.status === 'Preparing') {
            actionsHtml = `<button class="btn btn-success" onclick="updateOrderStatus('${order.token}', 'Ready')">Mark Ready</button>`;
        } else if (order.status === 'Ready') {
            actionsHtml = `<button class="btn btn-outline" onclick="updateOrderStatus('${order.token}', 'Completed')">Handed Over</button>`;
        }
        
        card.innerHTML = `
            <div class="order-header">
                <span class="order-token">${order.token}</span>
                <span class="order-time"><i class="fa-regular fa-clock"></i> ${order.time}</span>
            </div>
            <div style="padding: 1rem 1.5rem; background: var(--background);">
                <span class="status-badge ${order.status === 'Ready' ? 'status-available' : 'status-unavailable'}">${order.status}</span>
            </div>
            <ul class="order-items-list">
                ${itemsHtml}
            </ul>
            <div class="order-actions">
                ${actionsHtml}
            </div>
        `;
        grid.appendChild(card);
    });
}

window.updateOrderStatus = function(token, targetStatus) {
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');
    let index = orders.findIndex(o => o.token === token);
    
    if (index !== -1) {
        orders[index].status = targetStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        renderKitchenOrders();
    }
}
