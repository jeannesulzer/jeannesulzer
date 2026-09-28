# CivilWire, récapitulatif hors code

Jeanne Sulzer, Impact Litigation Lab. État au 28 septembre 2026.
#Disinfo2026, Vilnius, 6 au 8 octobre.

Ce document rassemble tout ce qui n'est pas du code : les textes prêts à envoyer,
les analyses, les chiffres de référence, les règles d'écriture et ce qui reste
à faire. Le code vit dans le dépôt GitHub `jeannesulzer/civilwire`.

---

## 1. Ce qu'il te reste à faire

Par ordre d'urgence.

**Recharger Firecrawl.** Le compte a été provisionné par Lovable en ton nom,
il est à sec, et depuis le collecteur horaire ne ramène plus rien. Connexion sur
firecrawl.dev avec l'adresse de ton compte Lovable, plan Standard, code promo
`LOVABLE50` annoncé par Lovable à vérifier au moment de payer. La collecte
quotidienne par RSS continue de fonctionner, c'est la collecte horaire par
recherche qui est morte.

**Faire appliquer la migration des tâches programmées.** Le fichier
`supabase/migrations/20260927140000_schedule_background_jobs_fixed_key.sql` est
sur `main`. Les deux tâches de fond (archivage vers l'Internet Archive,
recherche des sites FIDH manquants) n'existent toujours pas dans `cron.job`.
Vérification après application :

```sql
select jobname, schedule from cron.job order by jobname;
```

Quatre lignes attendues : `civilwire-archive-dispatches` à `7 * * * *`,
`civilwire-daily-feeds` à `15 6 * * *`, `civilwire-news-refresh` à `0 * * * *`,
`civilwire-resolve-fidh-sites` à `11 * * * *`.

**Retirer le mandat FIDH aux six anciennes entrées** (voir section 8).

**Compléter et envoyer les trois courriers.** Les brouillons sont dans Gmail,
sans destinataire. Il manque l'adresse et la pièce jointe.

**Publier le post LinkedIn**, une fois le fil réalimenté.

Après Vilnius : ouvrir le dépôt au public, et automatiser l'application des
migrations par une GitHub Action pour supprimer l'étape « coller du SQL ».

---

## 2. Les chiffres de référence

Vérifiés dans la base le 27 septembre 2026.

| | |
|---|---|
| Organisations dans l'annuaire | 377 |
| Pays | 125 |
| Collectées (site confirmé, actives) | 251 |
| Langues | 6 |

Répartition par réseau d'accréditation :

| Réseau | Organisations |
|---|---|
| FIDH | 196, dont 190 sur la liste 2026 de la Fédération |
| EDRi | 127 |
| Sans réseau | 40 |
| GIAI | 10 |
| IFEX | 3 |
| OMCT | 1 |

Les requêtes qui produisent ces chiffres :

```sql
select count(*)                                               as total_annuaire,
       count(*) filter (where active and website is not null) as collectees,
       count(distinct country)                                as pays
from wire_sources;

select network, count(*)
from wire_sources
group by network
order by count(*) desc;
```

L'écart entre 377 et 251 va se combler seul une fois la recherche de sites
programmée : 124 ligues FIDH sont dans l'annuaire sans adresse de publication
confirmée. Le chiffre de 251 est donc sous-estimé, jamais surestimé.

---

## 3. Le one-pager

Version du 27 septembre, `CivilWire_One-Pager_2026-09-27.pdf`.
Artboard : https://claude.ai/artifact/Mxo2AgRQ1PZRyZopVppqcM

Contenu intégral, dans l'ordre de la page.

**Bandeau.** A wire service for civil society. CIVIL WIRE. civilwire.org, free
to read, no account needed. A project of Impact Litigation LAB. Now in beta.

**Phrase d'ouverture.** CivilWire is a news wire for civil society: the reports,
statements and alerts that non-governmental organisations publish, in one place,
newest first, each linked to the original.

**Trois chiffres.** 377 organisations, 125 countries, 6 languages.

**What comes through**, en cinq catégories :

- *Bodily integrity* : Torture & ill-treatment, Arbitrary detention, Enforced
  disappearances, Extrajudicial killings, Sexual violence, Death penalty
