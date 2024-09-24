import React from 'react';
import { useTheme } from '../hooks/useTheme';
import '../styles/Card.css'; // Define styles separately

interface CardProps {
  title: string;
  children: React.ReactNode;
  gridArea?: string;
}

const Card: React.FC<CardProps> = ({ title, children, gridArea}) => {
  const {isDarkMode} = useTheme()
  return (
    <div className={`card ${isDarkMode ? "dark-mode" : ""} ${gridArea}`} >
      <h3 className={`card-title ${isDarkMode ? "dark-mode" : ""}`}>{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;
