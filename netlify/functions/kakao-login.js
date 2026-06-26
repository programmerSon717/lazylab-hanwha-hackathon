// 카카오 로그인 시작 — 카카오 인증 페이지로 리다이렉트
exports.handler = async (event) => {
  const restKey = process.env.KAKAO_REST_KEY;
  const host = event.headers.host;
  const proto = event.headers["x-forwarded-proto"] || "https";
  const base = `${proto}://${host}`;
  const redirectUri = `${base}/.netlify/functions/kakao-callback`;
  const state = (event.queryStringParameters && event.queryStringParameters.id) || "";

  if (!restKey) {
    return { statusCode: 302, headers: { Location: "/signup.html?login=demo" } };
  }
  const url =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${restKey}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    "&response_type=code" +
    `&state=${encodeURIComponent(state)}`;
  return { statusCode: 302, headers: { Location: url } };
};
