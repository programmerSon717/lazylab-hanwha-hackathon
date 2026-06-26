// generate_policy_en.js — 영문 보험약관(Policy Wording) HTML 생성 → 이후 Edge로 PDF 변환
const fs = require("fs");
const path = require("path");

const repo = path.resolve(__dirname, "..");
const code = fs.readFileSync(path.join(repo, "content.js"), "utf8");
let _P, _D;
eval(code + "\n_P = PRODUCTS; _D = DEFAULT_PRODUCT;");
const PRODUCTS = _P, DEFAULT_PRODUCT = _D;
const { TERMS } = require("../terms-data.js");

const KRW = (n) => "KRW " + n.toLocaleString("en-US");

const EN = {
  morning: {
    name: "Oversleep & Tardiness Protection Policy",
    tagline: "You wake up. We make the calls.",
    definitions: [
      ["Successful Wake-Up", "Verification of activity (50+ steps or a selfie) within 30 minutes of dismissing the alarm."],
      ["Tardiness Risk", "A state detected as not-yet-awake within 10 minutes prior to the scheduled wake-up time."],
      ["Morning Call", "An automated voice/push call delivered via a partner alarm application."],
    ],
    benefits: [
      ["Upon detection of Tardiness Risk", "Up to three (3) automated Morning Calls."],
      ["Upon failure to verify wake-up (tardiness)", "Consolation Points of 1,000 P."],
      ["Upon three (3) consecutive Successful Wake-Ups", "Full refund of the monthly premium."],
    ],
    deposit: "A refundable deposit of KRW 10,000 applies. The deposit is refunded in full on the next business day upon three consecutive verified on-time wake-ups. A single failure converts the deposit into the 'Laziness Reserve' and it shall not be refunded.",
    exclusions: [
      "Weekend and public-holiday oversleeping is deemed voluntary rest and is not covered.",
      "Setting four or more alarms and dismissing all of them is deemed willful laziness and is excluded.",
      "Failure to submit wake-up verification out of idleness shall be treated as 'no verification = no wake-up'.",
      "Oversleeping due to intoxication is excluded unless the optional Drinking Rider is purchased.",
    ],
    example: "The Insured succeeded on Tuesday and Wednesday but dismissed all three alarms on Thursday and woke at 09:00, failing three consecutive wake-ups. Consolation Points of 1,000 P are paid; the KRW 10,000 deposit is not refunded.",
  },
  procrastinate: {
    name: "Tomorrow-Me Procrastination Insurance",
    tagline: 'We insure your "I\'ll do it tomorrow." (Tomorrow never comes.)',
    definitions: [
      ["Goal", "A single task registered at enrollment (e.g., submitting documents, exercising, cleaning)."],
      ["Procrastination Detection", "A state verified as incomplete up to 24 hours before the Goal deadline."],
      ["Completion", "Submission of completion verification within the Goal deadline."],
    ],
    benefits: [
      ["Upon Procrastination Detection", "Up to five (5) reminders."],
      ["Upon deadline overrun", "Consolation Points of 2,000 P."],
      ["Upon Completion", "Full deposit refund plus an Achievement Badge."],
    ],
    deposit: "A refundable deposit of KRW 20,000 applies. It is refunded in full upon verified Completion within the deadline; otherwise it is forfeited to the 'Tomorrow-Me Fund'.",
    exclusions: [
      "'Almost done' shall not be recognized as Completion.",
      "Self-extension of the deadline is excluded.",
      "Blocking reminder notifications voids coverage.",
      "Goals such as 'resting' or 'doing nothing' are ineligible for enrollment.",
    ],
    example: "The Insured's Goal was 'submit résumé' but repeated 'I'll do it tomorrow' three times and failed to complete. Consolation Points of 2,000 P are paid, the deposit is forfeited, and a free retry voucher is auto-issued, extending the subscription.",
  },
  workout: {
    name: "Ghost-Member Gym Attendance Insurance",
    tagline: "For those who register and never show up — made to make you go.",
    definitions: [
      ["Attendance", "Partner-facility check-in or a 30+ minute workout-app record."],
      ["Ghost Member", "A subscriber with fewer than three (3) monthly Attendances."],
      ["Target Attendance", "Twelve (12) or more Attendances per month."],
    ],
    benefits: [
      ["Upon fewer than 3 weekly Attendances", "A trainer encouragement push."],
      ["Upon a full week of absence", "A protein-bar coupon."],
      ["Upon 12 monthly Attendances", "Full deposit refund."],
    ],
    deposit: "A refundable deposit of KRW 30,000 applies, refunded in full upon twelve verified monthly Attendances; otherwise not refunded.",
    exclusions: [
      "'Merely intending to go' is not recognized as Attendance.",
      "Reaching the gym entrance and turning back is excluded.",
      "Posting workout photos on social media without an actual workout is excluded.",
      "Injury is processed separately under the optional Rest Rider upon submission of a medical certificate.",
    ],
    example: "The Insured attended once each in weeks 1 and 2, totaling two monthly Attendances, below the target of twelve. A protein-bar coupon is provided; the KRW 30,000 deposit is not refunded.",
  },
  saving: {
    name: "Empty-Wallet Defense Insurance",
    tagline: "Empty wallet again this month? We insure impulse buys.",
    definitions: [
      ["Impulse Purchase", "A single late-night (23:00–03:00) transaction exceeding KRW 50,000."],
      ["Savings Goal", "The target savings amount registered at the start of the month."],
      ["Empty Wallet", "A month-end balance below target."],
    ],
    benefits: [
      ["Upon a late-night payment attempt", "A 'Do you really need this?' warning alert."],
      ["Upon failing the Savings Goal", "Consolation Points of 3,000 P."],
      ["Upon achieving the monthly Savings Goal", "Full deposit refund plus preferential interest."],
    ],
    deposit: "A refundable deposit of KRW 50,000 applies, refunded in full upon achieving the monthly Savings Goal; otherwise forfeited, and any investment returns earned on the deposit during the accrual period accrue to the Insurer.",
    exclusions: [
      "'Stress shopping' constitutes grounds for exclusion.",
      "Items merely placed in a cart are not covered (no purchase).",
      "A payment made after the warning alert is deemed willful and the consolation amount is reduced by 50%.",
      "Investment and crypto losses are not covered.",
    ],
    example: "The Insured targeted KRW 300,000 in savings but fell short due to two late-night Impulse Purchases. Consolation Points of 3,000 P are paid; the KRW 50,000 deposit is not refunded.",
  },
  latenight: {
    name: "Late-Night Snack Alibi Insurance",
    tagline: "That 2 a.m. fried chicken — we insure the guilt.",
    definitions: [
      ["Late-Night Snack", "A delivery-app order or instant-noodle cooking between 23:00 and 05:00."],
      ["Successful Restraint", "Verified non-ordering during the late-night window."],
    ],
    benefits: [
      ["Upon detecting a late-night delivery-app launch", "A 'tomorrow's regret' alert."],
      ["Upon consuming a Late-Night Snack", "A consolation diet-tea coupon."],
      ["Upon restraining five (5) days per week", "Full deposit refund."],
    ],
    deposit: "A refundable deposit of KRW 15,000 applies, refunded in full upon five verified days of restraint per week; a single detected Late-Night Snack forfeits the refund.",
    exclusions: [
      "'Just one bite' is not recognized (there is no such thing as one bite).",
      "A snack treated by a friend is reviewed for exclusion as 'third-party inducement'.",
      "Hangover-relief snacks are handled only in conjunction with the Drinking Rider.",
      "Direct convenience-store purchases are reviewed separately as non-delivery.",
    ],
    example: "The Insured restrained on Thursday, Friday and Saturday but ordered fried chicken at 02:00 on Sunday, failing the weekly mission. A diet-tea coupon is provided; the deposit is not refunded.",
  },
  tidy: {
    name: "Messy-Room Escape Insurance",
    tagline: "'I'll clean it'… three weeks later. We insure that.",
    definitions: [
      ["Cleaning Verification", "Proof of completed tidying via before/after photographs."],
      ["Neglect", "Seven or more days without Cleaning Verification."],
    ],
    benefits: [
      ["Upon 7-day Neglect detection", "A 'just 10 minutes today' mission alert."],
      ["Upon mission failure", "Cleaning-supply Consolation Points."],
      ["Upon three (3) weekly Cleaning Verifications", "Full deposit refund."],
    ],
    deposit: "A refundable deposit of KRW 10,000 applies, refunded in full upon three weekly Cleaning Verifications; otherwise not refunded.",
    exclusions: [
      "The argument 'if I can't see it, it's clean' is not accepted.",
      "Stuffing items into drawers or closets is not recognized as tidying.",
      "Concealing clutter via camera angle voids coverage.",
      "Cleaning done by a roommate or family member is not recognized as the Insured's verification.",
    ],
    example: "The Insured submitted only two weekly verifications, short of the three-time target. Cleaning-supply points are provided; the deposit is not refunded.",
  },
  study: {
    name: "Resolution-Breaker Self-Development Insurance",
    tagline: "That online course you paid for but never watch — we make you finish it.",
    definitions: [
      ["Study Verification", "Completion of one lecture or a 30-minute focused-study record."],
      ["Course Completion", "100% completion of the enrolled course."],
      ["Memorization Goal", "A daily word or volume target."],
    ],
    benefits: [
      ["Upon a 3-day study lapse", "A progress reminder plus a mentor message."],
      ["Upon falling short of the Goal", "Consolation Points of 2,000 P."],
      ["Upon Course Completion / Memorization Goal achieved", "Full deposit refund plus a Completion Badge."],
    ],
    deposit: "A refundable deposit of KRW 30,000 applies, refunded in full upon achieving the target study volume; otherwise not refunded.",
    exclusions: [
      "Merely 'leaving a lecture playing' at 4x speed is not recognized as study.",
      "Merely purchasing a textbook (unboxing) is not covered.",
      "'Getting inspired' may not be reported as study.",
      "Failure of last-minute cramming the night before an exam is excluded as the Insured's own responsibility.",
    ],
    example: "The Insured enrolled with a Goal of memorizing 30 English words daily but 'kept trying to memorize and kept forgetting,' failing verification for three consecutive days. Consolation Points of 2,000 P are paid; the KRW 30,000 deposit is not refunded.",
  },
  contact: {
    name: "Ghosting-Prevention Relationship Insurance",
    tagline: "For those who delay replies until they ghost — we insure the relationship.",
    definitions: [
      ["Check-In Mission", "Sending a check-in message to a designated contact once per week."],
      ["Ghosting", "Non-response to an important contact for 48 or more hours."],
    ],
    benefits: [
      ["Upon detecting an unanswered important contact", "A 'reply now' alert."],
      ["Upon a relationship-neglect warning", "A consolation gift-voucher recommendation."],
      ["Upon completing the weekly Check-In Mission", "Full deposit refund."],
    ],
    deposit: "A refundable deposit of KRW 10,000 applies, refunded in full upon completing the weekly Check-In Mission; otherwise not refunded.",
    exclusions: [
      "'Read and ignored' is not recognized as a response.",
      "Sending a single emoticon is not recognized as a Check-In.",
      "A reply drafted but not sent (unsent) is excluded.",
      "If the counterpart ghosted first, it is reviewed separately as mutual fault.",
    ],
    example: "The Insured drafted a check-in message but never sent it (unsent), failing the mission. A gift-voucher recommendation is provided; the deposit is not refunded.",
  },
  all: {
    name: "Comprehensive Laziness Insurance",
    tagline: "Whatever you're lazy about, we cover it — laziness itself.",
    definitions: [
      ["Goal", "Any resolution or task across all categories registered by the Insured."],
      ["Achievement", "Verified completion of at least one of the monthly registered Goals."],
    ],
    benefits: [
      ["Upon detecting any 'I'll do it later'", "Category-specific reminders."],
      ["Upon failing any resolution", "Consolation Points."],
      ["Upon achieving at least one monthly Goal", "Full deposit refund."],
    ],
    deposit: "A refundable deposit of KRW 30,000 applies, refunded in full upon achieving at least one monthly Goal; if zero Goals are achieved, it is not refunded.",
    exclusions: [
      "All exclusions of the individual policies enumerated herein apply mutatis mutandis.",
      "The mere claim that 'starting is half the battle' is not recognized as Achievement.",
      "Registering Goals without attempting a single one is excluded.",
    ],
    example: "The Insured registered three Goals (exercise, savings, study) but verified none by month-end. Consolation Points are paid; the KRW 30,000 deposit is not refunded.",
  },
};

