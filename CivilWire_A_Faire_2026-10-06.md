# À faire, dans l'ordre. 6 octobre, avant Vilnius

Cinq choses à faire, deux minutes chacune, et un point d'information à la fin.
Rien sur GitHub : les PR 27 et 28 sont
fusionnées, main est à `e211aa6`, il n'y a plus rien à cliquer de ton côté.

Pendant ton rendez-vous j'ai fait l'EFCSN et le panneau Focus en version B. Ce
que j'ai décidé à ta place et comment le défaire, c'est le point 6.

---

## 1. Lovable. Deux minutes, et c'est le seul point bloquant

Le site en ligne n'a aucun des six derniers correctifs. Copie ce message dans
Lovable :

> Récupère main à nouveau (dernier commit `82abf5b`), redéploie les edge
> functions `scrape-ngo-feeds` et `translate-articles`, et republie le site.
>
> Ne modifie aucun code : tout est déjà sur main. Juste pull, deploy, publish.

Ce que ça apporte : les codes `&nbsp;` disparaissent des résumés, le lien
LinkedIn fonctionne, la page périmée en cache se recharge toute seule sur Chrome,
un lecteur anglophone reçoit la traduction des dépêches en arabe, persan et
cyrillique, l'EFCSN apparaît sur la page méthodologie, le panneau Focus porte ses
trois chiffres, la barre de recherche du fil répond à une question posée en
toutes lettres, et les dépêches en ukrainien et en arabe sont traduites sur
toute la page et plus seulement sur les quarante premières. Tant que ce n'est
pas republié, les retours de tes collègues restent vrais sur le site en ligne.

Une fois republié, la question à essayer devant la salle, exactement comme ça :

> Je fais une recherche sur les crimes commis au Soudan contre les personnes
> homosexuelles. Qu'est-ce qu'il y a comme rapport d'ONG ?

Elle affiche sous la barre ce qu'elle a compris, `Soudan` et `LGBTQ+ rights`,
chaque étiquette retirable, puis le nombre de dépêches, le nombre
d'organisations et la période. Rien n'est résumé : ce sont les titres des
organisations, chacun renvoyant à leur document. Si le résultat est vide, la
page dit que c'est un constat sur l'index et pas sur la documentation, et
combien de dépêches elle a sur le Soudan malgré tout. Essaie-la une fois avant
de la montrer : un index en bêta peut très bien n'avoir aucune dépêche sur ce
croisement précis, et il vaut mieux le savoir avant qu'après.

---

## 2. Les trois lettres. Elles sont prêtes, il manque trois gestes par lettre

Dans Gmail, dossier Brouillons, sujet « CivilWire, un fil de dépêches pour les
publications de la société civile ». Trois brouillons : Philippe (HRW), Agnès
(Amnesty), Alexis (FIDH). Version texte simple, sans bandeau, comme tu voulais.

Pour chacune, avant d'envoyer :

1. **Mets l'adresse.** Le champ est vide exprès, pour qu'aucune ne puisse
   partir par accident.
2. **Retape le lien.** Gmail a transformé `civilwire.org` en
   `google.com/url?q=...`, un lien de pistage. Supprime-le et retape
   `civilwire.org` à la main. C'est le genre de détail que ces trois-là
   remarquent.
3. **Joins le one-pager** : `CivilWire_One-Pager_2026-09-27.pdf`.

Le quatrième brouillon, « Un café à Vilnius ? », est pour les journalistes
français sur place. Même chose : adresses, et retape le lien.

---

## 3. Le post LinkedIn. À publier depuis Vilnius

Le lien va **dans le premier commentaire**, pas dans le post : LinkedIn diffuse
moins les posts qui sortent de la plateforme.

Avant de publier, deux précautions. Ouvre `civilwire.org/?country=sudan` et garde
ce conflit seulement si plusieurs organisations remontent. Et dis-le à Diana
Wallis ou à Stephan avant, deux phrases suffisent : tu cites leur Hub comme
complément, pas comme partenariat. Tu es leur invitée, un oui en personne vaut
mieux qu'un post qui les surprend.

**Le post :**

> EU DisinfoLab's Conflict and Crisis Hub gathers what is known about
> disinformation in a conflict.
>
> CivilWire holds the other half: what civil society published from inside it.
> The reports, statements and alerts, newest first, each entry linked to the
> organisation's own document.
>
> Side by side for Sudan: their hub, and the same conflict in CivilWire.
>
> One tells you what is being said. The other tells you what was documented, by
> whom, and where to read it in full.
>
> It is in beta. 377 organisations, 125 countries, six languages.

