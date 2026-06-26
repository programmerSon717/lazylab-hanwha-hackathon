// 카카오 로그인 콜백 — 인가코드를 토큰으로 교환하고 사용자 정보 조회 후 가입 페이지로 복귀
exports.handler = async (event) => {
  const q = event.queryStringParameters || {};
  const code = q.code;
  const state = q.state || "";
  const host = event.headers.host;
  const proto = event.headers["x-forwarded-proto"] || "https";
  const base = `${proto}://${host}`;
  const redirectUri = `${base}/.netlify/functions/kakao-callback`;
  const restKey = process.env.KAKAO_REST_KEY;
  const secret = process.env.KAKAO_CLIENT_SECRET || "";

  if (!code || !restKey) {
    return { statusCode: 302, headers: { Location: "/signup.html?login=err" } };
  }
  try {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: restKey,
      redirect_uri: redirectUri,
      code,
    });
    if (secret) body.set("client_secret", secret);

    const tokRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body,
    });
    const tok = await tokRes.json();
    if (!tok.access_token) {
      const reason = encodeURIComponent((tok.error_description || tok.error || JSON.stringify(tok)).slice(0, 200));
      return { statusCode: 302, headers: { Location: `/signup.html?login=err&reason=${reason}` } };
    }

    const meRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${tok.access_token}` },
    });
    const me = await meRes.json();
    const name =
      (me.kakao_account && me.kakao_account.profile && me.kakao_account.profile.nickname) ||
      (me.properties && me.properties.nickname) ||
      "카카오회원";

    const dest =
      `/signup.html?login=ok&name=${encodeURIComponent(name)}` +
      (state ? `&id=${encodeURIComponent(state)}` : "");
    return { statusCode: 302, headers: { Location: dest } };
  } catch (e) {
    const reason = encodeURIComponent(String(e.message || e).slice(0, 200));
    return { statusCode: 302, headers: { Location: `/signup.html?login=err&reason=${reason}` } };
  }
};
