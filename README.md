# CJP Action Hub

Independent community support/action hub for Cockroach Janta Party supporters.

This is a static Next.js + TypeScript + Tailwind frontend. It has no backend, no authentication, no database, no paid APIs, and no analytics. Client-side tools use browser APIs and localStorage only.

## What It Includes

- Home page with editorial hero, ticker, quick action cards, stats strip, manifesto preview, creator kit preview, social follow block, local progress checklist, volunteer flow, and disclaimer.
- Follow page with configurable official links, QR codes, copy/open/download actions, and pending-link states.
- Share-card generator with templates, editable text, card sizes, PNG download, caption copy, reset, and randomize.
- Manifesto page with five official demands stored in `src/data/manifesto.ts`, neutral explainers, copy/share/download actions, and mobile carousel behavior.
- Volunteer section with skill cards and external form/email fallback.
- Creator kit page with static assets under `public/creator-kit/`, caption bank, hashtag bank, color guide, meme prompts, and do/don't guide.
- Press/explainer page with independent-status clarity and correction contact.
- Local supporter checklist saved only in browser localStorage.
- SEO metadata, Open Graph image, favicon, robots, and sitemap.

## Setup

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

## Update Official Links

Edit:

```text
src/data/links.ts
```

Set real verified URLs only:

```ts
officialWebsite: "https://cockroachjantaparty.org/",
x: "",
instagram: "",
youtube: "",
telegram: "",
email: "",
pressEmail: "",
volunteerForm: "",
correctionEmail: ""
```

If a value is empty, the UI displays:

```text
Official link pending - update in src/data/links.ts
```

Do not guess or fabricate official handles.

## Update Manifesto Text

Edit:

```text
src/data/manifesto.ts
```

Each demand has:

- `title`
- `demand`
- `whatItMeans`
- `whySupportersCare`

Keep explainers short, neutral, and source-aware.

## Add Creator Kit Assets

Place static files in:

```text
public/creator-kit/
```

Then update:

```text
src/data/creatorKit.ts
```

If you add a zip, set `downloadAllZip` to the public path, for example:

```ts
export const downloadAllZip = "/creator-kit/cjp-action-hub-kit.zip";
```

## Deploy

### Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel.
3. Use the default Next.js settings.
4. Build command: `npm run build`.

### Netlify

1. Push the repo to GitHub.
2. Import the project in Netlify.
3. Use the Netlify Next.js runtime/plugin if prompted.
4. Build command: `npm run build`.

## Disclaimer

CJP Action Hub is an independent community support project and is not the official website of Cockroach Janta Party unless officially endorsed. For official updates, visit `cockroachjantaparty.org` and verified official social channels.

This project should not be used to impersonate the party, fabricate official links, spread misinformation, or target people by caste, religion, gender, or other protected traits.
