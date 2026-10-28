# DearVoice — A Hidden Moment

A responsive React + Vite storefront for DearVoice with a premium blush-pink and cream visual style, a dark-mode toggle, product search/filtering, product detail modals with image galleries, and direct Meesho checkout links.

## Included
- Four live Meesho listings with seller-provided displayed prices, original prices and discounts
- Local product gallery images in `public/images/`
- Product detail modal with image thumbnails and Meesho order link
- Responsive mobile navigation and layouts
- Persistent light/dark theme preference (uses local storage when available)
- How it works section with the supplied demo video replacing the decorative sample photo; the “Watch the demo video” button scrolls to and starts playback
- Dedicated Contact & Connect section with a prominent Instagram profile card, WhatsApp chat link, and email link
- Instagram: https://www.instagram.com/dearvoice/
- WhatsApp: https://wa.me/918319898171
- Contact email: dearvoice27@gmail.com
- Customer feedback invitation (no fabricated testimonials)
- SEO title and description

## Run locally
1. Install Node.js (current LTS recommended).
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite.

## Build and test
Run `npm run build`. Vite creates the production site in `dist/`. To preview the production build locally, run `npm run preview` after building.

## Deploy to Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- No environment variables are required for this static frontend.

## Important notes
- Prices and discounts reflect the seller-provided listing details at the time of preparation and may change on Meesho. Verify them before running promotions.
- Product copy is a concise summary based on the listing titles and details provided in the conversation; verify it against each live Meesho listing if the listing changes.
- Product photos include supplied marketing/gallery images. Images that explain ordering or usage are included in the product gallery where supplied.
- The How It Works section uses the supplied DearVoice demonstration video. The video demonstrates the product workflow; it is not a live customer QR session.
- Customer testimonials are not fabricated; the page invites customers to submit feedback until real reviews are available.
- Checkout and payment happen on Meesho. This website does not collect payment or customer-uploaded media.
