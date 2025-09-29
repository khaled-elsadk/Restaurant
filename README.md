# 🍽️ Restaurant Website

A simple responsive **restaurant website** built with **HTML, Bootstrap 5, and JavaScript**.  
It allows users to browse featured meals, explore the full menu (fetched dynamically from TheMealDB API), and add items to a shopping cart saved in **localStorage**.  

🔗 **Live Demo**: [Restaurant Website](https://khaled-elsadk.github.io/Restaurant/menu.html)

---

## 🚀 Features
- **Home Page**
  - Hero section with welcome message and image.
  - Shows featured meals (4 items) with an option to explore more.
- **Menu Page**
  - Fetches meals dynamically from [TheMealDB API](https://www.themealdb.com/).
  - Displays meals as responsive Bootstrap cards.
  - Each card includes image, title, price, and "Add to Cart" button.
- **Cart Page**
  - Displays selected items from localStorage.
  - Allows quantity updates and item removal.
  - Calculates total price in real-time.
- **Login Page**
  - Demo login system with roles (`admin` / `user`).
  - Saves user session in localStorage.
  - Updates navbar to show "Welcome, [username]" instead of login button.

---

## 🛠️ Tech Stack
- **HTML5** — structure  
- **Bootstrap 5** — styling and responsive layout  
- **Bootstrap Icons** — icons (cart, phone, login, etc.)  
- **JavaScript (ES6)** — dynamic functionality & localStorage  
- **TheMealDB API** — for meal data  

---

## 📂 Project Structure

│── index.html # Home page
│── menu.html # Menu page
│── cart.html # Cart page
│── login.html # Login page
│── contact.html # Contact page
│
├── js/
│ ├── api.js # API functions (fetch meals)
│ ├── home.js # Featured meals on homepage
│ ├── menu.js # Load menu dynamically
│ ├── cart.js # Cart logic (add/remove/update)
│ └── cart-page.js # Cart page rendering
│
└── README.md
👨‍💻 Developed by Khaled Elsadk
