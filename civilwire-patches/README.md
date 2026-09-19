# CivilWire — correctifs, 19 septembre 2026

Cinq commits indépendants, à appliquer sur le dépôt CivilWire (celui que Lovable
synchronise), pas sur le dépôt de profil GitHub.

```sh
git checkout -b fix/pre-vilnius
git am 000*.patch
```

Chaque patch est autonome : si l'un ne s'applique pas parce que Lovable a modifié
le fichier entre-temps, `git am --skip` passe au suivant sans compromettre les
autres.

Vérifié avant livraison : `tsc --noEmit` sans erreur, `vite build` vert,
10 tests passants, lint stable (36 problèmes contre 38 avant, aucun nouveau).

## Ce que contient chaque patch

**0001 — Supprimer NewsFeed, qui contenait de fausses dépêches**
`NewsFeed.tsx` n'était importé nulle part et absent du bundle, mais il portait un
`MOCK_NEWS` de trois dépêches inventées attribuées à Human Rights Watch, CHRI et
RSF, affichées dès que le fil était vide. Rien n'était en ligne ; ces textes
n'ont pas leur place dans le dépôt d'un fil dont l'argument est la fidélité aux
sources.

**0002 — Fermer les edge functions d'écriture**
La clé anon est un JWT valide publié dans le bundle : `verify_jwt` ne protégeait
rien, et deux fonctions étaient carrément en `verify_jwt = false`.
`scrape-ngo-feeds` acceptait surtout un tableau `ngos` fourni par l'appelant,
avec les URLs à récupérer **et** le nom d'ONG sous lequel classer le résultat —
de quoi injecter une fausse dépêche signée d'une organisation réelle dans le fil
public, sans authentification.

- `_shared/auth.ts` : secret partagé comparé en temps constant + vérification du
  rôle admin/editor sur le JWT de l'appelant. Un `CRON_SECRET` absent refuse au
  lieu de laisser passer.
- `_shared/ngo-directory.ts` : les 151 organisations passent côté serveur.
  L'appelant ne choisit plus qu'une fenêtre `offset`/`limit`.
- Bouton « Refresh » masqué pour le public (chaque appui coûte du Firecrawl et
  des crédits IA).

**0003 — Ne plus fabriquer les dates de publication**
`published_date` valait `new Date()`, l'instant du scraping. Un rapport de 2023
s'affichait daté du jour, et `/cite` produisait des citations académiques
portant cette date inventée. On lit désormais les métadonnées de la page ; si
elle n'indique aucune date, le champ reste `null`. Neuf tests couvrent la
régression.

**0004 — Déduplication en base et planification versionnée**
La déduplication reposait sur une lecture plafonnée à 1000 lignes par PostgREST :
au-delà, les doublons passaient. Contrainte `UNIQUE (source_url)` + upsert.
Et aucune tâche planifiée n'existait dans le code : la migration la définit,
en lisant ses secrets dans Vault.

**0005 — Réparer la navigation et la barre de filtres**
La recherche et les entrées Regions / Themes / NGO Directory ne faisaient rien
sur 9 pages sur 10 (ancres absentes hors accueil). La barre de filtres collait à
`top-[88px]` sous un header de 134 px : invisible au scroll. Le header publie
maintenant sa hauteur mesurée en variable CSS.

## Deux choses à faire de ton côté

**1. Créer le secret partagé.** Sans lui, la tâche planifiée sera refusée (c'est
voulu — un secret absent ne doit jamais ouvrir la porte).

Dans l'éditeur SQL Supabase :

```sql
select vault.create_secret('<clé service_role>', 'service_role_key');
select vault.create_secret('<chaîne aléatoire longue>', 'cron_secret');
```

Puis la même chaîne aléatoire en variable `CRON_SECRET` dans
Dashboard → Edge Functions → Secrets.

**2. Vérifier l'état réel de la planification** avant d'appliquer 0004 :

```sql
select jobid, jobname, schedule, active from cron.job;
select status, return_message, start_time
  from cron.job_run_details order by start_time desc limit 20;
```

Si un job créé à la main existe déjà, supprime-le : la migration en crée un
propre nommé `civilwire-daily-scrape`.

## Non traité, et pourquoi

- **La migration `20260601092622`**, qui réécrit `scraped_at` pour simuler de la
  fraîcheur, est déjà appliquée et dans l'historique git. La supprimer maintenant
  ne réécrit pas le passé. C'est une décision qui t'appartient, et elle dépend
  d'abord de la réponse à : ce dépôt est-il public ?
- **Les TL;DR générés par Gemini** restent en place. Le code contredit la phrase
  « AI is used ONLY for translation and classification » du REVIEW-BRIEF : soit
  tu retires la génération, soit tu ajustes la formulation. C'est un choix
  éditorial, pas technique.
- **Bundle de 1 Mo, faux positifs de classification** (l'alias `car` pour la
  République centrafricaine matche « a car bomb ») : sans risque d'ici Vilnius.
