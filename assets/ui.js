// assets/ui.js
(function () {
  const $ = (sel) => document.querySelector(sel);

  function toast(msg) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    window.ReviewHubStorage.setTheme(theme);
  }

  function initThemeButton() {
    const btn = $("#btnTheme");
    if (!btn) return;
    applyTheme(window.ReviewHubStorage.getTheme());
    btn.addEventListener("click", () => {
      const cur = document.body.getAttribute("data-theme") || "dark";
      applyTheme(cur === "dark" ? "light" : "dark");
    });
  }

  function setHeaderAuthUI() {
    const user = window.ReviewHubStorage.currentUser();

    const dot = $("#statusDot");
    const who = $("#whoText");
    const btnLogin = $("#btnLogin");
    const btnLogout = $("#btnLogout");

    if (dot) dot.classList.toggle("ok", !!user);
    if (who) who.textContent = user ? (user.fullname || user.username) : "Guest";

    if (btnLogin) btnLogin.hidden = !!user;
    if (btnLogout) btnLogout.hidden = !user;

    if (btnLogout) {
      btnLogout.onclick = () => {
        window.ReviewHubStorage.setSession({ username: null });
        setHeaderAuthUI();
        toast("Logged out.");
      };
    }

    // Home page: show locked/unlocked teaser
    const lockedMsg = $("#writeLockedMsg");
    const unlockedMsg = $("#writeUnlockedMsg");
    const badge = $("#writeBadge");
    if (badge) badge.textContent = user ? "Unlocked" : "Locked";
    if (lockedMsg) lockedMsg.hidden = !!user;
    if (unlockedMsg) unlockedMsg.hidden = !user;

    const year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function getParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function setParam(name, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", url.toString());
  }

  window.ReviewHubUI = { $, toast, initThemeButton, setHeaderAuthUI, getParam, setParam, applyTheme };

  document.addEventListener("DOMContentLoaded", () => {
    initThemeButton();
    setHeaderAuthUI();
  });
})();
