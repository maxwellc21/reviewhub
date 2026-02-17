// assets/index.js
(function () {
  const { items } = window.ReviewHubData;
  const { getReviews, setReviews, resetDemoData } = window.ReviewHubStorage;
  const { $, toast } = window.ReviewHubUI;

  function escapeHTML(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function stars(n) {
    const full = "★".repeat(n);
    const empty = "☆".repeat(5 - n);
    return `${full}${empty}`;
  }

  function calcStats(reviews) {
    const per = items.map(it => {
      const rs = reviews.filter(r => r.itemId === it.id);
      const avg = rs.length ? (rs.reduce((s, r) => s + r.rating, 0) / rs.length) : 0;
      return { id: it.id, name: it.name, avg, count: rs.length };
    });
    return per.sort((a, b) => b.avg - a.avg);
  }

  function pickIcon(it) {
    if (it.category === "IT Services") return "🛠️";
    if (it.category === "Digital Services") return "📶";
    if (it.category === "Food & Beverage") return "☕";
    if (it.category === "Student Services") return "🧾";
    if (it.category === "Electronics") return "💾";
    return "⭐";
  }

  function fillCategoryFilter() {
    const cats = Array.from(new Set(items.map(i => i.category))).sort();
    const sel = $("#filterCategory");
    if (!sel) return;
    cats.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });
  }

  function fillReviewItemFilter() {
    const sel = $("#filterItemReviews");
    if (!sel) return;
    items.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = it.name;
      sel.appendChild(opt);
    });
  }

  function renderStatsTable(reviews) {
    const statsBody = $("#statsBody");
    const totalBadge = $("#totalReviewsBadge");
    if (!statsBody) return;

    const stats = calcStats(reviews).slice(0, 6);
    statsBody.innerHTML = "";
    stats.forEach(s => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${escapeHTML(s.name)}</td>
        <td>${s.count ? s.avg.toFixed(1) : "—"}</td>
        <td>${s.count}</td>
      `;
      statsBody.appendChild(tr);
    });

    if (totalBadge) totalBadge.textContent = `${reviews.length} review${reviews.length === 1 ? "" : "s"}`;
  }

  function renderItemGrid(reviews) {
    const grid = $("#itemGrid");
    if (!grid) return;

    const q = ($("#searchItems")?.value || "").trim().toLowerCase();
    const cat = $("#filterCategory")?.value || "all";

    const stats = calcStats(reviews);
    const byId = new Map(stats.map(s => [s.id, s]));

    const filtered = items.filter(it => {
      const matchesQ =
        !q ||
        it.name.toLowerCase().includes(q) ||
        it.desc.toLowerCase().includes(q) ||
        it.tags.some(t => t.toLowerCase().includes(q));
      const matchesCat = (cat === "all") ? true : it.category === cat;
      return matchesQ && matchesCat;
    });

    grid.innerHTML = "";

    filtered.forEach(it => {
      const s = byId.get(it.id) || { avg: 0, count: 0 };
      const el = document.createElement("div");
      el.className = "item";
      el.innerHTML = `
        <figure>
          <div>
            <div class="muted small">${escapeHTML(it.kind)} • ${escapeHTML(it.category)}</div>
            <h3>${escapeHTML(it.name)}</h3>
          </div>
          <div class="icon" aria-hidden="true"><span style="font-size:20px">${pickIcon(it)}</span></div>
        </figure>

        <p>${escapeHTML(it.desc)}</p>

        <div class="row">
          <span class="chip"><b>${escapeHTML(it.price)}</b></span>
          <span class="small">
            ${s.count ? `${escapeHTML(stars(Math.round(s.avg)))} (${s.avg.toFixed(1)})` : "No ratings yet"}
          </span>
        </div>

        <div class="row">
          <a class="btn small" href="index.html#reviews" data-view="${it.id}">🗒️ View reviews</a>
          <a class="btn small primary" href="write-review.html?item=${encodeURIComponent(it.id)}">✍️ Write review</a>
        </div>
      `;
      grid.appendChild(el);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="item">
          <h3>No matching items</h3>
          <p class="muted">Try another keyword or choose “All” categories.</p>
        </div>
      `;
    }

    grid.querySelectorAll("[data-view]").forEach(a => {
      a.addEventListener("click", () => {
        const id = a.getAttribute("data-view");
        const sel = $("#filterItemReviews");
        if (sel) sel.value = id;
        renderReviewsFeed(getReviews());
      });
    });
  }

  function renderReviewsFeed(reviews) {
    const feed = $("#reviewsFeed");
    const count = $("#feedCount");
    const filterId = $("#filterItemReviews")?.value || "all";
    if (!feed) return;

    const list = [...reviews]
      .sort((a, b) => b.createdAt - a.createdAt)
      .filter(r => filterId === "all" ? true : r.itemId === filterId);

    if (count) count.textContent = `${list.length} shown`;
    feed.innerHTML = "";

    if (list.length === 0) {
      feed.innerHTML = `<div class="review"><div class="muted">No reviews yet. Be the first to add one.</div></div>`;
      return;
    }

    list.forEach(r => {
      const it = items.find(x => x.id === r.itemId);
      const el = document.createElement("div");
      el.className = "review";

      const when = new Date(r.createdAt).toLocaleString();
      el.innerHTML = `
        <div class="meta">
          <span class="chip"><b>${escapeHTML(it ? it.name : "Unknown")}</b></span>
          <span class="chip">${escapeHTML(stars(r.rating))}</span>
          <span class="chip">${r.recommend === "yes" ? "✅ Recommend" : "⚠️ Not recommended"}</span>
          <span class="chip">By <b>${escapeHTML(r.user)}</b></span>
          <span class="chip"><time datetime="${new Date(r.createdAt).toISOString()}">${escapeHTML(when)}</time></span>
        </div>
        <div class="title">${escapeHTML(r.title)}</div>
        <p class="body">${escapeHTML(r.body)}</p>
      `;

      feed.appendChild(el);
    });
  }

  function bindEvents() {
    $("#searchItems")?.addEventListener("input", () => {
      const reviews = getReviews();
      renderItemGrid(reviews);
    });

    $("#filterCategory")?.addEventListener("change", () => {
      const reviews = getReviews();
      renderItemGrid(reviews);
    });

    $("#filterItemReviews")?.addEventListener("change", () => {
      renderReviewsFeed(getReviews());
    });

    $("#btnResetDemo")?.addEventListener("click", () => {
      if (!confirm("Reset demo data (users + reviews) in localStorage?")) return;
      resetDemoData();
      toast("Demo data reset.");
      init();
      window.ReviewHubUI.setHeaderAuthUI();
    });
  }

  function init() {
    const reviews = getReviews();
    fillCategoryFilter();
    fillReviewItemFilter();
    renderStatsTable(reviews);
    renderItemGrid(reviews);
    renderReviewsFeed(reviews);
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
