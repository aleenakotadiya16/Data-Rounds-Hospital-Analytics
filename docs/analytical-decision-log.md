# Analytical Decision Log

| Decision | Rationale |
|---|---|
| Preserve encounter and admission tables as separate grains | Prevents admission metrics from being duplicated by encounter-level rows. |
| Use distinct encounter IDs for encounter volume | The validated measure is `DISTINCTCOUNT(encounters[Id])`. |
| Use distinct admission IDs for admission metrics | Admission episodes are the unit of readmission analysis. |
| Define eligible admissions with `followup_eligible = TRUE()` | The 30-day denominator must contain only observable follow-up episodes. |
| Define observed returns with `return_30d_flag = 1` within the eligible population | Keeps the numerator aligned with the validated return-rate definition. |
| Exclude blank return status from the LOS comparison | The audit identified two ineligible admissions with blank flags. |
| Treat recorded gap as claim cost minus recorded coverage | The source does not establish that the gap is patient liability. |
| Keep payer and encounter-class slicers on encounter pages | The admission table has no confirmed payer/class relationship. |
| Use the existing date-table variations | Avoids ambiguous relationships and preserves Power BI date behavior. |
| Preserve the ten existing relationships and twelve measures | The validated semantic model is the analytical contract for the dashboard. |
| Keep Top 10 patient labels as source patient IDs | No invented names or identity transformations were introduced. |

## Known limitations

- Source currency is not specified in the imported model.
- The original cohort-construction SQL was not found in the related working folders.
- The repository does not contain source rows or credentials for a clean-room refresh.
- No PostgreSQL implementation was found; the verified SQL artifact is BigQuery SQL.
