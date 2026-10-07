# Projet CinéScope

Victor Agahi, Victor Giroud

## Constats

1. Quand on navigue avec le clavier (touche tab), on ne voit pas où on est sur la page, car le contour de focus a été supprimé dans le CSS.
2. Les films ne sont pas sélectionnables au clavier. Ce sont des `div` avec un clic, donc tab les saute.
3. Le bouton favori affiche seulement une étoile. Un lecteur d'écran ne dit pas de quel film il s'agit ni si le favori est activé.
4. Dans le code HTML, on passe directement à un titre h4 sans h1 ni h2. Il n'y a pas non plus de header, nav ou main.
5. Le champ de recherche n'a qu'un placeholder, pas de vrai label. Le logo est un `div` cliquable et le lien "Informations" ne mène à rien.
6. Les points qui indiquent si une séance est disponible sont rouge et vert, ce qui est difficile à distinguer pour les personnes daltoniennes. En plus, aucun texte n'explique ce qu'ils veulent dire.
7. Les images n'ont pas de texte alternatif (`alt`).

## Ce qu'on a corrigé

- Les titres de films sont maintenant des `button` dans un `h2`, on peut donc les atteindre avec tab et les activer avec Entrée ou Espace.
- Le focus est visible grâce à un contour bleu (`:focus-visible`).
- Le bouton favori a un `aria-label` avec le titre du film et un `aria-pressed` pour dire s'il est activé.
- Structure corrigée avec h1 puis h2, `header`, `nav`, `main`, `footer`, un `label` pour la recherche et un lien "Aller au contenu".
- Les points de disponibilité sont accompagnés d'un texte ("Séance disponible" ou "indisponible"), et les images ont un `alt`.

## Vérifications

- Test au clavier : ordre de tab logique, focus visible partout, Entrée et Espace fonctionnent, pas de piège clavier.
- Test avec axe-core : 0 violation.
