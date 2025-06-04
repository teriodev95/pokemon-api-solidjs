# 🔍 Pokédex SolidJS

Una aplicación web moderna para explorar pokémons usando SolidJS y TailwindCSS.

## ✨ Características

- 📋 Lista de los primeros 150 pokémons
- 🔍 Búsqueda en tiempo real
- 📱 Diseño responsive y minimalista
- 🎨 Modal con detalles de cada pokémon
- ⚡ Interfaz reactiva y rápida

## 🛠️ Tecnologías

- **SolidJS** - Framework reactivo
- **TypeScript** - Tipado estático
- **TailwindCSS** - Estilos utilitarios
- **PokéAPI** - Datos de pokémons
- **Vite** - Herramienta de construcción

## 🚀 Instalación

```bash
# Clonar repositorio
git clone <url-del-repo>

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🌐 Despliegue en Cloudflare Pages

### Configuración automática
```bash
# Desplegar con un solo comando
npm run deploy
```

### Configuración manual
```bash
# Construir la aplicación
npm run build

# Desplegar con Wrangler
npx wrangler pages deploy dist
```

### Primera vez
1. Instala Wrangler globalmente: `npm install -g wrangler`
2. Autentícate con Cloudflare: `wrangler login`
3. Despliega: `npm run deploy`

La aplicación incluye:
- ✅ `wrangler.toml` configurado para SPA
- ✅ `_redirects` para ruteo del cliente
- ✅ Scripts de npm para despliegue automatizado

## 📁 Estructura
