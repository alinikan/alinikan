# ALI.OS — Implementation, activation and review guide

## Scope and review protection

For complete, step-by-step publication and connector instructions, see **[LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md)**.

The user selected **Nebula OS sci-fi visuals + Arcade gaming personality**, approved all twenty features, and specifically chose **Pac-Man as the primary contribution animation**, with all eight arcade options available within an expandable section.

This entire redesign is in draft pull request #1, branch `feature/ali-os-sci-fi-arcade-redesign`. **Nothing in this branch automatically changes the live profile until the PR merges.** Do not merge without the user's explicit request.

## All 20 features — implementation matrix

| # | Feature | Implementation | Status |
|---|---|---|---|
| 01 | Cinematic ALI.OS boot hero | `assets/hero.svg`; custom animated SVG; reduced-motion support | Built, previewable in draft |
| 02 | Developer RPG sheet | README dossier + `assets/skill-tree.svg` | Built |
| 03 | Repository galaxy | README overview `assets/galaxy.svg`; clickable planets in `site/` | Built; interactive version requires site hosting |
| 04 | Contribution arcade | Pac-Man main; eight options; local preview SVGs; generator workflow | Generated successfully from real public GitHub data on draft; scheduled after merge after merge |
| 05 | Hidden easter egg | GitHub-native nested details and riddle | Built |
| 06 | Mission Control | Consolidated statistics, actual public-build signals and playful XP | Generated successfully from real public GitHub data on draft; scheduled after merge |
| 07 | Featured applications | Pockit, LexiLoop, Autopilot, Recomp; AI and games; real images | Built |
| 08 | Animated skill tree | SVG with softly pulsing nodes and travelling signals; reduced-motion fallback | Built |
| 09 | Dark/light support | SVG readability, GitHub picture sources for arcade, styled companion | Built, requires visual check in GitHub themes |
| 10 | Developer timeline | Education, ML, games and modern application arc | Built |
| 11 | What's New panel | Curated project links plus dynamically generated most-recent public push dates | Generated successfully from real public GitHub data on draft |
| 12 | Reliable GitHub Stats | `telemetry.yml`; pinned maintained generator; local fallbacks | Tested successfully; generated real stats and language cards |
| 13 | Achievements | `assets/achievements.svg` with evidenced milestones | Built |
| 14 | Activity visualization | Native activity links + arcade + 3D skyline workflow | Tested successfully; real 3D skyline generated |
| 15 | Expandable sections | Dossier, timelines, arcade, puzzle and bonus modules | Built |
| 16 | Section navigation | Stable README section anchors and companion navigation | Built |
| 17 | AI project concierge | Functional offline public-project guide + optional Vercel API adapter | Local guide built; model API disabled pending deployment/key/abuse controls |
| 18 | Seasonal themes | Nebula, Winter and Arcade SVGs; monthly + manual Action; site switcher | Built; automation runs after merge |
| 19 | Now Playing | Last.fm updater + JSON + display; no arbitrary or invented music | Built as an opt-in connection; disabled until user connects a public account |
| 20 | Visitor guestbook | GitHub Issue form, approval labels, client-side approved issues feed | Built; submissions activate after merge; approval labels require owner setup |

### Intentional overlap resolution

- **RPG vs achievements:** identity and tool inventory vs evidence-backed milestones.
- **Galaxy vs project cards:** cinematic overview vs practical details, demos and source.
- **Mission Control vs stats vs activity:** one dashboard with distinct views; no redundant stat stacks.
- **Pac-Man vs other game modes vs 3D:** Pac-Man first; *all eight* in details; 3D is separate optional camera angle.
- **Tech badges vs skill tree:** tech tree is main inventory; social badges only navigate to destinations.
- **What's New vs generic activity:** curated current projects vs chronological GitHub activity.
- **README vs companion website:** README is lightweight + static/animated SVGs; true JS interactivity is in `site/`.

## Preview without merging

