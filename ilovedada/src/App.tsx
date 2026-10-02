import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index.tsx";

import ProductDetail from "./pages/ProductDetail.tsx";
import Simulateur from "./pages/Simulateur.tsx";
import QuiSuisJe from "./pages/QuiSuisJe.tsx";
import Histoire from "./pages/Histoire.tsx";
import Eshop from "./pages/Eshop.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/qui-suis-je" element={<QuiSuisJe />} />
        <Route path="/histoire" element={<Histoire />} />
        <Route path="/eshop" element={<Eshop />} />
        <Route path="/simulateur" element={<Simulateur />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
