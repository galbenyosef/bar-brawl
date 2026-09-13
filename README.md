# Bar Brawl — offline mirror

Full mirror of **Bar Brawl** by digow (itch.io): a 1-v-1 pixel-art bar-fight
game — punch/kick/crouch fighters in a bar stage, frame-accurate SFX, menu
flow, and online multiplayer over WebRTC with Supabase realtime signaling.

Source: https://digow.itch.io/bar-brawl
Embed: https://html-classic.itch.zone/html/19181675/ (game ID 19181675)

![bar-brawl](docs/cover.png)

## Layout

- `index.html`, `style.css`, `main.js`, `game/`, `assets/` — served files, byte-exact
  - `main.js` is the author's own hand-written boot file (FighterEngine + 60 Hz Worker tick loop)
  - `game/worker.js` is the author's own tick worker
- `assets/` — 7 sprite/stage sheets + 30 `.ogg` sounds (punches, groans, rounds, music)
- `readable/game.pretty.js` — prettified view of `game/game.min.js` (2,691 lines)
- `src/` — 7 class-based slices cut from the spec:

| Slice | Contents |
|---|---|
| `00-primitives` | circle & rotated-rect collision primitives |
| `01-fighter` | Fighter: sprite animations, per-move cooldowns, hit boxes |
| `02-engine` | FighterEngine core: Begin/Reset, round management |
| `03-input` | keyboard mapping + input-sequence history (netcode recovery) |
| `04-menu` | intro/logo/menu screens, pixel-text UI |
| `05-multiplayer` | WebRTC + Supabase signaling (live-only; offline reports no connection) |
| `06-game-render` | match renderer, frame-accurate SFX director, camera, win/lose flow |

## Multiplayer note

The netcode connects to the author's Supabase signaling endpoint
(publishable key embedded in the source). Offline, single-player mode plays
fully; online mode reports no connection.

## Updating

```
node tools/update.mjs          # probe the itch embed version param; --pull refreshes
node tools/split.mjs           # re-cut src/ from the spec
node tools/verify.mjs          # byte-exact check
```

itch embeds are versioned by the `?v=` query parameter on the game page — the
probe compares the game page's embed URL and the engine hash, so a no-change
check is two small requests.
