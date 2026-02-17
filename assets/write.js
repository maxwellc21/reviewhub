// assets/write.js
(function () {
  const { items } = window.ReviewHubData;
  const { currentUser, getReviews, setReviews } = window.ReviewHubStorage;
  const { $, toast, getParam } = window.ReviewHubUI;

  function stars(n) {
    const full = "★".repeat(n);
    const empty = "☆".repeat(5 - n);
    return `${full}${empty}`;
  }

  function getChecked(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(x => x.value);
  }

  function fillItemSelect() {
    const sel = $("#reviewItemSelect");
    if (!sel) return;
    items.forEach(it => {
      const opt = document.createElement("option");
      opt.value = it.id;
      opt.textContent = `${it.name} (${it.kind})`;
      sel.appendChild(opt);
    });
  }

  function requireLoginOrRedirect() {
    const user = currentUser();
    const locked = $("#lockedBox");
    const form = $("#reviewForm");
    const goLogin = $("#goLogin");

    if (!user) {
      if (locked) locked.hidden = false;
      if (form) form.hidden = true;

      // preserve next destination (including query string)
      const nextUrl = "write-review.html" + window.location.search;
      if (goLogin) goLogin.href = `login.html?next=${encodeURIComponent(nextUrl)}`;
      return false;
    }

    if (locked) locked.hidden = true;
    if (form) form.hidden = false;
    return true;
  }

  function preselectItemFromQuery() {
    const itemId = getParam("item");
    const sel = $("#reviewItemSelect");
    if (itemId && sel) sel.value = itemId;
  }

  function bindForm() {
    const ratingRange = $("#ratingRange");
    const ratingOut = $("#ratingOut");

    ratingRange?.addEventListener("input", () => {
      if (ratingOut) ratingOut.textContent = ratingRange.value;
    });

    $("#btnPreview")?.addEventListener("click", () => {
      const f = $("#reviewForm");
      if (!f) return;

      const it = items.find(x => x.id === f.itemId.value);
      const title = f.title.value.trim();
      const rating = Number(f.rating.value || 1);
      const body = f.body.value.trim();
      const recommend = f.recommend.value;
      const aspects = getChecked("aspects");

      const text = [
        `Item: ${it ? it.name : "(none)"}`,
        `Title: ${title || "(none)"}`,
        `Rating: ${stars(Math.max(1, Math.min(5, rating)))}`,
        `Recommend: ${recommend}`,
        `Aspects: ${aspects.length ? aspects.join(", ") : "(none)"}`,
        `Body: ${body || "(none)"}`
      ].join("\n");

      $("#previewText").textContent = text;
      $("#previewBox").style.display = "block";
    });

    $("#reviewForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = currentUser();
      if (!user) {
        toast("Login required.");
        return;
      }

      const f = e.currentTarget;

      const itemId = f.itemId.value;
      const title = f.title.value.trim();
      const rating = Number(f.rating.value);
      const body = f.body.value.trim();
      const recommend = f.recommend.value;
      const aspects = getChecked("aspects");
      const termsOk = f.terms.checked;

      if (!itemId || !title || !body || !termsOk) {
        toast("Please complete required fields and accept the checkbox.");
        return;
      }
      if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        toast("Rating must be between 1 and 5.");
        return;
      }

      const reviews = getReviews();
      reviews.push({
        id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + "_r"),
        itemId,
        user: user.username,
        rating,
        title,
        body,
        recommend,
        aspects,
        createdAt: Date.now()
      });

      setReviews(reviews);

      f.reset();
      $("#ratingRange").value = "4";
      $("#ratingOut").textContent = "4";
      $("#previewBox").style.display = "none";

      toast("Review submitted ✅");
      // send them back to home reviews section
      window.location.href = "index.html#reviews";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    fillItemSelect();
    preselectItemFromQuery();
    const ok = requireLoginOrRedirect();
    if (ok) bindForm();
  });
})();
