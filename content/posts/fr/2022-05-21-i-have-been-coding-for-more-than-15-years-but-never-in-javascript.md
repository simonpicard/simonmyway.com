# Je code depuis plus de 15 ans, mais jamais en JavaScript

En tant qu'informaticien de longue date, je sais que le domaine regorge de sujets à explorer. J'ai commencé mon parcours au début de mes études secondaires, c'est-à-dire vers l'âge de 12 ans, en apprenant à coder en `C++` grâce à un tutoriel en ligne sur [OpenClassrooms](https://openclassrooms.com/en/), anciennement connu sous le nom de "_le SiteDuZero_".

À l'époque, je voulais simplement créer des jeux, après qu'un ami m'a raconté avoir développé une application en ligne de commande où l'utilisateur doit deviner un nombre magique. Ça fonctionnait comme ceci :
1. L'ordinateur génère un nombre aléatoire, le nombre magique
1. L'utilisateur tape un nombre pour tenter de le deviner
1. L'ordinateur indique si le nombre magique est plus grand ou plus petit que la proposition
1. On répète les étapes `2` et `3` jusqu'à ce que l'utilisateur trouve le nombre magique

Passionnant, me diras-tu — et honnêtement, ça l'était. J'y ai appris les bases de la programmation : les variables, les conditions, les boucles, etc. Résoudre des petits problèmes en codant était un défi intellectuel que j'adorais, et que j'adore toujours ! J'imagine que c'est un peu comme résoudre des énigmes ou remplir des mots croisés.

Bref, j'ai ensuite intégré un cursus d'informatique dans mon université locale, pour finalement décrocher un Master orienté IA et optimisation.

## Mais...

Même si j'y ai appris énormément de concepts passionnants, j'ai toujours eu le sentiment qu'il me manquait une compétence bien précise en informatique, et pas des moindres. Celle qui permet d'interagir directement avec les utilisateurs finaux et de présenter tous tes super résultats. Tu l'as deviné, je parle du développement web.

Avant l'université, le plus loin que j'étais allé en développement web, c'était de suivre un autre tutoriel du "_SiteDuZero_" sur le `HTML` et le `PHP`, avant de bifurquer vers l'automatisation de jeux auxquels je jouais, avec [`AutoIt`](https://en.wikipedia.org/wiki/AutoIt). Mais ça, c'est une histoire pour une autre fois.

Pendant mes études, j'étais plutôt à l'aise en `Python`, et je me disais donc que développer des sites avec `Django`, un framework web `Python`, serait assez facile. J'avais même une idée : créer une sorte de planning de streamers, où chaque streamer pourrait indiquer quand il compte streamer, et où les abonnés disposeraient d'un agenda combiné des plannings de tous leurs streamers préférés. Malheureusement pour moi, je me suis retrouvé complètement perdu face à tous ces concepts du web, comme l'ORM, le templating ou le routing. J'essayais de brûler trop d'étapes à la fois.

## Le déclic

Il y a quelques mois, au moment où j'écris cet article, j'ai changé de travail. J'ai rejoint une startup belge, [Wequity](https://wequity.app/), dont l'ambition est d'utiliser la finance pour promouvoir l'investissement durable. Cette mission devait se concrétiser par un dashboard _ESG_ (Environnement, Social & Gouvernance), permettant aux utilisateurs finaux de suivre les performances des entreprises sur ces dimensions. Pour y parvenir, nous avons construit un pipeline qui récupère des articles et des publications sur les réseaux sociaux, puis en extrait ceux qui traitent d'_ESG_. Super ! Nous avions ces données, mais nous peinions à les rendre accessibles à nos utilisateurs avec une bonne expérience. Nous avons donc recruté un lead développeur full-stack.

Une fois de plus, quelqu'un d'autre allait pouvoir créer une superbe application web avec des graphiques dynamiques. J'étais impressionné.

En discutant avec mon collègue, il m'a expliqué à quel point on peut devenir rapidement efficace en développement web avec `JavaScript`, surtout avec `Node.JS`. Des outils que je n'avais jamais utilisés, alors que je sais bien qu'ils sont des standards de l'industrie du web.

`JavaScript` traîne parfois une mauvaise réputation, sans que je n'aie jamais vraiment compris pourquoi. Les arguments semblent souvent assez subjectifs, du genre "_c'est un langage moche_" ou "_c'est truffé de pièges_". J'ai décidé qu'il était temps de me faire ma propre opinion ! Et pour cela, j'ai construit ce site en `JavaScript`, tournant sur un serveur `Node.JS`.

## Les débuts

- Hé, je vais créer un site en `JavaScript` !
- Oh, cool, tu vas utiliser quel framework ?
- ... ?

Évidemment, il existe plusieurs façons de construire "_un site en `JavaScript`_". Quand on développe une application web, on rencontre des difficultés auxquelles beaucoup d'autres ont déjà été confrontés avant nous. C'est comme ça que les _frameworks_ sont nés. En gros, c'est une collection de code prêt à l'emploi pour les tâches web classiques. Il existe une multitude de frameworks, tu peux en avoir un aperçu [ici](https://stateofjs.com/).

Mon collègue m'a conseillé de commencer par des frameworks plus simples et m'a recommandé un [cours _Udemy_](https://www.udemy.com/course/nodejs-the-complete-guide/), apparemment une référence absolue. Je le suis donc depuis quelques mois, en apprenant le framework `Express`, utilisé par 81 % des développeurs web en 2021 d'après l'aperçu que j'ai partagé plus haut.

Tu peux suivre ma progression sur ce [dépôt GitHub](https://github.com/simonpicard/nodejs-complete-guide). Arrivé à environ un quart des leçons, je comprends déjà bien mieux le développement web dans son ensemble, et pas seulement `JavaScript` et `Express`. Des concepts qui n'avaient aucun sens pour moi dans `Django` en ont désormais, et j'ai l'impression que je pourrais m'y remettre. Tout cela grâce à l'excellent contenu de l'instructeur, qui explique concrètement comment utiliser ces outils, mais aussi ce qui se passe sous le capot.

Cela dit, je vais rester sur `JavaScript`. Il est très largement utilisé, et je suis convaincu que ce n'est pas un hasard. On m'a dit qu'on peut devenir extrêmement productif en développement web avec `JavaScript`, et c'est justement l'un de mes objectifs.

## Ce projet

Bon, j'apprends `JavaScript`, et maintenant ? Hé, tu te souviens de [ce chouette blog de Duarte](https://duarteocarmo.com?ref=Simon) ? Faisons-en un aussi ! ~~Toute ressemblance est purement fortuite.~~

J'ai rencontré Duarte en rejoignant Wequity : c'est un excellent Machine Learning Engineer, qui donnait un coup de main au projet. Il est aussi blogueur, alors naturellement, je lui ai demandé comment il avait créé son site. Il m'a expliqué qu'il s'agissait en fait d'un site généré statiquement, avec ce qu'on appelle la [Jamstack](https://jamstack.org/).

J'ai décidé de réinventer la roue et de construire quelque chose de similaire, mais en utilisant ce que je suis en train d'apprendre. Bien sûr, ce site ne sera probablement pas des plus efficaces, mais là n'est pas la question. Le but, c'est de pratiquer, de progresser et de partager mon parcours en chemin. N'hésite pas à jeter un œil à mes talents de codeur, puisque j'ai rendu ce site [open source](https://github.com/simonpicard/simonmyway.com).

Ce qui m'amène à la fin de cet article. Alors, à quoi t'attendre ici ? Eh bien, en gros, à tout ce que j'ai envie de partager. Pour le moment, mes centres d'intérêt sont principalement la tech et le sport. J'ai déjà quelques idées d'articles à ce sujet ; en attendant, tu peux déjà regarder [quelques vidéos que j'ai faites](/videos). J'ai aussi l'intention de faire évoluer ce site : peut-être qu'un jour je le transformerai en single page app, ou que j'essaierai les derniers frameworks à la mode.

Merci d'avoir lu cette introduction, et à bientôt !
