
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Component } from '@/lib/componentData';
import { Monitor, Tablet, Smartphone, Code, ExternalLink } from 'lucide-react';

interface ComponentPageProps {
  component: Component;
}

const ComponentPage: React.FC<ComponentPageProps> = ({ component }) => {
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedVariant, setSelectedVariant] = useState(component.variants?.[0] || 'Default');
  const [selectedState, setSelectedState] = useState(component.states?.[0] || 'Default');

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{component.name}</h1>
            <Badge variant="outline">{component.version}</Badge>
          </div>
          <p className="text-muted-foreground">{component.description}</p>
        </div>
        <div>
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Source
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="props">Props</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="border rounded-md p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                {component.variants && (
                  <div>
                    <p className="text-sm font-medium mb-2">Variant</p>
                    <div className="flex gap-2">
                      {component.variants.map((variant) => (
                        <Button
                          key={variant}
                          variant={selectedVariant === variant ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => setSelectedVariant(variant)}
                        >
                          {variant}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {component.states && (
                  <div className="ml-6">
                    <p className="text-sm font-medium mb-2">State</p>
                    <div className="flex gap-2">
                      {component.states.map((state) => (
                        <Button
                          key={state}
                          variant={selectedState === state ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => setSelectedState(state)}
                        >
                          {state}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant={activeView === 'desktop' ? "secondary" : "outline"} 
                  size="icon"
                  onClick={() => setActiveView('desktop')}
                >
                  <Monitor size={18} />
                </Button>
                <Button
                  variant={activeView === 'tablet' ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => setActiveView('tablet')}
                >
                  <Tablet size={18} />
                </Button>
                <Button
                  variant={activeView === 'mobile' ? "secondary" : "outline"}
                  size="icon"
                  onClick={() => setActiveView('mobile')}
                >
                  <Smartphone size={18} />
                </Button>
              </div>
            </div>

            <div className={`
              bg-accent p-12 rounded-md border flex items-center justify-center
              transition-all duration-300
              ${activeView === 'desktop' ? 'w-full' : activeView === 'tablet' ? 'max-w-md mx-auto' : 'max-w-xs mx-auto'}
            `}>
              <ComponentPreview 
                component={component}
                variant={selectedVariant}
                state={selectedState}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="border rounded-md p-6">
            <div className="bg-secondary rounded-md p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Code className="mr-2 h-4 w-4" />
                  <span className="text-sm font-medium">Example</span>
                </div>
                <Button variant="ghost" size="sm">Copy Code</Button>
              </div>
              <pre className="text-sm overflow-x-auto p-2 bg-background rounded">
                {`import { ${component.name} } from "@ui-components/${component.name.toLowerCase()}";

export default function ${component.name}Example() {
  return (
    <${component.name} 
      variant="${selectedVariant}"
      ${selectedState === 'Disabled' ? 'disabled' : ''}
    >
      ${component.name} Example
    </${component.name}>
  );
}`}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="props">
          <div className="border rounded-md p-6">
            <h3 className="text-lg font-medium mb-4">Properties</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Default</th>
                    <th className="text-left py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">variant</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {component.variants?.map(v => `"${v}"`).join(' | ') || 'string'}
                    </td>
                    <td className="py-3 px-4 text-sm">"Default"</td>
                    <td className="py-3 px-4">The visual style variant of the component</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">disabled</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">boolean</td>
                    <td className="py-3 px-4 text-sm">false</td>
                    <td className="py-3 px-4">Whether the component is disabled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">children</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">React.ReactNode</td>
                    <td className="py-3 px-4 text-sm">-</td>
                    <td className="py-3 px-4">The content to be rendered within the component</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="accessibility">
          <div className="border rounded-md p-6">
            <h3 className="text-lg font-medium mb-4">Accessibility Guidelines</h3>
            <p className="mb-4">
              This component follows WAI-ARIA practices for accessible user interfaces. 
              Below are the key accessibility features:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Proper ARIA roles are applied based on component functionality</li>
              <li>Keyboard navigation support for interactive elements</li>
              <li>Adequate color contrast ratios for text and background combinations</li>
              <li>Screen reader announcements for state changes</li>
              <li>Focus management for interactive elements</li>
            </ul>
            <h4 className="text-md font-medium mt-6 mb-2">Keyboard Interactions</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Key</th>
                    <th className="text-left py-3 px-4">Function</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium">Tab</td>
                    <td className="py-2 px-4">Moves focus to the component</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4 font-medium">Enter/Space</td>
                    <td className="py-2 px-4">Activates the component</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <div className="border rounded-md p-6">
            <h3 className="text-lg font-medium mb-4">Usage Guidelines</h3>
            <p className="mb-4">
              The {component.name} component should be used in the following contexts:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Primary actions that require user interaction</li>
              <li>Form submissions and confirmations</li>
              <li>Navigation between major sections of the application</li>
            </ul>
            <div className="bg-muted p-4 rounded-md mb-6">
              <h4 className="text-md font-medium mb-2">Best Practices</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use primary variant for main actions, secondary for alternative options</li>
                <li>Keep button text concise and action-oriented</li>
                <li>Include an icon only when it adds meaningful context</li>
                <li>Ensure adequate spacing between multiple buttons</li>
              </ul>
            </div>
            <div className="bg-destructive/10 p-4 rounded-md">
              <h4 className="text-md font-medium mb-2 text-destructive">Avoid</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Using too many primary buttons in a single view</li>
                <li>Placing buttons too close to other interactive elements</li>
                <li>Using vague or generic button text like "Click Here"</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ComponentPreviewProps {
  component: Component;
  variant: string;
  state: string;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ component, variant, state }) => {
  // This would be a real implementation using the actual components
  // For this demo, we'll render placeholder UI based on the component type
  
  if (component.id === 'button') {
    const getButtonClass = () => {
      let classes = 'px-4 py-2 rounded-md font-medium';
      
      // Variant classes
      if (variant === 'Primary') {
        classes += ' bg-primary-600 text-white hover:bg-primary-700';
      } else if (variant === 'Secondary') {
        classes += ' bg-gray-200 text-gray-800 hover:bg-gray-300';
      } else if (variant === 'Text') {
        classes += ' text-primary-600 hover:underline';
      } else if (variant === 'Icon') {
        classes = 'p-2 rounded-md bg-primary-600 text-white';
      }
      
      // State classes
      if (state === 'Disabled') {
        classes += ' opacity-50 cursor-not-allowed';
      } else if (state === 'Hover') {
        classes += ' ring-2 ring-primary-300';
      } else if (state === 'Focus') {
        classes += ' ring-2 ring-primary-500 ring-offset-2';
      }
      
      return classes;
    };
    
    return (
      <button className={getButtonClass()} disabled={state === 'Disabled'}>
        {variant === 'Icon' ? '★' : 'Button'}
      </button>
    );
  }
  
  if (component.id === 'input') {
    const getInputClass = () => {
      let classes = 'px-3 py-2 rounded-md border';
      
      // Variant classes
      if (variant === 'Default' || variant === 'Outlined') {
        classes += ' border-gray-300 bg-white';
      } else if (variant === 'Filled') {
        classes += ' border-transparent bg-gray-100';
      }
      
      // State classes
      if (state === 'Focus') {
        classes += ' ring-2 ring-primary-500 border-primary-500';
      } else if (state === 'Error') {
        classes += ' border-red-500 ring-1 ring-red-500';
      } else if (state === 'Disabled') {
        classes += ' bg-gray-100 text-gray-400 cursor-not-allowed';
      }
      
      return classes;
    };
    
    return (
      <div className="w-full max-w-xs">
        <label className="block text-sm font-medium mb-1">Input Label</label>
        <input 
          type="text" 
          className={getInputClass()} 
          placeholder="Enter text"
          disabled={state === 'Disabled'}
        />
        {state === 'Error' && (
          <p className="mt-1 text-sm text-red-500">Error message here</p>
        )}
      </div>
    );
  }

  // Default component preview
  return (
    <div className="border border-dashed border-gray-300 p-6 text-center rounded-md bg-white">
      <p className="text-muted-foreground">{component.name} Preview</p>
      <p className="text-sm text-muted-foreground mt-1">Variant: {variant}</p>
      <p className="text-sm text-muted-foreground">State: {state}</p>
    </div>
  );
};

export default ComponentPage;
