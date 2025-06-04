import type { Component } from 'solid-js';
import { createSignal, createEffect, For, Show } from 'solid-js';

import logo from './logo.svg';
import type { PokemonBasic, Pokemon } from './types/pokemon';
import { fetchPokemonList } from './services/pokemonService';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';

const App: Component = () => {
  const [pokemonList, setPokemonList] = createSignal<PokemonBasic[]>([]);
  const [filteredPokemon, setFilteredPokemon] = createSignal<PokemonBasic[]>([]);
  const [selectedPokemon, setSelectedPokemon] = createSignal<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [searchTerm, setSearchTerm] = createSignal('');

  // Cargar lista de pokemons al iniciar
  createEffect(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchPokemonList(150); // Primeros 150 pokemons
      setPokemonList(response.results);
      setFilteredPokemon(response.results);
    } catch (err) {
      setError('Error cargando la lista de pokémons');
      console.error(err);
    } finally {
      setLoading(false);
    }
  });

  // Filtrar pokémons según el término de búsqueda
  createEffect(() => {
    const term = searchTerm().toLowerCase();
    if (term === '') {
      setFilteredPokemon(pokemonList());
    } else {
      const filtered = pokemonList().filter(pokemon =>
        pokemon.name.toLowerCase().includes(term)
      );
      setFilteredPokemon(filtered);
    }
  });

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Navbar minimalista */}
      <nav class="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-3">
              <img src={logo} alt="Logo" class="w-8 h-8" />
              <h1 class="text-xl font-semibold text-gray-900">Pokédex</h1>
            </div>
            <div class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {filteredPokemon().length} pokémons
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section limpio */}
      <section class="bg-white py-16 sm:py-24">
        <div class="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 class="text-4xl sm:text-5xl font-light text-gray-900 mb-6">
            Explora Pokémons
          </h2>
          <p class="text-xl text-gray-500 mb-12 font-light leading-relaxed">
            Descubre información detallada de cada pokémon con un solo toque
          </p>
          
          {/* Buscador elegante */}
          <div class="max-w-md mx-auto">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar pokémon..."
                class="w-full pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-200"
                value={searchTerm()}
                onInput={(e) => setSearchTerm(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Show when={loading()}>
          <div class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-500"></div>
            <p class="mt-4 text-gray-500 font-light">Cargando pokémons...</p>
          </div>
        </Show>

        <Show when={error()}>
          <div class="max-w-md mx-auto text-center py-16">
            <div class="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div class="text-red-500 text-2xl mb-2">⚠️</div>
              <p class="text-red-700 font-medium">{error()}</p>
            </div>
          </div>
        </Show>

        <Show when={!loading() && !error()}>
          <Show 
            when={filteredPokemon().length > 0}
            fallback={
              <div class="text-center py-20">
                <div class="text-6xl mb-6 opacity-50">🔍</div>
                <h3 class="text-2xl font-light text-gray-900 mb-3">
                  No se encontraron pokémons
                </h3>
                <p class="text-gray-500 font-light">
                  Intenta con otro término de búsqueda
                </p>
              </div>
            }
          >
            {/* Grid de pokémons minimalista */}
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
              <For each={filteredPokemon()}>
                {(pokemon) => (
                  <PokemonCard 
                    pokemon={pokemon} 
                    onClick={handlePokemonClick}
                  />
                )}
              </For>
            </div>

            {/* Estadísticas sutiles */}
            <div class="mt-16 pt-12 border-t border-gray-200">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div class="space-y-2">
                  <div class="text-3xl font-light text-gray-900">
                    {pokemonList().length}
                  </div>
                  <div class="text-sm text-gray-500 font-medium">
                    Total de Pokémons
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="text-3xl font-light text-blue-600">
                    {filteredPokemon().length}
                  </div>
                  <div class="text-sm text-gray-500 font-medium">
                    Resultados
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="text-3xl font-light text-gray-900">
                    Gen I
                  </div>
                  <div class="text-sm text-gray-500 font-medium">
                    Región Kanto
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </Show>
      </main>

      {/* Modal de detalles */}
      <PokemonModal 
        pokemon={selectedPokemon()}
        isOpen={isModalOpen()}
        onClose={closeModal}
      />

      {/* Footer minimalista */}
      <footer class="bg-white border-t border-gray-200 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="text-center space-y-4">
            <div class="flex justify-center items-center space-x-2">
              <img src={logo} alt="Logo" class="w-6 h-6 opacity-60" />
              <span class="text-sm text-gray-500 font-medium">Pokédex</span>
            </div>
            <p class="text-xs text-gray-400 font-light">
              Construido con SolidJS • Datos de PokéAPI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App; 