/* ============================================================
   PocketHost tanıtım sitesi — çok dilli içerik (TR / EN / 中文)
   Bağımsız: harici servis yok. Dil, ?lang= veya localStorage ile seçilir.
   ============================================================ */
(function () {
  "use strict";

  var DICT = {
    tr: {
      "meta.title": "PocketHost — Telefonunu web sunucusuna dönüştür",
  "meta.desc": "PocketHost, AI ile ürettiğin statik siteyi ZIP olarak veya Termux'ta çalışan Node/PHP/Python sunucunu telefonundan yayınlar. Linux ve root gerekmez; Termux upstream isteğe bağlıdır.",
      "a11y.skip": "İçeriğe geç",
      "nav.features": "Özellikler",
      "nav.how": "Nasıl çalışır",
      "nav.screens": "Ekranlar",
      "nav.specs": "Teknik",
      "nav.faq": "SSS",
      "nav.links": "Bağlantılar",
      "nav.github": "GitHub",
      "nav.langAria": "Dil",
      "nav.themeAria": "Tema değiştir",
  "hero.badge": "Android 8+ · ARM64 · v1.1.4",
      "hero.title": "Telefonunu bir<br /><span class=\"grad\">web sunucusuna</span> dönüştür.",
  "hero.lead": "AI ile ürettiğin siteyi ZIP olarak telefona at, tek dokunuşla yayınla; istersen Termux'taki Node/PHP/Python sunucunu port proxy ile aynı adresten sun. <strong>Linux yok, root yok.</strong> Wi-Fi'deki herkes saniyeler içinde açar; Cloudflare Tunnel ile HTTPS'e taşı.",
      "hero.ctaGithub": "GitHub'da keşfet",
      "hero.ctaScreens": "Ekranlara bak",
      "hero.fact1": "Reklamsız",
      "hero.fact2": "İzleme yok",
      "hero.fact3": "%100 cihazda",
      "hero.fact4": "Bağımsız proje",
      "hero.chip1": "Go HTTP motoru",
  "hero.chip2": "ZIP + Termux",
      "hero.chip3": "Cloudflare Tunnel",
      "stats.s1v": "1 dokunuş",
      "stats.s1l": "yayına alma",
  "stats.s2v": "13,8 MB",
      "stats.s2l": "uygulama boyutu",
      "stats.s3v": "2 katman",
      "stats.s3l": "LAN + Cloudflare HTTPS",
      "stats.s4v": "0",
      "stats.s4l": "reklam & izleyici",
      "features.overline": "Neden PocketHost?",
      "features.heading": "Cebindeki sunucu, ciddi altyapı.",
  "features.lead": "Bu bir demo veya UI prototipi değil: süreç içinde çalışan gerçek bir Go HTTP sunucusu, gerçek ZIP güvenlik kontrolleri, Termux upstream'e gerçek reverse proxy ve gerçek ölçümler.",
      "f1.title": "Gömülü Go motoru",
      "f1.body": "net/http tabanlı sunucu, gomobile ile doğrudan uygulama sürecinde çalışır. Ayrı süreç, shell veya harici binary yok; JNI köprüsü üzerinden yönetilir.",
      "f2.title": "ZIP'ten tek dokunuş",
      "f2.body": "Siteyi ZIP olarak seç; kök dizini otomatik bulur, güvenli biçimde çıkarır ve önizleme sunar. ZIP-Slip, symlink, zip bombası ve bozuk arşivler reddedilir.",
      "f3.title": "Aynı Wi-Fi'de anında",
      "f3.body": "Sunucu 0.0.0.0:port üzerinde dinler; panel gerçek LAN adresini gösterir. Wi-Fi'deki herhangi bir cihaz siteyi açar — internet bile gerekmez.",
      "f4.title": "Cloudflare Tunnel",
      "f4.body": "Hızlı tünel ile geçici bir *.trycloudflare.com HTTPS adresi; Named Tunnel için token yalnızca Android Keystore'da şifreli saklanır.",
      "f5.title": "Gerçek metrikler",
      "f5.body": "İstek sayısı, aktif bağlantı, yanıt dağılımı, gecikme (p50/p95), RAM/ısı/trafik… Cihazın vermediği değer \"kullanılamıyor\" yazar — asla uydurulmaz.",
      "f6.title": "Gizlilik odaklı",
      "f6.body": "Sadece uygulamaya özel depolama; geniş depolama izni yok. Yönetim yüzeyi HTTP'ye açılmaz. Dosya erişimi her site köküne os.Root ile hapsedilir.",
      "how.overline": "Üç adım",
      "how.heading": "ZIP'ten yayına, üç adımda.",
      "how.s1.title": "Kur",
      "how.s1.body": "ARM64 Android 8.0+ bir telefon yeter. Uygulamayı GitHub üzerinden edin, bildirim iznini onayla.",
  "how.s2.title": "Site ekle veya proxy bağla",
  "how.s2.body": "AI ZIP'ini İçe Aktar ile seç ya da ADD PORT PROXY ile Termux portunu bağla. PocketHost kök dizini bulur, doğrular; proxy'de canlı upstream taraması yapar.",
      "how.s3.title": "Yayına al",
      "how.s3.body": "BAŞLAT'a bas. Yerel URL hazır. İstersen Cloudflare Tunnel'ı bağlayıp HTTPS'le dünyaya aç.",
      "screens.overline": "Uygulama içinden",
  "screens.heading": "Panel, siteler, port proxy.",
      "screens.lead": "Gerçek ekran görüntüleri — koyu ve açık tema desteklenir.",
      "g1.title": "Panel",
      "g1.sub": "Sunucu durumu, yerel URL, site özeti",
      "g2.title": "Metrikler",
      "g2.sub": "İstekler, gecikme, yanıt kodları",
      "g3.title": "Siteler",
      "g3.sub": "Depolama, dosya sayısı, index durumu",
      "g4.title": "Tünel",
      "g4.sub": "Hızlı tünel & Named Tunnel",
      "g5.title": "Ayarlar",
      "g5.sub": "Port, bağlama modu, tema",
      "specs.overline": "Teknik künye",
      "specs.heading": "Meraklısına ayrıntılar.",
      "spec.platform": "Platform",
      "spec.platformV": "Android 8.0+ (API 26) · hedef SDK 36",
      "spec.abi": "Mimari",
      "spec.abiV": "arm64-v8a",
      "spec.engine": "Sunucu motoru",
  "spec.engineV": "Go net/http · gomobile ile süreç içinde · reverse proxy",
      "spec.tunnel": "Tünel",
      "spec.tunnelV": "cloudflared 2026.10.7 · 1.1.1.1/8.8.8.8 DNS yaması · 16 KB uyumlu",
      "spec.data": "Veri",
      "spec.dataV": "Yalnızca uygulamaya özel depolama + Room/SQLite",
      "spec.security": "Güvenlik",
      "spec.securityV": "Keystore AES-256-GCM · os.Root hapsi · JNI-only yönetim",
      "spec.perms": "İzinler",
      "spec.permsV": "İnternet, ağ durumu, foreground service, bildirim, wake lock",
      "spec.price": "Ücret",
      "spec.priceV": "Yerel barındırma ücretsiz · reklam ve izleme yok",
      "links.overline": "Takip et",
      "links.heading": "Geliştiriciyi takip et.",
      "links.lead": "Yeni sürümler, duyurular ve iletişim için:",
      "links.x": "X (Twitter)",
      "links.xSub": "@PrivyXe · duyurular ve güncellemeler",
      "links.gh": "GitHub",
  "links.ghSub": "PrivyXe/PocketHost · sürümler ve dokümantasyon",
      "links.ig": "Instagram",
      "links.igSub": "@mr_cimen_ · perde arkası",
      "links.note": "PocketHost bağımsız bir projedir. APK dağıtımı bu sayfada yapılmaz; yeni sürümler GitHub üzerinden duyurulur.",
      "faq.overline": "Sık sorulanlar",
      "faq.heading": "Aklına takılanlar.",
      "q1.q": "Root veya Termux gerekiyor mu?",
      "q1.a": "Hayır. PocketHost sıradan, rootlanmamış bir Android telefon için tasarlandı. Linux, Termux, SSH veya sunucu bilgisi gerekmez.",
      "q2.q": "Ücretsiz mi? İleride ücretli olacak mı?",
      "q2.a": "Bu sürümde yerel barındırma tamamen ücretsiz ve reklamsız. Gelecekte isteğe bağlı \"yönetilen tünel / özel alan adı\" gibi eklentiler ücretli olabilir; çekirdek işlev ücretsiz kalacak şekilde tasarlanıyor.",
      "q3.q": "Sitem internete açık olacak mı?",
      "q3.a": "Varsayılan olarak yalnızca aynı Wi-Fi ağındaki cihazlar erişir. Dünyaya açmak için Cloudflare Tunnel'ı açıkça bağlarsın — uygulama herkese açmadan önce onay ister.",
      "q4.q": "Hangi siteler destekleniyor?",
  "q4.a": "Statik siteler (HTML/CSS/JS/resim/font) ve Termux'ta çalışan Node/PHP/Python sunucularına port proxy. PHP/Node runtime'ı APK'ya gömülmez; MySQL veya Docker yoktur. Proxy'lerde Host başlığı proxy başına seçilebilir.",
      "q5.q": "Cloudflare Tunnel ücretli mi?",
      "q5.a": "Hızlı tünel (geçici *.trycloudflare.com) Cloudflare hesabı gerektirmez. Kalıcı (Named) tünel için Cloudflare hesabı ve tünel tokenı gerekir; token cihazda şifreli saklanır.",
      "q6.q": "iPhone'da çalışır mı?",
      "q6.a": "Hayır, PocketHost Android'e özgüdür (Android 8.0+ / ARM64). iOS'ta arka planda sürekli sunucu çalıştırmak platform kuralları gereği mümkün değildir.",
      "q7.q": "Pil dostu mu?",
      "q7.a": "Sunucu çalışırken kısmi wake lock ve Wi-Fi kilidi alınır; sunucu durunca arka plan yoklaması da durur. Ölçülen boşta bellek ~100 MB seviyesindedir.",
      "footer.note": "Telefonunda üretildi, telefonunda yayınlandı. 🙂<br />Bu sayfa PocketHost tarafından barındırılabilen sıradan bir statik sitedir.",
      "footer.top": "Yukarı",
      "footer.credit": "Geliştirici: @mr_cimen_ · MIT lisanslı bağımsız proje."
    },

    en: {
      "meta.title": "PocketHost — Turn your phone into a web server",
  "meta.desc": "PocketHost hosts a ZIP website — or reverse-proxies a Node/PHP/Python server running in Termux — straight from your Android phone. No Linux, no root; the Termux upstream is optional.",
      "a11y.skip": "Skip to content",
      "nav.features": "Features",
      "nav.how": "How it works",
      "nav.screens": "Screens",
      "nav.specs": "Specs",
      "nav.faq": "FAQ",
      "nav.links": "Links",
      "nav.github": "GitHub",
      "nav.langAria": "Language",
      "nav.themeAria": "Toggle theme",
  "hero.badge": "Android 8+ · ARM64 · v1.1.4",
      "hero.title": "Turn your phone into a<br /><span class=\"grad\">web server</span>.",
  "hero.lead": "Drop in a ZIP and publish in one tap — or reverse-proxy a Node/PHP/Python server running in Termux under the same address. <strong>No Linux, no root.</strong> Everyone on your Wi-Fi can open it in seconds; put it on HTTPS with Cloudflare Tunnel.",
      "hero.ctaGithub": "Explore on GitHub",
      "hero.ctaScreens": "See the screens",
      "hero.fact1": "No ads",
      "hero.fact2": "No tracking",
      "hero.fact3": "100% on-device",
      "hero.fact4": "Independent project",
      "hero.chip1": "Go HTTP engine",
  "hero.chip2": "ZIP + Termux",
      "hero.chip3": "Cloudflare Tunnel",
      "stats.s1v": "One tap",
      "stats.s1l": "to publish",
  "stats.s2v": "13.8 MB",
      "stats.s2l": "app size",
      "stats.s3v": "Two layers",
      "stats.s3l": "LAN + Cloudflare HTTPS",
      "stats.s4v": "0",
      "stats.s4l": "ads & trackers",
      "features.overline": "Why PocketHost?",
      "features.heading": "A server in your pocket, with real engineering.",
  "features.lead": "Not a demo or UI prototype: a real Go HTTP server inside the app process, real ZIP security checks, real reverse proxying to a Termux upstream, and real measurements.",
      "f1.title": "Embedded Go engine",
      "f1.body": "A net/http server built with gomobile runs directly inside the app process. No separate process, no shell, no external binaries — driven over a JNI bridge.",
      "f2.title": "One-tap ZIP import",
      "f2.body": "Pick your site as a ZIP: it finds the web root, extracts safely and shows a preview. ZIP-Slip, symlinks, zip bombs and corrupted archives are rejected.",
      "f3.title": "Instant on your Wi-Fi",
      "f3.body": "The server listens on 0.0.0.0:port and the dashboard shows the real LAN address. Any device on your Wi-Fi can open the site — no internet required.",
      "f4.title": "Cloudflare Tunnel",
      "f4.body": "Quick Tunnel gives you a temporary *.trycloudflare.com HTTPS URL; for Named Tunnels the token is stored encrypted in the Android Keystore only.",
      "f5.title": "Real metrics",
      "f5.body": "Requests, active connections, status distribution, latency (p50/p95), RAM/thermal/network… Anything the device does not expose is shown as \"unavailable\" — never invented.",
      "f6.title": "Privacy-first",
      "f6.body": "App-private storage only, no broad storage permissions. No HTTP management surface, and every site's file access is confined to its root via os.Root.",
      "how.overline": "Three steps",
      "how.heading": "From ZIP to live, in three steps.",
      "how.s1.title": "Install",
      "how.s1.body": "Any ARM64 Android 8.0+ phone works. Get the app from GitHub and allow notifications.",
  "how.s2.title": "Add a site or connect a proxy",
  "how.s2.body": "Import the ZIP from your AI builder, or connect a Termux port with ADD PORT PROXY. PocketHost detects the root and validates it, and scans for live upstreams for proxies.",
      "how.s3.title": "Go live",
      "how.s3.body": "Press START. Your local URL is ready. Optionally connect Cloudflare Tunnel to serve it over HTTPS.",
      "screens.overline": "From inside the app",
  "screens.heading": "Dashboard, sites, port proxy.",
      "screens.lead": "Real screenshots — dark and light themes supported.",
      "g1.title": "Dashboard",
      "g1.sub": "Server status, local URL, site summary",
      "g2.title": "Metrics",
      "g2.sub": "Requests, latency, response codes",
      "g3.title": "Sites",
      "g3.sub": "Storage, file count, index status",
      "g4.title": "Tunnel",
      "g4.sub": "Quick tunnel & Named Tunnel",
      "g5.title": "Settings",
      "g5.sub": "Port, bind mode, theme",
      "specs.overline": "Tech sheet",
      "specs.heading": "Details for the curious.",
      "spec.platform": "Platform",
      "spec.platformV": "Android 8.0+ (API 26) · target SDK 36",
      "spec.abi": "Architecture",
      "spec.abiV": "arm64-v8a",
      "spec.engine": "Server engine",
  "spec.engineV": "Go net/http · in-process via gomobile · reverse proxy",
      "spec.tunnel": "Tunnel",
      "spec.tunnelV": "cloudflared 2026.10.7 · 1.1.1.1/8.8.8.8 DNS patch · 16 KB page compatible",
      "spec.data": "Data",
      "spec.dataV": "App-private storage only + Room/SQLite",
      "spec.security": "Security",
      "spec.securityV": "Keystore AES-256-GCM · os.Root confinement · JNI-only control",
      "spec.perms": "Permissions",
      "spec.permsV": "Internet, network state, foreground service, notifications, wake lock",
      "spec.price": "Price",
      "spec.priceV": "Local hosting is free · no ads, no tracking",
      "links.overline": "Follow",
      "links.heading": "Follow the developer.",
      "links.lead": "For new releases, announcements and contact:",
      "links.x": "X (Twitter)",
      "links.xSub": "@PrivyXe · announcements and updates",
      "links.gh": "GitHub",
  "links.ghSub": "PrivyXe/PocketHost · releases and documentation",
      "links.ig": "Instagram",
      "links.igSub": "@mr_cimen_ · behind the scenes",
      "links.note": "PocketHost is an independent project. This site does not distribute the APK; new versions are announced on GitHub.",
      "faq.overline": "FAQ",
      "faq.heading": "Questions you may have.",
      "q1.q": "Do I need root or Termux?",
      "q1.a": "No. PocketHost is designed for an ordinary, non-rooted Android phone. No Linux, Termux, SSH or server knowledge required.",
      "q2.q": "Is it free? Will it cost money later?",
      "q2.a": "Local hosting is free and ad-free in this version. Optional add-ons such as managed tunnelling or custom domains may be paid in the future; the core is designed to stay free.",
      "q3.q": "Will my site be exposed to the internet?",
      "q3.a": "By default only devices on the same Wi-Fi can reach it. Going public requires explicitly connecting Cloudflare Tunnel, and the app asks for confirmation before exposing anything.",
      "q4.q": "Which sites are supported?",
  "q4.a": "Static sites (HTML/CSS/JS/images/fonts) plus port proxies to Node/PHP/Python servers running in Termux. No PHP/Node runtime is embedded in the APK; no MySQL or Docker. The Host header is chosen per proxy.",
      "q5.q": "Is Cloudflare Tunnel free?",
      "q5.a": "Quick Tunnels (temporary *.trycloudflare.com URLs) need no Cloudflare account. Named Tunnels require a Cloudflare account and tunnel token, stored encrypted on the device.",
      "q6.q": "Does it work on iPhone?",
      "q6.a": "No. PocketHost is Android-only (8.0+ / ARM64). iOS platform rules do not allow a continuously running background server.",
      "q7.q": "Is it battery friendly?",
      "q7.a": "A partial wake lock and Wi-Fi lock are held only while hosting; when the server stops, background polling stops too. Measured idle memory is around 100 MB.",
      "footer.note": "Built on a phone, published from a phone. 🙂<br />This page is an ordinary static site that PocketHost can serve.",
      "footer.top": "Back to top",
      "footer.credit": "Developer: @mr_cimen_ · MIT-licensed independent project."
    },

    cn: {
      "meta.title": "PocketHost — 把你的手机变成网页服务器",
  "meta.desc": "PocketHost 让你在手机上发布 ZIP 静态网站，或用端口代理转发 Termux 中的 Node/PHP/Python 服务。无需 Linux 或 root；Termux 上游可选。",
      "a11y.skip": "跳到正文",
      "nav.features": "功能",
      "nav.how": "工作原理",
      "nav.screens": "界面",
      "nav.specs": "技术规格",
      "nav.faq": "常见问题",
      "nav.links": "链接",
      "nav.github": "GitHub",
      "nav.langAria": "语言",
      "nav.themeAria": "切换主题",
  "hero.badge": "Android 8+ · ARM64 · v1.1.4",
      "hero.title": "把你的手机<br /><span class=\"grad\">变成网页服务器</span>。",
  "hero.lead": "把 ZIP 网站放到手机上，一键发布；也可以把 Termux 中的 Node/PHP/Python 服务用端口代理发布到同一地址。<strong>无需 Linux，无需 root。</strong>同一 Wi-Fi 的设备几秒内即可访问；可用 Cloudflare Tunnel 上 HTTPS。",
      "hero.ctaGithub": "在 GitHub 上查看",
      "hero.ctaScreens": "查看界面",
      "hero.fact1": "无广告",
      "hero.fact2": "不追踪",
      "hero.fact3": "100% 本地",
      "hero.fact4": "独立项目",
      "hero.chip1": "Go HTTP 引擎",
  "hero.chip2": "ZIP + Termux",
      "hero.chip3": "Cloudflare Tunnel",
      "stats.s1v": "一键",
      "stats.s1l": "发布上线",
  "stats.s2v": "13.8 MB",
      "stats.s2l": "应用体积",
      "stats.s3v": "两层",
      "stats.s3l": "局域网 + Cloudflare HTTPS",
      "stats.s4v": "0",
      "stats.s4l": "广告与追踪器",
      "features.overline": "为什么选择 PocketHost？",
      "features.heading": "口袋里的服务器，专业级架构。",
  "features.lead": "这不是演示或 UI 原型：进程内运行真实 Go HTTP 服务器、真实 ZIP 安全检查、对 Termux 上游的真实反向代理和真实指标。",
      "f1.title": "内嵌 Go 引擎",
      "f1.body": "基于 net/http 的服务器通过 gomobile 直接在应用进程内运行。没有独立进程、shell 或外部二进制文件，由 JNI 桥接控制。",
      "f2.title": "ZIP 一键导入",
      "f2.body": "选择 ZIP 后自动识别网站根目录、安全解压并给出预览。ZIP-Slip、符号链接、压缩炸弹和损坏压缩包都会被拒绝。",
      "f3.title": "同一 Wi-Fi 立即可用",
      "f3.body": "服务器监听 0.0.0.0:端口，面板显示真实局域网地址。同一 Wi-Fi 下任何设备都能打开——甚至不需要互联网。",
      "f4.title": "Cloudflare Tunnel",
      "f4.body": "快速隧道会生成临时的 *.trycloudflare.com HTTPS 地址；命名隧道的令牌只加密保存在 Android Keystore 中。",
      "f5.title": "真实指标",
      "f5.body": "请求数、活动连接、响应分布、延迟（p50/p95）、内存/温度/流量……设备无法提供的值会显示“不可用”——绝不编造。",
      "f6.title": "以隐私为先",
      "f6.body": "仅使用应用私有存储，不申请宽泛的存储权限；管理接口不开放 HTTP；文件访问通过 os.Root 限定在站点根目录内。",
      "how.overline": "三步",
      "how.heading": "三步从 ZIP 到上线。",
      "how.s1.title": "安装",
      "how.s1.body": "一台 ARM64、Android 8.0+ 的手机即可。从 GitHub 获取应用并允许通知权限。",
  "how.s2.title": "导入网站或连接代理",
  "how.s2.body": "用“导入”选择 AI 生成的 ZIP，或用 ADD PORT PROXY 连接 Termux 端口。PocketHost 会识别根目录并校验；代理会实时扫描上游。",
      "how.s3.title": "发布上线",
      "how.s3.body": "点击“启动”。本地 URL 立即就绪；可选连接 Cloudflare Tunnel 通过 HTTPS 对外发布。",
      "screens.overline": "应用内截图",
  "screens.heading": "面板、网站、端口代理。",
      "screens.lead": "真实截图——支持深色与浅色主题。",
      "g1.title": "面板",
      "g1.sub": "服务器状态、本地 URL、站点摘要",
      "g2.title": "指标",
      "g2.sub": "请求、延迟、响应码",
      "g3.title": "站点",
      "g3.sub": "存储、文件数、index 状态",
      "g4.title": "隧道",
      "g4.sub": "快速隧道与命名隧道",
      "g5.title": "设置",
      "g5.sub": "端口、绑定模式、主题",
      "specs.overline": "技术规格",
      "specs.heading": "给好奇者的细节。",
      "spec.platform": "平台",
      "spec.platformV": "Android 8.0+（API 26）· 目标 SDK 36",
      "spec.abi": "架构",
      "spec.abiV": "arm64-v8a",
      "spec.engine": "服务器引擎",
  "spec.engineV": "Go net/http · 进程内 gomobile · 反向代理",
      "spec.tunnel": "隧道",
      "spec.tunnelV": "cloudflared 2026.10.7 · 1.1.1.1/8.8.8.8 DNS 补丁 · 16 KB 兼容",
      "spec.data": "数据",
      "spec.dataV": "仅应用私有存储 + Room/SQLite",
      "spec.security": "安全",
      "spec.securityV": "Keystore AES-256-GCM · os.Root 限制 · 仅 JNI 管理",
      "spec.perms": "权限",
      "spec.permsV": "网络、网络状态、前台服务、通知、Wake Lock",
      "spec.price": "费用",
      "spec.priceV": "本地托管免费 · 无广告、无追踪",
      "links.overline": "关注",
      "links.heading": "关注开发者。",
      "links.lead": "获取新版本、公告与联系方式：",
      "links.x": "X（推特）",
      "links.xSub": "@PrivyXe · 公告与更新",
      "links.gh": "GitHub",
  "links.ghSub": "PrivyXe/PocketHost · 版本与文档",
      "links.ig": "Instagram",
      "links.igSub": "@mr_cimen_ · 幕后花絮",
      "links.note": "PocketHost 是独立项目，本页面不提供 APK 下载；新版本通过 GitHub 发布。",
      "faq.overline": "常见问题",
      "faq.heading": "你可能想问。",
      "q1.q": "需要 root 或 Termux 吗？",
      "q1.a": "不需要。PocketHost 面向普通、未 root 的 Android 手机设计，无需 Linux、Termux、SSH 或服务器知识。",
      "q2.q": "免费吗？以后会收费吗？",
      "q2.a": "当前版本的本地托管完全免费且无广告。未来可选的“托管隧道 / 自定义域名”等扩展可能收费，核心功能将保持免费。",
      "q3.q": "我的网站会暴露在公网吗？",
      "q3.a": "默认只有同一 Wi-Fi 网络中的设备可以访问。要对外开放需你主动连接 Cloudflare Tunnel，应用会在公开前请求确认。",
      "q4.q": "支持哪些网站？",
  "q4.a": "静态网站（HTML/CSS/JS/图片/字体）以及对 Termux 中 Node/PHP/Python 服务的端口代理。不会把 PHP/Node 运行时打包进 APK；不支持 MySQL 或 Docker。每个代理可选择 Host 模式。",
      "q5.q": "Cloudflare Tunnel 收费吗？",
      "q5.a": "快速隧道（临时 *.trycloudflare.com）无需 Cloudflare 账户。命名隧道需要 Cloudflare 账户和隧道令牌；令牌在设备上加密保存。",
      "q6.q": "iPhone 能用吗？",
      "q6.a": "不能。PocketHost 仅支持 Android（8.0+ / ARM64）。受平台规则限制，iOS 无法在后台持续运行服务器。",
      "q7.q": "省电吗？",
      "q7.a": "仅在服务器运行时持有部分唤醒锁和 Wi-Fi 锁；停止后后台轮询也会停止。实测空闲内存约 100 MB。",
      "footer.note": "在手机上开发，在手机上发布。🙂<br />本页面就是一个可由 PocketHost 托管的普通静态网站。",
      "footer.top": "回到顶部",
      "footer.credit": "开发者：@mr_cimen_ · MIT 许可的独立项目。"
    }
  };

  var HTML_LANG = { tr: "tr", en: "en", cn: "zh-CN" };
  var current = "tr";

  function detect() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && DICT[q]) return q;
      var saved = localStorage.getItem("ph-lang");
      if (saved && DICT[saved]) return saved;
      var nav = (navigator.language || "tr").toLowerCase();
      if (nav.indexOf("tr") === 0) return "tr";
      if (nav.indexOf("zh") === 0) return "cn";
      if (nav.indexOf("en") === 0) return "en";
    } catch (e) { /* yoksay */ }
    return "tr";
  }

  function setLang(lang, persist) {
    if (!DICT[lang]) return;
    current = lang;
    var d = DICT[lang];

    document.documentElement.lang = HTML_LANG[lang];

    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var v = d[el.getAttribute("data-i18n")];
      if (typeof v === "string") el.textContent = v;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-html]"), function (el) {
      var v = d[el.getAttribute("data-i18n-html")];
      if (typeof v === "string") el.innerHTML = v;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-attr]"), function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var bits = pair.split(":");
        if (bits.length < 2) return;
        var attr = bits[0].trim();
        var key = bits.slice(1).join(":").trim();
        var v = d[key];
        if (typeof v === "string") el.setAttribute(attr, v);
      });
    });

    if (d["meta.title"]) document.title = d["meta.title"];

    Array.prototype.forEach.call(document.querySelectorAll(".lang-switch button"), function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });

    if (persist) {
      try { localStorage.setItem("ph-lang", lang); } catch (e) { /* yoksay */ }
      try {
        var url = new URL(location.href);
        url.searchParams.set("lang", lang);
        history.replaceState(null, "", url.toString());
      } catch (e) { /* file:// veya eski tarayıcı */ }
    }
  }

  function init() {
    setLang(detect(), false);
    Array.prototype.forEach.call(document.querySelectorAll(".lang-switch button"), function (btn) {
      btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang"), true); });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  function check() {
    var d = DICT[current];
    var missing = [];
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n],[data-i18n-html],[data-i18n-attr]"), function (el) {
      var keys = [];
      if (el.hasAttribute("data-i18n")) keys.push(el.getAttribute("data-i18n"));
      if (el.hasAttribute("data-i18n-html")) keys.push(el.getAttribute("data-i18n-html"));
      if (el.hasAttribute("data-i18n-attr")) {
        el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
          var bits = pair.split(":");
          if (bits.length >= 2) keys.push(bits.slice(1).join(":").trim());
        });
      }
      keys.forEach(function (k) { if (typeof d[k] !== "string" && missing.indexOf(k) < 0) missing.push(k); });
    });
    return missing;
  }

  window.PHI18N = {    check: check,
    setLang: setLang,
    get lang() { return current; },
    languages: Object.keys(DICT)
  };
})();
