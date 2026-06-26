// i18n.js — 한국어(기본) / English 전환 레이어. content/platform/terms-data 뒤, layout 앞에 로드.
(function () {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "en" || q === "ko") localStorage.setItem("lz_lang", q);
})();
window.LANG = localStorage.getItem("lz_lang") || "ko";
window.t = (ko, en) => (window.LANG === "en" ? en : ko);
window.setLang = (l) => { localStorage.setItem("lz_lang", l); location.reload(); };

// 정적 HTML(data-en / data-en-ph) 치환
window.applyStaticI18n = function () {
  if (window.LANG !== "en") return;
  document.querySelectorAll("[data-en]").forEach((el) => { el.innerHTML = el.getAttribute("data-en"); });
  document.querySelectorAll("[data-en-ph]").forEach((el) => { el.setAttribute("placeholder", el.getAttribute("data-en-ph")); });
  document.documentElement.lang = "en";
};

// ===== 영문 상품 데이터 =====
window.EN_PROD = {
  morning: { tag: "Oversleep", name: "Oversleep & Tardiness Insurance", tagline: "You wake up. We make the calls.",
    coverage: ["Up to 3 morning calls on tardiness risk (partner alarm app)", "1,000 P consolation if you're still late", "Full premium refund after 3 days of on-time wake-ups"],
    refund: "100% refund on 3 consecutive on-time wake-ups — practically free", consolation: "Even on failure, a partner-café morning-coffee coupon",
    perks: ["Wake-up streak badge", "Weekly tardiness risk report", "Private concierge chat"],
    profit: [["① Deposit forfeiture", "Most fail within 3 days → the deposit goes to the insurer"], ["② Subscription inertia", "Too lazy to cancel → the laziest customer has the highest LTV"], ["④ Unused perks", "Calls & concierge go unused → near-zero cost"], ["⑦ Partner commission", "Referral fees from partner cafés & alarm apps"]],
    punch: "The more you oversleep, the more deposits pile up." },
  procrastinate: { tag: "Procrastination", name: "Tomorrow-Me Insurance", tagline: "We insure your \"I'll do it tomorrow.\" (Tomorrow never comes.)",
    coverage: ["Up to 5 reminders when procrastination is detected", "2,000 P consolation on missed deadline", "Full deposit refund + badge on completion"],
    refund: "100% deposit refund (KRW 20,000) on completion", consolation: "On failure, a free retry voucher for next month",
    perks: ["Procrastination pattern report", "Weekly motivation message", "Buddy challenge"],
    profit: [["① Deposit forfeiture", "Assume 20% completion → 80% of deposits become revenue"], ["② Subscription inertia", "The 'free retry voucher' auto-extends the subscription"], ["⑩ Referral discount", "Buddy challenges grow sign-ups & the deposit pool"], ["⑥ Float", "The pooled deposits are invested for returns"]],
    punch: "Your habit of putting things off is the company's cash flow." },
  workout: { tag: "Fitness", name: "Ghost-Member Gym Insurance", tagline: "For those who register and never show up — made to make you go.",
    coverage: ["Trainer encouragement push on missing 3x/week", "Protein-bar coupon on a full week of absence", "Full deposit refund on 12 monthly attendances"],
    refund: "100% deposit refund (KRW 30,000) on 12 monthly attendances", consolation: "On failure, a partner-gym 1-day pass",
    perks: ["Attendance streak", "Body-composition graph", "Workout-mate matching"],
    profit: [["① Deposit forfeiture", "Ghost members usually fail 12 visits → deposit recovered"], ["⑦ Partner commission", "Referral fees from partner gyms & protein brands"], ["⑧ Point breakage", "Coupons & points go unused → liabilities written back"], ["⑨ Tier upsell", "Pro tier adds PT perks (unused) → higher ARPU"]],
    punch: "Gyms profit from no-shows. We go one step further." },
  saving: { tag: "Spending", name: "Empty-Wallet Defense Insurance", tagline: "Empty wallet again this month? We insure impulse buys.",
    coverage: ["A 'do you really need this?' alert on late-night purchases", "3,000 P consolation on a missed savings goal", "Full deposit refund + bonus interest on goal achieved"],
    refund: "100% deposit refund (KRW 50,000) on monthly savings goal", consolation: "On failure, 1 month of budgeting-app premium",
    perks: ["Spending pattern report", "Savings challenge", "Ranking badge"],
    profit: [["① Deposit forfeiture", "Can't resist impulse buys → KRW 50,000 deposit recovered"], ["⑥ Float", "The large deposit pool is invested — the core"], ["③ Claim friction", "Claiming consolation is a hassle → claim rate drops"], ["② Subscription inertia", "Never cancels → long-term subscription revenue"]],
    punch: "The less you save, the more deposits accrue to us." },
  latenight: { tag: "Late-night snack", name: "Late-Night Snack Alibi Insurance", tagline: "That 2 a.m. fried chicken — we insure the guilt.",
    coverage: ["A 'tomorrow's regret' alert on opening delivery apps", "Consolation diet-tea coupon if you eat", "Full deposit refund on 5 nights of restraint"],
    refund: "100% deposit refund (KRW 15,000) on restraining 5 nights/week", consolation: "On failure, a partner salad discount coupon",
    perks: ["Late-snack craving journal", "Restraint streak", "Midnight encouragement"],
    profit: [["① Deposit forfeiture", "Temptation wins → deposit recovered"], ["⑦ Partner commission", "Referral fees from partner salad/healthy-food brands"], ["④ Unused perks", "Tea & messages mostly unused → low cost"], ["② Subscription inertia", "Kept out of laziness → recurring revenue"]],
    punch: "Resist and we refund; cave and we profit — we win either way." },
  tidy: { tag: "Tidying", name: "Messy-Room Escape Insurance", tagline: "'I'll clean it'… three weeks later. We insure that.",
    coverage: ["A 'just 10 minutes today' alert on 7-day neglect", "Cleaning-supply points on mission failure", "Full deposit refund on 3 weekly verifications"],
    refund: "100% deposit refund (KRW 10,000) on 3 weekly cleaning verifications", consolation: "On failure, a partner cleaning-service discount",
    perks: ["Cleaning streak", "Before & after gallery", "Roommate challenge"],
    profit: [["① Deposit forfeiture", "Verification itself is a hassle → deposit recovered"], ["③ Claim friction", "Photo proof is tedious → fewer refund claims"], ["⑦ Partner commission", "Referral fees from partner cleaning services"], ["⑧ Point breakage", "Cleaning-supply points expire unused"]],
    punch: "The lazier the verification, the fewer the refunds." },
  study: { tag: "Study", name: "Self-Development Insurance", tagline: "That online course you paid for but never watch — we make you finish it.",
    coverage: ["Progress reminder + mentor message on a 3-day lapse", "2,000 P consolation on falling short", "Full deposit refund + badge on completion"],
    refund: "100% deposit refund (KRW 30,000) on reaching your study target", consolation: "On failure, a partner course discount coupon",
    perks: ["Study streak", "Weekly progress report", "Study-mate matching"],
    profit: [["① Deposit forfeiture", "Completion rates are always low → deposit recovered"], ["⑨ Tier upsell", "Premium adds mentoring perks (unused) → higher ARPU"], ["⑦ Partner commission", "Referral fees from partner course platforms"], ["② Subscription inertia", "'I'll study someday' self-belief keeps you subscribed"]],
    punch: "'I'll watch it someday' is the most expensive subscription." },
  contact: { tag: "Relationships", name: "Ghosting-Prevention Insurance", tagline: "For those who delay replies until they ghost — we insure the relationship.",
    coverage: ["A 'reply now' alert on unanswered messages", "Gift-voucher recommendation on a neglect warning", "Full deposit refund on the weekly check-in mission"],
    refund: "100% deposit refund (KRW 10,000) on the weekly check-in mission", consolation: "On failure, a partner flower/gift-voucher discount",
    perks: ["Relationship thermometer", "Check-in streak", "Anniversary alerts"],
    profit: [["① Deposit forfeiture", "Too lazy even to reply → mission fails → deposit recovered"], ["⑦ Partner commission", "Referral fees from partner gift/flower services"], ["④ Unused perks", "Thermometer & alerts rarely used → low cost"], ["② Subscription inertia", "Relationship anxiety keeps you from cancelling"]],
    punch: "People who procrastinate also procrastinate cancelling." },
  all: { tag: "Comprehensive", name: "Comprehensive Laziness Insurance", tagline: "Whatever you're lazy about, we cover it — laziness itself.",
    coverage: ["Reminders for every 'I'll do it later'", "Consolation points on any failed resolution", "Full deposit refund on achieving at least 1 monthly goal"],
    refund: "100% deposit refund (KRW 30,000) on achieving 1+ monthly goal", consolation: "On failure, an all-in-one partner discount pack",
    perks: ["Laziness overview report", "All-in-one streak", "All-category challenge"],
    profit: [["① Deposit forfeiture", "Many achieve zero goals → deposit recovered"], ["② Subscription inertia", "All-in-one 'just keep it' psychology → long retention"], ["⑥ Float", "A broad pool of deposits is invested for returns"], ["⑦ Partner commission", "Referral fees across all categories"]],
    punch: "Laziness isn't a risk — it's our business model." },
};

