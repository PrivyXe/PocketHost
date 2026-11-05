<div align="center">

<img src="assets/logo.svg" width="88" alt="PocketHost logo" />

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
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.3-0f766e?style=flat-square" />
  <img alt="APK size" src="https://img.shields.io/badge/APK-13.5%20MB-0f766e?style=flat-square" />
  <img alt="Tests" src="https://img.shields.io/badge/tests-164%20JVM%20%C2%B7%2072%20Go-2dd4bf?style=flat-square" />
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-0f766e?style=flat-square" />
  <img alt="Platform" src="https://img.shields.io/badge/platform-arm64--v8a-2dd4bf?style=flat-square" />
</p>

<p>
  <a href="https://x.com/PrivyXe"><img alt="X" src="https://img.shields.io/badge/-@PrivyXe-000000?style=flat-square&logo=x&logoColor=white" /></a>
  <a href="https://github.com/PrivyXe"><img alt="GitHub" src="https://img.shields.io/badge/-PrivyXe-181717?style=flat-square&logo=github&logoColor=white" /></a>
  <a href="https://www.instagram.com/mr_cimen_"><img alt="Instagram" src="https://img.shields.io/badge/-@mr__cimen__-E4405F?style=flat-square&logo=instagram&logoColor=white" /></a>
</p>

<img src="assets/screenshots/dashboard.png" width="290" alt="PocketHost dashboard while hosting" />

