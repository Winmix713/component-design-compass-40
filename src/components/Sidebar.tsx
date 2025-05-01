
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { componentCategories } from '@/lib/componentData';

type SidebarSection = {
  title: string;
  path: string;
  icon?: React.ReactNode;
};

const sections: SidebarSection[] = [
  { title: 'Getting Started', path: '/' },
  { title: 'Design Tokens', path: '/tokens' },
  { title: 'Pattern Library', path: '/patterns' },
  { title: 'Changelog', path: '/changelog' },
  { title: 'Integrations', path: '/integrations' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    componentCategories.map(cat => cat.name)
  );

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(cat => cat !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isComponentActive = (componentId: string) => {
    return location.pathname === `/components/${componentId}`;
  };

  return (
    <div className="w-64 h-screen border-r flex flex-col bg-sidebar">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Component search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-1 space-y-1">
          {/* Main Navigation Sections */}
          {sections.map((section) => (
            <Button
              key={section.title}
              variant={isActive(section.path) ? "secondary" : "ghost"}
              className={`w-full justify-start text-sm h-9 px-3 ${
                isActive(section.path) ? "font-medium" : "font-normal"
              }`}
              onClick={() => navigate(section.path)}
            >
              {section.title}
            </Button>
          ))}
          
          {/* Component Categories */}
          <div className="mt-6 space-y-1">
            {componentCategories.map((category) => (
              <div key={category.name}>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-sm h-9 px-3 font-medium"
                  onClick={() => toggleCategory(category.name)}
                >
                  {category.name}
                  {expandedCategories.includes(category.name) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                
                {expandedCategories.includes(category.name) && (
                  <div className="ml-4 space-y-1 mt-1">
                    {category.components.map((component) => (
                      <Button
                        key={component.id}
                        variant={isComponentActive(component.id) ? "secondary" : "ghost"}
                        className={`w-full justify-start text-sm h-8 px-3 ${
                          isComponentActive(component.id) ? "font-medium" : "font-normal"
                        } flex items-center`}
                        onClick={() => navigate(`/components/${component.id}`)}
                      >
                        <span>{component.name}</span>
                        {component.badge && (
                          <span className="ml-auto bg-primary-600 text-white text-xs rounded-full px-2 py-0.5">
                            {component.badge}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
      
      <div className="border-t p-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Version 2.1.4</span>
        <div className="flex items-center">
          <span>Admin Mode</span>
          <div className="ml-2 w-8 h-4 bg-muted rounded-full relative">
            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-background rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
