# Enrichment — new decisions found via Legal Data Hunter

Research passes of **2026-07-05** over official national case-law databases, using the Legal Data Hunter MCP and cross-checked against the corpus's 198 cases and 140 judicial decisions.

Machine-readable results:

- [`new-decisions-ldh-2026-07-05.json`](new-decisions-ldh-2026-07-05.json) — **Batch 1 (Europe)**: Légifrance/Judilibre, rechtsprechung-im-internet.de, Juportal, entscheidsuche.ch/BGer, RIS, rechtspraak.nl, SAIJ, Tribunal Constitucional HJ.
- [`new-decisions-ldh-2026-07-05-batch2.json`](new-decisions-ldh-2026-07-05-batch2.json) — **Batch 2 (Americas, Africa, Israel)**: the US ATS/TVPA canon with official opinion texts (Filártiga, Sosa, Samantar/Yousuf, Kadić v. Karadžić, US v. Belfast/Chuckie Taylor, Forti, Xuncax v. Gramajo, Doe v. Exxon, Sarei v. Rio Tinto, Kiobel, Al Shimari), Argentina's CSJN amnesty landmarks (Simón 2005, Arancibia Clavel 2004 — full texts), Guatemala's Constitutional Court amparo line in Ríos Montt, Peru's Tribunal Constitucional Fujimori pardon litigation, South Africa (SALC ConCourt official text; S v Basson), Senegal (the 2001 Habré cassation via Juricaf), Israel (Berenblat kapo appeal; PCATI targeted-killings HCJ), and Colombia (C-080/18 JEP review). Includes per-country coverage notes (what LDH does NOT index: Chilean Sala Penal criminal line, Guatemalan trial judgments, the 2009 Fujimori conviction, the ZA Al-Bashir SCA judgment).

- [`new-decisions-ldh-2026-07-06-batch3-wwii.json`](new-decisions-ldh-2026-07-06-batch3-wwii.json) — **Batch 3 (WWII before national courts)**: the complete French cassation lines in **Barbie** (incl. the 20 Dec 1985 CAH-definition landmark), **Touvier** and **Papon**, plus the probable 1982 **Leguay** arrêt; Germany's modern NS-accessory line — **Gröning** (BGH 3 StR 49/16), **Hanning** (LG Detmold full text), **Furchner** (BGH 2024, Stutthof civilian typist) and the OLG Rostock **Nebenklage** rulings in the Zafke proceedings; Italy's **Priebke** constitutional amnesty ruling and **sentenza 238/2014** (state immunity vs. Nazi-era victims — defying the ICJ); Canada's WWII **denaturalization** route (Baumgartner) and the **Mugesera** Federal Court line; plus corpus decision links for **Astiz** (CSJN extradition 2011) and **Mungwarere** (2017 FC 708). Coverage notes flag what is NOT indexed (Pinochet HL, Eichmann/Demjanjuk appeals, Finta, Polyukhovich, Priebke CSJN 1995).

- [`new-cases-from-langer-articles-2026-07-06.json`](new-cases-from-langer-articles-2026-07-06.json) — **Batch 4 (article cross-references)**: cases cited in Bryce/Johns/Langer (LJIL 2025) and Langer & Eason (EJIL 2019) that the corpus lacks — Soltani, the Spanish RPF-40 indictment, Nkezabera, Martinović, Makitan, Ammar & Hilal, Demjanjuk (US/Israel/Germany), Western Sahara/Polisario — plus precise decision references (Simbikangwa appeal n° 51/2016, Ben Saïd committal, Eichmann Crim. App. 336/61), the **Noury June 2024 prisoner-swap outcome update**, and a Kigali-Garage duplicate check.
- [`new-decisions-ldh-2026-07-06-batch5.json`](new-decisions-ldh-2026-07-06-batch5.json) — **Batch 5**: **Frans van Anraat** (HR 2009, the business-accessory landmark — a major corpus gap), Lithuania's Soviet-genocide pair (**Drėlingas** affirmed / **Vasiliauskas** quashed after Strasbourg, both with official LITEKO texts), Bangladesh's **Azharul Islam** Appellate Division judgment (ICT-BD layer), and coverage reconnaissance for Ukraine, Croatia, Uruguay, the DRC and the not-yet-swept Balkans/Estonia/Hungary veins.

Every entry carries a `confidence` flag — **confirmed** (identity established from the decision text: parties, dates, facts) or **probable** (strong circumstantial match; verify before ingestion, since most European decisions are anonymised).

## What was found

### 1. Official decision texts for existing cases (20 decisions, 13 cases)

