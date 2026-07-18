# Permis d'urbanisme à Bruxelles : Anderlecht le plus lent, Boitsfort le plus rapide

Au printemps dernier, j'ai eu l'incroyable opportunité de participer à Entrepreneur First, l'incubateur de startups basé à Londres. L'expérience a été assez extraordinaire : elle m'a permis de rencontrer de nombreux esprits brillants et d'approfondir ma compréhension de l'innovation. Pour quiconque est curieux de goûter à l'atmosphère de cet environnement entrepreneurial unique, je recommande l'article [Inside Entrepreneur First: a survival guide for the world's most exclusive talent accelerator](https://highleverage.substack.com/p/inside-entrepreneur-first-a-survival).

![Simon chez EF](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/ef_simon.png)

Après trois mois passés dans l'incubateur, je me suis retrouvé sur un chemin inattendu. Malgré tous mes efforts, je n'ai pas réussi à trouver le bon cofondateur avec qui partager une vision commune. J'ai donc fait le choix de rentrer à Bruxelles. Après une période intensive de customer development, de brainstorming et de discussions d'idées, j'avais envie de productivité pragmatique et de construire quelque chose de tangible.

J'ai dirigé mon énergie vers un sujet qui m'intriguait depuis longtemps : le paysage immobilier bruxellois, principalement en raison de mon implication dans plusieurs projets liés à ce domaine. S'occuper d'un bien immobilier à Bruxelles, c'est se confronter aux subtilités de l'urbanisme. Si tu veux rénover un bâtiment, tu dois obtenir un permis d'urbanisme en présentant le projet à la commune concernée pour approbation. Point fondamental : les travaux ne peuvent pas commencer sans ce permis.

Pour faciliter ce processus, Bruxelles a lancé un portail d'exploration des permis, [OpenPermits.brussels](https://openpermits.brussels/), alimenté par une [API publique](https://openpermits.brussels/fr/about). Mais il lui manquait certains éléments que je recherchais. C'est ainsi qu'est né [Urbanex](https://urbanex.be/) : compléter le portail public des permis avec des fonctionnalités avancées, pour enrichir l'expérience de l'utilisateur.

## Un aperçu des délais de délivrance des permis

La procédure de demande de permis prévoit un délai précis dans lequel l'autorité en charge doit communiquer sa décision — c'est ce qu'on appelle le délai de délivrance (lead time). Ayant moi-même récemment introduit une demande de permis de rénovation, je voulais savoir si ces délais étaient respectés.

Une métrique utile pour l'évaluer est l'« écart de délai » : la différence entre la durée prévue et la durée réelle. Le graphique ci-dessous montre la moyenne glissante sur un an de l'écart de délai des permis.

![Moyenne glissante annuelle de l'écart de délai des permis](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/permit_count_and_lt_deviation_over_time.svg)

Quel parcours ! Bruxelles accusait autrefois près d'un an de retard, mais délivre désormais les permis avant même leur échéance. Le volume total de permis introduits est resté assez stable, sauf pendant la période COVID. Cependant, un changement brutal semble s'être produit fin 2020, comme on le voit sur le graphique. Si les communes ont probablement amélioré leurs processus, une autre façon d'éviter de dépasser les échéances est de les allonger. Explorons leur évolution.

![Proportions des délais de délivrance des permis](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/permit_count_expected_lt.svg)

Alors que les principaux délais étaient de 45, 75, 90 et 120 jours jusqu'en 2019, ils sont passés à 75, 90, 160 et 190 jours depuis 2021. La transition a eu lieu en 2020, au même moment que le changement brutal de l'écart de délai moyen. Le gouvernement a vraisemblablement allongé les délais des permis. Les permis qui duraient 45 jours en prennent désormais 75, et ceux qui étaient à l'origine de 120 jours ont été portés à 160 ou 190 jours.

Pour apprécier l'efficacité de chaque commune, j'ai comparé le nombre de jours d'avance sur l'échéance avec lequel elles parvenaient à rendre leur décision. En effet, chacune des 19 communes bruxelloises gère ses propres permis. Pour cette analyse, nous nous concentrerons sur les données de l'année écoulée.

![Nombre moyen de jours d'avance sur l'échéance de la décision, par commune](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/mean_pre_notice_muni.svg)

Il est impressionnant de constater que toutes les communes délivrent leurs permis avant l'échéance. Watermael-Boitsfort, la commune la plus efficace, rend sa décision en moyenne 70 jours avant l'échéance, c'est-à-dire qu'elle enverra en moyenne sa décision de permis plus de deux mois avant la date limite. Il faut toutefois garder à l'esprit que les différents permis ont des délais prévus différents. Décomposons cela selon les délais réglementaires.

![Nombre moyen de jours d'avance sur l'échéance de la décision, par commune et par délai prévu](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/mean_lt_dev_muni_expected_ld.svg)

Ainsi, si tu introduis un permis à 160 jours à Saint-Gilles, tu peux t'attendre à une réponse presque trois mois avant l'échéance. En revanche, s'il s'agit d'un permis à 90 jours à Uccle, il faut compter 3 jours de retard.

## Mon expérience personnelle : l'inspiration derrière Urbanex

Alors pourquoi avoir construit [Urbanex](https://urbanex.be), puisque [OpenPermits](https://openpermits.brussels/) existe ? Tout part d'une expérience personnelle.

### Urbanex est une archive en ligne des permis d'urbanisme

Il y a quelques années, j'ai acheté un studio neuf à Bruxelles. En emménageant, j'ai remarqué que la façade était dépourvue de la végétation prévue. Pour confirmer ce qui était censé figurer sur la façade, j'ai décidé de consulter les plans du bâtiment. Pour retrouver ces plans, j'ai dû :

- Prendre rendez-vous avec la commune, ce qui pouvait prendre jusqu'à 2–3 semaines.
- Me rendre à la maison communale pour rencontrer l'agent qui avait accès aux archives papier du permis, y compris ses plans originaux.
- Consulter les archives, identifier les documents pertinents et les scanner

L'ensemble de la démarche m'a coûté 10 € pour la consultation initiale, puis 15 € supplémentaires par scan. J'ai fini par obtenir deux plans, portant la dépense totale à 40 €. Cet effort a confirmé mon soupçon : la façade devait bien être ornée de végétation.

![Plan de la façade](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/plan_facade.png)

Bien que la voie traditionnelle m'ait finalement fourni l'information dont j'avais besoin, elle était chronophage et quelque peu désuète, d'autant plus que les documents de permis sont généralement soumis par voie électronique de nos jours. Par ailleurs, lorsqu'un permis est introduit, les documents associés passent par une période d'enquête publique, permettant à chacun de les consulter et de donner son avis.

Cependant, une fois cette période de consultation terminée, l'accès à ces documents devient limité, les archives n'existant généralement que sous forme papier à la commune. Si j'avais conservé les plans nécessaires au moment où mon propre appartement passait par cette phase de consultation, la pénible visite à ma commune aurait été inutile.

Cela m'a fait prendre conscience que les documents soumis par voie électronique devraient rester facilement accessibles même après la période d'enquête publique.

![Une liste de documents sur Urbanex](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/urbanex_documents.png)

Pour combler cette lacune, [Urbanex](https://urbanex.be) garantit désormais que ces documents sont facilement disponibles, archivés numériquement, et consultables à tout moment, depuis n'importe où, sans rendez-vous. Naviguer dans l'urbanisme bruxellois vient de devenir beaucoup plus simple.

### Quand l'IA rencontre l'urbanisme

Ensuite, je me suis lancé dans la rénovation de la maison de ma grand-mère : je comptais transformer le grenier en espace habitable, en créant un duplex au dernier étage. Mes architectes m'ont toutefois mis en garde contre les répercussions potentielles de ce type de transformation. De tels changements augmentent considérablement le volume bâti et la densité du quartier, ce qui peut susciter des réserves de la part de la commune, surtout si ce n'est pas exécuté avec soin. Le dilemme auquel j'étais confronté : abandonner mon rêve de duplex ou risquer un refus de permis.

À ce moment-là, j'aurais aimé pouvoir consulter les permis déjà approuvés par la commune, en particulier pour des projets similaires de rehausse de toiture. Avec accès à cette information, j'aurais pu mieux comprendre la position de l'autorité locale sur ce genre de transformations. Chaque demande de permis comporte généralement une brève description de son objet. S'il existait un moyen de filtrer et de rechercher dans ces descriptions, ce serait idéal...

C'est exactement ce que j'ai construit.

![Une recherche par projet sur Urbanex](/img/posts/anderlecht-slowest-boitsfort-fastest-permit-delivery-wise/urbanex_project_ref.png)

En exploitant la puissance de l'intelligence artificielle, j'ai rendu possible pour les utilisateurs de saisir des descriptions dans [Urbanex](https://urbanex.be) et de filtrer les résultats selon leurs besoins particuliers. Imaginons que tu projettes de construire une piscine dans ton jardin : avec Urbanex, tu peux vérifier combien de projets similaires ont été acceptés ou refusés près de chez toi. Cette fonctionnalité offre une meilleure compréhension de la faisabilité de ton projet, et peut te faire gagner du temps et de l'énergie lors de ta demande de permis.

## Un océan d'opportunités

L'aventure de la création d'[Urbanex](https://urbanex.be) a été passionnante. Pour moi, c'est une nouvelle occasion de pratiquer le développement web, avec Next.js cette fois ! Et, au final, de créer l'interface entre les outils d'IA et l'utilisateur. J'ai encore beaucoup d'idées sur la valeur que l'IA peut apporter à cette planification des permis ; j'aspire même, un jour, à concevoir un outil capable de prédire l'issue d'une demande de permis.

J'espère qu'Urbanex te sera aussi utile qu'il l'aurait été pour moi. Tous les retours sont les bienvenus.
