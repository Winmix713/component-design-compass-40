
import React from 'react';
import PatternCard from '@/components/PatternCard';
import { patterns } from '@/lib/componentData';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useAdmin } from '@/context/AdminContext';

const PatternLibrary = () => {
  const { isAdminMode } = useAdmin();
  
  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Pattern Library', href: '/patterns', current: true }
  ];

  return (
    <div className="p-6 max-w-5xl">
      <Breadcrumbs items={breadcrumbItems} className="mb-4" />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pattern Library</h1>
        <p className="text-muted-foreground">
          Patterns are pre-built, reusable solutions to common design problems. 
          They combine multiple components to create user interfaces that solve 
          specific use cases.
        </p>
      </div>
      
      {isAdminMode && (
        <div className="mb-6 p-4 border border-primary/20 rounded-md bg-background/50">
          <h2 className="text-sm font-medium mb-2">Admin Options</h2>
          <div className="flex space-x-2">
            <button className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded">
              Add New Pattern
            </button>
            <button className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded">
              Manage Categories
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patterns.map((pattern) => (
          <PatternCard 
            key={pattern.id}
            id={pattern.id}
            name={pattern.name}
            description={pattern.description}
            image={pattern.image}
          />
        ))}
      </div>
    </div>
  );
};

export default PatternLibrary;
