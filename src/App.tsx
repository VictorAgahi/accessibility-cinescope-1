import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

// Nom du binôme affiché sur le projet (livrable du TP).
const BINOME = "Victor Agahi et Victor Giroud";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", time: "18 h 10", available: true, poster: posterAube, alt: "Affiche : ciel violet et soleil doré à l’horizon" },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", time: "19 h 30", available: false, poster: posterMemoire, alt: "Affiche du documentaire La mémoire des murs" },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", time: "21 h 00", available: true, poster: posterOrbite, alt: "Affiche : planète en orbite dans l’espace" },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredFilms = useMemo(
    () => films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <>
      <a className="skip-link" href="#programme">Aller au contenu</a>

      <header className="topbar">
        <button type="button" className="brand" onClick={() => setQuery("")}>CinéScope</button>
        <nav className="menu" aria-label="Navigation principale">
          <a href="#programme">Programme</a>
          <a href="#infos">Informations</a>
        </nav>
      </header>

      <main className="page">
        <h1>Films à l’affiche</h1>
        <p className="intro">Découvrez la programmation de cette semaine.</p>
        <label className="visually-hidden" htmlFor="search">Rechercher un film</label>
        <input
          id="search"
          type="search"
          className="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <section id="programme" aria-label="Programmation" tabIndex={-1}>
          <ul className="film-grid">
            {filteredFilms.map((film) => {
              const isFavorite = favorites.includes(film.id);
              return (
                // Le clic sur toute la carte reste un confort pour la souris ;
                // le clavier et les lecteurs d’écran passent par le bouton du titre.
                <li className="film-card" key={film.id} onClick={() => setSelected(film.title)}>
                  <img src={film.poster} alt={film.alt} />
                  <div className="film-content">
                    <div className={film.available ? "availability available" : "availability unavailable"} aria-hidden="true" />
                    <h2>
                      <button type="button" className="film-select">{film.title}</button>
                    </h2>
                    <p>{film.genre} · {film.time} · {film.available ? "Disponible" : "Indisponible"}</p>
                    <button
                      type="button"
                      className="favorite"
                      aria-pressed={isFavorite}
                      aria-label={`Favori : ${film.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(film.id);
                      }}
                    >
                      <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div role="status">
          {filteredFilms.length === 0 && <p className="selection">Aucun film trouvé.</p>}
          {selected && <p className="selection">Film sélectionné : {selected}</p>}
        </div>
      </main>

      <footer id="infos" className="page infos" tabIndex={-1}>
        <h2>Informations</h2>
        <p>Projet réalisé par {BINOME}.</p>
      </footer>
    </>
  );
}