// 영문 매칭 키워드 (영어 입력 지원)
window.EN_KEYWORDS = {
  morning: ["oversleep", "wake", "alarm", "morning", "late", "snooze"],
  procrastinate: ["procrast", "later", "postpone", "delay", "tomorrow", "put off"],
  workout: ["gym", "workout", "exercise", "fitness", "diet", "weight"],
  saving: ["money", "save", "spend", "shopping", "broke", "wallet", "impulse"],
  latenight: ["snack", "midnight", "chicken", "delivery", "ramen", "eat", "night"],
  tidy: ["clean", "tidy", "mess", "room", "laundry", "dishes"],
  study: ["study", "english", "word", "memoriz", "exam", "course", "lecture", "read", "book", "forget"],
  contact: ["reply", "message", "text", "ghost", "contact", "call", "friend"],
};

// ===== 영문 약관 데이터 (product.html 용) =====
window.EN_TERMS = {
  morning: { target: "Individuals aged 19+ who dismiss alarms and fall back asleep",
    definitions: [["Successful Wake-Up", "Activity verification (50+ steps or a selfie) within 30 minutes of dismissing the alarm."], ["Tardiness Risk", "Detected as not-yet-awake within 10 minutes before the scheduled wake-up time."], ["Morning Call", "An automated voice/push call via a partner alarm app."]],
    benefits: [["Upon Tardiness Risk", "Up to 3 automated Morning Calls."], ["Upon failure to verify (tardiness)", "1,000 P consolation."], ["Upon 3 consecutive wake-ups", "Full monthly-premium refund."]],
    exclusions: ["Weekend/holiday oversleeping is deemed voluntary rest and not covered.", "Setting 4+ alarms and dismissing all is willful laziness, excluded.", "Skipping verification out of idleness is treated as 'no verification = no wake-up'.", "Oversleeping from intoxication is excluded without the optional Drinking Rider."],
    deposit: "A KRW 10,000 refundable deposit applies, refunded on 3 consecutive on-time wake-ups; a single failure forfeits it.",
    example: "The Insured succeeded Tue/Wed but woke at 09:00 Thu, failing 3 consecutive wake-ups. 1,000 P is paid; the deposit is not refunded." },
  procrastinate: { target: "Individuals whose catchphrase is 'I'll do it tomorrow'",
    definitions: [["Goal", "A single task registered at enrollment."], ["Procrastination Detection", "Verified incomplete up to 24h before the deadline."], ["Completion", "Completion verification within the deadline."]],
    benefits: [["Upon detection", "Up to 5 reminders."], ["Upon overrun", "2,000 P consolation."], ["Upon completion", "Full deposit refund + badge."]],
    exclusions: ["'Almost done' is not recognized as Completion.", "Self-extending the deadline is excluded.", "Blocking reminders voids coverage.", "Goals like 'resting' are ineligible."],
    deposit: "A KRW 20,000 refundable deposit applies, refunded on completion; otherwise forfeited.",
    example: "Goal 'submit résumé' repeated 'tomorrow' 3x and failed. 2,000 P is paid, deposit forfeited, retry voucher auto-issued." },
  workout: { target: "Individuals likely to visit ≤3 times after a gym sign-up",
    definitions: [["Attendance", "Partner check-in or a 30+ min workout-app record."], ["Ghost Member", "A subscriber with <3 monthly attendances."], ["Target", "12+ monthly attendances."]],
    benefits: [["On <3 weekly attendances", "Trainer encouragement push."], ["On a full week absent", "Protein-bar coupon."], ["On 12 monthly attendances", "Full deposit refund."]],
    exclusions: ["'Intending to go' is not Attendance.", "Turning back at the entrance is excluded.", "Posting photos without working out is excluded.", "Injury is handled under the Rest Rider with a certificate."],
    deposit: "A KRW 30,000 refundable deposit applies, refunded on 12 monthly attendances; otherwise not refunded.",
    example: "Attended twice in a month vs. a target of 12. A protein-bar coupon is given; the deposit is not refunded." },
  saving: { target: "Individuals whose balance drains via impulse buys after payday",
    definitions: [["Impulse Purchase", "A single late-night (23:00–03:00) payment over KRW 50,000."], ["Savings Goal", "The monthly target registered at the start."], ["Empty Wallet", "Month-end balance below target."]],
    benefits: [["On a late-night payment attempt", "A 'really?' warning."], ["On a missed goal", "3,000 P consolation."], ["On goal achieved", "Full deposit refund + bonus interest."]],
    exclusions: ["'Stress shopping' is grounds for exclusion.", "Cart items aren't covered (no purchase).", "Paying after the warning halves the consolation.", "Investment/crypto losses are not covered."],
    deposit: "A KRW 50,000 refundable deposit applies, refunded on goal; otherwise forfeited, with float returns to the Insurer.",
    example: "Targeted KRW 300,000 but fell short via 2 impulse buys. 3,000 P is paid; the deposit is not refunded." },
  latenight: { target: "Individuals who frequently open delivery apps late at night",
    definitions: [["Late-Night Snack", "A delivery order or instant-noodle cooking 23:00–05:00."], ["Successful Restraint", "Verified non-ordering during the window."]],
    benefits: [["On a late-night app launch", "A 'tomorrow's regret' alert."], ["On eating", "Consolation diet-tea coupon."], ["On 5 nights of restraint", "Full deposit refund."]],
    exclusions: ["'Just one bite' is not recognized.", "A friend's treat is reviewed as third-party inducement.", "Hangover snacks need the Drinking Rider.", "Convenience-store buys are reviewed separately."],
    deposit: "A KRW 15,000 refundable deposit applies, refunded on 5 nights of restraint; one detected snack forfeits it.",
    example: "Restrained Thu/Fri/Sat but ordered at 02:00 Sun, failing. A tea coupon is given; the deposit is not refunded." },
  tidy: { target: "Individuals who put off cleaning for 3+ weeks",
    definitions: [["Cleaning Verification", "Before/after photo proof of tidying."], ["Neglect", "7+ days without verification."]],
    benefits: [["On 7-day neglect", "A 'just 10 minutes' alert."], ["On failure", "Cleaning-supply points."], ["On 3 weekly verifications", "Full deposit refund."]],
    exclusions: ["'If I can't see it, it's clean' is not accepted.", "Stuffing into drawers isn't tidying.", "Hiding clutter via angle voids coverage.", "Cleaning by others isn't your verification."],
    deposit: "A KRW 10,000 refundable deposit applies, refunded on 3 weekly verifications; otherwise not refunded.",
    example: "Only 2 weekly verifications vs. 3. Points are given; the deposit is not refunded." },
  study: { target: "Individuals who buy courses but never finish, or delay memorizing",
    definitions: [["Study Verification", "One lecture done or a 30-min focused record."], ["Course Completion", "100% of the enrolled course."], ["Memorization Goal", "A daily word/volume target."]],
    benefits: [["On a 3-day lapse", "Reminder + mentor message."], ["On falling short", "2,000 P consolation."], ["On completion", "Full deposit refund + badge."]],
    exclusions: ["Leaving a lecture at 4x isn't study.", "Buying a textbook (unboxing) isn't covered.", "'Getting inspired' can't be reported as study.", "Failed cramming the night before is your own responsibility."],
    deposit: "A KRW 30,000 refundable deposit applies, refunded on reaching the target; otherwise not refunded.",
    example: "Aimed for 30 words/day but 'kept forgetting,' failing 3 days. 2,000 P is paid; the deposit is not refunded." },
  contact: { target: "Individuals who delay replies until they ghost",
    definitions: [["Check-In Mission", "A weekly check-in message to a designated contact."], ["Ghosting", "No response to an important contact for 48h+."]],
    benefits: [["On an unanswered contact", "A 'reply now' alert."], ["On a neglect warning", "A gift-voucher recommendation."], ["On the weekly mission", "Full deposit refund."]],
    exclusions: ["'Read and ignored' isn't a response.", "A single emoticon isn't a check-in.", "A drafted-but-unsent reply is excluded.", "If the other ghosted first, it's reviewed as mutual fault."],
    deposit: "A KRW 10,000 refundable deposit applies, refunded on the weekly mission; otherwise not refunded.",
    example: "Drafted a check-in but never sent it, failing. A voucher is recommended; the deposit is not refunded." },
  all: { target: "Individuals lazy across the board, regardless of category",
    definitions: [["Goal", "Any resolution/task across categories."], ["Achievement", "Verified completion of 1+ monthly goal."]],
    benefits: [["On any 'I'll do it later'", "Category reminders."], ["On any failed resolution", "Consolation points."], ["On 1+ monthly goal", "Full deposit refund."]],
    exclusions: ["All individual-policy exclusions apply mutatis mutandis.", "'Starting is half the battle' isn't Achievement.", "Registering goals without one attempt is excluded."],
    deposit: "A KRW 30,000 refundable deposit applies, refunded on 1+ goal; zero goals forfeits it.",
    example: "Registered 3 goals but verified none. Points are paid; the deposit is not refunded." },
};

