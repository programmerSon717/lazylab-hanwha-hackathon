// generate_terms.js — 각 보험상품의 상세 약관 HTML을 생성한다.
// content.js의 PRODUCTS 데이터를 재사용하고, 상품별 약관 디테일(TERMS)을 결합한다.
const fs = require("fs");
const path = require("path");

// --- content.js 로드 (eval로 PRODUCTS / DEFAULT_PRODUCT / matchProduct 확보) ---
const repo = path.resolve(__dirname, "..");
const code = fs.readFileSync(path.join(repo, "content.js"), "utf8");
let _P, _D;
eval(code + "\n_P = PRODUCTS; _D = DEFAULT_PRODUCT;");
const PRODUCTS = _P, DEFAULT_PRODUCT = _D;

// --- 상품별 약관 디테일 (브라우저 상품상세 페이지와 공용) ---
const { TERMS } = require("../terms-data.js");

const won = (n) => n.toLocaleString("ko-KR") + "원";
const li = (arr) => arr.map((x) => `<li>${x}</li>`).join("");

function buildHTML(p, t) {
  const benefitRows = t.benefits
    .map(([cause, pay]) => `<tr><td>${cause}</td><td>${pay}</td></tr>`)
    .join("");
  const defRows = t.definitions
    .map(([term, def]) => `<tr><td class="term">${term}</td><td>${def}</td></tr>`)
    .join("");
  const profitRows = p.profit
    .map(([name, desc]) => `<tr><td class="term">${name}</td><td>${desc}</td></tr>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 20mm 18mm; }
  * { box-sizing: border-box; }
  body { font-family: "Malgun Gothic","맑은 고딕",system-ui,sans-serif; color:#1d1d1f; font-size:11pt; line-height:1.6; }
  .cover { border-bottom:3px solid #0066cc; padding-bottom:14px; margin-bottom:6px; }
  .insurer { font-size:10pt; color:#0066cc; font-weight:700; letter-spacing:.5px; }
  h1 { font-size:21pt; margin:8px 0 4px; letter-spacing:-.5px; }
  .emoji { font-size:18pt; }
  .tagline { color:#555; font-size:10.5pt; }
  .meta { margin-top:10px; font-size:9.5pt; color:#666; display:flex; gap:18px; flex-wrap:wrap; }
  .meta b { color:#1d1d1f; }
  h2 { font-size:12.5pt; margin:20px 0 8px; padding-left:9px; border-left:4px solid #0066cc; }
  p.lead { margin:4px 0; }
  table { width:100%; border-collapse:collapse; margin:6px 0 4px; font-size:10pt; }
  th,td { border:1px solid #d8d8dc; padding:7px 9px; text-align:left; vertical-align:top; }
  th { background:#f5f5f7; font-weight:700; }
  td.term { white-space:nowrap; font-weight:600; background:#fafafc; width:130px; }
  ol,ul { margin:4px 0 4px 18px; }
  li { margin:3px 0; }
  .box { background:#eef4fc; border-radius:8px; padding:10px 12px; margin:6px 0; font-size:10pt; }
  .example { background:#fafafc; border:1px solid #e0e0e0; border-radius:8px; padding:10px 12px; font-size:10pt; }
  .profit { margin-top:10px; }
  .profit caption { text-align:left; font-size:9pt; color:#999; margin-bottom:4px; }
  .footer { margin-top:22px; border-top:1px solid #e0e0e0; padding-top:10px; font-size:8.5pt; color:#999; line-height:1.5; }
  .punch { font-style:italic; font-weight:700; color:#0066cc; }
</style></head><body>

  <div class="cover">
    <div class="insurer">한화 라이프 × LIFE · 게으름연구소 (LAZY LIFE INSURANCE)</div>
    <h1><span class="emoji">${p.emoji}</span> ${p.name} 약관</h1>
    <div class="tagline">${p.tagline}</div>
    <div class="meta">
      <span><b>상품코드</b> ${t.code}</span>
      <span><b>월 보험료</b> ${won(p.premium)}</span>
      <span><b>환급 디포짓</b> ${won(p.deposit)}</span>
      <span><b>가입대상</b> ${t.target}</span>
    </div>
  </div>

  <h2>제1조 (목적)</h2>
  <p class="lead">본 약관은 가입자의 게으름으로 인하여 발생하는 일상의 작은 손실을 보장하고, 행동 개선을 유도하기 위한 「${p.name}」 계약의 권리·의무를 규정함을 목적으로 한다.</p>

  <h2>제2조 (용어의 정의)</h2>
  <table><tr><th>용어</th><th>정의</th></tr>${defRows}</table>

  <h2>제3조 (보장 내용 및 보험금 지급 사유)</h2>
  <table><tr><th>지급 사유</th><th>지급 내용</th></tr>${benefitRows}</table>

  <h2>제4조 (보험료의 납입)</h2>
  <p class="lead">월 보험료는 ${won(p.premium)}이며 매월 자동 납입된다. 보험료 납입을 미루는 것 또한 본 상품이 보장하는 게으름의 일종이나, 2회 이상 연체 시 계약은 자동 해지될 수 있다.</p>

  <h2>제5조 (환급 디포짓)</h2>
  <div class="box">${t.deposit}</div>

  <h2>제6조 (보험금의 청구 및 지급)</h2>
  <p class="lead">가입자는 사유 발생일로부터 30일 이내에 앱을 통해 보험금(위로 포인트 등)을 청구하여야 한다. 청구를 미루어 기한이 도과한 경우 지급 청구권은 소멸하며, 이는 본 상품의 취지에 부합하는 것으로 본다.</p>

  <h2>제7조 (면책 사항 — 보험금을 지급하지 않는 경우)</h2>
  <ol>${li(t.exclusions)}</ol>

  <h2>제8조 (특약 및 제휴 혜택)</h2>
  <ul>${li(t.riders)}</ul>

  <h2>제9조 (계약의 철회 및 해지)</h2>
  <p class="lead">가입자는 청약일로부터 15일 이내에 청약을 철회할 수 있다. 다만 '해지하는 것조차 귀찮은' 경우 계약은 자동 갱신되며, 이로 인한 보험료 납입은 가입자의 자발적 의사로 간주한다.</p>

  <h2>제10조 (지급 예시)</h2>
  <div class="example">${t.example}</div>

  <table class="profit">
    <caption>[별표] 보험사 수익 구조 — 대외비 · 발표용 이스터에그</caption>
    <tr><th>수익 레버</th><th>설명</th></tr>
    ${profitRows}
  </table>
  <p class="punch">"${p.punch}"</p>

  <div class="footer">
    ※ 본 약관은 한화 라이프 × LIFE 해커톤 출품용 <b>패러디 상품</b>입니다. 실제 보험 상품이 아니며, 실제 가입·결제·보험금 지급이 발생하지 않습니다.<br>
    LAZY LIFE INSURANCE · 게으름연구소 · 본 문서는 데모 목적으로 자동 생성되었습니다.
  </div>
</body></html>`;
}

// --- 생성 ---
const outDir = path.join(__dirname, "html");
fs.mkdirSync(outDir, { recursive: true });

const all = [...PRODUCTS, DEFAULT_PRODUCT];
const index = [];
all.forEach((p, i) => {
  const t = TERMS[p.id];
  if (!t) {
    console.warn("약관 디테일 없음:", p.id);
    return;
  }
  const html = buildHTML(p, t);
  const base = String(i + 1).padStart(2, "0") + "_" + p.name.replace(/\s+/g, "");
  const file = path.join(outDir, base + ".html");
  fs.writeFileSync(file, html, "utf8");
  index.push({ html: file, pdf: base + "_약관.pdf", name: p.name });
});

fs.writeFileSync(path.join(__dirname, "index.json"), JSON.stringify(index, null, 2), "utf8");
console.log("생성된 약관 HTML:", index.length, "개");
index.forEach((x) => console.log("  -", x.name));
