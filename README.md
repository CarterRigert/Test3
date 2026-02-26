# SiteBuilderTemplate1

A config-driven React site that deploys automatically to GitHub Pages. Designed to be cloned and populated programmatically — all customizable content lives in a single file and a set of images.

---

## How It Works

Everything that makes a site unique is controlled by two things:

1. **`src/siteConfig.js`** — a single JS object with all text content and branding
2. **`src/images/`** — four image files (hero, logo, two content page images)

Push to `main` and a GitHub Actions workflow automatically builds and deploys the site to the `gh-pages` branch, which GitHub Pages serves.

---

## Placeholder Reference

`src/siteConfig.js` ships with `{{DOUBLE_BRACE}}` placeholder tokens. Replace every token before pushing.

```js
const siteConfig = {
  siteName: "{{SITE_NAME}}",         // Used as alt text for logo image
  tagline: "{{TAGLINE}}",            // Large text overlaid on the hero image
  aboutText: "{{ABOUT_TEXT}}",       // Body text on the home page (supports \n line breaks)
  primaryColor: "{{PRIMARY_COLOR}}", // Hex or CSS color — used for nav links, buttons, spinner

  contact: {
    email: "{{CONTACT_EMAIL}}",      // Shown in footer; renders as a mailto: link
    phone: "{{CONTACT_PHONE}}",      // Shown in footer; renders as a tel: link
    address: "{{CONTACT_ADDRESS}}"   // Shown in footer as plain text
  },

  page1: {
    title: "{{PAGE1_TITLE}}",        // Nav link label + button label on hero + page heading
    content: "{{PAGE1_CONTENT}}"     // Body text on page 1
  },
  page2: {
    title: "{{PAGE2_TITLE}}",        // Nav link label + button label on hero + page heading
    content: "{{PAGE2_CONTENT}}"     // Body text on page 2
  }
};
```

> **Optional pages:** If you set `page1` or `page2` to `null`, those routes, nav links, and hero buttons are hidden automatically. You can also omit individual contact fields and they won't render.

### Color format

`primaryColor` accepts any valid CSS color value. Hex is recommended:

```
"#3a7bd5"
```

---

## Images

Replace the four files in `src/images/` with your own. Keep the exact filenames — the components import them by name.

| File | Where it appears | Recommended size |
|---|---|---|
| `hero.jpg` | Full-width banner on the home page | 1600 × 900 px |
| `logo.png` | Top of the sticky navbar | Height 50 px, transparent PNG |
| `page1.jpg` | Displayed on Page 1 | 800 × 600 px |
| `page2.jpg` | Displayed on Page 2 | 800 × 600 px |

Any web-compatible image format (jpg, png, webp) works as long as the filename matches.

---

## Deployment

The repo includes `.github/workflows/deploy.yml`. On every push to `main`:

1. GitHub Actions installs dependencies and runs `npm run build`
2. The `build/` output is pushed to the `gh-pages` branch via `peaceiris/actions-gh-pages`
3. GitHub Pages serves the `gh-pages` branch

No secrets or configuration beyond enabling GitHub Pages are required. The workflow uses the built-in `GITHUB_TOKEN`.

### One-time GitHub Pages setup

After creating the repo, enable Pages in the repo settings:

- **Settings → Pages → Source:** Deploy from branch
- **Branch:** `gh-pages` / `/ (root)`

The site will be live at `https://<username>.github.io/<repo-name>/` after the first successful workflow run.

> The app uses `HashRouter`, so no `homepage` field is needed in `package.json` and deep links work without server configuration.

---

## Automated Setup Guide (for the site builder service)

This section describes exactly what a serverless function needs to do to produce a populated, deployed site from this template.

### Step 1 — Clone the template

```bash
git clone https://github.com/<template-owner>/SiteBuilderTemplate1.git <new-site-name>
cd <new-site-name>
```

### Step 2 — Replace placeholders in `src/siteConfig.js`

