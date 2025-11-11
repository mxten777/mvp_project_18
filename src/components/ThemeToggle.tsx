import React, { useState, useEffect } from 'react';
import Button from './common/Button';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  console.log('ThemeToggle rendered, current theme:', theme);

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group hover:scale-110 transition-all duration-300 bg-gradient-to-r from-amber-400 to-orange-500 dark:from-blue-500 dark:to-purple-600 border-2 border-white/20 shadow-lg"
      aria-label={`${theme === 'light' ? '?§ÌÅ¨' : '?ºÏù¥??} Î™®ÎìúÎ°??ÑÌôò`}
    >
      {theme === 'light' ? (
        <svg
          className="w-5 h-5 transition-all duration-300 rotate-0 scale-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      ) : (
        <svg
          className="w-5 h-5 transition-all duration-300 rotate-0 scale-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
      
      {/* Î∞òÏßù?¥Îäî ?®Í≥º */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
};

export default ThemeToggle;
