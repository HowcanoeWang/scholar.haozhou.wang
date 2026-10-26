# AGENTS.md

Project-level notes for agents working on this repository.

## Data that expires

| File | Refreshed by | Cadence |
|---|---|---|
| `public/files/scholar.json` | `.github/workflows/update_google_scholar.yml` | weekly, Mondays |
| `public/files/repos.json`, `hf_likes.json` | same workflow, via `scripts/update_github_stats.py` | weekly, Mondays |
| `public/files/journal_metrics.json` | **nobody — manual** | yearly, June |

### June check: journal metrics

Clarivate publishes the new Journal Citation Reports in mid-June. Once it is out,
compare `public/files/journal_metrics.json` against the new release:

- `if` — Journal Impact Factor, `if_year` — the JCR release year it came from.
- `cas` — Chinese Academy of Sciences partition per site language; the CAS
  edition itself is usually published in December, so also re-check it when
  that edition lands.

Only edit the values that actually changed, keep the JSON shape, then run
`pnpm build` and `pnpm exec svelte-check --threshold error`, and commit as
`chore(data): refresh journal metrics for <year>`. If a number cannot be
confirmed from two sources, report the discrepancy instead of guessing.

The CV reads the same Scholar data at build time: run
`python scripts/sync_cv_citations.py` before `latexmk -xelatex public/files/cv.tex`.
