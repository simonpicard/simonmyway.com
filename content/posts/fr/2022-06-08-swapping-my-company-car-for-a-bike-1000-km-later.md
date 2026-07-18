# J'ai troqué ma voiture de société contre un vélo : bilan après 1000 km

Qui dit nouveau job, dit nouveau _package_, et un aspect important dudit package, c'est la mobilité.

En Belgique, pour des raisons historiques, offrir une voiture de société à ses employés est fiscalement intéressant pour les employeurs. Concrètement, pour un coût donné, une entreprise peut prendre une voiture en leasing pour son personnel, ce qui rapporte plus au travailleur que son équivalent en cash. Bien sûr, tout dépend des préférences de chacun, mais beaucoup d'entreprises standardisent leur package et y incluent une voiture parmi les avantages classiques, en partant du principe que ça comptera pour la majorité. Même si cette voiture est censée avoir une justification professionnelle, l'employé peut aussi en profiter à titre privé.

En rejoignant une startup comme premier employé, personne n'avait fait ce genre de suppositions, et j'ai eu la chance de composer mon package sur mesure.

## Alors, ai-je besoin d'une voiture ou pas ?

Comme pour beaucoup de décisions que je prends, je commence généralement par définir et structurer _le besoin_, sans doute une habitude héritée de mon passé de consultant. Ici, c'était plutôt simple : il suffisait de regarder ce qu'était mon usage privé de la voiture. Ça se résume à deux grands cas :

1. Partir en vacances
2. Faire les courses

Vivant dans une ville dense, j'ai l'habitude de me déplacer en mobilité douce pour les petits trajets. En vérité, je déteste personnellement me déplacer en voiture quand ça implique de subir le trafic et d'enchaîner les arrêts-redémarrages. Je remarque aussi souvent que la voiture est plus lente que les vélos ou trottinettes électriques en libre-service, une fois le temps de stationnement compté. Enfin, c'est toujours plus simple de rentrer en taxi après quelques verres quand ta voiture t'attend sagement à la maison !

Il était clair que je pouvais trouver des alternatives pour mes deux derniers besoins en voiture. Et heureusement, toute ma famille vit dans la même ville que moi, donc leur rendre visite est aussi faisable en mobilité douce. Beaucoup de mes amis qui ont déménagé à Bruxelles pour les études ou le travail retournent voir leurs proches, et c'est généralement bien plus rapide en voiture qu'en transports en commun.

Du coup, c'est quoi le plan ?

- Déplacements professionnels : vélo ou transports en commun
- Déplacements loisirs : vélo ou trottinette en libre-service
- Courses : vélo avec un peu d'espace de chargement
- Vacances : louer une voiture ou prendre le train
- Tout imprévu : louer une voiture

## Un vélo, oui, mais lequel ?

Choisir le vélo comme moyen de transport principal, c'est bien, mais il reste quelques détails à régler. Après réflexion, je suis parti sur :

- Un e-bike, ou vélo à assistance électrique, pour me déplacer vite sans transpirer
- Avec suspension avant, pour encaisser les pavés bruxellois
- Des garde-boue, pour éviter les éclaboussures dans le dos
- Un porte-bagages, pour transporter des sacs supplémentaires, p. ex. pour les courses
- Une transmission manuelle, car je trouve que les transmissions automatiques fluides n'y sont pas encore
- Une batterie amovible, pour pouvoir la recharger n'importe où
- Un cadre adapté à ma taille

