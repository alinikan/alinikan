# Profile design and automation notes

**Audience:** GitHub visitors, fellow developers, and hiring managers.

**Public README content:**
- Original animated banner, simple personal introduction, CS education, selected personal details
- Featured web applications, AI/data projects, games, and links to all other repositories
- Compact technology badges
- Two GitHub statistics graphics
- One Pac-Man contributions animation
- Contact links

**Intentionally excluded from the public README:** constellation, RPG player sheet, skill proficiency disclaimers, developer XP, achievement graphics, 3D activity chart, secret game puzzles, alternate arcade-mode launch links, infrastructure explanations, automation descriptions, and companion site documentation.

## Why there was a six-project constellation

The old generated image showed six hand-picked examples. It was a static graphic, not a live list of every public repository; some other projects appeared as regular links elsewhere. It also introduced visual clutter and a bordered motif. The revised professional profile **removes the constellation entirely** rather than pretending it contains all repositories or trying to add dozens of tiny circles.

## What remains technically available

The main README still uses `generated/stats.svg`, `generated/languages.svg`, and `generated/arcade/pacman-contribution-graph{,-dark}.svg`.

The following automated refreshes are relevant:
- `.github/workflows/telemetry.yml` — stats and language graphics.
- `.github/workflows/arcade.yml` — the single Pac-Man contribution animation (light and dark versions).

The previous developer XP generator, mission panel, scheduled 3D graph, and seasonal README banner rotation are no longer needed for the public landing page.

The `site/` static companion website and its GitHub Pages workflow may remain as an independent optional portfolio experiment, but it is not embedded, marketed, or explained in the profile README.

## Approval

The feature branch is still a pull request against `main`; publishing requires the owner to merge it. See [the publishing guide](./LAUNCH_CHECKLIST.md).
