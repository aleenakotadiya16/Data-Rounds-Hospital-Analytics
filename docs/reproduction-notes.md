# Reproduction Notes

## Verified and included

- PBIP/PBIR report definition.
- TMDL semantic model and relationship definitions.
- Deterministic `build-report.js` report-authoring source.
- BigQuery validation SQL.
- Source-to-report field mapping.

## Not included because they were not found or are not safe to publish

- PostgreSQL SQL scripts.
- Analytical `CREATE VIEW` definitions.
- Source-data preparation or ETL scripts.
- Source data rows.
- BigQuery credentials, service-account files, or local connection state.

## Consequence

A maintainer can inspect, validate, and edit the sanitized PBIP locally. Before a data refresh, replace `YOUR_GCP_PROJECT` and `YOUR_BIGQUERY_DATASET` in the four TMDL partition expressions and the validation SQL with authorized values, then configure an authenticated BigQuery connection in Power BI Desktop. The repository still cannot reproduce a fresh data refresh from this repository alone because source rows, credentials, and the complete upstream preparation pipeline are absent. The included SQL is an independent validation reference, not a substitute for missing source-data preparation code.

## Dataset provenance

The dataset was downloaded from [Maven Analytics](https://mavenanalytics.io/data-playground/hospital-patient-records). The official page identifies SyntheticMass as the source, describes the data as synthetic, and lists the license as Public Domain. It links to [Synthea](https://synthea.mitre.org/) as the generator reference.

## Historical source note

The related working folders contained an older `READ_ME.txt` describing an earlier Hospital Readmissions package. It was not used as the authoritative project definition because it references a different package name and earlier validation state.
