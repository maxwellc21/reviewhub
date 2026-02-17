<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="ReviewHub — view goods & services reviews. Login required to write reviews." />
  <meta name="keywords" content="reviews, goods, services, html forms, tables, semantic html" />
  <meta name="author" content="Maxie Cletus Tepaiyan" />
  <base href="./" />
  <title>ReviewHub • Home</title>

  <link rel="icon" href="assets/logo.svg" />
  <link rel="stylesheet" href="assets/styles.css" />

  <script defer src="assets/data.js"></script>
  <script defer src="assets/storage.js"></script>
  <script defer src="assets/ui.js"></script>
  <script defer src="assets/index.js"></script>
</head>

<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Go to homepage">
        <img src="assets/logo.svg" alt="ReviewHub logo" width="28" height="28" />
        <span>ReviewHub</span>
      </a>

      <nav class="site-nav" aria-label="Primary navigation">
        <a class="navlink" href="index.html#items">Goods &amp; Services</a>
        <a class="navlink" href="index.html#reviews">Reviews</a>
        <a class="navlink" href="about.html">About</a>
      </nav>

      <div class="header-actions">
        <div class="whoami" title="Login status">
          <span id="statusDot" class="dot"></span>
          <span class="small" id="whoText">Guest</span>
        </div>

        <button class="btn small" id="btnTheme" type="button">🌓 Theme</button>
        <a class="btn small primary" id="btnLogin" href="login.html">🔐 Login</a>
        <button class="btn small" id="btnLogout" type="button" hidden>🚪 Logout</button>
      </div>
    </div>
  </header>

  <main class="container" id="home">
    <section class="card hero" aria-label="Homepage review summary">
      <div>
        <h1>Read reviews — <span class="accent">log in</span> to write one.</h1>
        <p class="muted">
          Anyone can view items and reviews. Writing reviews is login-protected.
          Data is saved to <code>localStorage</code> for demo purposes.
        </p>

        <ul class="bullets">
          <li>Browse items and reviews (public).</li>
          <li>Login/register to submit a review.</li>
          <li>Works on GitHub + Replit as a static site.</li>
        </ul>

        <div class="cta">
          <a class="btn primary" href="#items">🔎 Browse items</a>
          <a class="btn" id="btnWriteHero" href="write-review.html">✍️ Write a review</a>
        </div>

        <div class="chips">
          <span class="chip"><b>Demo login:</b> <code>student</code> / <code>1234</code></span>
          <span class="chip"><b>Note:</b> Public viewing is open; writing is gated.</span>
        </div>
      </div>

      <aside class="card panel-pad" aria-label="Ratings snapshot">
        <div class="row">
          <h2 class="h2">Ratings snapshot</h2>
          <span class="badge" id="totalReviewsBadge">0 reviews</span>
        </div>

        <table aria-label="Item rating table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Avg</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody id="statsBody">
            <tr><td class="muted">Loading…</td><td class="muted">—</td><td class="muted">—</td></tr>
          </tbody>
        </table>

        <p class="small muted" style="margin-top:10px">
          Quick links:
          <a href="#reviews">Latest reviews</a> · <a href="about.html">How it works</a>
        </p>
      </aside>
    </section>

    <hr class="hr" />

    <section id="items" aria-label="Goods and services list">
      <div class="section-head">
        <h2 class="h2">Goods &amp; Services that need reviews</h2>
        <div class="filters">
          <div class="field">
            <span>Search</span>
            <input id="searchItems" type="search" placeholder="e.g., Wi-Fi, Laptop, Coffee" />
          </div>
          <div class="field">
            <span>Category</span>
            <select id="filterCategory">
              <option value="all">All</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid" id="itemGrid" aria-live="polite"></div>
    </section>

    <hr class="hr" />

    <section id="reviews" aria-label="Reviews section">
      <div class="section-head">
        <h2 class="h2">Latest reviews</h2>
        <div class="filters">
          <div class="field">
            <span>Show reviews for</span>
            <select id="filterItemReviews">
              <option value="all">All items</option>
            </select>
          </div>
          <button class="btn small" id="btnResetDemo" type="button">🧹 Reset demo data</button>
        </div>
      </div>

      <div class="two-col">
        <article class="card panel-pad" aria-label="Review feed">
          <div class="row">
            <div>
              <div class="muted small">Public feed</div>
              <div class="strong">What people are saying</div>
            </div>
            <span class="badge" id="feedCount">0 shown</span>
          </div>

          <hr class="hr" />

          <div id="reviewsFeed"></div>

          <hr class="hr" />

          <div class="small muted">
            <b>How reviews work:</b>
            <ol>
              <li>Choose an item.</li>
              <li>Rate 1–5 stars.</li>
              <li>Write details (good / improve).</li>
            </ol>
          </div>
        </article>

        <aside class="card panel-pad" aria-label="Write a review teaser">
          <div class="row">
            <div>
              <div class="muted small">Want to add your review?</div>
              <div class="strong">Login required</div>
            </div>
            <span class="badge" id="writeBadge">Locked</span>
          </div>

          <hr class="hr" />

          <div class="callout" id="writeLockedMsg">
            <strong>Locked:</strong> Please login to write a review.
          </div>

          <div class="callout ok" id="writeUnlockedMsg" hidden>
            <strong>Unlocked:</strong> You’re logged in — go write your review.
          </div>

          <div class="row" style="margin-top: 12px;">
            <a class="btn primary" href="write-review.html">✍️ Write a review</a>
            <a class="btn" href="login.html">🔐 Login</a>
          </div>
        </aside>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <p class="small">&copy; <span id="year"></span> ReviewHub — static multi-page demo.</p>
      <p class="small muted">Client-side demo auth (localStorage) — not real security.</p>
    </div>
  </footer>

  <div class="toast" id="toast" role="status" aria-live="polite"></div>
</body>
</html>
