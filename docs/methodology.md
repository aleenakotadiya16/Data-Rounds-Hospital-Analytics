# Analytical Methodology

## 1. Stakeholder questions

The report answers four related questions:

- How much hospital activity is recorded, and how does it vary by encounter class and year?
- What recorded claim cost, payer coverage, and coverage gap are associated with that activity?
- How many inpatient admissions are eligible for 30-day observation, and what return rate is observed?
- Which patients and payer groups contribute to the observed financial and readmission patterns?

## 2. Data grain and quality checks

The semantic model contains two analytical source tables:

- `encounters`: encounter-grain records identified by `Id`.
- `inpatient_admission_analysis`: admission-episode records identified by `admission_id`.

Validation checks include row counts, distinct identifier counts, null/zero coverage behavior, duplicate admission IDs, eligibility counts, observed returns, return-flag consistency, and reconciliation of payer and encounter-class totals.

The admission analysis is not treated as encounter-grain data. Admission-level visuals use admission IDs and eligibility filters to avoid duplicate counting.

## 3. SQL investigations

The included SQL uses BigQuery Standard SQL against placeholders for:

```text
YOUR_GCP_PROJECT.YOUR_BIGQUERY_DATASET.encounters
YOUR_GCP_PROJECT.YOUR_BIGQUERY_DATASET.inpatient_admission_analysis
```

It independently checks encounter financial totals and admission eligibility/return totals. Reconfigure the placeholders before execution. No PostgreSQL scripts or analytical-view definition scripts were found in the related working folders.

## 4. Admission eligibility and return definition

- Eligible admission: `followup_eligible = TRUE`.
- Observed 30-day return: eligible admission with `return_30d_flag = 1`.
- Return rate: eligible observed 30-day returns divided by eligible admissions.
- Blank return flags are excluded from the return-status comparison when the admission is not follow-up eligible.

The report describes observed follow-up returns. It does not infer preventability or causality.

## 5. Metric definitions

The authoritative metric definitions are the DAX measures in the TMDL model. Key examples:

- Total Encounters: distinct count of `encounters[Id]`.
- Total Claim Cost: sum of `encounters[TOTAL_CLAIM_COST]`.
- Total Payer Coverage: sum of `encounters[PAYER_COVERAGE]`.
- Recorded Cost-Coverage Gap: claim cost less payer coverage.
- Eligible Admissions: distinct admission count filtered to `followup_eligible = TRUE()`.
- 30-Day Returns: distinct admission count filtered to eligible and `return_30d_flag = 1`.

## 6. Semantic modeling

The model preserves the validated ten relationships, including date-table variations for encounter and admission dates plus patient and payer relationships. Encounter-year slicers use the existing encounter `START` date variation; readmission analysis uses the admission discharge-year field. No relationship was introduced between encounter-level payer/class fields and admission-level records.

## 7. Validation and dashboard

Validation was performed in layers:

1. Source-table SQL checks.
2. Semantic-model measure and relationship inspection.
3. DAX validation against baseline totals and breakdowns.
4. PBIR structural validation with `powerbi-report-author`.
5. Desktop visual inspection of the three report pages.

The final local PBIR validation result was zero errors and zero warnings.
