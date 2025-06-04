import { Component, Show } from 'solid-js';
import type { Pokemon } from '../types/pokemon';
import { formatPokemonName } from '../services/pokemonService';

interface PokemonModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
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

const PokemonModal: Component<PokemonModalProps> = (props) => {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <Show when={props.isOpen && props.pokemon}>
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm" onClick={handleBackdropClick}>
        <div class="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div class="sticky top-0 bg-white/80 backdrop-blur-lg rounded-t-3xl border-b border-gray-100 px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <h2 class="text-2xl font-semibold text-gray-900">
                  {formatPokemonName(props.pokemon!.name)}
                </h2>
                <span class="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                  #{props.pokemon!.id.toString().padStart(3, '0')}
                </span>
              </div>
              <button 
                class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500"
                onClick={props.onClose}
              >
                ✕
              </button>
            </div>
          </div>

          <div class="p-6 space-y-8">
            {/* Imagen principal y tipos */}
            <div class="text-center space-y-6">
              <div class="flex justify-center">
                <img
                  src={props.pokemon!.sprites.other['official-artwork'].front_default || props.pokemon!.sprites.front_default}
                  alt={formatPokemonName(props.pokemon!.name)}
                  class="w-48 h-48 object-contain filter drop-shadow-lg"
                />
              </div>
              
              <div class="flex justify-center gap-2">
                {props.pokemon!.types.map((type) => (
                  <span class={`text-sm font-medium px-4 py-2 rounded-full ${getMinimalTypeColor(type.type.name)}`}>
                    {formatPokemonName(type.type.name)}
                  </span>
                ))}
              </div>
            </div>

            {/* Información básica */}
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center p-4 bg-gray-50 rounded-2xl">
                <div class="text-2xl font-light text-gray-900 mb-1">
                  {(props.pokemon!.height / 10).toFixed(1)}m
                </div>
                <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Altura
                </div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-2xl">
                <div class="text-2xl font-light text-gray-900 mb-1">
                  {(props.pokemon!.weight / 10).toFixed(1)}kg
                </div>
                <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Peso
                </div>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-2xl">
                <div class="text-2xl font-light text-gray-900 mb-1">
                  {props.pokemon!.base_experience || 'N/A'}
                </div>
                <div class="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Exp. Base
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Estadísticas</h3>
              <div class="space-y-3">
                {props.pokemon!.stats.map((stat) => {
                  const statName = stat.stat.name.replace('-', ' ');
                  const percentage = (stat.base_stat / 255) * 100;
                  return (
                    <div class="space-y-2">
                      <div class="flex justify-between items-center">
                        <span class="text-sm font-medium text-gray-700 capitalize">
                          {statName}
                        </span>
                        <span class="text-sm font-semibold text-gray-900">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
                          style={`width: ${percentage}%`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Habilidades */}
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Habilidades</h3>
              <div class="flex flex-wrap gap-2">
                {props.pokemon!.abilities.map((ability) => (
                  <span class={`text-sm font-medium px-3 py-2 rounded-full border ${
                    ability.is_hidden 
                      ? 'bg-purple-50 text-purple-600 border-purple-200' 
                      : 'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>
                    {formatPokemonName(ability.ability.name)}
                    {ability.is_hidden && (
                      <span class="ml-1 text-xs opacity-70">(Oculta)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Sprites */}
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900">Variantes</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 bg-gray-50 rounded-2xl">
                  <img 
                    src={props.pokemon!.sprites.front_default} 
                    alt="Normal" 
                    class="w-24 h-24 object-contain mx-auto mb-3"
                  />
                  <div class="text-sm font-medium text-gray-700">Normal</div>
                </div>
                <div class="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                  <img 
                    src={props.pokemon!.sprites.front_shiny} 
                    alt="Shiny" 
                    class="w-24 h-24 object-contain mx-auto mb-3"
                  />
                  <div class="text-sm font-medium text-orange-700 flex items-center justify-center gap-1">
                    <span>✨</span>
                    Shiny
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de cerrar */}
            <div class="pt-4">
              <button 
                class="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-2xl transition-colors"
                onClick={props.onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default PokemonModal; 