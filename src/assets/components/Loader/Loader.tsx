import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme/useTheme';

interface LoaderProps {
  className?: string; 
  loader_name?: string;
}

const Loader: React.FC<LoaderProps> = ({ className = '', loader_name = '' }) => {
  const [dots, setDots] = useState('');
  const {dark} = useTheme();

  useEffect(() => {
    console.log('Dots:', dots); // Debug
    const interval = setInterval(() => {
      setDots((prev) => (prev === '' ? '.' : prev === '.' ? '..' : prev === '..' ? '...' : ''));
    }, 300); // 300ms per dot, 1.2s cycle
    return () => clearInterval(interval);
  }, [dots]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center 
    ${className}`} style={{ backgroundColor: dark?'var(--color-body-dark)':'var(--color-body-light)' }}>
      <style>
        {`
          @keyframes fillProgress {
            0% { stroke-dashoffset: 283; }
            100% { stroke-dashoffset: 0; }
          }
          .dots {
            display: inline-block;
            width: 1.5em; /* Fixed width to prevent shift */
            text-align: left;
          }
        `}
      </style>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24">
          <svg className="absolute inset-0 z-0" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3F9BD966" // 40% opacity
              strokeWidth="1"
            />
          </svg>
          <svg className="absolute inset-0 z-10" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3F9BD9"
              strokeWidth="1"
              strokeDasharray="283"
              strokeDashoffset="283"
              strokeLinecap="round"
              className="animate-[fillProgress_3s_ease-in-out]"
            />
          </svg> 
          
        </div>
        <p className="text-lg font-bold animate-pulse" 
        style={{ color: dark?'var(--color-text-primary-dark)':'var(--color-text-primary-light)' }}>
          {loader_name}<span className="dots">{dots}</span>
        </p>
      </div>
    </div>
  );
};

export default Loader;