// ===== 영문 플랫폼 콘텐츠 =====
window.EN_SHORTCUTS = { "가입 혜택": "Benefits", "늦잠": "Oversleep", "미루기": "Procrastinate", "운동": "Workout", "공부": "Study", "제휴 혜택": "Partners" };
window.EN_SHORTCUT_FILL = { "아침에 자주 늦잠을 잔다": "I often oversleep in the morning", "할 일을 자꾸 내일로 미룬다": "I keep putting things off till tomorrow", "헬스장 등록만 하고 안 간다": "I sign up for the gym but never go", "인강 결제만 하고 안 듣는다": "I pay for online courses but never watch" };
window.EN_BANDS = ["KRW 3,900 tier", "KRW 4,900 tier", "KRW 5,900 tier", "KRW 6,900 tier", "+ View all"];
window.EN_CHIPS = [["😴 Oversleep", "I often oversleep in the morning"], ["📝 Procrastinate", "I keep putting things off till tomorrow"], ["🏋️ Workout", "I sign up for the gym but never go"], ["💸 Broke", "I impulse-buy on payday and go broke"], ["🍗 Snacks", "I order late-night snacks every night"], ["🧹 Tidy", "I keep putting off cleaning my room"], ["📚 Study", "I pay for online courses but never watch"], ["💬 Replies", "I keep delaying my replies"]];

