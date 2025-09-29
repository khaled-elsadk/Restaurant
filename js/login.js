// js/auth.js
(function () {
  const STORAGE_KEY = "authUser";
  const LOGIN_BTN_SELECTOR = ".btn.btn-danger[href='login.html']"; // current login button in navbar
  const WELCOME_ID = "welcome-user";
  const LOGOUT_ID = "logout-btn";

  document.addEventListener("DOMContentLoaded", () => {
    renderAuthUI();
    // Sync across tabs/windows
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY) renderAuthUI();
    });

    // Wire up login form (only on login.html)
    const form = document.querySelector("main form");
    const signInBtn = form?.querySelector("button[type='button']");
    signInBtn?.addEventListener("click", onSignIn);
  });

  function onSignIn() {
    const form = document.querySelector("main form");
    if (!form) return;

    const role = form.querySelector("select")?.value?.trim() || "user";
    const usernameInput = form.querySelector("input[type='text']");
    const passwordInput = form.querySelector("input[type='password']");
    const username = usernameInput?.value?.trim();
    const password = passwordInput?.value?.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // Save auth info
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ username, role }));

    // Update UI immediately (no need to wait for navigation)
    renderAuthUI();

    // Optional: navigate away from login after a short tick (gives time to paint)
    setTimeout(() => {
      if (location.pathname.toLowerCase().includes("login")) {
        window.location.href = "index.html";
      }
    }, 100);
  }

  function renderAuthUI() {
    const user = getUser();
    const loginBtn = document.querySelector(LOGIN_BTN_SELECTOR);
    const container = loginBtn?.parentElement; // same wrapper that holds phone/cart/login

    // Ensure we only manipulate if navbar exists
    if (!container) return;

    const existingWelcome = document.getElementById(WELCOME_ID);
    const existingLogout = document.getElementById(LOGOUT_ID);

    if (user) {
      // Hide login button
      if (loginBtn) loginBtn.style.display = "none";

      // Create/Update welcome label
      if (!existingWelcome) {
        const span = document.createElement("span");
        span.id = WELCOME_ID;
        span.className = "fw-bold text-success";
        span.textContent = `Welcome, ${user.username}`;
        container.appendChild(span);
      } else {
        existingWelcome.textContent = `Welcome, ${user.username}`;
      }

      // Create logout button if missing
      if (!existingLogout) {
        const btn = document.createElement("button");
        btn.id = LOGOUT_ID;
        btn.type = "button";
        btn.className = "btn btn-outline-secondary";
        btn.innerHTML = `<i class="bi bi-box-arrow-right me-1"></i> Logout`;
        btn.addEventListener("click", onLogout);
        container.appendChild(btn);
      }
    } else {
      // Not logged in -> show login button, remove welcome & logout
      if (loginBtn) loginBtn.style.display = "";
      existingWelcome?.remove();
      existingLogout?.remove();
    }
  }

  function onLogout() {
    localStorage.removeItem(STORAGE_KEY);
    renderAuthUI();
    // If you want to force return to home after logout:
    // window.location.href = "index.html";
  }

  function getUser() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
    catch { return null; }
  }
})();