- *Civic space* : Press freedom, Civil society space, Political prisoners,
  Rule of law, LGBTQ+ rights, Forced displacement
- *International justice* : War crimes, Crimes against humanity, Universal
  jurisdiction, International justice, Reparations, Strategic litigation
- *Land, labour, climate* : Business & human rights, Labour rights, Land &
  property rights, Indigenous peoples, Environmental rights, Climate justice
- *Information* : Disinformation, Digital evidence, OSINT

**Quatre caractéristiques.**

- *Civil society only.* International, national and specialist NGOs. Human
  rights organisations above all, and the subjects around them. Each admitted by
  a network that publishes its own criteria.
- *Nothing rewritten.* Every entry points to the document on the publisher's own
  site. No summaries, no editorial ranking; the order is chronological.
- *Citable, and kept.* Each dispatch carries a permanent reference and a copy in
  the Internet Archive, so a citation resolves even if the site is gone.
- *Six languages.* English, French, العربية, Español, فارسی, Українська.
  Right-to-left is native. Translations are labelled as such and the original is
  one click away.

**Pied de page.** In beta : coverage is uneven and the list is still growing.
Tell us if an entry is wrong, or if you would rather not appear. Full method at
civilwire.org/methodology. Contact : contact@impactlitigationlab.org.

Ce que le one-pager ne dit volontairement pas : aucun nom d'organisation, aucun
nom de réseau. Ces éléments sont sur la page méthodologie du site, pour qui veut
le détail.

---

## 4. Les trois courriers

En français, parce qu'Alexis, Agnès et Philippe sont francophones. Brouillons
déjà créés dans Gmail, sans destinataire. Structure demandée : objectif, pitch
de politique publique et argument du manque comblé, méthodologie, puis l'idée du
fil, et une réponse anticipée sur l'IA.

### 4.1 Alexis Deswaef, FIDH

**Objet :** CivilWire, un fil de dépêches pour les publications de la société civile

Cher Alexis,

Je t'écris pour t'informer d'un projet que j'ai lancé cette année et qui, je
l'espère, pourra être utile à la FIDH et à ses ligues.

CivilWire (civilwire.org) rassemble en un seul endroit, par ordre chronologique,
ce que publient les organisations de la société civile : rapports, communiqués,
alertes. Chaque entrée renvoie au document d'origine, sur le site de
l'organisation qui l'a produit. Rien n'est reproduit, rien n'est réécrit :
l'index signale et renvoie.

Le constat de départ est simple. La désinformation circule plus vite que la
documentation qui la contredit ; l'écart n'est pas un écart d'exactitude mais de
vitesse et d'accessibilité. Au même moment l'espace civique se referme :
législations sur les « agents de l'étranger », radiations, retraits de
financement, procédures-bâillons. Et lorsqu'une organisation ferme, ses archives
ferment avec elle. Les rapports cessent d'être citables au moment précis où ils
deviennent nécessaires. Les États, les organisations intergouvernementales et
les agences de presse disposent chacun de leurs canaux de diffusion ; la
production documentaire de la société civile, elle, reste dispersée sur
plusieurs centaines de sites, sans point d'entrée commun, et pour l'essentiel en
anglais. C'est cet espace que CivilWire occupe : ni un média, ni une base de
données savante. Un fil.

La méthode est le point sur lequel je tiens à être la plus précise, parce que
c'est le plus sensible. CivilWire n'évalue pas les organisations une à une : une
organisation figure dans l'index parce qu'un réseau de la société civile qui
publie ses propres critères d'admission l'a admise. Le jugement est délégué à
ces réseaux plutôt qu'exercé par moi.

L'index compte aujourd'hui 377 organisations dans 125 pays. Il est construit à
partir de certains réseaux seulement : la FIDH, EDRi, IFEX, l'OMCT, la Coalition
pour la CPI et la Global Initiative Against Impunity. La totalité des
organisations membres de la FIDH y figure désormais : cent quatre-vingt-dix
ligues dans cent dix-sept pays. Les membres de la Coalition, pas encore. La
collecte porte sur 251 des 377 ; les autres sont répertoriées le temps que leur
adresse de publication soit confirmée, pour l'essentiel de petites organisations
nationales dont la liste de la Fédération ne donne pas le site. Les sources sont
ajoutées à la main, jamais automatiquement. Une inclusion peut être contestée ;
toute organisation peut demander à être retirée sans avoir à motiver sa demande,
ou à ne pas être traduite, auquel cas seuls ses propres mots apparaissent.

