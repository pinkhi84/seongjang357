// 수억 성장 정원 서버 (Cloudflare Pages Functions + D1)
// 주소: /api/state (지금 상태 보기), /api/pledge (다짐 1조각 저금)
const TOTAL = 119;                                   // 그림 1점 = 119조각 (index.html 설정과 같게)
const PICTURES = ["pic1.png", "pic2.png", "pic3.png"]; // 완성 그림 순서 (index.html 설정과 같게)

const json = (data) => new Response(JSON.stringify(data), {
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

async function readState(db, extra = {}) {
  const s = await db.prepare("SELECT count, round, total FROM state WHERE id = 1").first();
  const g = await db.prepare("SELECT round, date, pic FROM gallery ORDER BY round").all();
  return json({ ...s, gallery: g.results, ...extra });
}

export async function onRequest({ request, env }) {
  const db = env.DB;
  if (!db) return json({ error: "D1 데이터베이스가 연결되지 않았어요 (변수 이름 DB)" });
  const path = new URL(request.url).pathname.replace(/^\/api\/?/, "");

  if (path === "state" && request.method === "GET") return readState(db);

  if (path === "pledge" && request.method === "POST") {
    // 한 번에 1씩 올려서 여러 학생이 동시에 눌러도 조각이 사라지지 않아요
    const r = await db.prepare(
      "UPDATE state SET count = count + 1, total = total + 1 WHERE id = 1 RETURNING count, round"
    ).first();
    let completed = false;
    if (r.count >= TOTAL) {
      const done = await db.prepare(
        "UPDATE state SET count = count - ?1, round = round + 1 WHERE id = 1 AND count >= ?1 AND round = ?2 RETURNING round"
      ).bind(TOTAL, r.round).first();
      if (done) {
        completed = true;
        const date = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10); // 한국 날짜
        await db.prepare("INSERT OR IGNORE INTO gallery (round, date, pic) VALUES (?1, ?2, ?3)")
          .bind(done.round, date, PICTURES[(done.round - 1) % PICTURES.length]).run();
      }
    }
    return readState(db, { completed });
  }
  return new Response("not found", { status: 404 });
}
