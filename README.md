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

3. **Start the development server:**

```bash
npm start
```

The app will be available at http://localhost:3000.

## How to Use
### Date Picker Simulation

The app features a date picker in the `sidebar` to simulate the current day. This allows you to navigate through the Stepper component, which shows container events chronologically.

- **Purpose**: The date picker is used to simulate different days for testing the stepper navigation.
- **How it Works**: By selecting a date, you can simulate the current day and navigate between events in the container's lifecycle via the stepper.

### Searchbar

The sarchbar lets you toggle the visibility of different cards:

- **Container Information**: Details like shipment number, status, importer, and invoice amount.
- **Origin and Destination Details**: Displays the container's origin and destination information.
- **Container Events**: Chronologically displays events like loading, unloading, etc.
- **Container Route**: Shows the map with the container’s route.

The sidebar also contains a search bar and a dark mode switch.
Stepper Navigation

The Stepper component allows users to navigate through different events of the container. It visually represents the container's progress through different stages, and the current day (set using the date picker) determines which steps are accessible.
Dark Mode

The dark mode toggle is available in the navigation bar, allowing users to switch between light and dark themes.
Technologies Used

    React: For building the UI components.
    TypeScript: For type-safe development.
    Material-UI: Used for stepper and other UI components.
    React-Leaflet: For rendering the map in the Container Route card.
    CSS: Custom styles to handle layout, transitions, and dark mode.

Future Improvements

    Add unit and integration testing.
    Enhance map features, including real-time tracking.
    Improve UI/UX based on user feedback.

License

This project is licensed under the MIT License. See the LICENSE file for details.
