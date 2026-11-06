# Changelog

## 1.1.4 - 2026-11-06

### Changed
- **Development tier now allows 1 static website + 3 port proxies** (was 1 proxy). Termux users
  typically run several dev servers at once (Vite `:5173`, API `:3000`, PHP `:8000`), so the proxy
  slot was the real bottleneck. Static-site quota stays at 1; the two quotas remain independent.
- Tier copy updated everywhere: Sites footer, Add-port-proxy "slot in use" notice, and the
  `PlanPolicy.PROXY_LIMIT_MESSAGE` ("Development tier allows 3 port proxies…").
- Version 1.1.4 (versionCode 11); release re-signed with the project JKS.

### Verified
- JVM: 207 tests / 23 suites, 0 failures — `PlanPolicyTest` now covers 3 accepted proxies, the
  4th rejected, and both independent quotas filled.
- Emulator: Sites footer shows "1 website · 3 port proxies"; Add-port-proxy shows "0 of 3".
- Release artefact: `dist/PocketHost-1.1.4-arm64.apk`, SHA-256
  `56f4398a3f229774ed23a71745f7a59baee6899c60583022ae82a2f5979e0b15`.

## 1.1.3 - 2026-11-06

### Added
- **Per-proxy upstream Host mode.** Open a proxy site → Serving options → **Upstream Host header**:
  `Preserve client` (default; original Host + X-Forwarded-Host) or `Upstream loopback`
  (`127.0.0.1:<port>` for Vite `allowedHosts`, localhost-only dev servers, ...). Each proxy stores
  its own choice; the running engine hot-applies it via the normal site sync — no restart needed.
- **Settings → Default proxy Host** sets the initial mode for **newly added** proxies only; existing
  proxies keep their per-site setting.

### Changed
- Version 1.1.3 (versionCode 10); release re-signed with the project JKS.
- Room schema v3 with an additive `MIGRATION_2_3` (`sites.upstreamHostMode TEXT NOT NULL DEFAULT
  'preserve'`); existing proxies keep the 1.1.2 preserve behaviour on upgrade.
- README/KNOWN-LIMITATIONS/phase-8 updated for per-proxy Host selection.

### Verified
- Go: 103 top-level / 254 test+subtest PASS, 0 failures (engine unchanged; already accepted the
  per-site `upstreamHostMode` field).
- JVM: 207 tests / 23 suites, 0 failures.
- Instrumented: 20 executed / 0 failed / 6 skipped, including the revised migration replay
  (`user_version` 1→3, `upstreamHostMode` column exists, legacy row defaults to `preserve`, a
  `port_proxy` row with `upstream` round-trips).
- Emulator: the proxy detail selector switched live between `host: 127.0.0.1:3000` (upstream) and
  `host: 127.0.0.1:8080` (preserve); the chosen mode persisted in the UI.
- Release artefact: `dist/PocketHost-1.1.3-arm64.apk`, SHA-256
  `67a95db06e84dba09f7ed74b02a95b173bbc49857ffb2c06d240c756015d6b37`.
## 1.1.2 - 2026-11-06

### Added
- **Prefix-safe redirects.** A proxy mounted under `/s/<id>/` now rewrites absolute-path `Location`
  responses (`/login` → `/s/<id>/login`). Relative, scheme-relative and absolute-URL redirects are
  left untouched; the default site at `/` is unaffected.
- **Referer fallback for absolute assets.** When a page served from `/s/<id>/` asks for an absolute
  path such as `/app.css`, the request is routed to that proxy (with `X-Forwarded-Prefix`) instead of
  falling through to the default site. Fixes Node/PHP/Python apps that emit root-absolute asset or
  API URLs without rewriting their code.
- **Global "Proxy upstream Host" setting** (Settings → Embedded server): `Preserve client` (default,
  current behaviour) or `Upstream 127.0.0.1` for dev servers that validate the Host header (Vite
  `allowedHosts`, Django `ALLOWED_HOSTS`, Rails). Applies to every port proxy immediately; the
  original client host always stays available as `X-Forwarded-Host`.

