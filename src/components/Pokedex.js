import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import PokemonDetails from './PokemonDetails';
import SearchBar from './SearchBar';
import RegionSelector from './RegionSelector';
import './Pokedex.css';

const REGIONS = [
  { id: 'kanto', name: 'Kanto', offset: 0, limit: 151, generation: 1 },
  { id: 'johto', name: 'Johto', offset: 151, limit: 100, generation: 2 },
  { id: 'hoenn', name: 'Hoenn', offset: 251, limit: 135, generation: 3 },
  { id: 'sinnoh', name: 'Sinnoh', offset: 386, limit: 107, generation: 4 },
  { id: 'unova', name: 'Unova', offset: 493, limit: 156, generation: 5 },
  { id: 'kalos', name: 'Kalos', offset: 649, limit: 72, generation: 6 },
  { id: 'alola', name: 'Alola', offset: 721, limit: 88, generation: 7 },
  { id: 'galar', name: 'Galar', offset: 809, limit: 89, generation: 8 }, // Grookey (#810) - Calyrex (#898)
  { id: 'hisui', name: 'Hisui', offset: 898, limit: 7, generation: 8 }, // Wyrdeer (#899) - Enamorus (#905)
  { id: 'paldea', name: 'Paldea', offset: 905, limit: 110, generation: 9 } // Sprigatito (#906) - actual último
];

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentRegion, setCurrentRegion] = useState('kanto');

  // Cargar Pokémon cuando cambia la región
  useEffect(() => {
    fetchPokemonsByRegion(currentRegion);
  }, [currentRegion]);

  const fetchPokemonsByRegion = async (regionId) => {
    setLoading(true);
    try {
      const region = REGIONS.find(r => r.id === regionId);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${region.limit}&offset=${region.offset}`
      );
      
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return pokemonDetail.data;
        })
      );
      setPokemons(pokemonData);
      setSelectedPokemon(null);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
    setLoading(false);
  };

  const searchPokemon = async (name) => {
    if (!name) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      setSelectedPokemon(response.data);
      setSearchTerm('');
    } catch (error) {
      console.error('Pokémon no encontrado:', error);
      alert('Pokémon no encontrado!');
    }
    setLoading(false);
  };

  const handleRegionChange = (regionId) => {
    setCurrentRegion(regionId);
    setSearchTerm('');
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokedex">
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={searchPokemon}
      />
      
      <RegionSelector 
        currentRegion={currentRegion}
        onRegionChange={handleRegionChange}
      />
      
      <div className="pokedex-container">
        <div className="pokemon-list-section">
          {loading ? (
            <div className="loading">Cargando Pokémon de {REGIONS.find(r => r.id === currentRegion).name}...</div>
          ) : (
            <PokemonList 
              pokemons={filteredPokemons}
              onSelectPokemon={setSelectedPokemon}
            />
          )}
        </div>
        
        <div className="pokemon-details-section">
          <PokemonDetails pokemon={selectedPokemon} />
        </div>
      </div>
    </div>
  );
};

export default Pokedex;