Concrètement : six langues (français, anglais, arabe, espagnol, persan,
ukrainien), l'écriture de droite à gauche traitée nativement, un identifiant de
citation permanent pour chaque dépêche de sorte qu'un rapport reste
référençable, et une copie déposée auprès de l'Internet Archive pour que la
référence survive à la disparition du site qui l'héberge.

Je voulais t'informer de l'existence de l'instrument, dans l'espoir qu'il soit
utile à la FIDH, et ajouter que si la Fédération souhaitait un jour s'en servir
autrement, pour la diffusion sous embargo d'un rapport par exemple,
l'architecture s'y prête.

Un mot sur l'intelligence artificielle, puisque la question viendra. Aucun texte
de l'index n'est écrit par une machine. Le classement par pays et par thème est
de la correspondance de mots-clés : pas de modèle de langage, et chaque
étiquette est traçable jusqu'au terme qui l'a produite. Un modèle de langage
n'assure qu'une seule fonction, la traduction, et toute dépêche traduite est
signalée comme telle, l'original restant à un clic. Il n'y a ni résumé
automatique, ni hiérarchisation algorithmique, ni sélection éditoriale : l'ordre
est chronologique. La traduction automatique est faillible : c'est précisément
pourquoi elle est étiquetée et pourquoi l'original prime.

CivilWire est en version bêta et la couverture est inégale. Toute correction est
bienvenue : une entrée erronée, une ligue à ajouter, une organisation à retirer.

Tu trouveras ci-joint une présentation d'une page. Je serais heureuse d'en
parler avec toi.

Bien à toi,

Jeanne

Jeanne Sulzer
Avocate au barreau de Paris, Impact Litigation
Impact Litigation Lab, association loi 1901, qui publie CivilWire
contact@impactlitigationlab.org · civilwire.org

### 4.2 Agnès Callamard, Amnesty International

Texte identique, avec trois changements.

Ouverture : « Chère Agnès, Je t'écris pour t'informer d'un projet que j'ai lancé
cette année et qui, je l'espère, pourra être utile à Amnesty. »

Dans le paragraphe du constat, après « pour l'essentiel en anglais », ajouter :
« Ce n'est pas le problème d'Amnesty, dont les rapports circulent ; c'est celui
des organisations nationales qui documentent à côté de vous et qu'on ne retrouve
pas. »

Avant-dernier paragraphe : « dans l'espoir qu'il soit utile à Amnesty, et
ajouter que si Amnesty souhaitait un jour s'en servir autrement ».

### 4.3 Philippe Bolopion, Human Rights Watch

Mêmes changements, avec Human Rights Watch à la place d'Amnesty.

---

## 5. Le post LinkedIn

En anglais, #Disinfo2026 étant un événement anglophone. À publier une fois
Firecrawl rechargé et le fil réalimenté : un post envoie des gens sur le site
dans l'heure, et un fil figé se contredirait tout seul.

Calendrier conseillé : mardi 30 septembre ou mercredi 1er octobre, en matinée.
Une semaine avant la conférence, quand les participants construisent leur
agenda. Un second post pendant ou après Vilnius vaudra mieux que deux avant.

Forme : joindre le one-pager en document PDF plutôt qu'en image, LinkedIn
l'affiche en liseuse. Répéter le lien civilwire.org en premier commentaire.
Un seul hashtag. Identifier EU DisinfoLab, qui est l'organisateur.

**Texte :**

Fabricated information travels faster than the documentation that contradicts it.

That gap is not one of accuracy. It is one of speed and retrievability. Human
rights organisations publish the evidence, reports, statements and alerts,
across several hundred separate websites, mostly in English, with no common
entry point. At the same time civic space is closing: foreign agent legislation,
deregistration, funding withdrawal, strategic lawsuits. When an organisation
closes, its archive usually closes with it, and its reports stop being citable
at the moment they become necessary.

I built CivilWire to work on the retrievability half of that problem.

It is a wire service for civil society: what non-governmental organisations
publish, in one place, newest first, with a link back to the original document.
Nothing is reproduced and nothing is rewritten. The index points and refers.