### Changed
- Version 1.1.2 (versionCode 9); release re-signed with the project JKS.
- README/KNOWN-LIMITATIONS/phase-8 updated: the absolute-redirect and Host-header limitations are
  now addressed (with the remaining caveats documented).

### Verified
- Go: 103 top-level tests / 254 test+subtest PASS lines, 0 failures. New
  `TestProxyPrefixRedirectLocationIsRewritten`, `TestProxyRefererFallbackRoutesAbsoluteAssets`,
  `TestProxyUpstreamHostMode`.
- JVM: 207 tests / 23 suites, 0 failures (new `proxySiteSendsUpstreamHostModeOnlyWhenEnabled`).
- Instrumented: 20 executed / 0 failed / 6 skipped on Android 16 / API 36.
- Emulator end-to-end: `/s/<proxy>/go` → `302 Location: /s/<proxy>/after` and `curl -L` follows to
  `200`; upstream-Host mode shows `host: 127.0.0.1:3000` at the upstream, preserve mode shows the
  client host; Settings label and diagnostics report app 1.1.2 / engine 1.1.0.
- Release artefact: `dist/PocketHost-1.1.2-arm64.apk` (13.77 MB), SHA-256
  `1f3adf5a0045bd598064964039a9765173fda70b358373d4d01776cda3a4d86e`.
## 1.1.1 - 2026-11-06

### Fixed
- **PROXY_LOOP is now enforced on hot sync, not only at `server.start`.** A port proxy pointing at the
  engine's own listening port (default `:8080`) could be added while hosting was running; `sites.sync`
  applied it, and the first request would recurse into the engine forever. `sites.sync` now rejects the
  update with `PROXY_LOOP` and restores the previous registry, so currently served sites keep working.
  Defense in depth: the Add-port-proxy screen filters the engine port out of the scan and rejects it in
  manual entry, and `AppRepository.addProxySite` refuses to persist it (`RESERVED_PORT`).
- Development-tier copy is consistent ("Development tier" instead of a mix with "Free tier").
- Setting the default site now says "restart hosting to apply" — the engine applies the default on the
  next hosting start.
- The Sites import FAB has a TalkBack label.

### Changed
- Version 1.1.1 (versionCode 8); release re-signed with the project JKS.
- Docs: proxy limitations for absolute `Location` redirects and host-header validation.

### Verified
- Go: 100 top-level tests / 251 test+subtest PASS lines, 0 failures (new
  `TestSitesSyncRejectsProxyLoop`).
- JVM: 206 tests / 23 suites, 0 failures (new `enginePortIsReservedAsAProxyTarget`).
- Emulator: the scan no longer lists `:8080`; manual `8080` shows the reserved-port error; the import
  FAB exposes its TalkBack label; the release APK is signed v2+v3, versionCode 8 / 1.1.1, SHA-256
  `5f25b3c4d5f9adfc5ae06f81c391bd7681560d4ed7a679012d95640198ba3112`.
## 1.1.0 - 2026-11-06

### Added
- **Port proxy mode — host a Termux backend with 0 MB of extra APK.** Start any server on the
  phone's loopback (`node server.js` :3000, `php -S 127.0.0.1:8000`, `python -m http.server` :9000,
  a Go binary, …), then **Sites → ADD PORT PROXY** and point a proxied site at that port. The Go
  engine reverse-proxies `127.0.0.1:<port>` with all HTTP methods, request bodies, query strings,
  streaming/SSE and **WebSocket** upgrades (Vite/Next HMR, Express/Hono, Flask). No Node/PHP binary
  is embedded and nothing is executed inside the app — the "500 MB bloat" alternative was rejected.
