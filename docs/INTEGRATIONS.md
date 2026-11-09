# ALI.OS — Feature Inventory and No-Cost Architecture

For detailed click-by-click setup, see [FREE LAUNCH_CHECKLIST.md](./LAUNCH_CHECKLIST.md).

## Design and architecture

- **Visual identity:** NEBULA sci-fi command center + ARCADE gaming personality.
- **Primary GitHub contribution animation:** Pac-Man.
- **Seven additional game visualizations:** Galaga, Breakout, Snake, Tetris, Bomberman, Minesweeper and Puzzle Bobble, grouped in an expandable section.
- **Profile backend:** GitHub repository, GitHub Actions, public GitHub data. Generated images live in `generated/`.
- **Companion hosting:** Free GitHub Pages with the static `site/` HTML/CSS/JS application.
- **No paid models, paid API tokens, music providers, proprietary backend, or additional accounts.**
- **Visitor messaging:** Public GitHub Issues, curated manually via `guestbook-approved`.

## Feature status

| # | Feature | Purpose | Implementation |
|---|---|---|---|
| 01 | Cinematic ALI.OS hero | Distinctive first impression | Original animated SVG; reduced-motion support |
| 02 | Developer RPG | Playful developer identity | Character sheet + skill inventory |
| 03 | Repository galaxy | Visual discovery | Static README SVG + clickable planets in companion |
| 04 | Arcade contributions | Fun live-coded activity display | Real data generated for Pac-Man + seven other modes |
| 05 | Easter egg | Hidden puzzle | Native expandable GitHub Markdown/HTML |
| 06 | Mission Control | Cohesive activity overview | Local saved GitHub-derived SVG cards |
| 07 | Featured projects | Professional software portfolio | Recent TypeScript apps, ML and games |
| 08 | Animated skill tree | Group technologies intuitively | SVG skill signals with reduced-motion fallback |
| 09 | Light/dark adaptation | Readability | Compatible custom graphics and theme-aware images |
| 10 | Developer timeline | Career progression | Curated education and project phases |
| 11 | What's New | Recent public work | Public repo push-date signals and project links |
| 12 | Reliable GitHub Stats | Fix broken legacy widget | Maintained Action generates repo-hosted stats and language SVGs |
| 13 | Milestone achievements | Real project evidence | Original achievement graphic |
| 14 | Activity graphics | Additional activity view | Real 3D GitHub contribution skyline |
| 15 | Expandable content | Clean and uncluttered | Details panels and optional discoveries |
| 16 | Navigation | Efficient exploration | README anchor links + site navigation |
| 17 | Free Project Navigator | Search project knowledge | Curated public projects indexed entirely within the browser |
| 18 | Seasonal graphics | Visually fresh | Automated/manual Nebula, Winter, Arcade banner choices |
| 19 | Moderated guestbook | Public visitor feedback | GitHub Issue template, labels, approved feed |

**Removed by request:** the optional paid model integration and all music-related integrations. Their scripts, workflows, endpoint, generated cards, configuration, tests and instructions were removed. Other portfolio examples may still describe their own machine-learning functionality; that does not introduce a paid service into ALI.OS.

## No duplicate-widget policy

- **Galaxy** is the visual project map; **project cards** contain links, screenshots and details.
- **RPG sheet** describes identity and tools; **achievements** identify milestone accomplishments.
- **Mission Control** groups data; **stats** show GitHub metrics, and **activity** shows contributions.
- **Pac-Man** is the main animation; other seven games and the 3D view are optional expandable modes.
- **Skill tree** is the primary technology inventory; small badges are limited to navigation and social links.
- **Project Navigator** searches curated public metadata; it is not falsely labelled a conversational AI model.

## Completed technical verification

- Genuine SVGs for GitHub Stats, languages, developer XP, most recent repositories, all eight games and 3D contributions were successfully generated on the feature branch.
- Browser tests validate the companion application at desktop and mobile viewport sizes, including project search, navigation, themes, project guide and Starfall.
- The repository contains automated PR checks for JavaScript syntax, SVG XML validity, local asset links and the complete arcade feature inventory.
- Actions use pinned commits for upstream dependencies, and the refresh workflows have narrow, repo-scoped write permissions.
- Profile changes remain behind pull request #1 until the owner explicitly merges them.

## After the merge

1. Enable GitHub Pages using Source: GitHub Actions, then run the existing Pages workflow.
2. Run the stats, mission, arcade and 3D refresh workflows once on `main`.
3. Run the guestbook-label setup Action and moderate messages as desired.
4. Optionally run the seasonal-theme workflow; it can also update automatically on its monthly schedule.
5. Set your verified Pages site URL in your GitHub profile's Website field.
6. Verify the profile and hosted site on desktop and mobile.

GitHub Pages is free for public repositories on GitHub Free. Hosted standard Actions runners are also free for public repositories, subject to GitHub policies. Learn more from [GitHub Pages documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Privacy and safety

- **No API or account credentials** must be added by the user for the portfolio to work.
- GitHub automatically provides a temporary `GITHUB_TOKEN` to workflow jobs as needed; this is not a personal token to create manually.
- GitHub Issues are public. The guestbook only displays manually approved messages.
- Browser project recommendations and the game run locally, not on a separately billed server.
- GitHub READMEs cannot run arbitrary browser scripts; those interactions are correctly located in the companion Pages site.
- Real project screenshots and project demo links may be hosted by their respective project repositories or existing websites, but ALI.OS itself needs no paid hosting.

## Links

[Review PR #1](https://github.com/alinikan/alinikan/pull/1) · [Setup guide](./LAUNCH_CHECKLIST.md) · [Companion site notes](../site/README.md) · [GitHub Actions](https://github.com/alinikan/alinikan/actions) · [GitHub Pages settings](https://github.com/alinikan/alinikan/settings/pages)
