-- Run with all rows; no report filters. Both scans use the actual provided schema.
SELECT COUNT(*) AS encounters, COUNT(DISTINCT Id) AS distinct_encounter_ids,
 SUM(TOTAL_CLAIM_COST) AS claims, SUM(PAYER_COVERAGE) AS payer_coverage,
 SUM(TOTAL_CLAIM_COST)-SUM(PAYER_COVERAGE) AS recorded_gap,
 COUNTIF(PAYER_COVERAGE = 0) AS zero_coverage
FROM `YOUR_GCP_PROJECT.YOUR_BIGQUERY_DATASET.encounters`;

SELECT COUNT(*) AS admission_episodes, COUNT(DISTINCT admission_id) AS distinct_admission_ids,
 COUNTIF(followup_eligible) AS eligible,
 COUNTIF(followup_eligible AND observed_return_30d) AS eligible_observed_returns,
 COUNTIF(observed_return_30d) AS all_observed_returns,
 SUM(return_30d_flag) AS sum_return_flags,
 SAFE_DIVIDE(COUNTIF(followup_eligible AND observed_return_30d),COUNTIF(followup_eligible)) AS return_rate,
 COUNTIF(return_30d_flag IS NOT NULL AND return_30d_flag != IF(observed_return_30d,1,0)) AS flag_disagreements
FROM `YOUR_GCP_PROJECT.YOUR_BIGQUERY_DATASET.inpatient_admission_analysis`;
