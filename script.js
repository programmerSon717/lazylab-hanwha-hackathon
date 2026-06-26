// script.js — lazylab 플랫폼 렌더링 + 입력→상품 흐름 (키 없이 작동)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const won = (n) => n.toLocaleString("ko-KR") + "원";
const byId = (id) => [...PRODUCTS, DEFAULT_PRODUCT].find((p) => p.id === id);

const confess = $("#confess");
const hint = $("#hint");
const result = $("#result");

/* ---------- 입력 → 결과 ---------- */
function runSearch(text) {
  const t = (text || "").trim();
  if (!t) {
    hint.hidden = false;
    confess.focus();
    return;
  }
  hint.hidden = true;
  renderResult(matchProduct(t));
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

$("#big-search").addEventListener("submit", (e) => {
  e.preventDefault();
  runSearch(confess.value);
});
window.runSearch = runSearch; // layout.js의 네비 검색에서 호출

function showProduct(p) {
  renderResult(p);
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 네비/외부에서 ?q=... 로 들어오면 자동 검색
(function () {
  const q = new URLSearchParams(location.search).get("q");
  if (q) { confess.value = q; runSearch(q); }
})();

/* ---------- 결과 카드 (상품 상세) ---------- */
function renderResult(p) {
  const meta = PRODUCT_META[p.id] || {};
  const coverage = p.coverage.map((c) => `<li>${c}</li>`).join("");
  const perks = p.perks.map((k) => `<span class="perk">${k}</span>`).join("");
  const levers = p.profit
    .map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`)
    .join("");

  result.innerHTML = `
    <article class="detail">
      <div class="detail-head">
        <div class="detail-emoji">${p.emoji}</div>
        <div>
          <span class="detail-tag">${meta.tag || "게으름"}</span>
          <h3>${p.name}</h3>
          <p class="detail-tagline">${p.tagline}</p>
        </div>
      </div>

      <div class="price-row">
        <div class="price-box"><span>월 보험료</span><b>${won(p.premium)}</b></div>
        <div class="price-box"><span>환급 디포짓</span><b>${won(p.deposit)}</b></div>
        <div class="price-box"><span>가입자</span><b>${(meta.members || 1000).toLocaleString("ko-KR")}명</b></div>
      </div>

      <h4 class="d-sec">보장 내용</h4>
      <ul class="coverage">${coverage}</ul>
      <div class="refund">🎁 ${p.refund}</div>
      <p class="consolation">😌 ${p.consolation}</p>
      <div class="perks">${perks}</div>

      <div class="detail-actions">
        <button class="btn-primary signup-btn" type="button">가입하기</button>
        <button class="btn-ghost detail-more" type="button">상품 상세 ›</button>
        <button class="btn-ghost egg-toggle" type="button" aria-expanded="false">🤫 수익구조</button>
      </div>

      <div class="egg" hidden>
        <ul class="levers">${levers}</ul>
        <p class="punch">"${p.punch}"</p>
      </div>
    </article>`;

  $(".signup-btn", result).addEventListener("click", () => {
    location.href = "checkout.html?id=" + p.id;
  });
  $(".detail-more", result).addEventListener("click", () => {
    location.href = "product.html?id=" + p.id;
  });

  const egg = $(".egg", result);
  const toggle = $(".egg-toggle", result);
  toggle.addEventListener("click", () => {
    const open = egg.hidden;
    egg.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.classList.toggle("open", open);
  });
}

/* ---------- 단축 아이콘 ---------- */
$("#shortcut-row").innerHTML = SHORTCUTS.map(
  (s, i) => `<button class="shortcut" data-i="${i}"><span>${s.ico}</span>${s.label}</button>`
).join("");
$("#shortcut-row").addEventListener("click", (e) => {
  const b = e.target.closest(".shortcut");
  if (!b) return;
  const s = SHORTCUTS[b.dataset.i];
  if (s.fill) { confess.value = s.fill; runSearch(s.fill); }
  else if (s.target) $(s.target).scrollIntoView({ behavior: "smooth" });
});

/* ---------- 칩 ---------- */
const CHIPS = [
  ["😴 늦잠", "아침에 자주 늦잠을 잔다"],
  ["📝 미루기", "할 일을 자꾸 내일로 미룬다"],
  ["🏋️ 운동", "헬스장 등록만 하고 안 간다"],
  ["💸 텅장", "월급 받으면 충동구매로 텅장이 된다"],
  ["🍗 야식", "새벽마다 야식을 시켜 먹는다"],
  ["🧹 정리", "방 정리를 계속 미룬다"],
  ["📚 공부", "인강 결제만 하고 안 듣는다"],
  ["💬 연락", "카톡 답장을 자꾸 미룬다"],
];
$("#chips").innerHTML = CHIPS.map(([l, f]) => `<button class="chip" data-fill="${f}">${l}</button>`).join("");
$("#chips").addEventListener("click", (e) => {
  const c = e.target.closest(".chip");
  if (!c) return;
  confess.value = c.dataset.fill;
  hint.hidden = true;
  confess.focus();
});

/* ---------- 분야(리스크) 그리드 ---------- */
$("#cat-grid").innerHTML = PRODUCTS.map(
  (p) => `<button class="cat-item" data-id="${p.id}">
    <span class="cat-ico">${p.emoji}</span>
    <span class="cat-label">${(PRODUCT_META[p.id] || {}).tag || p.name}</span>
  </button>`
).join("") + `<button class="cat-item" data-id="all"><span class="cat-ico">🛡️</span><span class="cat-label">전체보기</span></button>`;
$("#cat-grid").addEventListener("click", (e) => {
  const b = e.target.closest(".cat-item");
  if (b) location.href = "product.html?id=" + b.dataset.id;
});

/* ---------- 보험료대 ---------- */
$("#band-grid").innerHTML = PRICE_BANDS.map(
  (b, i) => `<button class="band-item${b.ids ? "" : " all"}" data-i="${i}">${b.label}</button>`
).join("");
$("#band-grid").addEventListener("click", (e) => {
  const b = e.target.closest(".band-item");
  if (!b) return;
  const band = PRICE_BANDS[b.dataset.i];
  renderProducts(band.ids);
  $$(".band-item").forEach((x) => x.classList.remove("sel"));
  b.classList.add("sel");
  $("#products").scrollIntoView({ behavior: "smooth" });
});

/* ---------- 인기 상품 탭 + 카드 ---------- */
const TABS = [["hot", "🔥 인기"], ["all", "전체"], ["cheap", "저렴한 순"]];
$("#tabs").innerHTML = TABS.map(
  ([k, l], i) => `<button class="tab${i === 0 ? " sel" : ""}" data-k="${k}">${l}</button>`
).join("");
$("#tabs").addEventListener("click", (e) => {
  const t = e.target.closest(".tab");
  if (!t) return;
  $$(".tab").forEach((x) => x.classList.remove("sel"));
  t.classList.add("sel");
  renderProducts(null, t.dataset.k);
});

function renderProducts(ids, sort) {
  let list = PRODUCTS.slice();
  if (ids) list = list.filter((p) => ids.includes(p.id));
  if (sort === "hot") list = PRODUCTS.filter((p) => (PRODUCT_META[p.id] || {}).hot);
  if (sort === "cheap") list = list.sort((a, b) => a.premium - b.premium);
  $("#product-grid").innerHTML = list
    .map((p) => {
      const m = PRODUCT_META[p.id] || {};
      return `<div class="pcard">
        <div class="pcard-top">
          <span class="pcard-emoji">${p.emoji}</span>
          <div>
            <div class="pcard-name">${p.name}${m.hot ? '<span class="hot">HOT</span>' : ""}</div>
            <div class="pcard-firm">게으름연구소 · 가입자 ${(m.members || 1000).toLocaleString("ko-KR")}명</div>
          </div>
        </div>
        <span class="pcard-chip">${m.tag || "게으름"}</span>
        <p class="pcard-tag">${p.tagline}</p>
        <div class="pcard-slots">
          <span class="slot">월 ${won(p.premium)}</span>
          <span class="slot">디포짓 ${won(p.deposit)}</span>
        </div>
        <div class="pcard-btns">
          <button class="btn-primary sm" data-id="${p.id}" data-act="join">가입하기</button>
          <button class="btn-ghost sm" data-id="${p.id}" data-act="detail">상세보기</button>
        </div>
      </div>`;
    })
    .join("");
}
$("#product-grid").addEventListener("click", (e) => {
  const b = e.target.closest("[data-act]");
  if (!b) return;
  location.href = (b.dataset.act === "join" ? "checkout.html?id=" : "product.html?id=") + b.dataset.id;
});
renderProducts(null, "hot");

/* ---------- 성공 사례 ---------- */
$("#case-grid").innerHTML = SUCCESS_CASES.map(
  (c, i) => `<a class="ccard" href="case.html?id=${i}">
    <div class="ccard-head"><span class="ccard-emoji">${c.emoji}</span><b>${c.name}</b></div>
    <h5>${c.title}</h5>
    <p>${c.desc}</p>
    <span class="result-badge">⚖️ ${c.badge}</span>
  </a>`
).join("");

/* ---------- 후기 ---------- */
$("#review-grid").innerHTML = REVIEWS.map(
  (r) => `<div class="rcard"><span class="quote">“</span><p>${r.text}</p><b>${r.who}</b></div>`
).join("");

/* ---------- 뉴스 ---------- */
(function () {
  const idx = ARTICLES.map((a, i) => ({ a, i }));
  const hot = idx.filter((x) => x.a.hot), fresh = idx.filter((x) => !x.a.hot);
  $("#news-cols").innerHTML = `
    <div class="news-col"><h4>실시간 인기 뉴스</h4>${hot.map(({ a, i }, r) => `<a class="news-item" href="article.html?id=${i}"><span class="rank">${r + 1}</span>${a.title}</a>`).join("")}</div>
    <div class="news-col"><h4>최신 뉴스</h4>${fresh.map(({ a, i }) => `<a class="news-item dot" href="article.html?id=${i}">${a.title}</a>`).join("")}</div>`;
})();