function html(p, t, en) {
  const defs = en.definitions.map(([k, d], i) => `<tr><td class="num">${i + 1}</td><td class="term">"${k}"</td><td>${d}</td></tr>`).join("");
  const bens = en.benefits.map(([e, b]) => `<tr><td>${e}</td><td>${b}</td></tr>`).join("");
  const exc = en.exclusions.map((x) => `<li>${x}</li>`).join("");

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: "Times New Roman", Georgia, serif; color: #1a1a1a; font-size: 10.5pt; line-height: 1.55; }
  .doc-head { text-align: center; border-bottom: 2.5px double #1a1a1a; padding-bottom: 12px; margin-bottom: 16px; }
  .insurer { font-size: 13pt; font-weight: bold; letter-spacing: 1px; }
  .insurer small { display:block; font-weight: normal; font-size: 8.5pt; letter-spacing: 2px; color:#555; margin-top:2px; }
  .wording { font-size: 9pt; letter-spacing: 3px; color:#777; margin-top:10px; }
  h1 { font-size: 16pt; margin: 4px 0; }
  .subtitle { font-style: italic; color:#555; font-size: 10pt; }
  .meta { display:flex; justify-content:space-between; font-size: 9pt; color:#444; margin-top: 14px; border:1px solid #bbb; padding:8px 12px; }
  h2 { font-size: 11pt; margin: 18px 0 6px; border-bottom: 1px solid #999; padding-bottom: 3px; }
  p { margin: 4px 0; text-align: justify; }
  table { width: 100%; border-collapse: collapse; margin: 6px 0; font-size: 9.5pt; }
  th, td { border: 1px solid #aaa; padding: 6px 9px; text-align: left; vertical-align: top; }
  th { background: #f0f0f0; }
  td.num { width: 26px; text-align:center; color:#666; }
  td.term { white-space: nowrap; font-weight: bold; }
  ol.exc { margin: 4px 0 4px 18px; } ol.exc li { margin: 4px 0; }
  .illus { background:#f7f7f7; border:1px solid #ccc; padding:10px 12px; font-size:9.5pt; }
  .agreement { margin-top: 22px; border: 1.5px solid #1a1a1a; padding: 16px; }
  .agreement h2 { border:none; margin-top:0; }
  .checks { margin: 10px 0; font-size: 11pt; }
  .checks span { margin-right: 40px; }
  .sign-grid { display:flex; justify-content: space-between; margin-top: 26px; gap: 30px; }
  .sign-box { flex:1; }
  .sign-line { border-bottom: 1px solid #1a1a1a; height: 40px; position: relative; }
  .sig { font-family: "Segoe Script", "Brush Script MT", cursive; font-size: 22pt; position:absolute; bottom: 4px; left: 6px; }
  .sign-label { font-size: 8.5pt; color:#555; margin-top: 4px; }
  .foot { margin-top: 18px; font-size: 7.5pt; color: #888; border-top:1px solid #ccc; padding-top: 8px; line-height:1.5; }
  </style></head><body>
  <div class="doc-head">
    <div class="insurer">LAZYLAB INSURANCE CO., LTD.<small>INSTITUTE OF LAZINESS · HANWHA LIFE × LIFE</small></div>
    <div class="wording">POLICY WORDING</div>
    <h1>${en.name}</h1>
    <div class="subtitle">${en.tagline}</div>
  </div>

  <div class="meta">
    <span><b>Policy No.</b> ${t.code}</span>
    <span><b>Monthly Premium</b> ${KRW(p.premium)}</span>
    <span><b>Refundable Deposit</b> ${KRW(p.deposit)}</span>
  </div>

  <h2>Article 1 (Purpose)</h2>
  <p>This Policy sets out the rights and obligations of the contract for the "${en.name}", whereby the Insurer indemnifies the small everyday losses arising from the Insured's laziness and encourages behavioral improvement.</p>

  <h2>Article 2 (Definitions)</h2>
  <table><tr><th class="num">#</th><th>Term</th><th>Definition</th></tr>${defs}</table>

  <h2>Article 3 (Insuring Agreement &amp; Benefits)</h2>
  <table><tr><th>Insured Event</th><th>Benefit Payable</th></tr>${bens}</table>

  <h2>Article 4 (Premium)</h2>
  <p>The monthly premium is ${KRW(p.premium)}, payable automatically each month. Delay in premium payment is itself a form of laziness covered hereunder; however, the contract may be automatically terminated upon two or more consecutive delinquencies.</p>

  <h2>Article 5 (Refundable Deposit)</h2>
  <p>${en.deposit}</p>

  <h2>Article 6 (Exclusions — Events Not Covered)</h2>
  <ol class="exc">${exc}</ol>

  <h2>Article 7 (Claims)</h2>
  <p>The Insured shall claim benefits (consolation points, etc.) through the application within thirty (30) days of the occurrence. Where the claim period lapses due to procrastination, the right to claim shall be extinguished, which is deemed consistent with the purpose of this Policy.</p>

  <h2>Article 8 (Cancellation &amp; Withdrawal)</h2>
  <p>The Insured may withdraw the application within fifteen (15) days of subscription. Where the Insured is "too lazy even to cancel," the contract shall automatically renew, and the resulting premium payment shall be deemed the voluntary intent of the Insured.</p>

  <h2>Article 9 (Illustration)</h2>
  <div class="illus">${en.example}</div>

  <div class="agreement">
    <h2>Policyholder Agreement</h2>
    <p>I have read and understood the terms and conditions of this Policy, including the Exclusions and the Refundable Deposit conditions.</p>
    <div class="checks">
      <span>&#9746; <b>I AGREE</b> to the terms and conditions.</span>
      <span>&#9744; I DO NOT AGREE.</span>
    </div>
    <div class="sign-grid">
      <div class="sign-box">
        <div class="sign-line"><span class="sig">W. Son</span></div>
        <div class="sign-label">Policyholder Signature &nbsp;·&nbsp; Printed Name: WOOJIN SON &nbsp;·&nbsp; Date: 26 June 2026</div>
      </div>
      <div class="sign-box">
        <div class="sign-line"><span class="sig">L. Lab</span></div>
        <div class="sign-label">For and on behalf of LAZYLAB INSURANCE CO., LTD. &nbsp;·&nbsp; Authorized Signatory</div>
      </div>
    </div>
  </div>

  <div class="foot">This document is a PARODY created for the Hanwha Life × LIFE Hackathon. It is not a real insurance policy; no actual enrollment, payment, signature, or benefit arises herefrom. All names, signatures and figures are fictitious.</div>
  </body></html>`;
}

const outDir = path.join(repo, "policies");
fs.mkdirSync(outDir, { recursive: true });
const list = [...PRODUCTS, DEFAULT_PRODUCT];
list.forEach((p) => {
  const t = TERMS[p.id]; const en = EN[p.id];
  if (!t || !en) { console.warn("skip", p.id); return; }
  fs.writeFileSync(path.join(outDir, p.id + ".html"), html(p, t, en), "utf8");
});
console.log("EN policy HTML generated:", list.length, "->", outDir);
list.forEach((p) => console.log("  -", p.id, EN[p.id] ? EN[p.id].name : "(none)"));
