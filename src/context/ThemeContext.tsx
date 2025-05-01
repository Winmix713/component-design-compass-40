import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

export type ColorToken = {
  name: string;
  value: string;
};

export interface ThemeColors {
  blue: ColorToken[];
  gray: ColorToken[];
  red: ColorToken[];
  green: ColorToken[];
}

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  colors: ThemeColors;
  updateColors: (newColors: Partial<ThemeColors>) => void;
  radius: string;
  setRadius: (radius: string) => void;
}

const initialColors: ThemeColors = {
  blue: [
    { name: "blue-50", value: "#EFF6FF" },
    { name: "blue-100", value: "#DBEAFE" },
    { name: "blue-200", value: "#BFDBFE" },
    { name: "blue-300", value: "#93C5FD" },
    { name: "blue-400", value: "#60A5FA" },
    { name: "blue-500", value: "#3B82F6" },
    { name: "blue-600", value: "#2563EB" },
    { name: "blue-700", value: "#1D4ED8" },
    { name: "blue-800", value: "#1E40AF" },
    { name: "blue-900", value: "#1E3A8A" },
  ],
  gray: [
    { name: "gray-50", value: "#F9FAFB" },
    { name: "gray-100", value: "#F3F4F6" },
    { name: "gray-200", value: "#E5E7EB" },
    { name: "gray-300", value: "#D1D5DB" },
    { name: "gray-400", value: "#9CA3AF" },
    { name: "gray-500", value: "#6B7280" },
    { name: "gray-600", value: "#4B5563" },
    { name: "gray-700", value: "#374151" },
    { name: "gray-800", value: "#1F2937" },
    { name: "gray-900", value: "#111827" },
  ],
  red: [
    { name: "red-50", value: "#FEF2F2" },
    { name: "red-100", value: "#FEE2E2" },
    { name: "red-200", value: "#FECACA" },
    { name: "red-300", value: "#FCA5A5" },
    { name: "red-400", value: "#F87171" },
    { name: "red-500", value: "#EF4444" },
    { name: "red-600", value: "#DC2626" },
    { name: "red-700", value: "#B91C1C" },
    { name: "red-800", value: "#991B1B" },
    { name: "red-900", value: "#7F1D1D" },
  ],
  green: [
    { name: "green-50", value: "#ECFDF5" },
    { name: "green-100", value: "#D1FAE5" },
    { name: "green-200", value: "#A7F3D0" },
    { name: "green-300", value: "#6EE7B7" },
    { name: "green-400", value: "#34D399" },
    { name: "green-500", value: "#10B981" },
    { name: "green-600", value: "#059669" },
    { name: "green-700", value: "#047857" },
    { name: "green-800", value: "#065F46" },
    { name: "green-900", value: "#064E3B" },
  ],
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
  colors: initialColors,
  updateColors: () => {},
  radius: '0.5rem',
  setRadius: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [colors, setColors] = useState<ThemeColors>(initialColors);
  const [radius, setRadius] = useState('0.5rem');

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      // Use system preference as default
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Check for saved colors
    const savedColors = localStorage.getItem('colors');
    if (savedColors) {
      try {
        setColors(JSON.parse(savedColors));
      } catch (e) {
        console.error('Failed to parse saved colors:', e);
      }
    }

    // Check for saved radius
    const savedRadius = localStorage.getItem('radius');
    if (savedRadius) {
      setRadius(savedRadius);
    }
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'light';
      // If system, use the opposite of the current system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'light' : 'dark';
    });
  };

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Save colors preference
    localStorage.setItem('colors', JSON.stringify(colors));
    
    // Apply CSS variables for colors
    const root = document.documentElement;
    Object.values(colors).flat().forEach(color => {
      root.style.setProperty(`--color-${color.name}`, color.value);
    });
  }, [colors]);

  useEffect(() => {
    // Save radius preference
    localStorage.setItem('radius', radius);
    
    // Apply CSS variable for border radius
    const root = document.documentElement;
    root.style.setProperty('--radius', radius);
  }, [radius]);

  const updateColors = (newColors: Partial<ThemeColors>) => {
    setColors(prevColors => ({
      ...prevColors,
      ...newColors,
    }));
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme,
        toggleTheme,
        colors, 
        updateColors, 
        radius, 
        setRadius 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

// Export the context as default
export default ThemeContext;
