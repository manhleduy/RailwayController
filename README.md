# Railway Controller

A full-stack railway ticket management system built with modern web technologies. This application enables customers to book railway tickets, manage trips, and provides staff with administrative capabilities to oversee operations.

---

## Project Overview

The Railway Controller is a comprehensive platform that streamlines railway ticket booking, seat management, and order processing. It provides both customer-facing and staff-facing interfaces to manage all aspects of railway transportation operations.

### Key Features
- **Customer Management**: User registration, profile management, and loyalty ranking
- **Ticket Booking**: Browse and book railway tickets with real-time seat availability
- **Trip Management**: Create and manage railway trips with departure/arrival information
- **Seat Management**: Dynamic seat allocation and availability tracking
- **Order Processing**: Order creation, tracking, and statistics
- **Authentication**: Secure JWT-based authentication for customers and staff
- **Real-time Updates**: WebSocket integration for live notifications
- **Staff Dashboard**: Administrative tools for managing operations

---

## Project Structure

```
railwayControll/
├── backend/                          (NestJS + GraphQL + Prisma)
│   ├── src/
│   │   ├── auth/                    (Authentication module)
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── signup.dto.ts
│   │   │   └── model/
│   │   │       └── login.model.ts
│   │   ├── customer/                (Customer management)
│   │   │   ├── customer.module.ts
│   │   │   ├── customer.service.ts
│   │   │   ├── customer.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create.dto.ts
│   │   │   │   ├── update.dto.ts
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── delete.dto.ts
│   │   │   │   ├── resetpassword.dto.ts
│   │   │   │   └── uprank.dto.ts
│   │   │   └── model/
│   │   │       └── customer.model.ts
│   │   ├── ticket/                  (Ticket management)
│   │   │   ├── ticket.module.ts
│   │   │   ├── ticket.service.ts
│   │   │   ├── ticket.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create.dto.ts
│   │   │   │   └── update.dto.ts
│   │   │   └── model/
│   │   │       └── ticket.model.ts
│   │   ├── order/                   (Order management)
│   │   │   ├── order.module.ts
│   │   │   ├── order.service.ts
│   │   │   ├── order.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create.dto.ts
│   │   │   │   └── accept.dto.ts
│   │   │   └── model/
│   │   │       ├── order.model.ts
│   │   │       └── statistic.model.ts
│   │   ├── trip/                    (Trip management)
│   │   │   ├── trip.module.ts
│   │   │   ├── trip.service.ts
│   │   │   ├── trip.resolver.ts
│   │   │   └── model/
│   │   │       └── trip.model.ts
│   │   ├── seat/                    (Seat management)
│   │   │   ├── seat.module.ts
│   │   │   ├── seat.service.ts
│   │   │   ├── seat.resolver.ts
│   │   │   ├── dto/
│   │   │   │   ├── create.dto.ts
│   │   │   │   └── update.dto.ts
│   │   │   └── model/
│   │   │       └── seat.model.ts
│   │   ├── staff/                   (Staff management)
│   │   │   ├── staff.module.ts
│   │   │   ├── staff.service.ts
│   │   │   ├── staff.resolver.ts
│   │   │   └── dto/
│   │   │       ├── create.dto.ts
│   │   │       └── login.dto.ts
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── app.controller.ts
│   ├── test/                        (E2E tests)
│   ├── prisma/                      (Database schema)
│   ├── dist/                        (Compiled output)
│   ├── generated/                   (Generated files)
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   ├── nest-cli.json
│   └── README.md
│
├── frontend/                         (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/                  (UI components)
│   │   │       ├── button.tsx
│   │   │       ├── label.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── separator.tsx
│   │   │       ├── field.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       └── hover-card.tsx
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── node_modules/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── components.json
│   ├── eslint.config.js
│   └── README.md
│
├── .git/                            (Git repository)
├── test_create.json                 (Test data file)
└── .gitignore
```

---

## Tech Stack & Functions

### Backend Technologies

