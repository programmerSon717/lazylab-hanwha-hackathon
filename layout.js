// layout.js — 모든 페이지 공통 헤더/푸터/챗봇 주입 + 헬퍼 (i18n.js 뒤에 로드)
(function () {
  const T = window.t || ((ko) => ko);
  if (window.applyStaticI18n) window.applyStaticI18n();

  const won = (n) => (window.LANG === "en" ? "KRW " + n.toLocaleString("en-US") : n.toLocaleString("ko-KR") + "원");
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
    ["home", T("홈", "Home"), "index.html"],
    ["products", T("보험상품", "Products"), "index.html#products"],
    ["cases", T("가입사례", "Cases"), "cases.html"],
    ["reviews", T("고객후기", "Reviews"), "reviews.html"],
    ["news", T("뉴스", "News"), "news.html"],
  ];

  // ===== 헤더 =====
  const lzUser = localStorage.getItem("lz_user");
  const langHtml = `<div class="lang-menu">
      <button class="lang-btn" id="lz-lang-btn">Language <span class="caret">▾</span></button>
      <div class="lang-dropdown" id="lz-lang-dd" hidden>
        <a href="#" data-lang="ko" class="${window.LANG === "ko" ? "on" : ""}">한국어</a>
        <a href="#" data-lang="en" class="${window.LANG === "en" ? "on" : ""}">English</a>
      </div>
    </div>`;
  const rightHtml = lzUser
    ? `<div class="user-menu">
         <button class="user-name" id="lz-user-btn">${lzUser}${T("님", "")} <span class="caret">▾</span></button>
         <div class="user-dropdown" id="lz-dropdown" hidden>
           <a href="mypage.html">📋 ${T("내 가입 상품", "My Policies")}</a>
           <a href="#" id="lz-logout">🚪 ${T("로그아웃", "Log out")}</a>
         </div>
       </div>`
    : `<a class="text-link" href="signup.html">${T("로그인/가입", "Login / Sign up")}</a><a class="badge-cta" href="signup.html">${T("첫 달 디포짓 100% 보장!", "First-month deposit 100% covered!")}</a>`;

  const header = document.getElementById("site-header");
  if (header) {
    header.className = "gnb";
    header.innerHTML = `
      <div class="gnb-inner">
        <a class="logo" href="index.html">🐢 lazylab</a>
        <form class="nav-search" id="nav-search">
          <span class="search-ico">🔍</span>
          <input type="text" id="nav-input" placeholder="${T("어떤 게으름이 있으신가요?", "What are you lazy about?")}" autocomplete="off" />
        </form>
        <div class="gnb-right">${langHtml}${rightHtml}</div>
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
      if (page === "home" && window.runSearch) {
        const main = document.getElementById("confess");
        if (main) main.value = q;
        window.runSearch(q);
      } else {
        location.href = "index.html?q=" + encodeURIComponent(q) + "#result";
      }
    });

    // 언어 드롭다운
    const langBtn = document.getElementById("lz-lang-btn");
    const langDd = document.getElementById("lz-lang-dd");
    if (langBtn && langDd) {
      langBtn.addEventListener("click", (e) => { e.stopPropagation(); langDd.hidden = !langDd.hidden; });
      langDd.addEventListener("click", (e) => {
        const a = e.target.closest("[data-lang]");
        if (!a) return;
        e.preventDefault();
        window.setLang(a.dataset.lang);
      });
      document.addEventListener("click", (e) => { if (!e.target.closest(".lang-menu")) langDd.hidden = true; });
    }

    // 사용자 드롭다운
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
    const notices = window.LANG === "en"
      ? ["[Notice] lazylab June 2026 customer-center holiday", "[Notice] Advance notice of Terms / Privacy revision", "[Notice] Change to laziness-deposit settlement cycle"]
      : ["[안내] lazylab 2026년 6월 고객센터 휴무일 안내", "[안내] 이용약관·개인정보처리방침 개정 사전 안내", "[안내] 게으름 디포짓 정산 주기 변경 안내"];
    const dates = ["2026-06-02", "2026-05-28", "2026-05-06"];
    footer.innerHTML = `
      <div class="footer-top">
        <div class="notice">
          <h4>${T("공지사항", "Notices")}</h4>
          <ul>${notices.map((n, i) => `<li><span>${n}</span><time>${dates[i]}</time></li>`).join("")}</ul>
        </div>
        <div class="fcol"><h4>${T("마이페이지", "My Page")}</h4><a href="mypage.html">${T("내 보험내역", "My policies")}</a><a href="mypage.html">${T("내 디포짓", "My deposits")}</a><a href="signup.html">${T("회원정보수정", "Edit profile")}</a></div>
        <div class="fcol"><h4>${T("게으름 상담", "Consult")}</h4><a href="signup.html">${T("15분 전화상담", "15-min call")}</a><a href="signup.html">${T("30분 방문상담", "30-min visit")}</a></div>
        <div class="fcol"><h4>${T("고객센터", "Support")}</h4><a href="news.html">${T("공지사항", "Notices")}</a><a href="reviews.html">${T("자주묻는질문", "FAQ")}</a></div>
      </div>
      <div class="footer-links">
        <a>${T("회사소개", "About")}</a><a>${T("이용약관", "Terms")}</a><a class="bold-orange">${T("개인정보처리방침", "Privacy")}</a><a>${T("법적책임", "Legal")}</a><a>${T("운영정책", "Policy")}</a>
      </div>
      <p class="footer-legal">
        ${T("㈜게으름연구소 · 서울 어딘가 이불 속 12-3 lazylab빌딩 · 대표: 작심삼일 · 문의: help@lazylab.example", "Lazylab Inc. · 12-3 Under-the-Blanket, Seoul · CEO: Resolution Breaker · help@lazylab.example")}<br />
        ${T("※ 본 서비스는 <b>한화 라이프 × LIFE 해커톤</b> 출품용 <b>패러디</b>입니다. 실제 보험 상품이 아니며 실제 가입·결제·보험금 지급이 발생하지 않습니다.", "※ This service is a <b>parody</b> for the Hanwha Life × LIFE Hackathon. It is not a real insurance product; no actual enrollment, payment, or benefit occurs.")}
      </p>
      <div class="footer-bottom"><span class="logo">🐢 lazylab</span><small>© 2026 Lazylab. ALL RIGHTS RESERVED.</small></div>`;
  }

  // ===== 챗봇 =====
  (function initChatbot() {
    const wrap = document.createElement("div");
    wrap.id = "lz-chat";
    wrap.innerHTML = `
      <button id="lz-chat-fab" aria-label="chatbot">💬<span class="fab-txt">${T("게으름 상담", "Lazy Chat")}</span></button>
      <div id="lz-chat-panel" hidden>
        <div class="chat-head">
          <span>🐢 ${T("게으름 상담 챗봇", "Lazy Consultant Bot")}</span>
          <button id="lz-chat-close" aria-label="close">✕</button>
        </div>
        <div class="chat-body" id="lz-chat-body"></div>
        <div class="chat-chips" id="lz-chat-chips"></div>
        <form class="chat-input" id="lz-chat-form">
          <input type="text" id="lz-chat-text" placeholder="${T("어떤 게으름이 고민이세요?", "What are you lazy about?")}" autocomplete="off" />
          <button type="submit">${T("전송", "Send")}</button>
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
    };

    function recommend(text) {
      const tx = (text || "").trim();
      if (/^(안녕|하이|hi|hello|ㅎㅇ|반가)/i.test(tx)) {
        add("bot", T("안녕하세요! 🐢 게으름 상담 챗봇이에요.<br>어떤 게 자꾸 미뤄지거나 안 되나요? (예: \"아침에 늦잠 자요\")",
          "Hi! 🐢 I'm the Lazy Consultant Bot.<br>What do you keep putting off? (e.g., \"I oversleep in the morning\")"));
        return;
      }
      const matcher = window.matchProductL || matchProduct;
      const p0 = matcher(tx);
      const p = window.LP ? window.LP(p0) : p0;
      const m = window.LMETA ? window.LMETA(p0.id) : {};
      const generic = p0.id === "all" && !/(종합|전체|모든|다|comprehensive|all)/i.test(tx);
      const lead = generic
        ? T("음, 조금만 더 구체적으로 말해줄래요? 일단 이건 어때요 👇", "Hmm, could you be a bit more specific? Meanwhile, how about this 👇")
        : T("그 고민, 이 상품이 딱이에요 👇", "This product is a perfect fit 👇");
      add("bot", lead +
        `<div class="rec-card">
           <div class="rec-top"><span>${p0.emoji}</span><b>${p.name}</b></div>
           <div class="rec-tag">${m.tag || ""} · ${T("월", "")} ${won(p0.premium)} · ${T("디포짓", "deposit")} ${won(p0.deposit)}</div>
           <div class="rec-desc">${p.tagline}</div>
           <div class="rec-btns">
             <a class="btn-primary sm" href="checkout.html?id=${p0.id}">${T("가입하기", "Enroll")}</a>
             <a class="btn-ghost sm" href="product.html?id=${p0.id}">${T("상세보기", "Details")}</a>
           </div>
         </div>`);
    }

    const QUICK = window.LANG === "en"
      ? ["I oversleep", "I procrastinate", "I skip the gym", "I can't resist late snacks", "I delay studying"]
      : ["아침에 늦잠 자요", "할 일을 자꾸 미뤄요", "헬스장 안 가요", "야식을 못 참아요", "공부를 미뤄요"];
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
        add("bot", T("안녕하세요! 🐢 게으름 상담 챗봇이에요.<br>고민되는 게으름을 말해주면 <b>딱 맞는 보험</b>을 바로 추천해 드려요.",
          "Hi! 🐢 I'm the Lazy Consultant Bot.<br>Tell me what you're lazy about and I'll recommend <b>the perfect insurance</b> right away."));
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
