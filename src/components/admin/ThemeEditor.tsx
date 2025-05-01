
import React, { useState } from 'react';
import { useThemeContext } from '@/context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useDebounce } from '@/hooks/useDebounce';
import { ThemeColor } from '@/context/store.types';

const ThemeEditor: React.FC = () => {
  const { colors, updateColors, radius, setRadius } = useThemeContext();
  const [localRadius, setLocalRadius] = useState(parseFloat(radius.replace('rem', '')));
  const debouncedRadius = useDebounce(localRadius, 300);
  
  // Update radius when debounced value changes
  React.useEffect(() => {
    setRadius(`${debouncedRadius}rem`);
  }, [debouncedRadius, setRadius]);
  
  const handleColorChange = (colorGroup: string, index: number, newValue: string) => {
    const updatedColors = { ...colors };
    if (updatedColors[colorGroup]) {
      const colorsCopy = [...updatedColors[colorGroup]];
      colorsCopy[index] = { ...colorsCopy[index], value: newValue };
      updateColors({ [colorGroup]: colorsCopy });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="border-radius">Border Radius: {localRadius}rem</Label>
            <Slider
              id="border-radius"
              min={0}
              max={2}
              step={0.1}
              value={[localRadius]}
              onValueChange={(values) => setLocalRadius(values[0])}
              className="mt-2"
            />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Color Palette</h3>
            
            {Object.entries(colors).map(([colorGroup, colorShades]) => (
              <div key={colorGroup} className="space-y-2">
                <h4 className="text-md font-medium capitalize">{colorGroup}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {colorShades.map((color: ThemeColor, index: number) => (
                    <div key={color.name} className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: color.value }}
                      />
                      <Label htmlFor={`color-${color.name}`} className="w-20 text-xs">
                        {color.name}
                      </Label>
                      <Input
                        id={`color-${color.name}`}
                        type="color"
                        value={color.value}
                        onChange={(e) => handleColorChange(colorGroup, index, e.target.value)}
                        className="w-12 h-8 p-0 overflow-hidden"
                      />
                      <Input
                        value={color.value}
                        onChange={(e) => handleColorChange(colorGroup, index, e.target.value)}
                        className="w-24 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeEditor;
