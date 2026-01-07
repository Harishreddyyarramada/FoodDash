# FoodDash - A Swiggy-Style Food Delivery App

Welcome to FoodDash, a modern, feature-rich food delivery application designed with a production-grade architecture, built using Next.js. This project showcases a premium user experience, from real-time search to live order tracking.

This version of the project has been configured to run entirely on your local machine with mock data, requiring no external backend or database setup.

## Core Features

*   **Dynamic Homepage:** A vibrant and intuitive landing page featuring a real-time dish and restaurant search bar.
*   **"What's on your mind?" Section:** Quick links to search for popular food categories like Pizza, Burgers, and Biryani.
*   **Restaurant Recommendations:** A "Recommended for you" section suggesting popular restaurants.
*   **Geolocation:** A "Near Me" feature that simulates finding famous local dishes using the Geolocation API.
*   **Detailed Restaurant Pages:** Each restaurant has a dedicated page with its name, cuisine, rating, delivery time, and a filterable menu.
*   **Real-Time Cart System:** A persistent shopping cart with multi-restaurant detection to prevent mixed orders.
*   **Seamless Checkout:** A multi-step checkout process with delivery information, payment methods, and an order summary.
*   **Live Delivery Simulation:** The checkout page simulates real-time availability of delivery partners.
*   **Order Tracking:** After placing an order, users are directed to a live tracking page that follows the order lifecycle: `PLACED` → `ACCEPTED` → `PREPARING` → `PICKED` → `ON_THE_WAY` → `DELIVERED`.
*   **Order Cancellation:** Users have a two-minute window to cancel their order directly from the tracking page.
*   **Mock Authentication:** A simple and secure mock authentication system for user signup and login.
*   **User Profile Management:** A dedicated page for users to view and manage their profile information.
*   **Comprehensive Help Center:** A well-structured FAQ section to assist users with common questions.
*   **Offers Page:** A dedicated page showcasing various coupons and restaurant deals.

## Technology Stack

*   **Frontend:** [Next.js](https://nextjs.org/) 15 (App Router), [React](https://reactjs.org/) 19, [TypeScript](https://www.typescriptlang.org/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **State Management:** React Context API for cart management.
*   **Icons:** [Lucide React](https://lucide.dev/)

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
│   ├── hooks/              # Custom React hooks (e.g., useToast)
│   ├── lib/                # Shared utilities, mock data, and type definitions
│   │   ├── data.ts         # Mock data for restaurants and menu items
│   │   ├── types.ts        # TypeScript type definitions for the app
│   │   └── utils.ts        # Utility functions
├── public/                 # Static assets
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

### 3. Run the Development Server

Now, you can start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## Available Scripts

*   `npm run dev`: Starts the Next.js development server.
*   `npm run build`: Creates a production-ready build of the application.
*   `npm run start`: Starts the application in production mode (requires `npm run build` first).
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run typecheck`: Runs the TypeScript compiler to check for type errors.
```