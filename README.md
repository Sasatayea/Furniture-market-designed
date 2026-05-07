# AETHER Luxury Furniture Platform

A premium, fully-responsive e-commerce platform built with React and Material UI, featuring a luxury storefront ("Obsidian Command Center" theme) and a comprehensive back-office Admin Dashboard. 

## 🌟 Key Features

### Storefront
* **Luxury Design System**: Bespoke dark-mode Material UI (MUI) design system.
* **Internationalization (i18n)**: Seamless English (EN) and Arabic (AR) switching with full Right-to-Left (RTL) dynamic layout support.
* **Product Discovery**: Dynamic product grid with hover-reveal actions, image zoom, and categorical filtering.
* **Shopping Journey**: Persistent Cart and Favorites management powered by Redux Toolkit.
* **Authentication**: Beautifully designed login and user profile dashboards.

### Admin Dashboard
* **KPI Metrics**: Real-time business metrics displayed via sleek, animated cards.
* **Data Visualization**: Integrated `recharts` for Sales Overview and Product Categories analytics.
* **Product Management**: Full-featured MUI `DataGrid` connected to the backend for adding, editing, and managing product inventory. 

## 🛠️ Tech Stack

* **Frontend Framework**: React 18 with Vite
* **UI Component Library**: Material UI (MUI v5)
* **State Management**: Redux Toolkit (`cartSlice`, `favoriteSlice`, `adminProductsSlice`, `userSlice`)
* **Routing**: React Router DOM
* **Localization**: `react-i18next`
* **Data Visualization**: Recharts
* **Data Tables**: MUI X-DataGrid

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js installed. The backend requires Express and Stripe for checkout processing.

```bash
# Required backend dependencies
npm install cors express stripe
```

### Installation

1. Clone the repository and navigate to the directory:
```bash
cd my-market-designed
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server (runs on port 5000):
```bash
node server.js
```

4. Start the Vite development server (runs on port 5173):
```bash
npm run dev
```

## 📂 Project Architecture

```
src/
├── components/
│   ├── admin/         # Admin Dashboard components (Charts, Tables, Sidebar)
│   ├── ...            # Storefront components (Navebare, Footer, FurnitureGrid)
├── pages/
│   ├── admin/         # Admin routes (Dashboard, Products, About)
│   ├── ...            # Storefront routes (Home, ShoppingBag, FavoritePage, Login)
├── redux/
│   ├── slices/        # Redux slices for global state management
│   ├── store.js       # Global Redux store configuration
├── theme/
│   ├── theme.js       # Global MUI theme configuration (Colors, Typography, RTL)
├── i18n/
│   ├── en.json        # English localization strings
│   ├── ar.json        # Arabic localization strings
│   └── i18n.js        # i18next configuration
└── App.jsx            # Main application routing and theme provider
```

## 🌐 Localization

The platform uses `react-i18next` for translation. 
* Language toggling automatically updates the `dir` attribute on the document body.
* The MUI `ThemeProvider` respects the layout direction, automatically mirroring layout spacing and icons for the Arabic interface.