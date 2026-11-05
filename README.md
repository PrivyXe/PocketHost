<div align="center">

<img src="sites/pockethost-website/assets/logo.svg" width="88" alt="PocketHost logo" />

# PocketHost

**A real static web server in your pocket.**

Turn an ordinary Android phone into a personal website host — no Linux, no Termux, no root,
no command line. Drop in a ZIP from any AI website builder, press **START HOSTING**, and your
site is live on Wi-Fi. Optionally expose it to the world over HTTPS with Cloudflare Tunnel.

<p>
  <img alt="Android 8.0+" src="https://img.shields.io/badge/Android-8.0%2B-3DDC84?style=flat-square&logo=android&logoColor=white" />
  <img alt="Kotlin" src="https://img.shields.io/badge/Kotlin-2.0-7F52FF?style=flat-square&logo=kotlin&logoColor=white" />
  <img alt="Jetpack Compose" src="https://img.shields.io/badge/Jetpack-Compose-4285F4?style=flat-square&logo=jetpackcompose&logoColor=white" />
  <img alt="Go" src="https://img.shields.io/badge/Go-stdlib%20only-00ADD8?style=flat-square&logo=go&logoColor=white" />
</p>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.2-0f766e?style=flat-square" />
  <img alt="APK size" src="https://img.shields.io/badge/APK-13.5%20MB-0f766e?style=flat-square" />
  <img alt="Tests" src="https://img.shields.io/badge/tests-140%20JVM%20%C2%B7%2072%20Go-2dd4bf?style=flat-square" />
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-0f766e?style=flat-square" />
  <img alt="Platform" src="https://img.shields.io/badge/platform-arm64--v8a-2dd4bf?style=flat-square" />
</p>

<p>
  <a href="https://x.com/PrivyXe"><img alt="X" src="https://img.shields.io/badge/-@PrivyXe-000000?style=flat-square&logo=x&logoColor=white" /></a>
  <a href="https://github.com/PrivyXe"><img alt="GitHub" src="https://img.shields.io/badge/-PrivyXe-181717?style=flat-square&logo=github&logoColor=white" /></a>
  <a href="https://www.instagram.com/mr_cimen_"><img alt="Instagram" src="https://img.shields.io/badge/-@mr__cimen__-E4405F?style=flat-square&logo=instagram&logoColor=white" /></a>
</p>

<img src="docs/phases/screenshots/dashboard-hosting-light.png" width="290" alt="PocketHost dashboard while hosting" />

</div>

---

## Table of contents

