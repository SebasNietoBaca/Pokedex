import React from 'react';
import './PokemonDetails.css';

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <div className="pokemon-details">
        <div className="no-selection">
          <h2>Selecciona un Pokémon</h2>
          <p>Haz clic en un Pokémon de la lista para ver sus detalles</p>
        </div>
      </div>
    );
  }

  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[type] || '#777';
  };

  return (
    <div className="pokemon-details">
      <div className="details-header">
        <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <p className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</p>
      </div>
      
      <div className="details-image">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name}
        />
      </div>

      <div className="details-types">
        {pokemon.types.map(typeInfo => (
          <span 
            key={typeInfo.type.name}
            className="type-badge"
            style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </div>

      <div className="details-stats">
        <h3>Stats</h3>
        {pokemon.stats.map(stat => (
          <div key={stat.stat.name} className="stat-row">
            <span className="stat-name">
              {stat.stat.name.replace('-', ' ')}:
            </span>
            <span className="stat-value">{stat.base_stat}</span>
            <div className="stat-bar">
              <div 
                className="stat-bar-fill"
                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="details-info">
        <div className="info-row">
          <span className="info-label">Altura:</span>
          <span className="info-value">{(pokemon.height / 10).toFixed(1)} m</span>
        </div>
        <div className="info-row">
          <span className="info-label">Peso:</span>
          <span className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
        </div>
        <div className="info-row">
          <span className="info-label">Habilidades:</span>
          <span className="info-value">
            {pokemon.abilities.map(ability => ability.ability.name).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;