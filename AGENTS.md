# Portfolio working instructions

- This repository is the source for https://anv.red, deployed by the existing Cloudflare Workers Builds Git integration for Worker `anv-red`. Use this checkout for further portfolio edits; do not create a separate hosted Site.
- Edit `index.html`; retain existing `media/`, `resume.pdf`, and historical HTML unless the user requests changes to them.
- Keep the site buildless and responsive. Preserve keyboard navigation, reduced-motion handling, video controls, and the local #edit workflow.
- Ground personal claims and project metrics in user-supplied information. Do not invent achievements.
- Run `npm run check` after edits. Preview when browser infrastructure permits; report any browser verification limit.
- When the user requests publishing, commit reviewed changes and push main through `npm run publish -- "Descriptive message"`, then verify GitHub deployment status and the live site. Never force-push.
- Cloudflare runs `npx wrangler deploy`; `wrangler.json` invokes `scripts/build.mjs`, which checks and copies only index.html, media, and resume.pdf to dist/. Preserve this deployment check.
- If terminal credentials fail, use the connected GitHub plugin to create a tree based on the latest remote tree, commit it, and fast-forward main with an expected head SHA. Fetch and synchronize the local checkout afterward without losing user changes.
