# WordForge

WordForge is a lightweight, responsive static website introducing an English vocabulary and dictionary application in development. Android through Google Play is the planned first release; an iOS version is planned for a later stage. The website also retains a separate, fictional demonstration directory. It uses HTML, CSS, and vanilla JavaScript only; there is no build step, server-side application, account system, database, or API integration.

## Preview locally

Open `index.html` in a modern browser. For a more representative local preview, serve the folder using any simple static-file server, then visit its local address. No packages need to be installed. All page and asset references are relative, so the site can also live in a GitHub Pages project subdirectory.

## Update the sample directory

Edit `assets/js/apps.js` and update the `window.WORDFORGE_APPS` array. Each object supports:

- `id`: stable URL-safe identifier used by `app.html?id=...`
- `name`, `icon`, `category`, `developer`, and `description`
- `platforms`, `version`, `updated`, `permissions`, `requirements`
- `website`, `download`, `thirdPartyDownloads`, `license`, and `attribution`
- `screenshots`: local image paths with `alt`, `width`, `height`, and optional `caption`

The current entries are fictional demonstrations and intentionally have no external links, version claims, download availability, or verification status. Keep details accurate, link only to appropriate official sources, and distinguish official downloads from third-party destinations. External URLs are limited to HTTP(S) links and open with `rel="noopener noreferrer"`. Screenshot paths must resolve to local files within the site; provide descriptive alternative text and dimensions. The directory and detail pages create listing content through DOM text nodes rather than interpreting the data as HTML.

## Before publishing a live service

Replace the owner-contact placeholders in `submit.html`, `contact.html`, `terms.html`, `privacy.html`, and `copyright.html` with a real, monitored method. Review the policy pages for the actual operator, jurisdiction, and operation. The current site has no submission or contact backend. Do not add forms, analytics, cookies, advertising, or other collection without implementing the service and updating the privacy information first.

Update the fictional sample data before presenting entries as real listings. Add only assets you have rights to use, supply meaningful alternative text and image dimensions, and disclose any applicable licenses and attribution. No sample screenshots or large media are included in this version.

## Editorial learning photos

The homepage includes two locally stored editorial photos. They are illustrative context only, not WordForge app screenshots or claims about implemented learning features. The images were downloaded from Unsplash and are used under the [Unsplash License](https://unsplash.com/license), which allows free use without required attribution:

- `assets/images/classroom-study.jpg` — Unsplash image `photo-1509062522246-3755977927d7`
- `assets/images/vocabulary-writing.jpg` — Unsplash image `photo-1455390582262-044cdead277a`

The photo credit links on the page point to the Unsplash License. Images are served from this site so they do not create third-party image requests when visitors load the pages.

## WordForge app status and plans

The product direction is an English vocabulary and dictionary application that may grow into a broader language-learning and writing platform. The current Android project is an introductory prototype; app dictionary, learning, and writing features are not implemented. There is no public Google Play listing or app installation link, and no release date has been announced. The Android-first and later iOS roadmap on the homepage describes plans, not completed milestones.

The website's **Try browser demo** link opens `wordforge-preview.html`, a separate, functional vocabulary-card demonstration created for the static website. It is not the Android app or an official release. The preview uses a small sample word list, keeps progress only in page memory, and sends or stores no data.

The homepage labels app capabilities as planned or under consideration. In particular, offline dictionary access depends on implementation, content rights, and testing. The ambition to build a very large vocabulary collection—including the possibility of approaching one billion entries or word forms—is not a claim that such a dataset exists or a confirmed target. Prioritize trustworthy sources, licensing, accurate definitions, useful examples, and search quality over an inflated word count.

There are no official store badges, download buttons, app URLs, ratings, or release dates on the website. When an official listing is published, update the homepage launch section with its real store URL and verify the destination before describing the app as available.

## Deploy to GitHub Pages

1. Add the site files to a GitHub repository.
2. In repository **Settings → Pages**, choose deployment from a branch and select the branch and folder containing `index.html` (usually the repository root).
3. Save the setting and wait for GitHub Pages to publish the site.
4. Check the published home page, all navigation and policy links, the directory filters, and a project detail link under the repository's project path.

The included `404.html` is used as a custom not-found page by static hosts that support this convention.

## Deploy to Cloudflare

The website's HTML pages reference files under `assets/` using paths relative to each page, for example `assets/css/style.css` and `assets/images/classroom-study.jpg`. Keep the HTML files and the complete `assets/` directory together in the deployed static directory.

For a Cloudflare Pages deployment, configure the output directory as the project root (`.`) when deploying these files directly, with no build command. Do not select `public` unless that directory actually contains both the HTML pages and the complete `assets/` directory. This project currently has no `public/` directory or build step.

For a Cloudflare Worker using Static Assets, configure Wrangler's `assets.directory` to the project root (`.`), or to a build output directory that contains the entire site. Deploy the Worker again after changing its asset directory. Do not copy assets into a second folder to compensate for a mismatched deployment setting.

After deployment, check the browser Network panel or request these URLs and confirm they return successfully:

- `/assets/css/style.css`
- `/assets/js/main.js`
- `/assets/images/classroom-study.jpg`
- `/assets/images/vocabulary-writing.jpg`

Cloudflare's [Workers Static Assets documentation](https://developers.cloudflare.com/workers/static-assets/) explains how its asset directory is selected and uploaded.

## Current limitations

- The directory contains fictional sample data only.
- Submissions and contact reports cannot be received or reviewed through the site.
- No app downloads, official store listings, external project links, ratings, live review, security verification, analytics, or accounts are configured.
- The draft legal and privacy pages need owner-specific review and contact details before public operation.
