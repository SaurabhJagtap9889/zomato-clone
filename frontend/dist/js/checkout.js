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