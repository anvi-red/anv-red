# anv.red

Anvesh Reddy's engineering portfolio. Plain HTML, CSS, and JavaScript, hosted on the existing Cloudflare Worker `anv-red` through Workers Builds and this GitHub repository.

## Edit and preview

`index.html` is the current page. Project media lives in `media/`; the résumé is `resume.pdf`. The older HTML files are retained history, not the active site.

With Node.js installed, no dependency installation is needed:

```sh
npm run dev
```

Open http://127.0.0.1:8787. Refresh after saving changes. Stop with Ctrl+C.

## Check and publish

```sh
npm run check
npm run publish -- "Describe the portfolio update"
```

Publishing runs the checks, checks for newer remote commits, commits the portfolio files, and pushes `main`. The existing Cloudflare Workers Builds Git integration handles deployment to anv.red. The GitHub workflow also checks and packages the site on pushes and pull requests. Cloudflare's deploy command `npx wrangler deploy` reads `wrangler.json`, runs the same checks through `scripts/build.mjs`, and deploys the generated `dist/` folder. Failed checks stop packaging and deployment.

Use a separate branch and pull request when you want a preview before production; availability depends on the project's non-production branch settings. Do not add a second deployment system or Cloudflare API token for the normal Git integration.

Preserve the existing Cloudflare Worker and custom domain settings. The dashboard build command can remain empty: Wrangler invokes the checked packaging step. Only the page, media, and résumé are packaged; development files and historical pages stay in GitHub.

If the terminal credential helper is unavailable inside Codex, use the connected GitHub plugin to publish one commit containing the reviewed changes. Fetch and synchronize this checkout afterward; never expose or store credentials in this repository.

## Browser editing

Open the page with `#edit` to edit text or choose media locally. Download the edited HTML, replace `index.html` in this checkout, and place new files in `media/`. Browser edits are not published or saved to GitHub automatically.

## Rollback

Revert the unwanted Git commit and push the revert to `main`. This preserves history and triggers a replacement deployment.