**Premier commentaire :**

> civilwire.org/?country=sudan
> disinfo.eu/conflict-and-crisis-hub

N'utilise pas leur vert. Tu cites une ressource publique, tu n'annonces pas une
collaboration.

---

## 4. Stephan Mündges, EFCSN. Son agenda demande « What would you like to chat about? »

Si le champ est large :

> CivilWire (civilwire.org), an index of what civil society publishes: 377
> organisations, one chronological feed, every entry linked to the publisher's
> own document. Admission is delegated to networks that publish their own
> criteria, and the EFCSN is the only body in the information integrity field
> that works that way.
>
> I would like to ask whether you would see any objection to a third-party index
> using your verified member list as an admission source. Happy to show you the
> thing in five minutes.

Si c'est une seule ligne :

> I run CivilWire (civilwire.org), an index of civil society publications where
> admission is delegated to networks that publish their own criteria. I would
> like to ask whether the EFCSN would object to a third-party index using your
> verified member list the same way.

---

## 5. La LDH. Une requête, trente secondes

La France ne remonte que quatre entrées, et tu as raison, la Ligue des droits de
l'Homme publie plus que ça. Je ne peux pas atteindre Supabase depuis ici. Dans
Supabase, SQL Editor, colle :

```sql
select ngo, website, rss_url, last_error
  from wire_sources
 where ngo ilike '%ligue des droits%'
    or website ilike '%ldh-france%';
```

Envoie-moi ce que ça rend. Zéro ligne veut dire qu'elle n'est pas collectée du
tout. Une ligne avec un `last_error` veut dire que son flux casse. Les deux se
réparent, mais pas de la même façon.

Si tu préfères, demande-le à Lovable : « exécute cette requête et donne-moi le
résultat ».

---

## 6. Ce que j'ai décidé à ta place

Maquettes de référence :
**https://claude.ai/artifact/DtyxPfYFz72faQNCYFUM3G**

**Le panneau Focus est passé en version B.** Il porte le sujet dans son propre
en-tête et trois chiffres que le fil ne donne pas : dépêches ce mois-ci,
organisations qui en ont parlé, pays concernés. Les chiffres sont comptés sur
tout le thème, pas sur les cent dernières lignes, et s'affichent seulement s'ils
sont calculés : un panneau qui annonce « 0 organisations » parce qu'une requête a
échoué dit le contraire de la vérité.

**Bandeau en teal foncé**, ta couleur d'accent. Pas le vert d'EU DisinfoLab : il
suggère une affiliation que personne n'a validée, et devant cette salle ça se
remarque. Si tu veux changer, c'est une ligne, `HEADER_BAND` dans
`DisinformationFocus.tsx` : `bg-navy-deep` pour le navy du one-pager,
`bg-card border-b-2 border-teal` pour aucun bandeau. Dis-moi le mot, je le fais.

**L'EFCSN est ajouté comme réseau**, avec son code de standards, ses deux
évaluateurs externes, et la condition écrite noir sur blanc : seuls ses membres
vérifiés qui sont à but non lucratif et non gouvernementaux sont repris. C'est
ton arbitrage, pas le leur, donc la page le dit comme tel.

**Ses membres, eux, ne sont pas encore dans l'index**, et c'est volontaire : le
proxy de cet environnement bloque `efcsn.com` et `members.efcsn.com`. Une liste
de membres vérifiés ne se reconstitue pas de mémoire, et le statut juridique de
chacun encore moins. Si tu autorises ces deux domaines dans les réglages réseau
de l'environnement cloud, je lis la liste et je la remplis en quelques minutes.
Sinon, la question à Stephan au point 4 règle la même chose autrement.

---

## Ce qui reste ouvert, pour que tu le saches

- Je n'ai pas vérifié que `archive-dispatches` **réussit**, seulement qu'elle est
  déployée. Les lettres disent que chaque dépêche est archivée chez Internet
  Archive. À vérifier au retour, pas avant de partir.
- Le drapeau « ne pas être traduite » par organisation, promis dans le one-pager,
  n'est pas encore construit.
- La branche distante a été réécrite deux fois dans ce projet. Rien n'a été
  perdu, mais c'est pour ça que la règle tient : j'écris, Lovable déploie. Ne lui
  demande pas de pousser du code.
