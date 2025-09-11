# AI Assistant Web App

A modern, responsive web application for prototyping and testing AI assistant features. Built with React, TypeScript, and Tailwind CSS.

## Features

### 🎨 Modern Design
- Clean, professional interface with glassmorphism effects
- Responsive design that works on all devices
- Smooth animations and micro-interactions
- Custom color palette with blue/purple accents

### 💬 AI Chat Interface
- Real-time chat with message history
- Message bubbles with user/AI styling
- Auto-scroll to latest messages
- Loading states and typing indicators
- Copy message functionality
- Clear chat option

### 🧭 Navigation
- Collapsible sidebar navigation
- Mobile-friendly drawer menu
- Active state indicators
- Smooth expand/collapse animations

### 📊 Dashboard
- Statistics cards showing usage metrics
- Recent activity feed
- Quick access to common features

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Adaptive layout for different screen sizes
- Touch-friendly interface elements

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── components/
│   ├── Header/           # Top navigation bar
│   ├── Navigation/       # Sidebar navigation
│   ├── Chat/            # AI chat interface
│   └── ContentPanel/    # Right content area
├── hooks/               # Custom React hooks
├── services/            # API services and mock data
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Header Component
- Fixed navigation bar with logo
- Search functionality (desktop)
- User profile and settings icons
- Mobile menu toggle

### Navigation Panel
- Dashboard, Chat, History, Settings, Help
- Collapsible sidebar for desktop
- Mobile drawer overlay
- Active state indicators

### Chat Interface
- Message history with timestamps
- User and AI message styling
- Auto-resizing input field
- Send button with loading states
- Copy and clear functionality

### Content Panel
- Dynamic content based on navigation
- Dashboard with statistics
- Chat details and analysis
- Settings and preferences
- Help and support information

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`. You can modify the primary and secondary colors to match your brand.

### Mock Data
Sample data is provided in `src/services/mockData.ts`. Replace with real API calls when integrating with backend services.

### Components
All components are modular and can be easily customized or extended. Each component has its own directory with TypeScript definitions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.