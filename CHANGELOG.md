# Changelog

## 1.0.2 - 2026-11-05

### Added
- Settings: a new "Developer" card with contact links, external-link rows and a build/version
  line. TalkBack-friendly rows (56dp targets), no manifest or permission changes.
- Marketing site: trilingual (Türkçe / English / 简体中文) with a language switcher, `?lang=`
  deep links and a persisted preference. The page no longer distributes the APK.

### Changed
- Version bumped to `1.0.2` (versionCode 3); release re-signed with the project JKS (same certificate).

### Verified
- `:app:compileDebugKotlin` + `:app:testDebugUnitTest` green (16 suites / 140 tests / 0 failures).
- Minified release installed on the API 36 emulator: Settings Developer card renders, contact rows
  open correctly, zero FATAL/ClassNotFound/UnsatisfiedLink (screenshot:
  `docs/phases/screenshots/release-1.0.2-settings-developer.png`).

### Docs
- MIT License added (`LICENSE`) and the README expanded to a complete A-to-Z document.
## 1.0.1 — 2026-11-05

Six user-reported fixes. Sources: this repo's `docs/phases/` evidence + real emulator (Android 16 /
API 36, x86_64) runs. All items are implemented **and verified**, not placeholders.

### 1. Cloudflare Tunnel no longer needs Android DNS hacks (patched resolver)
* Bundled **cloudflared 2026.10.7** is built from the pinned source plus a pinned, hash-checked patch
  (`tunnel/patches/cmd_cloudflared_pockethost_android_dns.go`) that installs a `net.DefaultResolver`
  using plain DNS to **1.1.1.1:53** (fallback **8.8.8.8:53**). A/AAAA/CNAME/SRV now resolve without
  bionic/netd, which fixes cloudflared's SRV edge discovery on Android.
* Production `TunnelManager` therefore starts the tunnel **without `--edge`** (first attempt, 45 s
  bound). `--edge region1/region2.v2.argotunnel.com:7844` remains only as an automatic fallback for
  networks that block plain DNS; `--protocol http2` still used; the old `GODEBUG=netdns=cgo`
  workaround is gone.
* Verified: quick tunnel registered with no `--edge` (manual + production app path) and an external
  host fetched `https://*.trycloudflare.com/` → **HTTP 200** with the served body. The benign
  upstream line `Failed to initialize DNS local resolver` is classified INFO and hidden from the
  user-visible log ring.
* Evidence: `docs/phases/phase-5-cloudflare.md`, `tunnel/build-evidence.json`,
  `tunnel/patches/manifest.json`.

### 2. Latency metrics are internally consistent (p95 ≤ max)
* Replaced the bucketed histogram with a fixed 1024-sample ring of recent request durations;
  `p50`, `p95` and `max` are computed from the same sorted snapshot, so
  **p50 ≤ p95 ≤ max always** (previous build could show `p95 > max` or `max 0` with non-zero
  percentiles). `count` and `avgMs` remain lifetime-exact; JSON shape unchanged.
* Evidence: `engine/internal/metrics/metrics.go` + 9 new invariant/quantile/ring tests
  (`go test ./internal/metrics`), dashboard screenshots
  `docs/phases/screenshots/dashboard-metrics-server-{light,dark}.png`.

### 3. Multi-site absolute assets work for secondary sites (`/s/<id>/`)
* A page served from `/s/<id>/…` that references absolute assets (`/style.css`, `/images/logo.png`,
  fonts) now gets them from **that** site: the router checks a same-origin `Referer` pointing at an
  enabled site's `/s/<id>/` and serves the file from that site's root (still confined by `os.Root`).
  Default-site behaviour, `/s/` prefix routing, Host routing, SPA fallback and 404 page are
  unchanged.
* Verified on-device: `/images/pixel.png` (only the secondary site has it) → **404 without Referer,
  200 `image/png` with `Referer: …/s/pockethost-demo2/`**, default-site assets still win otherwise.
* Evidence: `engine/internal/server/referer.go` + 1 test matrix (20 cases) in
  `engine/internal/server/server_test.go`.

### 4. Screen-off stability: WifiLock added next to the partial wakelock
* `PocketHostService` now acquires a **WifiLock** (`WIFI_MODE_FULL_LOW_LATENCY` on API 29+,
  `WIFI_MODE_FULL_HIGH_PERF` below; tag `PocketHost::wifi`) together with the existing
  `PARTIAL_WAKE_LOCK`, and releases both on every stop path. No new permissions were needed.
* Verified on-device (`dumpsys power` + `dumpsys wifi` + logcat): locks acquired on hosting start,
  HTTP 200 with `mWakefulness=Asleep` (screen off), both released and `Wake Locks: size=0` after
  graceful STOP.
* Evidence: `docs/phases/wakelock-evidence.md`.

### 5. Broken "Ψ" icons replaced
* All **52** UI vector drawables were hand-drawn stroke-only paths that rendered ambiguously
  (tofu/Ψ-like) on some renderers. Replaced with standard **filled Material 24dp** path data
  (`fillColor #FF000000`, Compose tint preserves them), resource names unchanged. Bottom nav
  (Sites globe / Tunnel swap / Dashboard grid / Settings gear), UPTIME + "Hosting since" clock,
  and warning/info/error boxes are now unmistakable filled glyphs; zero `strokeColor` remains.
* Verified by fresh light/dark screenshots in `docs/phases/screenshots/`.

### 6. Tunnel token paste cleaner + warning severity
* New pure-Kotlin `TunnelTokenSanitizer`: pasting `cloudflared service install eyJ…`, a quoted or
  newline-wrapped token yields **only the JWT**, applied on paste and before Save/Connect/consent
  (manual typing unaffected). 10 JVM tests.
* While **CONNECTED** (or connecting with a public URL) a transient message is shown as an **amber
  Warning**; red Error is reserved for real failures. Nothing is hidden, only severity corrected.

### Versions / artifacts
* `versionCode 2`, `versionName 1.0.1` (debug `1.0.1-debug`).
* Release artefact: `dist/PocketHost-1.0.1-arm64.apk` (+ `.sha256` and `.json`), same signing
  scheme, arm64-v8a only, targetSdk 36 / minSdk 26, 16 KB-page aligned.
* Tests at this revision: Go 178 pass (73 top-level), Android JVM **140 pass / 0 failures**
  (16 suites), instrumented e2e suites re-run green.

### Known limitations (unchanged unless noted)
See `docs/KNOWN-LIMITATIONS.md`. Item 13 was rewritten: the DNS workaround is now a **pinned patch
inside the bundled binary**, `--edge` is fallback-only, and it must be re-validated on every
cloudflared upgrade.