1. Review [draft PR #1](https://github.com/alinikan/alinikan/pull/1) and the branch README.
2. To run the interactive portal locally, follow [site/README.md](../site/README.md), which requires only Python 3's built-in static server.
3. Use the [CI validation workflow](../.github/workflows/validate.yml) for JavaScript syntax, SVG well-formedness, local README links and all eight arcade modes.
4. Inspect dark and light rendering, mobile widths, and reduced-motion behavior manually before merge.
5. Do not interpret the labelled pre-activation illustrations as actual contribution data.

## Activation after explicit merge approval

### A. GitHub stats / arcade / 3D

- Ensure GitHub Actions runs are allowed and workflow token can write repository contents. Since the workflows commit only files in this profile repo, keep permissions as narrow as possible.
- Run **Refresh ALI.OS public mission signals**, verify `generated/mission.svg` and `generated/developer-xp.svg` contain real GitHub public-repository data. XP is 100 per public original repo plus 30 per public star, not a skill rating.
- Run **Refresh ALI.OS telemetry**, verify `generated/stats.svg` and `generated/languages.svg` no longer contain placeholder content.
- Run **ALI.OS arcade contribution games**, verify all **16** light/dark SVG outputs exist in `generated/arcade/` and Pac-Man is the leading profile graphic.
- Run **Refresh 3D contribution skyline**, verify the generated file `profile-3d-contrib/profile-night-rainbow.svg` has replaced the marked preview.
- Check GitHub Actions logs for upstream API or token errors, rather than assuming success.
- Scheduled Actions may be disabled after long repository inactivity; manual `workflow_dispatch` remains the recovery option.

### B. Seasonal theme and website

- Run **Rotate ALI.OS seasonal themes** (optional initial selection, or automatic monthly schedule).
- To host the interactive companion, enable GitHub Pages in repository Settings → Pages (Source: GitHub Actions), then run **Publish ALI.OS Companion Portal**. The public site would be `https://alinikan.github.io/alinikan/` after deployment; **it is not live now**.
- If preferring model-powered answers, deploy `site` as a **separate Vercel project** using the setup notes in [site/README.md](../site/README.md). This is not required for the other features.

### C. AI, music and guestbook

- **AI model:** never commit `OPENAI_API_KEY`; configure a protected secret in a server-side deployment, provider spend caps, and platform-wide abuse throttling; then set a same-origin API endpoint in the site meta tag. Until then the local project guide works without AI.
- **Listening feed:** optional only. Configure public `LASTFM_USERNAME` as a repo variable and `LASTFM_API_KEY` as a secret. The workflow generates only the opted-in public data. See privacy/opt-out instructions in [site/README.md](../site/README.md).
- **Guestbook:** repository Issues are already enabled. After merge, run the staged **Prepare guestbook labels** workflow to create `guestbook-pending` and `guestbook-approved` if missing; use the prepared Issue form. Only approved messages appear in the companion site. All submitted GitHub issues are public before approval, so the form warns visitors not to share private data.
- Neither a secret, listening account, nor AI connection is required to display the README itself.

## Security and quality

- GitHub Actions use pinned full commit SHAs from official release tags or verified upstream commits. Update intentionally after reviewing upstream changes.
- The browser has a conservative CSP, no external JS or tracking analytics, and uses DOM text nodes rather than untrusted HTML insertion.
- The AI adapter uses server-side credentials, bounded prompts and responses, and a curated public dataset. Origin checks and output budgets do not replace an edge WAF / rate limiter.
- Complicated interactive visuals aren't embedded as scripts in GitHub's README because GitHub strips them.
- Project URLs should be periodically verified, and private repositories must not be exposed without permission.
- Stats widgets only become real once the relevant workflow succeeds; marked fallback images are intentional.

## References

- https://github.com/stats-organization/github-readme-stats-action
- https://github.com/abozanona/pacman-contribution-graph
- https://github.com/yoshi389111/github-profile-3d-contrib
- https://docs.github.com/en/account-and-profile/how-tos/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme
- https://docs.github.com/en/actions