**The selection rule is delegated.** CivilWire does not assess organisations one
by one. An organisation is in the index because a civil society network
publishing its own admission criteria has admitted it. 377 organisations in 125
countries, including the FIDH's membership in full: 190 leagues across 117
countries.

**Six languages.** English, French, Arabic, Spanish, Persian, Ukrainian, with
right-to-left handled natively. A dispatch published in Arabic is translated,
labelled as translated, and the original is one click away. No text in the index
is machine-written; a language model performs one function, translation, and
says so each time.

**Permanent citation.** Every dispatch carries a stable citation identifier and
a copy deposited with the Internet Archive, so a reference survives the
disappearance of the site that hosts it.

I will be at #Disinfo2026 in Vilnius, 6 to 8 October. I would be glad to talk
with anyone working on information integrity, documentation or shrinking civic
space, and particularly with organisations that want to check how they are
represented, or would rather not appear at all.

civilwire.org, free to read, no account needed. It is in beta, coverage is
uneven, and corrections are welcome.

CivilWire is published by Impact Litigation Lab, an association under the French
law of 1 July 1901.

---

## 6. Les réseaux d'accréditation

La règle de sélection de CivilWire : une organisation figure dans l'index parce
qu'un réseau qui publie ses propres critères d'admission l'a admise. Le jugement
est délégué à ces réseaux. Voici qui est qui.

**Coalition for the International Criminal Court (CICC).**
https://www.coalitionfortheicc.org/coalition-membership
Une CPI équitable, efficace et indépendante, et des lois nationales qui rendent
justice aux victimes de crimes de guerre, crimes contre l'humanité et génocide.
Plus de 2 500 organisations dans 150 pays. Aucune n'est encore dans l'index au
titre de la Coalition.

**Fédération internationale pour les droits humains (FIDH).**
https://www.fidh.org/en/about-us/What-is-FIDH/our-member-organisations
Droits humains généralistes, par des organisations nationales enracinées dans
leur pays. Membres sur les cinq continents. Membership intégrale portée dans
l'index depuis le 26 septembre 2026.

**Organisation mondiale contre la torture (OMCT), réseau SOS-Torture.**
https://www.omct.org/en/our-network
Organisations dont l'objectif principal ou accessoire est la lutte contre la
torture. Admission sur l'indépendance, le professionnalisme et la crédibilité.
Plus de 200 membres dans plus de 90 pays.

**IFEX.** https://ifex.org/network/
Liberté d'expression : liberté de la presse, censure, accès à l'information,
diffamation pénale, concentration des médias. Plus de 120 membres dans 62 pays.

**European Digital Rights (EDRi).**
https://edri.org/our-work/criteria-for-edri-membership/
Droits civils et humains dans le champ des technologies de l'information. Les
membres doivent être des personnes morales actives dans un État européen et
indépendantes de toute influence commerciale, industrielle ou politique,
mentionnée dans leurs propres statuts. Européen par mandat, ce qui explique que
cette partie du fil soit européenne.

**Climate Action Network International (CAN).**
https://climatenetwork.org/get-involved/join-can/
Organisations à but non lucratif ne représentant pas l'industrie et travaillant
sur le changement climatique. Organisé en nœuds régionaux et nationaux, chacun
avec sa procédure d'admission. Plus de 1 800 organisations dans plus de 130 pays.

**OECD Watch.** https://www.oecdwatch.org/about-us/
Responsabilité des entreprises. Formellement reconnu comme représentant de la
société civile auprès du comité de l'OCDE qui promeut les Principes directeurs
pour les entreprises multinationales. Plus de 140 membres dans plus de 50 pays.

**ESCR-Net.** https://www.escr-net.org/
Droits économiques, sociaux et culturels. Gouverné par un conseil élu par les
membres sur des principes de diversité régionale et de parité. Environ 300
organisations, mouvements et défenseurs dans 80 pays.

**UNCAC Coalition.** https://uncaccoalition.org/about/
Suivi et mise en œuvre de la Convention des Nations unies contre la corruption.
Plus de 400 organisations dans plus de 130 pays.

**FORUM-ASIA.** https://forum-asia.org/
Droits humains en Asie, par une membership enracinée dans la région.
85 organisations membres dans 23 pays.