window.EN_CASES = [
  { name: "An office worker", date: "2026-06-20", title: "3 days of on-time wake-ups — full KRW 10,000 deposit refunded", badge: "Refund Success", designer: "Agent Kim",
    desc: "I used to set 3 alarms and still oversleep… thanks to 3 morning calls I made it to work on time 3 days straight.",
    situation: "I set 3–4 alarms daily and still turned them all off, hitting 8 tardies a month. Cab fares were piling up.",
    prescription: "I enrolled in the Oversleep & Tardiness Insurance, staked a KRW 10,000 deposit, and set 3 partner morning calls plus selfie verification.",
    result: "The first two days were close, but the 3rd morning call snapped me awake. I hit 3 on-time wake-ups and got my deposit back the next business day." },
  { name: "K, the procrastinator", date: "2026-06-18", title: "Submitted a long-delayed résumé an hour before the deadline", badge: "Goal Achieved", designer: "Agent Lee",
    desc: "On the 5th reminder I finally submitted. Got my KRW 20,000 deposit back and even got hired.",
    situation: "I'd repeated 'I'll do it tomorrow' for three weeks on my résumé as the deadline loomed.",
    prescription: "I enrolled in Tomorrow-Me Insurance, registered 'submit résumé' as my single goal, and staked KRW 20,000.",
    result: "The 5th reminder got me moving and I submitted an hour before the deadline — full refund, plus a job offer." },
  { name: "J, the ghost member", date: "2026-06-15", title: "Hit 12 monthly attendances — gym membership revived", badge: "Deposit Refunded", designer: "Agent Park",
    desc: "The trainer's encouragement pushes were surprisingly effective. I filled a whole month for the first time.",
    situation: "I signed up at the start of the year but attended 3 times in two months — a classic ghost member.",
    prescription: "I enrolled in Ghost-Member Gym Insurance, staked KRW 30,000, and targeted 3 weekly check-ins.",
    result: "Thanks to the pushes and the attendance streak, I hit 12 monthly visits and got the full deposit back." },
  { name: "P, the broke one", date: "2026-06-11", title: "Zero late-night impulse buys — monthly savings goal achieved", badge: "Refund Success", designer: "Agent Choi",
    desc: "I kept freezing in front of the 'do you really need this?' alert… and ended up saving KRW 300,000.",
    situation: "Every payday turned into late-night shopping and an empty wallet; my monthly savings were zero.",
    prescription: "I enrolled in Empty-Wallet Defense Insurance, staked KRW 50,000, and set a KRW 300,000 savings goal with late-night alerts.",
    result: "I froze at every warning, so impulse buys hit zero. I achieved the goal and got my deposit back plus bonus interest." },
];

