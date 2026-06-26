# CLAUDE.md — HANWHA LIFE × LIFE 해커톤

## 이 프로젝트 (덱 요약)
- **솔로 빌드**, 총 2시간 30분 (Round 1 핵심기능 45분 → 점심 → Round 2 폴리시+배포 90분).
- **테마 3개 중 1개** 선택, 소재는 **내 인생**:
  - A. Future Me 2056 (미래의 나 카드) / B. Life Report Card (인생 성적표) / C. Risk Insurance (장난 보험상품)
- **하드 룰: AI 키 없이 작동.** 규칙 + 미리 쓴 텍스트 템플릿으로 결과를 낸다.
- AI 없는 앱 → Netlify URL로 배포 / AI 쓰는 앱 → 로컬 데모.
- 핵심 한 줄: **"입력 → 버튼 → 결과 카드"**.
- 심사 4기준: **Completeness · Creativity · Design · Presentation**. 데모는 화면 시연(3분).

## 에이전트 오케스트레이션
빌드 스프린트용 6개 서브에이전트(`.claude/agents/`). **메인 Claude Code(나)가 오케스트레이터**로서 단계에 맞는 에이전트를 부르고, 결과를 다음 단계로 넘긴다. (서브에이전트끼리는 서로 호출 못 함.)

| 에이전트 | 역할 | 심사기준 | 단계 |
|----------|------|----------|------|
| 💡 `concept-coach` | 테마 선택 + 내 인생→컨셉 한 줄 | Creativity | 시작 전 |
| 🛠 `frontend-builder` | 키 없이 도는 앱, 입력→버튼→결과 작동 | Completeness | Round 1 |
| ✍️ `copy-templater` | 결과 문구 템플릿 작성 (키 없으니 핵심) | Creativity·Completeness | Round 1~2 |
| 🎨 `ui-designer` | 폴리시·모바일·DESIGN.md 적용 | Design | Round 2 |
| 🚀 `deploy-helper` | Netlify 배포 + URL 검증 | Completeness | Round 2 |
| 🎤 `demo-coach` | 3분 시연 대본·동선 | Presentation | Round 2 끝 |

### 기본 파이프라인
```
concept-coach (테마·컨셉 확정)
  → frontend-builder (핵심 한 줄 작동)  ⇄  copy-templater (결과 문구 채우기)
  → ui-designer (폴리시·모바일)
  → deploy-helper (Netlify URL)
  → demo-coach (3분 데모 대본)
```

### 라우팅 규칙
- "테마/컨셉/뭐 만들까" → `concept-coach`
- "만들어줘/기능/에러" → `frontend-builder`
- "결과 문구/멘트/템플릿" → `copy-templater`
- "예쁘게/디자인/모바일" → `ui-designer`
- "배포/Netlify/URL" → `deploy-helper`
- "발표/데모/시연" → `demo-coach`
- "처음부터 같이 하자" → 전체 파이프라인 순서대로

### 운영 메모
- Round 1엔 **작동**만(디자인 미룸). 한 번에 한 단계, 만들면 직접 실행해 확인.
- DESIGN.md(Apple)는 UI 작성 시 레퍼런스.
- `.env`/API 키 커밋·노출 금지 (HANDOFF.md 보안 규칙).
- 작업 폴더: 이 레포(`Hanwha_hackthon_GIP_WJ`).
