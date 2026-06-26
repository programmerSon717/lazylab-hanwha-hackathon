<div align="center">

# 🐢 lazylab — 게으름도 보장이 되나요?

**당신의 게으름을 입력하면, 딱 맞는 보험을 설계해 드립니다.**

게으름(늦잠·미루기·작심삼일·야식·텅장…)을 보장하는 **장난 보험 플랫폼**
🏆 한화 라이프 × LIFE 해커톤 출품작 (패러디)

🔗 **Live:** https://lazylab-hanwha-hackathon.netlify.app

</div>

---

## 📌 소개

"게으름 때문에 못 한 일"을 보장하는 보험을 파는 **가상의 보험 플랫폼**입니다.
사용자가 자기 게으름을 한 줄로 고백하면 맞춤 보험 상품을 추천하고, 가입·결제·약관 열람까지 **실제 서비스처럼** 동작합니다.

> 💡 비즈니스 컨셉의 핵심 아이러니
> **"게으른 사람한테 보험을 팔면 망할 것 같지만 — 게으르기 때문에 오히려 돈이 된다."**
> 환급 디포짓 몰수 · 구독 관성(해지 귀찮음) · 청구 마찰 · 혜택 미사용 · 플로트 운용 등
> "고객을 끄는 매력 포인트 = 보험사의 수익 레버"가 되도록 설계 (각 상품 상세의 *수익구조 보기*에서 확인).

---

## ✨ 핵심 기능

- 🔎 **게으름 → 보험 추천** : 한 줄 입력/카테고리 클릭 → 키워드 매칭으로 맞춤 상품 즉시 추천 (AI 키 불필요, 규칙 기반)
- 🛍 **가입 → 결제 → 마이페이지** : 상품 상세 → 결제창(주문·결제수단·약관동의) → 가입 완료 → 내 가입 상품 관리
- 💬 **카카오 로그인** : 실제 카카오 OAuth 연동 (코드→토큰→사용자 정보)
- 💳 **카카오페이 결제** : 카카오페이 테스트 결제(ready/approve) 연동 (Netlify Functions)
- 📄 **영문 보험약관 PDF** : 상품별 정식 약관체(Policy Wording) PDF 9종 — 동의/서명 포함
- 🤖 **게으름 상담 챗봇** : 전 페이지 플로팅 챗봇, 물으면 바로 상품 추천
- 📰 **뉴스/사례/후기** : 가상 기자·방송사(JTBC·SBS·MBC·KBS) 기사, 보장 성공 사례, 가입 후기
- 🌐 **한국어 / English** : 우측 상단 Language 토글로 전 페이지 영어 전환 (`?lang=en` 링크도 지원)

---

## 🗂 페이지 구성

| 페이지 | 파일 | 설명 |
|--------|------|------|
| 홈 | `index.html` | 히어로 · 게으름 검색 · 리스크 9종 · 인기 상품 · 사례/후기/뉴스 |
| 상품 상세 | `product.html?id=` | 보장·약관 핵심(정의/지급/면책)·해시태그·수익구조·관련 상품 |
| 결제 | `checkout.html?id=` | 주문 요약 · 결제수단(카드/카카오페이/네이버페이/계좌) · 약관 동의 |
| 가입/로그인 | `signup.html` | 카카오/네이버/애플 간편가입 · 로그인 후 상태 유지 |
| 마이페이지 | `mypage.html` | 내 가입 상품 · 영문 약관 PDF 열람 · 해지 |
| 가입사례(목록/상세) | `cases.html` · `case.html?id=` | 게으름 극복 실제 사례(상황/처방/결과) |
| 고객후기 | `reviews.html` | 별점·상품 태그 후기 |
| 뉴스(목록/기사) | `news.html` · `article.html?id=` | 가상 방송사·기자 기사 |

> 공통 헤더/푸터/챗봇은 `layout.js`가 모든 페이지에 주입합니다.

---

## 🛡 보험 상품 (9종)

| 상품 | 보장 대상 |
|------|-----------|
| 🔔 작심삼일 모닝 보험 | 늦잠·지각 |
| 📝 내일의 나 보험 | 미루기·작심삼일 |
| 🏋️ 헬스장 유령회원 방지 보험 | 운동 결심 |
| 💸 텅장 방어 보험 | 충동구매·저축 |
| 🍗 심야 야식 알리바이 보험 | 야식 |
| 🧹 돼지방 탈출 보험 | 정리·청소 |
| 📚 작심삼일 자기계발 보험 | 공부·암기 |
| 💬 잠수 이별 방지 보험 | 연락·관계 |
| 🛡️ 종합 게으름 보험 | 전 분야 |

