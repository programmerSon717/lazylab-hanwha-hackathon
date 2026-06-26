# 🤝 HANDOFF — 팀 인계 & 협업 가이드

> AI 해커톤 · 6인 팀 협업 문서
> 이 문서 하나로 **(A) 팀 합류 방법**과 **(B) 현재 진행 상황**을 모두 파악할 수 있습니다.
> 최종 수정: 2026-06-26

---

## 0. TL;DR (3줄 요약)

- 팀원 각자 **본인 GitHub 계정 1개** + **공용 저장소 1개**를 함께 사용합니다.
- `main`에 직접 push 금지 → **본인 브랜치에서 작업 → PR로 병합**.
- **`.env`(API 키) 절대 커밋 금지.** AI 해커톤 최다 사고 1위입니다.

---

# A. 팀 온보딩 & 개발 규칙

## A-1. 사전 준비 (각자 1회)

| 항목 | 확인 방법 | 비고 |
|------|-----------|------|
| GitHub 계정 | github.com 로그인 | 없으면 회원가입 |
| Git 설치 | `git --version` | 없으면 설치 |
| GitHub CLI(gh) | `gh --version` | 선택(권장) |
| 계정 인증 | `gh auth status` | `gh auth login`으로 로그인 |
| 커밋 신원 | `git config --global user.name` / `user.email` | 아래 A-2 참고 |

## A-2. 커밋 신원 설정

```bash
git config --global user.name  "본인-GitHub-아이디"
git config --global user.email "본인-이메일"   # 비공개 권장: ID+아이디@users.noreply.github.com
```

## A-3. 저장소 받기 (클론)

```bash
git clone https://github.com/<팀-또는-소유자>/<레포명>.git
cd <레포명>
```

## A-4. 브랜치 전략 (충돌 최소화의 핵심)

```
main            ← 항상 동작하는 안정 버전 (직접 push 금지)
 └─ feature/이름-기능   ← 각자 작업 브랜치
```

- 브랜치 생성: `git switch -c feature/son-login`
- 명명 규칙: `feature/<이름>-<기능>`, `fix/<이름>-<버그>`

## A-5. 작업 흐름 (하루 사이클)

```bash
# 1) 최신 main 받아오기
git switch main && git pull

# 2) 작업 브랜치로 이동(또는 생성)
git switch -c feature/son-기능

# 3) 작업 후 커밋
git add .
git commit -m "feat: 로그인 화면 추가"

# 4) 원격에 올리기
git push -u origin feature/son-기능

# 5) GitHub에서 Pull Request 생성 → 팀원 리뷰 → main 병합
```

## A-6. 커밋 메시지 컨벤션

| 태그 | 용도 | 예시 |
|------|------|------|
| `feat` | 새 기능 | `feat: 챗봇 응답 API 연동` |
| `fix` | 버그 수정 | `fix: 토큰 만료 처리` |
| `docs` | 문서 | `docs: README 업데이트` |
| `refactor` | 리팩터링 | `refactor: 함수 분리` |
| `chore` | 설정/잡일 | `chore: gitignore 추가` |

## A-7. ⚠️ 절대 규칙 (보안)

- **`.env`, API 키, 토큰, 비밀번호 → 절대 커밋 금지.** `.gitignore`에 반드시 포함.
- 키는 팀 채팅/노션 등 **저장소 밖**에서 공유.
- 큰 파일(모델 가중치, 데이터셋)은 커밋하지 말고 별도 스토리지/링크 공유.
- 실수로 키를 커밋했다면 → **즉시 키 폐기(재발급)** 후 팀에 공지. (히스토리에서 지워도 노출된 키는 죽은 키로 간주)

---

# B. 현재 진행 상황 (Status Handoff)

## B-1. 지금까지 완료된 것 ✅

- [x] 로컬 개발 환경: Git 2.54, GitHub CLI 2.95 설치 (Windows)
- [x] GitHub 계정 연동 완료 — `programmerSon717`
- [x] 커밋 신원 설정 (비공개 noreply 이메일)
- [x] 기본 브랜치 `main` 설정

## B-2. 진행 중 / 대기 🔄

- [ ] **공용 저장소 생성** — *팀원이 생성 예정* (담당: `채워주세요`)
- [ ] `programmerSon717` collaborator 초대 & 수락
- [ ] 저장소 클론

## B-3. 아직 미정 / 결정 필요 ❓

| 항목 | 상태 | 결정 필요 |
|------|------|-----------|
| 프로젝트 주제 | 미정 | `채워주세요` |
| 기술 스택 | 미정 | 웹/Python/혼합 등 |
| 저장소 방식 | 미정 | Organization vs 개인 repo |
| 역할 분담 | 미정 | 아래 B-4 |

## B-4. 팀원 & 역할

| 이름 | GitHub 아이디 | 담당 | 비고 |
|------|---------------|------|------|
| (나) | `programmerSon717` | `채워주세요` | 개인전 — 단독 진행 |

## B-5. 다음 액션 (Next Steps)

1. 팀원이 공용 저장소 생성 → 5명 collaborator 초대
2. 각자 클론 후 A-5 흐름대로 작업 시작
3. 프로젝트 주제 & 기술 스택 확정 → `.gitignore` / 폴더 구조 세팅
4. README.md 채우기

---

## 📎 참고 명령어 모음

```bash
gh auth status                 # 로그인 상태 확인
gh repo clone <owner>/<repo>   # 저장소 클론
git status                     # 변경사항 확인
git switch main && git pull    # main 최신화
git switch -c feature/이름-기능 # 새 브랜치
git log --oneline -10          # 최근 커밋 10개
```
