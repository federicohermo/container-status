import React, { useEffect, useState } from 'react';
import ContainerInfo from './components/ContainerInfo'; // Import your ContainerInfo component
import Navigation from './components/Navigation';
import Loading from './components/Loading';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import './styles/App.css'; // Import your global or app-specific styles
import BL from './data/BL.json'; // Container Data
import Cards from './data/Cards.json'; // Cards Data
import Sidebar from './components/SideBar';

const AppContent: React.FC = () => {
  const [containerData, setContainerData] = useState<any>(null);
  const [filteredCard, setFilteredCard] = useState<any>(null);
  const [cardsData, setCardsData] = useState<any>(null);
  const { isDarkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);

  useEffect(() => {
    fetchContainerData();
  }, []);

  // Simulate fetching data from an API
  const fetchContainerData = async () => {
    try {
      // Simulate delay
      setTimeout(() => {
        setContainerData(BL);
        setCardsData(Cards.cards); 
        setFilteredCard(Cards.cards); // Initially set the filtered data as the full dataset
      }, 1000);
    } catch(error) {
      console.log(error)
    }
  };

  // Function to filter container data based on search input
  const handleSearch = (searchTerm: string) => {
    
    if (searchTerm !== '') {
      // Filter data based on the search term (for example, searching by container name)
      const filtered = filteredCard && filteredCard.filter((item: any) => {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    });
      
      setFilteredCard(filtered);
    }
    else {
      setFilteredCard(cardsData)
    }
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSidebarToggle = (sidebarToggle: boolean) => {
    setSidebarToggle(sidebarToggle)
  };

  if (!containerData) {
    return <Loading message='Loading...'/>; // Placeholder while data is being fetched
  }

  return (
      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <div style={{width:'100%', display: 'flex'}}>
          {/* Sidebar to toggle dark mode and select a date */}
          <Sidebar 
            onDateChange={handleDateChange}
            sidebarToggle={sidebarToggle}
          />
          </div>

          {/* Navigation bar to search for individual cards and toggle the Sidebar */}
          <Navigation
            onSearch={handleSearch} 
            onDateChange={handleDateChange}
            onSidebarToggle={handleSidebarToggle}
          />
          
          {/* Pass the filtered container data to ContainerInfo */}
          <ContainerInfo containerData={containerData} filteredCard={filteredCard} selectedDate={selectedDate && selectedDate}/>
      </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
  );
}

export default App;
