# CivilWire : bandeau WhatsApp et vidéo de recherche

30 septembre 2026

---

## 1. Le bandeau

Deux fichiers, prêts à envoyer :

- `CivilWire_WhatsApp_FR.png`
- `CivilWire_WhatsApp_EN.png`

1080 × 1350 pixels, environ 500 Ko. Ce format 4:5 est le plus haut que WhatsApp
affiche dans une conversation sans le recadrer : la carte arrive entière, le
journaliste la lit sans avoir à l'ouvrir.

Même palette et mêmes caractères que le one-pager, pour que la personne qui
reçoit la carte puis le PDF voie deux fois le même objet.

Ce qu'il y a dessus : la phrase d'ouverture, les trois chiffres (377, 125, 6),
les trois propriétés, l'adresse. Pas de date, pas de mention de Vilnius, pour
que la carte reste utilisable après la semaine prochaine. Vilnius se dit dans le
message, pas dans l'image.

**Deux points pratiques :**

- Envoie-le **en photo**, pas en document. En document, WhatsApp affiche une
  ligne de fichier au lieu de l'image.
- Sur iPhone, l'envoi en photo compresse un peu. C'est sans conséquence à cette
  taille, mais si tu veux la qualité pleine, coche « Document » pour un seul
  destinataire attentif.

### Le message qui l'accompagne

> Bonjour X,
>
> Je lance CivilWire, un fil d'actualité qui rassemble ce que publient les ONG
> de défense des droits humains : rapports, communiqués, alertes, au même
> endroit, les plus récents en premier, chacun relié à son original.
>
> 377 organisations dans 125 pays pour l'instant, en six langues. C'est en
> version bêta et je le présente à Vilnius la semaine prochaine, à la conférence
> de l'EU DisinfoLab.
>
> civilwire.org
>
> Si tu veux tester : [lien filtré, voir plus bas]
>
> Dis-moi ce qui manque ou ce qui ne va pas, c'est exactement le moment.

---

## 2. Les liens qui filtrent déjà

C'est sans doute plus utile que la vidéo, et c'est disponible tout de suite.

Les filtres du site s'écrivent dans l'adresse. Tu peux donc envoyer un lien qui
ouvre le fil **déjà filtré**, sur le sujet qui intéresse la personne à qui tu
écris. Le journaliste clique et voit le produit en marche, sans rien chercher.

La forme est `civilwire.org/?theme=...&country=...`

Quelques exemples :

| Ce que ça ouvre | Le lien |
| --- | --- |
| Droits LGBTQ+, tous pays | `civilwire.org/?theme=lgbtq-rights` |
| Droits LGBTQ+ en Ouganda | `civilwire.org/?theme=lgbtq-rights&country=uganda` |
| Liberté de la presse au Mexique | `civilwire.org/?theme=press-freedom&country=mexico` |
| Désinformation | `civilwire.org/?theme=disinformation` |
| Justice internationale, Soudan | `civilwire.org/?theme=war-crimes&country=sudan` |
| Défenseurs de la terre, Colombie | `civilwire.org/?theme=land-defenders&country=colombia` |

Le nom du thème s'écrit en minuscules, avec des traits d'union à la place des
espaces : « LGBTQ+ Rights » devient `lgbtq-rights`, « Press Freedom » devient
`press-freedom`. Pareil pour les pays.

**À faire avant d'envoyer :** ouvre le lien toi-même. On est en bêta et la
couverture est inégale ; un thème croisé avec un pays peut ne rien renvoyer.
Choisis la combinaison qui remonte quelque chose, pas celle qui sonne le mieux.

---

## 3. La vidéo

Je ne peux pas la tourner. Depuis l'environnement où je travaille, les
connexions vers `civilwire.org` et vers Supabase sont bloquées par le proxy
(réponse 403). Je n'ai jamais vu le site tourner, donc je ne peux ni le piloter
ni le filmer, et je ne veux pas fabriquer une fausse capture qui ne
ressemblerait pas à l'écran réel.

Voici le plan de tournage. Trente-cinq secondes, une seule prise, rien à monter.

### Avant de lancer l'enregistrement

