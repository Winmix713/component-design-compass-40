
import React from 'react';

const TypographyTokens = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Headings</h2>
        <div className="space-y-6 border rounded-md p-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">Heading 1</h1>
            <p className="text-sm text-muted-foreground">text-4xl / font-bold / line-height: 1.2</p>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold">Heading 2</h2>
            <p className="text-sm text-muted-foreground">text-3xl / font-semibold / line-height: 1.3</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold">Heading 3</h3>
            <p className="text-sm text-muted-foreground">text-2xl / font-semibold / line-height: 1.4</p>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-xl font-medium">Heading 4</h4>
            <p className="text-sm text-muted-foreground">text-xl / font-medium / line-height: 1.5</p>
          </div>
          
          <div className="space-y-1">
            <h5 className="text-lg font-medium">Heading 5</h5>
            <p className="text-sm text-muted-foreground">text-lg / font-medium / line-height: 1.5</p>
          </div>
          
          <div className="space-y-1">
            <h6 className="text-base font-medium">Heading 6</h6>
            <p className="text-sm text-muted-foreground">text-base / font-medium / line-height: 1.5</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Body Text</h2>
        <div className="space-y-6 border rounded-md p-6">
          <div className="space-y-1">
            <p className="text-lg">Body Large</p>
            <p className="text-sm text-muted-foreground">text-lg / font-normal / line-height: 1.6</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-base">Body Medium</p>
            <p className="text-sm text-muted-foreground">text-base / font-normal / line-height: 1.6</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm">Body Small</p>
            <p className="text-sm text-muted-foreground">text-sm / font-normal / line-height: 1.5</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Specialized</h2>
        <div className="space-y-6 border rounded-md p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium uppercase tracking-wide">Caption</p>
            <p className="text-sm text-muted-foreground">text-sm / font-medium / uppercase / tracking-wide</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs font-normal">Legal Text</p>
            <p className="text-sm text-muted-foreground">text-xs / font-normal / line-height: 1.5</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-base font-medium">Button Text</p>
            <p className="text-sm text-muted-foreground">text-base / font-medium</p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Font Weights</h2>
        <div className="space-y-2 border rounded-md p-6">
          <p className="font-light">Light (300)</p>
          <p className="font-normal">Regular (400)</p>
          <p className="font-medium">Medium (500)</p>
          <p className="font-semibold">Semibold (600)</p>
          <p className="font-bold">Bold (700)</p>
          <p className="font-extrabold">Extra Bold (800)</p>
        </div>
      </div>
    </div>
  );
};

export default TypographyTokens;
