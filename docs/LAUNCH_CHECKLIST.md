# ALI.OS — Complete Launch, Connections, and Troubleshooting Guide

**Owner:** `alinikan` · **Repository:** `https://github.com/alinikan/alinikan`  
**Main project:** profile README plus optional interactive companion portal.  
**Review branch:** `feature/ali-os-sci-fi-arcade-redesign` · **Draft PR:** [#1](https://github.com/alinikan/alinikan/pull/1)

> **Important:** The repository's `main` branch controls your real GitHub profile. All work remains isolated to the review branch until you personally merge PR #1. The stats, arcade and 3D artwork have now been successfully generated from real public GitHub data on the branch. You do not need to rebuild them manually.

## 0. What do I actually need?

| Feature | Account/service | Required? | Cost / privacy |
|---|---|---|---|
| GitHub profile README, animated assets, all 8 arcade contribution games, stats, mission, XP, 3D, scheduled themes | Your **existing GitHub account** and GitHub Actions | **Yes, already connected** | Public repo / public activity; no special third-party account |
| Interactive companion website — galaxy, project search, local guide, mini-game, themes, guestbook reader | GitHub Pages **or** Vercel | Choose **one** | Pages on public repositories is normally free. Vercel Hobby has usage restrictions |
| Live model-powered AI project concierge | **OpenAI API platform** + **Vercel hosting** + rate limiting | Only to enable actual AI answers | API usage bills separately from ChatGPT, potentially paid. The local non-AI project guide needs none |
| Visitor message submissions | GitHub Issues + the provided issue template and moderation labels | Already part of GitHub, setup required | Public Issues; no secrets or additional database |
| Recently played / Now Playing | Last.fm account and developer API key | **Optional opt-in only** | Public listening activity; disabled unless you choose to enable it |
| Spotify scrobbling | Connect Spotify to Last.fm, if you use Spotify | Optional | Do not connect if you don't want your songs published |

**Not needed:** an extra database, Supabase, Gmail, a Discord bot, Spotify API keys, a domain name, a ChatGPT plugin, or a paid Vercel plan for the base profile.

**My full-feature recommendation:** Keep GitHub as the profile host, and use **Vercel** as the only companion host if you want the model-backed AI concierge. Use GitHub Pages instead if you want to avoid setting up paid AI entirely.

## 1. Review the draft first — before publishing anything

1. Open [the draft pull request](https://github.com/alinikan/alinikan/pull/1).
2. Select **Files changed** to see the new `README.md`, graphics, workflows and site.
3. Open [the draft README](https://github.com/alinikan/alinikan/blob/feature/ali-os-sci-fi-arcade-redesign/README.md) to preview the new profile. Use GitHub's dark/light theme setting to inspect contrast.
4. Open [the Actions validation history](https://github.com/alinikan/alinikan/actions/workflows/validate.yml), choose the newest commit matching the current PR head, and check **both** validation jobs are green.
5. Open that green run and expand **Artifacts**. Download `alios-portal-preview-and-tests`, containing desktop and mobile screenshots and the Playwright report.
6. Examine the modern apps, project links, Pac-Man, all 7 other arcade modes, the 3D graph, the RPG XP description, and the optional offline soundtrack.
7. Do not merge until you like it. Future edits can still be committed to this draft branch.

### What about the earlier GitHub email saying “No jobs were run”?

The failed run [42674311056](https://github.com/alinikan/alinikan/actions/runs/42674311056) belonged to old commit `65a7846`. GitHub registered **zero jobs** for that run — it was not a failing test assertion. Later workflows and actual generator jobs succeeded. Always compare the run's **commit SHA**, not simply whether any historical red badge exists.

If a *new* run again reports no jobs, open its summary, check workflow path filters and GitHub Actions settings, and rerun once. If it remains reproducible, inspect its actual workflow-run event, not just email text. Report a GitHub-side issue if no jobs can be scheduled. Do **not** disable validation to make it green.

## 2. Preview the interactive website on your Mac (optional but useful)

Without installing a package manager or paying for hosting:

1. Open the draft PR → **Code** / branch view. Download the feature branch as ZIP (Code → Download ZIP) or clone it locally.
2. In macOS Terminal, open the extracted repository directory.
3. Run:

```bash
cd site
python3 -m http.server 4173
```

4. Open `http://localhost:4173` in Safari or Chrome.
5. Test the constellation planets, search, local Q&A guide, Starfall, theme switching, and guestbook fallback. Press **Control+C** to stop the local server.

For the automated tests, install Node.js 24 (only if you want to run development tests), then from `site/`:

```bash
npm install
npx playwright install chromium
npm run test:e2e
```

The CI already runs these on desktop and mobile; you do **not** need Node just to view the site.

## 3. Publish the new GitHub profile (only after approving PR #1)

When you decide the design is final:

1. Go to [PR #1](https://github.com/alinikan/alinikan/pull/1).
2. Check that the latest validation is green and that you're happy with the preview.
3. Select **Ready for review** to take the PR out of draft, if GitHub still labels it Draft.
4. Select **Squash and merge** (recommended to keep one clean release commit on `main`), then **Confirm squash and merge**. You can leave the source branch until you have verified everything.
5. Open **https://github.com/alinikan**. Your new profile appears automatically because the public repository is named `alinikan/alinikan` and has a root-level `README.md`.
6. Refresh if your browser/GitHub image cache temporarily shows the old content.
7. If anything looks wrong, you can revert the merge commit via GitHub or restore the earlier README from git history.

You do **not** need to copy and paste the README. You do **not** need a separate `git push` from your computer; the commits are already on the draft GitHub branch.

**Optional terminal alternative**, after reviewing and getting the required approval:

```bash
gh pr ready 1 --repo alinikan/alinikan
gh pr merge 1 --squash --repo alinikan/alinikan
```

Do not run these commands until you intend to publish.

## 4. Make GitHub Stats and every contribution graphic stay refreshed

The draft branch already contains genuinely generated `generated/stats.svg`, `generated/languages.svg`, `generated/mission.svg`, `generated/developer-xp.svg`, 16 light/dark arcade SVGs and `profile-3d-contrib/profile-night-rainbow.svg`.

After merging:

1. In `alinikan/alinikan`, open **Settings → Actions → General**.
2. Confirm that GitHub Actions is allowed for this repository and the workflow permissions are compatible with `contents: write` (the generators need to commit SVGs). Leave **Allow GitHub Actions to create and approve pull requests** off unless independently needed — these generators don't need it.
3. Visit the [Actions tab](https://github.com/alinikan/alinikan/actions). For each workflow below, choose it in the left sidebar, click **Run workflow**, select the **main** branch, and confirm:
   - **Refresh ALI.OS telemetry**
   - **Refresh ALI.OS public mission signals**
   - **ALI.OS arcade contribution games**
   - **Refresh 3D contribution skyline**
4. Run **one at a time** the first time and confirm a green result before starting the next; each commits generated files, so simultaneous writes can conflict.
5. Verify that the README images display real data, that Pac-Man is the main animation, that all other seven games open, and that 3D activity displays.
6. Automatic schedules are already included. GitHub may disable scheduled workflows after prolonged repository inactivity; if updates stop, re-enable them in Actions and trigger a manual run. GitHub stats are snapshots, not continuously live.

**Why wait for merge before clicking Run workflow?** GitHub requires a manually dispatchable workflow file to be present on the repository's default branch. Before merging, only the PR-specific validation workflow was available for ongoing draft checks. We temporarily tested the generators via draft-branch push triggers, then removed those temporary triggers.

## 5. Publish the interactive companion website — choose one host

You only need one hosting option. The GitHub profile and its animated SVGs work regardless of which you choose.

### Option A — GitHub Pages (no AI API needed)

1. Open your profile repository → **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the Source.
3. Open the **Actions** tab, choose **Publish ALI.OS Companion Portal**, then click **Run workflow** on `main`.
4. Once the deploy job is green, use Settings → Pages → **Visit site**, or try the expected project Pages address: `https://alinikan.github.io/alinikan/`.
5. The project guide, clickable galaxy, Starfall mini-game, guestbook viewer, seasonal site themes, and other static features will work. The model-backed assistant remains off because GitHub Pages doesn't run Node.js API functions.
6. You can add your verified deployed URL to your profile's **Edit profile → Website** field and replace the README's companion-source link with the live URL.

### Option B — Vercel (recommended if you want real AI)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) under your intended existing team.
2. Click **Add New → Project**, then **Import Git Repository**.
3. Authorize GitHub access if prompted and select **`alinikan/alinikan`**. Verify this exact repository before proceeding.
4. Name the project something like `ali-os-portfolio` (only if available).
5. Set **Root Directory = `site`**. Framework Preset: **Other**. Leave build command unset for a static site + serverless `api/` function.
6. Preview the PR branch deployment first. Verify its URL, screenshots, responsive layout and local project guide. Don't promote production until you're happy.
7. If you want to activate the real AI project concierge, follow section 6 before exposing its API endpoint.
8. Once approved and merged, Vercel's Git integration can deploy `main` to production. In Vercel → Deployments, verify status is **Ready**, then copy the URL from the deployment or assigned project domain.
9. Put that verified live URL into GitHub **Edit profile → Website** and the README's companion portal link.

You do **not** need both Vercel and GitHub Pages for the same companion website. Vercel Hobby has usage and deployment limits; review your plan before using public serverless AI functionality.

## 6. Activate the real OpenAI project concierge (Vercel only)

The companion works without this setup using its fast, local public-project knowledge guide. The API adapter exists at `site/api/ask.js`, but it is deliberately disabled until you authorize it.

1. Open [OpenAI API Platform](https://platform.openai.com/) and sign in to the intended API organization/project.
2. Review billing / credits and create a **project-scoped secret API key**. **ChatGPT Plus does not inherently pay for API calls**; API billing is separate.
3. Before enabling publicly accessible AI, configure organization/project spend controls and Vercel-level rate limiting / abuse protection for `/api/ask`. The application validates questions and limits generated output, but those checks alone are not a distributed rate limiter.
4. In **Vercel → the ALI.OS project → Settings → Environment Variables**, add a protected server-side `OPENAI_API_KEY`. Do not add it to GitHub source, an issue, a README, or a browser variable prefixed with `VITE_`.
5. Optionally configure `ALIOS_OPENAI_MODEL=gpt-6-luna`; Luna is the default economical GPT-6 model for this limited curated-data Q&A. Use a model actually available to your API project.
6. After security controls are in place, change the tag in `site/index.html` from `<meta name="alios-ai-endpoint" content="">` to `<meta name="alios-ai-endpoint" content="/api/ask">`. Commit and let Vercel deploy a preview first.
7. In that preview, ask “Which projects use TypeScript?”, “Tell me about LexiLoop”, and an unknown-project question. The assistant must stay grounded in curated **public** information and acknowledge unknowns.
8. Check Vercel Function logs, API usage and project costs. Confirm invalid/oversized requests are rejected. Do not open the endpoint widely without rate limiting.
9. If API calls fail, the website automatically falls back to the local project guide instead of breaking the whole experience.

**Important:** The assistant knows only the curated public-project summaries included in its server adapter. It is not a live repository crawler and should not claim access to private files.

## 7. Enable the optional soundtrack station (Last.fm)

Only follow these steps if you explicitly want visitors to see some of your listening activity.

1. Create a [Last.fm](https://www.last.fm/) account, or use your existing account.
2. If you listen through Spotify, connect Spotify in Last.fm **Settings → Applications → Spotify Scrobbling → Connect**. If you use another music app, choose its supported Last.fm scrobbler if one is available.
3. Get your own Last.fm API key through [Last.fm's API site](https://www.last.fm/api). You don't need to publish the Last.fm API secret or link a Spotify API key to this code.
4. On GitHub open `alinikan/alinikan` → **Settings → Secrets and variables → Actions**.
5. Under **Variables**, add `LASTFM_USERNAME` with your Last.fm account name (this is public).
6. Under **Secrets**, add `LASTFM_API_KEY` with your Last.fm API key. Don't paste it into issues, chats, workflow logs, or source files.
7. Run **Refresh optional Last.fm soundtrack station** from GitHub Actions.
8. Confirm `site/now-playing.json` and `generated/now-playing.svg` now represent actual selected public listening activity. The README card and companion site will then show it.
9. The refresh cadence is several times per day, so older activity should be labelled **Recently played** rather than falsely claimed as live.
10. To opt out, remove the repository secret/variable, revert the public JSON and SVG to their disabled state, and remove any previously published commits from visible history only if necessary after reviewing retention implications.

If you do not opt in, the soundtrack station remains tastefully **Not connected**. All other features still work.

## 8. Enable and moderate the visitor guestbook

1. Confirm **Settings → General → Features → Issues** is enabled.
2. From Actions, run **Prepare guestbook labels** once on `main`. This creates `guestbook-pending` and `guestbook-approved`.
3. Open `https://github.com/alinikan/alinikan/issues/new?template=guestbook.yml` and submit a harmless test message from a GitHub account.
4. The issue will be **public immediately** but will not appear in the portal yet.
5. Review the issue. If you approve, add label `guestbook-approved`.
6. Refresh the companion website. Its public API reader will show the approved message (subject to GitHub caching).
7. To hide a message, remove the approved label. Moderation is manual and intentional — no automatic publication of unsolicited content.
8. Ensure the form continues to warn visitors not to post passwords, emails, phone numbers or other private data.

If the **guestbook-approved** label isn't created, the feed can remain empty even when Issues are submitted.

## 9. Seasonal themes and finishing touches

1. The README hero has three original styles: Nebula, Winter and Arcade.
2. Under Actions, choose **Rotate ALI.OS seasonal themes**.
3. Choose `auto`, `nebula`, `winter` or `arcade` and run it on `main`. Automatic monthly refreshes follow the configured seasonal rules.
4. The companion site lets visitors switch themes individually without modifying your profile repo.
5. On [your GitHub profile](https://github.com/alinikan), consider updating the short **bio**, **website**, **location (optional)** and six **pinned public repositories**. Suggested pins: Pockit, LexiLoop, Autopilot, Recomp, GameRecommender, After the Last Bell.
6. Keep private repos and credentials out of the project README; pin public demos whose URLs you have actually verified.

## 10. The final verification checklist

- [ ] Latest draft or merged validation shows **both** jobs green (static checks and browser checks).
- [ ] Old failed `65a7846` email is understood as historical; new checks are green.
- [ ] Animated header and project screenshots render in dark and light mode.
- [ ] Recent TypeScript apps, ML experiments and games have working source links.
- [ ] GitHub Stats, Top Languages, Mission, RPG XP and 3D are **real data**, not previews.
- [ ] **Pac-Man** is the visible arcade animation; all **8** game options are accessible in the expandable area.
- [ ] Theme workflow, stats, arcade, 3D and mission workflows refresh without permission errors.
- [ ] Companion site works on desktop and phone; search, planets, themes and Starfall work.
- [ ] GitHub Pages **or** Vercel domain is deployed and verified before being added to the README.
- [ ] AI concierge is either intentionally local-only **or** has a functioning server key, abuse protection, billing safeguards and tested answers.
- [ ] Last.fm remains disabled unless you explicitly publish listening data.
- [ ] Guestbook labels are created; approved messages appear, unapproved messages don't.
- [ ] No API keys, credentials, visitor private data or connected-app tokens appear in repo source.
- [ ] A rollback is possible via reverting the merge commit if anything goes wrong.

## Helpful links

- [Draft PR](https://github.com/alinikan/alinikan/pull/1)
- [README preview](https://github.com/alinikan/alinikan/blob/feature/ali-os-sci-fi-arcade-redesign/README.md)
- [Validation workflow](https://github.com/alinikan/alinikan/actions/workflows/validate.yml)
- [GitHub Actions](https://github.com/alinikan/alinikan/actions)
- [GitHub Pages settings](https://github.com/alinikan/alinikan/settings/pages)
- [GitHub Actions settings](https://github.com/alinikan/alinikan/settings/actions)
- [GitHub Actions secrets / variables](https://github.com/alinikan/alinikan/settings/secrets/actions)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [OpenAI API platform](https://platform.openai.com/)
- [Last.fm API](https://www.last.fm/api)

**No merge or production deployment should occur merely because this guide exists. You control the final publication.**
