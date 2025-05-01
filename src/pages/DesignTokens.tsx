
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorTokens from '@/components/ColorTokens';
import TypographyTokens from '@/components/TypographyTokens';

const DesignTokens = () => {
  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Design Tokens</h1>
        <p className="text-muted-foreground">
          Design tokens are the visual design atoms of the design system — 
          named entities that store visual design attributes. They're used in place of 
          hard-coded values to ensure flexibility and unity across all product experiences.
        </p>
      </div>
      
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="shadows">Shadows</TabsTrigger>
          <TabsTrigger value="radius">Border Radius</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <ColorTokens />
        </TabsContent>
        
        <TabsContent value="typography">
          <TypographyTokens />
        </TabsContent>
        
        <TabsContent value="spacing">
          <div className="border rounded-md p-6">
            <h2 className="text-xl font-semibold mb-6">Spacing Scale</h2>
            <div className="space-y-8">
              {[0, 1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
                <div key={size} className="flex items-center gap-6">
                  <div className="w-16">
                    <p className="font-medium">{size}</p>
                    <p className="text-xs text-muted-foreground">
                      {size * 4}px
                    </p>
                  </div>
                  <div 
                    className={`h-8 bg-primary-600`}
                    style={{ width: `${size * 4}px` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="shadows">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Shadow / Small</h3>
                <p className="text-sm text-muted-foreground">shadow-sm</p>
              </div>
              <div className="bg-white rounded-md h-24 shadow-sm"></div>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Shadow / Medium</h3>
                <p className="text-sm text-muted-foreground">shadow</p>
              </div>
              <div className="bg-white rounded-md h-24 shadow"></div>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Shadow / Large</h3>
                <p className="text-sm text-muted-foreground">shadow-md</p>
              </div>
              <div className="bg-white rounded-md h-24 shadow-md"></div>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Shadow / Extra Large</h3>
                <p className="text-sm text-muted-foreground">shadow-lg</p>
              </div>
              <div className="bg-white rounded-md h-24 shadow-lg"></div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="radius">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Radius / Small</h3>
                <p className="text-sm text-muted-foreground">rounded-sm</p>
              </div>
              <div className="bg-primary-600 w-32 h-32 rounded-sm"></div>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Radius / Medium</h3>
                <p className="text-sm text-muted-foreground">rounded-md</p>
              </div>
              <div className="bg-primary-600 w-32 h-32 rounded-md"></div>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Radius / Large</h3>
                <p className="text-sm text-muted-foreground">rounded-lg</p>
              </div>
              <div className="bg-primary-600 w-32 h-32 rounded-lg"></div>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Radius / Full</h3>
                <p className="text-sm text-muted-foreground">rounded-full</p>
              </div>
              <div className="bg-primary-600 w-32 h-32 rounded-full"></div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DesignTokens;
