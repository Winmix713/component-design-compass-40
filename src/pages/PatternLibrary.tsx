
import React from 'react';
import PatternCard from '@/components/PatternCard';
import { patterns } from '@/lib/componentData';

const PatternLibrary = () => {
  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pattern Library</h1>
        <p className="text-muted-foreground">
          Patterns are pre-built, reusable solutions to common design problems. 
          They combine multiple components to create user interfaces that solve 
          specific use cases.
        </p>
      </div>
      
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
