const API_URL = 'http://localhost:3000/api';

// Add cart state
let cart = [];

// Fetch and display restaurants
async function fetchRestaurants() {
    try {
        const response = await fetch(`${API_URL}/restaurants`);
        const restaurants = await response.json();
        displayRestaurants(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
    }
}

function displayRestaurants(restaurants) {
    // Create a new section for restaurants
    const main = document.querySelector('body');
    const restaurantSection = document.createElement('section');
    restaurantSection.className = 'section';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Popular Restaurants';
    restaurantSection.appendChild(heading);

    const restaurantsGrid = document.createElement('div');
    restaurantsGrid.className = 'scroll-row';

    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'brand';
        restaurantCard.innerHTML = `
            <img src="${restaurant.image || 'https://i.ibb.co/b5GvkPyM/food-buffet.jpg'}" alt="${restaurant.name}">
            <p>${restaurant.name}<br><small>${restaurant.cuisine} • ₹${restaurant.priceRange}</small></p>
        `;
        // Add to Cart button
        const addBtn = document.createElement('button');
        addBtn.className = 'add-to-cart-btn';
        addBtn.textContent = 'Add to Cart';
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart({
                name: restaurant.name,
                price: restaurant.priceRange,
                image: restaurant.image,
                type: 'restaurant'
            });
        });
        restaurantCard.appendChild(addBtn);
        restaurantCard.style.cursor = 'default';
        restaurantsGrid.appendChild(restaurantCard);
    });

    restaurantSection.appendChild(restaurantsGrid);
    main.appendChild(restaurantSection);
}

// Fetch and display food items
async function fetchFoodItems() {
    try {
        const response = await fetch(`${API_URL}/food-items`);
        const foodItems = await response.json();
        displayFoodItems(foodItems);
    } catch (error) {
        console.error('Error fetching food items:', error);
    }
}

function displayFoodItems(foodItems) {
    // Create a new section for food items
    const main = document.querySelector('body');
    const foodSection = document.createElement('section');
    foodSection.className = 'section';
    
    const heading = document.createElement('h2');
    heading.textContent = 'Popular Food Items';
    foodSection.appendChild(heading);

    const foodGrid = document.createElement('div');
    foodGrid.className = 'scroll-row';

    foodItems.forEach(item => {
        const foodCard = document.createElement('div');
        foodCard.className = 'category';
        foodCard.innerHTML = `
            <img src="${item.image || 'https://i.ibb.co/b5GvkPyM/food-buffet.jpg'}" alt="${item.name}">
            <p>${item.name}<br><small>${item.isVegetarian ? '🥬 Veg' : '🍖 Non-Veg'} • ₹${item.price}</small></p>
        `;
        // Add to Cart button
        const addBtn = document.createElement('button');
        addBtn.className = 'add-to-cart-btn';
        addBtn.textContent = 'Add to Cart';
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart({
                name: item.name,
                price: item.price,
                image: item.image,
                isVegetarian: item.isVegetarian,
                type: 'food'
            });
        });
        foodCard.appendChild(addBtn);
        foodCard.style.cursor = 'default';
        foodGrid.appendChild(foodCard);
    });

    foodSection.appendChild(foodGrid);
    main.appendChild(foodSection);
}

// Search functionality
const searchInput = document.querySelector('.search-box');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const restaurantCards = document.querySelectorAll('.section .brand');
    const foodCards = document.querySelectorAll('.section .category');

    restaurantCards.forEach(card => {
        const name = card.querySelector('p').textContent.toLowerCase();
        const cuisine = card.querySelector('small').textContent.toLowerCase();
        card.style.display = name.includes(searchTerm) || cuisine.includes(searchTerm) ? 'block' : 'none';
    });

    foodCards.forEach(card => {
        const name = card.querySelector('p').textContent.toLowerCase();
        const category = card.querySelector('small').textContent.toLowerCase();
        card.style.display = name.includes(searchTerm) || category.includes(searchTerm) ? 'block' : 'none';
    });
});

// Example data for nightlife collections
const nightlifeCollections = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Top Trending Spots",
    places: "38 Places"
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "Sky High Sips",
    places: "23 Places"
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    title: "Finest Microbreweries",
    places: "15 Places"
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
    title: "Newly Opened Places",
    places: "19 Places"
  }
];

