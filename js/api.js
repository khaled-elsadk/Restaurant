// js/api.js
(function () {
  const API = "https://www.themealdb.com/api/json/v1/1";

  // سعر ثابت بناءً على id (مش عشوائي علشان مايتغيرش كل Reload)
  function priceFromId(id) {
    const base = parseInt(id, 10) || 1000;
    return 80 + (base % 141); // 80..220
  }

  async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network error");
    return res.json();
  }

  async function fetchMealsByCategory(category = "Chicken") {
    const url = `${API}/filter.php?c=${encodeURIComponent(category)}`;
    const data = await fetchJSON(url);
    const meals = data.meals || [];
    return meals.map(m => ({
      id: m.idMeal,
      name: m.strMeal,
      image: m.strMealThumb,
      category,
      price: priceFromId(m.idMeal)
    }));
  }

  async function fetchMealDetails(id) {
    const url = `${API}/lookup.php?i=${encodeURIComponent(id)}`;
    const data = await fetchJSON(url);
    return (data.meals || [])[0] || null;
  }

  async function getFeatured(count = 5, category = "Chicken") {
    const all = await fetchMealsByCategory(category);
    return all.slice(0, count);
  }

  window.RestaurantAPI = {
    fetchMealsByCategory,
    fetchMealDetails,
    getFeatured
  };
})();
