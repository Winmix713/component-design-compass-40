
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AdminProvider } from "@/context/AdminContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComponentDetail from "./pages/ComponentDetail";
import DesignTokens from "./pages/DesignTokens";
import PatternLibrary from "./pages/PatternLibrary";
import Integrations from "./pages/Integrations";
import Changelog from "./pages/Changelog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <Layout>
                    <Index />
                  </Layout>
                } 
              />
              <Route 
                path="/components/:id" 
                element={
                  <Layout>
                    <ComponentDetail />
                  </Layout>
                } 
              />
              <Route 
                path="/tokens" 
                element={
                  <Layout>
                    <DesignTokens />
                  </Layout>
                } 
              />
              <Route 
                path="/patterns" 
                element={
                  <Layout>
                    <PatternLibrary />
                  </Layout>
                } 
              />
              <Route 
                path="/integrations" 
                element={
                  <Layout>
                    <Integrations />
                  </Layout>
                } 
              />
              <Route 
                path="/changelog" 
                element={
                  <Layout>
                    <Changelog />
                  </Layout>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