| Technology | Version | Function |
|---|---|---|
| **NestJS** | 11.0.1 | Progressive TypeScript framework for building scalable server-side applications. Provides module architecture, dependency injection, and MVC pattern support. |
| **GraphQL** | 16.14.0 | Query language and API standard for efficient data fetching. Enables clients to request exactly the data they need, reducing over-fetching. |
| **Apollo Server** | 3.13.0 | GraphQL server implementation. Handles schema execution, subscriptions, and integrations with NestJS via `@nestjs/apollo`. |
| **Prisma** | 7.8.0 | Modern ORM for TypeScript/Node.js. Provides type-safe database access, automatic migrations, and introspection capabilities. |
| **PostgreSQL** | (via Prisma) | Relational database for persistent data storage. Handles all railway data, customer information, tickets, orders, and seats. |
| **JWT (JSON Web Tokens)** | via `@nestjs/jwt` | Stateless authentication mechanism. Issues and validates tokens for secure customer and staff authentication. |
| **Passport** | 0.7.0 | Authentication middleware. Integrates with JWT strategy for protecting GraphQL resolvers and endpoints. |
| **Bcrypt** | 6.0.0 | Password hashing library. Ensures secure storage of customer and staff passwords using salted hashing. |
| **Socket.io** | 4.8.3 | Real-time bidirectional communication. Enables WebSocket connections for live notifications and updates. |
| **Nodemailer** | 8.0.8 | Email sending library. Used for customer notifications, password resets, and booking confirmations. |
| **Class Validator** | 0.15.1 | Decorator-based validation library. Validates DTO inputs in API requests using decorators and constraints. |

### Frontend Technologies

| Technology | Version | Function |
|---|---|---|
| **React** | 19.2.6 | UI library for building interactive user interfaces with component-based architecture. |
| **TypeScript** | ~6.0.2 | Strongly typed JavaScript. Provides compile-time type checking and better IDE support for large-scale applications. |
| **Vite** | 8.0.12 | Next-generation build tool. Provides fast development server, optimized production builds, and ES modules support. |
| **React Router** | 7.15.1 | Client-side routing library. Manages navigation between pages (booking, orders, profile, dashboard) without full page reloads. |
| **Redux Toolkit** | 2.2.1 | State management library. Centralizes application state (user data, bookings, cart) with predictable state updates. |
| **Tailwind CSS** | 4.3.0 | Utility-first CSS framework. Provides pre-built utility classes for rapid UI development and consistent styling. |
| **Shadcn UI** | 4.8.0 | Unstyled, accessible component library. Provides ready-to-use components built with Radix UI and Tailwind CSS. |
| **Radix UI** | 1.4.3 | Headless component library. Offers accessible, unstyled UI primitives for building custom components. |
| **Axios** | 1.16.1 | HTTP client library. Handles API requests to the GraphQL backend with interceptors and error handling. |
| **Lucide React** | 1.16.0 | Icon library. Provides consistent, customizable SVG icons for UI elements throughout the application. |
| **React Hot Toast** | 2.6.0 | Toast notification library. Displays user feedback (success, error, info) messages in real-time. |
| **Socket.io Client** | 4.7.2 | WebSocket client library. Enables real-time communication with backend for live updates and notifications. |
| **Recharts** | 2.12.7 | React charting library. Used for visualizing order statistics and booking analytics on dashboards. |
| **Zod** | 4.4.3 | TypeScript-first schema validation library. Validates form inputs and API responses with type inference. |

### Frontend Auth Implementation

The current frontend work focuses on the login and signup experience. It uses two separate pages, keeps the backend response in Redux, and shows toast feedback without navigating to another screen after success.

#### Key Frontend Files

- `frontend/src/App.tsx` - React Router setup, Redux provider, and toast container
- `frontend/src/pages/LoginPage.tsx` - Login page wrapper
- `frontend/src/pages/SignupPage.tsx` - Signup page wrapper
- `frontend/src/components/auth/AuthPageShell.tsx` - Shared two-column auth layout
- `frontend/src/components/auth/AuthForm.tsx` - Controlled GraphQL auth form with loading and validation states
- `frontend/src/components/auth/AuthStatusCard.tsx` - Redux snapshot of the saved auth data
- `frontend/src/lib/api/graphql.ts` - Small GraphQL client wrapper around Axios
- `frontend/src/lib/api/auth.ts` - Login and signup request helpers
- `frontend/src/lib/store/authSlice.ts` - Redux slice for authentication state
- `frontend/src/lib/store/store.ts` - Redux store with optional localStorage hydration
- `frontend/src/lib/store/reduxHooks.ts` - Typed Redux hooks
- `frontend/src/components/ui/card.tsx` - Card primitive for the auth layout
- `frontend/src/components/ui/input.tsx` - Input primitive for the forms
- `frontend/src/components/ui/select.tsx` - Select primitive for the role field