The biggest wins — cases whose decisions currently have **no link or only secondary links** in the corpus:

- **Bashar al-Assad arrest warrant / immunity** — official Légifrance text of the Assemblée plénière arrêt of 25 July 2025 (n° 24-84.393, B+R, ECLI:FR:CCASS:2025:CR90685).
- **Ung Boun Hor** — Cass. crim. 21 Jan 2009 (07-88.330) on jurisdiction over the 1975 abduction from the French embassy in Phnom Penh; the case had no decisions in the corpus at all.
- **Wenceslas Munyeshyaka** — the final cassation (30 Oct 2019, 18-84.663) closing the 1995 complaint.
- **Callixte Mbarushimana** — Cass. crim. 4 Jan 2011 (10-87.760) on surrender to the ICC.
- **Khaled Nezzar** — full text of the landmark TPF immunity decision (BB.2011.140, 25 July 2012), listed in the corpus with no URL.
- **Ousman Sonko** — BGE 143 IV 316 (published leading judgment on CAH detention, 2017) *(probable — verify)*.
- **Basabosé & Twahirwa** — both the 2020 pre-trial cassation on post-factum residence (P.20.1061.F) and the final 2024 cassation (P.24.0184.F).
- **Bernard Ntuyahaga** — the 2002 arrêt holding ICTR non-confirmation has no res judicata effect *(probable)*.
- **FDLR Murwanashyaka & Musoni** — BGH revision judgment 3 StR 236/17 (20 Dec 2018), a VStGB leading case.
- **Yarmouk anti-tank attack** — BGH 3 StR 306/23 (31 Oct 2023) dismissing the revision.
- **Taha Al-J., Jennifer W., Anwar Raslan, Syrian-official immunity 2024** — the official German registry texts behind the Eurojust/ICCT links currently cited.
- **Venezuelan officials (Argentina)** — SAIJ digests of the April 2024 UJ ruling and the Sept 2024 international capture order of a sitting foreign president *(the latter probable)*.
- **Guus Kouwenhoven** — Dutch original of the final Hoge Raad judgment (corpus has the English version only).

### 2. New case candidates (8)

Prosecutions/decisions not in the corpus at all:

| Candidate | Key decision | Why it matters |
|---|---|---|
| **Félicien Kabuga (France → IRMCT)** | Cass. crim. 30 Sept 2020, 20-83.181 | Arrest of the ICTR's most-wanted fugitive near Paris and surrender to the Mechanism |
| **Yvonne Basebya (Netherlands)** | HR 12 May 2015 (revision); Rb Den Haag 1 Mar 2013 | First Dutch conviction for incitement to genocide |
| **Sharon & Yaron (Belgium)** | Cass. 12 Feb 2003 | The Sabra/Shatila UJ landmark — presence not required; triggered the 2003 repeal |
| **In re Javor (France)** | Cass. crim. 26 Mar 1996, 95-81.527 | The negative landmark: Geneva Conventions not self-executing, no UJ for Bosnia |
| **Disparus d'Oran (France)** | Cass. crim. 14 Nov 1991, 91-82.246 | Early CAH complaint (Algeria 1962), venue doctrine |
| **Falun Gong (Spain)** | STC 227/2007 | Constitutional UJ doctrine (STC 237/2005 line) applied to China |
| **OLG Koblenz Yazidi enslavement** | BGH 3 StR 496/23 (10 July 2025) | Leading holding on genocide by enslavement *(identify defendant)* |
| **OLG Stuttgart humanitarian-operations war crime** | BGH 23 Aug 2018 | Rare conviction for war crimes against humanitarian operations *(identify defendant)* |

### 3. Data correction

- **Jennifer W.** — the corpus dates the BGH partial reversal **2022-03-09**; the official registry (KORE621552023) dates it **2023-03-09**.

### 4. Watchlist

Three references worth tracking (pending OLG Koblenz detention case Dec 2025; Hoge Raad Rwanda-extradition 2023; an unidentified published Cass. crim. arrêt of 7 May 2025, n° 25-81.446) — see the JSON.

## Coverage notes

- **Sweden and Finland**: the LDH-indexed sources (rättspraxis digests, Finlex precedents) do not carry the assize/appeal judgments in Noury, Lundin, Ishaq etc. — the corpus's legal-tools.org links remain the best sources there.
- **Spain**: STC 237/2005 (Guatemala) itself is not indexed in LDH; STC 227/2007 is.
- Anonymisation in German, Belgian, Swiss and Dutch decisions means identity was established from procedural fingerprints (courts, dates, facts); `probable` entries should be verified before ingestion into the Cases/Judicial Decisions sheets.
