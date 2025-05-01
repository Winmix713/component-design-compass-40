
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import ThemeEditor from './ThemeEditor';
import { useThemeContext } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import Portal from '@/components/ui/Portal';

const AdminPanel: React.FC = () => {
  const { isAdminMode, isEditing, setIsEditing } = useAdmin();
  const { colors, radius } = useThemeContext();
  const { toast } = useToast();
  
  if (!isAdminMode) return null;
  
  const handleSaveTheme = () => {
    // This would actually save to a backend in a real app
    toast({
      title: "Theme saved",
      description: "Your theme settings have been saved.",
    });
  };
  
  const handleClose = () => {
    setIsEditing(false);
  };
  
  if (!isEditing) return null;
  
  return (
    <Portal>
      <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="sticky top-0 bg-card z-10 border-b">
            <div className="flex justify-between items-center">
              <CardTitle>Admin Tools</CardTitle>
              <Button variant="outline" size="sm" onClick={handleClose}>Close</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="theme">
              <TabsList className="mb-4">
                <TabsTrigger value="theme">Theme Editor</TabsTrigger>
                <TabsTrigger value="components">Component Editor</TabsTrigger>
              </TabsList>
              <TabsContent value="theme">
                <ThemeEditor />
                <div className="flex justify-end mt-4">
                  <Button onClick={handleSaveTheme}>Save Theme</Button>
                </div>
              </TabsContent>
              <TabsContent value="components">
                <p className="text-muted-foreground">
                  Select a component from the sidebar to edit its properties.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Portal>
  );
};

export default AdminPanel;
