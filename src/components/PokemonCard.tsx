import { Component, createSignal, createEffect } from 'solid-js';
import type { PokemonBasic, Pokemon } from '../types/pokemon';
import { fetchPokemonDetails, getPokemonIdFromUrl, formatPokemonName, getTypeColor } from '../services/pokemonService';

interface PokemonCardProps {
  pokemon: PokemonBasic;
  onClick: (pokemon: Pokemon) => void;
}

// Colores minimalistas para tipos de Pokemon
const getMinimalTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-100 text-gray-700',
    fire: 'bg-red-50 text-red-600',
    water: 'bg-blue-50 text-blue-600',
    electric: 'bg-yellow-50 text-yellow-600',
    grass: 'bg-green-50 text-green-600',
    ice: 'bg-cyan-50 text-cyan-600',
    fighting: 'bg-orange-50 text-orange-600',
    poison: 'bg-purple-50 text-purple-600',
    ground: 'bg-amber-50 text-amber-600',
    flying: 'bg-indigo-50 text-indigo-600',
    psychic: 'bg-pink-50 text-pink-600',
    bug: 'bg-lime-50 text-lime-600',
    rock: 'bg-stone-50 text-stone-600',
    ghost: 'bg-violet-50 text-violet-600',
    dragon: 'bg-blue-50 text-blue-700',
    dark: 'bg-gray-100 text-gray-800',
    steel: 'bg-slate-50 text-slate-600',
    fairy: 'bg-rose-50 text-rose-600',
  };
  return typeColors[type] || 'bg-gray-100 text-gray-600';
};

const PokemonCard: Component<PokemonCardProps> = (props) => {
  const [pokemonDetails, setPokemonDetails] = createSignal<Pokemon | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  const pokemonId = () => getPokemonIdFromUrl(props.pokemon.url);

  createEffect(async () => {
    try {
      setLoading(true);
      setError(null);
      const details = await fetchPokemonDetails(pokemonId());
      setPokemonDetails(details);
    } catch (err) {
      setError('Error cargando pokemon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  const handleClick = () => {
    const details = pokemonDetails();
    if (details) {
      props.onClick(details);
    }
  };

  return (
    <div 
      class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
      onClick={handleClick}
    >
      {loading() ? (
        <div class="flex flex-col items-center space-y-3">
          <div class="w-20 h-20 bg-gray-100 rounded-2xl animate-pulse"></div>
          <div class="h-4 w-16 bg-gray-100 rounded-lg animate-pulse"></div>
          <div class="h-3 w-12 bg-gray-50 rounded-lg animate-pulse"></div>
        </div>
      ) : error() ? (
        <div class="text-center py-6">
          <div class="text-2xl text-gray-300 mb-2">⚠️</div>
          <p class="text-xs text-gray-400">Error</p>
        </div>
      ) : (
        <div class="text-center space-y-3">
          {/* Número del pokemon */}
          <div class="flex justify-end">
            <span class="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
              #{pokemonId().toString().padStart(3, '0')}
            </span>
          </div>
          
          {/* Imagen del pokemon */}
          <div class="flex justify-center py-2">
            <img
              src={pokemonDetails()?.sprites.other['official-artwork'].front_default || pokemonDetails()?.sprites.front_default}
              alt={formatPokemonName(props.pokemon.name)}
              class="w-20 h-20 object-contain filter drop-shadow-sm"
              loading="lazy"
            />
          </div>
          
          {/* Nombre */}
          <div class="space-y-2">
            <h3 class="font-semibold text-gray-900 text-sm leading-tight">
              {formatPokemonName(props.pokemon.name)}
            </h3>
            
            {/* Tipos */}
            <div class="flex justify-center gap-1">
              {pokemonDetails()?.types.slice(0, 2).map((type) => (
                <span class={`text-xs font-medium px-2 py-1 rounded-lg ${getMinimalTypeColor(type.type.name)}`}>
                  {formatPokemonName(type.type.name)}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonCard; 