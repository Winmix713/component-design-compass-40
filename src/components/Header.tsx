
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, Settings, User } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="h-16 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-4">
        <div 
          className="font-bold text-lg cursor-pointer flex items-center gap-2" 
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-primary-600 text-white rounded flex items-center justify-center font-bold">
            UI
          </div>
          <span>UI Components</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {window.location.pathname !== '/' && (
            <div className="flex items-center gap-1">
              <span 
                className="hover:text-foreground cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </span>
              <span className="mx-1">/</span>
              <span className="text-foreground">
                {window.location.pathname.split('/')[1]?.charAt(0).toUpperCase() + window.location.pathname.split('/')[1]?.slice(1) || ''}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
        >
          <Settings size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="User profile"
        >
          <User size={18} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
