# International Crimes before Courts — Dataset

Data export from **International Crimes before Courts**, a database of every forum that has adjudicated international crimes — from the post-WWII military tribunals through the UN ad hoc tribunals, the permanent ICC, hybrid and internationalised chambers, and ongoing UN investigative mechanisms — paired with a corpus of national and hybrid prosecutions filterable by jurisdictional basis (MCP).

Export generated: **2026-07-05**.

## Contents

The original export is preserved as [`international-crimes-before-courts-data.xlsx`](international-crimes-before-courts-data.xlsx); the **enriched dataset** (original + confirmed findings from the [`enrichment/`](enrichment/) research passes, folded 2026-07-06) lives in the `data/` files and in [`international-crimes-before-courts-data-v2.xlsx`](international-crimes-before-courts-data-v2.xlsx). Each sheet is available in machine-readable form under [`data/`](data/), as both CSV (original column headers) and JSON (snake_case keys, empty fields omitted).

| Dataset | Rows | Description |
|---|---|---|
| [`cases`](data/cases.csv) | 245 | National & hybrid prosecutions of international crimes — the main corpus |
| [`judicial-decisions`](data/judicial-decisions.csv) | 222 | Individual court decisions (indictments, judgments, appeals, supreme-court rulings, provisional measures, arrest warrants, investigations) nested under each case |
| [`tribunals`](data/tribunals.csv) | 30 | International, hybrid & internationalised courts, Nuremberg → ICC → proposed future courts |
| [`tribunal-links`](data/tribunal-links.csv) | 45 | Curated pointers to each tribunal's own primary case-law database and official sites |
| [`digest-decisions`](data/digest-decisions.csv) | 8 | v2 analytical digest — decisions re-coded along the MCP axes for structural comparison |

## The two layers

**Layer 1 — Tribunals.** A descriptive map of every forum that has ever adjudicated international crimes: the IMT at Nuremberg and the IMTFE at Tokyo, the UN ad hoc tribunals (ICTY, ICTR) and their residual mechanism, the permanent International Criminal Court, the hybrid and internationalised chambers (SCSL, ECCC, STL, KSC, EAC, CAR SCC, …), ongoing UN investigative mechanisms (IIIM, UNITAD, IIMM), and proposed future courts. Each entry records category, status, location, creator, period, subject-matter jurisdiction, positions on head-of-state immunity, trials in absentia and victim participation, legal basis, landmark and key cases, and headline statistics. The `tribunal-links` table points to each tribunal's own primary case-law database — this layer is deliberately descriptive rather than a duplicate of existing jurisprudence databases.

**Layer 2 — National & hybrid jurisprudence.** The denser corpus and the database's real contribution: 245 prosecutions of international crimes before national and hybrid courts across 40+ prosecuting countries, one row per case, with the full metadata used by the interface:

- case name and number, country of commission vs. country of prosecution, court, date and year;
- crimes charged, **jurisdictional basis** (universal, territorial, active/passive personality, …), jurisdiction type (criminal or civil);
- outcome and outcome type, corporate-defendant flag, original language, specialised war-crimes unit where relevant;
- full narrative summary, key legal findings, link to the decision itself;
- NGOs and victims' organisations involved, legal representatives;
- cross-references to TRIAL International, UJAR, the CFJ Tool and Amnesty International (corporate cases additionally reference the [BHRRC Corporate Legal Accountability lawsuit profiles](https://www.business-humanrights.org/en/big-issues/corporate-legal-accountability/case-profiles/)).

The `judicial-decisions` table unpacks the procedural history nested under each case (linked by `Case ID`), each decision carrying its date, type, document number, URL, language and — where available — an English translation link and source.

**Digest (v2).** The `digest-decisions` table re-codes decisions along the MCP axes — crime, forum form, jurisdiction title, qualification path, conventional vehicle, defendant status, immunity, victim participation, in absentia, landmark status — so decisions can be compared structurally rather than narratively.

## File formats

- **CSV** — one file per sheet, UTF-8, original column headers, empty cells as empty strings.
- **JSON** — one array per sheet, keys derived from headers (lowercase, snake_case), fields with no value omitted from each record.
- **XLSX** — `...-data.xlsx` is the untouched original export (198 cases / 140 decisions); `...-data-v2.xlsx` is the enriched fold (245 cases / 222 decisions; Tribunals, Tribunal Links and Digest Decisions unchanged). Probable-but-unverified findings remain in `enrichment/` only.

Multi-value fields (e.g. `Crimes Charged`, `NGOs`) use `;` as an internal separator.