**AfricanDefenders**, réseau panafricain des défenseurs des droits humains.
https://africandefenders.org/
Protection des défenseurs à travers l'Afrique, par cinq réseaux sous-régionaux.
Un réseau de réseaux ; l'adhésion se tient au niveau sous-régional.

### Un cas à part : la Global Initiative Against Impunity

https://coalitionfortheicc.org/global-initiative-against-impunity

Ce n'est pas un réseau d'accréditation mais un consortium cofinancé par l'Union
européenne. Neuf organisations de la société civile et deux partenaires
associés, sur les crimes internationaux et les violations graves des droits
humains : Civil Rights Defenders, la Coalition pour la CPI, l'ECCHR, Impunity
Watch, la FIDH, Parliamentarians for Global Action, REDRESS, TRIAL
International, Women's Initiatives for Gender Justice, avec l'Auschwitz
Institute et la Commission internationale de juristes.

La différence compte : l'appartenance à un consortium de projet n'est pas une
admission sur critères publiés. C'est un mandat d'une autre nature, et la page
méthodologie du site le dit.

### Réseaux non couverts, à considérer

Les quatre derniers de la liste ci-dessus (CAN, OECD Watch, ESCR-Net, UNCAC
Coalition) et les deux régionaux (FORUM-ASIA, AfricanDefenders) sont documentés
sur la page méthodologie mais n'ont pas encore fourni de membres à l'index. Ils
répondent aux angles morts que tu avais identifiés : climat, entreprises et
droits humains, droits économiques et sociaux, corruption, Asie, Afrique.

---

## 7. Comment une publication remonte, et quand c'est impossible

Deux chemins, et cinq raisons de ne pas y arriver. C'est la partie la plus
souvent mal comprise, et elle est expliquée sur civilwire.org/methodology.

**Chemin 1, le flux.** Le collecteur essaie de découvrir un flux RSS ou Atom sur
le site de l'organisation, à des adresses conventionnelles (`/feed`, `/rss`,
`/rss.xml`, `/feed.xml`, `/atom.xml`, `/en/feed`). Quand il en trouve un, c'est
propre, daté et fiable.

**Chemin 2, la recherche.** Quand il n'y a pas de flux, une requête de recherche
ciblée sur le domaine de l'organisation. Moins fiable, payant, et dépendant d'un
fournisseur tiers.

**Les cinq raisons pour lesquelles ça échoue.**

1. Pas de flux du tout, et un site que la recherche indexe mal.
2. Un site qui publie en PDF sans page d'accueil listant les documents.
3. Un site protégé contre l'automatisation, qui refuse les requêtes.
4. Une organisation qui publie seulement sur les réseaux sociaux.
5. Un site dont l'adresse a changé ou qui a fermé.

C'est pour cela que le one-pager dit que la couverture est inégale plutôt que de
promettre l'exhaustivité. Une organisation peut être dans l'annuaire et ne rien
produire dans le fil : les deux choses sont distinctes et le site les distingue.

---

## 8. La FIDH : l'écart, et ce qui a été fait

**Le problème.** L'annuaire ne portait que dix-huit ligues de la FIDH sur cent
quatre-vingt-dix. Ce n'était pas un choix : c'étaient celles qui se trouvaient
dans le fichier écrit à la main dont l'annuaire est parti. EDRi est arrivé sous
forme de liste, la FIDH non, et c'est toute l'explication du déséquilibre
européen.

**Ce qui a été fait le 26 septembre.** Ta liste 2026 (190 organisations, 117
pays) a été importée dans les deux endroits où elle devait vivre : le fichier
que l'annuaire public affiche, et la table que les collecteurs lisent. Seize
ligues déjà présentes ont été appariées par domaine ou par nom, 174 ajoutées.
La couverture en pays est passée de 49 à 125.

**Ce qui est délibérément prudent.** Sur les 174 ajoutées, 50 seulement avaient
un lien marqué « sûr » dans ton fichier. Les 124 autres sont entrées sans site :
35 avec une URL marquée « à vérifier », 89 sans aucune. Un domaine non vérifié
pour une ligue qui a fermé peut avoir été racheté, et CivilWire classerait alors
son contenu sous le nom de cette ligue. Ces 124 sont donc dans l'annuaire et
hors collecte, le temps qu'une vérification automatique confirme leur adresse.

