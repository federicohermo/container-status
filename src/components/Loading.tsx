// src/components/Loading.tsx

import React from 'react';
import '../styles/Loading.css';

interface LoadingProps {
  message?: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="loading-overlay flex-column">
      <div className="spinner"></div>
      <p>{message || 'Loading...'}</p>
    </div>
  );
};

export default Loading;
