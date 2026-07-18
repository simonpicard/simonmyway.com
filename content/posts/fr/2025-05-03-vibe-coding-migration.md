# Vibe coding : migrer ce blog d'Express vers Next.js avec l'aide d'un LLM

Si tu suis mes articles, tu sais que j'ai créé ce site il y a trois ans pour apprendre à programmer en JavaScript.
À l'époque, j'avais suivi un tutoriel Express.js et je l'avais appliqué pour construire ce site.
Bien que fonctionnel, Express.js est relativement dépassé face aux frameworks modernes qui facilitent la vie des développeurs.
J'en ai fait l'expérience directe en construisant [Urbanex](https://www.urbanex.be) avec Next.js et React : l'expérience de développement était bien plus agréable.
Le routing intégré de Next.js, le rendu côté serveur et l'architecture par composants rendent le développement plus fluide et plus intuitif.
De plus, Next.js offre une meilleure navigation et de meilleures performances par défaut, sans configuration supplémentaire ni bibliothèques tierces.
Cela dit, la raison principale qui m'a poussé à migrer ce blog vers Next.js, c'était de pouvoir l'héberger gratuitement sur Vercel, contre les 7 $/mois que je payais sur Heroku pour la version Express.

## Le code assisté par LLM : un vrai game changer

Quand j'ai créé ce site, on était à l'ère de GPT-3, et le code assisté par LLM n'était pas encore répandu, en tout cas pas pour moi ni mes collègues.
Aujourd'hui, c'est une tout autre histoire : j'utilise des LLM au quotidien via Cursor pour coder, et ça a transformé ma façon d'aborder les tâches de développement.
Ma première étape pour migrer le site a été d'ouvrir la fenêtre de prompt et de taper :

```
I want you to convert this whole project into next js + tailwind
```

Avec sa dernière mise à jour, Cursor propose désormais un mode « agentique » d'interaction avec le LLM, qui analyse automatiquement la base de code et ajoute les fichiers pertinents du projet à son contexte.
C'est une amélioration considérable par rapport au copier-coller manuel de code, qui rend le code assisté par LLM (ou le vibe coding ?) beaucoup moins fastidieux.
Le LLM a créé un projet Next.js avec des routes de base et une intégration Tailwind standard.
Voici sa première implémentation de la page blog, qui sert de page d'accueil à ce site :

```js
import React from "react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-4">
        {/* Blog posts will be listed here */}
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </main>
  );
}
```

J'ai donc dû enchaîner avec (oui, fautes de frappe comprises) :

```
now find a way to include all my blog posts, they are MD, display them, also each blog post as a title that should be listed on the index
```

Le LLM m'a suggéré d'installer `npm install gray-matter react-markdown` et a écrit des fonctions utilitaires pour parser mes articles de blog rédigés dans des fichiers markdown statiques.

Pendant qu'il codait, l'agent de Cursor corrigeait souvent les erreurs automatiquement grâce à son intégration avec le linter.
L'agent récupère et traite les problèmes de manière proactive, ce qui est bien plus agréable que de lancer le code à la main, tomber sur des erreurs et devoir les copier-coller pour déboguer.

Comme je faisais tourner le site en local, je profitais d'un aperçu en direct des résultats pendant que l'agent codait.
C'était particulièrement satisfaisant, car je travaille habituellement en data/analytics/ingénierie cloud plutôt qu'en développement frontend, où je n'ai pas ce genre de feedback immédiat.
Avec le développement web, l'impact du LLM est très tangible.

## Les limites et les leçons apprises

Même si je code plus efficacement avec l'aide d'un LLM, je suis bien content de pouvoir comprendre ce qu'il fait pour effectuer des contrôles de qualité.
Par exemple, j'ai rencontré un problème de style et j'ai remarqué que le LLM avait utilisé une version obsolète de Tailwind.
Je l'ai mise à jour manuellement vers la dernière version.
Comme Tailwind 4.0 n'est sorti qu'en début d'année, avec seulement quatre mois d'existence, les LLM n'ont pas beaucoup d'exemples de son implémentation dans leurs données d'entraînement.

Par ailleurs, le LLM avait souvent tendance à corriger et coder avec une vision purement locale.
En tant qu'ingénieur, je sentais quand il s'enfonçait dans un terrier de lapin, en se concentrant sur les symptômes ou en évitant l'abstraction/la modularité nécessaire.
Par exemple, j'ai utilisé ce prompt :

```
analyse the page and see how they all have some kind of title in a first div with some styling (lighter bg) then a main content.
shoud this be refactored so that this styling is defined once? using a comopnent or so?
```

En m'appuyant sur mon expérience avec Next.js, j'ai pu guider le LLM dans la bonne direction, et son résultat était satisfaisant.
Les LLM sont des outils puissants, mais ils donnent le meilleur d'eux-mêmes lorsqu'ils sont associés à l'expertise et à l'intuition humaines.

Mon expérience du code assisté par LLM va au-delà de cette migration, et je peux affirmer avec certitude qu'il n'est pas aussi efficace avec toutes les technologies.
Par exemple, il a beaucoup galéré avec la création de Dockerfiles, en commettant de nombreuses erreurs.
Cela met en lumière un point important : les LLM excellent dans les tâches aux patterns clairs et aux exemples abondants dans leurs données d'entraînement, mais ils peuvent peiner face à des défis techniques plus complexes ou de niche.

## Alors, tout le monde peut vibe coder sa prochaine startup ?

Si c'est une simple web app Next.js, peut-être.
Mais voici ce que j'ai appris de cette expérience :

1.  **Connais tes outils** : comprendre la technologie sous-jacente est crucial.
    Les LLM peuvent t'aider à coder plus vite, mais ils ne remplacent pas les connaissances fondamentales.
2.  **Contrôle qualité** : relis et comprends toujours le code généré par les LLM.
    Ils peuvent faire des erreurs ou suggérer des solutions sous-optimales.
3.  **Développement itératif** : utilise les LLM dans le cadre d'un processus itératif.
    Commence par une implémentation basique, puis affine et améliore-la.
4.  **Expertise métier** : plus tu connais une technologie, mieux tu peux guider le LLM et évaluer ses suggestions.

Cela rejoint mon impression générale sur l'utilité des LLM : ils font ce que je sais déjà faire, et me rendent plus rapide et plus efficace.
S'il y a une erreur, je peux la corriger parce que je comprends les concepts sous-jacents.
Je ne fais pas aveuglément confiance aux LLM au point d'être à l'aise avec des résultats que je ne comprendrais pas faute de compétences.
Peut-être un jour, mais pour l'instant, ce sont mes connaissances en programmation qui rendent les LLM vraiment précieux pour moi.

Au final, je m'estime chanceux d'avoir appris et pratiqué la programmation avant l'ère des LLM.
Ce parcours traditionnel m'a apporté une compréhension profonde des concepts de programmation, des techniques de débogage et de l'architecture des systèmes, sur laquelle je m'appuie au quotidien.
Des années d'expérience pratique m'ont donné l'intuition pour repérer les problèmes potentiels et la capacité de raisonner sur des problèmes complexes à partir des premiers principes.
Cette base me permet d'évaluer de manière critique le code généré par les LLM, d'identifier les problèmes potentiels et de comprendre le « pourquoi » derrière certaines implémentations.
En parallèle, j'ai la chance de travailler pendant cette transition technologique, où je peux m'appuyer sur les LLM pour accélérer mon workflow tout en appliquant mon expertise.
Cette combinaison de connaissances traditionnelles en programmation et d'outils d'IA modernes me rend plus efficace dans mon travail.

Je vois aussi une grande valeur dans l'amélioration de l'UX assistée par LLM, comme le fait Cursor.
J'ai hâte de voir un bon client mail avec un agent LLM intégré, qui gérerait la planification de réunions ou rédigerait des brouillons de réponses pour les emails de corvées !
