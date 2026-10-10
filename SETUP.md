# Sendhur Pandian World — portfolio + welcome intro

This project restores the supplied portfolio into a valid Vite + React + TypeScript app and adds the Tamil/English intro and secure authentication integration.

## User journey

1. Tamil welcome animation plays.
2. English Welcome 🤝 animation plays.
3. Language selection appears **when the English animation's final animation finishes**. There is no fixed intro timeout.
4. User chooses Tamil or English.
5. User enters date of birth and gender.
6. User chooses Create Account or Log In.
7. New account: email OTP verification.
8. Forgot password: recovery email OTP, verify it, then set a new password.
9. Successful authentication opens the existing React portfolio.

## Important project repair

The uploaded ZIP had React/CSS files saved under mismatched extensions and was missing the normal Vite root `index.html` and `src/main.tsx`. Those have been repaired. The original standalone portfolio HTML and unreferenced showcase component are preserved under `reference/`.

## Backend/data storage

Use **Supabase Auth + Supabase Postgres**:
- Email and password authentication are handled by Supabase Auth. This project does not store raw passwords.
- Email confirmation/recovery OTPs are handled by Supabase Auth; the app does not store OTPs.
- Date of birth, gender and language preference are stored in `public.profiles`, with row-level security so an authenticated user can only access their own profile.
- Never place the Supabase service-role key in frontend code or in a `VITE_` variable. The publishable/anon key is designed for frontend use; RLS is essential.

### Supabase setup

1. Create a project at https://supabase.com/ and keep its database password private.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. In **Project Settings → API**, copy the Project URL and publishable/anon key.
4. Copy `.env.example` to `.env.local`, and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. In Supabase Authentication settings, enable Email provider and email confirmations.
6. For OTP entry in this app, edit the **Confirm signup** email template to display `{{ .Token }}` rather than only a confirmation link. Set the OTP length/expiry in Auth settings as appropriate.
7. Edit the **Reset Password** email template to display `{{ .Token }}` as well, because the forgot-password flow asks users to type a recovery OTP in the app. Test both templates with a real mailbox.
8. For production email delivery, configure custom SMTP in Supabase Auth email/SMTP settings. Use a transactional email provider such as Resend, Brevo or Postmark. Supabase's default email sending is rate-limited and should not be relied on for a production launch.
9. Do not commit `.env.local` to GitHub.

## Run locally

```bash
npm install
cp .env.example .env.local
# edit .env.local with your Supabase URL and public/anon key
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## GitHub + Vercel deployment

1. Create a private or public GitHub repository and push this project. Do not push `.env.local`.
2. In Vercel, import the GitHub repository. Framework preset: **Vite**; build command `npm run build`; output directory `dist`.
3. In Vercel Project → Settings → Environment Variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production (and Preview if needed).
4. Redeploy after adding environment variables.
5. In Supabase Authentication → URL Configuration, add the Vercel deployment URL to Site URL / Redirect URLs. Add localhost for local development too.
6. Test sign-up OTP, login, sign-out, forgot-password OTP, and password update before sharing the site.

## Security and launch notes

- This is deployable application code, but it cannot authenticate or send email until you connect your own Supabase project, configure the email templates/SMTP and set environment variables.
- Supabase handles password hashing and authentication tokens. Never store passwords or OTP values in the profiles table, browser localStorage, GitHub, or Vercel source files.
- DOB is personal data. Collect it only if you need it and publish a privacy notice before opening the site to the public.
- A portfolio usually works best as a public page; this project intentionally gates the portfolio behind sign-in because that is the requested flow.
- A generated SP monogram SVG is included as a temporary avatar because no personal portrait was included in the uploaded ZIP. Replace `public/portrait-sendhur-pandian-m.svg` with your own portrait asset when ready.