Do a string replacement for each token. All tokens follow the `{{SCREAMING_SNAKE_CASE}}` pattern.

| Token | Field |
|---|---|
| `{{SITE_NAME}}` | Site / business name |
| `{{TAGLINE}}` | Hero tagline |
| `{{ABOUT_TEXT}}` | Home page body copy |
| `{{PRIMARY_COLOR}}` | Brand color (hex) |
| `{{CONTACT_EMAIL}}` | Contact email |
| `{{CONTACT_PHONE}}` | Contact phone |
| `{{CONTACT_ADDRESS}}` | Contact address |
| `{{PAGE1_TITLE}}` | First page title |
| `{{PAGE1_CONTENT}}` | First page body copy |
| `{{PAGE2_TITLE}}` | Second page title |
| `{{PAGE2_CONTENT}}` | Second page body copy |

Example (Node.js):

```js
const fs = require('fs');

const replacements = {
  '{{SITE_NAME}}': 'Acme Bakery',
  '{{TAGLINE}}': 'Baked fresh every morning',
  '{{ABOUT_TEXT}}': 'We have been baking in Portland since 1987.',
  '{{PRIMARY_COLOR}}': '#c0392b',
  '{{CONTACT_EMAIL}}': 'hello@acmebakery.com',
  '{{CONTACT_PHONE}}': '+1 503-555-0100',
  '{{CONTACT_ADDRESS}}': '123 Main St, Portland OR 97201',
  '{{PAGE1_TITLE}}': 'Menu',
  '{{PAGE1_CONTENT}}': 'Sourdough, croissants, and more.',
  '{{PAGE2_TITLE}}': 'Events',
  '{{PAGE2_CONTENT}}': 'Join us for our weekly tasting nights.',
};

let config = fs.readFileSync('src/siteConfig.js', 'utf8');
for (const [token, value] of Object.entries(replacements)) {
  config = config.replaceAll(token, value);
}
fs.writeFileSync('src/siteConfig.js', config);
```

### Step 3 — Replace images

Overwrite the files in `src/images/` with the user's uploaded images. Keep the filenames identical.

```bash
cp /path/to/uploaded/hero.jpg    src/images/hero.jpg
cp /path/to/uploaded/logo.png    src/images/logo.png
cp /path/to/uploaded/page1.jpg   src/images/page1.jpg
cp /path/to/uploaded/page2.jpg   src/images/page2.jpg
```

If the user didn't provide a particular image, leave the placeholder in place.

### Step 4 — Point to the user's new GitHub repo

```bash
git remote set-url origin https://github.com/<user>/<new-repo-name>.git
```

The new repo should already exist (created via the GitHub API before this step) and be empty.

### Step 5 — Commit and push

```bash
git add src/siteConfig.js src/images/
git commit -m "Configure site for <user>"
git push -u origin main
```

This push triggers the GitHub Actions workflow. The site will be live within ~2 minutes.

### Step 6 — Enable GitHub Pages on the new repo

Use the GitHub API to enable Pages on the `gh-pages` branch:

```
PUT /repos/{owner}/{repo}/pages
{
  "source": {
    "branch": "gh-pages",
    "path": "/"
  }
}
```

The `gh-pages` branch is created automatically by the workflow on first run, so this API call can be made immediately after pushing or after waiting for the workflow to finish (polling `GET /repos/{owner}/{repo}/actions/runs`).

### Required OAuth scopes

The GitHub OAuth token obtained from the user needs:

| Scope | Why |
|---|---|
| `repo` | Create repo, push code, read workflow status |
| `workflow` | Allow pushing `.github/workflows/` directory |

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Component library | Material UI (MUI) v5 |
| Routing | React Router v6 (HashRouter) |
| Build tool | Create React App (react-scripts 5) |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages (`gh-pages` branch) |

---

## Local Development

```bash
npm install
npm start       # dev server at http://localhost:3000
npm run build   # production build → ./build
```
