# Migration from React Scripts to Vite

This document outlines the changes made during the migration from Create React App (react-scripts) to Vite.

## Major Changes

1. **Build System**: Replaced react-scripts with Vite
2. **Development Server**: Now using Vite's dev server instead of webpack-dev-server
3. **Testing**: Removed Jest dependencies to use Vitest exclusively
4. **Output Directory**: Changed from `build` to `dist` (Vite default)
5. **Environment Variables**: Changed from `REACT_APP_*` to `VITE_*` prefix

## File Changes

- Added `vite.config.js` for Vite configuration
- Added `vitest.config.js` for Vitest configuration
- Moved `public/index.html` to `index.html` in the root directory
- Added `.env`, `.env.development`, and `.env.production` files
- Updated VS Code settings and launch configurations

## Script Changes

| Old Command | New Command | Description |
|-------------|-------------|-------------|
| `npm start` | `npm start` or `npm run dev` | Start development server |
| `npm run build` | `npm run build` | Build for production |
| N/A | `npm run preview` | Preview production build |
| `npm test` | `npm test` | Run tests |
| N/A | `npm run test:watch` | Run tests in watch mode |

## Breaking Changes

1. **Environment Variables**: Any environment variables used in the code need to be updated from `REACT_APP_*` to `VITE_*`.
2. **Public Path**: The public path is now handled differently. Assets in the `public` directory are served from the root path.
3. **Build Output**: The build output directory has changed from `build` to `dist`.

## Benefits of Migration

1. **Faster Development**: Vite provides a much faster development experience with instant server start and hot module replacement.
2. **Improved Build Performance**: Vite's build process is more efficient than webpack.
3. **Better Testing Integration**: Vitest works seamlessly with Vite, eliminating conflicts with Jest.
4. **Modern JavaScript Support**: Better support for ES modules and modern JavaScript features.
5. **Simplified Configuration**: Vite requires less configuration than webpack.

## Known Issues

- If you encounter any CSS module issues, you may need to rename your CSS files to include `.module.css` in the filename.
- Some third-party libraries might not work correctly with Vite's ESM-first approach. Check the console for any import errors.