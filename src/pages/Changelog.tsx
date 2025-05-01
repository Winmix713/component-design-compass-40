
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { changelogEntries } from '@/lib/componentData';

const Changelog = () => {
  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Changelog</h1>
        <p className="text-muted-foreground">
          A detailed record of all notable changes made to the UI Component library and Design System.
        </p>
      </div>
      
      <div className="space-y-12">
        {changelogEntries.map((entry) => (
          <div key={entry.version} className="border-l-4 border-primary-600 pl-6">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Version {entry.version}</h2>
              <span className="mx-3 text-muted-foreground">•</span>
              <span className="text-muted-foreground">{entry.date}</span>
            </div>
            
            <div className="space-y-3">
              {entry.changes.map((change, index) => (
                <div key={index} className="flex gap-3">
                  <Badge 
                    className={`
                      ${change.type === 'Added' ? 'bg-green-500' : ''}
                      ${change.type === 'Changed' ? 'bg-blue-500' : ''}
                      ${change.type === 'Fixed' ? 'bg-amber-500' : ''}
                    `}
                  >
                    {change.type}
                  </Badge>
                  <p>{change.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Changelog;
