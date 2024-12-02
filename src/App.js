import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const data = await response.json();

        const detailedPromises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        );
        const details = await Promise.all(detailedPromises);

        setPokemonData(details);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          <span className="text-warning">Pokémon</span> Cards
        </h1>
        <p className="lead text-muted">
          Discover your favorite Pokémon! Explore, collect, and enjoy.
        </p>
        <hr className="w-50 mx-auto" />
      </header>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {pokemonData.map((pokemon) => (
            <div className="col" key={pokemon.id}>
              <div className="card h-100 text-center shadow">
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="card-img-top mx-auto mt-3"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{pokemon.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
