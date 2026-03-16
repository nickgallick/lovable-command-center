import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Overview from "@/pages/Overview";
import AgentWarRoomPage from "@/pages/AgentWarRoomPage";
import ProjectBoard from "@/pages/ProjectBoard";
import Pipeline from "@/pages/Pipeline";
import DeploymentsPage from "@/pages/DeploymentsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import CommandCenter from "@/pages/CommandCenter";
import AlertsPage from "@/pages/AlertsPage";
import PerformancePage from "@/pages/PerformancePage";
import ShowcasePage from "@/pages/ShowcasePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/agents" element={<AgentWarRoomPage />} />
            <Route path="/projects" element={<ProjectBoard />} />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route path="/deployments" element={<DeploymentsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/commands" element={<CommandCenter />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/performance" element={<PerformancePage />} />
          </Route>
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
