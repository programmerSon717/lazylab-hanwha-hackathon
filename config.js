// config.js — 프론트엔드 공개 설정. (비밀키는 여기 넣지 말 것! 서버 환경변수로만)
window.LAZY_CONFIG = {
  // 카카오 REST API 키 (로그인 authorize의 client_id로 사용 — 공개되어도 되는 값)
  // kakao developers > 내 애플리케이션 > 앱 키 > REST API 키
  KAKAO_REST_KEY: "c5fdf076ff8be8abc37fb929228f6a57",

  // 서버리스 함수 베이스 경로 (Netlify 배포 / `netlify dev` 모두 동일)
  API_BASE: "/.netlify/functions",
};

// 카카오 연동 활성화 여부 (REST 키가 채워져 있으면 실제 연동, 아니면 데모)
window.KAKAO_ENABLED = !!(window.LAZY_CONFIG.KAKAO_REST_KEY && window.LAZY_CONFIG.KAKAO_REST_KEY.length > 10);
