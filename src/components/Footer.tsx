import type { Component } from 'solid-js';

// Importar los iconos SVG reales
import solidjsIcon from '../assets/icons/solidjs.svg';
import typescriptIcon from '../assets/icons/typescript.svg';
import tailwindIcon from '../assets/icons/tailwindcss.svg';
import viteIcon from '../assets/icons/vitejs.svg';
import daisyuiIcon from '../assets/icons/daisyui.svg';

const Footer: Component = () => {
  const techStack = [
    {
      name: 'SolidJS',
      icon: solidjsIcon,
      color: 'hover:bg-blue-50',
      iconColor: 'group-hover:brightness-110',
      url: 'https://solidjs.com',
      description: 'Reactive UI Framework'
    },
    {
      name: 'TypeScript',
      icon: typescriptIcon,
      color: 'hover:bg-blue-50',
      iconColor: 'group-hover:brightness-110',
      url: 'https://typescriptlang.org',
      description: 'Static Type Checker'
    },
    {
      name: 'Tailwind CSS',
      icon: tailwindIcon,
      color: 'hover:bg-cyan-50',
      iconColor: 'group-hover:brightness-110',
      url: 'https://tailwindcss.com',
      description: 'Utility-First CSS'
    },
    {
      name: 'Vite',
      icon: viteIcon,
      color: 'hover:bg-yellow-50',
      iconColor: 'group-hover:brightness-110',
      url: 'https://vitejs.dev',
      description: 'Build Tool & Dev Server'
    },
    {
      name: 'DaisyUI',
      icon: daisyuiIcon,
      color: 'hover:bg-green-50',
      iconColor: 'group-hover:brightness-110',
      url: 'https://daisyui.com',
      description: 'Tailwind Components'
    }
  ];

  return (
    <footer class="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200/50 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div class="text-center space-y-8">
          {/* Hero del Footer */}
          <div class="space-y-4">
            <div class="flex justify-center items-center space-x-3 mb-6">
              <div class="w-3 h-3 bg-gradient-to-r from-red-500 to-blue-500 rounded-full animate-pulse"></div>
              <h3 class="text-xl font-light text-gray-800 tracking-wide">
                Tech Stack
              </h3>
              <div class="w-3 h-3 bg-gradient-to-r from-blue-500 to-red-500 rounded-full animate-pulse"></div>
            </div>
            <p class="text-gray-500 text-sm font-light max-w-2xl mx-auto leading-relaxed">
              Modern web technologies
            </p>
          </div>

          {/* Grid de Tecnologías */}
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {techStack.map((tech) => (
              <a
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                class={`group relative p-6 rounded-2xl border border-gray-200/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-200/50 ${tech.color} hover:border-gray-300/50`}
                title={`${tech.name} - ${tech.description}`}
              >
                {/* Icono */}
                <div class="flex justify-center mb-4">
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    class={`w-12 h-12 transition-all duration-300 ${tech.iconColor} group-hover:scale-110`}
                  />
                </div>
                
                {/* Información */}
                <div class="space-y-2">
                  <h4 class="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors duration-200">
                    {tech.name}
                  </h4>
                  <p class="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                    {tech.description}
                  </p>
                </div>

                {/* Indicador de enlace */}
                <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Información adicional */}
          <div class="pt-8 border-t border-gray-200/50 space-y-4">
            <div class="flex justify-center items-center space-x-4">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-sm font-medium text-gray-700">Pokédex SolidJS</span>
              </div>
              <div class="w-px h-4 bg-gray-300"></div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span class="text-sm text-gray-500">Gen I</span>
              </div>
            </div>
            
            <div class="text-xs text-gray-400 font-light space-y-1">
              <p>RESTful API integration • Responsive design • SSR ready</p>
              <p class="flex items-center justify-center space-x-1">
                <span>Built with</span>
                <svg class="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>by clvrt</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 