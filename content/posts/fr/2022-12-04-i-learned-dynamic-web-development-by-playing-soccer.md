# Comment j'ai appris le développement web dynamique en jouant au foot

Côté sport, je suis un retardataire. Eh oui, je n'ai commencé à pratiquer régulièrement que vers mes 16 ans. Avant ça, je n'y prenais tout simplement aucun plaisir, et je ne peux pas en vouloir à mes parents : ils ont essayé de m'inscrire à un tas d'activités, comme le foot, l'escalade, le tennis de table ou l'escrime. Quoi qu'il en soit, j'adore désormais le sport. J'ai commencé mon parcours en me remettant en forme avec la musculation, puis l'entraînement d'endurance, autrement dit le jogging. Avec le recul, j'ai commencé à aimer l'activité physique une fois que j'ai atteint un niveau de forme minimal, ce qui n'a pas été simple à décrocher. Enfant, je ne poussais pas beaucoup ma zone de confort.

À l'université, j'ai limité mon activité physique aux exercices fondamentaux, ce qui m'a finalement mené au trail, [comme tu le sais peut-être](/fr/blog/le-gr54-en-mode-ultra-leger-185-km-en-5-jours). Après avoir dit adieu à ma vie d'étudiant, je me suis penché sur les sports d'équipe. Le foot en particulier, dont j'étais fan depuis plusieurs années.

## Commencer sur le tard

Je me suis donc mis à chercher des matchs de foot et j'en ai rejoint quelques-uns de fil en aiguille. J'ai vite réalisé que la touche de balle, c'est difficile, et que ça demande de la pratique. Je me retrouvais souvent face à des gars qui jouaient depuis des années, généralement depuis le secondaire, et apporter quelque chose à l'équipe était… compliqué. Heureusement, je pouvais compter sur mon cardio et ma force. Je répétais aussi quelques exercices en solo.