function renderNightlifeCollections() {
  const section = document.getElementById('nightlife-collections');
  section.innerHTML = `
    <div class="nightlife-collections-title">Collections</div>
    <div class="nightlife-collections-subtitle">
      Explore curated lists of top restaurants, cafes, pubs, and bars in Pune, based on trends
    </div>
    <div class="nightlife-collections-row">
      ${nightlifeCollections.map(col => `
        <div class="nightlife-card">
          <img src="${col.image}" alt="${col.title}">
          <div class="nightlife-card-title">${col.title}</div>
          <div class="nightlife-card-places">${col.places}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// Tab switching logic
document.querySelectorAll('.tab').forEach((tab, idx) => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.js-main-section').forEach(sec => sec.style.display = 'none');
    if (tab.textContent.trim() === 'Dining Out' || tab.textContent.trim() === 'Delivery') {
      document.getElementById('dining-section').style.display = 'block';
    } else if (tab.textContent.trim() === 'Nightlife') {
      document.getElementById('nightlife-section').style.display = 'block';
      renderNightlifeCollections();
    }
  });
});

// Add cart icon to navbar
function addCartIconToNavbar() {
    const cartPlaceholder = document.getElementById('cart-navbar-placeholder');
    const cartIcon = document.createElement('div');
    cartIcon.className = 'cart-icon';
    cartIcon.id = 'cart-icon';
    cartIcon.innerHTML = `
        🛒
        <span class="cart-count" id="cart-count">0</span>
    `;
    cartPlaceholder.appendChild(cartIcon);

    // Add cart modal
    const cartModal = document.createElement('div');
    cartModal.className = 'modal-overlay';
    cartModal.id = 'cart-modal';
    cartModal.style.display = 'none';
    cartModal.innerHTML = `
        <div class="modal">
            <span class="modal-close" id="close-cart-modal">&times;</span>
            <h2>Your Cart</h2>
            <div id="cart-items"></div>
            <div class="cart-total">Total: ₹<span id="cart-total">0</span></div>
            <button class="modal-btn" id="checkout-btn">Checkout</button>
        </div>
    `;
    document.body.appendChild(cartModal);

    // Add event listeners
    cartIcon.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'flex';
    });

    document.getElementById('close-cart-modal').addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    document.getElementById('checkout-btn').addEventListener('click', () => {
        // Save cart to localStorage for checkout page
        localStorage.setItem('checkoutCart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });
}

function addToCart(item) {
    // Check if item already exists in cart (by name, or use a unique id if available)
    const existing = cart.find(cartItem => cartItem.name === item.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }
    updateCartCount();
    showAddToCartNotification(item.name);
}

function showAddToCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.textContent = `${itemName} added to cart!`;
    document.body.appendChild(notification);

    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function updateCartModal() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length > 0) {
        cartItems.innerHTML = cart.map((item, idx) => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <div class="cart-item-price">₹${item.price}</div>
                    <small>${item.type === 'food' ? (item.isVegetarian ? '🥬 Veg' : '🍖 Non-Veg') : 'Restaurant'}</small>
                </div>
                <div class="cart-qty-controls">
                    <button class="qty-btn" onclick="changeCartQty(${idx}, -1)">-</button>
                    <span class="cart-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeCartQty(${idx}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${idx})">Remove</button>
            </div>
        `).join('');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;
    } else {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.textContent = '0';
    }
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartCount();
    updateCartModal();
}

function changeCartQty(idx, delta) {
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) {
    cart.splice(idx, 1);
  }
  updateCartCount();
  updateCartModal();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    if (isLoggedIn && userName) {
        renderProfileDropdown(userName);
    }
    
    fetchRestaurants();
    fetchFoodItems();
    addCartIconToNavbar();
});

// Modal logic
const signupModal = document.getElementById('signup-modal');
const loginModal = document.getElementById('login-modal');
const signupBtn = document.querySelector('.auth-links a[href="#"]:nth-child(2)');
const closeSignup = document.getElementById('close-signup');
const closeLogin = document.getElementById('close-login');
const showLogin = document.getElementById('show-login');
const showSignup = document.getElementById('show-signup');
const loginBtnModal = document.getElementById('login-btn');

// Show Sign Up Modal
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  signupModal.style.display = 'flex';
  loginModal.style.display = 'none';
  document.body.style.overflow = 'hidden';
});

// Close Sign Up Modal
closeSignup.addEventListener('click', () => {
  signupModal.style.display = 'none';
  document.body.style.overflow = '';
});

// Show Log In Modal from Sign Up
showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  signupModal.style.display = 'none';
  loginModal.style.display = 'flex';
});

// Close Log In Modal
closeLogin.addEventListener('click', () => {
  loginModal.style.display = 'none';
  document.body.style.overflow = '';
});

// Show Sign Up Modal from Log In
showSignup.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'none';
  signupModal.style.display = 'flex';
});

// Enable/disable Create Account button (add password check)
const signupTerms = document.getElementById('signup-terms');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupCreateBtn = document.getElementById('signup-btn');
[signupTerms, signupName, signupEmail, signupPassword].forEach(el => {
  el.addEventListener('input', () => {
    signupCreateBtn.disabled = !(signupTerms.checked && signupName.value && signupEmail.value && signupPassword.value);
  });
});

// Handle Sign Up (register)
signupCreateBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
      })
    });
    const data = await res.json();
    if (res.ok) {
      showNotification('Sign up successful! Please log in.', 'success');
      signupModal.style.display = 'none';
      loginModal.style.display = 'flex';
      document.getElementById('login-email').value = signupEmail.value;
      document.getElementById('login-password').value = signupPassword.value;
    } else {
      showNotification(data.message || 'Registration failed.', 'error');
    }
  } catch (error) {
    showNotification('An error occurred during signup.', 'error');
  }
});

// Handle Log In
loginBtnModal.addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
      })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);
      renderProfileDropdown(data.name);
      loginModal.style.display = 'none';
      document.body.style.overflow = '';
      showNotification('Login successful!', 'success');
    } else {
      showNotification(data.message || 'Login failed.', 'error');
    }
  } catch (error) {
    showNotification('An error occurred during login.', 'error');
  }
});

// Add notification function
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Get the Log in button in the navbar
const loginBtn = document.querySelector('.auth-links a[href="#"]:nth-child(1)');

// Show Log In Modal
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  loginModal.style.display = 'flex';
  signupModal.style.display = 'none';
  document.body.style.overflow = 'hidden';
});

function renderProfileDropdown(name) {
  document.querySelector('.auth-links').innerHTML = `
    <div class="profile-dropdown">
      <div class="profile-btn">
        ${name.charAt(0).toUpperCase()}
      </div>
      <span class="profile-name-text">${name}</span>
      <span class="profile-arrow">&#9662;</span>
      <div class="profile-menu">
        <div class="profile-item">Profile</div>
        <div class="profile-item">Reviews</div>
        <div class="profile-item">Settings</div>
        <div class="profile-item" id="logout-btn">Log out</div>
      </div>
    </div>
  `;

  // Dropdown toggle: open when clicking anywhere on .profile-dropdown (button, name, or arrow)
  const profileDropdown = document.querySelector('.profile-dropdown');
  profileDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => {
    profileDropdown.classList.remove('open');
  });

  // Logout
  document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    localStorage.setItem('isLoggedIn', 'false');
    location.reload();
  });
}

function showCheckoutModal() {
  // Create modal if not already present
  let checkoutModal = document.getElementById('checkout-modal');
  if (!checkoutModal) {
    checkoutModal = document.createElement('div');
    checkoutModal.className = 'modal-overlay';
    checkoutModal.id = 'checkout-modal';
    document.body.appendChild(checkoutModal);
  }

  // Get cart data from localStorage
  const cart = JSON.parse(localStorage.getItem('checkoutCart')) || [];

  const checkoutItems = document.getElementById('checkout-items');
  const checkoutTotal = document.getElementById('checkout-total');

  if (cart.length > 0) {
    checkoutItems.innerHTML = cart.map(item => `
      <div class="checkout-item">
        <span>${item.name} x ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
      </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = total;
  } else {
    checkoutItems.innerHTML = '<p>Your cart is empty.</p>';
    checkoutTotal.textContent = '0';
  }

  document.getElementById('place-order-btn').onclick = () => {
    alert('Order placed!');
    localStorage.removeItem('checkoutCart');
    window.location.href = 'index.html';
  };

  checkoutModal.style.display = 'flex';

  // Close modal
  document.getElementById('close-checkout-modal').onclick = () => {
    checkoutModal.style.display = 'none';
  };
} 