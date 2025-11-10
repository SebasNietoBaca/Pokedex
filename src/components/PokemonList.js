import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemons, onSelectPokemon }) => {
  return (
    <div className="pokemon-list">
      <h2>Lista de Pokémon</h2>
      <div className="pokemon-grid">
        {pokemons.map(pokemon => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
            onClick={() => onSelectPokemon(pokemon)}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;