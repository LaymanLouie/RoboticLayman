import { memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { LayoutProvider } from "@/contexts/LayoutContext";
import GlobalScrollbar from "@/layout/GlobalScrollbar";
import AppRoutes from "./AppRoutes";

const queryClient = new QueryClient();

const AppContent = memo(function AppContent() {
  return (
    <LayoutProvider>
      <GlobalScrollbar />
      <AppRoutes />
    </LayoutProvider>
  );
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AppContent />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
