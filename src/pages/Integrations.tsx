
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const Integrations = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('npx bolt@latest add @ui-components/react');
    toast.success('Copied to clipboard');
  };
  
  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-muted-foreground">
          Learn how to integrate UI Components into your projects using our CLI tool or manual installation.
        </p>
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">CLI Tool (Recommended)</h2>
          <p className="mb-4">
            The easiest way to integrate UI Components is to use our CLI tool, which will handle installation and configuration for you.
          </p>
          
          <div className="bg-muted rounded-md p-4 flex justify-between items-center mb-6">
            <code>npx bolt@latest add @ui-components/react</code>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            This command will install the components, add the necessary dependencies, and set up your configuration automatically.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Manual Download</h2>
          <p className="mb-6">
            If you prefer a manual installation, you can download the package as a ZIP file and follow the installation instructions in the documentation.
          </p>
          
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download ZIP
          </Button>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">Framework-specific Integrations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">React</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Integration with React applications using functional components and hooks.
              </p>
              <Button variant="link" className="gap-1 px-0">
                Setup Guide
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">Next.js</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Optimized for Next.js applications with server components support.
              </p>
              <Button variant="link" className="gap-1 px-0">
                Setup Guide
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">Vite</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Integration with Vite-powered applications for fast development.
              </p>
              <Button variant="link" className="gap-1 px-0">
                Setup Guide
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="border rounded-md p-6 bg-card">
              <h3 className="text-xl font-semibold mb-2">Angular</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Integration with Angular projects (coming soon).
              </p>
              <Button variant="link" className="gap-1 px-0" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
          
          <div className="mt-8">
            <Button variant="link" className="gap-1">
              Learn more about integration options
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Integrations;
