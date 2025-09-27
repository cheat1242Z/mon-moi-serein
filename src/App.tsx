import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import MoodEntry from "./pages/MoodEntry";
import Wellness from "./pages/Wellness";
import Music from "./pages/Music";
import Analytics from "./pages/Analytics";
import Diary from "./pages/Diary";
import DiaryEntry from "./pages/DiaryEntry";
import Planner from "./pages/Planner";
import Pomodoro from "./pages/Pomodoro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="mood" element={<MoodEntry />} />
            <Route path="wellness" element={<Wellness />} />
            <Route path="music" element={<Music />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="diary" element={<Diary />} />
            <Route path="diary/new" element={<DiaryEntry />} />
            <Route path="planner" element={<Planner />} />
            <Route path="pomodoro" element={<Pomodoro />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
