# Client - Portfolio Frontend

React-based frontend application for the portfolio website. Built with modern web technologies and optimized for performance.

## 🚀 Features

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **Responsive design** with mobile-first approach
- **Client-side routing** with Wouter
- **Form handling** with React Hook Form
- **Animations** with Framer Motion

## 📁 Structure

```
client/
├── src/
│   ├── components/     # React components
│   │   ├── ui/        # Reusable UI components
│   │   └── ...        # Feature-specific components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   └── main.tsx       # Application entry point
├── public/
│   ├── data/          # Static JSON data files
│   └── images/        # Static images
└── index.html         # HTML template
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# From root directory
npm install

# Or from client directory
cd client
npm install
```

### Environment Variables
Create a `.env` file in the client directory:

```bash
# API Mode: 'static' (JSON files) or 'api' (database)
VITE_API_MODE=static

# Backend API URL (required for API mode)
VITE_API_BASE_URL=http://localhost:3000
```

### Running the Application

```bash
# From root directory
npm run dev:client

# Or from client directory
npm run dev
```

The application will be available at `http://localhost:5173`

### Building

```bash
# From root directory
npm run build:client

# Or from client directory
npm run build
```

## 📊 Data Modes

### Static Mode (Default)
- Data loaded from JSON files in `public/data/`
- No backend required
- Perfect for static hosting

### API Mode
- Data fetched from backend API
- Real-time updates
- Requires backend server running

## 🎨 UI Components

The application uses a custom UI component library built on top of Radix UI primitives:

- **Button** - Various button styles and states
- **Card** - Content containers
- **Dialog** - Modal dialogs
- **Form** - Form components with validation
- **Navigation** - Navigation components
- **Toast** - Notification system

## 🔧 Configuration

### Vite Configuration
- React plugin for JSX support
- TypeScript support
- Tailwind CSS integration
- Build optimization

### Tailwind CSS
- Custom color palette
- Responsive breakpoints
- Animation utilities
- Typography styles

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚀 Performance

- **Code splitting** for optimal loading
- **Lazy loading** for components
- **Image optimization** with proper formats
- **Minimal bundle size** with tree shaking

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # TypeScript type checking
```

## 🔗 Integration

The client integrates with:

- **Backend API** (Express.js server)
- **Database** (PostgreSQL via Drizzle ORM)
- **Deployment** (Vercel)
- **Content Management** (Admin panel)

## 📄 License

This project is licensed under the MIT License. 