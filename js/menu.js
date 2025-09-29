// js/menu.js
document.addEventListener("DOMContentLoaded", initMenuPage);

function qs(id) { return document.getElementById(id); }

async function initMenuPage() {
  const dd = qs("category");
  const grid = qs("menu-grid");
  if (!dd || !grid) return;

  dd.addEventListener("change", () => loadCategory(dd.value, grid));
  await loadCategory(dd.value || "Beef", grid);
}

async function loadCategory(category, grid) {
  grid.innerHTML = `<p>Loading ${category}...</p>`;
  try {
    const meals = await RestaurantAPI.fetchMealsByCategory(category);
    grid.className = "row g-4"; // Bootstrap grid row
    grid.innerHTML = meals.map(cardHTML).join("");
  } catch (e) {
    console.error(e);
    grid.innerHTML = `<p>Couldn't load menu.</p>`;
  }
}

function cardHTML(m) {
  return `
  <div class="col-md-4 col-lg-3">
    <div class="card h-100 shadow-sm">
      <img src="${m.image}" class="card-img-top" alt="${m.name}"
           style="height:200px; object-fit:cover;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${m.name}</h5>
        <p class="card-text text-muted">${m.price} EGP</p>
        <button class="btn btn-primary mt-auto"
          onclick="addToCart('${m.id}', '${m.name.replace(/'/g, "\\'")}', ${m.price}, '${m.image}')">
          Add to Cart
        </button>
      </div>
    </div>
  </div>`;
}
