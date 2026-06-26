// script.js — lazylab 홈 렌더링 + 입력→상품 흐름 (한/영 지원, 키 없이 작동)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const T = window.t || ((ko) => ko);
const EN = () => window.LANG === "en";
const won = (n) => (EN() ? "KRW " + n.toLocaleString("en-US") : n.toLocaleString("ko-KR") + "원");
const members = (n) => (EN() ? n.toLocaleString("en-US") + " enrolled" : n.toLocaleString("ko-KR") + "명");
const lp = (p) => (window.LP ? window.LP(p) : p);
const lmeta = (id) => (window.LMETA ? window.LMETA(id) : PRODUCT_META[id] || {});
const byId = (id) => [...PRODUCTS, DEFAULT_PRODUCT].find((p) => p.id === id);

const confess = $("#confess");
const hint = $("#hint");
const result = $("#result");

/* ---------- 입력 → 결과 ---------- */
function runSearch(text) {
  const tx = (text || "").trim();
  if (!tx) { hint.hidden = false; confess.focus(); return; }
  hint.hidden = true;
  const matcher = window.matchProductL || matchProduct;
  renderResult(matcher(tx));
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}
$("#big-search").addEventListener("submit", (e) => { e.preventDefault(); runSearch(confess.value); });
window.runSearch = runSearch;

function showProduct(p) { renderResult(p); result.scrollIntoView({ behavior: "smooth", block: "start" }); }

(function () {
  const q = new URLSearchParams(location.search).get("q");
  if (q) { confess.value = q; runSearch(q); }
})();

/* ---------- 결과 카드 ---------- */
function renderResult(p0) {
  const p = lp(p0);
  const meta = lmeta(p0.id);
  const coverage = p.coverage.map((c) => `<li>${c}</li>`).join("");
  const perks = p.perks.map((k) => `<span class="perk">${k}</span>`).join("");
  const levers = p.profit.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join("");

  result.innerHTML = `
    <article class="detail">
      <div class="detail-head">
        <div class="detail-emoji">${p0.emoji}</div>
        <div>
          <span class="detail-tag">${meta.tag || ""}</span>
          <h3>${p.name}</h3>
          <p class="detail-tagline">${p.tagline}</p>
        </div>
      </div>
      <div class="price-row">
        <div class="price-box"><span>${T("월 보험료", "Monthly premium")}</span><b>${won(p0.premium)}</b></div>
        <div class="price-box"><span>${T("환급 디포짓", "Refundable deposit")}</span><b>${won(p0.deposit)}</b></div>
        <div class="price-box"><span>${T("가입자", "Members")}</span><b>${members(meta.members || 1000)}</b></div>
      </div>
      <h4 class="d-sec">${T("보장 내용", "Coverage")}</h4>
      <ul class="coverage">${coverage}</ul>
      <div class="refund">🎁 ${p.refund}</div>
      <p class="consolation">😌 ${p.consolation}</p>
      <div class="perks">${perks}</div>
      <div class="detail-actions">
        <button class="btn-primary signup-btn" type="button">${T("가입하기", "Enroll")}</button>
        <button class="btn-ghost detail-more" type="button">${T("상품 상세", "Details")} ›</button>
        <button class="btn-ghost egg-toggle" type="button" aria-expanded="false">🤫 ${T("수익구조", "Profit model")}</button>
      </div>
      <div class="egg" hidden>
        <ul class="levers">${levers}</ul>
        <p class="punch">"${p.punch}"</p>
      </div>
    </article>`;

  $(".signup-btn", result).addEventListener("click", () => { location.href = "checkout.html?id=" + p0.id; });
  $(".detail-more", result).addEventListener("click", () => { location.href = "product.html?id=" + p0.id; });
  const egg = $(".egg", result), toggle = $(".egg-toggle", result);
  toggle.addEventListener("click", () => {
    const open = egg.hidden; egg.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open)); toggle.classList.toggle("open", open);
  });
}

/* ---------- 단축 아이콘 ---------- */
$("#shortcut-row").innerHTML = SHORTCUTS.map((s, i) => {
  const label = EN() && window.EN_SHORTCUTS ? (window.EN_SHORTCUTS[s.label] || s.label) : s.label;
  return `<button class="shortcut" data-i="${i}"><span>${s.ico}</span>${label}</button>`;
}).join("");
$("#shortcut-row").addEventListener("click", (e) => {
  const b = e.target.closest(".shortcut"); if (!b) return;
  const s = SHORTCUTS[b.dataset.i];
  if (s.fill) {
    const fill = EN() && window.EN_SHORTCUT_FILL ? (window.EN_SHORTCUT_FILL[s.fill] || s.fill) : s.fill;
    confess.value = fill; runSearch(fill);
  } else if (s.target) $(s.target).scrollIntoView({ behavior: "smooth" });
});

/* ---------- 칩 ---------- */
const CHIPS_KO = [
  ["😴 늦잠", "아침에 자주 늦잠을 잔다"], ["📝 미루기", "할 일을 자꾸 내일로 미룬다"],
  ["🏋️ 운동", "헬스장 등록만 하고 안 간다"], ["💸 텅장", "월급 받으면 충동구매로 텅장이 된다"],
  ["🍗 야식", "새벽마다 야식을 시켜 먹는다"], ["🧹 정리", "방 정리를 계속 미룬다"],
  ["📚 공부", "인강 결제만 하고 안 듣는다"], ["💬 연락", "카톡 답장을 자꾸 미룬다"],
];
const CHIPS = EN() && window.EN_CHIPS ? window.EN_CHIPS : CHIPS_KO;
$("#chips").innerHTML = CHIPS.map(([l, f]) => `<button class="chip" data-fill="${f}">${l}</button>`).join("");
$("#chips").addEventListener("click", (e) => {
  const c = e.target.closest(".chip"); if (!c) return;
  confess.value = c.dataset.fill; hint.hidden = true; confess.focus();
});

