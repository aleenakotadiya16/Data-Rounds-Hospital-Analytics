# GitHub Publication Checklist

## Completed

- [x] Working branch identified: `copilot/report-build`.
- [x] Original project remains separate and untouched.
- [x] Final PBIP/PBIR/TMDL artifacts remain in the repository.
- [x] Three report pages and 62 visual containers verified.
- [x] Twelve measures and ten relationships verified.
- [x] PBIR validation completed with zero errors and zero warnings.
- [x] README, methodology, decision log, data dictionary, source mapping, and reproduction notes added.
- [x] Verified BigQuery validation SQL included.
- [x] Local backups, Power BI cache, credentials, and temporary output excluded by `.gitignore`.
- [x] No secrets detected in publication files.
- [x] No GitHub push or publication performed.
- [x] Scoped MIT license added for original repository-authored code and documentation.
- [x] Maven Analytics, SyntheticMass, and Synthea attribution recorded from the official dataset page.
- [x] Public candidate connection identifiers replaced with documented placeholders.

## Requires approval or follow-up

- [ ] Review the complete working-tree diff.
- [x] Add the three approved Desktop screenshots under `docs/screenshots/`.
- [x] Remove the historical semantic-model backup directory from the Git index; local backup files remain ignored and untouched.
- [ ] Confirm screenshots and data-derived baseline values may be redistributed.
- [ ] Confirm the Maven Public Domain designation is sufficient for the intended release.
- [ ] Approve the sanitized non-refreshable candidate as the release artifact.
- [ ] Commit the approved release.
- [ ] Push to GitHub only after approval.

## Reproduction blocker

The repository does not include source rows, credentials, source-data preparation code, PostgreSQL scripts, or analytical-view definitions. A fresh refresh therefore requires separately authorized access to the configured BigQuery source.
