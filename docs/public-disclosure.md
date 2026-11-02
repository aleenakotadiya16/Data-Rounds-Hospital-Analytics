# Public Disclosure and Attribution Review

## Connection identifiers found

The validated working PBIP points to the following BigQuery location. This public candidate replaces the values with placeholders:

```text
Project: YOUR_GCP_PROJECT
Dataset/schema: YOUR_BIGQUERY_DATASET
Tables: encounters, inpatient_admission_analysis, patients, payers
```

Exact repository locations:

- `HospitalAnalytics.SemanticModel/definition/tables/encounters.tmdl:181-183`
- `HospitalAnalytics.SemanticModel/definition/tables/inpatient_admission_analysis.tmdl:179-181`
- `HospitalAnalytics.SemanticModel/definition/tables/patients.tmdl:191-193`
- `HospitalAnalytics.SemanticModel/definition/tables/payers.tmdl:67-69`
- `sql/validation/Validate_BigQuery.sql:6,15`
- `docs/methodology.md:28-29`

The sanitized candidate contains no original project or dataset identifier. The placeholders are not valid refresh settings until replaced with authorized values.

## Safe redaction proposal

The working PBIP was not changed. In this separate public candidate, identifiers were replaced consistently in:

1. The four TMDL partition expressions.
2. `sql/validation/Validate_BigQuery.sql`.
3. `docs/methodology.md` and any other explanatory references.

The candidate is clearly non-refreshable until a maintainer supplies authorized connection values. The validated working project remains separate with its live configuration intact.

## Dataset attribution and licensing

The official [Maven Analytics Hospital Patient Records page](https://mavenanalytics.io/data-playground/hospital-patient-records) identifies Maven Analytics as distributor, SyntheticMass as the source, describes the dataset as synthetic, and lists the license as Public Domain. The page links [Synthea](https://synthea.mitre.org/) as the source/generator reference.

The repository `LICENSE` covers only original repository-authored code and documentation. It does not assert ownership or grant redistribution rights for upstream data, data-derived report content, Power BI/Microsoft schemas or tools, or screenshots.

## Explicit approval required

- Confirm whether screenshots and data-derived baseline values may be redistributed.
- Confirm that the Maven Public Domain designation is sufficient for the intended redistribution, while retaining attribution.
- Confirm whether the sanitized non-refreshable candidate is the release artifact.
