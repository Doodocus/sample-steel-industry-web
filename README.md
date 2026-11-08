# Steel company website: concept demo
**Open locally:** double-click `index.html` (fonts and the map need internet). Or run `python -m http.server` and open http://localhost:8000.
**Re-skin for a new prospect:** edit `js/config.js` (name, city, contacts, WhatsApp, stats, products, accent colour, preparedBy). Header, footer, lists and SEO tags all render from it. Then swap the photos in `assets/images/` (keep the file names).
**Deploy:** drag the folder onto https://app.netlify.com/drop, or run `npx vercel` in the folder. The pages are `noindex` and robots.txt blocks crawlers.

**Before sending to a real owner:**
- Replace every value marked `SAMPLE – replace before sending` in config.js.
- Show only certifications, numbers and testimonials the company really holds; delete the rest.
- Verify product standards and size ranges against the client's actual range.
- For a live site: remove the "Concept demo" ribbon (in js/main.js), wire the form to a real endpoint, and drop the noindex tags and robots block.
