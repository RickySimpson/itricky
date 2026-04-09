# IT Ricky Website — itricky.com

A professional static website for IT Ricky Managed Service Provider.  
Built with pure HTML/CSS/JS — no frameworks, no build step, deploys instantly.

---

## 🚀 Deploy to GitHub Pages

### 1. Create the Repository
```bash
# Create a new repo on GitHub named: itricky.com  (or any name you prefer)
git init
git add .
git commit -m "Initial site launch"
git remote add origin https://github.com/YOUR_USERNAME/itricky.com.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose `main` branch, `/ (root)` folder
4. Click **Save**

GitHub will give you a URL like `https://yourusername.github.io/itricky.com`

### 3. Add Custom Domain on GitHub
1. Still in **Settings → Pages**, add `itricky.com` under **Custom domain**
2. Check **Enforce HTTPS** (after DNS propagates)
3. GitHub will create a `CNAME` file — commit it:
   ```bash
   git pull  # get the CNAME file GitHub created
   git push
   ```

---

## 🌐 Cloudflare DNS Setup

In your Cloudflare dashboard for `itricky.com`:

### Add these DNS Records:

| Type  | Name | Value                         | Proxy |
|-------|------|-------------------------------|-------|
| A     | @    | 185.199.108.153               | ☁️ ON |
| A     | @    | 185.199.109.153               | ☁️ ON |
| A     | @    | 185.199.110.153               | ☁️ ON |
| A     | @    | 185.199.111.153               | ☁️ ON |
| CNAME | www  | YOUR_USERNAME.github.io       | ☁️ ON |

> **Note:** GitHub Pages IP addresses above are current as of 2025. Verify at  
> https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

### Cloudflare SSL/TLS Settings
- SSL/TLS mode: **Full** (not Full Strict — GitHub Pages uses shared certs)
- Enable **Always Use HTTPS**
- Enable **Automatic HTTPS Rewrites**

### Cloudflare Page Rules (optional but recommended)
- `http://itricky.com/*` → **Always Use HTTPS**
- `www.itricky.com/*` → **Forwarding URL** (301) → `https://itricky.com/$1`

---

## 📧 Email Capture → CRM Integration

The email form in `index.html` is pre-wired for CRM connection.  
Find this comment block in the `<script>` section:

```javascript
// ── CRM HOOK: Replace this fetch with your CRM endpoint ──
```

### HubSpot (Free CRM — Recommended)
```javascript
const portalId = 'YOUR_PORTAL_ID';
const formGuid = 'YOUR_FORM_GUID';  // from HubSpot Forms

await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fields: [{ name: 'email', value: email }],
    context: { pageUri: 'https://itricky.com', pageName: 'IT Ricky Homepage' }
  })
});
```

### Mailchimp
```javascript
// Use Mailchimp's embedded form action URL or their API
// Easiest: embed their hidden form and POST to it
```

### Pipedrive / Zoho / Salesforce
- All support webhook or form API endpoints
- Consider using **Zapier** or **Make (Integromat)** as middleware  
  (form → Zapier webhook → CRM) — no code needed

### Simple Webhook (Zapier/Make)
```javascript
await fetch('https://hooks.zapier.com/hooks/catch/XXXXX/YYYYY/', {
  method: 'POST',
  body: JSON.stringify({ email: email, source: 'itricky.com homepage' })
});
```

---

## 📁 File Structure

```
itricky.com/
├── index.html        ← entire site (single file)
├── CNAME             ← created by GitHub (itricky.com)
└── README.md         ← this file
```

---

## ✏️ Customization Checklist

- [ ] Update phone number: `(702) 555-0100` → your real number
- [ ] Update email: `hello@itricky.com` → your real email
- [ ] Add your real social media links (LinkedIn, etc.)
- [ ] Replace testimonials with real client quotes
- [ ] Wire up CRM endpoint (see above)
- [ ] Add Google Analytics / Plausible tracking script
- [ ] Add a favicon (`<link rel="icon" href="favicon.ico">`)
- [ ] Update footer copyright year as needed

---

## 📊 Add Analytics (optional)

Paste before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

*Built for itricky.com · Deployed via GitHub Pages · DNS via Cloudflare*
