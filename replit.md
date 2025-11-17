# CommonWell Health Alliance API Documentation Viewer

## Overview

This is an interactive API documentation viewer for the CommonWell Health Alliance v4.3 healthcare interoperability platform. The application provides a searchable, categorized interface for exploring REST APIs, FHIR endpoints, XCA APIs, and HL7 integration endpoints. Built as a single-page application with a clean, professional Material Design-inspired interface, it allows healthcare developers and business users to efficiently browse and understand API endpoints, request/response formats, and integration patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) v5 for server state caching and synchronization
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom design tokens following Material Design principles

**Design System**:
- Component library based on shadcn/ui's "new-york" style with neutral base color
- Custom CSS variables for theming (light/dark mode support)
- Material Design-inspired typography using Roboto and Roboto Mono fonts
- Consistent spacing system using Tailwind utilities
- Elevation and shadow system for visual hierarchy

**Key Frontend Components**:
- `ApiEndpointCard`: Expandable cards displaying individual API endpoints with request/response details
- `SearchBar`: Real-time search filtering across endpoint titles, methods, and descriptions
- `AppSidebar`: Category navigation with active state tracking and scroll-to-section functionality
- `ThemeToggle`: Light/dark mode switcher with localStorage persistence

**State Management Pattern**:
- Server state handled by React Query with infinite stale time (treating API docs as static content)
- Local UI state (search query, expanded cards, active category) managed with React useState
- Theme state managed through custom ThemeProvider context

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Build Tool**: Vite for frontend bundling, esbuild for backend compilation
- **Development**: Hot module replacement (HMR) via Vite middleware in development mode

**API Structure**:
- RESTful endpoints serving static API documentation data
- `/api/categories` - Returns all API categories with nested endpoints
- `/api/categories/:id` - Returns specific category details
- In-memory data storage using structured TypeScript interfaces

**Server Configuration**:
- Custom request logging middleware tracking API response times
- JSON body parsing with raw body preservation for webhook scenarios
- Static file serving for production builds
- Development-only Vite middleware integration

**Data Schema**:
```typescript
ApiCategory {
  id: string
  name: string
  description: string
  color: string (hex)
  endpoints: ApiEndpoint[]
}

ApiEndpoint {
  id: string
  title: string
  method: string (GET, POST, PUT, DELETE, HL7 v2.x, SOAP)
  endpoint: string (URL path)
  description: string
  category: string
  request: string (formatted request example)
  response: string (formatted response example)
  searchParams?: string[]
}
```

### Data Storage

**Current Implementation**: In-memory storage using TypeScript Map structures
- `MemStorage` class providing CRUD operations for user data
- Static API documentation data imported from `server/data/api-endpoints.ts`
- No persistence layer - documentation treated as static content bundled with application

**Database Configuration**: Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Schema defined in `shared/schema.ts`
- Migration files configured to output to `./migrations`
- User schema prepared but not currently active in the documentation viewer
- Database connection via `DATABASE_URL` environment variable

**Design Decision**: The application currently serves static documentation data without a database. The Drizzle configuration exists for potential future features (user accounts, saved searches, custom documentation versions) but is not required for the core documentation viewer functionality.

### External Dependencies

**UI Component Libraries**:
- Radix UI primitives (accordion, dialog, dropdown, tooltip, etc.) - Unstyled, accessible component primitives
- cmdk - Command palette component for potential future search enhancement
- embla-carousel-react - Carousel functionality for potential multi-view layouts
- lucide-react - Icon library for consistent iconography

**Data & Forms**:
- TanStack Query - Server state management with caching and background updates
- React Hook Form (@hookform/resolvers) - Form validation infrastructure (prepared for future features)
- Zod (drizzle-zod) - Runtime type validation and schema generation
- date-fns - Date formatting and manipulation utilities

**Database & ORM**:
- Drizzle ORM - Type-safe SQL query builder for PostgreSQL
- @neondatabase/serverless - Serverless PostgreSQL driver optimized for edge environments
- connect-pg-simple - PostgreSQL session store (prepared for future authentication)

**Build & Development**:
- Vite - Frontend build tool with HMR and optimized production builds
- esbuild - Fast JavaScript/TypeScript bundler for backend compilation
- @replit/vite-plugin-* - Replit-specific development tools (error overlay, cartographer, dev banner)

**Styling**:
- Tailwind CSS - Utility-first CSS framework
- class-variance-authority - Type-safe variant management for components
- tailwind-merge & clsx - Conditional class name composition utilities

**Type Safety**:
- TypeScript throughout (strict mode enabled)
- Shared type definitions between client and server via `shared/schema.ts`
- Path aliases configured (@/, @shared, @assets) for clean imports