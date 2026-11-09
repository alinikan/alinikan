# ALI.OS Companion Website — GitHub Pages (Free)

This repository contains an interactive, professional sci-fi × gaming companion site for the public GitHub profile. Its HTML, CSS, and JavaScript files are located under `site/`.

**No API key, additional account, paid AI subscription, database, or paid hosting is required.** Everything needed for the interactive site is browser-side static code. The project guide searches an embedded list of your public projects; it is not a generative AI service.

## What works

- Responsive Nebula/Winter/Arcade-themed design with animated sci-fi visuals.
- Clickable and searchable project constellation; real public project repositories, screenshots and demos.
- Project Navigator ("Ask the archive") that recommends documented public projects from a curated offline list.
- Original **Starfall** mini-game (30 seconds, keyboard and pointer/touch input).
- Theme picker saved locally in your own browser.
- Visitor guestbook that reads publicly approved GitHub Issues (requires one-time label setup after merge).
- Original Starfall mini-game for visitors; the GitHub profile features one Pac-Man contribution animation.
- No visitor tracking, login requirement for browsing, paid scripts, or custom server backend.

## Preview locally on your Mac

Open Terminal in your downloaded repository folder and run:

```bash
cd site
python3 -m http.server 4173
```

Then open `http://localhost:4173`. Stop the server with Control+C. Python 3 is only used as a local file server; the actual hosted site does not run Python.

## Publish with free GitHub Pages

After merging the release PR:

1. Open [GitHub Pages settings](https://github.com/alinikan/alinikan/settings/pages) in the `alinikan/alinikan` repository.
2. Choose **Build and deployment → Source → GitHub Actions**.
3. Open Actions and manually run **Publish ALI.OS Companion Portal** on branch `main`.
4. Confirm the deploy job is green and visit the site via **Settings → Pages → Visit site**.
5. The expected address is `https://alinikan.github.io/alinikan/`, but verify it is actually live before sharing.
6. Set that URL as the **Website** link under your GitHub **Edit profile** settings.
7. If you like, update the README's companion link to point to the confirmed live site.

The existing workflow [`.github/workflows/pages.yml`](../.github/workflows/pages.yml) packages only `site/index.html`, `site/styles.css`, `site/app.js`, and `.nojekyll`; no build-time or runtime dependencies are required.

## Guestbook: public messages with moderation

1. Check GitHub Issues is enabled for the profile repository.
2. Run **Prepare guestbook labels** once to create `guestbook-pending` and `guestbook-approved`.
3. Visitors may use [the guestbook Issue form](https://github.com/alinikan/alinikan/issues/new?template=guestbook.yml); the Issue is public immediately.
4. After checking its content, add the `guestbook-approved` label. Only approved entries appear in your site feed.
5. Remove the approval label to stop showing an entry on the site (GitHub's API caching may delay disappearance).

Visitors do not need to sign into GitHub just to view the portfolio, but they do need to sign in to submit a guestbook message. The site renders visitor text as plain text to avoid injecting unsafe HTML.

## Updating your projects

Open `site/app.js` and edit the `projects` array near the top. Each entry contains a name, category, technologies, source URL, optional demo URL and optional screenshot URL. Updates to the project list in `site/app.js` are published by the Pages workflow after a push to `main`.

The Project Navigator uses this local list. It does not call any model service or charge any fees.

## Browser testing

The PR has Playwright end-to-end tests for desktop and mobile browsers. Testing is handled for you by the GitHub Actions validation workflow.

You can run them locally if Node.js is already installed:

```bash
cd site
npm install
npx playwright install chromium
npm run test:e2e
```

These commands are for **development tests only**, not required for visitors or for deployment.

## Complete instructions

See the [full GitHub-only ALI.OS launch checklist](../docs/LAUNCH_CHECKLIST.md), including PR review, merging, GitHub Actions permissions, generated graphics, your visitor guestbook and troubleshooting.

**Status:** Source prepared in the pull request. The hosted Pages URL will only be live after the owner merges the PR and activates GitHub Pages.