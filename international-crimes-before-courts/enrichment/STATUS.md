# Enrichment status — what's done, what's missing, what broke

*As of 2026-07-06, after seven research batches. Corpus: 198 → **245 cases**, 140 → **222 decisions**, 2 corrections, 1 outcome update.*

## 1. What was searched

Seven passes over the Legal Data Hunter MCP (official national databases), two academic articles (Bryce/Johns/Langer LJIL 2025; Langer & Eason EJIL 2019), and the BHRRC Corporate Legal Accountability portal. Jurisdictions swept: FR, DE, CH, NL, SE, BE, FI, AT, ES, AR, US, GT, PE, CL, SN, ZA, IL, CO, CA, IT, UK, LT, EE, HU, RS, HR, UA, UY, BD, CD, plus WWII and corporate thematic passes.

## 2. Still missing — cases and decisions

### Probable-but-unverified (in enrichment JSONs, NOT folded — need human verification)
- Simbikangwa procedural arrêt (Cass. 20 June 2012) — defendant identity
- Sonko detention BGE 143 IV 316 — defendant identity
- Ntuyahaga 2002 Belgian cassation — identity
- Jean Leguay 1982 arrêt — identity
- Gröning BVerfG 2017 enforcement ruling — identity
- Zafke Nebenklage rulings (OLG Rostock 2016) — identity
- OLG Koblenz Yazidi enslavement (BGH 3 StR 496/23) — defendant name ("Nadine K."?)
- OLG Stuttgart humanitarian-operations war crime (BGH 2018) — defendant name
- Canada v. Baumgartner (WWII denaturalization) — SS-service specifics
- Argentine Sept 2024 capture order (Maduro?) — defendant scope
- "Kigali Garage Case" — duplicate check vs. Nzabonimana & Ndashyikirwa
- Azharul Islam May 2025 review acquittal — verify the review judgment
- Lafarge Cass. 14 March 2023 (22-83.681) — procedural posture

### Substantive corpus gaps (identified but not yet sourced)
- **Country-of-commission prosecutions** generally thin: Guatemala's trial judgments (Ríos Montt 10 May 2013 sentencia, Sepur Zarco 2016, Molina Theissen 2018, Dos Erres), Peru's 2009 Fujimori conviction text, Chile's Sala Penal criminal *episodios*, Argentina round two (Videla, Mazzeo, ESMA megacausa, Etchecolatz, Von Wernich — retrievable from CSJN sjconsulta), Ethiopia's own Mengistu/Red Terror trials (in absentia conviction 2007), Rwanda's domestic/gacaca layer, Iraqi High Tribunal (Dujail/Anfal), Indonesia's ad hoc human rights court (East Timor), Kosovo/BiH domestic chambers.
- **ICT-BD appellate set**: Sayedee, Mollah, Kamaruzzaman, Nizami, Azad — retrievable from supremecourt.gov.bd the same way Azharul Islam was.
- **UK layer**: Pinochet (HL 1998/1999), Sawoniuk (2000), Zardad appeal, Kumar Lama (2016 acquittal), Belhaj v Straw (UKSC 2017, immunity/act of state), TVIG-era cases — all pre-date or escape the indexed UK source.
- **Canada SCC**: R v. Finta (1994), Mugesera (2005 SCC 40), Munyaneza appeals, Nevsun v. Araya (2020) — link via Lexum/CanLII.
- **Australia**: Polyukhovich v Commonwealth (HCA 1991).
- **Israel**: Eichmann appeal (336/61) and Demjanjuk (347/88) official texts.
- **Spain**: STC 237/2005 (Guatemala) itself; Scilingo SAN/TS texts.
- **Serbia**: map the indexed Kzz RZ docket (1/2023–3/2025) to defendants via HLC/FHP reports; **Croatia**: targeted pass with case numbers (Glavaš I Kž-Us 121/2019, Norac/Ademi); **Bosnia**: Court of BiH Section I not swept.
- **Ukraine**: art. 438 CC verdicts (Shishimarin etc.) — pin reyestr numbers manually from OSCE/ULAG trial-monitoring.
- **Corporate remaining**: Al Shimari/CACI Nov 2024 jury verdict ($42M) post-trial opinions; Lundin trial verdict (Stockholm, pending) and the HD 2021 jurisdiction ruling; Argor-Heraeus (CH, pillage); Kashef v. BNP Paribas (2d Cir. 2019, Sudan); Wiwa v. Shell; apartheid litigation (Balintulo); Jesner official link; Nevsun (SCC).
- **CNDA article 1F exclusion line** (FR) — promising indexed vein, probe interrupted; retry.
- **Victims'-rights civil veins**: Chilean Fisco reparations layer (indexed, pick exemplars); Italian post-238/2014 civil judgments against Germany.

