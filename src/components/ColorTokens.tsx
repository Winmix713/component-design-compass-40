
import React from 'react';
import { colorTokens } from '@/lib/componentData';

const ColorTokens = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Blue (Primary)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorTokens.blue.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              value={color.value}
              className="bg-primary-500"
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Gray (Neutral)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorTokens.gray.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              value={color.value}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Green (Success)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorTokens.green.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              value={color.value}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Red (Error)</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {colorTokens.red.map((color) => (
            <ColorSwatch
              key={color.name}
              name={color.name}
              value={color.value}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ColorSwatchProps {
  name: string;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, value, className, style }) => {
  const textColor = getTextColor(value);
  
  return (
    <div className="rounded-md overflow-hidden border">
      <div 
        className="h-16 flex items-center justify-center"
        style={style}
      >
        <span className={`font-medium ${textColor}`}>{value}</span>
      </div>
      <div className="p-2 bg-card">
        <p className="text-sm font-medium">{name}</p>
      </div>
    </div>
  );
};

// Function to determine text color based on background
function getTextColor(hexColor: string) {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return appropriate text color
  return luminance > 0.5 ? 'text-gray-900' : 'text-white';
}

export default ColorTokens;
