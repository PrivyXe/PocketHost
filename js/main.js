/* ============================================================
   PocketHost tanıtım sitesi — küçük, bağımlılıksız davranışlar
   (tema, mobil menü, scroll-reveal, lightbox, SHA kopyalama)
   ============================================================ */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------- tema */
  function applyTheme(theme) {
    doc.dataset.theme = theme;
    try { localStorage.setItem("ph-theme", theme); } catch (e) { /* gizli mod */ }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f8fb" : "#070b0f");
    var toggle = document.getElementById("themeToggle");
    if (toggle) toggle.setAttribute("aria-label", theme === "light" ? "Koyu temaya geç" : "Açık temaya geç");
  }

  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(doc.dataset.theme === "light" ? "dark" : "light");
    });
  }
  // sistem teması ile ilk açılış (kayıtlı tercih yoksa koyu kalır — marka tercihi)

  /* ---------------------------------------------------------- mobil menü */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.addEventListener("click", function (event) {
      if (event.target && event.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeNav();
    });
  }

  /* ---------------------------------------------------------- nav gölgesi */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 8) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------------------------------------- scroll reveal */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = Number(el.dataset.delay || 0);
        window.setTimeout(function () { el.classList.add("is-visible"); }, delay);
        observer.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealItems.forEach(function (el, index) {
      // aynı bölgedeki kartlar hafif kademeli gelsin
      el.dataset.delay = String((index % 6) * 55);
      observer.observe(el);
    });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------------------------------------------------------- lightbox */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var lastFocused = null;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Ekran görüntüsü";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll(".shot-btn"), function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      openLightbox(btn.dataset.full, img ? img.alt : "");
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });

  /* ---------------------------------------------------------- aktif nav linki */
  var sections = ["ozellikler", "nasil", "ekranlar", "teknik", "sss"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navLinks) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Array.prototype.forEach.call(navLinks.querySelectorAll("a"), function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          link.style.color = active ? "var(--text)" : "";
          link.style.background = active ? "var(--card-2)" : "";
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (section) { navObserver.observe(section); });
  }
})();
