# GitHub Profile — Publishing and Maintenance Guide

This file is for **maintaining the profile**, not for display in the public profile README.

## The design

A simple, professional landing page: original animated header, name and introduction, education and interests, selected projects, technology stack, working GitHub stats, and a single Pac-Man contributions animation.

The removed project constellation was a **manually selected showcase of six projects**, not a complete repository list. A constellation containing every repository would become difficult to read. The profile now shows **selected projects** with clear descriptions and links to [all repositories](https://github.com/alinikan?tab=repositories).

The interactive companion website under `site/` is optional and independent. It is **not promoted or discussed in the main README**. It can still be deployed later from the separate GitHub Pages workflow if desired.

## Before publishing

1. Open [PR #1](https://github.com/alinikan/alinikan/pull/1).
2. Open the [branch README](https://github.com/alinikan/alinikan/blob/feature/ali-os-sci-fi-arcade-redesign/README.md) to check formatting.
3. Check the newest validation run and make sure both the static check and browser test pass.
4. Review your personal details and project links. In particular, keep your work role and skills updated if they change.

## Publish the profile

1. From [PR #1](https://github.com/alinikan/alinikan/pull/1), select **Squash and merge**, then confirm.
2. GitHub displays the new README at [github.com/alinikan](https://github.com/alinikan) because the repository is named `alinikan/alinikan`.
3. There is no separate copy-and-paste or local `git push` step.
4. Check the result on a computer and phone.
5. If necessary, revert the merge commit to restore the earlier README.

The PR must remain **unmerged until you choose to publish it**.

## Keep GitHub Stats and Pac-Man working

The cards and animation are already stored in this repository. They were generated successfully on the feature branch.

After merge, open [GitHub Actions](https://github.com/alinikan/alinikan/actions) and run these workflows on `main`, one at a time:

- **Refresh ALI.OS telemetry** — `generated/stats.svg` and `generated/languages.svg`.
- **ALI.OS arcade contribution games** — generates the Pac-Man contribution SVG shown on the profile.

Both workflows are scheduled to refresh automatically. Only Pac-Man is embedded in your public README. If a future update fails, the last generated graphic remains in the repository. If workflows are disabled for inactivity, re-enable them from Actions and run manually. If a job cannot commit, review Settings → Actions → General and the workflow's `contents: write` permission.

The other arcade graphics can remain as unused generated assets; they are not offered as links or selectors on the landing page.

## Optional: the separate interactive website

The independently maintained `site/` folder contains the interactive galaxy, original Starfall game, Project Navigator, guestbook and other components from the earlier proposal. These features are **not part of the profile landing page**.

To deploy them in the future, use [GitHub Pages settings](https://github.com/alinikan/alinikan/settings/pages), select Source: **GitHub Actions**, and run the **Publish ALI.OS Companion Portal** workflow. Once the deployment succeeds, visit the Pages URL from Settings → Pages. This is completely optional.

No paid models or music integrations are required.

## Changing featured projects

Edit the root `README.md`. Update only the selected, most relevant projects and keep the [All repositories](https://github.com/alinikan?tab=repositories) link for everything else. An exhaustive project list on the landing page would be hard to scan.

## Suggested pinned repositories

Pockit, LexiLoop, Autopilot, Recomp, GameRecommender, and After the Last Bell. GitHub allows up to six pinned items on a user profile.

## Troubleshooting

- **Old failure notification:** compare its commit SHA to the latest PR checks; historical failures do not mean the current revision is broken.
- **Image not loading:** confirm the corresponding SVG exists in `generated/` and refresh after GitHub's cache expires.
- **Pac-Man not animated:** inspect the generated SVG and rerun the arcade workflow; some viewers or reduced-motion settings may render a still image.
- **Stats out of date:** rerun the telemetry workflow or inspect any schedule failures.
- **Other projects missing:** the landing page intentionally selects highlights; the full public repository list is linked.
- **Can't merge:** confirm repository access, branch rules, and required checks.

No music API, paid AI backend, or special third-party account is needed.