### Data hygiene in the original corpus (site-side)
- Near-duplicate rows: Taha Al-J. ×2, Lina Ishaq ×3, Fabien Neretse/Nereste ×3 (two spellings), Ntuyahaga ×2, Butare Four ×2, Nezzar ×2 (same ID twice), Habré ×3 (deliberate?). Worth a dedup/merge pass with `also_known_as` fields.
- The new `outcome_type` values introduced by the folds (`landmark_ruling`, `transfer`, `removal`, `civil_litigation`, `conviction_annulled`, `fled`, `complaint`, `procedural`, `judgment_for_plaintiffs`, `settlement`, `acquittal_then_conviction`) should be reconciled with the site's controlled vocabulary before ingestion.

## 3. Issues and problems encountered

### Tooling
- **MCP connection instability**: the Legal Data Hunter server repeatedly dropped mid-call; parallel batches of searches reliably killed the stream. Workaround: strictly sequential single calls. Cost: slower passes, several retries.
- **resolve_reference** fails on US reporter citations and on some ECLI forms — keyword `search` with low alpha was the reliable fallback for named cases.
- **Semantic search misses proper names** (van Anraat, Priebke, Glavaš) — fixed by keyword-weighted queries (alpha 0.15–0.2), but only when the document exists in the index at all.
- **BHRRC blocks crawling** (403 + curl timeout) — entry points mapped via web search; per-case profile links must be added manually.
- **CAP `static.case.law` URLs are generic** (not deep links) — Xuncax and a few others need their CourtListener pins.

### Coverage asymmetries in the source (the map of what LDH can and cannot do)
- **France**: cassation only — no cours d'appel, tribunaux correctionnels, cours d'assises (and no official French database of those exists at all). CNDA is the exception worth mining.
- **Sweden/Finland**: precedent digests only — the actual judgments (Noury, Lundin, Ishaq, Arklöv, Sakhanh) stay on legal-tools.org/domstol.se.
- **UK**: index starts ~2001 (no Pinochet); **Canada**: Federal Court only (no SCC); **Australia**: recent only (no HCA 1991).
- **Argentina**: CSJN full texts reach back to ~2004 (no Priebke 1995).
- **Guatemala**: Constitutional Court only; **Peru**: Tribunal Constitucional only; **Chile**: civil reparations layer but not the Sala Penal criminal line; **Uruguay**: unstable session URLs; **DRC**: no military courts; **Hungary**: ECtHR digests only.
- **Anonymisation** (DE, BE, CH, NL, AT, HR, RS, EE, UA): identification only via procedural fingerprints (courts, dates, docket numbers, facts) — hence the confirmed/probable confidence flags throughout; every "probable" needs human sign-off.

### Method notes
- Everything folded into `data/` is **confirmed** (identity established from the decision text); probables live only in `enrichment/*.json`.
- Two data errors found and fixed en route (Jennifer W. BGH date 2022→2023; Noury outcome missing the June 2024 prisoner-swap release) — suggests a systematic date-verification pass against official registries would catch more.

## 4. Suggested order of attack for the next session
1. Verify & fold the 13 probables (highest value per effort).
2. ICT-BD appellate set + Argentina round two (both are "same source, more queries").
3. Serbia Kzz RZ → defendant mapping; Croatia targeted case numbers.
4. CNDA 1F pass (France) — new axis for the site (exclusion jurisprudence).
5. Corporate leftovers (CACI 2024, Kashef v. BNP, Lundin verdict watch).
6. Site-side: dedup pass + controlled-vocabulary reconciliation + BHRRC per-case profile links.
