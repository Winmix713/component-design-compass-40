
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import AdminPanel from './admin/AdminPanel';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAdminMode } = useAdmin();
  
  return (
    <div className={cn(
      "flex h-screen", 
      isAdminMode && "bg-background/90 border border-primary/10"
    )}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <AdminPanel />
    </div>
  );
};

export default Layout;
