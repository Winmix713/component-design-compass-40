
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findComponentById } from '@/lib/componentData';
import NotFound from './NotFound';
import { Monitor, Tablet, Smartphone, Code, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ComponentPreview from '@/components/ui/ComponentPreview';
import ComponentEditor from '@/components/admin/ComponentEditor';
import ComponentTabs from '@/components/ui/ComponentTabs';
import CopyCommand from '@/components/ui/CopyCommand';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useAdmin } from '@/context/AdminContext';

const ComponentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const component = id ? findComponentById(id) : undefined;
  const { isAdminMode, isEditing, setIsEditing } = useAdmin();
  
  const [activeView, setActiveView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedVariant, setSelectedVariant] = useState(component?.variants?.[0] || 'Default');
  const [selectedState, setSelectedState] = useState(component?.states?.[0] || 'Default');
  
  if (!component) {
    return <NotFound />;
  }

  // Create breadcrumb items
  const breadcrumbItems = [
    { title: 'Home', href: '/' },
    { title: 'Components', href: '/' },
    { title: component.name, href: `/components/${component.id}`, current: true }
  ];
  
  // Create component example code
  const exampleCode = `import { ${component.name} } from "@ui-components/${component.name.toLowerCase()}";

export default function ${component.name}Example() {
  return (
    <${component.name} 
      variant="${selectedVariant}"
      ${selectedState === 'Disabled' ? 'disabled' : ''}
    >
      ${component.name} Example
    </${component.name}>
  );
}`;

  const handleComponentUpdate = (data: { name: string; description: string }) => {
    // In a real app, this would update the component in the database
    console.log('Update component:', { id: component.id, ...data });
  };

  const tabs = [
    {
      label: "Preview",
      value: "preview",
      content: (
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
      ),
    },
    {
      label: "Code",
      value: "code",
      content: (
        <div className="border rounded-md p-6">
          <div className="bg-secondary rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Code className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Example</span>
              </div>
              <CopyCommand code={exampleCode} />
            </div>
            <pre className="text-sm overflow-x-auto p-2 bg-background rounded">
              {exampleCode}
            </pre>
          </div>
        </div>
      ),
    },
    {
      label: "Props",
      value: "props",
      content: (
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
      ),
    },
    {
      label: "Accessibility",
      value: "accessibility",
      content: (
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
        </div>
      ),
    },
    {
      label: "Usage",
      value: "usage",
      content: (
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
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-5xl">
      <Breadcrumbs items={breadcrumbItems} className="mb-4" />
      
      {isAdminMode && isEditing && (
        <ComponentEditor
          componentId={component.id}
          componentName={component.name}
          componentDescription={component.description}
          onUpdate={handleComponentUpdate}
        />
      )}

      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{component.name}</h1>
            <Badge variant="outline">{component.version}</Badge>
          </div>
          <p className="text-muted-foreground">{component.description}</p>
        </div>
        <div className="flex gap-2">
          {isAdminMode && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Component'}
            </Button>
          )}
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Source
          </Button>
        </div>
      </div>

      <ComponentTabs tabs={tabs} defaultTab="preview" />
    </div>
  );
};

export default ComponentDetail;