**Six entrées à corriger.** L'annuaire présente encore comme membres de la FIDH
six organisations qui ne figurent pas sur la liste 2026. Vérification faite
contre ton tableau :

| Organisation | Sur la liste 2026 |
|---|---|
| Memorial Human Rights Centre | non, seul ADC Memorial pour la Russie |
| Belarusian Helsinki Committee | non, seule Viasna pour le Bélarus |
| China Human Rights Defenders | non, seule Human Rights in China |
| FORUM-ASIA | non |
| Conectas Direitos Humanos | non, Justiça Global et le MNDH pour le Brésil |
| Centro Prodh | non, CMDPDH, IDHEAS et la LIMEDDH pour le Mexique |
| Comisión Colombiana de Juristas | non, CPDH, CCAJAR, ILSA et l'OFP |

Memorial et le Comité Helsinki bélarusse ont été liquidés par décision de
justice. Les autres ont quitté la Fédération ou n'en ont jamais été membres.

Le SQL qui corrige, à passer avant d'envoyer le courrier à Alexis :

```sql
update wire_sources
   set network = null
 where network = 'FIDH'
   and name in ('Memorial Human Rights Centre',
                'Belarusian Helsinki Committee',
                'China Human Rights Defenders',
                'Asian Forum for Human Rights and Development',
                'Conectas Direitos Humanos',
                'Centro de Derechos Humanos Miguel Agustín Pro Juárez',
                'Comisión Colombiana de Juristas');
```

Après quoi : FIDH à 190, sans réseau à 46, total toujours 377, et les chiffres
du one-pager correspondront exactement à ce que montre le site.

**Ce qui reste.** L'onglet « Lacunes » de ton tableau relève seize pays que
fidh.org affiche sans nom d'organisation : Mali, Érythrée, Gambie, Bolivie,
Costa Rica, Bhoutan, Népal, Polynésie française, Azerbaïdjan, Bulgarie, Kosovo,
Malte, Pays-Bas, Serbie, Slovaquie, Irak. Et ta note : la FIDH annonce 194
membres dans 120 pays, sa liste en ligne en montre 190. L'écart est chez eux.

---

## 9. Jusqu'où remonte le fil, et pourquoi pas 2010

Le fil ne contient que ce qu'il a collecté depuis sa mise en service. Il ne peut
pas remonter dans le temps, pour trois raisons cumulatives.

La collecte se fait par flux RSS, et un flux RSS ne contient que les dernières
publications, en général entre dix et cinquante. L'historique n'y est pas.

La recherche ne rattrape pas non plus : les moteurs privilégient le récent, et
un rapport de 2012 sur un site refait depuis est souvent introuvable à son
adresse d'origine.

Reconstituer un historique supposerait de parcourir chaque site organisation par
organisation, ce qui est un autre projet, plus lourd, et que la plupart des
sites ne permettent pas.

**Ce qui a été construit à la place.** Chaque dépêche collectée est soumise à
l'Internet Archive et le lien de la capture est conservé. L'index ne remonte pas
dans le passé, mais il empêche le présent de disparaître : une citation reste
résolvable même si le site de l'éditeur ferme. C'est la réponse à la moitié du
problème qui est encore réparable.

---

## 10. Répondre aux critiques

### « C'est de l'IA »

La question viendra à Vilnius, et la réponse est vérifiable dans le code.

Aucun texte de l'index n'est écrit par une machine. Le classement par pays et
par thème est de la correspondance de mots-clés : pas de modèle de langage, et
chaque étiquette est traçable jusqu'au terme qui l'a produite. Un modèle de
langage n'assure qu'une seule fonction, la traduction, et toute dépêche traduite
est signalée comme telle, l'original restant à un clic. Il n'y a ni résumé
automatique, ni hiérarchisation algorithmique, ni sélection éditoriale : l'ordre
est chronologique. La traduction automatique est faillible : c'est précisément
pourquoi elle est étiquetée et pourquoi l'original prime.