- Fenêtre du navigateur en plein écran, zoom à 100 %.
- Une fenêtre propre : pas d'autres onglets, pas de barre de favoris, pas de
  notifications. Sur Mac : Réglages, Concentration, activer « Ne pas déranger ».
- Prépare l'adresse `civilwire.org` déjà tapée et la page chargée, puis
  recharge-la juste avant de commencer pour partir d'un écran neutre.
- Vérifie d'abord, à la main, que la recherche que tu vas faire renvoie bien des
  résultats. Si l'Ouganda ne donne rien, essaie le Kenya, le Nigeria, l'Ouganda,
  le Ghana, le Mexique, la Colombie, le Pérou. Tourne sur celle qui marche.

### Le plan, seconde par seconde

**0 à 4 s. La page d'accueil, immobile.**
Ne touche à rien. On laisse le fil se voir : des dépêches, des noms
d'organisations, des dates. C'est le plan qui dit ce que c'est.

**4 à 10 s. Le filtre thème.**
Clique sur le sélecteur de thèmes. Le panneau s'ouvre sur les familles
(Core Human Rights, Documentation & Investigation, International Courts &
Justice, et les autres). Laisse-le ouvert une seconde : cette liste est un
argument à elle seule. Puis clique sur **LGBTQ+ Rights**.

**10 à 14 s. Le fil se recompose.**
Ne bouge pas la souris. On voit la liste changer.

**14 à 20 s. Le filtre pays.**
Clique sur le sélecteur de pays, tape le nom du pays dans le champ de
recherche du panneau, clique dessus.

**20 à 26 s. Le résultat.**
Le fil est maintenant sur un sujet, dans un pays. Descends lentement, deux
ou trois crans de molette. On doit voir plusieurs organisations différentes :
c'est là que ça devient convaincant, parce que ce n'est pas une seule ONG.

**26 à 32 s. L'original.**
Clique sur une dépêche, puis sur le lien qui mène au document sur le site de
l'organisation. Laisse la page de l'ONG s'afficher deux secondes. C'est la
démonstration de la promesse : rien n'est réécrit, tout renvoie à la source.

**32 à 35 s. Retour.**
Reviens en arrière sur le fil filtré. Fin.

### Comment l'enregistrer

**Sur Mac :** Cmd + Maj + 5, « Enregistrer une partie sélectionnée », cadre la
fenêtre du navigateur sans la barre de menus, Enregistrer. Le fichier arrive sur
le bureau en `.mov`.

**Sur iPhone ou iPad :** Réglages, Centre de contrôle, ajouter
« Enregistrement de l'écran ». Puis depuis le Centre de contrôle. Mais tourne
plutôt sur ordinateur : le site a plus de place pour se montrer.

### Avant d'envoyer

- Un `.mov` de 35 secondes fait souvent 30 à 60 Mo. WhatsApp coupe à 16 Mo.
  Ouvre le fichier dans QuickTime, Fichier, Exporter, 720p : ça descend en
  général sous les 10 Mo.
- Pour LinkedIn, garde la version pleine qualité, pas la version compressée.
- Pas de son. Personne ne regarde une démonstration de trente secondes avec le
  son, et un fond sonore ferait « vidéo promotionnelle » plutôt que
  « démonstration ».

### Ce qu'il ne faut pas montrer

- L'espace d'administration (`/wire`), même une seconde.
- Une recherche qui ne renvoie rien. Si ça arrive pendant la prise, arrête et
  recommence : c'est une prise unique, ça coûte trente secondes.
- Une dépêche dont le titre ou l'organisation est visiblement faux. On est en
  bêta, ça peut arriver ; ne la filme pas.

---

## 4. Ordre d'envoi, ce matin

1. Le post LinkedIn avec la bannière « CV Lawyer ».
2. Les trois courriers, une fois les adresses ajoutées et le one-pager joint.
3. Les WhatsApp aux journalistes : le bandeau, le message, et un lien filtré
   choisi pour chacun selon ce qu'il couvre.
4. La vidéo quand tu l'as tournée. Elle peut partir après, en réponse à ceux
   qui répondent. Elle n'a pas besoin d'être là au lancement.
