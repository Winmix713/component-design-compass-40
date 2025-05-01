
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextType {
  isAdminMode: boolean;
  setAdminMode: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminMode, setAdminMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <AdminContext.Provider value={{ isAdminMode, setAdminMode, isEditing, setIsEditing }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
