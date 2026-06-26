# 카카오 로그인 · 카카오페이 연동 셋업 가이드

> 코드는 전부 구현돼 있습니다. **키만 넣으면 실제로 동작**합니다.
> 키는 본인 카카오 개발자 계정에서 발급받아야 하며(제가 대신 발급 불가), 아래 순서대로 ~10분이면 됩니다.

## 0) 동작 구조
- **로그인**: 브라우저 → `/.netlify/functions/kakao-login` → 카카오 인증 → `kakao-callback`(코드→토큰→사용자) → 가입 페이지 복귀
- **결제**: 결제창 → `pay-ready`(tid 발급) → 카카오페이 결제 페이지 → 복귀 → `pay-approve`(승인)
- 키가 없으면 자동으로 **데모 모드**(가짜 성공)로 폴백 — 시연은 항상 됩니다.

## 1) 카카오 개발자 앱 만들기
1. https://developers.kakao.com → 로그인 → **내 애플리케이션 > 애플리케이션 추가하기**
2. 생성 후 **앱 키** 확인:
   - **REST API 키** → `KAKAO_REST_KEY` 와 `config.js`에 사용
   - (JavaScript 키는 이 구현에선 불필요 — 리다이렉트 방식 사용)

## 2) 카카오 로그인 설정
1. **제품 설정 > 카카오 로그인** → **활성화 ON**
2. **Redirect URI** 등록 (배포 URL 기준):
   - 로컬: `http://localhost:8888/.netlify/functions/kakao-callback`
   - 배포: `https://<your-site>.netlify.app/.netlify/functions/kakao-callback`
3. **동의 항목**에서 **닉네임**(profile_nickname) 정도를 "선택 동의"로 설정
4. (선택) **보안 > Client Secret** 사용 시 `KAKAO_CLIENT_SECRET`에 입력

## 3) 카카오페이 (테스트 결제)
- 본 구현은 **테스트 CID `TC0ONETIME`** + **Admin 키**로 동작합니다 (실제 청구 없음).
- **Admin 키**: 카카오 콘솔 앱의 **앱 키 > Admin 키** → `KAKAO_ADMIN_KEY`
- ⚠️ 실제 "돈이 빠지는" 카카오페이 온라인 결제는 **사업자 가맹 심사**가 필요해 해커톤 범위 밖입니다. 데모는 테스트 결제로 충분합니다.

## 4) 키 넣기
- **프론트**: `config.js`
  ```js
  KAKAO_REST_KEY: "여기에 REST API 키",
  ```
- **서버(환경변수)**: `.env.example` 참고 → Netlify 대시보드 **Site settings > Environment variables**에 등록
  - `KAKAO_REST_KEY`, `KAKAO_ADMIN_KEY`, (선택) `KAKAO_CLIENT_SECRET`

## 5) 실행
- **로컬**(함수 포함 실행):
  ```bash
  npm i -g netlify-cli
  netlify dev          # http://localhost:8888
  ```
- **배포**:
  ```bash
  netlify deploy --prod      # 또는 GitHub 연동 후 자동 배포
  ```
  배포 후 나온 URL을 2)의 Redirect URI에 다시 등록.

## 체크리스트
- [ ] REST 키를 `config.js` + 환경변수에 넣음
- [ ] Admin 키를 환경변수에 넣음
- [ ] Redirect URI를 배포 URL로 등록함
- [ ] 카카오 로그인 활성화 + 닉네임 동의항목 설정
- [ ] `netlify dev` 또는 배포로 (file:// 아님!) 실행
