
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { Code } from 'lucide-react';
import { Markdown } from './Markdown';

interface DocLayoutProps {
  title: string;
  description?: string;
  category?: string;
  children: React.ReactNode;
  code?: string;
  usage?: string;
  accessibility?: string;
  props?: React.ReactNode;
}

const DocLayout: React.FC<DocLayoutProps> = ({
  title,
  description,
  category,
  children,
  code,
  usage,
  accessibility,
  props,
}) => {
  const { isAdminMode } = useAdmin();
  const navigate = useNavigate();

  return (
    <div className={cn("max-w-5xl mx-auto p-6", isAdminMode && "relative")}>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {category && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink onClick={() => navigate(`/${category.toLowerCase()}`)}>{category}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbLink>{title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          {description && <p className="text-muted-foreground text-lg">{description}</p>}
        </div>

        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            {usage && <TabsTrigger value="usage">Usage</TabsTrigger>}
            {props && <TabsTrigger value="props">Props</TabsTrigger>}
            {accessibility && <TabsTrigger value="accessibility">Accessibility</TabsTrigger>}
          </TabsList>

          <TabsContent value="preview" className="min-h-[200px]">
            <div className={cn("border rounded-md p-6 bg-accent", isAdminMode && "border-primary/20")}>
              <div className="preview-container p-8 rounded-md bg-card flex items-center justify-center">
                {children}
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
                </div>
                <pre className="text-sm overflow-x-auto p-4 bg-background rounded max-h-96">
                  <code>{code}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          {usage && (
            <TabsContent value="usage">
              <div className="border rounded-md p-6">
                <Markdown content={usage} />
              </div>
            </TabsContent>
          )}

          {props && (
            <TabsContent value="props">
              <div className="border rounded-md p-6">
                {props}
              </div>
            </TabsContent>
          )}

          {accessibility && (
            <TabsContent value="accessibility">
              <div className="border rounded-md p-6">
                <Markdown content={accessibility} />
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default DocLayout;