![Entraînement à l'arc-en-ciel](/img/posts/soccer-react/rainbow.jpg)

Au bout d'un moment, j'ai voulu rejoindre un club et j'ai entendu parler d'une ligue amateur bruxelloise, l'ABSSA, pour _Association Belge des Sports du Samedi_. J'ai fini par trouver une équipe avec laquelle jouer, et mon premier réflexe a été de bloquer les horaires de tous les matchs dans mon calendrier, pour être sûr d'être présent et de ne rien planifier d'autre en même temps.

## Scraper le site de l'ABSSA

Le calendrier de la ligue est disponible sur son site web, j'aurais donc pu simplement le parcourir pour encoder tous mes matchs, mais pourquoi le faire à la main quand on peut l'automatiser ? En jouant un peu avec l'outil d'inspection de mon navigateur, j'ai remarqué que le site était scrapable, c'est-à-dire que ses informations pouvaient être extraites. J'ai aussi noté que pour avoir toutes les données sur un match précis, je devrais visiter plusieurs pages : une pour l'heure du match, une pour le nom du terrain et encore une autre pour sa localisation. Pénible à faire manuellement, mais simple à coder.

J'ai donc ouvert mon éditeur préféré et créé un prototype pour :

1. Scraper les infos sur le site
2. Les combiner dans un fichier _iCal_ que je pourrais importer dans mon agenda

J'ai rapidement obtenu un résultat convenable avec Python et quelques bibliothèques. Cet outil a démarré comme un _Jupyter Notebook_, puis est passé à des classes structurées, avant d'être refactorisé en pipeline de données avec _Kedro_. Ce projet est [open source sur GitHub](https://github.com/simonpicard/abssa-ical).

## Publier ces calendriers

L'avantage d'automatiser un processus, c'est que ça passe à l'échelle. J'avais développé ce générateur de calendrier pour mon équipe, mais je pouvais désormais générer les calendriers de toutes les équipes, puisque la logique était la même. Et il y en a 258. Comment rendre ces calendriers accessibles à tous ? J'aurais pu partager un dossier drive avec tous les fichiers _iCal_, mais l'expérience utilisateur n'aurait pas été terrible et cela aurait limité la portée aux joueurs un minimum à l'aise avec la technologie.

Et si je construisais un petit site web où l'utilisateur pourrait chercher son équipe, voir tous ses matchs et avoir la possibilité de les enregistrer dans son agenda ? Hmm… Si je devais le développer, ça ressemblerait à quelque chose comme ça…

![Une première esquisse de calabssa](/img/posts/soccer-react/calabssa-sketch.png)

## L'apprentissage par projet

Comme je l'ai raconté dans [mon tout premier article de blog](/fr/blog/je-code-depuis-plus-de-15-ans-mais-jamais-en-javascript), j'ai décidé de me lancer dans le développement web, pour ajouter une nouvelle corde à mon arc. Ce blog personnel est un premier pas dans cette direction, mais il est entièrement statique : le contenu de ses pages sera toujours le même, quelles que soient les actions que tu y fais. Pour mon application de partage de calendriers, je voulais que la barre de recherche propose de l'autocomplétion. Ses suggestions dépendraient de ce que l'utilisateur tape. Un site statique n'était donc pas la solution, et c'était l'occasion pour moi d'apprendre une nouvelle techno !

Je m'apprêtais à créer une web app avec du _rendu côté client_ en _JavaScript_. Différents frameworks existent pour ce besoin, et la première étape est de choisir celui que tu vas utiliser. J'aime prendre mes décisions sur base de données et, heureusement pour moi, de grandes enquêtes sur les technologies _JavaScript_ sont menées par le [State of _JavaScript_](https://stateofjs.com/en-us/). Regardons les derniers résultats pour les frameworks front-end :

![Classement de satisfaction des frameworks front-end](/img/posts/soccer-react/front_end_frameworks_experience_ranking.png)

Pour ma première expérience de développement front-end, je voulais maîtriser une technologie standard et bien appréciée. En écartant _Solid_ et _Svelte_, trop récents, _React_ arrive en tête.

Je me suis donc lancé dans l'apprentissage de _React_. J'ai commencé par son [tutoriel](https://reactjs.org/tutorial/tutorial.html) puis j'ai plongé directement dans la création de mon projet. Une semaine plus tard, je suis heureux de partager ma toute première web app dynamique : [calabssa.be](https://calabssa.be/?ref=simonmyway).

![Capture d'écran de CalABSSA](/img/posts/soccer-react/calabssa.png)

Ça ressemble pas mal au design d'origine, non ? Va voir le code sur [GitHub](https://github.com/simonpicard/calabssa.be).

## Bienvenue Twitch !

En me lançant dans mon apprentissage de _React_, je me suis dit que ce serait cool de documenter mon processus d'apprentissage. Comment est-ce que je m'y prendrais pour acquérir une nouvelle compétence technique ? Pour cela, j'ai décidé de diffuser mon écran en direct pendant que je travaillais sur le projet, en réfléchissant à voix haute. Je streame sur [Twitch](https://www.twitch.tv/simonmyway) et c'est fun, n'hésite pas à suivre [ma chaîne](https://www.twitch.tv/simonmyway) car je compte continuer à diffuser ! Ma famille et mes amis constituaient l'essentiel de mon audience, mais quelques inconnus sont aussi passés par là, ce qui a donné lieu à des échanges inattendus.

J'ai commencé par partager mon travail de développement web, mais c'était assez difficile d'expliquer ce que je faisais tout en étant profondément concentré sur la compréhension de la nouvelle technologie. Une fois un premier prototype fonctionnel de ma web app en poche, je suis revenu à la création du calendrier pour l'améliorer. J'ai entièrement streamé sa refonte en pipeline _Kedro_, et le truc cool avec les lives, c'est qu'on obtient un replay, que j'ai assemblé et publié sur YouTube :

[![Développement durable de pipelines de données](/img/posts/soccer-react/kedro_min-overlay.png)](https://www.youtube.com/watch?v=uJE9NGaU_pk)

## Les leçons à retenir

Développer des sites web est passionnant parce que le feedback est immédiat. En effet, dès que tu enregistres dans ton éditeur, ta page web se met à jour et tu vois le résultat en direct. C'est très différent des projets data, ma compétence principale. Pour ceux-ci, le fruit de ton travail est généralement moins tangible car plus orienté recherche. Tu finis avec un nombre, qui pourra au bout du compte avoir un gros impact sur ton business, mais ce n'est pas une web app en direct où chaque ligne correspond à un élément précis à l'écran.

Pour ce projet, j'ai utilisé _React_ avec _Tailwind_ pour gérer la mise en page, le premier s'occupant du _JavaScript_ et le second du _CSS_. L'expérience de développement était agréable parce qu'un seul fichier contient tous les composants d'une page web, à savoir _HTML_, _CSS_ et _JavaScript_. C'est pratique : pas besoin de modifier plusieurs fichiers pour retravailler une page. C'est différent de l'approche que j'ai utilisée pour ce blog personnel, où je m'appuie sur _Express_ et _EJS_ et dois les gérer dans des fichiers séparés.

Un piège de cette boucle de feedback rapide et de ce développement tout-en-un, c'est de modifier organiquement des petits bouts de code à l'infini. Il est en effet très tentant d'ajouter juste une ligne ou de corriger ce petit élément, mais si tu continues à travailler comme ça, tu te retrouves vite avec du code spaghetti. Même pour ma petite app, j'ai passé du temps à la refactoriser en plusieurs modules, ou « composants », pour un logiciel plus durable. Les plus techniques d'entre vous peuvent jeter un œil au diff de [ce commit](https://github.com/simonpicard/calabssa.be/commit/f16f33d2fd3b7c19a27874624868547c03e2acb2).

Si tu veux rejoindre le mouvement du développement web, il est important d'être attentif aux différents mécanismes qui se déroulent simultanément. En effet, ta page web sera le résultat de différents rendus (client, serveur) et technologies (_HTML_, _CSS_, _JavaScript_). Donc, pour garder la main sur la dynamique de ton site, assure-toi de savoir quel bout de code est responsable de quoi. Par exemple, j'ai été surpris de découvrir que la plupart des animations de mon site étaient gérées par son _CSS_, tandis que le _JavaScript_ se contentait de mettre à jour une valeur quasi codée en dur.

En apprenant, je t'encourage aussi à ne rien laisser de côté. Quand il y a quelque chose que tu ne comprends pas, il est facile de simplement passer outre et de l'éviter, mais je dirais que prendre le temps de le saisir sera payant à moyen terme. Cela te permettra de construire des fondations solides, qui finiront par rendre ton apprentissage exponentiel.

Et tout ça grâce au foot ! C'est un bel exemple d'apprentissage par projet, c'est-à-dire une méthode pédagogique dans laquelle les étudiants apprennent en s'impliquant activement dans des projets réels et qui ont du sens pour eux. Je crois que cette approche est la plus efficace : trouve quelque chose que tu as envie de faire, et fais-le. Ce sera plus efficace que de mémoriser des concepts théoriques ou de plancher sur des devoirs déconnectés de ta réalité.

À bientôt !