- [Why PocketHost?](#why-pockethost)
- [How it compares](#how-it-compares)
- [Status](#status)
- [Screens](#screens)
- [Features](#features)
- [How it works](#how-it-works)
- [Architecture](#architecture)
- [Security model](#security-model)
- [Requirements](#requirements)
- [Quick start](#quick-start)
  - [Install the APK](#1-install-the-apk)
  - [Host a site](#2-host-a-site)
  - [Build from source](#3-build-from-source)
- [Using the app](#using-the-app)
- [Testing](#testing)
- [Project layout](#project-layout)
- [Known limitations](#known-limitations)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Marketing site](#marketing-site)
- [Roadmap](#roadmap)
- [Docs](#docs)
- [Contributing](#contributing)
- [Developer](#developer)
- [🇹🇷 Türkçe özet](#-türkçe-özet)
- [License](#license)

---

## Why PocketHost?

AI website builders made it trivial to *create* a site. Actually getting it online from a phone is
still painful: Termux, a VPS, a CI pipeline, or a monthly host. PocketHost exists to make that last
step one tap:

- **Real hosting, not a mock** — a Go `net/http` server running inside the app process.
- **No root, no Termux, no Linux** — a normal, unrooted Android phone is all you need.
- **Private by default** — nothing leaves your LAN unless you explicitly connect a tunnel.
- **Honest telemetry** — real metrics from the platform; anything unavailable is shown as
  *unavailable*, never invented.
- **One free, ad-free APK** — no account, no analytics, no paywall for local hosting.

## How it compares

| | PocketHost | Termux + nginx | VPS / cloud | Static host (Netlify, etc.) |
|---|---|---|---|---|
| Hardware needed | your phone | your phone | rented server | none |
| Root / Linux / terminal | ❌ | ✅ (terminal) | ✅ | ❌ |
| Works on local Wi-Fi only | ✅ | ✅ | ❌ (needs routing) | ❌ |
| HTTPS for the world | optional Cloudflare Tunnel | manual setup | manual DNS/TLS | ✅ |
| Cost | free | free | monthly | free tier / monthly |
| Setup time | one tap + ZIP | long | long | account + deploy config |
| Data stays on device | ✅ | ✅ | ❌ | ❌ |
| Real device metrics | ✅ | ❌ | ❌ | ❌ |

PocketHost is deliberately **not** a server for production workloads, databases or dynamic
backends. It is a pocket-sized static-site host for demos, prototypes, portfolios and local testing.

## Status

| | |
|---|---|
| **Release** | `1.0.2` (versionCode 3) — signed ARM64 APK, 13.49 MB, `arm64-v8a` only |
| **Signed with** | project JKS, APK Signature Scheme **v2 + v3**, R8-minified |
| **Verified on** | Android 16 / API 36 emulator (x86_64): import → host → real HTTP round-trips |
| **Engine** | Go stdlib `net/http`, embedded via `gomobile bind` (`libgojni.so`), 16 KB page-aligned |
| **Tests** | 140 JVM unit tests (16 suites) + 72 top-level Go tests + instrumented end-to-end runs |
| **Tunnel** | bundled `cloudflared` 2026.10.7 (pinned source, patched DNS resolver); Quick Tunnel verified externally, Named Tunnel requires user token |
| **License** | [MIT](LICENSE) |

> **Sideload only.** PocketHost is not on Google Play. The APK is published through
> [GitHub Releases](../../releases/latest) so it stays ad-free and account-free.

## Screens

<table>
  <tr>
    <td align="center"><img src="docs/phases/screenshots/dashboard-hosting-light.png" width="230" /><br /><sub><b>Dashboard</b><br />server status, LAN URL, site summary</sub></td>
    <td align="center"><img src="docs/phases/screenshots/dashboard-metrics-server-light.png" width="230" /><br /><sub><b>Metrics</b><br />requests, latency, response codes</sub></td>
    <td align="center"><img src="docs/phases/screenshots/sites-list-light.png" width="230" /><br /><sub><b>Sites</b><br />storage, files, index detection</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/phases/screenshots/tunnel-dark.png" width="230" /><br /><sub><b>Tunnel</b><br />Quick &amp; Named Cloudflare Tunnel</sub></td>
    <td align="center"><img src="docs/phases/screenshots/settings-developer-light.png" width="230" /><br /><sub><b>Settings</b><br />port, bind mode, developer links</sub></td>
    <td align="center"><img src="docs/phases/screenshots/release-1.0.1-light.png" width="230" /><br /><sub><b>Signed release</b><br />minified 1.0.x build running</sub></td>
  </tr>
</table>

## Features

### Hosting
- Embedded Go HTTP server — starts in milliseconds, no child process, no shell.
- Multiple sites: default site at `/`, secondary sites at `/s/<id>/`.
- SPA fallback, ETag / Last-Modified / `304`, gzip, per-site cache policy.
- Directory index handling, custom 404/405 responses, byte-range requests.
- Foreground service (`specialUse`) + partial wake lock + Wi-Fi lock: keeps serving with the
  screen off, stops cleanly on every path (nav-bar stop, notification action, app kill, reboot).

### Import
- ZIP, a single HTML file, or a folder (SAF / document provider).
- Validates before touching storage: ZIP-Slip, symlinks, zip bombs, encrypted entries, duplicate
  names, corrupted entries and **per-entry CRC32**.
- Auto-detects the real website root (root `index.html`, single top-level folder, nested `public/`).
- Extracts atomically into app-private storage, shows a summary (root, file count, assets, storage)
  before hosting. Re-import replaces a site safely.

### Dashboard & metrics
- Real RAM, storage, battery temperature, thermal status, network counters, uptime, total
  requests, active connections, response-status distribution and latency.
- Device-wide metrics and PocketHost-process metrics are shown **separately** with their source.
- Latency percentiles are computed from a single sorted sample set, so `p50 ≤ p95 ≤ max` always.
- CPU % is shown as *Unavailable* on devices where SELinux denies `/proc/stat` to apps — because
  that is the truth, and PocketHost does not fabricate numbers.
- Reset metrics with one tap; no persistence of request data beyond the ring buffer.

### Tunnel
- Optional **Quick Tunnel** → temporary `https://*.trycloudflare.com` URL (no Cloudflare account).
- Optional **Named Tunnel** → persistent hostname; tokens are encrypted at rest with Android
  Keystore AES-256-GCM and never written to logs or passed on the command line (env-only).
- Bundled `cloudflared` is built from pinned source with a small Android DNS patch
  (`net.DefaultResolver` → `1.1.1.1` / `8.8.8.8`), so no `--edge` hacks are needed.
- Clear state machine: disconnected → connecting → connected / error, with the real log tail.

### Privacy & security
- No accounts, no ads, no analytics, no telemetry, no crash reporting.
- JNI-only control surface — the management API is not exposed over HTTP at all.
- Every site's file access is confined to its root with Go's `os.Root`.
- WebView preview locked to loopback, no JavaScript bridge.
- Token redaction in logs; tokens never appear in the UI after saving.

## How it works

```
ZIP / HTML / folder
        │
        ▼
  SAF import ──► validate ──► extract to app-private storage ──► Room metadata
                                                                    │
                                                                    ▼
                                                        START HOSTING (tap)
                                                                    │
                                       ┌────────────────────────────┴──────────────────────┐
                                       ▼                                                   ▼
                          http://<phone-ip>:8080                         Cloudflare Tunnel (optional)
                          (same Wi-Fi, no internet)                     https://<name>.trycloudflare.com
                                                                        or your named hostname
```

The Kotlin layer never serves files itself: it starts the Go engine over a JSON command bus and the
Go engine owns the HTTP server, routing and file access.

## Architecture

```mermaid
flowchart LR
  subgraph APP["Android app — Kotlin + Jetpack Compose (Material 3)"]
    UI["Dashboard · Sites · Tunnel · Settings"] --> VM["ViewModels"]
    VM --> REPO["Repositories"]
    REPO --> DB[("Room / SQLite")]
    REPO --> VAULT["Keystore AES-256-GCM vault"]
    REPO -->|"JSON command bus"| JNI["JNI bridge"]
    SVC["Foreground service (specialUse)"] --> JNI
  end
  subgraph GO["Go engine — in-process .so"]
    JNI --> HTTP["net/http static server"]
    HTTP --> FS[("site files · os.Root")]
  end
  subgraph TUN["cloudflared — bundled .so, child process"]
    CF["cloudflared run --protocol http2"]
  end
  SVC --> CF
  HTTP --> LAN["Wi-Fi visitors · http://phone-ip:8080"]
  CF --> EDGE["Cloudflare edge · HTTPS"]
```

**Key decisions**

| Area | Choice | Why |
|---|---|---|
| Server | Go `net/http`, stdlib only | tiny, fast, no external deps; compiled to a `.so` with `gomobile bind` |
| App ↔ engine | JSON command bus over JNI, off the main thread | no HTTP management surface to attack or expose |
| UI | Kotlin, Compose, Material 3, single activity | modern Android baseline (minSdk 26) |
| Storage | Room + app-private files | no broad storage permissions |
| Secrets | Android Keystore AES-256-GCM | tunnel tokens never stored in plain text |
| Tunnel | pinned `cloudflared` built for Android | real Cloudflare connectivity, reproducible build |
| Release | R8 + resource shrinking, v2+v3 signing | small APK, verifiable signature |

Details: **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** ·
Interface contract: **[docs/architecture/integration-contract.md](docs/architecture/integration-contract.md)** ·
Feasibility notes: **[docs/research/feasibility-notes.md](docs/research/feasibility-notes.md)**

## Security model

| Threat | Mitigation |
|---|---|
| Malicious ZIP (path traversal, symlink escape) | validated before extraction; `os.Root` confinement at serve time |
| Zip bomb / huge archive | entry count, size and compression-ratio limits; atomic extraction |
| Corrupted archive | per-entry CRC32 verification, fail with a clear error |
| Token theft from storage | Android Keystore AES-256-GCM; token passed via env, never argv |
| Token leaking into logs | redaction + never echoed in UI; log ring keeps a bounded tail |
| Remote control of the server | no management HTTP endpoint; JNI-only command bus |
| WebView-based site preview escape | loopback-only URL, JS disabled bridge, no file access |
| Unwanted internet exposure | LAN bind by default; public exposure requires explicit tunnel consent |

The full audit-style evidence is in **[docs/phases/phase-2.md](docs/phases/phase-2.md)** and
**[docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md)**.

## Requirements

### To run
- Android **8.0+** (API 26), **ARM64** device, 4 GB RAM or more recommended.
- Optional: a Cloudflare account + tunnel token for a persistent public hostname.
- Local hosting needs no internet and no account.

### To build
| Tool | Version |
|---|---|
| JDK | 21 (Temurin 21 recommended) |
| Android SDK | platform **36**, build-tools **36.1.0**, platform-tools |
| NDK | **26.1.10909125** |
| Go | **1.27** + `golang.org/x/mobile` (`gomobile`) |
| Gradle | 8.13 (wrapper — always use `./gradlew` / `tools/gradle.ps1`) |

Exact setup and troubleshooting: **[docs/BUILD.md](docs/BUILD.md)**.

## Quick start

### 1. Install the APK

1. Grab `PocketHost-1.0.2-arm64.apk` from **[Releases](../../releases/latest)** and verify the
   SHA-256 published next to it.
2. Open it on an **ARM64** Android 8.0+ phone, allow "install unknown apps", install.
3. Launch PocketHost and allow notifications (required for background hosting).

### 2. Host a site

1. Export your site as a `.zip` with `index.html` at the root (or inside one folder).
2. Tap **IMPORT WEBSITE**, pick the ZIP, review the summary, confirm.
3. Tap **START HOSTING** — the dashboard shows `http://<phone-ip>:8080/`.
4. Open that URL from any device on the same Wi-Fi.
5. Optional: **CONNECT CLOUDFLARE → Quick Tunnel** for a public HTTPS URL.

### 3. Build from source

```powershell
# Windows / PowerShell (scripts live in tools/)
. .\tools\env.ps1                            # exports JAVA_HOME, ANDROID_HOME, NDK, Go/Gradle caches
cd engine ; .\build-aar.ps1 ; cd ..          # Go engine → android/app/libs/engine.aar
cd tunnel ; .\build-cloudflared.ps1 ; cd ..  # optional: bundled cloudflared for tunnelling
.\tools\package-release.ps1                  # build + verify + write dist/ (APK, SHA-256, manifest)
adb install -r dist\PocketHost-1.0.2-arm64.apk
```

Debug build (runs on the emulator too, both ABIs):

```powershell
.\tools\gradle.ps1 :app:assembleDebug
```

> The Go AAR and `libcloudflared.so` are **generated** and git-ignored — build them before the
> Android app. `tools/package-release.ps1` verifies the signature, ABI list, 16 KB page alignment
> and writes the release manifest.

## Using the app

1. **Dashboard** — start/stop hosting, see the LAN URL, public URL and the default site summary.
2. **Sites** — import, preview, enable/disable, delete, inspect files. Secondary sites are served
   at `/s/<site-id>/`.
3. **Metrics** — requests, connections, status codes, latency percentiles, device/process memory,
   battery temperature, storage and network counters. Reset at any time.
4. **Tunnel** — connect a Quick Tunnel or paste a Named Tunnel token; watch the live log tail and
   copy the public URL.
5. **Settings** — port, bind mode, theme, diagnostics, developer links, known limitations.

The ongoing notification keeps hosting alive in the background and offers a **STOP** action.

## Testing

```powershell
cd engine ; go vet ./... ; go test ./... -count=1 ; cd ..   # 5 packages, 0 failures
.\tools\gradle.ps1 :app:testDebugUnitTest --continue        # 140 JVM tests / 16 suites
.\tools\gradle.ps1 :app:connectedDebugAndroidTest           # instrumented E2E (real HTTP)
```

| Suite | Covers |
|---|---|
| Go: `engine/internal/server` | routing, default/secondary sites, `304`/`HEAD`/`405`, traversal reject |
| Go: `engine/internal/sites` | ZIP import validation, CRC, root detection, `os.Root` confinement |
| Go: `engine/internal/metrics` | ring buffer, percentiles (`p50 ≤ p95 ≤ max`), reset |
| Go: `engine/internal/api` | command bus, envelope validation, error mapping |
| Go: `engine/bridge` | gomobile surface + JSON protocol |
| Android JVM | ZIP security, root detection, engine protocol, redaction, settings, tunnel parsing, CPU maths |
| Instrumented | real import → start → HTTP round-trip → secondary site → clean stop; STOP→START regression |

Every phase has recorded commands, outputs and PASS/FAIL/NOT-RUN tables in
**[docs/phases/](docs/phases/)**.

## Project layout

```
android/   Kotlin app — Compose UI, foreground service, Room, SAF import, metrics, tunnel
engine/    Go hosting engine (stdlib net/http), gomobile bridge, unit + HTTP tests
tunnel/    pinned cloudflared build scripts, Android DNS patch + evidence
tools/     env/gradle/emulator/verify/package scripts (PowerShell)
sites/     trilingual marketing site + importable ZIP
docs/      architecture, build, known limitations, phase-by-phase evidence
dist/      signed release APK + SHA-256 + machine-readable manifest
```

## Known limitations

Kept explicit on purpose — see **[docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md)**:

- `arm64-v8a` payload has **not yet been executed on physical hardware** (emulator evidence only).
- Named Tunnel is implemented and unit-tested but **not yet verified end-to-end** with a real
  Cloudflare account token (Quick Tunnel *is* verified externally).
- Longest continuous soak so far is a short measured session, not 24 h.
- Absolute-path assets on **secondary** `/s/<id>/` sites need relative paths (or the Referer
  fallback) — the default site at `/` is unaffected.
- Static sites only: no PHP, MySQL, Node.js or Docker.
- Android 17 local-network permission is not yet handled (OS not released at build time).

## FAQ

<details>
<summary><b>Do I need root, Termux or a Linux install?</b></summary>

No. PocketHost targets an ordinary, non-rooted Android phone. There is no shell, no SSH and no
server configuration — the Go server is embedded in the app itself.
</details>

<details>
<summary><b>Is it free? Will it stay free?</b></summary>

Local hosting is free and ad-free in this release. Optional future add-ons (managed tunnel, custom
domain helpers) may be paid, but the core hosting feature is designed to stay free.
</details>

<details>
<summary><b>Will my site be exposed to the internet?</b></summary>

By default, only devices on the same Wi-Fi can reach it. Going public requires you to explicitly
connect Cloudflare Tunnel, and the app asks for confirmation before exposing anything.
</details>

<details>
<summary><b>Which sites are supported?</b></summary>

Static sites: HTML, CSS, JavaScript, images, fonts, `wasm` assets. PHP, MySQL, Node.js and Docker
are **not** supported — PocketHost is intentionally a static-site host.
</details>

<details>
<summary><b>Does it work on iPhone?</b></summary>

No. iOS platform rules do not allow a continuously running background server, so PocketHost is
Android-only (8.0+ / ARM64).
</details>

<details>
<summary><b>Is it battery friendly?</b></summary>

A partial wake lock and Wi-Fi lock are held only while hosting; when the server stops, background
polling stops too. Measured idle memory is around 100 MB.
</details>

<details>
<summary><b>Can I use a custom domain?</b></summary>

With a Cloudflare Named Tunnel you can attach any domain you manage in Cloudflare. A built-in
domain setup wizard is on the roadmap.
</details>

## Troubleshooting

| Symptom | Check |
|---|---|
| `INSTALL_FAILED_NO_MATCHING_ABIS` | the release APK is `arm64-v8a` only — use an ARM64 phone (debug build also has x86_64) |
| Site loads locally but tunnel URL doesn't | confirm the tunnel state is `connected`, then open the log tail for Cloudflare errors |
| CPU gauge says *Unavailable* | expected on devices where SELinux denies `/proc/stat` to apps — not a bug |
| Import rejected | the ZIP is validated strictly; check for symlinks, duplicate names or CRC errors |
| Secondary site broken assets | use relative paths, or rely on the Referer fallback added in 1.0.1 |
| Build fails at `gomobile bind` | NDK 26 + `-androidapi 26` required; see [docs/BUILD.md](docs/BUILD.md) |

## Marketing site

A standalone, dependency-free, **trilingual (TR / EN / 中文)** landing page lives in
[`sites/pockethost-website/`](sites/pockethost-website/) and can itself be hosted by PocketHost:

- Ready-to-import ZIP: [`sites/PocketHost-Website.zip`](sites/PocketHost-Website.zip)
- No APK download on the page (by design); links go to **[GitHub](https://github.com/PrivyXe)**,
  **[X](https://x.com/PrivyXe)** and **[Instagram](https://www.instagram.com/mr_cimen_)**.
- Preview renders: [`sites/preview/`](sites/preview/)
- Import instructions: [`sites/README.md`](sites/README.md)

## Roadmap

- [ ] Physical ARM64 device verification (install + hosting + tunnel)
- [ ] Named Tunnel end-to-end verification with a real Cloudflare token
- [ ] 24-hour soak with power/thermal measurements on real hardware
- [ ] Optional custom domain helper and richer tunnel diagnostics
- [ ] Play Store build (`specialUse` justification + privacy policy) once device coverage is done

## Docs

| Document | Content |
|---|---|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | system design, module boundaries, decisions |
| [docs/BUILD.md](docs/BUILD.md) | exact toolchain versions and build steps |
| [docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md) | honest limitation list + verification scope |
| [docs/phases/](docs/phases/) | phase-by-phase evidence: PASS / FAIL / NOT-RUN tables |
| [CHANGELOG.md](CHANGELOG.md) | version history (1.0.1 fixes, 1.0.2 Developer section) |
| [LICENSE](LICENSE) | MIT |

## Contributing

Contributions are welcome, especially device reports and testing on real hardware.

1. Open an issue describing the change or the device/OS where something failed.
2. Keep PRs focused: UI, engine and tunnel changes are separate areas with disjoint ownership.
3. Run the test suites above before opening a PR.
4. By contributing you agree that your changes are licensed under the [MIT License](LICENSE).

**Device report template:** phone model · Android version · app version · what you did ·
expected vs actual · screenshot/logcat if possible.

## Developer

Built and maintained by **[@mr_cimen_](https://github.com/PrivyXe)**.

<p>
  <a href="https://x.com/PrivyXe">X (Twitter) — @PrivyXe</a> ·
  <a href="https://github.com/PrivyXe">GitHub — PrivyXe</a> ·
  <a href="https://www.instagram.com/mr_cimen_">Instagram — @mr_cimen_</a>
</p>

If PocketHost runs (or fails) on your phone, tell me the model, Android version and what happened —
real-device coverage is the most valuable contribution right now.

## 🇹🇷 Türkçe özet

**PocketHost**, sıradan bir Android telefonu statik site barındıran gerçek bir web sunucusuna
dönüştürür. AI aracından çıkan ZIP'i içe aktar, **BAŞLAT**'a bas; siten aynı Wi-Fi'deki herkes için
açılır. İstersen Cloudflare Tunnel ile HTTPS üzerinden dünyaya aç.

- Root / Termux / Linux **gerekmez**; reklam, hesap ve telemetri **yoktur**.
- Motor, uygulama sürecinde çalışan **Go `net/http`** sunucusudur (JNI köprüsü, harici süreç yok).
- Metrikler gerçektir; cihazın vermediği değer "kullanılamıyor" olarak gösterilir.
- Kurulum: [Releases](../../releases/latest) → `PocketHost-*-arm64.apk` → kur → ZIP'i içe aktar → BAŞLAT.
- Lisans: **MIT** — kaynak kodu serbestçe kullanabilir, değiştirebilir ve paylaşabilirsin.

Ayrıntılar: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/BUILD.md](docs/BUILD.md),
[docs/KNOWN-LIMITATIONS.md](docs/KNOWN-LIMITATIONS.md), [CHANGELOG.md](CHANGELOG.md).
Geliştirici: [@mr_cimen_](https://www.instagram.com/mr_cimen_).

## License

This project is licensed under the **MIT License** — see **[LICENSE](LICENSE)**.

```
MIT License · Copyright (c) 2026 PrivyXe
```

Third-party components keep their own licenses:

| Component | License |
|---|---|
| AndroidX / Jetpack Compose | Apache-2.0 |
| Kotlin | Apache-2.0 |
| Go standard library | BSD-3-Clause |
| [cloudflared](https://github.com/cloudflare/cloudflared) | Apache-2.0 |

PocketHost is an independent project. It is **not affiliated with Google, Android, or Cloudflare**;
Cloudflare Tunnel is an optional third-party service and is subject to Cloudflare's terms.
