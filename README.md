# Prav - Modern React Dashboard Application

A comprehensive dashboard application built with React, TypeScript, and modern web technologies. Features a clean, responsive design with full CRUD operations, authentication, and data visualization.

## 🚀 Features

- **Modern Dashboard**: Clean and intuitive dashboard interface with sidebar navigation
- **Authentication System**: Simplified login/logout functionality with protected routes
- **Data Management**: Full CRUD operations for records with search and filtering
- **Analytics**: Interactive charts and data visualization using Recharts
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Theme switching capability
- **User Profile Management**: User settings and profile customization
- **Real-time Updates**: Dynamic data updates and state management

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui component library
- **State Management**: Zustand for lightweight state management
- **Routing**: React Router DOM for client-side routing
- **Charts**: Recharts for data visualization
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography
- **Package Manager**: pnpm for efficient dependency management

## 📦 Why pnpm?

This project uses **pnpm** as the package manager for several reasons:

- **Efficiency**: pnpm uses hard links and symlinks to save disk space
- **Speed**: Faster installation and better caching compared to npm
- **Strict**: Better dependency resolution and prevents phantom dependencies
- **Lock File**: The project includes `pnpm-lock.yaml` for consistent installs

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GaneshVarma1/Prav.git
   cd Prav
   ```

2. **Install dependencies**
   
   Using pnpm (recommended):
   ```bash
   pnpm install
   ```
   
   Using npm:
   ```bash
   npm install
   ```

3. **Start the development server**
   
   Using pnpm:
   ```bash
   pnpm dev
   ```
   
   Using npm:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Script | pnpm | npm | Description |
|--------|------|-----|-------------|
| Development | `pnpm dev` | `npm run dev` | Start development server |
| Build | `pnpm build` | `npm run build` | Build for production |
| Preview | `pnpm preview` | `npm run preview` | Preview production build |
| Lint | `pnpm lint` | `npm run lint` | Run ESLint |
| Type Check | `pnpm check` | `npm run check` | TypeScript type checking |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components
│   └── ui/             # shadcn/ui components
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication page
│   ├── Analytics.tsx   # Analytics and charts
│   ├── DataManagement.tsx # CRUD operations
│   └── Settings.tsx    # User settings
├── store/              # State management
│   ├── authStore.ts    # Authentication state
│   └── recordsStore.ts # Records/data state
├── services/           # API and data services
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🎨 Key Components

### Dashboard
- Overview cards with key metrics
- Interactive charts and graphs
- Quick action buttons
- Recent activity feed

### Data Management
- Sortable and filterable data tables
- Create, read, update, delete operations
- Search functionality
- Pagination support

### Authentication
- Simple login/logout flow
- Protected route handling
- User session management

### Analytics
- Interactive charts using Recharts
- Data visualization components
- Responsive chart layouts

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement responsive design principles

### State Management
- Use Zustand for global state
- Keep component state local when possible
- Implement proper error handling

### Component Structure
- Use functional components with hooks
- Implement proper prop typing
- Follow the single responsibility principle

## 🚀 Deployment

### Build for Production

```bash
# Using pnpm
pnpm build

# Using npm
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
# Using pnpm
pnpm preview

# Using npm
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Repository**: [https://github.com/GaneshVarma1/Prav](https://github.com/GaneshVarma1/Prav)
- **Live Demo**: [Coming Soon]

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and modern web technologies.
