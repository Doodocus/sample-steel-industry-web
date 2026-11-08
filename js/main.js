/* Northstar demo: renders shared chrome + content from window.SITE (js/config.js). */
(function () {
  "use strict";
  var C = window.SITE || {};
  var doc = document, body = doc.body, page = body.dataset.page || "home";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var wa = function (text) { return "https://wa.me/" + C.whatsapp + (text ? "?text=" + encodeURIComponent(text) : ""); };

  /* ---------- Icons (inline SVG, stroke) ---------- */
  var P = {
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>',
    doc: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>',
    truck: '<path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="6" rx="1"/><rect x="17" y="14" width="5" height="6" rx="1"/>',
    building: '<path d="M4 21V5l8-3v19M12 9h8v12M2 21h20M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
    bridge: '<path d="M2 18h20M4 18V9M20 18V9M2 9c4 0 6 5 10 5s6-5 10-5M8 18v-5M16 18v-5M12 18v-4"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 11h14M9 21l-2-4M15 21l2-4"/><circle cx="9" cy="14" r=".5"/><circle cx="15" cy="14" r=".5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    drop: '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
    leaf: '<path d="M5 19c0-9 6-15 15-15 0 9-6 15-15 15zM5 19l7-7"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    chat: '<path d="M4 20l1.5-4A8 8 0 1 1 9 19.5z"/><path d="M9 10h6M9 13h4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>'
  };
  function ic(n, cls) { return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (P[n] || "") + "</svg>"; }
  function media(src, alt, w, h, cls) {
    return '<div class="media ' + (cls || "") + '"><img src="' + esc(src) + '" alt="' + esc(alt) + '" width="' + w + '" height="' + h + '" loading="lazy" decoding="async" onerror="this.remove()"></div>';
  }
  function logo() {
    return '<svg class="logo-mark" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true"><rect width="40" height="40" fill="#16181B"/><path d="M20 4 23 17 36 20 23 23 20 36 17 23 4 20 17 17z" fill="var(--accent)"/><path d="M20 12 21.5 18.5 28 20 21.5 21.5 20 28 18.5 21.5 12 20 18.5 18.5z" fill="#0E0F11"/></svg>' +
      '<span class="logo-text"><b>' + esc(C.shortName) + "</b><small>" + esc(C.logoLine2) + "</small></span>";
  }

  /* ---------- Theme + meta ---------- */
  if (C.accent) doc.documentElement.style.setProperty("--accent", C.accent);
  var pm = (C.pages || {})[page];
  if (pm) {
    doc.title = pm.title + " | " + C.name;
    var setMeta = function (sel, val) { var m = $(sel); if (m) m.setAttribute("content", val); };
    setMeta('meta[name="description"]', pm.description);
    setMeta('meta[property="og:title"]', doc.title);
    setMeta('meta[property="og:description"]', pm.description);
    setMeta('meta[property="og:site_name"]', C.name);
  }
  /* JSON-LD (runtime only) */
  (function () {
    var org = {
      "@context": "https://schema.org", "@type": "Organization", name: C.name, url: C.siteUrl, email: C.email, telephone: C.phoneHref,
      foundingDate: String(C.yearFounded), slogan: C.tagline,
      address: { "@type": "PostalAddress", streetAddress: C.address, addressLocality: C.city, addressRegion: C.state, addressCountry: "IN" }
    };
    var list = { "@context": "https://schema.org", "@type": "ItemList", name: C.name + " products",
      itemListElement: (C.products || []).map(function (p, i) {
        return { "@type": "ListItem", position: i + 1, item: { "@type": "Product", name: p.name, description: p.short, category: "Steel", brand: { "@type": "Brand", name: C.name } } };
      }) };
    [org, list].forEach(function (o) { var s = doc.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(o); doc.head.appendChild(s); });
  })();

  /* ---------- Data binding ---------- */
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, C); }
  $$("[data-c]").forEach(function (el) { var v = get(el.dataset.c); if (v != null) el.textContent = v; });
  $$("[data-tel]").forEach(function (a) { a.href = "tel:" + C.phoneHref; });
  $$("[data-mail]").forEach(function (a) { a.href = "mailto:" + C.email; });
  $$("[data-wa]").forEach(function (a) { a.href = wa(a.dataset.wa || ""); a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Ribbon ---------- */
  var ribbonOff = false; try { ribbonOff = localStorage.getItem("ns-ribbon") === "1"; } catch (e) {}
  if (!ribbonOff) {
    var rb = doc.createElement("div"); rb.className = "ribbon";
    rb.innerHTML = '<p><span class="dot"></span>Concept demo with sample content</p><button type="button" aria-label="Dismiss demo notice">' + ic("close") + "</button>";
    var hdrEl = $("#siteHeader"); if (hdrEl) body.insertBefore(rb, hdrEl); else body.insertBefore(rb, body.firstChild);
    rb.querySelector("button").addEventListener("click", function () { rb.remove(); try { localStorage.setItem("ns-ribbon", "1"); } catch (e) {} });
  }

  /* ---------- Header ---------- */
  var NAV = [["index.html", "Home", "home"], ["products.html", "Products", "products"], ["infrastructure.html", "Infrastructure", "infrastructure"], ["infrastructure.html#quality", "Quality", "q"], ["about.html", "About", "about"], ["contact.html", "Contact", "contact"]];
  var header = $("#siteHeader");
  if (header) {
    header.innerHTML = '<div class="container hdr">' +
      '<a class="logo" href="index.html" aria-label="' + esc(C.name) + ' home">' + logo() + "</a>" +
      '<nav class="nav" id="mainNav" aria-label="Main"><ul>' + NAV.map(function (n) {
        return '<li><a href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page"' : "") + ">" + n[1] + "</a></li>";
      }).join("") + '</ul><div class="nav-mobile-cta"><a class="btn btn-primary" href="contact.html">Get Quote</a><a class="btn btn-ghost" data-tel href="tel:' + esc(C.phoneHref) + '">' + ic("phone") + esc(C.phone) + "</a></div></nav>" +
      '<a class="btn btn-primary btn-sm hdr-cta" href="contact.html">Get Quote</a>' +
      '<button class="burger" type="button" aria-expanded="false" aria-controls="mainNav" aria-label="Open menu"><span></span><span></span><span></span></button>' +
      "</div>";
    var burger = $(".burger", header);
    var setNav = function (open) {
      body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    burger.addEventListener("click", function () { setNav(!body.classList.contains("nav-open")); });
    $$(".nav a", header).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
    doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && body.classList.contains("nav-open")) { setNav(false); burger.focus(); } });
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 24); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* ---------- Footer + floating buttons ---------- */
  var footer = $("#siteFooter");
  if (footer) {
    footer.innerHTML = '<div class="container">' +
      '<div class="ft-grid">' +
        '<div class="ft-brand"><a class="logo" href="index.html">' + logo() + '</a><p>' + esc(C.tagline) + '</p><div class="social">' +
          ["linkedin", "facebook", "instagram", "youtube"].map(function (s) { return '<a href="' + esc((C.social || {})[s] || "#") + '" aria-label="' + s + ' (placeholder)">' + s.slice(0, 2).toUpperCase() + "</a>"; }).join("") +
        "</div></div>" +
        '<div><h3>Company</h3><ul><li><a href="about.html">About us</a></li><li><a href="infrastructure.html">Infrastructure</a></li><li><a href="infrastructure.html#quality">Quality</a></li><li><a href="infrastructure.html#logistics">Logistics</a></li><li><a href="contact.html">Contact</a></li></ul></div>' +
        '<div><h3>Products</h3><ul>' + (C.products || []).map(function (p) { return '<li><a href="products.html?open=' + p.id + '">' + esc(p.name) + "</a></li>"; }).join("") + "</ul></div>" +
        '<div><h3>Reach us</h3><ul class="ft-contact">' +
          "<li>" + ic("pin") + "<span>" + esc(C.address) + "</span></li>" +
          '<li>' + ic("phone") + '<a href="tel:' + esc(C.phoneHref) + '">' + esc(C.phone) + "</a></li>" +
          '<li>' + ic("mail") + '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>" +
          "<li>" + ic("clock") + "<span>" + esc(C.hours) + "</span></li>" +
        "</ul></div>" +
      "</div>" +
      '<div class="ft-bottom"><p>© ' + new Date().getFullYear() + " " + esc(C.name) + '. All rights reserved.</p><p class="prepared">Concept preview prepared by <a href="' + esc(C.preparedByUrl) + '">' + esc(C.preparedBy) + "</a></p></div>" +
      "</div>";
  }
  var fab = doc.createElement("div"); fab.className = "fab";
  fab.innerHTML = '<a class="fab-wa" href="' + wa("Hello " + C.name + ", I have a steel requirement.") + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + ic("chat") + '</a><a class="fab-call" href="tel:' + esc(C.phoneHref) + '" aria-label="Call ' + esc(C.phone) + '">' + ic("phone") + "</a>";
  body.appendChild(fab);

  /* ---------- Section renderers ---------- */
  function fill(id, html) { var el = doc.getElementById(id); if (el) el.innerHTML = html; return el; }
  var R = "data-reveal";

  fill("stats", (C.stats || []).map(function (s) {
    return '<div class="stat" ' + R + '><strong data-count="' + s.value + '" data-suffix="' + esc(s.suffix) + '">' + Number(s.value).toLocaleString("en-IN") + esc(s.suffix) + "</strong><span>" + esc(s.label) + "</span></div>";
  }).join(""));
  fill("plantFacts", ((C.plant || {}).facts || []).map(function (s) {
    return '<div class="stat" ' + R + '><strong data-count="' + s.value + '" data-suffix="' + esc(s.suffix) + '">' + s.value + esc(s.suffix) + "</strong><span>" + esc(s.label) + "</span></div>";
  }).join(""));

  var certItems = (C.certifications || []).map(function (c) { return '<li>' + ic("shield") + "<b>" + esc(c.name) + "</b><span>" + esc(c.note) + "</span></li>"; }).join("");
  fill("marquee", '<ul class="mq-track">' + certItems + '</ul><ul class="mq-track" aria-hidden="true">' + certItems + "</ul>");
  fill("certGrid", (C.certifications || []).map(function (c) { return '<div class="badge" ' + R + ">" + ic("shield") + "<b>" + esc(c.name) + "</b><span>" + esc(c.note) + "</span></div>"; }).join(""));

  function productCard(p, asButton) {
    var inner = media(p.image, p.name + " stacked at the " + C.name + " plant", 1600, 1195) +
      '<div class="pc-body"><span class="tag">' + esc(p.standard.split(" (")[0].split(",")[0]) + "</span><h3>" + esc(p.name) + "</h3><p>" + esc(p.short) + '</p><span class="pc-link">' + (asButton ? "View specifications" : "Explore") + ic("arrow") + "</span></div>";
    return asButton
      ? '<button type="button" class="pcard" data-open="' + p.id + '" data-group="' + p.group + '" ' + R + ">" + inner + "</button>"
      : '<a class="pcard" href="products.html?open=' + p.id + '" ' + R + ">" + inner + "</a>";
  }
  fill("productGrid", (C.products || []).map(function (p) { return productCard(p, false); }).join(""));
  fill("catalogue", (C.products || []).map(function (p) { return productCard(p, true); }).join(""));

  fill("whyGrid", (C.whyUs || []).map(function (w, i) {
    return '<div class="why" ' + R + '>' + ic(w.icon) + "<h3>" + esc(w.title) + "</h3><p>" + esc(w.text) + "</p></div>";
  }).join(""));
  fill("processPreview", (C.process || []).map(function (s, i) {
    return '<li ' + R + '><span class="pp-n">0' + (i + 1) + "</span><h3>" + esc(s.title) + "</h3></li>";
  }).join(""));
  fill("timeline", '<div class="tl-line"><div class="tl-fill"></div></div>' + (C.process || []).map(function (s, i) {
    return '<li class="tl-step" ' + R + '><span class="tl-dot">0' + (i + 1) + '</span><div class="tl-card"><h3>' + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></div></li>";
  }).join(""));
  fill("industries", (C.industries || []).map(function (n) { return '<li ' + R + ">" + ic(n.icon) + "<span>" + esc(n.name) + "</span></li>"; }).join(""));
  fill("testimonials", (C.testimonials || []).map(function (t) {
    return '<figure class="quote" ' + R + '><blockquote>“' + esc(t.quote) + '”</blockquote><figcaption><b>' + esc(t.name) + "</b><span>" + esc(t.company) + ", " + esc(t.city) + "</span></figcaption></figure>";
  }).join(""));
  var faqHtml = (C.faq || []).map(function (f) { return '<details class="faq-item"><summary>' + esc(f.q) + '<span class="plus" aria-hidden="true"></span></summary><p>' + esc(f.a) + "</p></details>"; }).join("");
  fill("faq", faqHtml);
  fill("machinery", (C.machinery || []).map(function (m) { return '<li ' + R + ">" + ic("check") + esc(m) + "</li>"; }).join(""));
  fill("qualityTests", (C.qualityTests || []).map(function (q, i) {
    return '<div class="why" ' + R + '>' + ic("flask") + "<h3>" + esc(q.title) + "</h3><p>" + esc(q.text) + "</p></div>";
  }).join(""));
  fill("regions", (C.deliveryRegions || []).map(function (r) { return "<li>" + esc(r) + "</li>"; }).join(""));
  fill("milestones", (C.milestones || []).map(function (m) { return '<li ' + R + "><b>" + esc(m.year) + "</b><span>" + esc(m.text) + "</span></li>"; }).join(""));
  fill("leaders", (C.leadership || []).map(function (l) {
    var ini = l.name.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2);
    return '<div class="leader" ' + R + '><span class="avatar" aria-hidden="true">' + esc(ini) + "</span><b>" + esc(l.name) + "</b><span>" + esc(l.role) + "</span></div>";
  }).join(""));
  fill("story", ((C.about || {}).story || []).map(function (s) { return "<p>" + esc(s) + "</p>"; }).join(""));

  /* Hero headline */
  var h1 = $("#heroTitle");
  if (h1 && C.heroHeadline) h1.innerHTML = C.heroHeadline.map(function (l, i) { return '<span class="line"><span style="--d:' + (i * 0.14 + 0.15) + 's">' + esc(l) + "</span></span>"; }).join("");

  /* ---------- Products: filters + drawer ---------- */
  var filters = $("#filters");
  if (filters) filters.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
    var g = b.dataset.filter;
    $$("#catalogue .pcard").forEach(function (c) { c.hidden = !(g === "all" || c.dataset.group === g); });
  });

  var drawer = $("#drawer"), backdrop = $("#backdrop"), lastFocus = null;
  function openDrawer(id) {
    var p = (C.products || []).filter(function (x) { return x.id === id; })[0]; if (!p || !drawer) return;
    lastFocus = doc.activeElement;
    var rows = [["Standard", p.standard], ["Grades", p.grades.join(", ")], ["Sizes", p.sizes], ["Length", p.length], ["Typical use", p.uses]];
    $(".drawer-body", drawer).innerHTML = media(p.image, p.name, 1600, 1195, "dr-media") +
      '<span class="tag">' + esc(p.standard) + '</span><h2 id="drawerTitle">' + esc(p.name) + "</h2><p>" + esc(p.short) + "</p>" +
      '<table class="spec"><caption class="sr">' + esc(p.name) + " specifications</caption><tbody>" + rows.map(function (r) { return '<tr><th scope="row">' + r[0] + "</th><td>" + esc(r[1]) + "</td></tr>"; }).join("") + "</tbody></table>" +
      '<p class="fine">Reference specifications. Exact range confirmed on enquiry.</p>' +
      '<div class="dr-actions"><a class="btn btn-primary" href="contact.html?product=' + encodeURIComponent(p.name) + "&grade=" + encodeURIComponent(p.grades[0]) + '">Request quote for this ' + ic("arrow") + '</a>' +
      '<a class="btn btn-ghost" target="_blank" rel="noopener" href="' + wa("Hello " + C.name + ", please share price and availability for " + p.name + ".") + '">' + ic("chat") + "Ask on WhatsApp</a></div>";
    drawer.hidden = false; backdrop.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add("open"); backdrop.classList.add("open"); });
    body.classList.add("lock");
    $(".drawer-close", drawer).focus();
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove("open"); backdrop.classList.remove("open"); body.classList.remove("lock");
    setTimeout(function () { drawer.hidden = true; backdrop.hidden = true; }, reduce ? 0 : 300);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (drawer) {
    doc.addEventListener("click", function (e) { var b = e.target.closest("[data-open]"); if (b) openDrawer(b.dataset.open); });
    backdrop.addEventListener("click", closeDrawer);
    $(".drawer-close", drawer).addEventListener("click", closeDrawer);
    doc.addEventListener("keydown", function (e) {
      if (drawer.hidden) return;
      if (e.key === "Escape") closeDrawer();
      if (e.key === "Tab") {
        var f = $$("a[href],button,input,select,textarea", drawer).filter(function (x) { return x.offsetParent !== null; });
        if (!f.length) return;
        if (e.shiftKey && doc.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && doc.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    var openId = new URLSearchParams(location.search).get("open");
    if (openId) setTimeout(function () { openDrawer(openId); }, 250);
  }

  /* ---------- RFQ form ---------- */
  var form = $("#rfq");
  if (form) {
    var psel = form.elements.product;
    psel.innerHTML = '<option value="">Select a product</option>' + (C.products || []).map(function (p) { return "<option>" + esc(p.name) + "</option>"; }).join("") + "<option>Other / multiple</option>";
    var qs = new URLSearchParams(location.search);
    if (qs.get("product")) { psel.value = qs.get("product"); if (!psel.value) psel.value = "Other / multiple"; }
    if (qs.get("grade")) form.elements.grade.value = qs.get("grade");

    var rules = {
      name: function (v) { return v.trim().length >= 2 || "Please enter your name"; },
      phone: function (v) { return v.replace(/\D/g, "").length >= 10 || "Enter a valid 10-digit mobile number"; },
      email: function (v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email"; },
      product: function (v) { return !!v || "Choose a product"; },
      quantity: function (v) { return (parseFloat(v) > 0) || "Enter quantity in MT"; },
      city: function (v) { return v.trim().length >= 2 || "Enter delivery city"; }
    };
    var check = function (name) {
      var el = form.elements[name], res = rules[name](el.value), err = $('[data-err="' + name + '"]', form), bad = res !== true;
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      if (err) err.textContent = bad ? res : "";
      return !bad;
    };
    Object.keys(rules).forEach(function (n) {
      form.elements[n].addEventListener("blur", function () { check(n); });
      form.elements[n].addEventListener("input", function () { if (form.elements[n].getAttribute("aria-invalid") === "true") check(n); });
    });
    var validAll = function () {
      var ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) { var first = $('[aria-invalid="true"]', form); if (first) first.focus(); }
      return ok;
    };
    var message = function () {
      var f = form.elements, lines = [
        "Enquiry for " + C.name, "Name: " + f.name.value, f.company.value && "Company: " + f.company.value,
        "Phone: " + f.phone.value, f.email.value && "Email: " + f.email.value, "Product: " + f.product.value,
        f.grade.value && "Grade/size: " + f.grade.value, "Quantity: " + f.quantity.value + " MT", "Delivery city: " + f.city.value,
        f.message.value && "Message: " + f.message.value
      ].filter(Boolean).join("\n");
      return lines.length > 1500 ? lines.slice(0, 1497) + "..." : lines;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validAll()) return;
      var ok = $("#rfqSuccess");
      $("[data-wa-out]", ok).href = wa(message());
      form.hidden = true; ok.hidden = false; ok.focus();
    });
    $("#rfqWa").addEventListener("click", function () { if (validAll()) window.open(wa(message()), "_blank", "noopener"); });
    var again = $("#rfqAgain");
    if (again) again.addEventListener("click", function () { $("#rfqSuccess").hidden = true; form.hidden = false; form.reset(); form.elements.name.focus(); });
  }
  var map = $("#map");
  if (map) map.src = "https://maps.google.com/maps?q=" + encodeURIComponent(C.mapQuery || C.city) + "&output=embed";

  /* ---------- Motion ---------- */
  // Scroll reveals (IntersectionObserver base)
  doc.documentElement.classList.add("rv");
  var revealEls = $$("[" + R + "]");
  revealEls.forEach(function (el) {
    var sibs = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.transitionDelay = (Math.min(sibs, 5) * 70) + "ms";
  });
  if (reduce || !("IntersectionObserver" in window)) revealEls.forEach(function (el) { el.classList.add("in"); });
  else {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Counters
  var counters = $$("[data-count]");
  function runCount(el) {
    var end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = null, dur = 1600;
    if (reduce) return;
    (function step(t) {
      if (!t0) t0 = t; var k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * e).toLocaleString("en-IN") + suf;
      if (k < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  if (counters.length && "IntersectionObserver" in window && !reduce) {
    var cio = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { c.textContent = "0" + (c.dataset.suffix || ""); cio.observe(c); });
  }

  // Process timeline fill (manual scroll calc; transform only)
  var tl = $("#timeline"), fillEl = tl && $(".tl-fill", tl);
  if (tl && fillEl) {
    var ticking = false;
    var upd = function () {
      ticking = false;
      var r = tl.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.65 - r.top) / r.height));
      fillEl.style.transform = "scaleY(" + (reduce ? 1 : p) + ")";
      $$(".tl-step", tl).forEach(function (s) { s.classList.toggle("lit", s.getBoundingClientRect().top < vh * 0.65); });
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }


  // Ember / spark particles
  var cv = $("#embers");
  if (cv && !reduce && cv.getContext) {
    var ctx = cv.getContext("2d"), parts = [], W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var N = window.innerWidth < 700 ? 34 : 60, running = true, last = 0;
    var size = function () { W = cv.offsetWidth; H = cv.offsetHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    var spawn = function (p, init) {
      p.x = W * (0.35 + Math.random() * 0.65); p.y = init ? Math.random() * H : H + 10;
      p.vy = 0.35 + Math.random() * 1.1; p.vx = (Math.random() - 0.5) * 0.4; p.r = 0.6 + Math.random() * 1.9;
      p.life = 0; p.max = 220 + Math.random() * 260; p.w = Math.random() * 6.28; return p;
    };
    size(); for (var i = 0; i < N; i++) parts.push(spawn({}, true));
    window.addEventListener("resize", size);
    var frame = function (t) {
      if (!running) return;
      requestAnimationFrame(frame);
      if (t - last < 30) return; last = t;
      ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = "lighter";
      parts.forEach(function (p) {
        p.life++; p.w += 0.03; p.y -= p.vy; p.x += p.vx + Math.sin(p.w) * 0.3;
        var a = Math.sin(Math.PI * p.life / p.max);
        if (p.life > p.max || p.y < -10) spawn(p, false);
        ctx.fillStyle = "rgba(255," + (120 + (p.r * 30 | 0)) + ",40," + (a * 0.85).toFixed(2) + ")";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      });
    };
    var start = function () { if (!running) { running = true; requestAnimationFrame(frame); } };
    requestAnimationFrame(frame);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (e) { e[0].isIntersecting && !doc.hidden ? start() : (running = false); }).observe(cv);
    doc.addEventListener("visibilitychange", function () { doc.hidden ? (running = false) : start(); });
  }
})();
