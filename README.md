# Container Tracking App

## Overview

The **Container Tracking App** is a React-based application designed to display and manage information about shipping containers. Users can view key container details, events, routes, and navigate through steps using an interactive stepper. The app also includes functionality for a dark mode switch, a date picker to simulate the current day, and a search bar to toggle the visibility of cards.

## Features

- **Card-Based UI**: The app uses cards to display container information, origin and destination details, events, and routes.
- **Search Bar for Card Visibility**: The search bar allows users to show/hide individual cards by searching their titles.
- **Stepper Navigation**: A stepper component allows users to navigate through different events related to the container.
- **Date Picker Simulation**: A date picker is provided to simulate the current day and navigate through the stepper component.
- **Dark Mode**: Toggle between dark and light modes for a customized user experience.
- **Sidebar**: The sidebar manages dark mode and date simulation.

## Folder Structure

```bash
src/
 ├── components/
 │    ├── Card.tsx              # Card component for displaying container information
 │    ├── ContainerInfo.tsx      # Container information component
 │    ├── ContainerEvents.tsx    # Container events component
 │    ├── ContainerMap.tsx       # Map displaying container route
 │    ├── Navigation.tsx         # Navigation component with search, dark mode, and date picker
 │    ├── Sidebar.tsx            # Sidebar to toggle card visibility
 │    └── Stepper.tsx            # Stepper for event navigation
 ├── context/
 │    └── ThemeContext.tsx       # Context for dark mode theme management
 ├── hooks/
 │    └── useTheme.tsx           # Custom hook for theme management
 ├── data/
 │    ├── BL.json                # Container data for the app
 │    ├── Cards.json             # Cards metadata used to render UI cards
 ├── styles/
 │    ├── App.css                # Global styles
 │    ├── Card.css               # Card styles
 │    ├── Sidebar.css            # Sidebar styles
 │    ├── Stepper.css            # Stepper styles
 ├── App.tsx                     # Main app component
 └── index.tsx                   # Application entry point
```

## Installation and Setup

1. **Clone the repository**:
```bash
git clone https://github.com/your-repo/container-tracking-app.git
cd container-tracking-app
```

2. **Install the dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm start
```

The app will be available at http://localhost:3000.

## How to Use

### Date Picker Simulation

The app features a `Date Picker` in the `Sidebar` to simulate the current day. This allows you to navigate through the `Stepper Component`, which shows container events chronologically.

- **Purpose**: The ``Date Picker` is used to simulate different days for testing the stepper navigation.
- **How it Works**: By selecting a date, you can simulate the current day and navigate between events in the container's lifecycle via the stepper.

### Searchbar For Card Visibility

The `Search Bar` in the navigation component allows users to toggle the visibility of individual cards. Cards can be searched by title, and only those that match the search term will be displayed.

- **Container Information**: Details like shipment number, status, importer, and invoice amount.
- **Origin and Destination Details**: Displays the container's origin and destination information.
- **Container Events**: Chronologically displays events like loading, unloading, etc.
- **Container Route**: Shows the map with the container’s route.

### Sidebar

The `Sidebar` manages two key features:

- **Dark Mode Toggle**: Allows users to switch between dark and light modes.
- **Date Picker**: : Used to simulate the current date for the stepper navigation.

### Stepper Navigation

The `Stepper Component` allows users to navigate through different events of the container. It visually represents the container's progress through different stages, and the current day (set using the date picker) determines which steps are accessible.

### Dark Mode

The `Dark Mode Toggle` is available in the navigation bar, allowing users to switch between light and dark themes. A [`Theme Context`](./src/context/ThemeContext.tsx) alongside a custom React Hook called [`useTheme`](./src/hooks/useTheme.tsx) are used to access the `Dark Mode` across the entire application.

## Technologies Used

- **React**: For building the UI components.
- **TypeScript**: For type-safe development.
- **Material-UI**: Used for stepper and other UI components.
- **React-Leaflet**: For rendering the map in the Container Route card.
- **Webpack**: For bundling the assets and managing the build process.
- **Babel**: For transpiling modern JavaScript and TypeScript code.
- **CSS**: Custom styles to handle layout, transitions, and dark mode.

## Future Improvements

- Add unit and integration testing.
- Enhance map features, including real-time tracking.
- Improve UI/UX based on user feedback.

## Deployment

This app is currently deployed through [`Netlify`](https://app.netlify.com/) as a netlify.app subdomain under the URL [`Container Tracking Information`](https://containertrackinginformation.netlify.app/).

## License

This project is licensed under the MIT License. See the [`LICENSE`](./LICENSE) file for details.
