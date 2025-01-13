# Next Step Frontend

## Overview
React-based frontend application for the Next Step platform. Provides user interface for educational pathway recommendations.

## Features
- User authentication and profile management
- Educational pathway visualization
- Career recommendations interface
- Interactive course exploration
- Progressive Web App support

## Tech Stack
- React + Vite
- Material-UI
- Firebase Authentication
- React Router
- Progressive Web App

## Setup
1. Install dependencies:
   ```bash
   yarn install
   ```

2. Configure environment:
   ```bash
   cp .env.example .env
   ```

3. Update environment variables:
   ```env
   VITE_API_URL=http://localhost:8080
   VITE_FIREBASE_CONFIG=your-firebase-config
   ```

4. Start development server:
   ```bash
   yarn dev
   ```

## Building for Production
```bash
yarn build
```

## Available Scripts
- `yarn dev` - Start development server

## Project Structure
```
src/
├── components/    # Reusable components
├── pages/        # Route components
├── services/     # API services
├── hooks/        # Custom hooks
├── store/        # State management
├── utils/        # Utility functions
└── styles/       # Global styles
```

## Design System
See [docs/design-system.md](docs/design-system.md) for UI component documentation.

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.
