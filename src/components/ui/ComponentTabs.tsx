
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

export interface ComponentTab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface ComponentTabsProps {
  tabs: ComponentTab[];
  defaultTab?: string;
  className?: string;
}

const ComponentTabs: React.FC<ComponentTabsProps> = ({
  tabs,
  defaultTab,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value);

  return (
    <Tabs 
      defaultValue={activeTab} 
      className={cn("w-full", className)}
      onValueChange={setActiveTab}
    >
      <TabsList className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ComponentTabs;