window.EN_REVIEWS = [
  { who: "Mr. Oh", rating: 5, text: "It's oddly comforting to have my own laziness insured. The morning calls cut my tardiness." },
  { who: "Mr. Bae", rating: 5, text: "I do it just to avoid losing the deposit. Weirdly effective. Highly recommend." },
  { who: "Ms. Jung", rating: 4, text: "The product copy is hilarious yet serious — it made me want to sign up." },
  { who: "Mr. Han", rating: 5, text: "This ghost member filled a whole month. The pushes are surprisingly motivating." },
  { who: "Ms. Shin", rating: 4, text: "The impulse-buy warning really makes you pause. Escaped the empty-wallet life." },
  { who: "Mr. Yoon", rating: 4, text: "The fun of earning a diet-tea coupon for resisting late-night snacks is real." },
  { who: "Ms. Lim", rating: 5, text: "I clean just to fill the before & after gallery." },
  { who: "Mr. Jo", rating: 4, text: "I used to delay replies and ghost people — the check-in mission restored my relationships." },
  { who: "Mr. Kang", rating: 5, text: "Signed up for the comprehensive plan; it covers my laziness across the board. Satisfied." },
];

window.EN_ARTICLES = [
  { reporter: "Haechan Kim", category: "Life & Science", title: "Five alarms make it harder to wake up? Laziness study released",
    body: ["The habit of setting multiple alarms may actually hinder waking up, a new study finds.", "Among 2,000 people surveyed by the Institute of Laziness, those setting 5+ alarms had an on-time wake-up rate of just 18% — less than half of the single-alarm group (41%).", "\"The more alarms, the more the brain relaxes, reading it as 'I can sleep more,'\" an official said. \"Setting one and placing it far from the bed works better.\"", "Meanwhile, the Oversleep & Tardiness Insurance reflecting this finding passed 1,200 subscribers within a month of launch."] },
  { reporter: "Doyoon Lee", category: "Society", title: "How many days later do we actually do the tasks we put off?",
    body: ["A task put off with 'I'll do it tomorrow' is actually done, on average, 8.4 days later.", "23% of postponed tasks were never done and simply disappeared — respondents called it 'natural decay.'", "\"Procrastination is less about willpower than about start-up cost,\" an expert said. \"Pairing deadlines with small rewards greatly raises follow-through.\""] },
  { reporter: "Seojin Park", category: "Life & Science", title: "The science of three-day resolutions — what happens on day three",
    body: ["The Korean saying that resolutions fail within three days has a scientific basis.", "\"Motivation hormones for a new behavior plummet about 72 hours later,\" researchers said. \"Day three is the hump.\"", "\"Breaking goals and rewards into 3-day chunks is effective for getting over it,\" they advised."] },
  { reporter: "Yuna Choi", category: "Economy", title: "Gym ghost members: national average attendance is shocking",
    body: ["So-called 'ghost members' who register but never go average just 19% monthly attendance.", "\"The gym revenue model itself is built on ghost members,\" an industry insider noted.", "Recently, deposit-based insurance products that refund you for verified attendance are drawing attention as an alternative."] },
  { reporter: "Mingyu Jung", category: "Economy", title: "Which product has the top deposit-refund rate? This month's tally",
    body: ["This month's top deposit-refund rate went to the Oversleep & Tardiness Insurance (31%).", "The Empty-Wallet Defense Insurance ranked last at 12%, making resisting impulse buys the hardest mission.", "\"The lower the refund rate, the more deposits stay with the company,\" the institute said with a smile."] },
  { reporter: "Jiwoo Han", category: "Life", title: "Late-night snack restraint fails most often on… Friday",
    body: ["An analysis of weekly failure rates found Friday highest at 38%.", "\"Friday-night delivery-app launches are double a weekday's as the week's tension unwinds,\" the analysis said.", "\"Managing Friday alone markedly raises weekly success,\" an expert advised."] },
  { reporter: "Sehun Oh", category: "Society", title: "Is laziness hereditary? We asked an expert",
    body: ["Does 'my whole family is lazy' have scientific grounds?", "\"Genetic disposition has some effect, but environment and habit design matter far more,\" the expert said.", "\"Rather than blaming laziness, it's more practical to set up devices that make action easy,\" they added."] },
  { reporter: "Gaeun Yoon", category: "Life", title: "Tidying verification photos: shoot them this way and you're excluded (caution)",
    body: ["As 'hiding mess with camera angles' spread among tidying-insurance subscribers, the institute issued a caution.", "Per the terms, 'concealing clutter via camera angle voids coverage,' and stuffing items into drawers isn't recognized as tidying.", "\"Please shoot before & after from the same angle,\" an official requested."] },
];

// ===== 지역화 접근자 =====
window.LP = function (p) { const e = (window.EN_PROD || {})[p.id]; return window.LANG === "en" && e ? Object.assign({}, p, e) : p; };
window.LMETA = function (id) {
  const m = (typeof PRODUCT_META !== "undefined" && PRODUCT_META[id]) || {};
  const e = (window.EN_PROD || {})[id];
  return window.LANG === "en" && e ? Object.assign({}, m, { tag: e.tag }) : m;
};
window.LT = function (id) {
  const ko = (typeof TERMS !== "undefined" && TERMS[id]) || {};
  const e = (window.EN_TERMS || {})[id];
  if (window.LANG === "en" && e) return Object.assign({}, ko, e); // code는 ko에서 유지
  return ko;
};
// 영어 입력까지 고려한 매칭
window.matchProductL = function (text) {
  const p = matchProduct(text);
  if (p.id !== "all") return p;
  const tt = (text || "").toLowerCase();
  const ek = window.EN_KEYWORDS || {};
  for (const id in ek) { if (ek[id].some((k) => tt.includes(k))) { const f = [...PRODUCTS, DEFAULT_PRODUCT].find((x) => x.id === id); if (f) return f; } }
  return p;
};
