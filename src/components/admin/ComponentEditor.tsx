
import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { Card } from '@/components/ui/card';

interface ComponentEditorProps {
  componentId: string;
  componentName: string;
  componentDescription: string;
  onUpdate?: (data: { name: string; description: string }) => void;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({
  componentId,
  componentName,
  componentDescription,
  onUpdate,
}) => {
  const { isEditing, setIsEditing } = useAdmin();
  const [name, setName] = useState(componentName);
  const [description, setDescription] = useState(componentDescription);
  
  const debouncedName = useDebounce(name, 500);
  const debouncedDescription = useDebounce(description, 500);

  React.useEffect(() => {
    if (isEditing && onUpdate) {
      onUpdate({
        name: debouncedName,
        description: debouncedDescription
      });
    }
  }, [debouncedName, debouncedDescription, isEditing, onUpdate]);

  if (!isEditing) return null;

  return (
    <Card className="p-4 mb-6 border-primary/50 bg-background/80 backdrop-blur">
      <h3 className="text-sm font-medium mb-3">Editing Component: {componentId}</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="component-name" className="text-sm font-medium">
            Component Name
          </label>
          <Input
            id="component-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="component-description" className="text-sm font-medium">
            Description
          </label>
          <Textarea
            id="component-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (onUpdate) {
                onUpdate({ name, description });
              }
              setIsEditing(false);
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ComponentEditor;
