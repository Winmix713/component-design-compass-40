
import React from 'react';
import { cn } from '@/lib/utils';
import CopyCommand from './CopyCommand';

interface ComponentWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
  className?: string;
}

const ComponentWrapper: React.FC<ComponentWrapperProps> = ({
  title,
  description,
  children,
  code,
  className,
}) => {
  return (
    <div className={cn('border rounded-lg overflow-hidden mb-8', className)}>
      <div className="p-4 border-b bg-background/50">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </div>
      <div className="p-6 flex items-center justify-center bg-accent/50">
        {children}
      </div>
      {code && (
        <div className="relative bg-muted p-4 border-t">
          <CopyCommand code={code} className="right-4 top-4" />
          <pre className="text-sm overflow-x-auto p-2">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default ComponentWrapper;