Avec de telles exigences, les e-bikes à la mode comme [_Cowboy_](https://us.cowboy.com/) et [_VanMoof_](https://www.vanmoof.com/) étaient disqualifiés, puisqu'ils n'en remplissent pas la moitié. Adieu le cliché du startupeur, crédit à [@loule.blou](https://www.instagram.com/p/CRbBJa_lm66/).

![Un cliché sur le startupeur à vélo Cowboy en ville, par @loule.blou](/img/posts/startupeur-cowboy-en.jpg)

Je me suis alors penché sur la marque [_Canyon_](https://www.canyon.com/), que je lorgnais depuis un moment, notamment le modèle _Endurace_ pour me mettre au vélo de route le week-end. Pour ce vélo du quotidien, le [_Pathlite_](https://www.canyon.com/en-be/electric-bikes/electric-touring-bikes/pathlite-on/) était idéal, à l'exception de son prix, au-dessus de mon budget. Puis j'ai découvert l'existence d'un [outlet](https://www.canyon.com/en-be/outlet-bikes/), qui vend des vélos à prix réduit à cause d'imperfections mineures. Problème : de nouveaux vélos y étaient ajoutés de façon sporadique, sans préavis...

J'ai commencé par consulter cet outlet de temps en temps, mais j'ai vite compris que je devais automatiser cette surveillance. Ce que j'ai fait. J'ai rapidement bricolé un script qui récupère tous les vélos de l'outlet, les scrape, les enregistre dans une table CSV et m'envoie un e-mail quotidien avec les nouveaux vélos correspondant à mes critères de recherche.

![Une table contenant les nouveaux vélos de l'outlet Canyon correspondant à mes critères de recherche](/img/posts/canyon-monitor-table.jpg)

J'ai développé tout ce script en _Python_ et je l'ai déployé sur _Google Cloud Platform_ avec _Cloud Functions, Storage, Pub Sub_ et _Scheduler_, [le code est open source](https://github.com/simonpicard/canyon-outlet-monitor).

Après quelques semaines, le _Canyon_ de mes rêves restait trop cher, même avec une remise allant jusqu'à 10 %. Tu peux d'ailleurs consulter tous les vélos en promo que j'ai scrapés dans [cette table CSV](https://github.com/simonpicard/canyon-outlet-monitor/blob/main/data/canyon_monitor_bikes.csv) si tu veux faire quelques stats. J'ai donc changé mon fusil d'épaule en regardant d'autres marques de vélos. J'ai découvert [_Cube_](https://www.cube.eu/), réputée pour son excellent rapport qualité-prix, dû en partie à de faibles dépenses marketing, comme _OnePlus_ à ses débuts. Leur [_Touring Hybrid One 400_](https://www.cube.eu/2022/e-bikes/city-tour/on-road/touring-hybrid/cube-touring-hybrid-one-400-greynblue/) cochait toutes les cases, prix compris !

## 1000 km plus tard

![1000 km en e-bike](/img/posts/ebike-1000-km.jpg)

J'ai récemment passé le cap des 1000 km avec mon nouveau vélo et, comme je pédale presque quotidiennement depuis plusieurs mois, je me suis dit que j'allais partager un peu de cette sagesse avec toi.

### Équipe-toi contre le mauvais temps

J'ai roulé tout l'hiver et j'ai adoré : il suffit d'avoir le bon équipement. C'est comme le ski en station, tu n'apprécierais pas sans être au chaud et au sec. Alors, que te faut-il ? D'abord, une veste **et un pantalon** de pluie. N'importe lesquels feront l'affaire ; en Europe, tu trouveras des options bon marché chez [_Decathlon_](https://www.decathlon.com/).

Ensuite, je recommande des gants et un legging en mérinos. Les gants empêcheront tes mains de geler à cause du vent, le legging gardera tes jambes au chaud dehors et au frais à l'intérieur, grâce aux propriétés magiques du mérinos. Je prends mon mérinos chez [_IceBreaker_](https://www.icebreaker.com/) parce que c'est ce que _Mike Horn_ utilise et ce que _Reddit_ conseillait.

Prévois aussi une paire de gants imperméables, à enfiler par-dessus tes mérinos quand il pleut. Et enfin, un pare-brise, parce que se prendre des gouttelettes à 25 km/h dans les yeux rend la conduite difficile. Ton pare-brise peut être une paire de lunettes à grande monture ou une casquette.

### Prends une assurance vol pour ton vélo

Si tu envisages de faire tes trajets quotidiens à vélo, tu vis probablement dans une ville dense, ce qui présente de nombreux avantages mais aussi quelques inconvénients, comme des vols plus fréquents. Si ton vélo doit être ton principal moyen de transport, tu dois pouvoir le garer l'esprit tranquille. Avec l'essor des navetteurs à deux roues, les compagnies d'assurance ont commencé à proposer une protection contre le vol de vélo. Pour environ 120 € par an, ton vélo sera intégralement remboursé en cas de vol. Perdre sa monture reste pénible, mais au moins tu en récupéreras une nouvelle sans la repayer.

Attention cependant à bien lire les conditions de couverture. J'ai été surpris d'apprendre que mon vélo serait assuré s'il était attaché à n'importe quel arceau dans la rue, mais pas dans mon jardin privé si je verrouillais seulement la roue au cadre. J'ai dû installer un point fixe spécifique dans ma cour pour respecter les exigences. J'aurais pu attacher mon vélo dans la rue juste devant chez moi, mais je n'avais pas envie de remplir une déclaration de vol tous les deux jours, vu que meuler un cadenas est aujourd'hui l'affaire de quelques minutes.

### Le vélo rend les micro-trajets plus agréables

Depuis que j'ai mon e-bike, je fais beaucoup plus de trajets avec. Avant, je louais des vélos électriques en libre-service pour certains déplacements, mais les cas d'usage étaient limités. Les options en libre-service sont plaisantes mais souvent légèrement inadaptées, p. ex. avec des soucis mécaniques mineurs mais gênants. Comme j'ai choisi le vélo parfaitement adapté à mes besoins, cette contrainte a disparu, et mon usage a explosé.

Aujourd'hui, je le confirme : 25 min de trajet à vélo, c'est agréable ; 25 min en voiture, ça passe ; 25 min en transports en commun, c'est pénible. Je pense être particulièrement réfractaire aux transports en commun parce que j'ai le mal des transports dans les bus ; si je pouvais lire un bon livre dans le métro, ce serait sans doute une autre histoire.

### Si tu te sens en danger, tu l'es

Le partage de la route est encore un chantier en cours, du moins à Bruxelles. Certains conducteurs sont prudents, d'autres non. Donc, si tu penses risquer un accident, c'est que c'est le cas. Pour y faire face, veille à respecter le code de la route : oui, ça veut dire céder la priorité aux voitures même quand tu fonces en descente ou que tu peines en montée. En revanche, prends tes priorités et n'aie pas peur de revendiquer un peu d'espace sur la chaussée. Tu n'es pas censé raser les voitures garées, surtout si la rue est en mauvais état à cet endroit.

Heureusement, les infrastructures cyclables s'améliorent dans les grandes villes européennes, mais ne sous-estime jamais l'ignorance, la distraction ou la mauvaise volonté des automobilistes. Sois toujours prêt à te protéger, p. ex. en freinant si une voiture tourne soudainement et te coupe la route. Même si tu as la priorité, mieux vaut ralentir que percuter. Espère le meilleur, prépare-toi au pire.

Merci de m'avoir lu et à bientôt, p. ex. à la prochaine [Critical Mass](http://www.critical-mass.be/) 🚴.
