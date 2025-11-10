import React from 'react';
import './RegionSelector.css';

const REGIONS = [
  { id: 'kanto', name: 'Kanto', offset: 0, limit: 151, generation: 1 },
  { id: 'johto', name: 'Johto', offset: 151, limit: 100, generation: 2 },
  { id: 'hoenn', name: 'Hoenn', offset: 251, limit: 135, generation: 3 },
  { id: 'sinnoh', name: 'Sinnoh', offset: 386, limit: 107, generation: 4 },
  { id: 'unova', name: 'Unova', offset: 493, limit: 156, generation: 5 },
  { id: 'kalos', name: 'Kalos', offset: 649, limit: 72, generation: 6 },
  { id: 'alola', name: 'Alola', offset: 721, limit: 88, generation: 7 },
  { id: 'galar', name: 'Galar', offset: 809, limit: 89, generation: 8 },
  { id: 'hisui', name: 'Hisui', offset: 898, limit: 7, generation: 8 },
  { id: 'paldea', name: 'Paldea', offset: 905, limit: 110, generation: 9 }
];

const RegionSelector = ({ currentRegion, onRegionChange }) => {
  return (
    <div className="region-selector">
      <h3>Selecciona una región:</h3>
      <div className="region-buttons">
        {REGIONS.map(region => (
          <button
            key={region.id}
            className={`region-btn region-${region.id} ${currentRegion === region.id ? 'active' : ''}`}
            onClick={() => onRegionChange(region.id)}
          >
            <span className="region-name">{region.name}</span>
            <span className="region-gen">Gen {region.generation}</span>
            <span className="region-count">{region.limit} Pokémon</span>
            <span className="region-range">
              #{region.offset + 1} - #{region.offset + region.limit}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegionSelector;