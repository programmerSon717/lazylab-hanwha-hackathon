# 🎤 lazylab 발표 스크립트 (한/영) · Presentation Script (KO/EN)

> Live: https://lazylab-hanwha-hackathon.netlify.app · Slides: `/slides.html`
> 데모는 화면을 직접 보여주며 진행. 영어 발표 시 우측 상단 **Language → English** 또는 `?lang=en`.

---

## 1. 문제 / 현상 (Problem)
**[KO]** "매년 1월이면 다들 결심하죠. 그런데 헬스장은 등록만 하고 안 가고, 인강은 결제만 하고 안 듣고, 돈은 모으려다 텅장이 됩니다. 이른바 **'작심삼일'**. 사람의 의지는 평균 3일을 못 넘겨요. 동기부여 앱은 많지만 알림은 그냥 무시하면 그만이고, **진짜로 행동하게 만드는 강제력**이 없습니다. 게다가 보험은 큰 '사고'만 보장하지, 이런 일상의 작은 게으름은 아무도 다루지 않았어요."
**[EN]** "Every January we all make resolutions. But we sign up for the gym and never go, buy online courses and never watch, try to save and end up broke. Willpower rarely lasts more than three days. There are plenty of motivation apps, but you can just ignore the notifications — there's **no real force that makes you act.** And insurance only covers big 'accidents,' never these small everyday lazinesses."

## 2. 인사이트 (Insight)
**[KO]** "행동경제학엔 답이 있어요 — **'돈을 걸면 사람은 움직인다'**(커미트먼트 디바이스). 그래서 게으름을 하나의 **리스크로 보고 보험 상품으로 만들었습니다.** 디포짓(보증금)을 걸게 하고, 목표를 달성하면 돌려주고, 실패하면 몰수. 여기서 핵심 역설이 나옵니다 — **게으른 사람한테 팔면 망할 것 같지만, 게으르기 때문에 오히려 돈이 됩니다.**"
**[EN]** "Behavioral economics has the answer — **people act when they put money on the line** (a commitment device). So we treated laziness as a **risk and turned it into insurance.** You stake a deposit, get it back if you hit your goal, forfeit it if you fail. And here's the twist — **you'd think selling to lazy people would bankrupt you, but because they're lazy, it actually makes money.**"

## 3. 솔루션 (Solution) — lazylab
**[KO]** "그래서 만든 게 **lazylab**, 게으름 보장 플랫폼입니다. 늦잠·미루기·운동·저축·야식·정리·공부·연락 — 9가지 게으름 상품이 있고, 한 줄만 입력하면 딱 맞는 보험을 추천해줍니다."
**[EN]** "So we built **lazylab**, a laziness-coverage platform. Oversleep, procrastination, fitness, savings, late-night snacks, tidying, study, replies — nine products. Type one line and it recommends the perfect policy."

## 4. 작동 방식 (How it works) — 라이브 데모
**[KO]** "흐름은 이렇습니다 — **고백 → 추천 → 가입 → 결제 → 약관/관리.**"
**[EN]** "The flow — **confess → recommend → enroll → pay → policy & manage.**"

| # | 🇰🇷 | 🇬🇧 |
|---|-----|-----|
| ① 추천 | "'영단어 외우는데 자꾸 까먹어요' → 딱 맞는 보험 추천 (AI 키 없이 규칙 기반)" | "'I keep forgetting English words' → recommends the right policy, rule-based, no AI key." |
| ② 상세 | "진짜 약관처럼 정의·보장·면책. '🤫 수익구조 보기'로 어떻게 버는지 공개" | "Real policy wording — definitions, coverage, exclusions — plus '🤫 profit model'." |
| ③ 결제 | "가입→결제창. **카카오페이 실제 연동** 테스트 결제" | "Enroll → checkout. **Real KakaoPay** test payment." |
| ④ 로그인 | "데모 아닌 **진짜 카카오 OAuth 로그인**" | "A **real Kakao OAuth login**, not a mock." |
| ⑤ 마이페이지 | "내 가입상품 → **영문 약관 PDF**(Article 1~9 + 서명)" | "My Policies → **English Policy Wording PDF.**" |
| ⑥ 챗봇 | "전 페이지 챗봇, 고민 말하면 즉시 추천" | "Site-wide chatbot, instant recommendation." |
| ⑦ 뉴스 | "방송사·기자명까지 있는 게으름 가짜 기사" | "Parody news with broadcaster & reporter names." |
| ⑧ 한/영 | "우측 상단 Language → 전 페이지 영어 전환" | "Language toggle → whole site in English." |

## 5. 수익 모델 (Revenue Model) — 핵심
**[KO]** "수익은 6가지 레버에서 나옵니다. ① **디포짓 몰수** — 대부분 실패하니까. ② **구독 관성** — 해지하기 귀찮아서 안 함(가장 게으른 고객이 최고 LTV). ③ **청구 마찰** — 보험금 청구도 귀찮아서 안 함. ④ **혜택 미사용** — 약속한 혜택을 안 써서 원가 0. ⑤ **플로트 운용** — 모은 디포짓을 굴려 수익. ⑥ **제휴 수수료** — 제휴사 송객. 핵심은 **'고객을 끄는 매력 포인트'가 동시에 '수익원'**이라는 거예요."
**[EN]** "Revenue comes from six levers. ① **Deposit forfeiture** — most people fail. ② **Subscription inertia** — too lazy to cancel (the laziest customer has the highest LTV). ③ **Claim friction** — too lazy to even file a claim. ④ **Unused perks** — promised benefits go unused, near-zero cost. ⑤ **Float** — invest the pooled deposits. ⑥ **Partner commissions.** The key: **every customer hook is also a revenue lever.**"

## 6. 구현 / 기술 (Tech)
**[KO]** "빌드리스 정적 프론트 + **Netlify 서버리스 함수**로 카카오 로그인·카카오페이를 실제 연동했고, 영문 약관은 스크립트로 PDF 자동 생성, 전체 한/영 i18n까지 — 전부 배포돼 실제로 돌아갑니다."
**[EN]** "A buildless static front end + **Netlify serverless functions** for real Kakao login & KakaoPay, auto-generated English policy PDFs, and full KO/EN i18n — all live and working in production."

## 7. 클로징 (Closing)
**[KO]** **"게으름은 리스크가 아니라, 저희의 비즈니스 모델입니다. 감사합니다!"**
**[EN]** **"Laziness isn't a risk — it's our business model. Thank you!"**

---

## ⏱ 3분 압축 / 3-min cut
문제·인사이트(40s) → 추천(20s) → 수익구조(25s) → 결제+로그인(35s) → 마이페이지 PDF(20s) → 챗봇/뉴스/한영(25s) → 수익모델 한 방(20s) → 클로징(15s)

## 🎬 시연 전 체크 / Pre-demo checklist
- [ ] 로그인 1회 + 결제상품 1개 미리 만들기 (마이페이지·PDF 시연용)
- [ ] 검색 입력값 미리 정하기 (가장 임팩트 큰 문장)
- [ ] 영어 발표면 `?lang=en` / Language→English
- [ ] 인터넷 끊김 대비 주요 화면 스크린샷 백업
