# ALI.OS — Complete FREE Setup, Publishing & Maintenance Guide

**Last reviewed:** November 9, 2026  
**Profile:** [github.com/alinikan](https://github.com/alinikan)  
**Profile repository:** [alinikan/alinikan](https://github.com/alinikan/alinikan)  
**Release PR:** [ALI.OS Pull Request #1](https://github.com/alinikan/alinikan/pull/1)

> **Your goal:** A stylish sci-fi × gaming GitHub profile with animated graphics, real GitHub activity stats, Pac-Man as the main contribution animation, seven other arcade games, a separate interactive portfolio, an original mini-game, an expandable project guide and a moderated guestbook. **No paid services, private keys, new third-party accounts, or music integrations.**

## 1. What is free, what is required?

| Item | Service | Account / payment needed? | Purpose |
|---|---|---|---|
| Main profile and README | GitHub | Existing GitHub account only | Your existing `alinikan/alinikan` profile README |
| Stats, languages, RPG XP, projects, 3D contributions, all 8 arcade graphs | GitHub Actions | No additional account or paid API key | Scheduled SVG updates stored in your repository |
| Interactive ALI.OS website | **GitHub Pages** | No additional account; free for public repositories | Galaxy, project search, local guide, Starfall, theme picker and guestbook viewer |
| Guestbook | GitHub Issues | Existing GitHub account | Public submissions; approved by you before being shown on the companion website |
| Design assets | SVG and CSS/JavaScript stored in GitHub | No | Sci-fi theme, season changes, animations and effects |

**You do not need to sign up for anything else.** The built-in **Project Navigator** works in your browser using a curated project list. It is searchable and useful, but it is not a generative AI chatbot. It neither sends questions to a paid model nor requires a backend.

GitHub Pages is available for **public repositories on GitHub Free**. Standard GitHub-hosted Actions runners are free for public repositories, subject to GitHub's policies and abuse limits. Your `alinikan/alinikan` profile repository must stay public.

Useful official documentation: [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) · [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [GitHub profile README](https://docs.github.com/en/account-and-profile/how-tos/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme).

## 2. What is already complete and tested?

- ✅ Cinematic animated ALI.OS banner with reduced-motion handling, and Nebula/Winter/Arcade colour presets.
- ✅ Clean sci-fi and gaming-themed README showcasing newer real software projects, ML, games, timeline and achievements.
- ✅ Developer RPG visual skill tree, real-repository XP formula, original galaxy visualization and expandable hidden puzzle.
- ✅ **Real generated GitHub Stats and Top Languages** stored inside the profile repo (no broken third-party public image endpoint).
- ✅ **Real Pac-Man contribution animation as the main graphic**, with seven alternate games in the expandable Arcade section. All eight were successfully generated from GitHub data.
- ✅ Real 3D contribution skyline and recently updated public projects from GitHub data.
- ✅ Interactive, browser-tested ALI.OS companion site with project search, clickable planets, local Project Navigator and playable original Starfall mini-game.
- ✅ Automatic monthly seasonal themes and a moderated visitor guestbook design.
- ✅ Desktop and mobile Playwright tests in the PR validation workflow.
- ✅ GitHub Pages publishing workflow included, ready to run after you choose to publish.
- ❌ No model API, music service, secret tokens or paid hosting code. The abandoned optional integrations were removed from the working tree.

**Still needs one-time owner activation:** merging PR #1; enabling GitHub Pages; running (or verifying) the Actions workflows on `main`; and creating guestbook moderation labels. **No cost or special external credentials.**

## 3. First: review the final pull request

1. Open **[Pull Request #1](https://github.com/alinikan/alinikan/pull/1)**.
2. Check **Checks** and make sure the newest commit has passing static and browser validation. Historical failed runs are not the status of the current commit.
3. Select **Files changed** to review `README.md`, `site/`, `assets/`, `generated/` and `.github/workflows/`.
4. View the [draft profile README on the feature branch](https://github.com/alinikan/alinikan/blob/feature/ali-os-sci-fi-arcade-redesign/README.md). Test light/dark GitHub theme if desired.
5. In the latest successful Actions validation, expand **Artifacts** and download `alios-portal-preview-and-tests` to see desktop/mobile previews and browser test results.
6. You can also preview the companion website locally; see Section 4.
7. When you approve everything, proceed to Section 5. **This guide does not merge your PR automatically.**

### About the “No jobs were run” GitHub email

That warning came from a **historical PR revision** (commit `65a7846`). That run showed no executed jobs. Later checks and the real graphics-generating workflows succeeded. Look at the newest commit's Checks tab rather than older warning emails. If you ever see the same failure for the newest commit, investigate the run's event and GitHub Actions permissions before merging.

## 4. Optional: preview the companion on your Mac

**Option A: Preview the GitHub-generated screenshots** — the fastest method:

1. In the draft PR choose **Checks**, open the newest passing **Validate ALI.OS draft** run.
2. In **Artifacts**, download `alios-portal-preview-and-tests`.
3. Open the desktop/mobile screenshots to inspect layout and colours.

**Option B: Open the website locally** — you can click the planets and play Starfall:

1. Open the repository code on the feature branch and click **Code → Download ZIP**.
2. Unzip to a folder on your Mac.
3. Open **Terminal**, type `cd ` (including the space), drag your unzipped repository folder into Terminal, and press Return.
4. Run:

```bash
cd site
python3 -m http.server 4173
```

5. Open **http://localhost:4173** in Safari or Chrome.
6. Test project filters, galaxy planets, Project Navigator questions, Starfall, seasonal site themes and guestbook display.
7. Stop the local server with **Control + C**. No package manager or paid service is needed.

If Python 3 isn't present, you can skip the local preview and rely on the already-automated browser tests.

## 5. Publish the README to your real GitHub profile

This is the only step that replaces your existing public profile. **Do this when you actually want the new profile published.**

1. Open [PR #1](https://github.com/alinikan/alinikan/pull/1).
2. Confirm the newest validation is green and you're satisfied with the profile.
3. The pull request should be **Ready for review**, not Draft. If it says Draft, use **Ready for review**.
4. At the bottom, select **Squash and merge**, then **Confirm squash and merge**.
5. Open **https://github.com/alinikan**. The new ALI.OS README should appear automatically: GitHub treats the root-level `README.md` in the public `alinikan/alinikan` repository as your profile README.
6. If you still see the old banner, reload or wait for GitHub's image cache to refresh.
7. Keep the old source branch temporarily until you are satisfied; the merge is safely reversible with git history.

**You do not need to manually run `git push` or paste the README anywhere.** The code is already pushed to your GitHub PR branch. Merging incorporates those changes into `main`.

## 6. Deploy the FREE interactive website using GitHub Pages

This is the **only recommended hosting path** for this no-cost version.

1. Open [your repository's Pages settings](https://github.com/alinikan/alinikan/settings/pages).
2. In **Build and deployment → Source**, choose **GitHub Actions**, not "Deploy from a branch". (A custom Pages workflow is already committed.)
3. Go to the [Actions tab](https://github.com/alinikan/alinikan/actions).
4. In the left menu select **Publish ALI.OS Companion Portal**.
5. Choose **Run workflow**, ensure the branch is **main**, and confirm the run. Your workflow copies the static website assets from `site/` and publishes them via GitHub Pages.
6. Open the workflow and check that the **deploy** job is green. If it says Pages is disabled or environment not configured, revisit Step 2 and rerun.
7. Return to **Settings → Pages**, select **Visit site**. Your expected project address is:

   **https://alinikan.github.io/alinikan/**

   This URL is a **predicted address** until GitHub confirms the successful deployment. Do not assume it's live before Step 6.
8. Test the deployed website on a computer and mobile phone. Try the project constellation, filtering, local Q&A project guide, Starfall mini-game, seasonal themes and guestbook. The local guide needs no API key.
9. Add the *verified* Pages URL to your GitHub profile: open your profile → **Edit profile** → **Website** → paste URL → **Save**.
10. Optionally edit the root `README.md` after deployment to turn the companion-site source link into a link to the working Pages site. The source code stays open for visitors too.

If you want only the GitHub README and not a separate website, **you can skip this whole section**; all the profile visuals and stats still work.

## 7. Make all GitHub statistics and animations refresh automatically

Your draft already contains real graphics generated from your GitHub activity. They are saved inside the profile repository and won't show broken public-host placeholders.

1. Open repository **Settings → Actions → General**.
2. Under Actions permissions, ensure workflows are allowed.
3. The generator workflows use narrow `contents: write` permissions to commit images; if a generator reports a permission error, review **Workflow permissions**, any organization policy, and branch protection. If available, set appropriate read/write permissions for workflows in this repository.
4. Open the [Actions tab](https://github.com/alinikan/alinikan/actions).
5. Run the following workflow names on **main**, **one at a time**, choosing **Run workflow**:
   - **Refresh ALI.OS telemetry** — stats and top languages.
   - **Refresh ALI.OS public mission signals** — latest public projects and transparent RPG XP.
   - **ALI.OS arcade contribution games** — Pac-Man plus all seven other modes, generating dark/light SVGs.
   - **Refresh 3D contribution skyline** — the isometric contribution graph.
6. Watch each workflow until its job turns green before running another. These workflows write to the repository, so parallel first runs may clash.
7. Verify `generated/stats.svg`, `generated/languages.svg`, `generated/mission.svg`, `generated/developer-xp.svg`, `generated/arcade/`, and `profile-3d-contrib/profile-night-rainbow.svg` have refreshed.
8. The schedules are already built. After long inactivity GitHub can disable scheduled Actions on public repositories; if graphics become stale, re-enable the workflows and run them manually.

**No additional GitHub personal access token is needed.** Actions receives a temporary built-in `GITHUB_TOKEN` automatically.

## 8. Enable the moderated, free guestbook

This stores visitor transmissions as GitHub Issues, without a custom database.

1. In the profile repository, go to **Settings → General → Features** and confirm **Issues** is enabled.
2. In Actions choose **Prepare guestbook labels** and run it on `main`. This creates `guestbook-pending` and `guestbook-approved`.
3. Open [Visitor transmission issue form](https://github.com/alinikan/alinikan/issues/new?template=guestbook.yml) after the PR is merged.
4. Submit a harmless test issue. GitHub issues are **public** to everyone, even when not approved for your website; visitors must sign in to submit.
5. Review that issue and add the **guestbook-approved** label only if you're comfortable displaying it on your site.
6. Refresh your deployed Pages website to see the approved entry.
7. To hide the entry from the companion website, remove the approved label. It may briefly remain visible due to caching.
8. Avoid encouraging visitors to share sensitive or private personal information.

The guestbook can remain unused; it doesn't impact your profile or charge you anything.

## 9. Turn on seasonal themes

1. Open **Actions → Rotate ALI.OS seasonal themes**.
2. Select **Run workflow** on `main`.
3. Choose `auto`, `nebula`, `winter`, or `arcade`.
4. The workflow updates the README hero image on your profile; its existing schedule handles future monthly changes.
5. The companion website has a separate theme picker that each visitor can use locally.

## 10. Pin the best repositories

Open **https://github.com/alinikan** → **Customize your pins** (or edit pinned items). Pin six public repositories:

1. **Pockit**
2. **LexiLoop**
3. **Autopilot Car School**
4. **Recomp / workout-tracker**
5. **GameRecommender**
6. **After the Last Bell**

This complements the README's complete project showcase. Optionally update the short profile bio to: "Software Developer | AI & ML · Modern Web Apps · Creative Games" and set the verified Pages site as your Website.

## 11. Troubleshooting

| Symptom | What to check |
|---|---|
| Received an old failure email | Compare the SHA with the newest PR check. Historical failures do not mean the latest revision is failing. |
| “No jobs were run” again | Check workflow event, PR path filters, Actions permissions and the run summary. Don't disable checks just to make them green. |
| GitHub Stats or arcade image missing | Run the relevant Action on `main` and inspect logs; check that generated SVGs exist. Cache may be briefly stale. |
| Generator returns “permission denied” pushing | Check `contents: write`, repository Actions settings and branch rules; don't provide a personal secret token unless absolutely necessary. |
| Can't see “Run workflow” | Ensure the workflow is on the default `main` branch after merging, then open its dedicated Actions page. |
| GitHub Pages returns 404 | Verify Settings → Pages has **GitHub Actions** as the source and that the **Publish ALI.OS Companion Portal** workflow successfully deployed. Use **Visit site** to confirm the real URL. |
| Site layout looks wrong on mobile | Check mobile browser and latest Pages deployment; the PR has desktop and mobile automated tests. |
| Project Navigator doesn't know a new project | It is a curated local browser index. Update the project list in `site/app.js` and push the change; it is not a live AI chatbot. |
| Guestbook entries don't appear | Check Issues enabled, approval label present, issue is public and the GitHub public API isn't rate-limited. |
| Changes take time to appear | Refresh your browser; GitHub image caching and Pages propagation aren't always instant. |

## 12. Final verification (tick these after publishing)

- [ ] PR #1 latest **check** and **browser** jobs both pass.
- [ ] PR #1 merged to `main`, and the ALI.OS hero appears on your GitHub profile.
- [ ] All modern featured projects, ML projects and creative games link correctly.
- [ ] GitHub Stats, language chart, recent projects and RPG XP display actual data.
- [ ] Pac-Man is the main animated contribution graph; all eight game choices work.
- [ ] The 3D contribution skyline loads.
- [ ] Seasonal themes and scheduled refresh workflows work.
- [ ] GitHub Pages **Visit site** opens the interactive portal, including on mobile.
- [ ] The Project Navigator, constellation, project filters, Starfall and theme switch work.
- [ ] Guestbook labels are created; only approved issues display on the website.
- [ ] Your GitHub profile Website points to the verified Pages domain.
- [ ] No paid model endpoint, music widget, additional credentials or externally billed services are part of the profile project.

## Final reference links

- [Review PR #1](https://github.com/alinikan/alinikan/pull/1)
- [Preview README branch](https://github.com/alinikan/alinikan/blob/feature/ali-os-sci-fi-arcade-redesign/README.md)
- [GitHub Actions dashboard](https://github.com/alinikan/alinikan/actions)
- [GitHub Actions settings](https://github.com/alinikan/alinikan/settings/actions)
- [GitHub Pages settings](https://github.com/alinikan/alinikan/settings/pages)
- [GitHub Issue form](https://github.com/alinikan/alinikan/issues/new?template=guestbook.yml)
- [GitHub profile](https://github.com/alinikan)

**Publication policy:** PR #1 remains unmerged until you decide to publish. This guide is written for GitHub-only, no-cost operation.