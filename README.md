# 수억 성장 정원 @우계로357 — 서버판 (학교 전체 조각 함께 세기)

이 폴더를 그대로 올리면, 학생 누구의 휴대폰에서 다짐하든 **학교 전체 조각 수가 하나로 합쳐져** 모두에게 같은 숫자와 그림이 보여요.
무료 서비스 두 개(깃허브, 클라우드플레어)만 있으면 되고, 프로그램 설치는 필요 없어요.

## 폴더 안에 있는 것
| 파일 | 하는 일 |
|---|---|
| `index.html` + 그림 파일들 | 정원 화면 (지금 쓰는 앱과 같아요) |
| `functions/api/[[path]].js` | 조각 수를 세는 서버 (손대지 않아도 돼요) |
| `schema.sql` | 데이터베이스를 처음 만들 때 한 번 실행 |
| `reset.sql` | 처음부터 다시 시작할 때만 실행 |

---

## 1단계. 깃허브에 올리기 (10분)
1. github.com 에 가입하고 로그인해요. (동아리·학교 공용 계정 추천)
2. 오른쪽 위 **＋ → New repository** → 이름 `seongjang357` → **Create repository**
3. 화면의 **uploading an existing file** 을 눌러요.
4. 이 폴더 **안의 파일과 `functions` 폴더를 모두** 끌어다 놓아요. (`functions/api/[[path]].js` 구조가 그대로 올라가야 해요)
5. 아래 **Commit changes** 를 눌러요.

## 2단계. 데이터베이스 만들기 (5분)
1. dash.cloudflare.com 에 가입하고 로그인해요.
2. 왼쪽 메뉴 **저장소 및 데이터베이스(Storage & Databases) → D1 SQL Database → Create**
3. 이름 `seongjang357-db` 로 만들어요.
4. 만든 데이터베이스의 **Console(콘솔)** 탭에 `schema.sql` 내용을 통째로 붙여 넣고 **Execute(실행)** 해요.

## 3단계. 정원 사이트 만들기 (5분)
1. 왼쪽 메뉴 **Workers & Pages → Create(만들기) → Pages → Connect to Git(깃 연결)**
2. 깃허브 계정을 연결하고 `seongjang357` 저장소를 골라요.
3. 설정은 이렇게:
   - Framework preset: **None**
   - Build command: **비워 두기**
   - Build output directory: **/**
4. **Save and Deploy** 를 눌러요. 1~2분 뒤 `https://seongjang357.pages.dev` 같은 주소가 생겨요.

## 4단계. 사이트와 데이터베이스 연결 (3분) — 꼭 해야 해요!
1. 만든 Pages 프로젝트 → **Settings(설정) → Bindings(바인딩) → Add → D1 database**
2. Variable name(변수 이름): **DB** (대문자 그대로)
3. Database: `seongjang357-db` 선택 → **Save**
4. **Deployments(배포)** 탭에서 맨 위 배포의 **⋯ → Retry deployment(다시 배포)** 를 눌러요.

## 5단계. 잘 되는지 확인
1. `https://(내 주소).pages.dev/api/state` 를 열어 `{"count":0,"round":0,...}` 가 보이면 성공이에요.
2. 휴대폰 두 대로 같은 주소를 열고, 한쪽에서 다짐하면 다른 쪽도 10초 안에 숫자가 같이 올라가요.

---

## 운영할 때
- **학생에게 나눠 줄 주소(QR)**: `https://(내 주소).pages.dev` (클로드 링크는 미리보기용이고, 조각이 합쳐지지 않아요)
- **문구·다짐 고치기**: 깃허브에서 `index.html` 을 열어 연필(✏️) 버튼으로 고치고 Commit 하면 1~2분 뒤 자동 반영돼요. 조각 수는 그대로 남아요.
- **지금 몇 조각인지 보기**: D1 콘솔에서 `SELECT * FROM state;`
- **처음부터 다시**: D1 콘솔에서 `reset.sql` 내용 실행 (앨범까지 모두 지워져요)
- **조각 수·그림 순서를 바꿀 때**: `index.html` 맨 위 설정과 `functions/api/[[path]].js` 맨 위 `TOTAL`, `PICTURES` 를 **똑같이** 맞춰 주세요.

## 이렇게 세어요
- 다짐 1번 = 1조각 · 119조각 = 그림 1점 · 그림 3점(357조각) = 앨범 1권
- 여러 학생이 동시에 눌러도 서버가 한 번에 1씩 올려서 조각이 사라지지 않아요.
- 서버에 잠깐 연결이 안 되면 그 기기에만 저장되고, 다시 연결되면 학교 전체 숫자로 돌아와요.

개발 김진희 교장선생님 (문산수억고) · 기술자문 1학년 김태윤, 손지후 (AI융합실험실 동아리)