/* ---------- 분야 그리드 ---------- */
$("#cat-grid").innerHTML = PRODUCTS.map(
  (p) => `<button class="cat-item" data-id="${p.id}"><span class="cat-ico">${p.emoji}</span><span class="cat-label">${lmeta(p.id).tag || lp(p).name}</span></button>`
).join("") + `<button class="cat-item" data-id="all"><span class="cat-ico">🛡️</span><span class="cat-label">${T("전체보기", "View all")}</span></button>`;
$("#cat-grid").addEventListener("click", (e) => {
  const b = e.target.closest(".cat-item");
  if (b) location.href = "product.html?id=" + b.dataset.id;
});

/* ---------- 보험료대 ---------- */
$("#band-grid").innerHTML = PRICE_BANDS.map(
  (b, i) => `<button class="band-item${b.ids ? "" : " all"}" data-i="${i}">${EN() && window.EN_BANDS ? window.EN_BANDS[i] : b.label}</button>`
).join("");
$("#band-grid").addEventListener("click", (e) => {
  const b = e.target.closest(".band-item"); if (!b) return;
  renderProducts(PRICE_BANDS[b.dataset.i].ids);
  $$(".band-item").forEach((x) => x.classList.remove("sel"));
  b.classList.add("sel");
  $("#products").scrollIntoView({ behavior: "smooth" });
});

/* ---------- 인기 상품 탭 + 카드 ---------- */
const TABS = [["hot", T("🔥 인기", "🔥 Popular")], ["all", T("전체", "All")], ["cheap", T("저렴한 순", "Cheapest")]];
$("#tabs").innerHTML = TABS.map(([k, l], i) => `<button class="tab${i === 0 ? " sel" : ""}" data-k="${k}">${l}</button>`).join("");
$("#tabs").addEventListener("click", (e) => {
  const t = e.target.closest(".tab"); if (!t) return;
  $$(".tab").forEach((x) => x.classList.remove("sel"));
  t.classList.add("sel");
  renderProducts(null, t.dataset.k);
});

function renderProducts(ids, sort) {
  let list = PRODUCTS.slice();
  if (ids) list = list.filter((p) => ids.includes(p.id));
  if (sort === "hot") list = PRODUCTS.filter((p) => (PRODUCT_META[p.id] || {}).hot);
  if (sort === "cheap") list = list.sort((a, b) => a.premium - b.premium);
  $("#product-grid").innerHTML = list.map((p0) => {
    const p = lp(p0), m = lmeta(p0.id);
    return `<div class="pcard">
      <div class="pcard-top">
        <span class="pcard-emoji">${p0.emoji}</span>
        <div>
          <div class="pcard-name">${p.name}${m.hot ? '<span class="hot">HOT</span>' : ""}</div>
          <div class="pcard-firm">${T("게으름연구소", "Institute of Laziness")} · ${members(m.members || 1000)}</div>
        </div>
      </div>
      <span class="pcard-chip">${m.tag || ""}</span>
      <p class="pcard-tag">${p.tagline}</p>
      <div class="pcard-slots">
        <span class="slot">${T("월", "")} ${won(p0.premium)}</span>
        <span class="slot">${T("디포짓", "Deposit")} ${won(p0.deposit)}</span>
      </div>
      <div class="pcard-btns">
        <button class="btn-primary sm" data-id="${p0.id}" data-act="join">${T("가입하기", "Enroll")}</button>
        <button class="btn-ghost sm" data-id="${p0.id}" data-act="detail">${T("상세보기", "Details")}</button>
      </div>
    </div>`;
  }).join("");
}
$("#product-grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  location.href = (b.dataset.act === "join" ? "checkout.html?id=" : "product.html?id=") + b.dataset.id;
});
renderProducts(null, "hot");

/* ---------- 성공 사례 ---------- */
const CASES = EN() && window.EN_CASES ? window.EN_CASES : SUCCESS_CASES;
$("#case-grid").innerHTML = CASES.map(
  (c, i) => `<a class="ccard" href="case.html?id=${i}">
    <div class="ccard-head"><span class="ccard-emoji">${SUCCESS_CASES[i].emoji}</span><b>${c.name}</b></div>
    <h5>${c.title}</h5><p>${c.desc}</p>
    <span class="result-badge">⚖️ ${c.badge}</span>
  </a>`
).join("");

/* ---------- 후기 ---------- */
const RV = EN() && window.EN_REVIEWS ? window.EN_REVIEWS : REVIEWS;
$("#review-grid").innerHTML = RV.map(
  (r) => `<div class="rcard"><span class="quote">“</span><p>${r.text}</p><b>${r.who}</b></div>`
).join("");

/* ---------- 뉴스 ---------- */
(function () {
  const AR = EN() && window.EN_ARTICLES ? window.EN_ARTICLES : ARTICLES;
  const idx = ARTICLES.map((a, i) => ({ i, hot: a.hot, title: AR[i].title }));
  const hot = idx.filter((x) => x.hot), fresh = idx.filter((x) => !x.hot);
  $("#news-cols").innerHTML = `
    <div class="news-col"><h4>${T("실시간 인기 뉴스", "Trending")}</h4>${hot.map((x, r) => `<a class="news-item" href="article.html?id=${x.i}"><span class="rank">${r + 1}</span>${x.title}</a>`).join("")}</div>
    <div class="news-col"><h4>${T("최신 뉴스", "Latest")}</h4>${fresh.map((x) => `<a class="news-item dot" href="article.html?id=${x.i}">${x.title}</a>`).join("")}</div>`;
})();
