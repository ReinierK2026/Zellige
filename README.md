# Zellige website build

Static site. No build step, no dependencies: nine HTML pages, one stylesheet, one script.

## Put it live
1. Create a free account at Netlify, Cloudflare Pages or Vercel.
2. Drag this whole folder onto the deploy area. It is live in under a minute on a temporary URL.
3. Add your domain in the dashboard and follow the DNS instructions.

## Before launch
- **Forms.** Every form shows a confirmation but sends nothing. Give each `<form>` an `action` (Formspree, Netlify Forms or Tally) and remove the `preventDefault` block in `site.js`. For Netlify Forms, add `netlify` and `name="…"` to each form tag.
- **Health Check.** The score and the ten answers are posted as hidden fields (`score`, `answers`) with the booking form.
- **Email address.** Replace `hello@zellige.example` in the footer and on the privacy page.
- **Domain.** Update the URL in `robots.txt` and add a `sitemap.xml`.
- **Privacy page.** Draft wording only; have it checked for the jurisdictions your clients are in.
- **Analytics.** Optional: Plausible or Fathom, one script tag in each page's `<head>`.

## Files
- `index.html` landing, with the four-way circle on desktop and stacked cards on mobile
- `fractional-cfo.html`, `interim-cover.html` service detail
- `health-check.html` ten-question self-assessment, score visible, breakdown gated behind the call
- `services.html` twenty other services in five groups
- `contact-cfo.html`, `contact-interim.html`, `contact-review.html`, `contact-services.html`
- `privacy.html`, `styles.css`, `site.js`, `favicon.svg`, `robots.txt`
