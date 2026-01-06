# FoodDash - A Swiggy-Style Food Delivery App

Welcome to FoodDash, a modern, feature-rich food delivery application designed with a production-grade architecture, built using Next.js, Firebase, and Google's Generative AI. This project showcases a premium user experience, from real-time search to live order tracking.

## Core Features

*   **Dynamic Homepage:** A vibrant and intuitive landing page featuring a real-time dish and restaurant search bar.
*   **AI-Powered Recommendations:** "Recommended for you" section that suggests restaurants based on user preferences.
*   **Geolocation:** A "Near Me" feature that uses the Geolocation API to find famous local dishes and displays the user's current area.
*   **Detailed Restaurant Pages:** Each restaurant has a dedicated page with its name, cuisine, rating, delivery time, menu, and more.
*   **Real-Time Cart System:** A persistent shopping cart with multi-restaurant detection to prevent mixed orders.
*   **Seamless Checkout:** A multi-step checkout process with delivery information, payment methods, and an order summary.
*   **Live Delivery Partner Simulation:** The checkout page simulates real-time availability of delivery partners, showing how many are nearby and providing estimated pickup times.
*   **State-Machine Driven Order Tracking:** After placing an order, users are directed to a live tracking page that follows the order lifecycle: `PLACED` → `ACCEPTED` → `PREPARING` → `PICKED` → `ON_THE_WAY` → `DELIVERED`.
*   **Order Cancellation:** Users have a two-minute window to cancel their order directly from the tracking page.
*   **Authentication:** A complete and secure authentication system for user signup and login, including Google sign-in.
*   **User Profile Management:** A dedicated page for users to view and manage their profile information.
*   **Comprehensive Help Center:** A well-structured FAQ section to assist users with common questions.

## Technology Stack

*   **Frontend:** [Next.js](https://nextjs.org/) 15 (App Router), [React](https://reactjs.org/) 19, [TypeScript](https://www.typescriptlang.org/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Backend & Database:** [Firebase](https://firebase.google.com/) (Firestore for database, Firebase Authentication for users)
*   **Generative AI:** [Google Genkit](https://firebase.google.com/docs/genkit) for AI-powered features like search and recommendations.
*   **State Management:** React Context API for cart management.

## Folder Structure

```
food-dash/
├── src/
│   ├── app/                # Next.js App Router pages and layouts
│   │   ├── (pages)/        # Route groups for all main pages
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles and Tailwind directives
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Authentication-related components (UserNav, etc.)
│   │   ├── cart/           # Shopping cart components and context
│   │   ├── home/           # Components specific to the homepage
│   │   ├── layout/         # Header and Footer
│   │   ├── orders/         # Order tracking components
│   │   ├── recommendations/# Recommendation carousels
│   │   ├── restaurants/    # Restaurant and menu item cards/lists
│   │   └── ui/             # ShadCN UI components
│   ├── firebase/           # Firebase configuration, providers, and hooks
│   ├── hooks/              # Custom React hooks (e.g., useToast)
│   ├── lib/                # Shared utilities, mock data, and type definitions
│   │   ├── data.ts         # Mock data for restaurants and menu items
│   │   ├── types.ts        # TypeScript type definitions for the app
│   │   └── utils.ts        # Utility functions
│   └── ai/                 # Genkit flows for AI features
│       ├── flows/          # AI flow implementations
│       └── genkit.ts       # Genkit initialization
├── public/                 # Static assets
├── docs/                   # Backend and data model definitions
│   └── backend.json        # Firestore schema and entity definitions
├── firestore.rules         # Firebase security rules
└── package.json            # Project dependencies and scripts
```

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### 1. Clone the Repository

First, clone the project from GitHub to your local machine:

```bash
git clone https://github.com/your-username/food-dash.git
cd food-dash
```

### 2. Install Dependencies

Install all the required npm packages:

```bash
npm install
```

### 3. Set Up Environment Variables

This project uses Firebase. You will need to create a `.env.local` file in the root of the project and add your Firebase project configuration keys. You can get these from the Firebase Console.

```.env.local
# Firebase Environment Variables
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
```

### 4. Run the Development Server

Now, you can start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## Available Scripts

*   `npm run dev`: Starts the Next.js development server with Turbopack.
*   `npm run build`: Creates a production-ready build of the application.
*   `npm run start`: Starts the application in production mode (requires `npm run build` first).
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
