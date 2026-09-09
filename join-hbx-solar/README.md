# Join HBX Solar

Route: `/join-hbx-solar/`. Static HTML, page-specific CSS and JavaScript. Uses the existing HBX header, header behavior, fonts, local solar image and copied footer. Nine main sections: hero, why join, journey, training, earnings (including recognition and expandable compensation details), professional identity (including career path), eligibility, application and FAQ. Five collapsed FAQs; ten essential application fields plus an optional resume attachment reminder and consent.

Shared navigation includes the careers link. All 14 HTML page variants now show `Civil Line, Azamgarh` in the footer and duplicated contact address, with matching address map links. Other contact information is unchanged.

Run a local preview from the repository root with `python -m http.server 8080`, then visit `http://localhost:8080/join-hbx-solar/`.

## Application delivery

The form prepares a `mailto:` draft addressed to `careers@hbxsolar.in`, with all ten application fields and consent in the body. Applicants must send the email in their own mail app. This is not automatic server-side email delivery; no website submission confirmation is shown. Optional resumes must be attached in the mail app, since mailto cannot attach browser files. A visible draft and Copy Application Details button provide a fallback when there is no configured email handler or the client cannot handle a long mailto URL. The page does not persist applicant data.

For application questions the displayed call link is `+91 86086 92978`. Other site contact numbers remain unchanged. The recipient is configured in `config.js`.

Confirmed by the user: ₹10,000 monthly salary requires 4 verified customers. The new ₹23,000/month high-performer total replaces the old ₹8,000/₹11,000/₹14,000 slabs. Confirmed by the user: 10 verified NEW customers in one monthly cycle qualify for ₹23,000 total monthly cash (₹10,000 salary + ₹12,000 performance bonus + ₹1,000 achievement bonus). Any applicable Achievement Reward is additional and excluded from this total. Counts reset monthly; only verified NEW customers acquired in the current month count. Confirm and update training pay, the successful-customer definition, booking/payment conditions, performance reviews, geographic eligibility and resume requirements before launch. The page transparently identifies missing policies; it does not assume them. The provided company telephone number is reused for recruitment enquiries; confirm it is the intended contact.

Edit page content in `../join_content.py`. `../build_join_page.py` regenerates the HTML using that content and the existing site header/footer. Regeneration leaves CSS, JS and config untouched.

## Validation completed

- Browser checks at desktop, tablet and 390px/320px mobile: no horizontal overflow.
- Mobile menu, journey/application anchors and FAQ expansion.
- Required form controls; mocked mailto test verifies recipient, all ten fields, special characters, line breaks, consent, fallback and invalid-form blocking without sending email.
- Local asset/link and fragment resolution, unique IDs, HBX-only page branding, JavaScript syntax.
- Actual delivery depends on the applicant sending through their mail app; no email was sent during testing.
