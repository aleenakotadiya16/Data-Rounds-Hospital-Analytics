# Sanitized Public Release Manifest

## Candidate

- Directory: `HospitalAnalytics_PublicReleaseCandidate`
- Release type: separate sanitized copy; not the validated working project
- Original working project: `HospitalAnalytics_AgentBuild` remains unchanged
- Live BigQuery identifiers: removed from this candidate and replaced with placeholders

## Included

- `HospitalAnalytics.pbip`
- `HospitalAnalytics.Report/`
- `HospitalAnalytics.SemanticModel/`
- `build-report.js`
- `README.md`
- `LICENSE`
- `docs/` methodology, decision log, data dictionary, source mapping, provenance, disclosure notes, checklist, and screenshots
- `sql/validation/Validate_BigQuery.sql`

## Excluded

- Source data rows
- Complete upstream data-preparation/ETL pipeline
- PostgreSQL scripts and analytical-view definitions not found in the working folders
- Credentials, service-account keys, local connection state, caches, and temporary files
- Historical backup projects
- Original private BigQuery project and dataset identifiers

## Disclosure and licensing risks

- The PBIP is structurally valid but not refreshable until BigQuery placeholders are reconfigured.
- Maven Analytics identifies the Hospital Patient Records dataset as SyntheticMass and lists Public Domain; retain attribution to Maven Analytics, SyntheticMass, and Synthea.
- The MIT license applies only to original repository-authored code and documentation. It does not license upstream data, Power BI/Microsoft components, or screenshots.
- Screenshot and data-derived-value redistribution should still be explicitly approved.

## Validation status

- PBIR structural validation completed successfully with zero errors and zero warnings.
- Candidate report structure verified: 3 pages, 12 measures, and 10 relationships.
- All three included screenshots passed PNG signature checks.
- The candidate should be opened only as a separate Desktop instance; do not save it over the working PBIP.

## Approval items

- Approve this sanitized, non-refreshable-until-reconfigured candidate for publication.
- Confirm redistribution of screenshots and data-derived baseline values.
- Confirm the Maven Public Domain designation and retained Maven/SyntheticMass/Synthea attribution meet the intended release requirements.