**Ce que tu ne peux pas encore affirmer.** Les conditions de rétention des
données du fournisseur de traduction, qui passe par la passerelle Lovable, n'ont
pas été vérifiées. Tant que ce n'est pas établi, ne dis pas « rien n'est utilisé
pour entraîner des modèles ».

### « Qui décide qui est de la société civile ? »

C'est la question sur laquelle le projet est jugé, et la réponse est de ne pas y
répondre soi-même : la sélection est déléguée à des réseaux qui publient leurs
propres critères d'admission. C'est vérifiable, contestable, et ça ne repose pas
sur le jugement d'une personne.

La faiblesse assumée : la règle est appliquée en partie et non en totalité,
certains réseaux ne sont pas encore représentés, et quarante organisations
figurent sans mandat de réseau. Le site le dit.

### « Vous reproduisez notre contenu »

Non. L'index signale et renvoie. Rien n'est reproduit, rien n'est réécrit, et
chaque entrée pointe vers le document sur le site de l'éditeur.

### « On ne veut pas y figurer »

Toute organisation peut demander à être retirée sans avoir à motiver sa demande,
ou à ne pas être traduite, auquel cas seuls ses propres mots apparaissent.

**Attention :** l'option « ne pas être traduite » figure dans le one-pager et
dans les courriers mais n'est pas encore construite. Il faut un drapeau par
organisation. Compte une journée de développement si quelqu'un le demande.

---

## 11. Règles de positionnement et d'écriture

À appliquer à toute production future.

**Impact Litigation** est le cabinet, où se traitent les dossiers syriens,
libyens et devant la CPI. **Impact Litigation Lab** est l'association loi 1901,
qui explore des projets et publie CivilWire. Les deux ne se confondent jamais
dans un document public.

**Le praticien d'abord, l'académique en complément.** L'ordre des mentions :
avocate au barreau de Paris, Impact Litigation ; puis le Lab ; l'enseignement
à Sciences Po et Paris II en dernier.

**Registre :** juridique, média sérieux, ONG sérieuse. Style narratif droits
humains et Nations unies.

**À proscrire :**

- les petites phrases du genre « je préfère te le dire que te laisser le
  découvrir »
- les formules du type « je fais ceci, vous ne le faites pas »
- les tirets cadratins
- les documents qui énumèrent leurs propres lacunes au lieu de dire ce qu'ils
  apportent

**Dans le one-pager :** pas de noms d'organisations, pas de noms de réseaux,
peu de texte. Quelqu'un doit l'ouvrir et comprendre tout de suite.

**Sur les grandes ONG :** pas de justification. Human Rights Watch ou Amnesty
n'ont pas besoin qu'on explique pourquoi elles sont là.

---

## 12. Ce que je n'ai pas pu vérifier

Par honnêteté, les points où je me suis arrêtée faute de pouvoir contrôler.

Le proxy réseau de mes sessions bloque `supabase.co`, `fidh.org`, `archive.org`
et `huridocs.org`. Tous les chiffres de base viennent donc de requêtes que tu as
lancées et collées, et je n'ai jamais pu interroger la base directement.

Les appels à l'API de l'Internet Archive sont écrits d'après la documentation,
sans avoir pu être testés depuis ici.

Les 35 URL marquées « à vérifier » dans ton tableau FIDH n'ont pas été
contrôlées : c'est le travail de la fonction de vérification, qui tourne côté
Supabase et n'a pas encore été programmée.

Le nombre de membres de la FIDH (de l'ordre de 190 selon ton tableau, 194
annoncés par la Fédération) vient de ton fichier, pas d'une consultation du site.

---

## 13. Fichiers et liens

| Quoi | Où |
|---|---|
| One-pager, PDF | `CivilWire_One-Pager_2026-09-27.pdf` |
| One-pager, source | https://claude.ai/artifact/Mxo2AgRQ1PZRyZopVppqcM |
| Courriers, PDF à en-tête | `Courrier_Deswaef-FIDH.pdf`, `Courrier_Callamard-Amnesty.pdf`, `Courrier_Bolopion-HRW.pdf` |
| Courriers, brouillons | Gmail, objet « CivilWire, un fil de dépêches pour les publications de la société civile » |
| Dépôt | https://github.com/jeannesulzer/civilwire |
| Site | https://civilwire.org |
| Méthodologie publique | https://civilwire.org/methodology |
