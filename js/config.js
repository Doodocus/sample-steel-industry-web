/* =====================================================================
   CLIENT CONFIG: re-skin the whole demo for a new prospect from this file.
   Every value marked "SAMPLE – replace before sending" is placeholder data.
   Never publish a certification, number or testimonial the prospect
   does not actually hold / have.
   ===================================================================== */
window.SITE = {
  /* ---------- Identity ---------- */
  name: "Northstar Steel Industries",          // SAMPLE – replace before sending
  shortName: "Northstar",                      // SAMPLE – replace before sending (used in the logo mark line)
  logoLine2: "Steel Industries",               // SAMPLE – replace before sending
  tagline: "Steel you can build a nation on.", // SAMPLE – replace before sending
  heroEyebrow: "Integrated steel manufacturer · Raipur, Chhattisgarh", // SAMPLE – replace before sending
  heroHeadline: ["Forged in fire.", "Tested in the lab.", "Delivered on time."], // SAMPLE – replace before sending
  heroSub: "TMT bars, structural sections, coils, pipes, plates and wire rods, made to BIS standards with a mill test certificate on every lot.", // SAMPLE – replace before sending
  accent: "#FF6A1A",                           // brand accent (one colour only)
  preparedBy: "Your Studio Name",              // SAMPLE – replace before sending (your web studio)
  preparedByUrl: "#",                          // SAMPLE – replace before sending
  siteUrl: "https://northstar-steel.example",  // SAMPLE – replace before sending
  ogImage: "assets/images/hero-furnace.jpg",

  /* ---------- Contact ---------- */
  city: "Raipur",                              // SAMPLE – replace before sending
  state: "Chhattisgarh",                       // SAMPLE – replace before sending
  address: "Plot 00, Industrial Area, Siltara Phase II, Raipur, Chhattisgarh 493221", // SAMPLE – replace before sending
  mapQuery: "Siltara Industrial Area, Raipur, Chhattisgarh", // SAMPLE – replace before sending
  phone: "+91 00000 00000",                    // SAMPLE – replace before sending (display)
  phoneHref: "+910000000000",                  // SAMPLE – replace before sending (tel: link)
  whatsapp: "910000000000",                    // SAMPLE – replace before sending (digits only, with country code)
  email: "info@northstar-steel.example",       // SAMPLE – replace before sending
  hours: "Mon–Sat, 9:00 AM – 7:00 PM",          // SAMPLE – replace before sending
  social: { linkedin: "#", facebook: "#", instagram: "#", youtube: "#" }, // SAMPLE – replace before sending

  /* ---------- Numbers ---------- */
  yearFounded: 1998,                           // SAMPLE – replace before sending
  yearsInBusiness: 27,                         // SAMPLE – replace before sending
  capacityMT: 300000,                          // SAMPLE – replace before sending
  statesServed: 18,                            // SAMPLE – replace before sending
  productCount: 6,
  stats: [                                     // SAMPLE – replace before sending
    { value: 300000, suffix: "", label: "MT / year capacity" },
    { value: 27, suffix: "+", label: "Years in steel" },
    { value: 18, suffix: "", label: "States served" },
    { value: 6, suffix: "", label: "Product families" }
  ],

  /* ---------- Certifications (SAMPLE – replace before sending; show ONLY what the client really holds) ---------- */
  certifications: [
    { name: "BIS Licensed", note: "IS 1786 · IS 2062" },
    { name: "ISO 9001:2015", note: "Quality management" },
    { name: "ISO 14001:2015", note: "Environment" },
    { name: "ISO 45001:2018", note: "Occupational safety" },
    { name: "NABL-Accredited Lab Testing", note: "Third-party verification" },
    { name: "Mill Test Certificate", note: "With every lot" }
  ],

  /* ---------- Why us ---------- */
  whyUs: [
    { icon: "flask", title: "Consistent chemistry", text: "Heat-wise spectrometer analysis keeps carbon, sulphur and phosphorus inside tight bands, so mechanical properties stay the same from lot to lot." },
    { icon: "doc", title: "Mill test certificates", text: "Every dispatch ships with an MTC listing heat number, chemistry, yield, UTS and elongation. Your engineers get the data, not just a promise." },
    { icon: "truck", title: "On-time dispatch", text: "Our own fleet and planned loading slots keep project sites supplied. You get the vehicle number and expected arrival on WhatsApp." },
    { icon: "headset", title: "Technical support", text: "Metallurgists help you pick the right grade, section or thickness for the load, the climate and your budget." }
  ],

  /* ---------- Industries ---------- */
  industries: [
    { icon: "building", name: "Construction" },
    { icon: "bridge", name: "Infrastructure" },
    { icon: "bolt", name: "Power & Transmission" },
    { icon: "train", name: "Railways" },
    { icon: "gear", name: "Automotive" },
    { icon: "drop", name: "Oil & Gas" },
    { icon: "leaf", name: "Agriculture" }
  ],

  /* ---------- Products ----------
     Standards / grades / sizes are REFERENCE values, verify per client range before sending. */
  products: [
    { id: "tmt-bars", name: "TMT Bars", group: "long", image: "assets/images/product-tmt-bars.jpg",
      short: "Thermo-mechanically treated rebars with high strength and ductility for RCC work.",
      standard: "IS 1786", grades: ["Fe 500", "Fe 500D", "Fe 550D"], sizes: "8, 10, 12, 16, 20, 25, 28, 32 mm",
      length: "12 m standard; cut lengths on request", uses: "RCC buildings, bridges, flyovers, dams, high-rise and seismic-zone structures" },
    { id: "structural", name: "Structural Sections", group: "long", image: "assets/images/product-structural.jpg",
      short: "Beams, channels and angles for industrial sheds, towers and frames.",
      standard: "IS 2062 (E250 / E350), dimensions per IS 808", grades: ["E250 BR", "E350 BR"], sizes: "ISMB 100–600 · ISMC 75–400 · ISA 20×20 – 200×200",
      length: "6 m – 12 m", uses: "Industrial sheds, PEB frames, transmission towers, platforms, bridges" },
    { id: "coils", name: "HR / CR Coils & Sheets", group: "flat", image: "assets/images/product-coils.jpg",
      short: "Hot-rolled and cold-rolled coils, sheets and slit strips.",
      standard: "IS 1079 (HR) / IS 513 (CR)", grades: ["HR1–HR4", "CR1–CR5 (D, DD, EDD)"], sizes: "HR 1.6–25 mm · CR 0.3–3.0 mm thick; width 900–1500 mm",
      length: "Coils, or sheets cut to length", uses: "Fabrication, auto components, panels, drums, white goods, tubes" },
    { id: "pipes", name: "Pipes & Tubes (ERW)", group: "tubular", image: "assets/images/product-pipes.jpg",
      short: "ERW black and galvanised pipes for water, gas and structural use.",
      standard: "IS 1239 (Part 1) / IS 3589", grades: ["Light / Medium / Heavy (IS 1239)", "Fe 330 / Fe 410 (IS 3589)"], sizes: "15–150 NB (IS 1239) · 168.3–508 mm OD (IS 3589)",
      length: "6 m standard", uses: "Water & gas lines, scaffolding, structural frames, irrigation, fire-fighting" },
    { id: "plates", name: "Plates", group: "flat", image: "assets/images/product-plates.jpg",
      short: "Heavy plates for fabrication, boilers, bridges and earth-moving equipment.",
      standard: "IS 2062", grades: ["E250 BR", "E350 BR", "E410 (on request)"], sizes: "5–100 mm thick · 1500–2500 mm wide",
      length: "6 m – 12 m", uses: "Heavy fabrication, bridges, ship & tank building, base plates, machinery" },
    { id: "wire-rods", name: "Wire Rods", group: "long", image: "assets/images/product-wire-rods.jpg",
      short: "Low-carbon wire rods in coils for drawing, nails, mesh and binding wire.",
      standard: "IS 7887", grades: ["Low-carbon drawing grades (SAE 1008 / 1010 equivalent)"], sizes: "5.5 – 12 mm",
      length: "Coils of 1.5 – 2.0 MT", uses: "Wire drawing, nails, fencing, welded mesh, binding wire, fasteners" }
  ],

  /* ---------- Process ---------- */
  process: [
    { title: "Raw material", text: "Iron ore, sponge iron and scrap are checked at the gate. Every lot is sampled before it enters the yard." },
    { title: "Melting", text: "Induction furnaces melt the charge, and ladle refining trims the chemistry to the grade." },
    { title: "Continuous casting", text: "Molten steel is cast into billets with controlled cooling for a sound internal structure." },
    { title: "Rolling", text: "Billets are reheated and rolled into bars, sections and rods. TMT bars are quenched in-line." },
    { title: "Quality testing", text: "Tensile, bend and re-bend tests, spectrometer analysis and dimensional checks are run on every heat." },
    { title: "Dispatch", text: "Material is tagged, bundled and loaded with its MTC, then tracked until it reaches your site." }
  ],

  /* ---------- Infrastructure ---------- */
  plant: {                                     // SAMPLE – replace before sending
    overview: "An integrated campus at Siltara, Raipur, with melting, casting, rolling, testing and dispatch under one roof, close to the iron-ore belt and to rail links.",
    facts: [
      { value: 42, suffix: " acres", label: "Plant area" },
      { value: 3, suffix: "", label: "Rolling lines" },
      { value: 650, suffix: "+", label: "Skilled people" },
      { value: 24, suffix: "×7", label: "Operations" }
    ]
  },
  machinery: [                                 // SAMPLE – replace before sending
    "2 × 25 T induction furnaces with ladle refining",
    "3-strand continuous casting machine",
    "Fully automatic TMT rolling mill with in-line quenching",
    "Structural mill for beams, channels and angles",
    "Optical emission spectrometer",
    "100 T universal testing machine (UTM)",
    "Weighbridges at gate and dispatch (60 T)",
    "EOT cranes across the bay and dispatch yard"
  ],
  qualityTests: [
    { title: "Tensile test", text: "Yield strength, UTS and elongation on a calibrated UTM for every heat." },
    { title: "Bend & re-bend", text: "TMT samples are bent, aged and re-bent to IS 1786 to confirm ductility." },
    { title: "Chemical analysis", text: "Spectrometer check of C, Mn, S, P and other elements, so carbon equivalent stays within grade limits." },
    { title: "Dimensional checks", text: "Diameter, mass per metre, rib geometry, section size and straightness are measured." }
  ],
  logistics: {                                 // SAMPLE – replace before sending
    yard: "A covered dispatch yard with EOT cranes and bundle tagging, ready to load around the clock.",
    fleet: "An in-house fleet of 40+ trailers, plus transport partners for long-haul routes.",
    rail: "A nearby rail siding for full-rake orders to distant states."
  },
  deliveryRegions: ["Chhattisgarh", "Odisha", "Madhya Pradesh", "Maharashtra", "Jharkhand", "Telangana", "Andhra Pradesh", "Uttar Pradesh", "Bihar", "West Bengal", "Gujarat", "Karnataka"], // SAMPLE – replace before sending

  /* ---------- About ---------- */
  about: {                                     // SAMPLE – replace before sending
    story: [
      "Northstar began in 1998 as a small re-rolling unit with one mill and twenty people. Contractors in Raipur trusted it because its bars weighed what the invoice said.",
      "Today it is an integrated plant that melts, casts, rolls and tests steel for builders, fabricators and infrastructure EPCs across India. The promise is still the same: honest weight, consistent chemistry, on-time trucks."
    ],
    vision: "To be central India's most trusted name in long and flat steel.",
    mission: "Make steel to standard, certify every lot, and deliver when we said we would."
  },
  milestones: [                                // SAMPLE – replace before sending
    { year: "1998", text: "Re-rolling unit set up in Raipur" },
    { year: "2006", text: "BIS licence for TMT bars" },
    { year: "2012", text: "Induction melting & continuous caster commissioned" },
    { year: "2018", text: "Structural mill & in-house NABL-grade lab" },
    { year: "2024", text: "Capacity crosses 3 lakh MT / year" }
  ],
  leadership: [                                // SAMPLE – replace before sending
    { name: "Name Surname", role: "Managing Director" },
    { name: "Name Surname", role: "Director, Operations" },
    { name: "Name Surname", role: "Head of Quality" },
    { name: "Name Surname", role: "Head of Sales & Logistics" }
  ],

  /* ---------- Social proof (SAMPLE – replace before sending; use real, permitted quotes only) ---------- */
  testimonials: [
    { quote: "Weights match the invoice, the MTC arrives with the truck, and they pick up the phone. That is why we have stayed for eight years.", name: "Sample Client", company: "Civil contractor", city: "Raipur" },
    { quote: "We needed structural steel on a tight schedule for a plant shed. Dispatch was planned to the day.", name: "Sample Client", company: "PEB fabricator", city: "Nagpur" },
    { quote: "Their technical team helped us move from Fe 500 to Fe 550D and cut tonnage without losing safety margin.", name: "Sample Client", company: "Infrastructure EPC", city: "Bhubaneswar" }
  ],
  faq: [
    { q: "Do you supply with mill test certificates?", a: "Yes. Every lot ships with an MTC that lists heat number, chemical composition and mechanical properties. Third-party inspection is welcome at our plant." },
    { q: "What is your minimum order quantity?", a: "We usually dispatch full truckloads (about 25–30 MT) and accept mixed sizes within a load. For smaller needs we can point you to our dealer network." }, // SAMPLE – replace before sending
    { q: "Which areas do you deliver to?", a: "We cover most of central and eastern India with our own fleet and partners. Full-rake orders can go by rail siding." }, // SAMPLE – replace before sending
    { q: "Can you share today's price?", a: "Steel prices change every day with raw material costs. Send an enquiry with grade, size, quantity and delivery city and we will reply with a firm quote." },
    { q: "Do you make cut-to-length or custom sizes?", a: "Yes, for coils, sheets, plates and TMT bars, subject to quantity. Mention your requirement in the enquiry." }
  ],

  /* ---------- Per-page SEO (title / description) ---------- */
  pages: {
    home: { title: "Steel Manufacturer in Raipur | TMT, Structural, Coils, Pipes", description: "TMT bars, structural steel, HR/CR coils, ERW pipes, plates and wire rods made to BIS standards with mill test certificates." },
    products: { title: "Products: TMT Bars, Structural Steel, Coils, Pipes, Plates", description: "Steel product catalogue with grades, sizes and standards, plus a steel weight calculator." },
    infrastructure: { title: "Infrastructure, Quality & Logistics", description: "Integrated plant, manufacturing process, in-house testing lab and dispatch network." },
    about: { title: "About Us", description: "Our story, vision, mission and leadership." },
    contact: { title: "Contact & Request a Quote", description: "Send a steel enquiry or request a quote on WhatsApp or by phone." }
  }
};
