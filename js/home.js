// js/home.js
document.addEventListener("DOMContentLoaded", async () => {
  const box = document.getElementById("featured-container");
  if (!box) return;
  box.innerHTML = `<p>Loading...</p>`;
  try {
    const meals = await RestaurantAPI.getFeatured(4, "Chicken"); // 4 featured
    box.className = "row g-4"; // Bootstrap grid
    // render 4 product cards + the explore-more tile
    box.innerHTML = meals.map(cardHTML).join("") + exploreMoreHTML();
  } catch (e) {
    console.error(e);
    box.innerHTML = `<p>Failed to load featured items.</p>`;
  }
});

function cardHTML(m) {
  return `
  <div class="col-12 col-sm-6 col-lg-3">
    <div class="card h-100 shadow-sm">
      <img src="${m.image}" class="card-img-top" alt="${m.name}"
           style="height:200px; object-fit:cover;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${m.name}</h5>
        <p class="card-text text-muted mb-3">${m.price} EGP</p>
        <button class="btn btn-primary mt-auto"
          onclick="addToCart('${m.id}', '${m.name.replace(/'/g, "\\'")}', ${m.price}, '${m.image}')">
          Add to Cart
        </button>
      </div>
    </div>
  </div>`;
}

// “Explore more” tile that links to the full menu
function exploreMoreHTML() {
  return `
  <div class="col-12">
    <div class="d-flex justify-content-center">
      <a href="menu.html" class="btn btn-outline-dark px-4 py-2">
        Explore more <i class="bi bi-arrow-right ms-1"></i>
      </a>
    </div>
  </div>`;
}
