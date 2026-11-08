/* Steel weight calculator: pure math + UI. Formulas (mild steel, 7.85 g/cm3):
   round/TMT kg/m = d^2/162 · square kg/m = s^2 × 0.00785 · flat kg = t×w×l×7.85e-6 (mm)
   pipe kg/m = (OD − t) × t × 0.02466. Stainless scales by 8.0 / 7.85. */
(function () {
  var DENSITY = { ms: 7.85, ss: 8.0 };
  var SHAPES = {
    round: { label: "Round / TMT bar", fields: [["d", "Diameter (mm)", 12]] },
    square: { label: "Square bar", fields: [["s", "Side (mm)", 20]] },
    flat: { label: "Flat / Plate / Sheet", fields: [["t", "Thickness (mm)", 10], ["w", "Width (mm)", 1250]] },
    pipe: { label: "Pipe / Tube", fields: [["od", "Outer dia. (mm)", 60.3], ["t", "Wall thickness (mm)", 3.65]] }
  };

  function kgPerMetre(shape, d, material) {
    var f = DENSITY[material || "ms"] / 7.85, v;
    if (shape === "round") v = d.d * d.d / 162;
    else if (shape === "square") v = d.s * d.s * 0.00785;
    else if (shape === "flat") v = d.t * d.w * 1000 * 7.85e-6; // t × w × 1000 mm length
    else if (shape === "pipe") v = (d.od - d.t) * d.t * 0.02466;
    else return NaN;
    return v * f;
  }

  function validate(shape, d, len, qty) {
    var errs = {};
    SHAPES[shape].fields.forEach(function (f) {
      var v = d[f[0]];
      if (!(v > 0) || v > 5000) errs[f[0]] = "Enter a value between 0 and 5000";
    });
    if (shape === "pipe" && d.od > 0 && d.t > 0 && d.t >= d.od / 2) errs.t = "Wall must be less than half the OD";
    if (!(len > 0) || len > 100) errs.len = "Length 0–100 m";
    if (!(qty >= 1) || qty % 1 !== 0 || qty > 100000) errs.qty = "Whole number ≥ 1";
    return errs;
  }

  window.SteelCalc = { kgPerMetre: kgPerMetre, validate: validate };

  /* Self-test (build check) */
  (function () {
    var a = kgPerMetre("round", { d: 12 }).toFixed(3), b = kgPerMetre("pipe", { od: 60.3, t: 3.65 }).toFixed(2);
    if (a === "0.889" && b === "5.10") { if (window.console) console.info("SteelCalc self-test passed: 12mm bar " + a + " kg/m, 60.3×3.65 pipe " + b + " kg/m"); }
    else if (window.console) console.warn("SteelCalc self-test FAILED", a, b);
  })();

  function fmt(n, dp) { return n.toLocaleString("en-IN", { minimumFractionDigits: dp, maximumFractionDigits: dp }); }

  function mount(root, idx) {
    var id = "c" + idx, shape = "round", material = "ms";
    root.innerHTML =
      '<div class="calc-top">' +
        '<div class="seg" role="radiogroup" aria-label="Material">' +
          '<button type="button" role="radio" aria-checked="true" data-mat="ms">Mild steel <small>7.85</small></button>' +
          '<button type="button" role="radio" aria-checked="false" data-mat="ss">Stainless <small>8.00</small></button>' +
        '</div>' +
        '<label class="calc-shape"><span class="sr">Shape</span><select id="' + id + '-shape">' +
          Object.keys(SHAPES).map(function (k) { return '<option value="' + k + '">' + SHAPES[k].label + '</option>'; }).join("") +
        '</select></label>' +
      '</div>' +
      '<div class="calc-grid">' +
        '<div class="calc-fields" data-fields></div>' +
        '<div class="calc-out" aria-live="polite">' +
          '<div><span>Weight / metre</span><strong data-o="m">–</strong></div>' +
          '<div><span>Weight / piece</span><strong data-o="p">–</strong></div>' +
          '<div><span>Total weight</span><strong data-o="t">–</strong></div>' +
          '<div class="calc-mt"><span>Total (MT)</span><strong data-o="mt">–</strong></div>' +
        '</div>' +
      '</div>' +
      '<p class="calc-note">Theoretical weights for estimation only. Actual weights vary within the tolerances of the IS standard.</p>';

    var fieldsEl = root.querySelector("[data-fields]"), sel = root.querySelector("select");

    function field(key, label, val, step) {
      return '<label class="fld"><span>' + label + '</span><input type="number" inputmode="decimal" min="0" step="' + (step || "any") + '" data-k="' + key + '" value="' + val + '"><em class="err" data-e="' + key + '"></em></label>';
    }
    function renderFields() {
      fieldsEl.innerHTML = SHAPES[shape].fields.map(function (f) { return field(f[0], f[1], f[2]); }).join("") +
        field("len", "Length (m)", shape === "flat" ? 2.5 : (shape === "pipe" ? 6 : 12)) + field("qty", "Quantity (pcs)", 1, 1);
      calc();
    }
    function calc() {
      var d = {}, len, qty;
      fieldsEl.querySelectorAll("input").forEach(function (i) { d[i.dataset.k] = parseFloat(i.value); });
      len = d.len; qty = d.qty;
      var errs = validate(shape, d, len, qty);
      fieldsEl.querySelectorAll("[data-e]").forEach(function (e) {
        var m = errs[e.dataset.e] || ""; e.textContent = m;
        var inp = e.previousElementSibling; inp.setAttribute("aria-invalid", m ? "true" : "false");
      });
      var out = function (k, v) { root.querySelector('[data-o="' + k + '"]').textContent = v; };
      if (Object.keys(errs).length) { out("m", "–"); out("p", "–"); out("t", "–"); out("mt", "–"); return; }
      var kgm = kgPerMetre(shape, d, material), piece = kgm * len, total = piece * qty;
      out("m", fmt(kgm, 3) + " kg/m"); out("p", fmt(piece, 2) + " kg"); out("t", fmt(total, 2) + " kg"); out("mt", fmt(total / 1000, 3) + " MT");
    }
    fieldsEl.addEventListener("input", calc);
    sel.addEventListener("change", function () { shape = sel.value; renderFields(); });
    root.querySelectorAll("[data-mat]").forEach(function (b) {
      b.addEventListener("click", function () {
        material = b.dataset.mat;
        root.querySelectorAll("[data-mat]").forEach(function (x) { x.setAttribute("aria-checked", x === b ? "true" : "false"); });
        calc();
      });
    });
    renderFields();
  }

  document.querySelectorAll("[data-calc]").forEach(mount);
})();
