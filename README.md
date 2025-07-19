# The Wanderer

This game called The Wanderer is based upon an Amiga game [The Wanderer](https://openretro.org/game/736fedbc-ca4b-4a6c-9651-37efdf5adc98/edit#5c6e78f8-8b33-5aa5-8799-0deab5b2b517) ([see also](https://www.video-games-museum.com/en/game/Wanderer-The/82/3/72080)) 

## History

The game came into existance in 1991 and appears to have its origins in a MS-DOS 1988 game of the same name by a company called [mobygames.com](https://www.bing.com/images/search?view=detailV2&ccid=njwql2Qp&id=04C132F7383528DA105C45DF0D508F62A127889A&thid=OIP.njwql2Qpr9H6DoilpbylyQHaEo&mediaurl=https%3a%2f%2fcdn.mobygames.com%2ffbae36b6-aba5-11ed-bd13-02420a00019c.webp&exph=375&expw=600&q=wanderer+game+1980s&simid=607987363899065693&FORM=IRPRST&ck=9914B4738DB45F49737A7C21A52A1122&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0) 

This Game has been created using AI, React and TypeScript. The instructions and images provided to the AI can be found under the folder _Instructions_.

## Changes

This project has been migrated from Create React App (react-scripts) to Vite for improved performance and developer experience. For details about the migration and its benefits, see [MigrateToVite.md](./MigrateToVite.md).

## Development

This project uses Vite for development and building. Here are the available commands:

### Setup

```bash
# Install dependencies
npm install
```

### Running the Game

```bash
# Start development server
npm start
# or
npm run dev
```

### Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Environment Variables

Environment variables should be prefixed with `VITE_` to be accessible in the client-side code. You can define them in the following files:

- `.env` - Loaded in all environments
- `.env.development` - Loaded in development
- `.env.production` - Loaded in production

## VS Code Integration

This project includes VS Code configurations for:

- Debugging the application in Chrome
- Debugging tests with Vitest
- Running tests from the Test Explorer

## Technologies

- React
- TypeScript
- Vite
- Vitest for testing