- **Automatic upstream discovery.** New `ports.scan` engine op probes the common dev ports
  concurrently (default list of 18, `timeoutMs` 50–1000, sorted `active`); the Add-port-proxy screen
  lists what is actually listening with friendly labels (Node/Express, Vite, PHP/Python, Angular,
  Flask, …) and one-tap selection.
- **Honest upstream state.** The site card and detail screen show a real UPSTREAM ONLINE/OFFLINE
  check; an offline upstream produces a branded `502` page naming the port and the Termux commands
  to start it (`X-PocketHost-Proxy-Error: upstream_offline`), also written to the engine log ring.
- **Development-tier plan gate.** `PlanPolicy` is the single source of truth: free tier = **1 static
  website + 1 port proxy**, independent quotas. New-import entry points show a "Development tier ·
  1 of 1 website" dialog; re-import/replacing the existing site is never blocked; adding a second
  proxy is disabled with a slot counter. Premium (`PlanPolicy.isPremium`) unlocks unlimited slots
  later; the Go engine has no site-count limit so no engine rebuild is needed for that.
- **Engine 1.1.0 site schema (additive).** `Site.type` = `static` | `port_proxy`, `Site.targetPort`.
  Old clients remain compatible (missing `type` ⇒ static); `engine.info` reports
  `capabilities: [static, port_proxy, ports.scan]`. `PROXY_LOOP` rejects a proxy pointing at the
  engine's own listening port (registry rolled back).
- **Room schema v2 with a real migration:** `MIGRATION_1_2` adds `sites.siteType` (default
  `static`) and `sites.targetPort` via `ALTER TABLE`, preserving existing websites across the
  upgrade (no destructive drop on 1→2).
- **Proxy-aware UI:** sites list badge `PORT PROXY · :3000` + "Termux upstream" instead of storage
  stats; proxy detail screen with upstream/proxied URLs, live status, copyable Termux commands,
  enable/rename/delete; proxied preview labels; tier-limit dialog.

### Changed
- Version 1.1.0 (versionCode 7); release APK 13.76 MB (+0.254 MB vs 1.0.5), signed with the
  project JKS, R8-minified, `arm64-v8a` only.
- Engine AAR 11.81 MB (both ABIs; +0.83 MiB for the proxy + scan implementation), 16 KB
  page-aligned, rebuilt from source.
- `tools/env.ps1`: `GRADLE_BIN` fixed to the Gradle 8.13 distribution the wrapper actually pins
  (was a stale, incomplete 8.9 path), with a fallback to `android/gradlew.bat`.
- Documentation: README (port proxy quick start/FAQ/limitations), integration contract §3.3–3.6 +
  §8a/§8b, architecture "Hosting modes", known limitations, and the frozen design contract
  `docs/plans/port-proxy-and-dev-tier.md`.

### Fixed
- **In-app copy no longer claims static-only hosting.** Settings → About, the first-run dashboard card
  and the Tunnel public-exposure notice now describe the real product: static sites **and** port
  proxies forwarding to a Termux upstream (Node.js/PHP/Python/Go), with the limitations list updated
  accordingly ("Static sites + port proxies"; no embedded Node/PHP runtime). Copy-only change.
- Instrumented `NotificationActionTest` asserted the pre-1.0.5 notification title ("Stop") and raced
  the transient "Starting…" notification; it now waits for the steady-state notification and
  asserts the shipped `[Open website, Stop hosting]` actions (test-only fix, no product change).
- Instrumented `HostingEndToEndTest` imported two static sites to prove `/s/<id>/` routing; it now
  opts into premium for that fixture (`PlanPolicy.isPremium` in `@Before`, restored in `@After`) so
  the multi-site engine path stays covered while the free tier is enforced elsewhere by unit tests.

