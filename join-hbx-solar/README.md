# Join HBX Solar

Route: `/join-hbx-solar/`. Static HTML, page-specific CSS and JavaScript. Uses the existing HBX header, header behavior, fonts, local solar image and copied footer. The only shared change adds the careers link to navigation; other page content is unchanged.

Run a local preview from the repository root with `python -m http.server 8080`, then visit `http://localhost:8080/join-hbx-solar/`.

## Before accepting applications

Set `applicationEndpoint` in `config.js` to the approved recruitment endpoint. No application data is currently sent or stored. The endpoint must accept multipart POST fields and an optional resume, durably save the application, and return a successful HTTP response with JSON `{"success":true}`. Success UI appears only after that response. Configure CORS if the endpoint is on another origin. The server must validate fields, consent, allowed file content and the 5 MB limit, and enforce appropriate access controls and abuse protection. Client validation alone is insufficient.

Confirm and update training pay, the successful-customer definition, booking/payment conditions, performance reviews, geographic eligibility and resume requirements before launch. The page transparently identifies missing policies; it does not assume them. The provided company telephone number is reused for recruitment enquiries; confirm it is the intended contact.

The HTML can be edited directly. `../build_join_page.py` regenerates it from the page content and existing site header/footer; keep the generator in sync with subsequent HTML edits. Regeneration leaves CSS, JS and config untouched.

## Validation completed

- Browser checks at desktop, 820px tablet and 390px mobile: no horizontal overflow.
- Mobile menu, journey/application anchors and FAQ expansion.
- Required form controls and local valid-form submission: missing endpoint correctly reports that nothing was sent.
- Local asset/link and fragment resolution, unique IDs, HBX-only page branding, JavaScript syntax.
- Actual application delivery and its server-side validation remain untested until an endpoint is provided.
