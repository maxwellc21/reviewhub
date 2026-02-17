// assets/storage.js
(function () {
  const LS_USERS = "reviewhub_users_v1";
  const LS_SESSION = "reviewhub_session_v1";
  const LS_REVIEWS = "reviewhub_reviews_v1";
  const LS_THEME = "reviewhub_theme_v1";

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function ensureSeed() {
    const { seedUsers, seedReviews } = window.ReviewHubData;

    let users = loadJSON(LS_USERS, null);
    if (!Array.isArray(users) || users.length === 0) {
      users = seedUsers;
      saveJSON(LS_USERS, users);
    }

    let session = loadJSON(LS_SESSION, { username: null });
    if (!session || typeof session !== "object") {
      session = { username: null };
      saveJSON(LS_SESSION, session);
    }

    let reviews = loadJSON(LS_REVIEWS, null);
    if (!Array.isArray(reviews) || reviews.length === 0) {
      reviews = seedReviews;
      saveJSON(LS_REVIEWS, reviews);
    }
  }

  function getUsers() {
    return loadJSON(LS_USERS, []);
  }

  function setUsers(users) {
    saveJSON(LS_USERS, users);
  }

  function getSession() {
    return loadJSON(LS_SESSION, { username: null });
  }

  function setSession(session) {
    saveJSON(LS_SESSION, session);
  }

  function getReviews() {
    return loadJSON(LS_REVIEWS, []);
  }

  function setReviews(reviews) {
    saveJSON(LS_REVIEWS, reviews);
  }

  function getTheme() {
    const t = loadJSON(LS_THEME, { theme: "dark" });
    return t && (t.theme === "light" || t.theme === "dark") ? t.theme : "dark";
  }

  function setTheme(theme) {
    saveJSON(LS_THEME, { theme });
  }

  function currentUser() {
    const session = getSession();
    if (!session || !session.username) return null;
    const users = getUsers();
    return users.find(u => u.username === session.username) || null;
  }

  function resetDemoData() {
    localStorage.removeItem(LS_USERS);
    localStorage.removeItem(LS_SESSION);
    localStorage.removeItem(LS_REVIEWS);
    ensureSeed();
  }

  ensureSeed();

  window.ReviewHubStorage = {
    loadJSON, saveJSON,
    getUsers, setUsers,
    getSession, setSession,
    getReviews, setReviews,
    getTheme, setTheme,
    currentUser,
    resetDemoData
  };
})();
