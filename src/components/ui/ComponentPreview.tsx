
import React from 'react';
import { useThemeContext } from '@/context/ThemeContext';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';

interface ComponentPreviewProps {
  component: any;
  variant: string;
  state: string;
  className?: string;
  children?: React.ReactNode;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  component,
  variant,
  state,
  className,
  children,
}) => {
  const { theme } = useThemeContext();
  const { isAdminMode } = useAdmin();

  // This would be a real implementation using the actual components
  // For now, we'll use the existing placeholder implementation from ComponentPage

  return (
    <div 
      className={cn(
        'relative bg-background border rounded-md p-8 transition-all',
        isAdminMode && 'outline outline-2 outline-primary/50',
        className
      )}
      data-component-id={component.id}
      data-component-variant={variant}
      data-component-state={state}
    >
      {children || (
        <div className="border border-dashed border-gray-300 p-6 text-center rounded-md bg-white">
          <p className="text-muted-foreground">{component.name} Preview</p>
          <p className="text-sm text-muted-foreground mt-1">Variant: {variant}</p>
          <p className="text-sm text-muted-foreground">State: {state}</p>
        </div>
      )}

      {isAdminMode && (
        <div className="absolute top-2 right-2 flex space-x-1 bg-background/80 backdrop-blur-sm rounded p-1">
          <span className="text-xs text-muted-foreground">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>
      )}
    </div>
  );
};

export default ComponentPreview;
