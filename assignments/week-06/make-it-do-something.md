# Week 6: Make It Do Something — Working Contact Form

## A. What is a backend?

A **backend** is the part of a website that runs on a server — not in the visitor's browser. Think of it like a restaurant kitchen: the frontend is the dining room where customers (visitors) see menus and place orders, while the backend is the kitchen where the actual cooking (data processing, database queries, email sending, authentication) happens.

When you submit a contact form:
1. Your browser (frontend) sends the data to a URL on the server
2. The server (backend) receives it, validates it, and does something with it — like sending an email, saving to a database, or calling another service
3. The server sends back a response: "success" or "error"
4. The frontend shows that result to you

Without a backend, a contact form can only pretend to work (show a fake "sent" message) because browsers can't send emails directly — that would be a security disaster.

## B. What does my contact form do?

My contact form is a **real, working form** on the Contact page of my portfolio. A visitor can:
- Enter their name (minimum 2 characters)
- Enter their email (validated format)
- Enter a message (minimum 10 characters)
- Click "Send message"
- See a loading state while it submits
- See a clear success message with a "Send another message" button, OR an error message if something fails

The submission **actually reaches my email inbox** (julio.christianto@10x.ai) — it's not a simulation.

**Implementation details:**
- **Frontend**: `components/contact/ContactForm.tsx` — React Hook Form + Zod validation, proper accessibility (labels, aria-invalid, aria-describedby, role="alert" for errors/success)
- **Backend**: `app/api/contact/route.ts` — Next.js API route (server-side), validates input again with Zod, sends email via Resend
- **Email service**: Resend (free tier: 3,000 emails/month), API key stored server-side only
- **Types**: `src/types/contact.ts` — shared `ContactFormValues` type

## C. How does the data flow?

```
Visitor
  ↓ fills out form
Contact Form (components/contact/ContactForm.tsx)
  ↓ onSubmit: POST /api/contact with JSON {name, email, message}
Frontend (React Hook Form handles validation, loading state)
  ↓
Backend/API Route (app/api/contact/route.ts)
  ↓ validates with Zod, calls Resend SDK
Resend Email Service (server-side, API key in env var)
  ↓ sends email to julio.christianto@10x.ai with reply-to set to visitor's email
Destination: My email inbox
  ↓
Success/Error Response (JSON: {message, id} or {message})
  ↓
UI Feedback:
  - Success → green alert box with checkmark, "Message sent!", "Send another message" button
  - Error → red alert box with error message, form stays filled for retry
  - Loading → button shows "Sending…" with aria-busy, inputs disabled
```

**Key points:**
- Validation happens **twice**: client-side (instant UX feedback) and server-side (security)
- The Resend API key **never touches the browser** — it's only in `process.env.RESEND_API_KEY` on the server
- The `replyTo` field is set to the visitor's email so I can reply directly
- Resend's free tier uses `onboarding@resend.dev` as the `from` address (verified domain needed for custom from)

## D. Free-tier choice: Resend

**Why Resend?**
- **Generous free tier**: 3,000 emails/month — more than enough for a portfolio contact form
- **Built for developers**: Clean SDK, great docs, made by the same team behind Vercel (where this portfolio is deployed)
- **Server-side only**: API key stays on the server, no client-side exposure
- **Simple integration**: `npm install resend`, few lines of code in an API route
- **No forms backend to manage**: Unlike Formspree or Netlify Forms, I own the code and data flow
- **Reliable delivery**: Built on top of AWS SES with good deliverability

**Alternatives considered:**
- **Formspree**: Simpler (no backend code), but form endpoint ID exposed in client HTML; free tier only 50 submissions/month
- **EmailJS**: Client-side only, exposes service/template/user IDs; 200 emails/month free
- **SendGrid**: 100 emails/day free, but more complex setup and ownership changes
- **Nodemailer + Gmail/SMTP**: Requires managing credentials, less reliable, more setup

Resend struck the best balance of **developer experience, free tier generosity, security (server-side only), and ownership of the implementation**.

---

## Evidence: Real Test Submission

**Date/Time**: 2026-08-29 (tested during development)

**Test performed**:
1. Started local dev server: `npm run dev`
2. Navigated to `http://localhost:3000/contact`
3. Filled form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Message: "This is a test message from the contact form implementation."
4. Clicked "Send message"
5. Observed loading state ("Sending…")
6. Observed success state ("Message sent!", "Send another message" button)
7. Checked email inbox (julio.christianto@10x.ai)

**Result**: ✅ **Email received successfully**
- Subject: "New message from Test User"
- From: onboarding@resend.dev
- Reply-To: test@example.com
- Body contained name, email, and message content
- Resend dashboard shows delivery status: "Delivered"

**Implementation details verified**:
- Client-side validation works (empty fields show errors, invalid email format caught)
- Server-side validation works (tested with curl sending invalid JSON → 400 response)
- Loading state disables inputs and shows aria-busy
- Success state is accessible (role="alert", aria-live="polite")
- Error state is accessible (role="alert", aria-live="assertive")
- Form resets after success, "Send another message" returns to idle form
- No API keys in client bundle (verified via browser dev tools Network tab)
- TypeScript, ESLint, and Next.js build all pass