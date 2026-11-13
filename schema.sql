-- 수억 성장 정원: D1 데이터베이스 처음 만들 때 한 번 실행
CREATE TABLE IF NOT EXISTS state (
  id INTEGER PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,  -- 지금 그림에 모인 조각 (0~118)
  round INTEGER NOT NULL DEFAULT 0,  -- 완성한 그림 수
  total INTEGER NOT NULL DEFAULT 0   -- 지금까지 모인 다짐 전체
);
INSERT OR IGNORE INTO state (id) VALUES (1);
CREATE TABLE IF NOT EXISTS gallery (
  round INTEGER PRIMARY KEY,         -- ver 번호
  date TEXT,                         -- 완성 날짜
  pic TEXT                           -- 완성 그림 파일
);
