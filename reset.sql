-- 처음부터 다시 시작하고 싶을 때만 실행 (모든 조각과 앨범이 지워져요)
UPDATE state SET count = 0, round = 0, total = 0 WHERE id = 1;
DELETE FROM gallery;
