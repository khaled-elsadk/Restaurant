// js/cart-page.js
document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const tbody = document.getElementById("cart-body");
  const totalEl = document.getElementById("cart-total");
  if (!tbody || !totalEl) return;

  const items = Cart.get();
  if (!items.length) {
    tbody.innerHTML = `<tr><td colspan="6">Cart is empty</td></tr>`;
    totalEl.textContent = "0";
    return;
  }

  tbody.innerHTML = items.map(rowHTML).join("");
  totalEl.textContent = Cart.total();
}

function rowHTML(it, i) {
  return `
  <tr data-id="${it.id}">
    <td>${i + 1}</td>
    <td class="cart-name">
      <img src="${it.image}" alt="${it.name}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;margin-right:8px;">
      ${it.name}
    </td>
    <td>${it.price}</td>
    <td>
      <input type="number" min="1" value="${it.qty}" class="qty-input" style="width:70px">
    </td>
    <td class="row-total">${it.price * it.qty}</td>
    <td><button class="btn btn-danger btn-sm remove-btn">Remove</button></td>
  </tr>`;
}

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("qty-input")) {
    const tr = e.target.closest("tr");
    const id = tr.dataset.id;
    const qty = e.target.value;
    Cart.updateQty(id, qty);
    tr.querySelector(".row-total").textContent = (Cart.get().find(x=>x.id===id).price * (parseInt(qty,10)||1));
    document.getElementById("cart-total").textContent = Cart.total();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const tr = e.target.closest("tr");
    const id = tr.dataset.id;
    Cart.remove(id);
    tr.remove();
    document.getElementById("cart-total").textContent = Cart.total();
    const tbody = document.getElementById("cart-body");
    if (!tbody.children.length) {
      tbody.innerHTML = `<tr><td colspan="6">Cart is empty</td></tr>`;
    }
  }
});
