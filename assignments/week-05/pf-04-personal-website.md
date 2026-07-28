# Personal Website Live on the FlyRank Domain

## Live URL

<!-- TODO: Replace with actual deployment URL once deployed -->

**Deployment URL:** `https://flyrank-capstone.vercel.app/`

**Future FlyRank subdomain:** `juliochrist.flyrank.ai` (pending DNS setup)

---

## Hosting Platform

### Vercel

The site is hosted on **Vercel** because:

- **First-class Next.js support** — Vercel is built by the creators of Next.js, so deployment, server components, and API routes work out of the box with zero configuration.
- **Automatic HTTPS** — Every Vercel deployment gets a free SSL certificate via Let's Encrypt, with zero manual setup.
- **Continuous deployment** — Every push to `main` automatically triggers a production build and deployment.
- **Edge network** — Vercel serves static assets from a global CDN and runs serverless functions at edge regions, keeping latency low.
- **Free tier** — The Hobby plan includes enough bandwidth and compute for a portfolio site.

---

## HTTPS

HTTPS is provided automatically by **Vercel** through **Let's Encrypt**.

When a custom domain is added:

1. Vercel detects the domain and provisions a TLS certificate via Let's Encrypt.
2. The certificate covers both `https://yourdomain.com` and `https://www.yourdomain.com`.
3. Certificates are renewed automatically before expiry.
4. All HTTP traffic is redirected to HTTPS with a `301` redirect.

No manual certificate management is needed.

---

## DNS Walkthrough

### What is DNS?

DNS (Domain Name System) is the phonebook of the internet. When you type a domain name like `flyrank.ai` into your browser, DNS translates it into an IP address (like `76.76.21.21`) so the browser can find and load the website.

### What is a domain name?

A domain name is a human-readable address for a website — for example, `flyrank.ai` or `google.com`. Domain names are organized in a hierarchy:

- **TLD (Top-Level Domain):** `.ai`, `.com`, `.org`
- **Second-level domain:** `flyrank` in `flyrank.ai`
- **Subdomain:** `yourname` in `yourname.flyrank.ai`

### What is a CNAME record?

A **CNAME (Canonical Name) record** maps one domain name to another. Instead of pointing to an IP address, it points to another domain.

Example:

```
yourname.flyrank.ai  CNAME  cname.vercel-dns.com
```

This tells DNS: "When someone looks up `yourname.flyrank.ai`, go look up `cname.vercel-dns.com` instead, and use that IP address."

CNAME records are useful because:
- The target (e.g., Vercel's CDN) can change IPs without you updating anything.
- You decouple your domain from the underlying infrastructure.

### DNS Resolver

A **DNS resolver** (also called a recursive resolver) is the server that does the lookup on your behalf. When you type a URL in your browser:

1. Your computer asks the DNS resolver (usually your ISP's or a public resolver like Cloudflare's `1.1.1.1` or Google's `8.8.8.8`)
2. The resolver tracks down the answer by querying multiple DNS servers in sequence.

### Nameserver

A **nameserver** is a server that holds DNS records for a domain. When you register a domain, you specify which nameservers are authoritative for it.

For example, FlyRank might use nameservers like:

```
ns1.flyrank.ai
ns2.flyrank.ai
```

These nameservers contain the DNS records for `flyrank.ai` and its subdomains.

### DNS Record

A **DNS record** is a single entry in a nameserver that maps a domain to something. Common types include:

| Type | Purpose | Example |
|---|---|---|
| A | Maps domain to an IPv4 address | `flyrank.ai` → `76.76.21.21` |
| AAAA | Maps domain to an IPv6 address | `flyrank.ai` → `2600:...` |
| CNAME | Maps domain to another domain | `www.flyrank.ai` → `flyrank-capstone.vercel.app` |
| TXT | Stores text data (often for verification) | Used to prove domain ownership |
| MX | Maps to mail servers | For email delivery |

### Response

Once the resolver has all the records, it returns the final IP address to your browser. Your browser then opens a connection to that IP and requests the website content.

### How a browser reaches a website (step by step)

1. You type `yourname.flyrank.ai` into the browser and press Enter.
2. The browser asks the DNS resolver: "What is the IP address of `yourname.flyrank.ai`?"
3. The resolver starts at the **root nameservers**, which point to the `.ai` TLD nameservers.
4. The `.ai` TLD nameservers point to FlyRank's nameservers.
5. FlyRank's nameservers contain a **CNAME record** for `yourname.flyrank.ai` pointing to `cname.vercel-dns.com`.
6. The resolver follows the CNAME and looks up `cname.vercel-dns.com`, getting Vercel's CDN IP address.
7. The resolver returns the IP address to your browser.
8. Your browser connects to that IP and sends an HTTPS request.
9. Vercel's edge network receives the request, terminates TLS using the Let's Encrypt certificate, and serves the Next.js application.

---

## How the FlyRank Subdomain Will Work

Once FlyRank creates the DNS record for `juliochrist.flyrank.ai`, the setup is:

1. **FlyRank creates the DNS record** — FlyRank's DNS admin adds a CNAME record pointing `juliochrist.flyrank.ai` → `cname.vercel-dns.com` (or FlyRank points the nameserver to Vercel, depending on their setup).

2. **I add the custom domain inside Vercel** — In the Vercel dashboard, I navigate to the project settings → Domains → Add `juliochrist.flyrank.ai`. Vercel verifies domain ownership (via a TXT record or by detecting the CNAME).

3. **DNS propagates** — DNS changes take time to spread across the internet (usually a few minutes to 48 hours, but typically under an hour for most users).

4. **HTTPS is automatically issued** — Once Vercel detects the DNS record is in place, it automatically provisions a TLS certificate via Let's Encrypt for `juliochrist.flyrank.ai`.

5. **No rebuild is required** — Because the DNS CNAME points to Vercel's CDN, the existing deployment serves the custom domain immediately after DNS propagation. No code changes or redeploys are needed.

---

## Changes Made for PF-04

### Navigation
- Added **Experience** link pointing to `/about#experience` (anchors to the existing experience section on the About page)

### Contact Page
- Added **CV / Resume** card with placeholder text ("Coming soon")
- Added **Book a Call** card with placeholder text ("Booking link coming soon")

### Documentation
- Created this PF-04 documentation file with DNS walkthrough and hosting explanation

---

## Deployment Checklist

- [ ] Verify Vercel deployment is linked to the GitHub repository
- [ ] Confirm HTTPS works (green lock in browser)
- [ ] Test all navigation links (Home, About, Projects, Experience, Contact)
- [ ] Test all external links (GitHub, LinkedIn, email)
- [ ] Verify mobile responsive layout
- [ ] Add CV/Resume PDF file and update link
- [ ] Add Calendly or booking link and update placeholder
- [ ] Configure custom domain once FlyRank provides DNS record
- [ ] Wait for DNS propagation
- [ ] Verify HTTPS certificate is issued for custom domain