각 상품은 **월 보험료 + 환급 디포짓**(목표 달성 시 100% 환급) 구조이며, 데이터는 `content.js`에 정의됩니다.

---

## 💳 카카오 로그인 / 카카오페이 연동

서버리스(Netlify Functions)로 카카오 공식 API를 호출합니다.

```
[로그인]  /kakao-login → 카카오 인증 → /kakao-callback (코드→토큰→사용자) → 가입 페이지 복귀
[결제]    checkout → /pay-ready (tid 발급) → 카카오페이 결제창 → /pay-approve (승인) → 완료
```

- 함수: `netlify/functions/kakao-login.js · kakao-callback.js · pay-ready.js · pay-approve.js`
- 키가 없으면 자동으로 **데모 모드**(가짜 성공)로 폴백 → 키 없이도 시연 가능
- 셋업 방법은 **[KAKAO_SETUP.md](./KAKAO_SETUP.md)** 참고
- 카카오페이는 **테스트 CID(TC0ONETIME)** 기반 (실제 청구 없음)

---

## 📄 영문 보험약관 PDF

상품별 정식 보험약관(English Policy Wording)을 PDF로 제공합니다. (`policies/*.pdf`)

- 구성: Insurer / Policy No. / Article 1~9 (Purpose · Definitions · Benefits · Premium · Deposit · Exclusions · Claims · Cancellation · Illustration)
- **Policyholder Agreement**: ☒ I AGREE / ☐ I DO NOT AGREE + 서명란(Policyholder / Insurer)
- 생성: `node terms/generate_policy_en.js` → HTML 생성 후 헤드리스 브라우저로 PDF 변환
- 마이페이지의 각 가입 상품에서 바로 열람

---

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| 프론트엔드 | Vanilla HTML / CSS / JavaScript (빌드리스, 정적) |
| 백엔드 | Netlify Functions (서버리스, Node) |
| 외부 연동 | Kakao Login API · KakaoPay API |
| 배포 | Netlify |
| 디자인 | 로톡(Lawtalk) 벤치마크 · 주황 포인트 컬러 |

> 별도 프레임워크·빌드 단계 없이 정적 파일로 동작합니다.

---

## 📁 폴더 구조

```
.
├─ index.html / product.html / checkout.html / signup.html / mypage.html
├─ cases.html / case.html / reviews.html / news.html / article.html
├─ style.css                # 전체 스타일 (로톡 벤치마크)
├─ layout.js                # 공통 헤더/푸터/챗봇 + 로그인 상태
├─ script.js                # 홈 인터랙션 (검색·추천·렌더)
├─ content.js               # 보험 상품 9종 데이터 + 매칭 로직
├─ platform-data.js         # 사례·후기·뉴스·기사 데이터
├─ terms-data.js            # 약관 상세 데이터 (상품상세 + PDF 공용)
├─ i18n.js                  # 한/영 전환 + 영어 데이터/문구
├─ config.js                # 프론트 공개 설정 (카카오 REST 키 등)
├─ netlify/functions/       # 카카오 로그인/페이 서버리스 함수
├─ policies/                # 영문 약관 PDF + 생성 HTML
├─ terms/                   # 약관 PDF 생성 스크립트
├─ netlify.toml             # Netlify 설정
└─ KAKAO_SETUP.md           # 카카오 연동 가이드
```

---

## 🚀 로컬 실행 & 배포

```bash
# 로컬 (서버리스 함수 포함 실행)
npm i -g netlify-cli
netlify dev            # http://localhost:8888

# 배포
netlify deploy --prod --dir . --functions netlify/functions
```

### 환경변수 (Netlify > Environment variables)
| 변수 | 용도 |
|------|------|
| `KAKAO_REST_KEY` | 카카오 로그인 토큰 교환 |
| `KAKAO_CLIENT_SECRET` | (사용 시) 로그인 보안 |
| `KAKAO_ADMIN_KEY` | 카카오페이 ready/approve |

> 프론트의 `config.js`에도 `KAKAO_REST_KEY`를 넣어야 로그인 버튼이 실제로 동작합니다. **비밀키(Admin/Secret)는 절대 프론트에 넣지 마세요.**

---

## ⚠️ 면책 (Disclaimer)

본 서비스는 **한화 라이프 × LIFE 해커톤 출품용 패러디**입니다.
실제 보험 상품이 아니며, **실제 가입·결제·보험금 지급이 발생하지 않습니다.**
모든 상품명·약관·기자·방송사·후기·서명은 가상이며 재미를 위한 창작물입니다.

---

<div align="center">
🐢 <b>lazylab</b> · "게으름은 리스크가 아니라, 저희의 비즈니스 모델입니다."
</div>
