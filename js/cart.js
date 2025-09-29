// js/cart.js
(function () {
  const KEY = "cart";

  function _read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch { return []; }
  }
  function _write(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr));
  }

  function get() { return _read(); }

  function add(item) {
    const cart = _read();
    const idx = cart.findIndex(x => x.id === item.id);
    if (idx > -1) {
      cart[idx].qty += item.qty || 1;
    } else {
      cart.push({ id: item.id, name: item.name, price: item.price, image: item.image, qty: item.qty || 1 });
    }
    _write(cart);
    updateCartBadge();
  }

  function remove(id) {
    const cart = _read().filter(x => x.id !== id);
    _write(cart);
    updateCartBadge();
  }

  function updateQty(id, qty) {
    const cart = _read();
    const it = cart.find(x => x.id === id);
    if (it) {
      it.qty = Math.max(1, parseInt(qty, 10) || 1);
      _write(cart);
      updateCartBadge();
    }
  }

  function clear() { _write([]); updateCartBadge(); }

  function total() {
    return _read().reduce((s, x) => s + x.price * x.qty, 0);
  }

  // ---- badge updater (reads total quantity) ----
  function updateCartBadge() {
    const count = _read().reduce((sum, x) => sum + x.qty, 0);
    const badge = document.querySelector(".badge-cart");
    if (badge) badge.textContent = String(count);
  }

  // Expose
  window.Cart = { get, add, remove, updateQty, clear, total, updateCartBadge };

  // Button handler used by cards
  window.addToCart = function (id, name, price, image) {
    Cart.add({ id: String(id), name, price: Number(price), image, qty: 1 });
    console.log(`${name} added to cart`);
  };

  // initialize badge on load (works across all pages with the navbar)
  document.addEventListener("DOMContentLoaded", updateCartBadge);
})();
