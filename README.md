# anv.red

Anvesh Reddy's engineering portfolio. Plain HTML, CSS, and JavaScript, hosted on Cloudflare Pages from this GitHub repository.

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

Publishing runs the checks, checks for newer remote commits, commits the portfolio files, and pushes `main`. The existing Cloudflare Pages Git integration handles deployment to anv.red. The GitHub workflow also runs these checks on pushes and pull requests. Cloudflare and GitHub checks run independently; the local publish command checks before pushing.

Use a separate branch and pull request when you want a Cloudflare preview before production; availability depends on the project's preview branch settings. Do not add a second deployment system or Cloudflare API token for the normal Git integration.

For an HTML-only Pages project, the deployment folder is the repository root and no build step is required. Preserve the existing Cloudflare project and custom domain settings.

## Browser editing

Open the page with `#edit` to edit text or choose media locally. Download the edited HTML, replace `index.html` in this checkout, and place new files in `media/`. Browser edits are not published or saved to GitHub automatically.

## Rollback

Revert the unwanted Git commit and push the revert to `main`. This preserves history and triggers a replacement deployment.
