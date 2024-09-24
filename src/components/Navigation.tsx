import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppBar, Toolbar, InputBase, Typography, ToggleButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '../hooks/useTheme'
import { styled } from '@mui/system';
import '../styles/App.css'
import '../styles/Settings.css'

interface NavigationProps {
  onSearch: (searchTerm: string) => void;
  onDateChange: (date: Date | null) => void; 
  onSidebarToggle: (sidebarToggle: boolean) => void;
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const Navigation: React.FC<NavigationProps> = ({ onSearch, onDateChange, onSidebarToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const searchRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const sunIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.7rem' height='1.7rem' viewBox='0 0 256 256'%3E%3Cg fill='%2300a76f'%3E%3Cpath d='M184 128a56 56 0 1 1-56-56a56 56 0 0 1 56 56' opacity='0.2'/%3E%3Cpath d='M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0m72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64m-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48M58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32M192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72m5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8m80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8m112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16'/%3E%3C/g%3E%3C/svg%3E"
  const moonIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.7rem' height='1.7rem' viewBox='0 0 256 256'%3E%3Cg fill='%2300a76f'%3E%3Cpath d='M102.38 17.62a64.06 64.06 0 0 1-76.76 76.76A64.12 64.12 0 0 0 63 138.93a44.08 44.08 0 0 1 43.33-8.54a68.13 68.13 0 0 1 45.47-47.32h.15c0-1 .07-2 .07-3a64 64 0 0 0-49.64-62.45' opacity='0.2'/%3E%3Cpath d='M172 72a76.5 76.5 0 0 0-12.36 1a71.93 71.93 0 0 0-55.47-63.17a8 8 0 0 0-9.59 9.58A56.05 56.05 0 0 1 40 88a56.5 56.5 0 0 1-12.59-1.42a8 8 0 0 0-9.59 9.59a72.22 72.22 0 0 0 32.29 45.06A52 52 0 0 0 92 224h80a76 76 0 0 0 0-152M37.37 104H40a72.08 72.08 0 0 0 72-72v-2.67a55.63 55.63 0 0 1 32 48a76.28 76.28 0 0 0-43 43.4a52 52 0 0 0-39 8.86A56.22 56.22 0 0 1 37.37 104M172 208H92a36 36 0 1 1 4.78-71.69c-.37 2.37-.63 4.79-.77 7.23a8 8 0 0 0 16 .92a59 59 0 0 1 1.88-11.81c0-.16.09-.32.12-.48A60.06 60.06 0 1 1 172 208'/%3E%3C/g%3E%3C/svg%3E"

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); // Trigger search on change
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date); // Trigger the callback to pass the date to Stepper
  };

  const handleSearchIconClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
    if (!isSearchBarOpen) {
      searchRef.current && (searchRef.current as HTMLElement).focus();
    }
  };

  const handleSearchBarClose = useCallback(() => {
    if (!searchTerm) {
      setIsSearchBarOpen(false);
    }
  }, [searchTerm])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchRef.current && !(searchRef.current as HTMLElement).contains(event.target as Node)) {
      handleSearchBarClose();
    }
  }, [searchRef, handleSearchBarClose])

  const handleSidebarToggle = () => {
    setSidebarToggle(!sidebarToggle)
    onSidebarToggle(!sidebarToggle)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    
      <AppBar position="static" color="transparent" elevation={0} className={`nav-bar ${isDarkMode ? 'dark-mode' : ''}`} >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <div className='navigation-tools flex-row'>
          {/* Sidebar Toggle */}
          <div className={`menu-bar ${isDarkMode ? 'dark-mode' : ''}`}>
          <ToggleButton
            value="check"
            onChange={handleSidebarToggle}
            className={`menu-button ${isDarkMode ? 'dark-mode' : ''}`}
          >
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1rem' height='1rem' viewBox='0 0 24 24'%3E%3Cpath fill='%2300a76f' d='M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z'/%3E%3C/svg%3E" alt="Sidebar" />
          </ToggleButton>
          </div>
          {/* Application Name */}
          <Typography variant="h6" noWrap className={`app-title ${isDarkMode ? "dark-mode" : ""}`} >
            Tracking Information
          </Typography>
        </div>

        <div className='navigation-tools flex-row'>
          {/* Search Bar */}
          <div className={`searchbar ${isSearchBarOpen ? 'open' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
            {isSearchBarOpen ? (
              <>
                <StyledInputBase
                  placeholder="Search…"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  inputProps={{ 'aria-label': 'search' }}
                  ref={searchRef}
                  sx={{
                    '& .MuiInputBase-input': isDarkMode ? 
                      {color: 'var(--light-color)', fontFamily:'var(--font-primary)'} : 
                      {color: 'var(--dark-color)', fontFamily:'var(--font-primary)'}
                  }}
                />
                <SearchIcon 
                  sx={{ 
                    pointerEvents: 'none', 
                    height: '100%'
                  }} 
                />
              </>
            ) : (
              <ToggleButton
                value="check"
                onChange={handleSearchIconClick} 
                style={{ 
                  border: 'none', 
                  background: 'transparent', 
                  cursor: 'pointer',
                  color: 'white'
                }}
                className={isDarkMode ? 'dark-mode' : ''}
              >
                <SearchIcon sx={isDarkMode ? {fill:'white'} : {fill:'var(--secondary-color)'}}/>
              </ToggleButton>
            )}
          </div>

          
        </div>
        </Toolbar>
      </AppBar>
  );
};

export default Navigation;
