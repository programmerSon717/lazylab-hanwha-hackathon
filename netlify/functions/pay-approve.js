// 카카오페이 결제 승인 — pg_token + tid로 최종 승인
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
  const admin = process.env.KAKAO_ADMIN_KEY;
  if (!admin) return { statusCode: 200, body: JSON.stringify({ demo: true }) };

  const { tid, pg_token, order } = JSON.parse(event.body || "{}");
  const form = new URLSearchParams({
    cid: "TC0ONETIME",
    tid,
    partner_order_id: order,
    partner_user_id: "lazylab_user",
    pg_token,
  });

  try {
    const r = await fetch("https://kapi.kakao.com/v1/payment/approve", {
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${admin}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: form,
    });
    const data = await r.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ error: true, detail: String(e) }) };
  }
};
