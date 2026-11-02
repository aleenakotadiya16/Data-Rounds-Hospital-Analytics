# Data Dictionary

## `encounters`

| Field | Role | Meaning |
|---|---|---|
| `Id` | Key | Encounter identifier; used for distinct encounter counts. |
| `START` | Date | Encounter start date. |
| `STOP` | Date | Encounter end date. |
| `ENCOUNTERCLASS` | Category | Encounter class used in report breakdowns. |
| `PAYER` | Key | Payer identifier linked to the payer table. |
| `TOTAL_CLAIM_COST` | Amount | Recorded total claim cost. |
| `PAYER_COVERAGE` | Amount | Recorded payer coverage. |

## `inpatient_admission_analysis`

| Field | Role | Meaning |
|---|---|---|
| `admission_id` | Key | Admission episode identifier. |
| `patient_id` | Key | Patient identifier used by the Top 10 visual. |
| `admission_start` | Date | Admission start date. |
| `discharge_time` | Date | Discharge timestamp. |
| `discharge_year` | Category | Discharge year used by readmission analysis. |
| `source_encounter_count` | Count | Number of source encounters contributing to the episode. |
| `los_days` | Amount | Length of stay in days. |
| `days_to_next_admission` | Amount | Days until the next admission where available. |
| `followup_eligible` | Boolean | Whether the episode has the required 30-day observation window. |
| `observed_return_30d` | Boolean | Source-derived observed return indicator. |
| `return_30d_flag` | Integer flag | Derived return flag used by validated measures and filters. |

## Model metadata

The TMDL model also contains the `patients`, `payers`, and Power BI local date-table structures used by relationships and slicers. The source mapping file in `docs/source-mapping.json` records the report-facing field mapping.
