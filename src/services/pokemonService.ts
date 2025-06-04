import type { PokemonListResponse, Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Obtener lista de pokemons
export const fetchPokemonList = async (limit: number = 150, offset: number = 0): Promise<PokemonListResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
    throw error;
  }
};

// Obtener detalles de un pokemon específico
export const fetchPokemonDetails = async (nameOrId: string | number): Promise<Pokemon> => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
    throw error;
  }
};

// Obtener ID del pokemon desde la URL
export const getPokemonIdFromUrl = (url: string): number => {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2]);
};

// Formatear nombre del pokemon
export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// Obtener color según el tipo de pokemon
export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'badge-neutral',
    fire: 'badge-error',
    water: 'badge-info',
    electric: 'badge-warning',
    grass: 'badge-success',
    ice: 'badge-info',
    fighting: 'badge-error',
    poison: 'badge-secondary',
    ground: 'badge-warning',
    flying: 'badge-info',
    psychic: 'badge-secondary',
    bug: 'badge-success',
    rock: 'badge-neutral',
    ghost: 'badge-secondary',
    dragon: 'badge-primary',
    dark: 'badge-neutral',
    steel: 'badge-neutral',
    fairy: 'badge-secondary',
  };
  return typeColors[type] || 'badge-neutral';
}; 