#### Auth Flow

1. The user opens `/login` or `/signup`.
2. The form validates the input locally with `zod`.
3. The app sends a GraphQL request to the backend auth resolver.
4. The returned user data is normalized and stored in Redux.
5. A `react-hot-toast` message confirms the result.
6. The page stays in place so future dashboard work can be added later without changing this flow.

#### Environment Variable

- `VITE_GRAPHQL_URL` - Optional full GraphQL endpoint. Defaults to `http://localhost:3000/graphql`.

---

## Frontend Components Status

### ✅ Existing Components

**UI Components (Base Layer):**
- `button.tsx` - Reusable button component with variants
- `label.tsx` - Form label component
- `textarea.tsx` - Multi-line text input field
- `separator.tsx` - Visual divider component
- `field.tsx` - Form field wrapper component
- `dropdown-menu.tsx` - Dropdown menu with options
- `hover-card.tsx` - Card that appears on hover

### ⏳ Missing Components (To Be Implemented)

**Authentication Components:**
- `LoginForm.tsx` - Customer login form
- `SignupForm.tsx` - Customer registration form
- `PasswordResetForm.tsx` - Password reset functionality

**Customer Dashboard Components:**
- `CustomerProfile.tsx` - View and edit customer profile
- `ProfileUpdateForm.tsx` - Update customer information
- `LoyaltyStatus.tsx` - Display loyalty ranking and benefits
- `BookingHistory.tsx` - View past bookings and orders

**Ticket & Booking Components:**
- `TicketSearch.tsx` - Search trips by route and date
- `TicketList.tsx` - Display available tickets
- `TicketDetails.tsx` - View ticket details
- `SeatSelector.tsx` - Interactive seat selection interface
- `BookingForm.tsx` - Booking form with trip details
- `BookingConfirmation.tsx` - Confirmation page after booking

**Cart & Order Components:**
- `ShoppingCart.tsx` - View and manage shopping cart
- `OrderSummary.tsx` - Order summary before payment
- `OrderTracker.tsx` - Track order status and details
- `OrderHistory.tsx` - View all customer orders
- `OrderCancellation.tsx` - Cancel existing orders

**Payment Components:**
- `PaymentForm.tsx` - Payment processing form
- `PaymentStatus.tsx` - Payment status display

**Staff Dashboard Components:**
- `StaffDashboard.tsx` - Main staff control panel
- `TripManagement.tsx` - Create and manage trips
- `TicketManagement.tsx` - Manage ticket inventory
- `SeatManagement.tsx` - Configure seat layouts
- `OrderApproval.tsx` - Review and approve orders
- `Statistics.tsx` - Display booking and revenue statistics
- `StaffManagement.tsx` - Manage staff accounts

**Shared Components:**
- `Navigation.tsx` - Main navigation bar
- `Header.tsx` - Page header with branding
- `Footer.tsx` - Footer with links and info
- `Loading.tsx` - Loading spinner/skeleton
- `ErrorBoundary.tsx` - Error handling wrapper
- `NotificationCenter.tsx` - Notification system
- `Sidebar.tsx` - Sidebar navigation (for staff dashboard)
- `Modal.tsx` - Modal dialog component
- `Pagination.tsx` - Pagination control
- `EmptyState.tsx` - Empty state display

**Layout Components:**
- `MainLayout.tsx` - Main application layout
- `AuthLayout.tsx` - Authentication page layout
- `DashboardLayout.tsx` - Dashboard layout for staff

---

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## API Documentation

The backend exposes a GraphQL API at `/graphql` with resolvers for:
- **Auth**: User authentication and token generation
- **Customer**: Customer CRUD operations
- **Ticket**: Ticket management
- **Order**: Order creation and tracking
- **Trip**: Trip management
- **Seat**: Seat allocation and availability
- **Staff**: Staff account management

---

## Contributing

This is an educational/development project for railway ticket management system.
