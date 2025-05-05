
# PiEat-Me: Food Delivery Platform with Pi Network Integration

A modern food delivery application built on the Pi Network ecosystem, allowing users to order food from restaurants and home food providers using Pi cryptocurrency.

![PiEat-Me Logo](public/lovable-uploads/a8326833-2525-4059-956f-569750fb1bc4.png)

## Project Overview

PiEat-Me is a comprehensive food delivery platform built on the Pi Network ecosystem. It connects users with both traditional restaurants and home-based food providers, enabling payments via Pi cryptocurrency. The platform features a dual-marketplace model, with separate sections for restaurants and home food providers, integrated wallet systems, and a reward mining feature.

## Key Features

- **Order from Restaurants and Home Chefs**: Browse and order from restaurants or home food providers
- **Pi Network Integration**: Pay using Pi cryptocurrency with complete wallet integration
- **Dual-Wallet System**: 
  - Pi Network wallet for cryptocurrency transactions
  - PiEat wallet for platform rewards and internal transactions
- **Mining Rewards System**: Earn PiEat tokens (PTM) through in-app mining activities
- **Multi-language Support**: Full support for English and Arabic languages
- **Responsive Design**: Optimized for both mobile and desktop devices
- **PWA Support**: Install as a native app on mobile devices
- **Administrative Dashboard**: Complete management system for platform administrators

## Live Demo

[Visit PiEat-Me](https://lovable.dev/projects/a4068971-3b7c-465e-9229-a5ec131e33e4)

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **State Management**: React Context API, TanStack Query
- **Routing**: React Router
- **Backend Integration**: Supabase
- **Mobile Support**: Capacitor, PWA
- **Payment Integration**: Pi Network SDK
- **Data Visualization**: Recharts
- **Notifications**: Sonner toast system

## Project Structure

```
PiEat-Me/
├── public/                   # Static files and assets
│   ├── lovable-uploads/      # Uploaded images
│   ├── manifest.json         # PWA manifest
│   └── service-worker.js     # Service worker for offline support
│
├── src/
│   ├── backend/              # Backend services
│   │   ├── integrations/     # External service integrations
│   │   └── services/         # API services
│   │
│   ├── components/           # Reusable UI components
│   │   ├── cart/             # Cart-related components
│   │   ├── food-provider/    # Food provider components
│   │   ├── header/           # Header components
│   │   ├── home/             # Home page components
│   │   ├── mining/           # Mining feature components
│   │   ├── restaurant/       # Restaurant-related components
│   │   ├── ui/               # UI library components
│   │   └── wallet/           # Wallet components
│   │
│   ├── config/               # Configuration files
│   │   └── piNetwork.ts      # Pi Network SDK configuration
│   │
│   ├── contexts/             # React context providers
│   │   ├── wallet/           # Wallet context
│   │   ├── language/         # Localization context
│   │   ├── PaymentContext.tsx # Payment processing
│   │   └── [Other contexts]
│   │
│   ├── hooks/                # Custom React hooks
│   │
│   ├── integrations/         # Third-party integrations
│   │   └── supabase/         # Supabase integration
│   │
│   ├── locales/              # Translation files
│   │   ├── ar.json           # Arabic translations
│   │   ├── en.json           # English translations
│   │   └── index.ts
│   │
│   ├── pages/                # Application pages
│   │   ├── Index.tsx         # Home page
│   │   ├── Wallet.tsx        # Wallet page
│   │   ├── PiWallet.tsx      # Pi wallet page
│   │   ├── HomeFood.tsx      # Home food page
│   │   ├── Restaurants.tsx   # Restaurants page
│   │   ├── admin/            # Admin dashboard pages
│   │   └── [Other pages]
│   │
│   ├── services/             # Application services
│   │
│   ├── styles/               # Global styles
│   │
│   ├── translations/         # Translation files
│   │
│   ├── types/                # TypeScript type definitions
│   │
│   ├── utils/                # Helper functions
│   │
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Application entry point
│
├── capacitor.config.ts       # Capacitor configuration for mobile
├── tailwind.config.ts        # Tailwind CSS configuration
└── vite.config.ts            # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd pieat-me
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using bun (faster)
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-anon-key>
   ```

4. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using bun
   bun dev
   ```

   The application will be available at http://localhost:5173 by default.

## Build and Deployment

### Development Build
```bash
npm run build:dev
# or 
bun run build:dev
```

### Production Build
```bash
npm run build
# or
bun run build
```

### Preview Production Build
```bash
npm run preview
# or
bun run preview
```

## Pi Network Integration

This application integrates with Pi Network SDK to enable payments using Pi cryptocurrency.

### Setting up Pi Network SDK
1. Create a Pi app in the [Pi Developer Portal](https://developers.minepi.com/)
2. Configure Pi app credentials in `src/config/piNetwork.ts`
3. Implement authentication and payment flows

## Supabase Database Integration

To connect to the Supabase database:

1. Create an account at [Supabase](https://supabase.com) and create a new project
2. Get your project URL and API key from the Supabase dashboard
3. Add environment variables to the `.env` file

## Admin Dashboard

The administration dashboard allows platform administrators to:

- Manage restaurants and home food providers
- Monitor orders and payments
- Review user accounts and activity
- Access analytics and reporting
- Configure system settings

Access the admin dashboard at `/admin` (requires admin authentication).

## License

This project is licensed under the MIT License.
