// 카카오페이 결제 준비 — tid 발급 + 결제 페이지 URL 반환 (테스트 CID: TC0ONETIME)
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST only" };
  const admin = process.env.KAKAO_ADMIN_KEY;
  const host = event.headers.host;
  const proto = event.headers["x-forwarded-proto"] || "https";
  const base = `${proto}://${host}`;

  // 키 없으면 데모 폴백 신호
  if (!admin) return { statusCode: 200, body: JSON.stringify({ demo: true }) };

  const { id, amount, name } = JSON.parse(event.body || "{}");
  const order = "lazylab_" + id + "_" + (event.headers["x-nf-request-id"] || Date.now());

  const form = new URLSearchParams({
    cid: "TC0ONETIME",
    partner_order_id: order,
    partner_user_id: "lazylab_user",
    item_name: name || "게으름 보험",
    quantity: "1",
    total_amount: String(amount || 0),
    tax_free_amount: "0",
    approval_url: `${base}/checkout.html?id=${encodeURIComponent(id)}&pay=approve`,
    cancel_url: `${base}/checkout.html?id=${encodeURIComponent(id)}&pay=cancel`,
    fail_url: `${base}/checkout.html?id=${encodeURIComponent(id)}&pay=fail`,
  });

  try {
    const r = await fetch("https://kapi.kakao.com/v1/payment/ready", {
      method: "POST",
      headers: {
        Authorization: `KakaoAK ${admin}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: form,
    });
    const data = await r.json();
    if (!data.tid) return { statusCode: 200, body: JSON.stringify({ error: true, detail: data }) };
    return {
      statusCode: 200,
      body: JSON.stringify({
        tid: data.tid,
        order,
        next: data.next_redirect_pc_url,
        mobile: data.next_redirect_mobile_url,
      }),
    };
  } catch (e) {
    return { statusCode: 200, body: JSON.stringify({ error: true, detail: String(e) }) };
  }
};
