// update.mjs — probe digow.itch.io/bar-brawl for a new embed version.
//
// itch game pages embed the game via
//   https://html-classic.itch.zone/html/<id>/index.html?v=<version>
// A re-upload changes <version> (and may change <id>). Cheap probe: fetch the
// game page, extract the embed URL, compare to .upstream/manifest.json.
//
// usage: node tools/update.mjs [--pull]
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const PAGE = "https://digow.itch.io/bar-brawl";
const manifestPath = path.join(proj, ".upstream/manifest.json");
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0" };
const sha = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

async function fetchText(url) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}
async function fetchBuf(url) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

async function main() {
  const pull = process.argv.includes("--pull");
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : { sourceUrl: PAGE, bundles: [] };

  const page = await fetchText(PAGE);
  const embed = page.match(/https:\/\/html-classic\.itch\.zone\/html\/(\d+)\/index\.html\?v=(\d+)/);
  if (!embed) throw new Error("embed URL not found on game page");
  const [, gameId, version] = embed;
  const base = `https://html-classic.itch.zone/html/${gameId}`;

  const enginePath = path.join(proj, "game/game.min.js");
  const localEngine = fs.existsSync(enginePath) ? sha(fs.readFileSync(enginePath)) : null;
  const liveEngine = sha(await fetchBuf(`${base}/game/game.min.js`));

  console.log(`itch game ${gameId}, embed version ${version}`);
  if (liveEngine === localEngine && !pull) {
    console.log(`same (engine ${liveEngine.slice(0, 12)}) — nothing to do`);
    return;
  }
  console.log(localEngine ? `DRIFT: live engine ${liveEngine.slice(0,12)} != local ${localEngine.slice(0,12)}` : "no local engine yet");

  if (!pull) { console.log("re-run with --pull to download and refresh"); return; }

  // Full refresh: fixed files + asset closure from the engine.
  const engineText = liveEngine === localEngine
    ? fs.readFileSync(enginePath, "utf8")
    : (await fetchBuf(`${base}/game/game.min.js`)).toString("utf8");

  const files = ["index.html", "style.css", "main.js", "game/game.min.js", "game/worker.js",
    "assets/logo.png",
    ...[...new Set([...engineText.matchAll(/"(assets\/[^"]+\.(?:png|ogg))"/g)].map((m) => m[1]))],
    ...["bottle_breaking","dialogue1","dialogue2","dialogue3","draw","fight","gameover","groan_1","groan_2","hit_1","hit_2","huh_1","huh_2","idle","intro_bg","music_menu","music_round","p1_wins","p2_wins","punch_1","punch_2","round1","round2","round3","step_1","step_2","ui","you_lost","you_won","zoomout"].map((n) => `assets/${n}.ogg`)];

  const bundles = [];
  for (const f of [...new Set(files)]) {
    const buf = await fetchBuf(`${base}/${f}`);
    const dst = path.join(proj, f);
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.writeFileSync(dst, buf);
    bundles.push({ file: f, kind: "bundled", url: `${base}/${f}`, sha256: sha(buf), bytes: buf.length });
  }
  console.log(`fetched ${bundles.length} artifacts`);

  fs.writeFileSync(manifestPath, JSON.stringify({
    sourceUrl: PAGE,
    itchEmbed: `${base}/index.html?v=${version}`,
    gameId, version,
    mirroredAt: new Date().toISOString(),
    note: "Served closure of the itch.io embed for Bar Brawl.",
    bundles,
  }, null, 2) + "\n");
  console.log("manifest updated");
  console.log("next: npx js-beautify game/game.min.js -o readable/game.pretty.js && node tools/split.mjs && node tools/verify.mjs");
}
main().catch((e) => { console.error(e.message); process.exit(1); });
