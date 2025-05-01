
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const { isAdminMode, setIsEditing } = useAdmin();

  // Enable editing mode when in admin mode
  const handleEnableEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className={cn(
      "max-w-5xl mx-auto p-6",
      isAdminMode && "relative"
    )}>
      {isAdminMode && (
        <Card className="mb-6 p-4 border-primary/50 bg-background/80 backdrop-blur flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium">Admin Mode Active</h3>
            <p className="text-xs text-muted-foreground">You can now edit components and customize the theme.</p>
          </div>
          <Button size="sm" onClick={handleEnableEditing}>
            Enable Editing
          </Button>
        </Card>
      )}

      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-6">
          <h1 className={cn(
            "text-4xl font-bold",
            isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
          )}>UI Components</h1>
          <span className="text-2xl text-muted-foreground">/</span>
          <h1 className={cn(
            "text-3xl font-bold text-muted-foreground",
            isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
          )}>UI Komponensek</h1>
        </div>
        <p className={cn(
          "text-xl text-muted-foreground max-w-2xl mx-auto",
          isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
        )}>
          A comprehensive library of UI components and design system to help you build beautiful, accessible, and consistent user interfaces.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="Extensive Component Library"
          description="A comprehensive collection of UI components built with React and TypeScript, designed for flexibility and reuse."
          icon={
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-xl">⚛️</span>
            </div>
          }
          isAdminMode={isAdminMode}
        />
        
        <FeatureCard
          title="Design System Integration"
          description="Fully integrated with our design system to ensure consistency across all products with customizable tokens."
          icon={
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600 text-xl">🎨</span>
            </div>
          }
          isAdminMode={isAdminMode}
        />
        
        <FeatureCard
          title="Pattern Library"
          description="Common UI patterns and compositions to help you solve recurring design problems and speed up development."
          icon={
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-xl">🧩</span>
            </div>
          }
          isAdminMode={isAdminMode}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Button
          size="lg"
          className="gap-2"
          onClick={() => navigate('/components/button')}
        >
          Explore Components
          <ArrowRight size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/tokens')}
        >
          Design Tokens
        </Button>
      </div>

      <div className="mt-20">
        <h2 className={cn(
          "text-2xl font-bold mb-6",
          isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
        )}>Getting Started</h2>
        
        <div className="space-y-10">
          <section>
            <h3 className={cn(
              "text-xl font-semibold mb-3",
              isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
            )}>Installation</h3>
            <p className={cn(
              "text-muted-foreground mb-4",
              isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
            )}>
              Install the component library in your React project using your preferred package manager.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <code>npm install @ui-components/react</code>
            </div>
          </section>
          
          <section>
            <h3 className={cn(
              "text-xl font-semibold mb-3",
              isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
            )}>Usage</h3>
            <p className={cn(
              "text-muted-foreground mb-4",
              isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
            )}>
              Import components directly from the package and use them in your application.
            </p>
            <div className="bg-muted p-4 rounded-md">
<pre className="overflow-x-auto">
{`import { Button } from '@ui-components/react';

function App() {
  return (
    <Button variant="primary">
      Click Me
    </Button>
  );
}`}
</pre>
            </div>
          </section>
          
          <section>
            <h3 className={cn(
              "text-xl font-semibold mb-3",
              isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
            )}>Theming</h3>
            <p className={cn(
              "text-muted-foreground mb-4",
              isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
            )}>
              The component library supports theming through design tokens. You can customize the appearance to match your brand.
            </p>
            <div className="bg-muted p-4 rounded-md">
<pre className="overflow-x-auto">
{`import { ThemeProvider } from '@ui-components/react';

const theme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#6366F1',
    // ... other color tokens
  },
  // ... other token categories
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your application */}
    </ThemeProvider>
  );
}`}
</pre>
            </div>
            <Button 
              variant="link"
              className="mt-2"
              onClick={() => navigate('/tokens')}
            >
              Learn more about theming
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isAdminMode?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, isAdminMode }) => {
  return (
    <div className={cn(
      "p-6 border rounded-lg bg-card",
      isAdminMode && "outline-dashed outline-1 outline-primary/40"
    )}>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className={cn(
        "font-semibold text-lg mb-2",
        isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
      )}>{title}</h3>
      <p className={cn(
        "text-muted-foreground",
        isAdminMode && "outline-dashed outline-1 outline-primary/40 p-1 rounded"
      )}>{description}</p>
    </div>
  );
};

export default Index;
