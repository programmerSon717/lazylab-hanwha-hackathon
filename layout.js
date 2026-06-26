// layout.js — 모든 페이지 공통 헤더/푸터 주입 + 헬퍼 (content.js/platform-data.js 뒤에 로드)
(function () {
  const won = (n) => n.toLocaleString("ko-KR") + "원";
  // 클래식 스크립트의 top-level const는 window에 붙지 않으므로 bare 이름으로 참조한다
  const all = () => {
    const base = typeof PRODUCTS !== "undefined" ? PRODUCTS : [];
    const def = typeof DEFAULT_PRODUCT !== "undefined" ? DEFAULT_PRODUCT : null;
    return [...base, def].filter(Boolean);
  };
  const byId = (id) => all().find((p) => p && p.id === id);
  const qs = (k) => new URLSearchParams(location.search).get(k);
  window.LZ = { won, byId, qs, all };

  const page = document.body.dataset.page || "home";
  const nav = [
    ["home", "홈", "index.html"],
    ["products", "보험상품", "index.html#products"],
    ["cases", "가입사례", "cases.html"],
    ["reviews", "고객후기", "reviews.html"],
    ["news", "뉴스", "news.html"],
  ];

  // ===== 헤더 =====
  const lzUser = localStorage.getItem("lz_user");
  const rightHtml = lzUser
    ? `<div class="user-menu">
         <button class="user-name" id="lz-user-btn">${lzUser}님 <span class="caret">▾</span></button>
         <div class="user-dropdown" id="lz-dropdown" hidden>
           <a href="mypage.html">📋 내 가입 상품</a>
           <a href="#" id="lz-logout">🚪 로그아웃</a>
         </div>
       </div>`
    : `<a class="text-link" href="signup.html">로그인/가입</a><a class="badge-cta" href="signup.html">첫 달 디포짓 100% 보장!</a>`;

  const header = document.getElementById("site-header");
  if (header) {
    header.className = "gnb";
    header.innerHTML = `
      <div class="gnb-inner">
        <a class="logo" href="index.html">🐢 lazylab</a>
        <form class="nav-search" id="nav-search">
          <span class="search-ico">🔍</span>
          <input type="text" id="nav-input" placeholder="어떤 게으름이 있으신가요?" autocomplete="off" />
        </form>
        <div class="gnb-right">${rightHtml}</div>
      </div>
      <nav class="subnav"><div class="subnav-inner">
        ${nav.map(([k, label, href]) =>
          `<a class="${k === page ? "active" : ""}" href="${href}">${label}${k === "news" ? ' <span class="dot-new">NEW</span>' : ""}</a>`
        ).join("")}
      </div></nav>`;

    const form = document.getElementById("nav-search");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("nav-input").value.trim();
      if (!q) return;
      // 홈에서는 인라인 검색, 그 외 페이지에서는 홈으로 리다이렉트
      if (page === "home" && window.runSearch) {
        const main = document.getElementById("confess");
        if (main) main.value = q;
        window.runSearch(q);
      } else {
        location.href = "index.html?q=" + encodeURIComponent(q) + "#result";
      }
    });

    // 사용자 드롭다운 토글
    const userBtn = document.getElementById("lz-user-btn");
    const dropdown = document.getElementById("lz-dropdown");
    if (userBtn && dropdown) {
      userBtn.addEventListener("click", (e) => { e.stopPropagation(); dropdown.hidden = !dropdown.hidden; });
      document.addEventListener("click", (e) => { if (!e.target.closest(".user-menu")) dropdown.hidden = true; });
    }

    // 로그아웃
    const logoutBtn = document.getElementById("lz-logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("lz_user");
        const rest = (window.LAZY_CONFIG || {}).KAKAO_REST_KEY;
        if (rest) {
          // 카카오 계정까지 로그아웃 후 홈으로 복귀
          location.href =
            "https://kauth.kakao.com/oauth/logout?client_id=" + rest +
            "&logout_redirect_uri=" + encodeURIComponent(location.origin + "/index.html");
        } else {
          location.href = "index.html";
        }
      });
    }
  }

  // ===== 푸터 =====
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = `
      <div class="footer-top">
        <div class="notice">
          <h4>공지사항</h4>
          <ul>
            <li><span>[안내] lazylab 2026년 6월 고객센터 휴무일 안내</span><time>2026-06-02</time></li>
            <li><span>[안내] 이용약관·개인정보처리방침 개정 사전 안내</span><time>2026-05-28</time></li>
            <li><span>[안내] 게으름 디포짓 정산 주기 변경 안내</span><time>2026-05-06</time></li>
          </ul>
        </div>
        <div class="fcol"><h4>마이페이지</h4><a href="signup.html">내 보험내역</a><a href="signup.html">내 디포짓</a><a href="signup.html">회원정보수정</a></div>
        <div class="fcol"><h4>게으름 상담</h4><a href="signup.html">15분 전화상담</a><a href="signup.html">30분 방문상담</a></div>
        <div class="fcol"><h4>고객센터</h4><a href="news.html">공지사항</a><a href="reviews.html">자주묻는질문</a></div>
      </div>
      <div class="footer-links">
        <a>회사소개</a><a>이용약관</a><a class="bold-orange">개인정보처리방침</a><a>법적책임</a><a>운영정책</a>
      </div>
      <p class="footer-legal">
        ㈜게으름연구소 · 서울 어딘가 이불 속 12-3 lazylab빌딩 · 대표: 작심삼일 · 문의: help@lazylab.example<br />
        ※ 본 서비스는 <b>한화 라이프 × LIFE 해커톤</b> 출품용 <b>패러디</b>입니다. 실제 보험 상품이 아니며 실제 가입·결제·보험금 지급이 발생하지 않습니다.
      </p>
      <div class="footer-bottom"><span class="logo">🐢 lazylab</span><small>© 2026 Lazylab. ALL RIGHTS RESERVED.</small></div>`;
  }

  // ===== 챗봇 (전 페이지 공통, 룰 기반 상품 추천) =====
  (function initChatbot() {
    const won2 = (n) => n.toLocaleString("ko-KR") + "원";
    const wrap = document.createElement("div");
    wrap.id = "lz-chat";
    wrap.innerHTML = `
      <button id="lz-chat-fab" aria-label="게으름 상담 챗봇">💬<span class="fab-txt">게으름 상담</span></button>
      <div id="lz-chat-panel" hidden>
        <div class="chat-head">
          <span>🐢 게으름 상담 챗봇</span>
          <button id="lz-chat-close" aria-label="닫기">✕</button>
        </div>
        <div class="chat-body" id="lz-chat-body"></div>
        <div class="chat-chips" id="lz-chat-chips"></div>
        <form class="chat-input" id="lz-chat-form">
          <input type="text" id="lz-chat-text" placeholder="어떤 게으름이 고민이세요?" autocomplete="off" />
          <button type="submit">전송</button>
        </form>
      </div>`;
    document.body.appendChild(wrap);

    const fab = wrap.querySelector("#lz-chat-fab");
    const panel = wrap.querySelector("#lz-chat-panel");
    const body = wrap.querySelector("#lz-chat-body");
    const form = wrap.querySelector("#lz-chat-form");
    const input = wrap.querySelector("#lz-chat-text");
    const chips = wrap.querySelector("#lz-chat-chips");

    const add = (who, html) => {
      const b = document.createElement("div");
      b.className = "msg " + who;
      b.innerHTML = html;
      body.appendChild(b);
      body.scrollTop = body.scrollHeight;
      return b;
    };

    function recommend(text) {
      const t = (text || "").trim();
      if (/^(안녕|하이|hi|hello|ㅎㅇ|반가)/i.test(t)) {
        add("bot", "안녕하세요! 🐢 게으름 상담 챗봇이에요.<br>어떤 게 자꾸 미뤄지거나 안 되나요? (예: \"아침에 늦잠 자요\")");
        return;
      }
      if (typeof matchProduct !== "function") { add("bot", "잠시 후 다시 시도해 주세요."); return; }
      const p = matchProduct(t);
      const m = (typeof PRODUCT_META !== "undefined" && PRODUCT_META[p.id]) || {};
      const generic = p.id === "all" && !/(종합|전체|모든|다)/.test(t);
      const lead = generic
        ? "음, 딱 맞는 걸 찾으려면 조금만 더 구체적으로 말해줄래요? 일단 이건 어때요 👇"
        : "그 고민, 이 상품이 딱이에요 👇";
      add("bot", lead +
        `<div class="rec-card">
           <div class="rec-top"><span>${p.emoji}</span><b>${p.name}</b></div>
           <div class="rec-tag">${m.tag || "게으름"} · 월 ${won2(p.premium)} · 디포짓 ${won2(p.deposit)}</div>
           <div class="rec-desc">${p.tagline}</div>
           <div class="rec-btns">
             <a class="btn-primary sm" href="checkout.html?id=${p.id}">가입하기</a>
             <a class="btn-ghost sm" href="product.html?id=${p.id}">상세보기</a>
           </div>
         </div>`);
    }

    const QUICK = ["아침에 늦잠 자요", "할 일을 자꾸 미뤄요", "헬스장 안 가요", "야식을 못 참아요", "공부를 미뤄요"];
    chips.innerHTML = QUICK.map((q) => `<button type="button" class="chat-chip">${q}</button>`).join("");
    chips.addEventListener("click", (e) => {
      const c = e.target.closest(".chat-chip");
      if (!c) return;
      add("user", c.textContent);
      recommend(c.textContent);
    });

    let greeted = false;
    fab.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      if (!panel.hidden && !greeted) {
        greeted = true;
        add("bot", "안녕하세요! 🐢 게으름 상담 챗봇이에요.<br>고민되는 게으름을 말해주면 <b>딱 맞는 보험</b>을 바로 추천해 드려요.");
      }
    });
    wrap.querySelector("#lz-chat-close").addEventListener("click", () => (panel.hidden = true));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value.trim();
      if (!v) return;
      add("user", v);
      input.value = "";
      setTimeout(() => recommend(v), 180);
    });
  })();
})();
