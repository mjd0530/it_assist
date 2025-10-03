# Lenovo IT Assist

A modern, responsive web application for IT support and device management. Built with React, TypeScript, and Tailwind CSS, featuring AI-powered chat assistance for Lenovo device troubleshooting and support.

## Features

### 🎨 Modern Design
- Clean, professional interface with glassmorphism effects
- Responsive design that works on all devices
- Smooth animations and micro-interactions
- Custom color palette with blue/purple accents

### 💬 AI Chat Interface
- **Real-time AI responses** with realistic mock data
- **Thread management** - Create and manage multiple chat threads
- **IT-focused responses** - Specialized in Lenovo device support
- **Context-aware assistance** - BSOD analysis, BIOS updates, network issues
- Message bubbles with user/AI styling
- Auto-scroll to latest messages
- Loading states and typing indicators
- Copy message functionality

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

4. **Start chatting:**
   - Click "New" to create a new thread
   - Ask questions about IT support, device issues, or Lenovo products
   - The AI will provide realistic, context-aware responses

## AI Features

The application includes a sophisticated AI chat system with:

- **Mock AI Responses** (Default) - Works immediately without setup
- **Real AI Integration** (Optional) - Support for OpenAI and Hugging Face APIs
- **IT-Specialized Responses** - Tailored for Lenovo device support
- **Thread Management** - Multiple conversation threads
- **Realistic Delays** - Simulates real AI response times

See [AI_SETUP.md](./AI_SETUP.md) for detailed AI configuration options.

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
