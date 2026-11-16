# KSZ Ventures Limited website

HTML5, CSS3, vanilla JS and PHP. No frameworks.

- `index.html` division selector and company intro
- `transport.html` Transport & Logistics (Keztrip-inspired layout)
- `printing.html` Printing & Branding (Printstack-inspired layout)

## Run locally
Requires PHP 8+.

    cd ksz-ventures
    php -S localhost:8000

Open http://localhost:8000. Use the `.html` pages with the PHP built-in server (`.htaccess` clean URLs `/transport` and `/printing` work on Apache only).

## Configure
- **Phones, WhatsApp, email, address, social links, all image URLs, testimonials:** `js/config.js` (one place; used by navbar, footer, chatbot and pages).
  WhatsApp number format: international, no plus (e.g. `2348179223597`). It is a placeholder taken from the profile phone numbers: confirm it.
- **Form recipients and mail settings:** `php/config.php`.
  - Set `from_email` to an address on your own domain, otherwise hosts often reject the mail.
  - Local testing without a mail server: set `dev_log_only` to `true` (submissions go to `logs/submissions.log`). Set it back to `false` for production.
  - SMTP: `composer require phpmailer/phpmailer`, then set `transport` to `smtp` and fill in `smtp`.
- **Images:** replace Unsplash URLs in `IMAGES` with files in `assets/images/`. Failed images show a branded fallback block.
- **Logo:** text placeholder in `js/main.js` (`.logo`). Swap in the official logo when available.

## Forms and security
Server-side validation, sanitising, honeypot, minimum-fill-time check, per-session rate limit, upload whitelist (PDF/images/AI/PSD/CDR/ZIP, 5 MB) with MIME check and random filenames. Upload and log folders block script execution on Apache. Success is shown only when PHP reports the mail was sent.

## Notes
- The mobile app section shows "Coming Soon" badges only; there are no store links.
- Testimonials are empty until you add real ones to `js/config.js`.
- Chatbot: keyword FAQ in `js/main.js`, with WhatsApp and email handoff. No external API.
