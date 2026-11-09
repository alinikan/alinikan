# ALI.OS — feature and integration roadmap

This file is the truthful implementation status for all 20 features proposed in the redesign. The profile README is a presentation surface, **not** a JavaScript runtime. It may embed compatible HTML, Markdown and SVG images; actual app interactions need a linked hosted website.

## Built in this review branch

1. Cinematic ALI.OS boot hero — custom animated SVG, reduced-motion support.
2. Developer RPG character sheet — class, identity and equipped technology tree (no fabricated scores).
3. Living galaxy — visual SVG map of six real featured builds. Clicking destinations happens through project cards below, because clickable SVG regions are unreliable when embedded as images.
4. Arcade contribution animation — workflow configured for eight generated styles; first published assets require running Action after merge.
5. Hidden puzzle / easter egg — nested GitHub-native details; separate playable game linked.
6. Mission control dashboard — telemetry block with generated stats images and activity shortcuts.
7. Project showcases — eight real repositories, app links and screenshots from actual repos.
8. Tech skill tree — grouped SVG graphic.
9. Theme compatibility — high contrast art, GitHub dark/light arcade source choice; full custom seasonal variation pending.
10. Developer timeline — chronological projects and education, no fabricated dates.
11. What's New — links to latest project repos, not fabricated automatic releases.
12. Reliable stats — GitHub Actions using stats-organization/github-readme-stats-action@v2 and local SVG caching; placeholders prior to first run.
13. Real achievement badges — CS, ML, app shipping, game projects.
14. Activity visualization — standard graph and arcade, with optional 3D graph workflow.
15. Hidden expandable content — tech dossier, puzzles, optional modules.
16. Section navigation — usable Markdown anchors.

## Connected services or companion app needed

17. AI project concierge: requires a separate, deployed app, code-search/retrieval over curated public repos, a provider account and API key, budget controls, spam protection, and clear answers for unavailable source. Never put keys in a README, client code or repo. A demo app should start in *read only* mode and avoid crawling private repos. No assistant is live.
18. Seasonal themes: implement an on-demand workflow for different generated assets with a default constant design and optional calendar rotation. Make dynamic SVGs motion-reduction-friendly. Not wired yet.
19. Now Playing: requires Spotify/Last.fm consent and tokens, plus a privacy decision. Only publish intentionally shared listening information; no song is displayed until authorized.
20. Guestbook: GitHub Discussions is currently disabled on alinikan/alinikan. Owner must enable it in repository settings, configure a category, then link directly to that category. If external, add spam moderation and privacy controls.

## Activation checklist

- Review and merge this branch through a PR. **The preview branch does not affect the existing profile until it is merged.**
- In **Settings → Actions → General**, ensure workflows can run and `GITHUB_TOKEN` is permitted to write repository contents where required. Restrict access to this repository.
- Trigger `Refresh ALI.OS telemetry` manually under **Actions**; verify successful artifacts in `generated/` and images rendered in the README.
- Trigger `ALI.OS arcade contribution games`; verify the `arcade-output` branch and all generated filenames. The action must be permitted to publish the branch. The main Pac-Man embed will be unavailable until that branch exists.
- Trigger `Refresh 3D contribution skyline`; after its first successful run, optionally embed `profile-3d-contrib/profile-night-rainbow.svg` or whichever file it actually generates. Do not guess filenames.
- Verify every external hosted demo is accessible and still appropriate to share publicly.
- Keep all profile stats derived from public data unless you intentionally set up a narrower-scope token for private contribution counts.
- If scheduled workflows stop after inactivity, use workflow_dispatch or commit to reactivate them.
- Avoid relying on exact action branch/tag references forever. Pin verified full commit SHAs before production security hardening; dependabot can help maintain versions.
- Validate README rendering in dark and light GitHub themes, mobile and reduced-motion modes.

## Duplicate feature policy

- **RPG sheet vs achievements:** profile identity vs evidenced milestones.
- **Galaxy vs project cards:** visual overview vs useful detailed links.
- **Mission control vs GitHub statistics:** surrounding dashboard vs individual metric graphics.
- **Arcade games vs 3D contributions:** main Pac-Man, alternative games in details, 3D contribution option in its own details area.
- **Tech tree vs badges:** skill tree is the primary inventory; small social/navigation badges are links, not duplicated technologies.
- **Project activity vs What's New:** live project links are truthful; no fake changelog or artificial automatic status.
- **Music / guestbook / concierge:** distinct integrations, not working widgets until each prerequisite is satisfied.

## References

- https://github.com/stats-organization/github-readme-stats-action
- https://github.com/abozanona/pacman-contribution-graph
- https://github.com/yoshi389111/github-profile-3d-contrib
- https://docs.github.com/en/account-and-profile/how-tos/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme
- https://docs.github.com/en/actions