### Verified
- Go: `gofmt`/`go vet` clean, `go test -count=1 ./...` all 5 packages green — 99 top-level test
  functions (baseline 72), 250 test/subtest PASS lines, 0 failures. New tests drive real
  `httptest` upstreams and a real bound engine server: path/query/body/method forwarding,
  `/s/<id>` strip + `X-Forwarded-Prefix`, vhost routing, SSE incremental flush, raw-TCP WebSocket
  101 echo, `502` offline page+log+metrics, `PROXY_LOOP` rollback, `ports.scan` validation and
  active-port detection.
- JVM: 205 tests / 23 suites, 0 failures (+31 new: `PlanPolicy`, proxy repository rules,
  `SiteSpec`/`port_proxy` JSON, `ports.scan` parsing, mapper round-trip).
- Instrumented on Android 16 / API 36 x86_64 emulator: full suite 20 executed / 0 failed / 6
  intentional skips — including new `PortProxyEndToEndTest` **7/7 PASS** (GET/POST/PUT/PATCH/DELETE,
  forwarded headers, prefix strip, vhost, SSE incremental, WebSocket 101 echo, 502, scan) and
  `DatabaseMigrationTest` **PASS**, which replays the real Room 1→2 upgrade on-device: legacy v1
  site + settings + request history survive, `siteType='static'`/`targetPort IS NULL`, and a new
  `port_proxy` row round-trips (`user_version` becomes 2; no destructive fallback registered).
- End-to-end on-device proof: a real host-side Python upstream exposed via `adb reverse tcp:3000`,
  added through the real app UI, served through `http://<phone>:8080/s/<proxy-id>/` →
  `HTTP 200` with the upstream-only marker `POCKETHOST_UPSTREAM_OK`; stopping the upstream produced
  the branded `502` page. Screenshots: `proxy-add-scan-light.png`, `proxy-sites-light.png`,
  `proxy-detail-light.png`, `proxy-endtoend.png`, `proxy-offline.png`, `proxy-tier-gate-light.png`.
- Release artefact: `dist/PocketHost-1.1.0-arm64.apk` (14,430,908 B = 13.76 MB, +0.255 MB vs
  1.0.5), `apksigner` v2+v3 verified, signer `CN=PocketHost` from the release JKS (not the Android
  debug key), SHA-256 `55a88252661b6724200519f5619caaba6a3d16361ab3ec7e809f8b62fef3ee2e`.

## 1.0.5 - 2026-11-05

### Fixed
- **Harmless cloudflared disconnect lines are no longer shown as tunnel errors.** Browser
  refreshes, closed tabs and idle QUIC streams make Go's `context.Context` return
  `context canceled`, and cloudflared logs `Error shutting down control stream`; these are normal
  architecture behaviour, not tunnel failures. The log parser now classifies them as INFO next to
  the existing DNS-resolver benign pattern, so the Tunnel screen no longer pops a red/amber banner
  on every refresh.
- **"Not exposed publicly" copy while a Named Tunnel is connected.** When the tunnel is CONNECTED
  in Named mode but the app cannot derive the hostname from the token, the Public URL card now
  reads **"Managed via Zero Trust"** with the hint "Custom hostname routed through your tunnel
  (managed in Zero Trust)" instead of the contradictory "Not exposed publicly". Applied on both
  Dashboard and Tunnel screens.

### Changed
- Version 1.0.5 (versionCode 6); re-signed with the project JKS (same certificate).
- Public hostname documented as **downmonitor.app** (verified live: HTTP 200 through Cloudflare,
  engine headers, branded 404).

### Verified
- 174 JVM tests / 18 suites, 0 failures (new parser tests for `context canceled` /
  `shutting down control stream`, including `firstErrorLine` ignoring them).
- Emulator: Quick Tunnel connected, repeated page loads and aborted requests produced no tunnel
  warning/error banner (status stayed `CONNECTED`, 1 connection shown for the quick tunnel).
- External: `https://downmonitor.app/` → `200 text/html`, `/css/styles.css` → `200 text/css`,
  `/assets/logo.svg` → `200 image/svg+xml`, unknown path → engine's branded `404`.
