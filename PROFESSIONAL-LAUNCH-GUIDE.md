# Sendhur Pandian World — professional portfolio

This package builds on the supplied Vite + React + TypeScript project. It expands the portfolio information architecture with project categories, about information, FAQ, contact guidance, privacy notice, terms and conditions, accessibility/SEO notes, and a footer with policy navigation.

## Run locally
```bash
npm install
cp .env.example .env.local
# Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY if using account features.
npm run dev
```
Production build:
```bash
npm run build
npm run preview
```

## Important: before publishing
- Replace any placeholder content with verified biography, qualifications, projects, dates, screenshots, and links.
- Confirm `repository` in `src/Portfolio.tsx` points to your real public GitHub repository. The GitHub activity panel may show an error until this is configured.
- Add a real contact method or connect a secure form service. The template intentionally does not invent your email address or phone number.
- Review the privacy notice and terms against the exact features you enable and the laws relevant to you. These are general drafts, not legal advice.
- If you keep sign-up, configure your own Supabase project, run `supabase/schema.sql`, configure email OTP templates and production SMTP, set environment variables in your host, enable row-level security, and test recovery/sign-out/account deletion flows.
- Avoid collecting date of birth or gender unless genuinely needed. Publish a privacy notice and determine age-appropriate requirements before collecting personal data.
- Configure the production domain, canonical URL, sitemap.xml, robots.txt, Search Console verification, and social preview image. Google can rewrite snippets.
- Test keyboard navigation, contrast, reduced motion, screen-reader labels, mobile layouts, forms, auth errors, and loading states.
- Never put a Supabase service-role key or other secret in frontend code, `.env` files committed to Git, or public hosting variables.

## Included areas
- Existing Tamil/English welcome intro and authentication flow (from the supplied project)
- Portfolio hero, about section, capabilities, and GitHub activity widget
- Project/experiment categories
- About information and FAQ
- Contact section with launch guidance
- Privacy notice and terms & conditions drafts
- Accessibility and SEO launch guidance
- Responsive legal/footer navigation

This is a production-oriented starter, not a claim that the site is already legally reviewed, connected to live data, or deployed. Real account functions depend on external Supabase configuration.