**🌐 Live, served from a phone: [vitalranges.com](https://vitalranges.com/)** · **Mirror: [privyxe.github.io/PocketHost](https://privyxe.github.io/PocketHost/)** · **⬇️ Download: [latest release](../../releases/latest)**

</div>

---

## Download

Get the signed APK from **[Releases](../../releases/latest)**:

| File | Details |
|---|---|
| `PocketHost-1.0.3-arm64.apk` | 13.50 MB · `arm64-v8a` only · Android 8.0+ · signed v2+v3 |
| `PocketHost-1.0.3-arm64.apk.sha256` | SHA-256 checksum — verify before installing |
| `PocketHost-1.0.3.json` | machine-readable build manifest (versionCode 4) |

> **Sideload only.** PocketHost is not on Google Play. No account, no ads, no analytics.
> Install: open the APK on an **ARM64** Android 8.0+ phone → allow "install unknown apps" → install.

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
- [Install & first site](#install--first-site)
- [Using the app](#using-the-app)
- [Quality & verification](#quality--verification)
- [Repository contents](#repository-contents)
- [Known limitations](#known-limitations)
- [FAQ](#faq)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
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
| **Release** | `1.0.3` (versionCode 4) — signed ARM64 APK, 13.50 MB, `arm64-v8a` only |
| **Signed with** | project JKS, APK Signature Scheme **v2 + v3**, R8-minified |
| **Verified on** | Android 16 / API 36 emulator (x86_64): import → host → real HTTP round-trips; **live** on a physical Android 16 phone via Named Tunnel → [vitalranges.com](https://vitalranges.com/) |
| **Engine** | Go stdlib `net/http`, embedded via `gomobile bind` (`libgojni.so`), 16 KB page-aligned |
| **Tests** | 164 JVM unit tests (17 suites) + 72 top-level Go tests + instrumented end-to-end runs |
| **Tunnel** | bundled `cloudflared` 2026.10.7 (pinned source, patched DNS resolver); Quick Tunnel verified externally; **Named Tunnel + custom domain verified live** → [vitalranges.com](https://vitalranges.com/) |
| **License** | [MIT](LICENSE) |

## Screens

<table>
  <tr>
    <td align="center"><img src="assets/screenshots/dashboard.png" width="230" /><br /><sub><b>Dashboard</b><br />server status, LAN URL, site summary</sub></td>
    <td align="center"><img src="assets/screenshots/metrics.png" width="230" /><br /><sub><b>Metrics</b><br />requests, latency, response codes</sub></td>
    <td align="center"><img src="assets/screenshots/sites.png" width="230" /><br /><sub><b>Sites</b><br />storage, files, index detection</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="assets/screenshots/tunnel.png" width="230" /><br /><sub><b>Tunnel</b><br />Quick &amp; Named Cloudflare Tunnel</sub></td>
    <td align="center"><img src="assets/screenshots/settings.png" width="230" /><br /><sub><b>Settings</b><br />port, bind mode, developer links</sub></td>
    <td align="center"><img src="assets/screenshots/release.png" width="230" /><br /><sub><b>Signed release</b><br />minified 1.0.x build running</sub></td>
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
- ZIP, a single HTML file, or a folder (SAF document tree via OpenDocumentTree).
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

### Tunnel
- Optional **Quick Tunnel** → temporary `https://*.trycloudflare.com` URL (no Cloudflare account).
- Optional **Named Tunnel** → persistent hostname (verified live at `vitalranges.com`); tokens are encrypted at rest with Android
  Keystore AES-256-GCM and never written to logs or passed on the command line (env-only).
- Bundled `cloudflared` is built from pinned source with a small Android DNS patch
  (`net.DefaultResolver` → `1.1.1.1` / `8.8.8.8`), so no `--edge` hacks are needed.

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
  SAF import ──► validate ──► extract to app-private storage ──► site metadata
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

## Requirements

- Android **8.0+** (API 26), **ARM64** device, 4 GB RAM or more recommended.
- Optional: a Cloudflare account + tunnel token for a persistent public hostname.
- Local hosting needs no internet and no account.

## Install & first site

1. Download `PocketHost-1.0.3-arm64.apk` from **[Releases](../../releases/latest)**; optionally
   verify the published SHA-256.
2. Open it on the phone → allow "install unknown apps" → install → launch.
3. Allow notifications (required for background hosting).
4. Export your website as a `.zip` with `index.html` at the root (or inside one folder).
5. **IMPORT WEBSITE** → pick the ZIP → review the summary → confirm.
6. **START HOSTING** → open `http://<phone-ip>:8080/` from any device on the same Wi-Fi.
7. Optional: **CONNECT CLOUDFLARE → Quick Tunnel** for a public HTTPS URL.

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

## Quality & verification

- **164 JVM unit tests** across 16 suites (ZIP security, root detection, engine protocol, log
  redaction, settings, tunnel parsing, metrics maths).
- **72 top-level Go tests** across 5 packages (routing, default/secondary sites, `304`/`HEAD`/`405`,
  traversal reject, ZIP validation + CRC, percentiles `p50 ≤ p95 ≤ max`, command bus).
- **Instrumented end-to-end run** on the API 36 emulator: real ZIP import → real Go engine → real
  HTTP (`200`/`304`/`HEAD`/`404`/`405`/traversal-reject/secondary site) → clean stop; STOP→START
  regression; notification STOP while backgrounded.
- Quick Tunnel connected and verified **from an external host** (`curl` → HTTP 200 through
  Cloudflare).

## Repository contents

This public repository is a **release & marketing repo** — it intentionally does **not** contain the
application source code:

```
index.html, css/, js/, assets/    ← the trilingual marketing site (GitHub Pages)
assets/screenshots/               ← real app screenshots used in this README
README.md                         ← this document
LICENSE                           ← MIT
CHANGELOG.md                      ← version history
```

The APK and its checksum are attached to **[Releases](../../releases/latest)**, not committed to
the repository. The Android/Go source tree is maintained privately.

## Known limitations

- Automated tests run on the API 36 emulator; the ARM64 release also runs live on a physical Android 16 phone (user-operated) serving `https://vitalranges.com/`, but this workspace did not run instrumented tests on that device.
- `www.vitalranges.com` (and any additional hostname) is not configured yet; only the apex hostname
  is published on the live Named Tunnel.
- Longest continuous soak so far is a short measured session, not 24 h.
- Absolute-path assets on **secondary** `/s/<id>/` sites need relative paths (or the Referer
  fallback added in 1.0.1) — the default site at `/` is unaffected.
- Folder import needs a provider that exposes child documents (DocumentsContract); some cloud or file-manager providers only work through a ZIP.
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
<summary><b>Can I use a custom domain?</b></summary>

With a Cloudflare Named Tunnel you can attach any domain you manage in Cloudflare. A built-in
domain setup wizard is on the roadmap.
</details>

## Troubleshooting

| Symptom | Check |
|---|---|
| `INSTALL_FAILED_NO_MATCHING_ABIS` | the release APK is `arm64-v8a` only — use an ARM64 phone |
| Site loads locally but tunnel URL doesn't | confirm the tunnel state is `connected`, then open the log tail for Cloudflare errors |
| CPU gauge says *Unavailable* | expected on devices where SELinux denies `/proc/stat` to apps — not a bug |
| Import rejected | the ZIP is validated strictly; check for symlinks, duplicate names or CRC errors |
| Secondary site broken assets | use relative paths, or rely on the Referer fallback added in 1.0.1 |

## Roadmap

- [x] Physical ARM64 execution: live at [vitalranges.com](https://vitalranges.com/) (user-operated Android 16 phone)
- [x] Named Tunnel end-to-end verification with a real Cloudflare token (2026-11-05)
- [ ] 24-hour soak with power/thermal measurements on real hardware
- [ ] Optional custom domain helper and richer tunnel diagnostics
- [ ] Play Store build (`specialUse` justification + privacy policy) once device coverage is done

## 🇹🇷 Türkçe özet

**PocketHost**, sıradan bir Android telefonu statik site barındıran gerçek bir web sunucusuna
dönüştürür. AI aracından çıkan ZIP'i içe aktar, **BAŞLAT**'a bas; siten aynı Wi-Fi'deki herkes için
açılır. İstersen Cloudflare Tunnel ile HTTPS üzerinden dünyaya aç.

- Root / Termux / Linux **gerekmez**; reklam, hesap ve telemetri **yoktur**.
- Motor, uygulama sürecinde çalışan **Go `net/http`** sunucusudur (JNI köprüsü, harici süreç yok).
- Metrikler gerçektir; cihazın vermediği değer "kullanılamıyor" olarak gösterilir.
- Kurulum: [Releases](../../releases/latest) → `PocketHost-*-arm64.apk` → kur → ZIP'i içe aktar → BAŞLAT.
- Site (TR/EN/中文): [privyxe.github.io/PocketHost](https://privyxe.github.io/PocketHost/)
- Lisans: **MIT**.

## License

This project is licensed under the **MIT License** — see **[LICENSE](LICENSE)**.

```
MIT License · Copyright (c) 2026 PrivyXe
```

Third-party components keep their own licenses: AndroidX / Jetpack Compose (Apache-2.0), Kotlin
(Apache-2.0), Go standard library (BSD-3-Clause),
[cloudflared](https://github.com/cloudflare/cloudflared) (Apache-2.0).

PocketHost is an independent project. It is **not affiliated with Google, Android, or Cloudflare**;
Cloudflare Tunnel is an optional third-party service and is subject to Cloudflare's terms.