## 1.0.4 - 2026-11-05

### Fixed
- **A connected Cloudflare Tunnel no longer disconnects when hosting stops.** `STOP HOSTING` now
  stops only the Go engine; the foreground service, its notification and the wake/Wi-Fi locks stay
  alive while a tunnel is connecting/connected. The connector remains registered and the same
  hostname returns `200` again as soon as hosting is restarted — no reconnect, no new URL. While
  hosting is stopped the origin is offline, so Cloudflare answers `530/1033` (or `502`).
- **Saved Named Tunnel tokens are visible and reusable.** After `SAVE` the input is cleared and a
  "Saved token ••••<last4>" card with **CONNECT WITH SAVED TOKEN** is shown; it survives app
  restarts (Android Keystore AES-256-GCM) and needs no re-pasting. Connecting with a saved token
  asks for the same public-exposure consent as a typed token.
- **Tunnel-only state is honest.** Connecting while hosting is stopped is allowed (origin offline
  until hosting starts); the notification says "Tunnel connected / Hosting is stopped — visitors
  get 502 until you start hosting" with Start hosting / Disconnect tunnel actions. Disconnecting
  the last active component stops the service and releases the locks.
- Dashboard and Tunnel copy explain that stopping hosting keeps the tunnel connected; an
  origin-offline banner appears when hosting is off but the tunnel is up.

### Changed
- Version 1.0.4 (versionCode 5); re-signed with the project JKS (same certificate).

### Verified
- 173 JVM tests / 18 suites, 0 failures (+9 tunnel-lifecycle tests).
- Emulator (Android 16): Quick Tunnel → `STOP HOSTING` keeps the tunnel `CONNECTED` and the
  foreground notification alive, and the public URL answers `530` (Cloudflare 1033, origin
  offline); `START HOSTING` makes the **same URL** return `200` without reconnecting; the
  saved-token card persists across an app restart; **CONNECT WITH SAVED TOKEN** shows consent and
  fails fast on an invalid token, then tears the service down cleanly.
## 1.0.3 - 2026-11-05

### Fixed
- **Windows/AI-tool ZIPs are accepted again**: entry names that use `\` separators are normalized
  to `/` instead of being rejected with "ZIP entry uses backslash path separators". Security is
  unchanged: `..\` traversal, absolute paths, drive letters, symlinks, special files and
  cross-separator duplicates are still refused.
- Import failure headline is source-agnostic ("The import could not be completed") and the success
  screen now shows the source (ZIP archive / Folder / Single HTML file).

### Added
- **Folder import**: pick an already-extracted folder through the Android folder picker
  (`OpenDocumentTree`). The tree is copied into private storage with the same limits as ZIP import
  (total bytes, per-file size, entry count, depth), then shares root detection, analysis and the
  atomic move/persist pipeline. Providers without child-document support get a clear "use a ZIP"
  message.
- Import progress labels are now source-neutral ("Copying files…", "Validating input…").

### Changed
- Version 1.0.3 (versionCode 4); release re-signed with the project JKS (same certificate).

### Verified
- 164 JVM tests / 17 suites, 0 failures (+24 import tests: 16 folder-import, 8 Windows-ZIP,
  1 extractor end-to-end).
- **Named Tunnel verified end-to-end with a real Cloudflare token** on a physical Android 16 phone:
  `https://downmonitor.app/` serves the imported site through Cloudflare (HTTP 200, engine headers,
  branded 404, HTTP→HTTPS 301). Evidence: `docs/phases/phase-5-cloudflare.md` section 7.
- Device (debug + minified release): a ZIP containing `css\style.css`, `js\app.js`,
  ` assests\logo.svg` imports and serves (`/`, `/css/style.css`, `/%20assests/logo.svg` → 200,
  missing file → 404); a folder picked through `OpenDocumentTree` imports and serves at
  `/s/<id>/` (`index.html`, CSS, SVG → 200).
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
