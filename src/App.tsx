import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import MemberAuth from "./pages/MemberAuth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PricingPage from './pages/PricingPage';
import RealEstateServices from './pages/RealEstateServices';
import WealthInvestment from './pages/WealthInvestment';
import BusinessConsulting from './pages/BusinessConsulting';
import BusinessSetup from './pages/BusinessSetup';
import PropertyDevelopment from './pages/PropertyDevelopment';
import DevelopmentForm from "./pages/DevelopmentForm";

import ScrollToTop from '@/components/ScrollToTop';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Add ScrollToTop here - outside Routes but inside BrowserRouter */}
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/member-auth" element={<MemberAuth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/services/real-estate" element={<RealEstateServices />} />
            <Route path="/services/wealth-investment" element={<WealthInvestment />} />
            <Route path="/services/business-consulting" element={<BusinessConsulting />} />
            <Route path="/services/business-setup" element={<BusinessSetup />} />
            <Route path="/services/property-development" element={<PropertyDevelopment />} />
            <Route path="/DevelopmentForm" element={<DevelopmentForm />} />
            <Route path="*" element={<NotFound />} />
            {/* Remove the incorrect scroll route */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;



//old app route 
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext";
// import Index from "./pages/Index";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Properties from "./pages/Properties";
// import PropertyDetails from "./pages/PropertyDetails";
// import Contact from "./pages/Contact";
// import Auth from "./pages/Auth";
// import MemberAuth from "./pages/MemberAuth";
// import Dashboard from "./pages/Dashboard";
// import Settings from "./pages/Settings";
// import AdminDashboard from "./pages/AdminDashboard";
// import NotFound from "./pages/NotFound";
// import PricingPage from './pages/PricingPage';
// import RealEstateServices from './pages/RealEstateServices';
// import WealthInvestment from './pages/WealthInvestment';
// import BusinessConsulting from './pages/BusinessConsulting';
// import BusinessSetup from './pages/BusinessSetup';
// import PropertyDevelopment from './pages/PropertyDevelopment';
// import DevelopmentForm from "./pages/DevelopmentForm";
// import ScrollToTop from '@/components/ScrollToTop';
// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/properties" element={<Properties />} />
//             <Route path="/properties/:id" element={<PropertyDetails />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/auth" element={<Auth />} />
//             <Route path="/member-auth" element={<MemberAuth />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/pricing" element={<PricingPage />} />
//             <Route path="/services/real-estate" element={<RealEstateServices />} />
// <Route path="/services/wealth-investment" element={<WealthInvestment />} />
// <Route path="/services/business-consulting" element={<BusinessConsulting />} />
// <Route path="/services/business-setup" element={<BusinessSetup />} />
// <Route path="/services/property-development" element={<PropertyDevelopment />} />
// <Route path="/DevelopmentForm" element={<DevelopmentForm />} />
//             <Route path="*" element={<NotFound />} />
//             <Route path="*" element={<scroll />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;



