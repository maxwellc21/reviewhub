// assets/auth.js
(function () {
  const { getUsers, setUsers, setSession, currentUser } = window.ReviewHubStorage;
  const { $, toast, getParam } = window.ReviewHubUI;

  function setTab(which) {
    const loginTab = $("#tabLogin");
    const regTab = $("#tabRegister");
    const loginForm = $("#loginForm");
    const regForm = $("#registerForm");

    const isLogin = which === "login";
    loginTab?.classList.toggle("active", isLogin);
    regTab?.classList.toggle("active", !isLogin);
    loginTab?.setAttribute("aria-selected", String(isLogin));
    regTab?.setAttribute("aria-selected", String(!isLogin));
    if (loginForm) loginForm.hidden = !isLogin;
    if (regForm) regForm.hidden = isLogin;
  }

  function goNext() {
    const next = getParam("next");
    if (next) {
      // only allow simple relative redirects
      window.location.href = next;
      return;
    }
    window.location.href = "index.html";
  }

  function bind() {
    $("#tabLogin")?.addEventListener("click", () => setTab("login"));
    $("#tabRegister")?.addEventListener("click", () => setTab("register"));

    $("#loginForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const username = f.username.value.trim();
      const password = f.password.value;

      const users = getUsers();
      const found = users.find(u => u.username === username && u.password === password);
      if (!found) {
        toast("Invalid username/password.");
        return;
      }
      setSession({ username: found.username });
      window.ReviewHubUI.setHeaderAuthUI();
      toast(`Welcome, ${found.fullname || found.username}!`);
      goNext();
    });

    $("#registerForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.currentTarget;

      const fullname = f.fullname.value.trim();
      const email = f.email.value.trim();
      const username = f.username.value.trim();
      const password = f.password.value;
      const role = f.role.value;

      if (!fullname || !email || !username || !password || !role) {
        toast("Please complete all fields.");
        return;
      }

      const users = getUsers();
      if (users.some(u => u.username === username)) {
        toast("That username is already taken.");
        return;
      }

      users.push({ fullname, email, username, password, role });
      setUsers(users);
      setSession({ username });

      window.ReviewHubUI.setHeaderAuthUI();
      toast("Account created ✅");
      goNext();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    // If already logged in, you can still stay, but we can show a message
    if (currentUser()) {
      toast("You’re already logged in.");
    }
    bind();
  });
})();
